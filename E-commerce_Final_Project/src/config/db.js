const mongodbUrl = "mongodb+srv://vrajdesai67:fewPyHCxwijgi0fG@cluster0.jqnykyv.mongodb.net/?retryWrites=true&w=majority" 

const mongoose = require('mongoose');

const connectDB = () => {
    return mongoose.connect(mongodbUrl);
}

module.exports = {connectDB};