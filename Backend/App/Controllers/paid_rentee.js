const express = require('express');

const Client = require('../Config/db.config')


//delete rentee

exports.delete_rentee = async (req,res) =>{
const id = parseInt(req.params.id);
    try {
        

    const deleteUser = await Client.query('SELECT FROM rentees WHERE  = $1',[id],(err)=>{
        if(err)
        {
            res.status(400).send("Failed to delete datanase error")
        }else{
            res.status(200).json({
                message:`user with id {$id} has been removed`
            })
        }
    })

    } catch (error) {
        
    }

}