/////////////////
//Dependencies 
////////////////
require('dotenv').config();
const {PORT, NODE_ENV} = process.env;
const express = require('express');
const app = express();
const mongoose = require('./DB/conn');
const morgan = require('morgan');
const cors = require('cors');
const corsOptions = require('./configs/cors')
//Anyone accessing the User Homepage or making an event needs this
const authRouter = require('./controllers/auth/Outreach');

//This is the part that checks user authentication with jwt
const auth = require('./authMiddleware/authMiddleware');
const outreachRouter = require("./controllers/Outreach");

///////////////
//Middleware
//////////////

//Ternary Operator to allow us to switch from dev to production
app.use(NODE_ENV === 'production' ? cors(corsOptions) : cors());
app.use(express.json());
app.use(morgan("tiny"));

/////////////
//Routers
////////////

//Auth Router: localhost:4500/auth (ex. localhost:4500/auth/userHomepage)
app.use('/auth', authRouter);

app.use('/', outreachRouter)


///////////
//Routes
//////////
app.get('/', (req, res) => {
  res.json(req.payload);
})


//Not sure if this goes here or if it goes int Controllers
// app.get('/auth/userHomepage', auth, (req, res) => {
//   res.json(req.payload);
// })


/////////////
//Listener
////////////
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
})