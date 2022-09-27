const client = require("../Config/db.config");
const cloudinary = require("../Cloudinary/cloudinary");

const applyRoom = async(req, res) => {
    const tenant_id = parseInt(req.params.userid);
    const{ property_id, full_name, email, phone_num, age, occupation, view_date, num_tenants, num_pets, ped_desc, smoke } = req.body
    try{
        const id_document = await cloudinary.uploader.upload(req.file.path, {
            folder: "/images/",
        });

        const data = await client.query(`SELECT * FROM applicationform WHERE full_name= $1`,[full_name]); //Check if user exist
        const user = data.rows;

        if(user.length != 0){
            return res.status(400).json({
                message: "Application name already Exist, apply to a new Property"
            });

        }else{
            //console.log(id_document)
            client.query(`INSERT INTO applicationform (tenant_id, property_id, full_name, email, phone_num, age,  id_doc, occupation, view_date, num_tenants, num_pets, ped_desc, smoke)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`, 
            [tenant_id, property_id, full_name, email, phone_num, age, id_document.url, occupation, view_date, num_tenants, num_pets, ped_desc, smoke], (error, results) => {
               if(error){
                   return res.status(400).json({
                       message: "Unable to apply to this property"
                   });
               }
               return res.status(200).send({ message: 'tenant application successfully'}); //Return a status 200 if there is no error
           })
        }

    }catch{
        res.status(500).json({
            error: "Database error when applying for rental property", //Database connection error
        });
    } 
  }

  module.exports = {
    applyRoom
  }

  

/*
 client.query(`INSERT INTO applicationform (tenant_id, full_name, email, phone_num, age,  id_doc, occupation, num_tenants, num_pets, ped_desc, smoke)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, 
            [tenant_id, full_name, email, phone_num, age, id_doc.url, occupation, num_tenants, num_pets, ped_desc, smoke], (error, results) => {
               if(error){
                   return res.status(400).json({
                       message: "Unable to apply to this property"
                   });
               }
               return res.status(200).send({ message: 'tenant application successfully'}); //Return a status 200 if there is no error
           })
           */