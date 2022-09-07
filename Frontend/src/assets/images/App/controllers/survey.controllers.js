const client = require("../config/database.config");

// const getSurveylist = (req,res) =>{
//     const userid = parseInt(req.params.userid);
//     client.query
//     (`SELECT survlist.survid, survlist.title, survlist.description, survlist.status, survlist.updated_at 
//     FROM survlist INNER JOIN survusers ON survlist.userid = survusers.userid
//     WHERE survlist.userid = $1 ORDER BY survid ASC`,[userid], (error, results) =>{ //returns all surveys from surveys and orders them in ascending order
        
        
//         "SELECT * from servey where id= $1"
//         if(error){ //checks for errors and return them 
//             throw error //Throw the error in the terminal
//         }
//         res.status(200).json(results.rows) //Return a status 200 if there is no error
//     })
// }

const getSurveylist = (req,res) =>{
    const userid = parseInt(req.params.userid);
    client.query
    (`SELECT * FROM surveys`, (error, results) =>{ //returns all surveys from surveys and orders them in ascending order
        
        
        // "SELECT * from servey where id= $1"
        if(error){ //checks for errors and return them 
            throw error //Throw the error in the terminal
        }
        res.status(200).json(results.rows) //Return a status 200 if there is no error
    })
}

const getQuesions = (req,res) =>{
    const survey_id = req.params.survey_id
    client.query
    (`SELECT * FROM qna WHERE survey_id=$1 `,[survey_id], (error, results) =>{ //returns all surveys from surveys and orders them in ascending order
        
        
        // "SELECT * from servey where id= $1"
        if(error){ //checks for errors and return them 
            throw error //Throw the error in the terminal
        }
        res.status(200).json(results.rows) //Return a status 200 if there is no error
    })
}
//PUT(update) a user from the database
// const updateStatus = (req, res)=>{
//     const survid = parseInt(req.params.survid) //returns id(pk) of a user
//     const {status} = req.body
   
//     client.query(
//         `UPDATE survlist SET status = $1 WHERE survid=$2`,[status,survid], (error, results)=>{ //Updates the user we got using their id
//             if(error){
//                 throw error
//             }
//             res.status(200).send(`User modified with ID:${survid}`)  //Return a status 200 if there is no error
//         }
//     )
// }

// //GET(Fetch) Actiavted/Deactivated Surves
// const filteractive = (req, res)=>{
//     const userid = parseInt(req.params.userid);  //returns id(pk) of a user

//     client.query(
//         `SELECT count(survlist.status) as total, survlist.status, survlist.updated_at
//         FROM survlist INNER JOIN survusers ON survlist.userid = survusers.userid
//         WHERE survlist.userid = $1
//         and survlist.status like 'Active'
//         GROUP BY survlist.status, survlist.updated_at`,[userid], (error, results)=>{ //Updates the user we got using their id
//             if(error){
//                 throw error
//             }
//             res.status(200).json(results.rows)  //Return a status 200 if there is no error
//         }
//     )
// }

// //GET(Fetch) Actiavted/Deactivated Surves
// const filterDeActive = (req, res)=>{
//     const userid = parseInt(req.params.userid);  //returns id(pk) of a user

//     client.query(
//         `SELECT count(survlist.status) as total, survlist.status, survlist.updated_at
//         FROM survlist INNER JOIN survusers ON survlist.userid = survusers.userid
//         WHERE survlist.userid = $1
//         and survlist.status like 'Deactivated'
//         GROUP BY survlist.status, survlist.updated_at`,[userid], (error, results)=>{ //Updates the user we got using their id
//             if(error){
//                 throw error
//             }
//             res.status(200).json(results.rows)  //Return a status 200 if there is no error
//         }
//     )
// }

// //Get single User in a Database
// const getactivesurveys = (req,res)=>{
//     client.query
//     (`SELECT * FROM survlist where status in ('Active')`, (error, results) =>{ //returns all surveys from surveys and orders them in ascending order
//         if(error){ //checks for errors and return them 
//             throw error //Throw the error in the terminal
//         }
//         res.status(200).json(results.rows) //Return a status 200 if there is no error
//     })
// }

module.exports = {
    getSurveylist,
    // updateStatus,
    // filterDeActive,
    // getactivesurveys,
    // filteractive,
    getQuesions
}
