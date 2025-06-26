import { Router } from "express"
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as openAiCtrl from '../controllers/openai.js'

const router = Router()

router.use(decodeUserFromToken)
router.post('/reading', checkAuth, openAiCtrl.generateResponse)

export {
  router
}