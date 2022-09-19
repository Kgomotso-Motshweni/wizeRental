
const client = require("../Config/db.config");


//payment status Function

exports.payment_status= async (req, res) => {
  try {
        //get all post form the database
        const data = await client.query(
          `SELECT payStatus FROM rentees`,
          (err,result) => {
            if (err) {
           //If payments are not available is not available
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
