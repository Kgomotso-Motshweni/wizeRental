const client = require("../config/database.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

/**
 * saves user details into DB guests table or hosts table
 * @param {Object} req { firstname, lastname, email, phone, password, userType}
 * @param {*} res 
 * Reister function
 **/

exports.register = async (req, res) => {
  const usertype = req.params.usertype;
  const{ firstname, lastname, email, phonenumber, password} = req.body
  try{
    // check :userType paramater. only accept /Learner or /Teacher
    if (!(usertype == 'coordinator' || usertype == 'responded')) {
      return res.status(400).json({
        error: "Invalid value in request parameter. /:usertype parameter must be equal to responded or coordinator "
      });
    }
    const data = await client.query(`SELECT * FROM survusers WHERE email= $1;`,
      [email]); //Check if user exist
        
    const regData = data.rows;
    if(regData.length != 0){
      return res.status(400).json({
        error: "Email already there, No need to register again.",
      });
    } else {
      bcrypt.hash(password, 10, (err, hash) => { //encryting the password so that it can't be hacked.
        const survusers = {firstname, lastname, email, phonenumber, password: hash, usertype};
        var flag = 1;
        //Inserting data to Database
                
        client.query(
          `INSERT INTO survusers (firstname, lastname, email, phonenumber, password, usertype) VALUES ($1,$2,$3,$4,$5,$6)`, 
          [survusers.firstname, survusers.lastname, survusers.email, survusers.phonenumber, survusers.password, survusers.usertype], (err) => {
            if (err) {
              flag  =  0; //If user is not inserted to database assign flag as 0/false.
              console.error(err);
              return  res.status(500).json({
                error: "Database error"
              })
            }
            else {
              flag  =  1;
              res.status(200).send({ message: 'User added to database, not verified' });
            }
          }
        )
        if (flag) {
          const  token  = jwt.sign({ //Signing a jwt token
            email: survusers.email,}, process.env.SECRET_KEY
          );
          survusers.token = token
        };  
      });
    }
  }
  catch{
    console.log(err);
      res.status(500).json({
        error: "Database error while registring user!", //Database connection error
      });
  }
}


// const client = require('../config/database');
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// //Reister function
// exports.register = async (req, res) => {
//   const { firstname, lastname, email, password, usertype } = req.body;
//   try { 
//     const data = await client.query(`SELECT * FROM survusers WHERE email= $1;` , [email]); //Check if user exist
//     const regData = data.rows;
//     if(regData.length != 0){
//       return res.status(400).json({
//         error: "Email already there, No need to register again.",
//       });
//     }
//     else {
//       bcrypt.hash(password, 10, (err, hash) => { //encryting the password so that it can't be hacked.
//         if(err) 
//           res.status(err).json({
//             error: "Sever Error",
//           });
//         const survusers = {firstname, lastname, email, password: hash, usertype};
//         var flag = 1;

//         //Inserting data to Database
//         client.query(
//           `INSERT INTO survusers (firstname, lastname, email, password, usertype, gender) VALUES ($1,$2,$3,$4,$5,$6)`, 
//           [survusers.firstname, survusers.lastname, survusers.email, survusers.password, survusers.usertype], (err) => {

//             if (err) {
//               flag  =  0; //If user is not inserted is not inserted to database assigning flag as 0/false.
//               console.error(err);
//               return  res.status(500).json({
//                 error: "Database error"
//               })
//             }
//             else {
//               flag  =  1;
//               res.status(200).send({ message: 'User added to database, not verified' });
//             }
//           }
//         )
//         if (flag) {
//           const  token  = jwt.sign({ //Signing a jwt token
//             email: survusers.email,}, process.env.SECRET_KEY
//           );
//         };
//       });
//     }
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).json({
//       error: "Database error while registring user!", //Database connection error
//     });
//   }; 
// }
