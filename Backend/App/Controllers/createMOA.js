const client = require("../Config/db.config");

const CreateMOA = async(req, res ) => {
    const {tenant_id, property_id, full_name, unit, rent, paymentstatus, moa_status, agreeStartDate, agreeEndDate, payStartDate, payendDate, agreementType } = req.body

    try{
        //Insert user pending tenant into rentees table
        const data = await client.query(`INSERT INTO rentees (tenant_id, property_id, full_name, unit, rent, paymentstatus, moa_status ) 
        VALUES ($1, $2, $3, $4, $5, $6, $7 ) RETURNING rentee_id`,[tenant_id, property_id, full_name, unit, rent, paymentstatus, moa_status ])
        const user = data.rows[0].rentee_id;

        //Insert moa details using rentees_id returned from the above 
        await client.query(`INSERT INTO MOA (rentee_id, amount, agreeStartDate, agreeEndDate, payStartDate, payendDate, agreementType)
            VALUES ($1, $2, $3, $4, $5, $6, $7 )`,[user,rent, agreeStartDate, agreeEndDate, payStartDate, payendDate, agreementType ])
     

        //Delete the pending tenant from pending table 
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

const getMOA= async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        await client.query(`select u.firstname, u.lastname, l.p_name, l.p_address, l.p_city, l.p_town, l.p_zip_code,r.full_name, r.r_update_time, r.rent, m.moa,m.create_time, m.payStartDate, m.payendDate, m.agreementType, m.signature
        from users u
        INNER JOIN landlordProperty l ON u.userid = l.landlord_id
        INNER JOIN Rentees r ON l.property_id = r.property_id
        INNER JOIN MOA m ON r.rentee_id = m.rentee_id
        WHERE r.tenant_id = $1`,[id],(err,result) => {
            if (err) {
                return res.status(500).json({
                  message: "Database error",
                });
            }
            return res.status(200).send(result.rows)
        });
    } catch (err) {
      res.status(500).json({
        error: "Database error while getting the Moa", //Database connection error
      });
    }
};


// Update the signature and update the "signed" in the rentees table
const updateSignature= async (req, res) => {
    try {
        const {moa,signature,id} = req.body
        await client.query(`Update moa set signature = $2
        WHERE moa = $1`,[moa,signature],(err) => {
            if (err) {
                return res.status(401).json({
                  message: "Unable to sign the moa",
                });
            }
            return res.status(200).json({message:'Moa Singed'})
        });

        await client.query(`update rentees set moa_status = 'signed', r_update_time = now()
        Where tenant_id = $1`,[id]);    

    } catch (err) {
      res.status(500).json({
        error: "Database error while getting the Moa", //Database connection error
      });
    }
};

const updateRoomsAvailable = async(req, res ) => {
    const property_id = parseInt(req.params.property_id)
    const {roomsAvailable} = req.body
    try {
        //update room amount
        await client.query(`UPDATE landlordProperty set p_room = $2 WHERE property_id = $1`,
            [property_id, roomsAvailable],(err,results) => {
            if (err) {
                //If payments are not available is not available
                return res.status(500).json({
                    message: "Unable to update rooms available",
               });
            }
            return res.status(200).json(results.rows) //Return a status 200 if there is no error
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
        error: "Database error while creating post!", //Database connection error
        });
    }
}


const getSingedMOA= async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        await client.query(`
        select u.firstname, u.lastname, l.p_name, l.p_address, l.p_city, l.p_town, l.p_zip_code,r.full_name, r.r_update_time, r.rent, m.moa,m.create_time, m.payStartDate, m.payendDate, m.agreementType, m.signature 
        from users u
        INNER JOIN landlordProperty l ON u.userid = l.landlord_id
        INNER JOIN Rentees r ON l.property_id = r.property_id
        INNER JOIN MOA m ON r.rentee_id = m.rentee_id
        WHERE r.tenant_id = $1`,[id],(err,result) => {
            if (err) {
                return res.status(500).json({
                  message: "Database error",
                });
            }
            return res.status(200).send(result.rows)
        });
    } catch (err) {
      res.status(500).json({
        error: "Database error while getting the Moa", //Database connection error
      });
    }
};

module.exports = {
    CreateMOA,
    getMOA,
    updateSignature,
    updateRoomsAvailable,
    getSingedMOA
}
