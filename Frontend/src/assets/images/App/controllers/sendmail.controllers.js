const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer"); //sends emails

module.exports.forgotPassword = (req, res) => {

    let email = req.body.email;

    let query = {
        text: 'SELECT email, firstname FROM survusers WHERE email = $1',
        value: [email]
    }
    
    pool.query(query.text, query.value).then(data => {
        if(data.rowCount > 0){
            let name = data.rows[0].full_name;
            let newPassword = Math.random().toString(36).slice(-8)
            let hashedPassword = hashPassword(newPassword)
            let query_1 = {
                text: 'UPDATE survusers SET password = $1 WHERE email = $2',
                value: [hashedPassword, email]
            }
            pool.query(query_1.text, query_1.value).then(uploadRes => {
                addCandidateMailer(email, name, newPassword)
                return res.status(201).json('Password Updated')
            }).catch(err => {
                return res.status(401).json(err);
            })

        }else{
            return res.status(401).json('Email not found');
        }
    }).catch(err => {
        return res.status(401).json(err);
    })
}


const Transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "kgopotsomaloma170@gmail.com",
        pass: "vkqtqhprquyzdhys"
    },
    tls: {
        rejectUnauthorized: false
    }
});

const addCandidateMailer = (email, name, password) => {
    let mailOptions = {
        from: 'kgopotsomaloma170@gmail.com', // sender address
        to: email, // list of receivers
        //cc:'nhlanhla@gmail.com',
        subject: 'Take the survey', // Subject line
        // text: text, // plain text body
        html:
            `<h3>Greetings ${Title},</h3><br>
        <h3>This email serves to inform you that you can take the survey😊, <br>
        
        Below are your login credentials you, your password can be updated at your own discretion on our platform:</h3><br>
        <h2><ul><u>Login Details</u><h2/>
        Username: ${email}<br>
        password: ${password}<br>

        visit our site at <a href="https://edu-app-inc.herokuapp.com/">Visit eduapp.co.za!</a><br><br>
        </ul><h3>
        kind Regards,<br>
         survApp Team
         </h3>`
        // html body
    };
    Transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log(err);
        }
    });
}
