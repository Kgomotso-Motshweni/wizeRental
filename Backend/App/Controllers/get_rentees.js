
const client = require("../Config/db.config");

//getRentees Function
module.exports = get_rentees= async (req, res) => {
  const id = parseInt(req.params.id)
  try {
        //get all post form the database
        const data = await client.query(
          `SELECT * FROM rentees WHERE landlord_id = $1`,[id],
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
