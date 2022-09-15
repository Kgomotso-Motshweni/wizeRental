const client = require("../Config/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const randomize = require("rand-token");
const SECRET_KEY = randomize.generate(20);
const cloudinary = require("../Cloudinary/cloudinary");
const multer = require("multer");
const path = require("path");

const register = async (req, res) => {
    const user_role = parseInt(req.params.user_role);
    const{ firstname, lastname, email, cellno, password, imageUrl} = req.body
    try{
        // check :userType paramater. only accept /Landlord or /Tenant
        if (!(user_role == 'Landlord' || user_role == 'Tenant')) {
            return res.status(400).json({
                message: "Invalid value in request parameter. : user_role parameter must be equal to Landlord or Tenant"
            });
        }

        const data = await client.query(`SELECT * FROM users WHERE email= $1;`,[email]); //Check if user exist
        const user = data.rows;

        if(user.length != 0){
            return res.status(400).json({
                message: "Email already there, No need to register again."
            });
        }else{
            bcrypt.hash(password, 10, (err, hash) => { //encryting the password so that it can reduce hancking.
                if(err){
                    return res.status(400).json({
                        message: "Unable to hash password"
                    });
                }
                const regData = {user_role, firstname, lastname, email, cellno, password: hash, imageUrl};
                var flag = 1;

                //Inserting data to Database  
                client.query(
                    `INSERT INTO users (user_role, firstname, lastname, email, cellno, password, imageUrl) VALUES ($1,$2,$3,$4,$5,$6, $7) RETURNING userid`, 
                    [regData.user_role, regData.firstname, regData.lastname, regData.email, regData.cellno, regData.password, regData.imageUrl], (err) => {
                        if (err) {
                            flag  =  0; //If user is not inserted to database assign flag as 0/false.
                            return  res.status(500).json({
                                error: "Database error"
                            })
                        }else {
                            flag  =  1;
                        }
                    }
                )
                if (flag) {
                    const  token  = jwt.sign({ //Creating a JWT Token
                        regData
                    },
                        SECRET_KEY,
                    { 
                        expiresIn: '24h' 
                    });
                    return res.status(200).send({ message: 'User added to database, not verified' ,token:token});
                };  
            });
        }
    }
    catch{
        res.status(500).json({
            error: "Database error while registring user!", //Database connection error
        });
    }
}

const login =  async (req, res) => {
    const {email,password} = req.body;
    try{
        if (!(email  || password )) {
            return res.status(400).json({
                message: "userInput Requred"
            });
        } 
        const data = await client.query(`SELECT * FROM users WHERE email= $1;`,[email]); //Check if user exist
        const regData = data.rows;

        if(regData.length == 0){
            return res.status(400).json({
                message: "Email doesn't exist, Please Create Register."
            });
        }else{
            bcrypt.compare(password, regData[0].password, (err, results) => {
                if (err) {
                    return res.status(500).json({
                        message: "Unable to compare hashed password"
                    })
                } else 
                    if (results === true) {
                    const token = jwt.sign({
                            regData
                        },
                            SECRET_KEY,
                        { expiresIn: '24h' }
                    );
                    
                    return res.status(200).json({
                        message: "User successfully signed in",
                        token:token,
                    });
                } else {
                    //define errors
                    if (results != true) {
                        return res.status(400).json({
                            message: "incorrect password"
                        })
                    }
                }
            })
        }
    }
    catch (error) {
        res.status(500).json({
            error: "Database error while logging in!"
        })
    }

}

//Create function to get all userprofiles
const userProfile = async (req, res, next) => {
    const id = parseInt(req.params.userid);
    try{  
        await client.query(`SELECT * FROM users WHERE userid=$1`,[id], (error, results) => {
            if(error){ 
                return res.status(400).json({
                    message: "Unable to get sigle user details"
                }) //Throw the error in the t
            }
            return res.status(200).json(results.rows) //Return a status 200 if there is no error
        })
      
    }
    catch (err) {
        res.status(500).json({
           error: "Database error while retrieving products", 
        });
    };
}

const profileUpdate = async(req, res) => {
    const id = req.params.userid;
    const{ firstname, lastname, cellno } = req.body

    try{
        if(req.file){
            const results = await cloudinary.uploader.upload(req.file.path, {
                folder: "/images/",
            });
      
            client.query(`UPDATE users SET firstname=$1, lastname =$2, cellno=$3, imageUrl=$4, updated_at= now()  WHERE userid=$5`,
                [firstname, lastname, cellno, results.url, id], (error, results)=>{ //Add new employee
                if(error){ //checks for errors and return them 
                    return res.status(400).json({
                        message: "Unable to update user details"
                    }) //Throw the error in the terminal
                }
                    return res.status(200).send({ message: 'User updated successfully '}); //Return a status 200 if there is no error
            })
        }else{
            client.query(`UPDATE users SET firstname=$1, lastname =$2, cellno=$3, updated_at= now() WHERE userid=$4`,
                [firstname, lastname, cellno, id], (error, results)=>{ //Add new employee
                if(error){ //checks for errors and return them 
                    return res.status(400).json({
                        message: "Unable to update user details"
                    }) //Throw the error in the terminal
                }
                return res.status(200).send({ message: 'User updated successfully '}); //Return a status 200 if there is no error
            })
        }  
    }
    catch (err) {
        res.status(500).json({
            message: "Database error when Updating a user ", 
        });
    };
}

module.exports = {
    SECRET_KEY,
    register,
    login,
    userProfile,
    profileUpdate
}

/*
const profileUpdate = async(req, res) => {
    try{
        const id = req.params.userid;
        const{ firstname, lastname, cellno, } = req.body
        const image = await cloudinary.uploader.upload(req.file.path)

        client.query(`UPDATE users SET firstname=$1, lastname =$2, cellno=$3, imageUrl=$4, updated_at= now()  WHERE userid=$5`,
            [firstname, lastname, cellno, image.secure_url, id], (error, results)=>{ //Add new employee
                if(error){ //checks for errors and return them 
                    return res.status(400).json({
                        message: "Unable to update user details"
                    }) //Throw the error in the terminal
                }
                return res.status(200).send({ message: 'User updated successfully '}); //Return a status 200 if there is no error
            }
        )
    }
    catch (err) {
        res.status(500).json({
           error: "Database error while retrieving products", 
        });
    };
}
*/
