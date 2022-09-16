
const pool = require("../Config/db.config");

const applyRoom = (request, response) => {
    const { fname, lname, email, phonenumber, age, uploadID, empStatus, income, viewDate, totOcc, petNum, petDesc, smoke} = request.body
  
    pool.query('INSERT INTO item (fname, lname, email, phonenumber, age, uploadID, empStatus, income, viewDate, totOcc, petNum, petDesc, smoke) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $3) RETURNING *', [fname, lname, email, phonenumber, age, uploadID, empStatus, income, viewDate, totOcc, petNum, petDesc, smoke], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`item added with ID: ${results.rows[0].id}`)
    })
  }

  module.exports = {
    applyRoom
    
  }

  

