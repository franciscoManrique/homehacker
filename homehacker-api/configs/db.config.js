const mongoose = require('mongoose');
const DB_NAME = "homehacer";
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true })
.then(()=>console.log(`Connected to db ${MONGO_URI}`))
.catch(error => console.log(`An error ocurred ${error}`));
