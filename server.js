// npm packages
import 'dotenv/config.js'
import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import formData from 'express-form-data'
import OpenAI from 'openai'


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const completion = openai.chat.completions.create({
  model: "gpt-4o-mini",
  store: true,
  messages: [
    {"role": "user", "content": "write a haiku about ai"},
  ],
});

completion.then((result) => console.log(result.choices[0].message));

// connect to MongoDB with mongoose
import './config/database.js'

// import routes
// import { router as profilesRouter } from './routes/profiles.js'
// import { router as authRouter } from './routes/auth.js'


// create the express app
const app = express()

// basic middleware
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(formData.parse())

// mount imported routes
// app.use('/api/profiles', profilesRouter)
// app.use('/api/auth', authRouter)

// handle 404 errors
app.use(function (req, res, next) {
  res.status(404).json({ err: 'Not found' })
})

// handle all other errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message })
})

export { app }
