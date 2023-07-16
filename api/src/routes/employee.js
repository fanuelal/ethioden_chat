import express from "express";
import { createEmployee,fetchAllRecentEmployee, fetchAllEmployee, getSingleEmployee, updateEmployee, deleteEmployee } from "../controllers/employee.js";
const router = express.Router()
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const destinationPath = './src/images';
      if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath, { recursive: true });
      }
      cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage: storage });


router.post('/', createEmployee);
router.get('/recent/:id',fetchAllRecentEmployee);
router.get('/', fetchAllEmployee);
router.get('/:id', getSingleEmployee);
router.patch('/:id', upload.single('file'),updateEmployee);
router.delete('/:id', deleteEmployee)
export default router;