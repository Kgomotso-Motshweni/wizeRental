
const client = require('../Config/db.config')


module.exports = tenantsFromSpecifiAddress = async(req, res) => {
  const id = parseInt(req.params.id)
  try{
    //Return All Tenants per specific accommodation
    client.query(`SELECT * 
    FROM rentees r
    INNER JOIN users u ON r.tenant_id = u.userid
    WHERE u.userid = $1
    `,[id ],(error, results) =>{
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





