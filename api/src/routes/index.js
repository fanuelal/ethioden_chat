import  express  from "express"
import chatRoute from './chat.js'
import employeeRoute from './employee.js'
import roomRoute from './room.js'
const router = express.Router()

router.use('/employee', employeeRoute)
router.use('/chat', chatRoute)
router.use('/room', roomRoute)


export default router;