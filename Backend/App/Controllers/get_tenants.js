const client = require("../Config/db.config");

const getLandlordRes = async(req, res) => {
  const id = parseInt(req.params.id);
  try{
    client.query(`
      SELECT p.p_name
      FROM landlordProperty p
      INNER JOIN users u ON p.landlord_id = u.userid
      WHERE u.userid = $1
      GROUP BY (p.p_name)`, [id],(error, results) => {
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
    const {id, p_name} = req.body
    try{
      //Return All Tenants per specific accommodation
      client.query(`SELECT r.rentee_id, r.tenant_id, r.property_id, r.full_name, p.p_address, r.unit,  a.agreeStartDate, a.agreeEndDate, r.paymentstatus, r.moa_status,p.p_room, r.create_time,r.rent, r.r_update_time, p.p_room
        FROM rentees r
        INNER JOIN MOA a ON a.rentee_id = r.rentee_id
        INNER JOIN landlordProperty p ON r.property_id = p.property_id
        INNER JOIN users u ON p.landlord_id = u.userid
        WHERE r.moa_status = 'signed'
        AND u.userid = $1
        AND p.p_name = $2`, [id, p_name ],(error, results) => {
        if(error){
          return res.status(400).json({
            message: "Unable to retrieve all rentees "
          });
        }
     
        if(results.rows.length !=0){
          return res.status(200).json(results.rows); //Return a status 200 if there is no error
        }else{
          if(p_name){
            client.query(`SELECT r.rentee_id, r.tenant_id,p.p_room, r.property_id, r.full_name, p.p_address, r.unit,  a.agreeStartDate, a.agreeEndDate, r.paymentstatus, r.moa_status,p.p_room, r.create_time,r.rent, r.r_update_time, p.p_room
            FROM rentees r
            INNER JOIN MOA a ON a.rentee_id = r.rentee_id
            INNER JOIN landlordProperty p ON r.property_id = p.property_id
            INNER JOIN users u ON p.landlord_id = u.userid
            WHERE r.moa_status = 'signed'
            AND p.p_name = $1`, [p_name],(error, results) =>{
              if(error){
                return res.status(400).json({
                  message: "Unable to retrieve all rentees"
                });
              }
              return res.status(200).json(results.rows); 
            })
          }else{
            client.query(`SELECT r.rentee_id, r.tenant_id,p.p_room, r.property_id, r.full_name, p.p_address, r.unit,  a.agreeStartDate, a.agreeEndDate, r.paymentstatus, r.moa_status,p.p_room, r.create_time,r.rent, r.r_update_time, p.p_room
            FROM rentees r
            INNER JOIN MOA a ON a.rentee_id = r.rentee_id
            INNER JOIN landlordProperty p ON r.property_id = p.property_id
            INNER JOIN users u ON p.landlord_id = u.userid
            WHERE r.moa_status = 'signed'
            AND u.userid = $1`,[id ],(error, results) =>{
              if(error){
                return res.status(400).json({
                  message: "Unable to retrieve all rentees"
                });
              }
              return res.status(200).json(results.rows); 
            })
          }
        }
      })
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
  