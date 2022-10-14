const express = require('express')
const Client = require('../Config/db.config')


exports.filterProp = async (req,res) =>{
    

  try {
    
        const getPropertytype = await Client.query('SELECT DISTINCT(p_propertytype) FROM landlordProperty ',(err,result)=>{
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