const asyncHanlder = require('express-async-handler');
const Todo = require('../models/todoModels');

const getTodos = asyncHanlder(async (req, res) => {
    // res.status(200).json({message: 'Get todos'})
    const todos = await Todo.find({ user: req.user.id });
    res.status(200).json(todos);
});

// const setTodo = (req, res) => {
//     res.status(200).json({message: 'Set todo'})
// }

const setTodo = asyncHanlder(async (rec, res) => {
    if(!req.body.text) {
        res.status(400);
        throw new Error('Please add text field');
    }
    const todo = await Todo.create({
        text: req.body.text,
        user: req.user.id,
    });
    res.status(200).json(todo);
})

// const updateTodo = (req, res) => {
//     res.status(200).json({message: `Update todo ${req.params.id}`})
// }

const updateTodo = asyncHanlder(async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if(!todo) {
        res.status(400);
        throw new Error("Todo not found");
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });

    res.status(200).json(updateTodo);
})


// const deleteTodo = (req, res) => {
//     res.status(200).json({message: `Delete todo ${req.params.id}`})
// }

const deleteTodo = asyncHanlder(async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    if(!todo) {
        res.status(400);
        throw new Error('Todo not found');
    }
    
    await todo.remove();

    res.status(200).json({ id: req.params.id });
})

module.exports = {
    getTodos,
    setTodo,
    updateTodo,
    deleteTodo
}