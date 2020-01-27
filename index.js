const express = require('express');
const app = express();
const path = require('path');

app.set('port', process.env.PORT || 3000);
app.use(express.static('dist'));
app.set('helpers', path.join(__dirname, '/helpers'));
app.set('view engine', 'ejs');

app.use('/', require('./routes/main'))

app.listen(app.get('port'), ()=> {
    console.log(`server on port ${app.get('port')}`);
})