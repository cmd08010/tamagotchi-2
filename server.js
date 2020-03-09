const express = require("express")
const app = express()
const router = express.Router()
const path = require("path")
const morgan = require("morgan")
const fs = require("fs")
const db = require("./db")
const bodyParser = require("body-parser")
const port = process.env.PORT || 3000

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))
app.use(bodyParser.json())

app.use(express.static("assets"))
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/index.html"))
})

app.post("/api/pets", (req, res, next) => {
  console.log("wow")
})

app.get("/api/pets", (req, res, next) => {
  db.getPet().then(response => {
    console.log(response)
    res.send(response)
  })
})

app.get("/api/pets/:id", (req, res, next) => {
  db.setName(req.params.id, req.body.name)
})

app.get("/api/users", (req, res, next) => {
  console.log("test")
  res.sendStatus(200)
})

app.delete("/api/", (req, res, next) => {
  console.log("wow")
})
app.put("/api/pets/:action", (req, res, next) => {
  if (req.params.action === "Feed") {
    db.setHungerLevel(req.body.id).then(response => {
      res.send(response)
    })
  }
  if (req.params.action === "Play") {
    db.setTiredLevel(req.body.id).then(response => {
      res.send(response)
    })
  }
  if (req.params.action === "Love") {
    db.setLoveLevel(req.body.id).then(response => {
      res.send(response)
    })
  }
})

db.sync()
  .then(() => {
    console.log("db synced")
    app.listen(port, () => console.log(`listening on port ${port}`))
  })
  .catch(ex => console.log(ex))
