const client = require("../Config/db.config");

const getMyTenatsAndProperties = async(req, res ) => {
    const id = parseInt(req.params.id);
    try{
        client.query(`SELECT r.rentee_id, r.property_id, r.full_name, r.unit, p.p_address, p.p_city, p.p_town, p.p_zip_code, p.p_name
                FROM rentees r
                INNER JOIN landlordProperty p ON r.property_id = p.property_id
                INNER JOIN users u ON p.landlord_id = u.userid
                WHERE u.userid = $1`,[id],(error, results) => {
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

/////////////////////////////////////////////////////////////////////////////////////////////
//CHATS

//LANDLORD SEND MESSAGES TO SPECIFI TENANT(S) TO A SPECIFIC ACCOMMODATION

const sendToSpecificUser = async(req, res ) => {
    const id = parseInt(req.params.id);
    const {nortType, subject, recipient, message} = req.body;

    try{
        client.query(`INSERT INTO nortifications (landlord_id, tenant_id, subject, notif_type, message)
            VALUES ($1, $2, $3, $4, $5)`,[id, recipient, subject, nortType, message ],(error, results) => {
                if(error){
                    return res.status(400).json({
                        message: "Unable to send message to a specific tenant(s)"
                    });
                }
               return res.status(200).send({ message: 'Message send successfully'}); //Return a status 200 if there is no error
            })
    }catch{
        res.status(500).json({
            error: "Database error when viewing pending tenants", //Database connection error
        });
    } 
}
module.exports = {
    getMyTenatsAndProperties,
    sendToSpecificUser
}

