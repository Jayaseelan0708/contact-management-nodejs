const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./DbConfig/dbConnection');
const dotenv = require('dotenv').config();

connectDb();
const app = express();

const port = process.env.PORT || 5001;

app.use(cors());

app.use(express.json());
app.use("/contacts", require('./router/contactRouter'));
app.use("/users", require('./router/userRouter'));
app.use(errorHandler)

app.listen(port, ()=>{
    console.log('listening on port ' + port);
;});