const client = require("../Config/db.config");


const FilterTenants = async(req, res) => {
    const p_name = req.params.p_name;
    try{
        client.query(`SELECT r.full_name, r.tenant_id
            FROM rentees r
            INNER JOIN landlordproperty l ON r.property_id = l.property_id
            INNER JOIN users s ON l.landlord_id = s.userid
            AND l.p_name = $1`,[p_name],(error, results) => {
            if(error){
                return res.status(400).json({
                   message: "Unable to retrieve all tenants per accommodation"
                });
            }
            return res.status(200).json(results.rows); //Return a status 200 if there is no error
        })
    }catch{
        res.status(500).json({
            error: "Database error when filtering tenants per accomodation", //Database connection error
        });
    } 
}

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

// A LANDLORD SENDS MESSAGES TO SPECIFIC TENANTS AT A SPECIFIC ACCOMMODATION.
const sendToSpecificUser = async(req, res ) => {
    const id = parseInt(req.params.id);
    const {nortType, subject, recipient, message} = req.body;
    try{
        client.query(`INSERT INTO LandlordToTenantNortifications (landlord_id, tenant_id, subject, notif_type, message)
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
            error: "Database error when sending tenant(s) messages", //Database connection error
        });
    } 
}

//LANDLORD RECEIVE NOTIFICATION FROM TENANTS REGARDING PROPERTY ISSUES 
const landlordReceive = async(req, res ) => {
    const id = parseInt(req.params.id);
    try{
        client.query(`SELECT * FROM TenantToLandlordNortifications WHERE landlord_id = $1 ORDER BY created_at c`,[id],(error, results) => {
                if(error){
                    return res.status(400).json({
                        message: "Unable to log issues to a specific landlord"
                    });
                }
               return res.status(200).json(results.rows);; //Return a status 200 if there is no error
            })
    }catch{
        res.status(500).json({
            error: "Database error when logging issues to landlord", //Database connection error
        });
    }
}

//TENANT RECEIVE NOTIFICATION FROM LANDLORD 
const tenantReceive = async(req, res ) => {
    const id = parseInt(req.params.id);
    try{
        client.query(`SELECT t.landlord_id, t.tenant_id, t.notif_type,t.message, t.created_at, p.p_name,r.full_name
        FROM tenanttolandlordnortifications t
        JOIN rentees r ON t.tenant_id = r.tenant_id
        JOIN landlordproperty p ON p.property_id = r.property_id
        WHERE t.tenant_id = 1`
                ,[id],(error, results) => {
                if(error){
                    return res.status(400).json({
                        message: "Unable to send message to a specific tenant(s)"
                    });
                }
               return res.status(200).json(results.rows); //Return a status 200 if there is no error
            })
    }catch{
        res.status(500).json({
            error: "Database error when viewing tenants messages", //Database connection error
        });
    } 
}

//TENANT SEND NOTIFICATION TO LANDLORD 
const tenantSend = async(req, res ) => {
    const id = parseInt(req.params.id);
    const {nortType, recipient, message} = req.body;
    try{
        client.query(`INSERT INTO TenantToLandlordNortifications (tenant_id, landlord_id, notif_type, message)
            VALUES ($1, $2, $3, $4)`,[id, recipient, nortType, message ],(error, results) => {
                if(error){
                    return res.status(400).json({
                        message: "Unable to log issues to a specific landlord"
                    });
                }
               return res.status(200).send({ message: 'Message send successfully'}); //Return a status 200 if there is no error
            })
    }catch{
        res.status(500).json({
            error: "Database error when logging issues to landlord", //Database connection error
        });
    }
}


module.exports = {
    getMyTenatsAndProperties,
    sendToSpecificUser,
    landlordReceive,
    tenantReceive,
    tenantSend,
    FilterTenants
}
