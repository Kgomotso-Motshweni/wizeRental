const client = require("../Config/db.config");

const getProperty= async (req, res) => {
    try {
        await client.query(`SELECT * FROM landlordProperty`,(err,result) => {
            if (err) {
                return res.status(500).json({
                  message: "Database error",
                });
            }
            return res.status(200).send(result.rows)
        });
    } catch (err) {
      res.status(500).json({
        error: "Database error while creating post!", //Database connection error
      });
    }
};



const getRoomById= async (req, res) => {
  const id = parseInt(req.params.id)
  try {
      await client.query(  `SELECT p.p_address, p.p_city, p.p_town, p.p_propertytype, p.p_price, r.paymentstatus 
      FROM landlordproperty p 
      INNER JOIN rentees r on p.property_id = r.property_id 
      INNER JOIN users u ON r.tenant_id = u.userid 
      WHERE u.userid = 5`,[id], (err,result) => {
          if (err) {
              return res.status(500).json({
                message: "Database error",
              });
          }
          return res.status(200).send(result.rows)
      });
  } catch (err) {
    res.status(500).json({
      error: "Database error while creating post!", //Database connection error
    });
  }
};




const getPropertyByID= async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        await client.query(`SELECT * FROM landlordProperty WHERE property_id = $1`,[id], (err,result) => {
            if (err) {
                return res.status(500).json({
                  message: "Database error",
                });
            }
            return res.status(200).send(result.rows)
        });
    } catch (err) {
      res.status(500).json({
        error: "Database error while creating post!", //Database connection error
      });
    }
};



const getRoomsImages= async (req, res) => {
  const id = parseInt(req.params.id)
  try {
      await client.query(`SELECT r.image_id, r.property_id, r.images 
        FROM roomsimages r
        INNER JOIN landlordproperty l ON r.property_id = l.property_id
        WHERE r.property_id = $1`,[id], (err,result) => {
          if (err) {
              return res.status(500).json({
                message: "Database error",
              });
          }
          return res.status(200).send(result.rows)
      });
  } catch (err) {
    res.status(500).json({
      error: "Database error while creating post!", //Database connection error
    });
  }
};


module.exports = {
    getProperty,
    getPropertyByID,
    getRoomsImages,
    getRoomById
  }