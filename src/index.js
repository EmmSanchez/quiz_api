import express from "express";
import cors from "cors";
import { QuestionController } from "./controllers/questions.js";

const allowedOrigins = [
  "http://localhost:5173",
  "https://quiz-app-web-plum.vercel.app",
];

const app = express();
app.disable("x-powered-by");

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

const PORT = process.env.PORT ?? 5173;

app.get("/questions", QuestionController.getRandomQuestions);

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
