const fs = require('fs');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// const userRouter = require('./src/routes/user')
const dishRouter = require('./src/routes/dish')
const diaryRouter = require('./src/routes/diary')
const analyzeRouter = require('./src/routes/analyze')
const imageRouter = require('./src/routes/image')

// app.use('/user', userRouter);
app.use('/dish', dishRouter);
app.use('/diary', diaryRouter);
app.use('/analyze', analyzeRouter);
app.use('/analyze', imageRouter);


// TEST API
app.get('/test', (req, res) =>  res.status(200).json({ status: 'success' }))
app.post('/test', (req, res) =>  res.status(200).json({ status: 'success' }))

app.listen(3000, () => {
    console.log('Listening on');
    console.log(':: http://localhost:3000');
})

