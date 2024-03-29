# social-sentiment
A nodejs backend which uses natural language processing and web scraping to give the current average sentiment of a social media website regarding a product.

-----

### Setup
This is a nodejs backend so it can be deployed simply by running `node index.js`

-----

### Usage
After the setup, you can access the scores by the following - 
1. Subreddits - http://localhost:8080/api/reddit/subreddit/{query}
2. All over the reddit - http://localhost:8080/api/reddit/search/{query}
3. Stackoverflow - http://localhost:8080/api/stackoverflow/{query}
4. All over the internet - http://localhost:8080/api/duckduckgo/{query}

----

### Results

An analysis of > 0 indicates that the average sentiment on that particular website is currently positive. People think that the product is good.
An analysis of 0 indicates that the average sentiment on that particular website is currently neutral. 
An analysis of < 0 indicates that the average sentiment on that particular website is currently negative. People think that the product is bad.

The absolute value indicates how strong the sentiment is.
An analysis of -0.3 vs -1.5 means that people view the second product more negatively than the first. Although both products aren't considered to be good.

#### Note 
Make sure the query is in the form of "word1+word2+word3+word4+..."
instead of "word1 word2 word3..."

---- 

### Links 
1. [natural](https://www.npmjs.com/package/natural), [spelling-corrector](https://www.npmjs.com/package/spelling-corrector), [axios](https://www.npmjs.com/package/axios), [stopword](https://www.npmjs.com/package/stopword) - third party packages used
2. [Social Scraper](https://github.com/Ilikepizza2/social-scraper) - Another one of my own project used as a web scraper.
3. [Link to my GitHub Repository](https://github.com/Ilikepizza2/)
