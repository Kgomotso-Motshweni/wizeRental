
const client = require("../Config/db.config");

//getPending Function
module.exports = get_pending= async (req, res) => {
  try {
        //get all pending tenants
        const data = await client.query(
          `SELECT * FROM applicationform;`,
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
