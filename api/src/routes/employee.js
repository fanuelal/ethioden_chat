import express from "express";
import { createEmployee, fetchAllEmployee, getSingleEmployee, updateEmployee, deleteEmployee } from "../controllers/employee.js";
const router = express.Router()

router.post('/', createEmployee);
router.get('/', fetchAllEmployee);
router.get('/:id', getSingleEmployee);
router.patch('/:id', updateEmployee);
router.delete('/:id', deleteEmployee)
export default router;
