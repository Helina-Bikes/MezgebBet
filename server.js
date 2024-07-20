const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const path = require('path');


app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(session({
  secret: uuidv4(),
  resave: false,
  saveUninitialized: true
}));


const loginn = require('./authetication/loginn'); 

app.use('/route', loginn);
app.use(express.static('projectt2/authetication'));

app.get('/', (req, res) => {
  res.render('adme', { title: "login system" });
});

app.get('/admin', (req, res) => {
  res.sendFile('Admin.html', { root: __dirname + '/public' });
});

const port = process.env.PORT || 8877




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
 