import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

async function generateResponse(req, res){
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'There is nothing here to talk about' })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }]
    })

    const message = completion.choices[0].message.content
    res.json({ response: message })
  } catch (error) {
    console.error("Somethings wrong with openai", error)
    res.status(500).json({ error: 'Failed to generate response'})
  }
}

