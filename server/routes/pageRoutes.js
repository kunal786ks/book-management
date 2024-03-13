const express=require('express');
const { addPages, getBookPages } = require('../controller/pageController');

const router=express.Router();

router.post('/add-page',addPages)
router.get('/book-page',getBookPages)

module.exports=router;