const express = require('express');
const app = express();
const apiRoute = require('./routes/api');
const errorHandler = require('./middleware/errorHandler');

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', apiRoute);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
