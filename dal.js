const mongoose = require('mongoose');
const url         = process.env.MONGODB_URI;

//Defines user schema for user collection
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    balance: { type: Number, default: 0 }
});

const User = mongoose.model('User', userSchema);

// Establish a connection to MongoDB Atlas
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to AtlasDB');
    })
    .catch((error) => {
        console.log('Connection failed', error);
    });

// Create user account
async function create(name, email, password) {
    try {
        const newUser = new User({ name, email, password });
        const doc = await newUser.save();
        return doc;
    } catch (err) {
        throw err;
    }
}

// Find user account
async function find(email) {
    try {
        const docs = await User.find({ email: email }).exec();
        return docs;
    } catch (err) {
        throw err;
    }
}

// Find one user account
async function findOne(email) {
    try {
        const doc = await User.findOne({ email: email }).exec();
        return doc;
    } catch (err) {
        throw err;
    }
}

// Update - deposit/withdraw amount
async function update(email, amount) {
    try {
        const doc = await User.findOneAndUpdate(
            { email: email },
            { $inc: { balance: amount } },
            { new: true }
        ).exec();
        return doc;
    } catch (err) {
        throw err;
    }
}

// Get all users
async function all() {
    try {
        const docs = await User.find({}).exec();
        return docs;
    } catch (err) {
        throw err;
    }
}

module.exports = { create, findOne, find, update, all };