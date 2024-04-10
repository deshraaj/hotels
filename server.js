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
const app = express();

app.use(bodyParser.json());//req.body

console.log('Hiii bro!!!')

const personRoute = require('./routes/personRouter');
app.use('/person',personRoute);
const menuRoute = require('./routes/menuRouter');
app.use('/menu',menuRoute);
app.get('/first',(req,res)=>{
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

app.listen(3000,()=>{console.log('server is listening on localhost 3000')})