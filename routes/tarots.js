import { Router } from "express"
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as tarotCtrl from '../controllers/tarot.js'

const router = Router()

router.use(decodeUserFromToken)
router.get("/:slug", tarotCtrl.proxyImage)

export {
  router
}