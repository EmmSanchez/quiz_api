import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const API_KEY = process.env.RAILWAY_DATABASE_URL;

const pool = new Pool({
  connectionString: API_KEY,
});

export class QuestionModel {
  static async GetQuestions({ topic, difficult }) {
    try {
      // Query base
      let query = "SELECT * FROM questions WHERE 1=1";
      const values = [];
      let i = 1;

      if (topic) {
        query += ` AND topic = $${i}`;
        values.push(topic);
        i++;
      }
      if (difficult) {
        query += ` AND difficult = $${i}`;
        values.push(difficult);
        i++;
      }

      const { rows } = await pool.query(query, values);
      return rows;
    } catch (error) {
      console.error("Error fetching questions", error);
      return [];
    }
  }
}
