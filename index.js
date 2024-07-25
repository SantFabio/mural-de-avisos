
const express = require("express");
const app = express();
const route = require("./routes/api");
const path = require("path");
const PORT = 3000;

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", route);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})
