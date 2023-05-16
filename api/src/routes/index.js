import  express  from "express"
import chatRoute from './chat.js'
import employeeRoute from './employee.js'
const router = express.Router()

router.use('/employee', employeeRoute)
router.use('/chat', chatRoute)


export default router;