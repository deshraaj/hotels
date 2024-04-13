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
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person.js');


const app = express();
app.use(bodyParser.json());//req.body
const PORT = process.env.PORT||3000;

const logRequest = (req,res,next)=>{
    console.log(`[${new Date()}] Request made to : ${req.originalUrl}`);
    next();
}
app.use(logRequest)

passport.use(new LocalStrategy(async(username,password,done)=>{
    //authentication logic here
    try {
        console.log('Received credendials:',username,password);
        const user = await Person.findOne({username:username});
        if(!user){
            return done(null,false,{message:'Incorrect username'});
        }
        
        const isPasswordMatch = user.password===password?true:false;
        if (isPasswordMatch){
            
            return done(null,user);
        }
        else{
            
            return done(null,false,{message:"Incorrect password"});
        }
        
    } catch (err) {
        return done(err);
    }
}));

app.use(passport.initialize());



console.log('Hiii bro!!!')

app.use('/person',personRoute);


app.use('/menu',menuRoute);
const localAuthMiddleware = passport.authenticate('local',{session:false});
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