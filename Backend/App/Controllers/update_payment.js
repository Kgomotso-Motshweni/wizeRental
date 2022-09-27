
const client = require("../Config/db.config");


//payment status Function

module.exports = payment_status= async (req, res) => {
  const {rentee_id,paymentStatus} = req.body
  try {
        //get all post form the database
        const data = await client.query(
          `UPDATE rentees
          SET paymentstatus = $2
          WHERE rentee_id = $1;`,[rentee_id,paymentStatus],
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
                .send({message:'suceesfully updated'});
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
