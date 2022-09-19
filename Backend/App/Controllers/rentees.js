
const client = require("../Config/db.config");


//Acepted a rentee Function

<<<<<<< HEAD
const rentees = async (req, res) => {
  const {applicant_id,property_id,full_Name,unit,rent,moaStart,moaEnd,rent_paid,create_time,r_update_time} = req.body;
=======
exports.rentees = async (req, res) => {
  const {applicant_id,property_id,full_Name,unit,rent,moaStart,moaEnd,rent_paid,create_time,r_update_time,payStatus,paymentstatus} = req.body;
>>>>>>> 9494ed19c0142c9a0df532fbb968b5d64228f78e
  try {

    console.log("payment status",payStatus)
        //Inserting data into the database
        const data = await client.query(
          `INSERT INTO rentees (applicant_id,property_id,full_Name,unit,rent,moaStart,moaEnd,rent_paid,create_time,r_update_time,payStatus,paymentstatus) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);`,
          [applicant_id,property_id,full_Name,unit,rent,moaStart,moaEnd,rent_paid,create_time,r_update_time,payStatus,paymentstatus],
          (err) => {
            if (err) {
           //If user is not inserted to database
              console.error(err);
              return res.status(500).json({
                error: "Database error",
              });
            } else {
              res
                .status(200)
                .send({ message: `Rentee for user ${applicant_id} have been added to the database`});
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
 
module.exports = {
  rentees
}