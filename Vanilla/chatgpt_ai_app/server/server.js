import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {Configuration, OpenAIApi} from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY
}));

app.post('/', async (req, res) => {
  try {
    const {prompt} = req.body;
    const response = await openai.createCompletion({
      prompt,
      model: 'text-davinci-003',
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0
    })
    res.status(200).json({success: true, bot: response.data.choices[0].text})
  } catch (error) {
    res.status(500).json({success: false, message: error})
  }
})


app.listen(8080, () => {
  console.log('Server is running on port http://localhost:8080')
})
