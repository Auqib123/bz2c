const express = require("express")
const bodyParser = require("body-parser");
const cors = require('cors')
const router = require('./routes/routes');



const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// CORS access and can restrict here for perticular urls
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
//app routes
app.use('/api', router);
// working msg
app.get("/", (req, res) => {
    res.send('success.....');
});

app.listen((process.env.PORT || 3000));