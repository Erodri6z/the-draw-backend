import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

async function generateResponse(req, res){
  try {
    const { prompt } = req.body;
    console.log("prompt", prompt)
    if (!prompt) {
      return res.status(400).json({ error: 'There is nothing here to talk about' })
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt + "Please anwser in 9 Sentences Max and under 300 tokens with the card meanings in mind regardless of if its positive or not. Also Include a final sentence with advice" }],
      max_tokens : 300
    })

    const message = completion.choices[0].message.content
    res.json({ response: message.replace(/\n/g, " ") })
  } catch (error) {
    console.error("Somethings wrong with openai", error)
    res.status(500).json({ error: 'Failed to generate response'})
  }
}

export {
  generateResponse
}