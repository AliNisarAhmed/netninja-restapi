const express = require('express');
const bodyParser = require('body-parser');

const connect = require('./connectMongo/connect');

const routes = require('./routes/api');

const app = express();


app.use(express.static('dist'));

// Body parser
app.use(bodyParser.json());


// Using the imported routes
app.use('/api', routes);

// Error Handling Middleware
app.use(function(err, req, res, next) {
  // console.log(err);
  res.status(422).send({ error: err.message });
})

app.get('/', (req, res) => {
  res.send({ name: "Yoshi" });
})

connect('mongodb://localhost:27017/ninjago')
.then(() => app.listen(process.env.PORT || 3000, () => {
    console.log('server started');
  }))
.catch(e => console.error(e));

