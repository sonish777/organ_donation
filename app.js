const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const authController = require('./controller/authController.js');

//app.use(authController.isLoggedIn);

const viewRouter = require('./routes/viewRoutes.js');
const donorRouter = require('./routes/donorRoutes.js');
const hotcRouter = require('./routes/hotcRoutes.js');
const hospitalRouter = require('./routes/hospitalRoutes.js');

const bodyParser = require('body-parser');

app.use(express.json());
app.set('view engine','pug');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:false}));


app.use('/' , viewRouter);
app.use('/donor', donorRouter);
app.use('/hotc', hotcRouter );
app.use('/hospital', hospitalRouter);

app.listen(8000, (err)=> {console.log(err); console.log('Listening to port 8000....') });
