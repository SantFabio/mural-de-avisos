
const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const router = express.Router();

let posts = []
const dataPath = path.join(__dirname, "../data/posts.json");

// Função para ler posts do arquivo
function readPosts() {
    try {
        const data = fs.readFileSync(dataPath, "utf-8");
        posts = JSON.parse(data);
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao ler o arquivo:', error);
        return null;
    }
}

// Função para escrever posts no arquivo
function writePosts(posts) {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(posts));
        readPosts();
        return true;
    } catch (error) {
        console.error('Erro ao escrever no arquivo:', error);
        return false;
    }
}


const options = {
    origin: "http://localhost:5000"
}
router.use(cors(options));

router.get("/all", (req, res) => {
    posts = readPosts();
    // console.log(posts);
    res.send(JSON.stringify(posts));
})
router.post("/new", (req, res) => {
    // console.log(req.body);
    let title = req.body.title;
    let description = req.body.description;
    if (title && description) {
        let id = idGenerator();
        posts.push({ id, title, description })
        writePosts(posts);

        res.send("Novo post foi criado!");
    } else {
        res.send("O post não pode está vazio!");
    }
})
router.delete("/delete/:id", (req, res) => {
    let id = req.params.id;
    let newArrayPost = posts.filter(item => item.id != id);
    writePosts(newArrayPost);
    res.send(`O item com id ${id} foi apagado`);
})
function idGenerator() {
    return Math.random().toString(36).substring(2, 9);
}

module.exports = router;
