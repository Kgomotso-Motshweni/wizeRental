
const client = require("../Config/db.config");


//Acepted a rentee Function

exports.rentees = async (req, res) => {
  const {applicant_id,property_id,full_Name,unit,rent,moaStart,moaEnd,rent_paid,create_time,r_update_time} = req.body;
  try {
        //Inserting data into the database
        const data = await client.query(
          `INSERT INTO rentees (applicant_id,property_id,full_Name,unit,rent,moaStart,moaEnd,rent_paid,create_time,r_update_time) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10);`,
          [applicant_id,property_id,full_Name,unit,rent,moaStart,moaEnd,rent_paid,create_time,r_update_time],
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
