
const tent = require("../Config/db.config");


//payment status Function

module.exports = tenant_status= async (req, res) => {
  const {tenant_id,status} = req.body
  try {
        //get all post form the database
        const data = await tent.query(
          `UPDATE tenants
          SET status = $2
          WHERE tenant_id = $1;`,[tenant_id,status],
          (err,result) => {
            if (err) {
           //If tenant is not accepted
              console.error(err);
              return res.status(500).json({
                error: "Declined",
              });
            } else {
              res
                .status(200)
                .send({message:'Approved'});
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
