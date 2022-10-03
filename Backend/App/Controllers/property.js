const express = require('express')
const Client = require('../Config/db.config')


exports.property = async (req,res) =>{

  try {
    
        const Userdata = await Client.query('SELECT * FROM landlordProperty',(err,result)=>{
            if(err)
            {
                // console.log("successful")
                res.status(400).send("Failed")
            }else{
               
                res.status(200).send(result.rows)
                // console.log("successful")
            }
        })


  } catch (error) {
      
  }
}