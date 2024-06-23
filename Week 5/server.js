const express = require('express');
const connectDB = require('./connection');
const Students = require('./model');

const app = express();
const port = 3000;

app.use(express.json()); // Parse incoming JSON data

// Create (POST) route
app.post('/students', async (req, res) => {
  const newStudent = new Students(req.body);
  try {
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read All (GET) route
app.get('/students', async (req, res) => {
  try {
    const students = await Students.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read One (GET by ID) route
app.get('/students/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const student = await Students.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update (PUT by ID) route
app.put('/students/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const updatedStudent = await Students.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete (DELETE by ID) route
app.delete('/students/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedStudent = await Students.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Connect to MongoDB and start the server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
