import  express  from "express"
import chatRoute from './chat.js'
import employeeRoute from './employee.js'
import roomRoute from './room.js'
import botRoute from './bot.js'
import statusRoute from './status.js'
const router = express.Router()

router.use('/employee', employeeRoute)
router.use('/chat', chatRoute)
router.use('/room', roomRoute)
router.use('/bot', botRoute)
router.use('/status', statusRoute)
export default router;