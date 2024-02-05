const express = require('express');

const sequelize = require('./utils/database');

const app =  express();
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.get('/', (req, res) => {
    return res.status(200).json({"message": "Welcome to Book store!"});
})

sequelize.authenticate()
    .then(connection => {
        console.log('Connected to the database...')
        return connection.sync();
    })
    .then(result => {
        app.listen(PORT, () => {
            console.log(`app is listening on port ${PORT}`);
        })
    })
    .catch(err => {
        console.log(err);
    })
