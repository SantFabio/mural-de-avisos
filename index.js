
const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const fs = require("fs");
const dataPath = path.join(__dirname, "./data/posts.json");
let posts = []

fs.readFile(dataPath, "utf-8", (error, data) => {
    if (error) {
        throw error;
    }
    posts = JSON.parse(data);
});

app.get("/all", (req, res) => {
    res.send(JSON.stringify(posts))
})
app.post("/new", (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})
