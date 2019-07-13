const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text => text.toUpperCase());

// logger middleware
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.log('Unable to append to log.');
    }
  });
  next();
});

// maintenance mode
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// express.static takes the absolute path or:
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  // res.send('Hello World !!!');
  // res.send({
  //   name: 'Emily',
  //   likes: [
  //     'Drawing',
  //     'Towers'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Cool Home Page',
    welcomeMessage: 'Welcome to the COOLEST website'
  })
});

app.get('/about', (req, res) => {
  // res.send('<h1>About Page</h1>');
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  })
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));