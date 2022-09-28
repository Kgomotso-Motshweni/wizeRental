
const client = require("../Config/db.config");

//getPending Function
module.exports = get_pending= async (req, res) => {
  try {
     const id = parseInt(req.params.id)
        //get all pending tenants
        const data = await client.query(
          `SELECT a.applicant_id, a.tenant_id, a.property_id, a.full_name, a.email, a.phone_num, a.age, a.id_doc, a.occupation, a.view_date, a.num_tenants, a.num_pets, a.ped_desc, a.smoke, a.app_create_time
          FROM applicationform a
          INNER JOIN landlordproperty l ON a.property_id = l.property_id
          INNER JOIN users u ON l.landlord_id = u.userid
          WHERE u.userid = $1;`,[id],
          (err,result) => {
            if (err) {
           //If tenants are not available is not available
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
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error while creating post!", //Database connection error
    });
  }
};
