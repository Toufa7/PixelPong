import express, {Express} from 'express'


const app = express();
const db = require('./database/db');
const bodyparser = require('body-parser'); 


app.use(bodyparser.json())
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
)


app.get('/', (req, res) =>{
    res.json({ info: 'Node.js, Express, and Postgres API' })
});
 
app.get('/users', db.getUsers)
app.listen(3000, ()=>console.log("sever run ............."));