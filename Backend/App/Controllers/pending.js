const client = require("../Config/db.config");

const getPendingTenants = async(req, res ) => {
    const id = parseInt(req.params.userid);
    try{
        client.query(`SELECT a.applicant_id, a.tenant_id, a.property_id, a.full_name, a.email, a.phone_num, a.age, a.id_doc, a.occupation, a.view_date, a.num_tenants, a.num_pets, a.ped_desc, a.smoke, a.app_create_time,
            l.p_address, p_city, l.p_town, l.p_zip_code, l.p_name
            FROM applicationform a
            INNER JOIN landlordproperty l ON a.property_id = l.property_id
            INNER JOIN users u ON l.landlord_id = u.userid
            WHERE u.userid = $1;`,[id],(error, results) => {
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

const CreateMOA = async(req, res ) => {
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
