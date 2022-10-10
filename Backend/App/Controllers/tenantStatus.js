
const client = require('../Config/db.config')
// payment status Function

// const tenantsFromSpecifiAddress = async(req, res) => {
//   const {id, p_name} = req.body
//   try{
//     //Return All Tenants per specific accommodation
//     client.query(`SELECT r.rentee_id, r.tenant_id, r.property_id, r.full_name, p.p_address, r.unit,  a.agreeStartDate, a.agreeEndDate, r.paymentstatus, r.moa_status,p.p_room, r.create_time,r.rent, r.r_update_time, p.p_room
//       FROM rentees r
//       INNER JOIN MOA a ON a.rentee_id = r.rentee_id
//       INNER JOIN landlordProperty p ON r.property_id = p.property_id
//       INNER JOIN users u ON p.landlord_id = u.userid
//       WHERE r.moa_status = 'signed'
//       AND u.userid = $1
//       AND u.userid = $1`, [id],(error, results) => {
//       if(error){
//         return res.status(400).json({
//           message: "Unable to retrieve all rentees "
//         });
//       }

//       if(results.rows.length !=0){
//         return res.status(200).json(results.rows); //Return a status 200 if there is no error
//       })
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       error: "Database error while creating post!", //Database connection error
//     });
//   }
// }

const tenantsFromSpecifiAddress = async(req, res) => {
  const {id, p_name} = req.body
  try{
    //Return All Tenants per specific accommodation
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
  catch{
    res.status(500).json({
        error: "Database error when viewing tenants per address", //Database connection error
    });
}
}

module.exports = {
  
  tenantsFromSpecifiAddress,
}

