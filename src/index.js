import express from "express";
import { QuestionController } from "./controllers/questions.js";

const app = express();
app.disable("x-powered-by");

const PORT = process.env.PORT ?? 1234;

app.get("/questions", QuestionController.getRandomQuestions);

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
