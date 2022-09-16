const bcrypt = require("bcrypt");

const client = require("../configs/database");

const jwt = require("jsonwebtoken");
//Register Function

exports.apply = async (req, res) => {
     const {fname, lname, email, phonenumber, age, uploadID, empStatus, income, viewDate, totOcc, petNum, petDesc, smoke, profile } = req.body;
     try { 
       const data = await client.query(`SELECT * FROM users WHERE email= $1;` , [email]); //Check if user exist
       const arr = data.rows;
       if(arr.length != 0){
          return res.status(400).json({
                 error: "Email already there, No need to apply again.",
      });

  }
  else {
      bcrypt.hash(password, 10, (err, hash) => {
        if(err) 
       res.status(err).json({
         error: "Sever Error",
        });
    const user = {
      fname,
      lname, 
      email,
      phonenumber,
      age,
      uploadID,
      empStatus,
      income,
      viewDate,
      totOcc,
      petNum,
      petDesc,
      smoke,
      password: hash,
    };
var flag = 1;
//Inserting data into the database

client
.query(`INSERT INTO users (fname, lname, email, phonenumber, age, uploadID, empStatus, income ) VALUES ($1,$2,$3,$4);`, [user.name, user.email, user.phonenumber, user.password], (err) => {

if (err) {
flag  =  0; //If user is not inserted is not inserted to database assigning flag as 0/false.
console.error(err);
return  res.status(500).json({
error: "Database error"
})
}
else {
flag  =  1;
res.status(200).send({ message: 'User added to database, not verified' });
}
})
if (flag) {
const  token  = jwt.sign( //Signing a jwt token
{
email: user.email
},
process.env.SECRET_KEY
);
};
});
}
}
catch (err) {
console.log(err);
res.status(500).json({
error: "Database error while registring user!", //Database connection error
});
};
}
