
import jwt from 'jsonwebtoken'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config({ path: '../../.env' })

const app = express()

const checkToken = async (req, res, next) => {
    const header = req.headers['authorization'];
    
    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
    
        res.status(403).json({success: false, data: null, message: 'failed authorization!'})
    }
    }
    
const authorize = app.use('/', checkToken, async (req, res, next) => {
    
    jwt.verify(req.token, process.env.TOKEN_KEY, (err, authorizedData) => {

        if(err){

            res.status(403).json({success: false, data: null, message: 'you are not authorized user!'});

        } else {
            req.userType = authorizedData.userType;
            next();
        }
    })
});


export default authorize