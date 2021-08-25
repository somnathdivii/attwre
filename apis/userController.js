// const express = require('express');
// const env = require('dotenv').config()
// // const ejs = require('ejs');
// const path = require('path');
// const app = express();
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const Workreport = require('../models/workreport');


class Apps {

    createWorkreport = async (req, res) => {
        console.log(req.body);
        const workrept = new Workreport({
            xpname: req.body.xpname,
            report: req.body.report,
            timespent: req.body.timespent,
            created_by: req.body.created_by,
            create_date: Date(),
        })

        try {
            const newWorkreport = await workrept.save()
            res.status(201).json({ 'status': 'true', message: "Workreport saved successfully." })
        } catch (err) {
            res.status(400).json({ message: err.message })
        }

    }
    testData = async (req, res) => {
        try {
            res.send('hello world')
        } catch (err) {
            res.json({ message: err.message })
        }
    }
}
const apps = new Apps();
module.exports = apps;