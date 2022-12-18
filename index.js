// create an express app
const express = require('express')
const axios = require('axios')
const aposToLexForm = require('apos-to-lex-form')
const natural = require('natural')
const spell_check = require('spelling-corrector')
const stopWords = require('stopword')

const app = express()
const port = 3000

const spellCheck = new spell_check()
spellCheck.loadDictionary()

app.get('/', (req, res) => {
    res.send('API is working!')
})

app.get('/api/reddit/subreddit/:subreddit', (req, res) => {
    const subreddit = req.params.subreddit
    const url = 'https://social-scraper-one.vercel.app/api/reddit/subreddit/' + subreddit
    axios.get(url,{headers: { "Accept-Encoding": "gzip,deflate,compress" }} )
    .then(response => {
        const texts = response.data.map(post => post.title)
        const lexedTexts = texts.map(text => aposToLexForm(text))
        const casedTexts = lexedTexts.map(text => text.toLowerCase()) 
        const alphaOnlyTexts = casedTexts.map(text => text.replace(/[^a-zA-Z\s]+/g, ''))
        // console.table(alphaOnlyTexts)
        const { WordTokenizer } = natural
        const tokenizer = new WordTokenizer()
        const tokenizedTexts = alphaOnlyTexts.map(text => tokenizer.tokenize(text))
        tokenizedTexts.map(text => text.map(word => spellCheck.correct(word)))
        const noStopWordsTexts = tokenizedTexts.map(text => stopWords.removeStopwords(text))
        var avgAnalysis = 0
        const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn')
        noStopWordsTexts.forEach(text => {
            const analysis = analyzer.getSentiment(text)
            avgAnalysis += analysis
        })
        avgAnalysis = avgAnalysis / noStopWordsTexts.length
        // console.table(noStopWordsTexts)
        res.send({avgAnalysis})
    })
    .catch(error => {
            res.send(error)
        })
})

app.get('/api/reddit/:tag', (req, res) => {
    const tags = req.params.tag
    const url = 'https://social-scraper-one.vercel.app/api/reddit/tags/' + tags
    axios.get(url,{headers: { "Accept-Encoding": "gzip,deflate,compress" }} )
    .then(response => {
        const texts = response.data.map(post => post.title)
        const lexedTexts = texts.map(text => aposToLexForm(text))
        const casedTexts = lexedTexts.map(text => text.toLowerCase()) 
        const alphaOnlyTexts = casedTexts.map(text => text.replace(/[^a-zA-Z\s]+/g, ''))
        // console.table(alphaOnlyTexts)
        const { WordTokenizer } = natural
        const tokenizer = new WordTokenizer()
        const tokenizedTexts = alphaOnlyTexts.map(text => tokenizer.tokenize(text))
        tokenizedTexts.map(text => text.map(word => spellCheck.correct(word)))
        const noStopWordsTexts = tokenizedTexts.map(text => stopWords.removeStopwords(text))
        var avgAnalysis = 0
        const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn')
        noStopWordsTexts.forEach(text => {
            const analysis = analyzer.getSentiment(text)
            avgAnalysis += analysis
        })
        avgAnalysis = avgAnalysis / noStopWordsTexts.length
        // console.table(noStopWordsTexts)
        res.send({avgAnalysis})
    })
    .catch(error => {
            res.send(error)
        })
})

app.get('/api/stackoverflow/:tag', (req, res) => {
    const tags = req.params.tag
    const url = 'https://social-scraper-one.vercel.app/api/stackoverflow/tags/' + tags
    axios.get(url,{headers: { "Accept-Encoding": "gzip,deflate,compress" }} )
    .then(response => {
        const texts = response.data.map(post => post.title)
        const lexedTexts = texts.map(text => aposToLexForm(text))
        const casedTexts = lexedTexts.map(text => text.toLowerCase()) 
        const alphaOnlyTexts = casedTexts.map(text => text.replace(/[^a-zA-Z\s]+/g, ''))
        // console.table(alphaOnlyTexts)
        const { WordTokenizer } = natural
        const tokenizer = new WordTokenizer()
        const tokenizedTexts = alphaOnlyTexts.map(text => tokenizer.tokenize(text))
        tokenizedTexts.map(text => text.map(word => spellCheck.correct(word)))
        const noStopWordsTexts = tokenizedTexts.map(text => stopWords.removeStopwords(text))
        var avgAnalysis = 0
        const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn')
        noStopWordsTexts.forEach(text => {
            const analysis = analyzer.getSentiment(text)
            avgAnalysis += analysis
        })
        avgAnalysis = avgAnalysis / noStopWordsTexts.length
        // console.table(noStopWordsTexts)
        res.send({avgAnalysis})
    })
    .catch(error => {
            res.send(error)
        })
})

app.get('/api/duckduckgo/:tag', (req, res) => {
    const tags = req.params.tag
    const url = 'https://social-scraper-one.vercel.app/api/duckduckgo/' + tags
    axios.get(url,{headers: { "Accept-Encoding": "gzip,deflate,compress" }} )
    .then(response => {
        const texts = response.data.map(post => (post.title + " " + post.description))
        const lexedTexts = texts.map(text => aposToLexForm(text))
        const casedTexts = lexedTexts.map(text => text.toLowerCase()) 
        const alphaOnlyTexts = casedTexts.map(text => text.replace(/[^a-zA-Z\s]+/g, ''))
        // console.table(alphaOnlyTexts)
        const { WordTokenizer } = natural
        const tokenizer = new WordTokenizer()
        const tokenizedTexts = alphaOnlyTexts.map(text => tokenizer.tokenize(text))
        tokenizedTexts.map(text => text.map(word => spellCheck.correct(word)))
        const noStopWordsTexts = tokenizedTexts.map(text => stopWords.removeStopwords(text))
        var avgAnalysis = 0
        const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn')
        noStopWordsTexts.forEach(text => {
            const analysis = analyzer.getSentiment(text)
            avgAnalysis += analysis
        })
        avgAnalysis = avgAnalysis / noStopWordsTexts.length
        // console.table(noStopWordsTexts)
        res.send({avgAnalysis})
    })
    .catch(error => {
            res.send(error)
        })
})


// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})