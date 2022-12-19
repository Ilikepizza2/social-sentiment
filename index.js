const axios = require("axios");
const natural = require("natural");
const stopWords = require("stopword");
const spell_check = require("spelling-corrector");
const aposToLexForm = require("apos-to-lex-form");
const express = require("express");
const app = express();
const port = 8080;

const spellCheck = new spell_check();
spellCheck.loadDictionary();

app.get("/api/reddit/subreddit/:query", (req, res) => {
  const query = req.params.query;
  const subreddit = query;
  const url =
    "https://social-scraper-one.vercel.app/api/reddit/subreddit/" + subreddit;
  axios
    .get(url, { headers: { "Accept-Encoding": "gzip,deflate,compress" } })
    .then((response) => {
      const texts = response.data.map((post) => post.title);
      const lexedTexts = texts.map((text) => aposToLexForm(text));
      const casedTexts = lexedTexts.map((text) => text.toLowerCase());
      const alphaOnlyTexts = casedTexts.map((text) =>
        text.replace(/[^a-zA-Z\s]+/g, "")
      );
      
      const { WordTokenizer } = natural;
      const tokenizer = new WordTokenizer();
      const tokenizedTexts = alphaOnlyTexts.map((text) =>
        tokenizer.tokenize(text)
      );
      
      tokenizedTexts.map((text) =>
        text.map((word) => spellCheck.correct(word))
      );
      const noStopWordsTexts = tokenizedTexts.map((text) =>
        stopWords.removeStopwords(text)
      );
      var avgAnalysis = 0;
      const analyzer = new natural.SentimentAnalyzer(
        "English",
        natural.PorterStemmer,
        "afinn"
      );
      noStopWordsTexts.forEach((text) => {
        const analysis = analyzer.getSentiment(text);
        avgAnalysis += analysis;
      });
      avgAnalysis = avgAnalysis / noStopWordsTexts.length;
      res.send({ status: "200", analysis: avgAnalysis });
    })
    .catch((error) => {
      res.send({ status: "404", analysis: "Not Found" });
    });
});

app.get("/api/reddit/search/:query", (req, res) => {
  const query = req.params.query;
  const tags = query;
  const url = "https://social-scraper-one.vercel.app/api/reddit/tags/" + tags;
  axios
    .get(url, { headers: { "Accept-Encoding": "gzip,deflate,compress" } })
    .then((response) => {
      const texts = response.data.map((post) => post.title);
      const lexedTexts = texts.map((text) => aposToLexForm(text));
      const casedTexts = lexedTexts.map((text) => text.toLowerCase());
      const alphaOnlyTexts = casedTexts.map((text) =>
        text.replace(/[^a-zA-Z\s]+/g, "")
      );
      
      const { WordTokenizer } = natural;
      const tokenizer = new WordTokenizer();
      const tokenizedTexts = alphaOnlyTexts.map((text) =>
        tokenizer.tokenize(text)
      );
      
      tokenizedTexts.map((text) =>
        text.map((word) => spellCheck.correct(word))
      );
      const noStopWordsTexts = tokenizedTexts.map((text) =>
        stopWords.removeStopwords(text)
      );
      var avgAnalysis = 0;
      const analyzer = new natural.SentimentAnalyzer(
        "English",
        natural.PorterStemmer,
        "afinn"
      );
      noStopWordsTexts.forEach((text) => {
        const analysis = analyzer.getSentiment(text);
        avgAnalysis += analysis;
      });
      avgAnalysis = avgAnalysis / noStopWordsTexts.length;
      res.send({ status: "200", analysis: avgAnalysis });
    })
    .catch((error) => {
      res.send({ status: "404", analysis: "Not Found" });
    });
});

app.get("/api/stackoverflow/:query", async (req, res) => {
  const query = req.params.query;
  const url =
    "https://social-scraper-one.vercel.app/api/stackoverflow/tags/" + query;
  axios
    .get(url, { headers: { "Accept-Encoding": "gzip,deflate,compress" } })
    .then((response) => {
      const texts = response.data.map((post) => post.title);
      const lexedTexts = texts.map((text) => aposToLexForm(text));
      const casedTexts = lexedTexts.map((text) => text.toLowerCase());
      const alphaOnlyTexts = casedTexts.map((text) =>
        text.replace(/[^a-zA-Z\s]+/g, "")
      );
      
      const { WordTokenizer } = natural;
      const tokenizer = new WordTokenizer();
      const tokenizedTexts = alphaOnlyTexts.map((text) =>
        tokenizer.tokenize(text)
      );
      
      tokenizedTexts.map((text) =>
        text.map((word) => spellCheck.correct(word))
      );
      const noStopWordsTexts = tokenizedTexts.map((text) =>
        stopWords.removeStopwords(text)
      );
      var avgAnalysis = 0;
      const analyzer = new natural.SentimentAnalyzer(
        "English",
        natural.PorterStemmer,
        "afinn"
      );
      noStopWordsTexts.forEach((text) => {
        const analysis = analyzer.getSentiment(text);
        avgAnalysis += analysis;
      });
      avgAnalysis = avgAnalysis / noStopWordsTexts.length;
      res.send({ status: "200", analysis: avgAnalysis });
    });
});

app.get("/api/duckduckgo/:query", async (req, res) => {
  const query = req.params.query;
  const url =
    "https://social-scraper-one.vercel.app/api/duckduckgo/tags/" + query;
  axios
    .get(url, { headers: { "Accept-Encoding": "gzip,deflate,compress" } })
    .then((response) => {
      const texts = response.data.map((post) => post.title);
      const lexedTexts = texts.map((text) => aposToLexForm(text));
      const casedTexts = lexedTexts.map((text) => text.toLowerCase());
      const alphaOnlyTexts = casedTexts.map((text) =>
        text.replace(/[^a-zA-Z\s]+/g, "")
      );
      
      const { WordTokenizer } = natural;
      const tokenizer = new WordTokenizer();
      const tokenizedTexts = alphaOnlyTexts.map((text) =>
        tokenizer.tokenize(text)
      );
      
      tokenizedTexts.map((text) =>
        text.map((word) => spellCheck.correct(word))
      );
      const noStopWordsTexts = tokenizedTexts.map((text) =>
        stopWords.removeStopwords(text)
      );
      var avgAnalysis = 0;
      const analyzer = new natural.SentimentAnalyzer(
        "English",
        natural.PorterStemmer,
        "afinn"
      );
      noStopWordsTexts.forEach((text) => {
        const analysis = analyzer.getSentiment(text);
        avgAnalysis += analysis;
      });
      avgAnalysis = avgAnalysis / noStopWordsTexts.length;
      res.send({ status: "200", analysis: avgAnalysis });
    })
    .catch((error) => {
      res.send({ status: "404", analysis: "Not Found" });
    });
});

// listen at port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
