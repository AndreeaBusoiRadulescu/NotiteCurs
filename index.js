import express from 'express';
import bodyParser from 'body-parser';

let app = express();

let port = process.env.PORT || 8000;
app.listen(port);
console.log("API is running at " + port);