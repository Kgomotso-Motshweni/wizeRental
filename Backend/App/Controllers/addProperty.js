const client = require("../Config/db.config");
const cloudinary = require("../Cloudinary/cloudinary");
const fs = require("fs");

const addProperty = async(req, res) => {
    const id = parseInt(req.params.id);
    const {	p_address, p_city, p_town, p_zip_code, p_propertyType, p_name, p_description, p_bedroom,
         p_bath ,p_room , p_price ,pet_friendly } = req.body

    try{
        const data = await client.query(`SELECT * FROM landlordProperty 
            WHERE p_name = $1 AND p_address = $2`,[p_name, p_address]); //Check if user exist
        const user = data.rows;

        if(req.files['image'][0] && req.files['pdf'][0]){
            if(user.length != 0){
                return res.status(400).json({
                    message: "Accomodation already Exist, Add a new Property"
                });
            }
            else{
                const house  = req.files['image'][0].path;

                const pdf  = req.files['pdf'][0].path;
        
                const HouseImage = await cloudinary.uploader.upload(house, {
                    folder: "/property/",
                })
                const Tittle_Deep = await cloudinary.uploader.upload(pdf, {
                    folder: "/property/",
                })
        
                console.log(HouseImage);
                console.log(Tittle_Deep);
        
                client.query(`INSERT INTO landlordProperty(landlord_id, p_address, p_city, p_town, p_zip_code, p_propertyType, p_name, p_description, p_bedroom,
                    p_bath, p_room, p_price, pet_friendly, title_deed, house_image ) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`, [id, p_address, p_city, p_town, p_zip_code, p_propertyType, p_name, p_description, p_bedroom,
                    p_bath ,p_room , p_price, pet_friendly, Tittle_Deep.url, HouseImage.url ], (error) =>{
                        if(error){
                            return res.status(401).send({message:"error while inserting data"}) //Return a status 200 if there is no error
                        }
                        return res.status(200).send({message:"property details addedd successfully"}) //Return a status 200 if there is no error
                })
            }
        }else{
            console.log("Please upload files first to use this function")
        }
       
    }
    catch (err) {
        res.status(500).json({
            message: "Database error when adding property details", 
        });
    };
}

const addRoomImages = async(req, res) =>{
    try{  
        const property_id = parseInt(req.params.property_id); 
        const qualification_url = req.file.path;
        console.log(qualification_url)
        const images = await cloudinary.uploader.upload(qualification_url, {
            folder: "/property/",
        });

        const path = qualification_url;
        fs.unlinkSync(path);

        client.query(`INSERT INTO RoomsImages (property_id, images) VALUES ($1, $2)`, 
        [property_id, images.secure_url], (error, results) => {
                if(error){ //checks for errors and return them 
                    return res.status(400).json({
                        message: "Unable to add property images"
                    })//Throw t //Throw the error in the terminal
                }
                res.status(200).send({message:"image rooms successfully uploaded"}) //Return a status 200 if there is no error
            }
        )
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Database error when uploading property images", 
        });
    };
}

const getMyProperties = async(req, res) =>{
    const id = parseInt(req.params.userid);
    try{  
        client.query
        (`SELECT l.property_id, l.p_address, l.p_city, l.p_zip_code, l.p_name, l.house_image
            FROM landlordproperty l
            INNER JOIN users u  ON l.landlord_id = u.userid 
            WHERE u.userid = $1 
            ORDER BY l.property_id ASC`,[id], (error, results) =>{ //returns all orders  in the database from product list and ascending order

            if(error){ //checks for errors and return them 
                return res.status(400).json({
                    message: "unable to retrieve all orders"
                }) //Throw the error in the terminal
            }
            res.status(200).json(results.rows) //Return a status 200 if there is no error
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
           message: "Database error while retrieving my properties", 
        });
    };
}

const deleteMyProperty = async(req, res) =>{
    const id = parseInt(req.params.property_id);
    try{  
        await client.query(`DELETE FROM roomsimages WHERE property_id = $1`, [id]);

        client.query(`DELETE FROM landlordproperty WHERE property_id = $1`,[id], (error, results) =>{ //returns all orders  in the database from product list and ascending order
            if(error){ //checks for errors and return them 
                return res.status(400).json({
                    message: "unable delete property"
                })//Throw t //Throw the error in the terminal
            }
            res.status(200).json({message: "Property successfully deleted"}) //Return a status 200 if there is no error
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
           message: "Database error while retrieving my properties", 
        });
    };
}

module.exports = {
    addProperty,
    addRoomImages,
    getMyProperties,
    deleteMyProperty
}