const client = require("../Config/db.config");

//getRentees Function
module.exports = get_rentees= async (req, res) => {
  const id = parseInt(req.params.id)
  try {
        //get all post form the database
        const data = await client.query(
         `SELECT *
         FROM rentees r
         INNER JOIN MOA a ON a.rentee_id = r.rentee_id
         INNER JOIN landlordproperty l ON r.property_id = l.property_id
         INNER JOIN users u ON l.landlord_id = u.userid
         WHERE u.userid = $1
         AND r.moa_status ='signed' ;`,[id],
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
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error while creating post!", //Database connection error
    });
  }
};

