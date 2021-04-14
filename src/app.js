import express from 'express'

//#region Local imports
import { BAD_REQUEST, OK } from './constants/statusCodes'
import { questions } from './data/questions';


const app = express();

app.use(express.json());

app.use(express.static(`${__dirname}/`))


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );

  // Allowed http methods
  
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


app.get('/questions', (req, res) => {
  return res.status(OK).json({
    status: OK,
    questions
  })
})


app.get("/questions/:index", (req, res) => {
  return res.status(OK).json({
    status: OK,
    question: questions[req.params.index],
  });
});

app.post("/questions/add", (req, res) => {
  questions.push({ ...req.body });
  return res.status(OK).json({
    status: OK,
    questions,
  });
})

app.delete("/questions/:id", (req, res) => {
  const newQuestioins = [];
  console.log(
    req.params.id,
    typeof req.params.id,
    typeof Number(req.params.id),
    Number(req.params.id)
  );
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].id !== Number(req.params.id)) {
      newQuestioins.push(questions[i]);
    }
  }
  return res.status(OK).json({
    status: OK,
    newQuestioins,
  });
});


// catch a non existing API Endpoint.
app.use((req, res) => {
  res.status(BAD_REQUEST).json({
    status: BAD_REQUEST,
    message: 'The API you\'re trying to reach doesn\'nt exist',
  })
})

export default app;
