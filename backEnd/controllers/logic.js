const bc = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { userCredentialsModel, userModel } = require('../models/model');

async function storingCredentialsInDb(req, res) {
    const { userName, email, password, address } = req.body;
    if (!userName || !email || !password || !address) {
        return res.status(400).json({ msg: 'All fields are required' });
    }
    try {
        const encryptedPassword = await bc.hash(password, 10);
        console.log('entered try block')
        const savedUser = await new userCredentialsModel({
            username: userName,
            email,
            password: encryptedPassword,
            address
        }).save();
        res.status(200).json({ msg: "Registered Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: `ERROR OCCURRED ${err}` });
    }
}

async function credentialVerification(req, res) {
    const { email, password } = req.body;
    JWT_SECRET_KEY = ';sdfkh;shdfmasnuhnagp;kagpoianl;fg'
    try {
        const user = await userCredentialsModel.findOne({ email: email });
        if (user) {
            const isMatch = await bc.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign({ email: email }, JWT_SECRET_KEY)
                if (token) {
                    return res.status(200).json({ msg: 'Success', data: token });
                } else {
                    return res.json({ msg: 'error' })
                }

            } else {
                res.status(401).json({ msg: 'Invalid Email/Password' });
            }
        } else {
            res.status(401).json({ msg: 'Invalid Email/Password' });
        }
    } catch (err) {
        console.error('ERROR OCCURRED:', err);
        res.status(500).json({ msg: 'INTERNAL SERVER ERROR', error: err.message });
    }
}

async function getAllData(req, res) {
    try {
        const allProblems = await userModel.find({});
        res.status(200).json(allProblems);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', err });
    }
}

async function postData(req, res) {
    try {
        const { title, description, status, createdAt, updatedAt } = req.body;

        const newCase = new userModel({
            title,
            description,
            status: status || 'open', // Default to 'open' if status not provided
            createdAt: createdAt || new Date(),
            updatedAt: updatedAt || new Date(),
        });

        const savedCase = await newCase.save();
        res.status(201).json(savedCase);
    } catch (err) {
        console.error('Error creating case:', err);
        res.status(500).json({ error: 'Failed to create case. Please try again.' });
    }
}

async function putData(req, res) {
    const id = req.params.id;
    const { title, description, status, createdAt, updatedAt } = req.body;

    if (!id || !title || !description || !status) {
        return res.status(400).json({ msg: "All fields are required." });
    }

    try {
        // Find the data by ID and update
        const updatedData = await userModel.findOneAndUpdate(
            { _id: id }, // Find data by ID (_id in MongoDB)
            { $set: { title, description, status, createdAt, updatedAt } }, // Set new data
            { new: true } // Return the updated document
        );

        if (!updatedData) {
            return res.status(404).json({ msg: "Data not found" });
        }

        res.status(200).json(updatedData);
    } catch (err) {
        console.error('Error updating data:', err);
        res.status(500).json({ message: 'Error updating data', error: err });
    }
}

async function deleteData(req, res) {
    const id = req.params.id;

    try {
        // Find the user by ID and update
        const deleteResult = await userModel.deleteOne({ _id: id });
        console.log(deleteResult)
        if (!deleteResult) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json(deleteResult);
    } catch (err) {
        res.status(500).json({ message: 'Error Deleting user', err });
    }
}

const getUserInfo = async (req, res) => {
    const { email } = req.params;

    try {
        // Find user information based on the provided email
        const userInfo = await userCredentialsModel.findOne({ email });

        if (!userInfo) {
            // If no user found, send a 404 status with an appropriate message
            return res.status(404).json({ message: 'User not found' });
        }

        // If user is found, send a 200 status with the user data, excluding password
        const { username, address } = userInfo;
        return res.status(200).json({
            data: {
                username,
                email,
                address
            }
        });
    } catch (err) {
        console.log('ERROR OCCURRED', err);
        // In case of any server error, send a 500 status with an error message
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = getUserInfo;

module.exports = {
    storingCredentialsInDb,
    credentialVerification,
    getAllData,
    postData,
    putData,
    deleteData
};
