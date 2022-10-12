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

        await client.query(`Select * from rentees`) 
        
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
        await client.query(`SELECT  m.moa,m.amount,m.agreestartdate,m.agreeenddate, m.paystartdate, m.payenddate,m.agreementtype,p.p_name, u.firstname, u.lastname, p.landlord_id
        from moa m
        INNER JOIN applicationform a on a.tenant_id = m.rentee_id
        INNER JOIN landlordproperty p on p.property_id = a.property_id
        INNER JOIN users u ON m.rentee_id = u.userid
        WHERE u.userid = $1`,[id],(err,result) => {
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





const getLandlordName= async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        await client.query(`SELECT u.firstname, u.lastname
        from  users u
        INNER JOIN landlordproperty p on p.landlord_id = u.userid
		where userid = $1
		group by u.firstname,u.lastname`,[id],(err,result) => {
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
                return res.status(500).json({
                  message: "Database error",
                });
            }
            return res.status(200).json({message:'succesfully'})
        });


        await client.query(`update rentees set moa_status = 'Signed'
        Where tenant_id = $1`,[id]);    

    } catch (err) {
      res.status(500).json({
        error: "Database error while getting the Moa", //Database connection error
      });
    }


};

const getPropertyByID= async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        await client.query(`SELECT * FROM rentees a
        INNER JOIN MOA r ON r.rentee_id = a.rentee_id
        INNER JOIN landlordproperty l ON a.property_id = l.property_id
        INNER JOIN users u ON l.landlord_id = u.userid
        WHERE u.userid = $1 `,[id],
        (err,result) => {
            if (err) {
                return res.status(500).json({
                  message: "Database error",
                });
            }
            return res.status(200).send(result.rows)
        });
    } catch (err) {
      res.status(500).json({
        error: "Database error while creating post!", //Database connection error
      });
    }

};

module.exports = {
    CreateMOA,
    getMOA,
    getLandlordName,
    getPropertyByID,
    updateSignature
}
