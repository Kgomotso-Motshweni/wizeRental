const client = require("../Config/db.config");

const CreateMOA = async(req, res ) => {
    const {tenant_id, property_id, full_name, unit, rent, paymentstatus, moa_status, agreeStartDate, agreeEndDate, payStartDate, payendDate, agreementType } = req.body

    try{
        //Insert user pending tenant into rentees table
        const data = await client.query(`INSERT INTO rentees (tenant_id, property_id, full_name, unit, rent, paymentstatus, moa_status ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7 ) RETURNING rentee_id`,[tenant_id, property_id, full_name, unit, rent, paymentstatus, moa_status ])
        const user = data.rows[0].rentee_id;

        await client.query(`INSERT INTO MOA (rentee_id, amount, agreeStartDate, agreeEndDate, payStartDate, payendDate, agreementType)
            VALUES ($1, $2, $3, $4, $5, $6, $7 )`,[user,rent, agreeStartDate, agreeEndDate, payStartDate, payendDate, agreementType ])
        
        await client.query(`DELETE FROM applicationform WHERE full_name=$1`,[full_name], (error, results) => {
            if(error){
                return res.status(400).json({
                    message: "Unable to retrieve accept tenant"
                });
            }
            //Return a status 200 if there is no error
            return res.status(200).send({messages:"tenant successfuly approved"});
        }) 
           
    }catch (err) {
        res.status(500).json({
            error: "Database error when viewing pending tenants", //Database connection error
        });
    } 
}

module.exports = {
    CreateMOA
}
