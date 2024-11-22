const express = require('express');
const router = express.Router();
const Password = require('../models/Password');
const crypto = require('crypto');

// Encryption key and initialization vector
const SECRET_KEY = crypto.randomBytes(32);
const encrypt = (text) => {
    const cipher = crypto.createCipheriv('aes-256-ctr', SECRET_KEY, Buffer.alloc(16, 0));
    return cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
};

const decrypt = (encryptedText) => {
    const decipher = crypto.createDecipheriv('aes-256-ctr', SECRET_KEY, Buffer.alloc(16, 0));
    return decipher.update(encryptedText, 'hex', 'utf8') + decipher.final('utf8');
};

// @route POST /add-password
router.post('/add-password', async (req, res) => {
    const { label, password } = req.body;

    if (!label || !password) {
        return res.status(400).json({ message: 'Label and password are required' });
    }

    try {
        const encryptedPassword = encrypt(password);
        const newPassword = new Password({ label, password: encryptedPassword });
        await newPassword.save();
        res.status(201).json({ message: 'Password saved successfully' });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: 'Label already exists' });
        } else {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
});

// @route GET /get-password/:label
router.get('/get-password/:label', async (req, res) => {
    const { label } = req.params;

    try {
        const passwordEntry = await Password.findOne({ label });
        if (!passwordEntry) {
            return res.status(404).json({ message: 'Label not found' });
        }

        const decryptedPassword = decrypt(passwordEntry.password);
        res.status(200).json({ label, password: decryptedPassword });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// @route GET /list-labels
router.get('/list-labels', async (req, res) => {
    try {
        const labels = await Password.find().select('label -_id');
        res.status(200).json(labels.map(entry => entry.label));
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
