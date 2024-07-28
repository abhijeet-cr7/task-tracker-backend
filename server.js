const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require("./modal/database");
const auth = require("./routes/auth");
const cors = require("cors");
const app = express();
const port = 5000;
connectDB();
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/', auth);
app.listen(port , (err) => {
    if(err){
        console.log(`The server is not running as there is error ${err}`);
    }
    console.log(`Server is up and running port ${port}`)
});




