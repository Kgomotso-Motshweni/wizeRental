const express = require('express')
const Client = require('../Config/db.config')


exports.filter = async (req,res) =>{
    
    const {p_price,p_type,room_type} = req.body

  try {
    
        const getdata = await Client.query('SELECT * FROM landlordProperty WHERE p_price >= $1 AND p_price <= $1 AND p_type = $2 AND room_type = $3' ,[p_price,p_type,room_type],(err,result)=>{
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