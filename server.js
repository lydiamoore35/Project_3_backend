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
const authRouter = require('./controllers/auth/Outreach');
const auth = require('./authMiddleware/authMiddleware');

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


//Auth Router: localhost:3000/auth (ex. localhost:3000/auth/userHomepage)
app.use('/auth', authRouter);
const outreachRouter = require("./controllers/outreach");



///////////
//Routes
//////////

//Auth Route: This will be used for any pages that a user needs to be logged in to see
//If I use auth here then it will require people to sign in before they see the root route
// app.get('/', auth, (req, res) => {
//   res.json(req.payload);  
// })

app.get('/', (req, res) => {
  res.json(req.payload);
})


/////////////
//Listener
////////////
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`)
})