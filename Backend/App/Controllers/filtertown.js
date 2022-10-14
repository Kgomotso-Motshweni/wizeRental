const express = require('express')
const Client = require('../Config/db.config')


exports.filterTown = async (req,res) =>{
    

  try {
    
        const getp_town = await Client.query('SELECT DISTINCT(p_town) FROM landlordProperty ',(err,result)=>{
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