import { QuestionModel } from "../models/postgresql/question.js";
import { getRandomQuestions } from "../utils/random.js";

export class QuestionController {
  static async getRandomQuestions(req, res) {
    try {
      const { topic, difficult, quantity } = req.query;
      const questions = await QuestionModel.getRandomQuestions({
        topic,
        difficult,
      });

      const mappedQuestions = questions?.map((question) => ({
        question_text: question.question_text,
        options: [
          question.option_1,
          question.option_2,
          question.option_3,
          question.option_4,
        ],
        correct_option: question.correct_option,
        code_text: question.code_text,
      }));

      const randomQuestions = getRandomQuestions(
        0,
        questions.length - 1,
        quantity,
        mappedQuestions
      );

      res.json(randomQuestions);
    } catch (error) {
      console.error("Internal Server Error", error);
    }
  }
}
