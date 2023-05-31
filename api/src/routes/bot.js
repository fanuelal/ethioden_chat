import express from 'express'
import { getsuggestion} from '../controllers/bot.js'
const router = express.Router()

router.get('/', getsuggestion)
// router.get('/:id', getSingleChat)
// router.post('/', createChat)
// router.patch('/:id', updateChat)
// router.delete('/:id', deleteChat)

export default router;