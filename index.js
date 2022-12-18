const axios = require("axios");
const natural = require("natural");
const stopWords = require("stopword");
const spell_check = require("spelling-corrector");
const aposToLexForm = require("apos-to-lex-form");

const spellCheck = new spell_check();
spellCheck.loadDictionary();

async function getSentiment(query, url){
  const response = async () => {
    try{
      await axios.get(url, {headers: {"Accept-Encoding": "gzip,deflate,compress"}});
      const texts = response.data.map((post) => post.title);
      const lexedTexts = texts.map((text) => aposToLexForm(text));
      const casedTexts = lexedTexts.map((text) => text.toLowerCase());
      const alphaOnlyTexts = casedTexts.map((text) => text.replace(/[^a-zA-Z\s]+/g, ""));
      // console.table(alphaOnlyTexts)
      const { WordTokenizer } = natural;
      const tokenizer = new WordTokenizer();
      const tokenizedTexts = alphaOnlyTexts.map((text) => tokenizer.tokenize(text));
      tokenizedTexts.map((text) => text.map((word) => spellCheck.correct(word)));
      const noStopWordsTexts = tokenizedTexts.map((text) => stopWords.removeStopwords(text));
      var avgAnalysis = 0;
      const analyzer = new natural.SentimentAnalyzer("English", natural.PorterStemmer, "afinn");
      noStopWordsTexts.forEach((text) => {
        const analysis = analyzer.getSentiment(text);
        avgAnalysis += analysis;
      });
      avgAnalysis = avgAnalysis / noStopWordsTexts.length;
      // console.table(noStopWordsTexts)
      return {status: "200", analysis: avgAnalysis};
    }
    catch(error){
      return {status: "404", analysis: "Not Found"};
    }
  }
}

async function getSentimentSubreddit(query) {
  if (query.includes(" ")) {
    query = query.replace(" ", "+");
  }
  const subreddit = query;
  const url =
    "https://social-scraper-one.vercel.app/api/reddit/subreddit/" + subreddit;
  const response = await getSentiment(query, url);
  return response;
}

async function getSentimentRedditSearch(query) {
  if (query.includes(" ")) {
    query = query.replace(" ", "+");
  }
  const tags = query;
  const url = "https://social-scraper-one.vercel.app/api/reddit/tags/" + tags;
  const response = await getSentiment(query, url);
  return response;
}

async function getSentimentStackoverflow(query) {
  if (query.includes(" ")) {
    query = query.replace(" ", "+");
  }
  const tags = query;
  const url =
    "https://social-scraper-one.vercel.app/api/stackoverflow/tags/" + tags;
  const response = await getSentiment(query, url);
  return response;
}

async function getSentimentDuckduckgo(query) {
  if (query.includes(" ")) {
    query = query.replace(" ", "+");
  }
  console.log(query);
  const tags = query;
  const url = "https://social-scraper-one.vercel.app/api/duckduckgo/" + tags;
  const response = await getSentiment(query, url);
  return response;
}

module.exports = {
  getSentiment,
  getSentimentRedditSearch,
  getSentimentSubreddit,
  getSentimentStackoverflow,
  getSentimentDuckduckgo,
};
