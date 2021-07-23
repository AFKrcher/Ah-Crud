const express = require('express');
const config = require('./knexfile.js')
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;
const environment = process.env.NODE_ENV || 'development';
const knex = require('knex')(require('./knexfile.js')[environment]);
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/blogs', (req, res) => {
    knex
        .select('*')
        .from('list')
        .orderBy('id', 'asc')
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500) && console.log(err))
});

app.get('/:id', (req, res) => {
    knex
        .select('*')
        .from('list')
        .where('id', req.params.id)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500) && console.log(err))
});

app.post('/blogs', (req, res) => {
    knex('list')
        .insert([{title: req.body.title, body: req.body.body}])
        .then(data => res.status(201).json(data))
        .catch(err => res.status(500) && console.log(err))
});

app.put('/blogs', (req, res) =>{
    knex('list')
        .where('id', req.body.id)
        .update({title: req.body.title, body: req.body.body})
        .then(data => res.status(204).json(data))
        .catch(err => res.status(500) && console.log(err))
})

app.delete('/blogs', (req, res) =>
{
    knex('list')
        .where('id', req.body.id).del()
        .then(data => res.status(202).send('Blog Successfully removed'))
        .catch(err => res.status(500) && console.log(err))
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))