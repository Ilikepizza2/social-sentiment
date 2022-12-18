const express = require('express')
const aposToLexForm = require('apos-to-lex-form')
const natural = require('natural')
const spell_check = require('spelling-corrector')
const stopWords = require('stopword')

const router = express.Router()
const spellCheck = new spell_check()
spellCheck.loadDictionary()

router.post('/analyze', (req, res) => {
    const { review } = req.body
    const lexedText = aposToLexForm(review)
    const casedText = lexedText.toLowerCase()
    const alphabetOnlyText = casedText.replace(/[^a-zA-Z\s]+/g, '')
    const { WordTokenizer } = natural
    const tokenizer = new WordTokenizer()
    const tokenizedText = tokenizer.tokenize(alphabetOnlyText)
    tokenizedText.forEach((word, index) => {
        tokenizedText[index] = spellCheck.correct(word)
    })
    const filteredText = stopWords.removeStopwords(tokenizedText)
    const analyze = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn')
    const analysis = analyze.getSentiment(filteredText)
    // console.log(analysis)

    res.status(200).json({
        status: 'success',
        data: analysis
    })

})
module.exports = router