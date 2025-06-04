import { Router } from "express"
import * as openAiCtrl from '../controllers/openai.js'

const router = Router()

router.post('/reading', openAiCtrl.generateResponse)

export {
  router
}