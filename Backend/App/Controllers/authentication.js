const client = require("../Config/db.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const randomize = require("rand-token")
const SECRET_KEY = randomize.generate(20) 

const register = async (req, res) => {
    const user_role = req.params.user_role;
    const{ firstname, lastname, email, cellno, password} = req.body
    try{
        // check :userType paramater. only accept /Landlord or /Tenant
        if (!(user_role == 'Landlord' || user_role == 'Tenant')) {
            return res.status(400).json({
                message: "Invalid value in request parameter. : user_role parameter must be equal to Landlord or Tenant"
            });
        }

        const data = await client.query(`SELECT * FROM users WHERE email= $1;`,[email]); //Check if user exist
        const regData = data.rows;

        if(regData.length != 0){
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
                const user = {user_role, firstname, lastname, email, cellno, password: hash};
                var flag = 1;

                //Inserting data to Database  
                client.query(
                    `INSERT INTO users (user_role, firstname, lastname, email, cellno, password) VALUES ($1,$2,$3,$4,$5,$6)`, 
                    [user.user_role, user.firstname, user.lastname, user.email, user.cellno, user.password], (err) => {
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
                        user
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
    try{  
        await client.query(`SELECT * FROM users`, (error, results) => {
            if(error){ 
                return next(error)
            }
           
            return res.status(200).json(
                results.rows) //Return a status 200 if there is no error
        })
      
    }
    catch (err) {
        res.status(500).json({
           error: "Database error while retrieving products", 
        });
    };
}

module.exports = {
    SECRET_KEY,
    register,
    login,
    userProfile
}