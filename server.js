// let fs = require('fs')
// let os = require('os')
// let imp = require('./node.js') 

// // let user = os.userInfo();
// // console.log(user.username,'😊❤️')
// // console.log(imp.age)
// // console.log(imp.add(4,6))
// // fs.appendFile('Greting.txt','Hii jaan!!! I love You❤️\n',()=>console.log('File created'))
// let temp = '{"Name":"Deshraj","Age":"22","Branch":"Mech"}'
// let json = JSON.parse(temp)
// let st = JSON.stringify(json)
// console.log(st)
const express = require('express')
const db = require('./db.js')
const MenuItem = require('./models/MenuItem.js')
const bodyParser = require('body-parser')
const personRoute = require('./routes/personRouter');
const menuRoute = require('./routes/menuRouter');
require('dotenv').config();
const passport = require('./auth.js');


const app = express();
app.use(bodyParser.json());//req.body
const PORT = process.env.PORT||3000;

const logRequest = (req,res,next)=>{
    console.log(`[${new Date()}] Request made to : ${req.originalUrl}`);
    next();
}
app.use(logRequest)



app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local',{session:false});

console.log('Hiii bro!!!')

app.use('/person',localAuthMiddleware,personRoute);


app.use('/menu',localAuthMiddleware,menuRoute);

app.get('/first',localAuthMiddleware,(req,res)=>{
    const sde = {
        'fronteEnd':'UI',
        'backEnd':'NodeJS',
        'fullStack':'BackEnd&Frontend'
    }
    const info =  {
        _id:'6612eab76895ff732716c9b5',
        id: 1,
        username: 'Deshraj',
        age: 25
      }
    const employee = {
        "Info":info,
        "Role":sde,
        
    }
    let discription = "Myself Deshraj singh and I'm form Prayagraj Uttar Pradehs"
    res.send(employee)
})
//comment added for testing purpose
app.listen(PORT,()=>{console.log('server is listening on cloud server')})