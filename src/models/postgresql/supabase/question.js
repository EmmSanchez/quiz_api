import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const API_URL = process.env.SUPABASE_URL;
const API_KEY = process.env.SUPABASE_KEY;

const supabase = createClient(API_URL, API_KEY);

export class QuestionModel {
  static async getRandomQuestions({ topic, difficult }) {
    try {
      let query = supabase.from("questions").select("*");
      if (topic) {
        query = query.eq("topic", topic);
      }
      if (difficult) {
        query = query.eq("difficult", difficult);
      }
      const { data, error } = await query;

      if (error) {
        console.error("Error fetching questions:", error);
        return [];
      }

      return data;
    } catch (error) {
      console.error("Unexpected Error:", error);
      return [];
    }
  }
}
