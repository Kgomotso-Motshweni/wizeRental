const express = require('express')
const Client = require('../Config/db.config')


exports.filtername = async (req,res) =>{
    
    const {p_price,p_type,room_type} = req.body

  try {
    
        const getp_name = await Client.query('SELECT DISTINCT(p_name) FROM landlordProperty ',(err,result)=>{
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