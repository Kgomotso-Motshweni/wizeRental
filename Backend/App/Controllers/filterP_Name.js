const express = require('express')
const Client = require('../Config/db.config')


const filterName = async (req,res) =>{
    try {
        const getdata = await Client.query('SELECT DISTINCT(p_name) FROM landlordProperty', (err, result)=>{
            if(err){
                return res.status(400).json({
                    message: "Unable to get filter values"
                }) //Throw the error in 
            }else{
                res.status(200).send(result.rows)
                    
            }
        })
    } catch (error) {
        res.status(500).json({
            error: "Database error while calling filter values!", //Database connection error
          }); 
    }
}

module.exports = {
    filterName
}