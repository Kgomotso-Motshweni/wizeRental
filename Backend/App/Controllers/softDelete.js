
const Client = require('../Config/db.config')

//soft delete rentee
module.exports = softDelete = async (req,res) =>{
const id = parseInt(req.params.id);
    try {
     Client.query(`INSERT INTO SoftDelete 
     SELECT * FROM rentees WHERE rentee_id = $1`,[id],(err)=>{
        if(err)
        {
            res.status(400).send("Failed to impletement soft delete ")
        }else{
            res.status(200).json({
                message:`user with id ${id} has been softdeleted`
            })
        }
    })

    } catch (error) {
        
    }

}