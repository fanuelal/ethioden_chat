import express from 'express'
import { getAllStatus, createStatus, getSingleStatus, updateStatus,  deleteStatus} from '../controllers/status.js'
const router = express.Router()

router.get('/', getAllStatus)
router.get('/:id', getSingleStatus)
router.post('/', createStatus)
router.patch('/:id', updateStatus)
router.delete('/:id', deleteStatus)

export default router;