const express = require('express');
const router = express.Router();
const Database = require('nedb');
const route = new Database({filename: 'database/student.db', autoload:true }); 
const bodyParser =require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));




router.post('/Name/:Name', async (req,res) => {
    try
    { await route.find({Name: req.params.Name}, (err,data) => {
      if(err)
      {
        res.status(500).json({message:'Server Side Error: ' + Error});
      }
      if(data==false)
      {
         route.insert(req.body)
        res.send(`<h1>Student Personal Data has been Added Successfully</h1>`);
      }
      else
      {
        res.status(200).json({message: ('Already Exist')});
      }
  
    })
  }
  
    catch(Error)
    {
       res.status(500).json({message:'Server Side Error: ' + Error});
    }
  
  })


  router.get('/avgscore', async (req,res) => {
    try
    {
      let avgScore = 0;
      await route.find({}, function (err,docs) {
        docs.map((value) => {
          avgScore += value.score;
         })
      
      res.status(200).json({"AvgScore of Total Students" : avgScore/docs.length })   
      })
    }

    catch(Error)
    {
       res.status(500).json({message:'Server Side Error: ' + Error});
    }
  })

  

  module.exports = router;