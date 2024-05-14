const express = require('express');
const { errorHandle } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db');

require('dotenv').config();

const app = express();
// console.log(process.env.MONGO_URI);
connectDB();

const port = 5000;

app.use(errorHandle);

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/todos', require('./routes/todoRoutes'))

app.use('/api/goals', require('./routes/goalRoutes'));
app.use('/api/users', require('./routes/userRoutes')); //added user route

const setTodo = (req, res) => {
    if(!req.body.text) {
        res.status(400);
        throw new Error('Please add text field');
    }
    res.status(200).json({message: 'Set todo'})
}

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});