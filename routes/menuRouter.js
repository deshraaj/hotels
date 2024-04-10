const express = require('express');
const menuItem = require('./../models/MenuItem');
const { route } = require('./personRouter');
const router = express.Router();


router.get('/',async(req,res)=>{
    try {
        const data = await menuItem.find();
        console.log('menu data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log('Internal server error');
        res.status(200).json({error:"couldn't get the menu items"});
    }
})

router.post('/',async(req,res)=>{
    try {
        const data = req.body;
        const newItem = new menuItem(data);
        const response = await newItem.save();
        console.log('Menu data saved')
        res.status(200).json(response);
    } catch (err) {
        console.log('Internal server error')
        res.status(500).json({error: 'request failed'});
    }
})

module.exports = router