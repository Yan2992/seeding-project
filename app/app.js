
const endpointsJson = require("../endpoints.json");
const express = require("express");
const app = express();
const db = require("../db/connection");
const cors = require('cors');
const { getApi, getTopics, getArticlesById, getArticles, getComments, postComment, patchArticleVotes, deleteComment, getUsers, getAllArticles} = require("./controllers/nc-news.controller");

app.use(cors());

app.use(express.json());

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticlesById); 

app.get("/api/articles", getArticles)

app.get("/api/articles/:article_id/comments", getComments)

app.post("/api/articles/:article_id/comments", postComment)

app.patch("/api/articles/:article_id", patchArticleVotes)

app.delete("/api/comments/:comment_id", deleteComment)

app.get("/api/users", getUsers)

app.get("/api/articles", getAllArticles);



app.use((req, res) => {
  res.status(404).send({ msg: "Path not found" });
});


app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid input" });
  } else {
    next(err);
  }
});


app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
});






module.exports = app;

//.