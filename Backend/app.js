const cors = require("cors");
const express = require("express");
const connectDB = require("./src/database/database.js");
const Note = require("./src/models/noteModel.js");

const app = express();

// enable cors
app.use(cors());
// middleware
app.use(express.json());

// connect database
connectDB();

app.get('/', async (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.post("/api/notes", async(req, res) => {
  const {title, content} = req.body;

  const note = await Note.create({ title, content})

  res.status(201).json({ message: "Note created successfully",note});
});

app.get("/api/notes", async (req, res) => {
  try {
    const note = await Note.find();  
    res.status(200).json({message:"Notes GET successfully", notes: note});
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

app.delete('/api/notes/:id', async (req, res) => {
    const id = req.params.id

    await Note.findByIdAndDelete(id)

    res.status(200).json({
        message: "Note deleted successfully."
    })
})



app.patch('/api/notes/:id', async (req, res) => {
    const id = req.params.id
    const {title, content } = req.body

    await Note.findByIdAndUpdate(id, { title, content })

    res.status(200).json({
        message: "Note updated successfully."
    })

})



module.exports = app;
