const express = require('express');

const Client = require('../Config/db.config')

//delete rentee
module.exports = delete_rentee = async (req,res) =>{
const id = parseInt(req.params.id);
    try {
        
    await Client.query('DELETE FROM moa WHERE rentee_id = $1',[id])

    Client.query('DELETE FROM rentees WHERE rentee_id = $1',[id],(err)=>{
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