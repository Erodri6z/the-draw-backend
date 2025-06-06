import { Router } from "express"
import * as tarotCtrl from '../controllers/tarot.js'

const router = Router()

router.get("/:slug", tarotCtrl.proxyImage)

export {
  router
}