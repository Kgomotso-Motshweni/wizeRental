const client = require('../config/database.config');

exports.AddQuestion = async (req, res) => {
    const { questionNo, question , code,  opt1, opt2,opt3} = req.body;
   client.query(`INSERT INTO questions (questionNo , question ,code) VALUES ($1, $2, $3)`, [questionNo, question, code], (err,results)=>{
 
     if (err) {
 
       console.log(err)
       flag = 0;
       console.error
       return res.status(200).json({
         err: "Database Error" 
       })
     }else{
       return res.status(200).json({
         err: "yesssss"
 
       });
      
     }
   });
  //  client.query(`INSERT INTO options (questionNo, opt1, opt2,opt3, code) VALUES ($1, $2, $3, $4, $5)`, [questionNo, opt1, opt2,opt3, code], (err,results)=>{
 
  //   if (err) {

  //     console.log(err)
  //     flag = 0;
  //     console.error
  //     return res.status(200).json({
  //       err: "Database Error" 
  //     })
  //   }else{
  //     return res.status(200).json({
  //       err: "yesssss"

  //     });
     
  //   }
  // });
 }
 
//  exports.AddOptions = async (req, res) => {
//     const { questionNo, opt1, opt2,opt3, code } = req.body;
//    client.query(`INSERT INTO options (questionNo, opt1, opt2,opt3, code) VALUES ($1, $2, $3, $4, $5)`, [questionNo, opt1, opt2,opt3, code], (err,results)=>{
 
//      if (err) {
 
//        console.log(err)
//        flag = 0;
//        console.error
//        return res.status(200).json({
//          err: "Database Error" 
//        })
//      }else{
//        return res.status(200).json({
//          err: "yesssss"
 
//        });
      
//      }
//    });
//  }


 exports.getAllsurvey = async (req, res) => {
  
  
   await client.query(`SELECT * FROM questions;`,(error,results) => {
          if (error) {
            //catch
            throw error;
          }
        
          res.status(200).json(results.rows);} //important
          
          )
};

exports.getAllOptions = async (req, res) => {
  
  
    await client.query(`SELECT * FROM options;`,(error,results) => {
           if (error) {
             //catch
             throw error;
           }
         
           res.status(200).json(results.rows);} //important
           
           )
 };
