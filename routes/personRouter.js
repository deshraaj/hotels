
const person = require('./../models/person.js')
const express = require('express');
const router = express.Router();
const {jwtAuthMiddleware,generatetoken} = require('./../jwt');
const Person = require('./../models/person.js');

router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try {
        const userData = req.user;
        console.log('User Data: ',userData);
        const userId = userData.id;
        const user = await person.findById(userId);
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal server error'})
    }
})


router.get('/',jwtAuthMiddleware,async(req,res)=>{
    try {
        const data = await person.find();
        console.log('Data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal server error'})
    }
})




router.get('/:workType',async(req,res)=>{
    try {
        const workType = req.params.workType;
        if (workType=='chef'||workType=='waiter'||workType=='manager') {
            const response = await person.find({work:workType});
            console.log('response fetched');
            res.status(200).json(response);


        } else {
            res.status(404).json({error:'Invalid work type'})
        }
    } catch (err) {
        res.status(500).json({error:err})
    }
})




router .post('/signup',async(req,res)=>{
    try {
        const data = req.body; //Assuming the request body conatians the person data

    //Create a new Person document using the Mongoose model
        const newPerson = new person(data);
        const response = await newPerson.save()
        console.log('Data saved successfully!!!');
        const payload = {
            id:response.id,
            username:response.username
        }
        const token = generatetoken(payload);
        console.log('token is : ',token);
        res.status(200).json({response:response,token:token});

    } catch (err) {
        console.log('Something went wrong!!!')
        res.status(500).json({error:'Internal Server Error'})
    }

    
})

router.post('/login',async(req,res)=>{
    try {
        //Extract username and password from request body
    const {username,password} = req.body;
    //Find user by username
    const user = await person.findOne({username:username});
    // If user does not exist or password does not match, return error
    if (!user|| !(await user.comparePassword(password))){
        return res.status(401).json({error:'Invalid username or password'})
    }

    // generate token
    const payload ={
        id:user.id,
        username:user.username
    }
    const token = generatetoken(payload);

    //return token as response
    res.json({token:token
    })
    } catch (err) {
      console.error(err);
      res.status(500).json({error:"Internal server error"})  
    }
    
})


router.put('/:id',async(req,res)=>{
    try {
        const personID = req.params.id;//extract the id from the URL parameter
        const updatedPersonData = req.body;//updated data for the person

        const response = await person.findByIdAndUpdate(personID,updatedPersonData,{
            new:true,//return the updated document
            runValidators:true,//run mongoose validation
        })

        if (!response){
            return res.status(404).json({erro:'person not found'})
        }
        console.log('Data updated successfully'),
        res.status(200).json(response)
    } catch (err) {
        console.log("Didn't updated some error occured"),
        res.status(500).json({error:'Internal server error'})
    }
})


router.delete('/:id',async(req,res)=>{
    try {
        const personID = req.params.id;
        const response = await person.findByIdAndDelete(personID);

        if (!response){
            return res.status(404).json({erro:'person not found'})
        }


        console.log('person deleted successfully');
        res.status(200).json(response);
    } catch (err) {
        console.log("cann't delete the person");
        res.status(200).json({error:'Internal server error'});
    }
})


module.exports = router