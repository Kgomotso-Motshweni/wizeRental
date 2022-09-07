const client = require("../config/database.config");
const jwt = require("jsonwebtoken");

// module.exports.surveyList = (req, res) => {
//   const { userid } = parseInt(req.params.userid);
//   const { question, options } = req.body; //two data info that will be accepted from the user
//   client.query(
//     "INSERT INTO questio (question, options) VALUES ($1,$2) ",
//     [question, options],
//     (error, results) => {
//       //Insert data into the the database
//       if (error) {
//         //checks for errors and return them
//         //  throw error //Throw the error in the terminal
//         console.log(error);
//       }
//       res.status(201).send(`User added with ID:${results.rows[0].userid}`); //Return a status 201 if there is no error
//     }
//   );
// };

module.exports.addSurvey = async (req, res) => {
  const {
    survey_id,
    title,
    description,
    status,
    question,
    option1,
    option2,
    option3,
  } = req.body;
  try {
    // const data = await client.query(
    //   "SELECT * FROM qna WHERE qestion= $1",
    //   [qestion]
    // );
    // const regData = data.rows;
    // if (regData.length != 0) {
    //   return res.status(400).json({
    //     error: "Question already there, No need to enter again",
    //   });
    // } else {
    //   const survQuestions = {
    //     question,
    //     options,
    //   };
      var flag = 1;

      client.query(
        `INSERT INTO surveys ( survey_id , title , description ,status) VALUES ($1,$2,$3,$4)`,
        [survey_id, title, description, status],
        (err) => {
          if (err) {
            flag = 0;
            console.error(err);
            return res.status(500).json({
              error: "Database error",
            });
          } else {
            flag = 1;
            res
              .status(200)
              .send({ message: "User added to database, not verified" });
          }
        }
      );
      
    }
   catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error while registring user!",
    });
  }
};

exports.getAllsurvey = async (req, res) => {
  await client.query(
    `SELECT * FROM surveys;`,
    (error, results) => {
      if (error) {
        //catch
        throw error;
      }

      res.status(200).json(results.rows);
    } //important
  );
};

module.exports.addQna = async (req, res) => {
  const {
    survey_id,
    question,
    option1,
    option2,
    option3,
  } = req.body;
  try {
    client.query(
      `INSERT INTO qna ( survey_id , question , option1 , option2 , option3) VALUES ($1,$2,$3,$4,$5)`,
      [survey_id, question, option1, option2, option3],
      (err) => {
        if (err) {
          flag = 0;
          console.error(err);
          return res.status(500).json({
            error: "Database error",
          });
        } else {
          flag = 1;
          res
            .status(200)
            .send({ message: "User added to database, not verified" });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error while registring user!",
    });
  }
};



module.exports.getQuesions = (req,res) =>{
  const survey_id = req.params.survey_id
  client.query
  (`SELECT * FROM qna WHERE survey_id=$1 `,[survey_id], (error, results) =>{ //returns all surveys from surveys and orders them in ascending order
      if(error){ //checks for errors and return them 
          throw error //Throw the error in the terminal
      }
      res.status(200).json(results.rows) //Return a status 200 if there is no error
  })
}

module.exports.updateStatus = (req,res) =>{
  const survey_id = req.params.survey_id
  const newStatus = req.body 
  client.query
  (`UPDATE surveys SET status = $1 WHERE survey_id= $2`,[newStatus, survey_id], (error, results) =>{ //returns all surveys from surveys and orders them in ascending order
      if(error){ //checks for errors and return them 
          throw error //Throw the error in the terminal
      }
      res.status(200).json(results.rows) 
      //Return a status 200 if there is no error
  })
}

module.exports.deleteSurvey = (req,res) =>{
  const survey_id = req.params.survey_id 
  
  client.query
  (`DELETE FROM surveys WHERE survey_id = $1`,[ survey_id], (error, results) =>{ //returns all surveys from surveys and orders them in ascending order
      if(error){ //checks for errors and return them 
          throw error //Throw the error in the terminal
      }
      res.status(200).json({message: "results"}) 
      //Return a status 200 if there is no error
  })
}

module.exports.deleteQna = (req,res) =>{
  const survey_id = req.params.survey_id
  
  client.query
  (`DELETE FROM qna WHERE survey_id = $1`,[ survey_id], (error, results) =>{ //returns all surveys from surveys and orders them in ascending order
      if(error){ //checks for errors and return them 
          throw error //Throw the error in the terminal
      }
      res.status(200).json(results.rows) 
      //Return a status 200 if there is no error
  })
}


