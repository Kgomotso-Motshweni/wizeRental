const client = require("../Config/db.config");

const getLandlordRes = async(req, res) => {
  const id = parseInt(req.params.id);

  // SELECT p.property_id, p.p_address
  // FROM rentees r
  // INNER JOIN landlordProperty p ON r.property_id = p.property_id
  // INNER JOIN users u ON p.landlord_id = u.userid
  // WHERE u.userid = $1
  // GROUP BY (p.property_id, p.p_address)

  try{
    client.query(`SELECT * FROM Accomodations WHERE landlord_id = $1`, [id],(error, results) => {
        if(error){
          return res.status(400).json({
            message: "Unable to retrieve all accommodations from that specific owner"
          });
        }
          return res.status(200).json(results.rows); //Return a status 200 if there is no error
      }
    )
  }catch{
    res.status(500).json({
      error: "Database error when viewing tenants per address", //Database connection error
    });
  }
}

const tenantsFromSpecifiAddress = async(req, res) => {
    const address = req.params.address;
    // const {id_tenant} = req.body

    // SELECT r.rentee_id, r.tenant_id, r.property_id, r.full_name, p.p_address, r.unit, r.moastart, r.moaend, r.paymentstatus, r.moa_status,p.p_room, r.create_time,r.rent, r.r_update_time, p.p_room
    //     FROM rentees r
    //     INNER JOIN landlordProperty p ON r.property_id = p.property_id
    //     INNER JOIN users u ON p.landlord_id = u.userid
    //     WHERE p.p_address = $1
    
    try{
      client.query(`SELECT r.rentee_id, r.tenant_id, r.property_id, r.full_name, p.p_address, r.unit, r.moastart, r.moaend, r.paymentstatus, r.moa_status,p.p_room, r.create_time,r.rent, r.r_update_time, p.p_room
        FROM rentees r
        INNER JOIN landlordProperty p ON r.property_id = p.property_id
        INNER JOIN users u ON p.landlord_id = u.userid
        WHERE p.p_name = $1`, [address],(error, results) => {
          if(error){
            return res.status(400).json({
              message: "Unable to retrieve all rentees "
            });
          }
         
          if(results.rows.length !=0){
            return res.status(200).json(results.rows); //Return a status 200 if there is no error
          }else{

            client.query(
              `SELECT * FROM rentees`,
               (err,result) => {
                 if (err) {
                //If rentees are not available is not available
                   console.error(err);
                   return res.status(500).json({
                     error: "Database error",
                   });
                 } else {
                   res
                     .status(200)
                     .send(result.rows);
                 }
               }
             );
          }
          
        }
      )
    }catch{
        res.status(500).json({
            error: "Database error when viewing tenants per address", //Database connection error
        });
    }
  }
  
  module.exports = {
    getLandlordRes,
    tenantsFromSpecifiAddress,
   
  }
  