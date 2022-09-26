const express = require('express')
const Client = require('../Config/db.config')


exports.getProp = async (req,res) =>{
    const id = parseInt(req.params.id)
  try {
    
        const getdata = await Client.query('SELECT * FROM landlordProperty  WHERE property_id = $1',[id],(err,result)=>{
            if(err)
            {
                // console.log("successful")
                res.status(400).send("Failed")
            }else{
               
                res.status(200).send(result.rows)
                
            }
        })


  } catch (error) {
      
  }
}