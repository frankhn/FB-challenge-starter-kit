import express from 'express'

//#region Local imports
import { BAD_REQUEST, OK } from './constants/statusCodes'


const app = express();

app.use(express.json());

app.use(express.static(`${__dirname}/`))


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );

    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE");
      return res.status(BAD_REQUEST).json({
        status: BAD_REQUEST,
        accepted: "PUT, POST, GET, DELETE",
      });
    }
    return next();
})


// Example route
app.get('/', (req, res) => {
  return res.status(OK).json({
    status: OK,
    message: "Congrats, You've managed to reach the API",
  });
});

app.use((req, res) => {
  res.status(BAD_REQUEST).json({
    status: BAD_REQUEST,
    message: 'The API you\'re trying to reach doesn\'nt exist',
  })
})

export default app;
