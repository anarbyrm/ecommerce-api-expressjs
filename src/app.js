const express = require('express');

const sequelize = require('./utils/database');
const allRoutes = require('./routes/allRoutes');

const app =  express();
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.get('/', (req, res) => {
    return res.status(200).json({"message": "Welcome to Book store!"});
})

app.use(allRoutes);

sequelize.authenticate()
    .then(() => {
        console.log('Connected to the database...');
        return sequelize.sync();
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`app is listening on port ${PORT}`);
            console.log(`site running on http://localhost:${PORT}`);
        })
    })
    .catch(err => {
        console.log(err);
    });
