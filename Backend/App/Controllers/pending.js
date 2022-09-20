const client = require("../Config/db.config");

const getPendingTenants = async(req, res ) => {
    try{
        client.query(`SELECT * FROM applicationform `,(error, results) => {
               if(error){
                   return res.status(400).json({
                       message: "Unable to retrieve all pending tenants"
                   });
               }
               return res.status(200).json(results.rows); //Return a status 200 if there is no error
           })
    }catch{
        res.status(500).json({
            error: "Database error when viewing pending tenants", //Database connection error
        });
    } 
}

const getOnePendingTenants = async(req, res ) => {
    const id = parseInt(req.params.applicant_id);
    try{
        client.query(`SELECT * FROM applicationform WHERE applicant_id=$1`,[id], (error, results) => {
               if(error){
                   return res.status(400).json({
                       message: "Unable to retrieve all pending tenants"
                   });
               }
               return res.status(200).json(results.rows); //Return a status 200 if there is no error
           })
    }catch{
        res.status(500).json({
            error: "Database error when viewing pending tenants", //Database connection error
        });
    } 
}


module.exports = {
    getPendingTenants,
    getOnePendingTenants
  }
