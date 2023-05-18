import  mysql  from "mysql2";
import dotenv from 'dotenv';
dotenv.config()


const con =  mysql.createConnection({
    // host: "localhost",
    // user: "root",
    // password: "",
    // database: "ethioden"
    
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
})
const sqlQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DB};`;
                                    
con.connect((error) => {
    if(error) console.log(error) 
    con.query(sqlQuery, (err, result, field) => {
        if(err) console.log(err);
        // console.log(result);
    })
});

// sequelize.authenticate()
// .then(() => console.log('DB Connected'))
// .catch((error) => console.log("error: ", error))
export default con;