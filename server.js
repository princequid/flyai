const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');
const mongoose = require('mongoose');
const flyersRouter = require('./routes/flyers');
const templatesRouter = require('./routes/templates');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('AI Flyer Generator Backend is running!');
});

app.post('/api/ai/suggest', async (req, res) => {
  const { title, description } = req.body;
  if (!title && !description) {
    return res.status(400).json({ error: 'Missing title or description' });
  }
  try {
    const prompt = `You are a professional graphic designer. Given the following flyer details, suggest a design style (Modern, Corporate, Vintage, Bold, Minimalist), a primary color (hex), and a font (Sans, Serif, Mono, Display, Modern).\n\nTitle: ${title}\nDescription: ${description}\n\nRespond in JSON: {\"style\":..., \"color\":..., \"font\":...}`;
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 150,
    });
    const text = completion.data.choices[0].message.content;
    let suggestion;
    try {
      suggestion = JSON.parse(text);
    } catch {
      suggestion = { style: 'Modern', color: '#2563eb', font: 'Sans' };
    }
    res.json(suggestion);
  } catch (err) {
    res.status(500).json({ error: 'AI suggestion failed', details: err.message });
  }
});

app.use('/api/flyers', flyersRouter);
app.use('/api/templates', templatesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 