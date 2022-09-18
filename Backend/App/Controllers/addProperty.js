const client = require("../Config/db.config");
const cloudinary = require("../Cloudinary/cloudinary");

const addProperty = async(req, res) =>{
    const id = parseInt(req.params.userid);
   //const{ p_address, p_city, p_town, p_zip_code, p_propertyType, p_name, p_description, p_bedroom, p_bath, p_room, p_price, pet_friendly, title_deed} = req.body
        
   try{
    const results = await cloudinary.uploader.upload(req.file.path, {
        folder: "/property/",
    });
        
        // const data = await client.query(`SELECT * FROM landlordProperty WHERE p_name= $1;`,[p_name]); //Check if user exist
        // const user = data.rows;
      
        // if(user.length != 0){
        //     return res.status(400).json({
        //         message: "Accomodation name already Exist, Add a new Property"
        //     });
        // }else{
            client.query(`INSERT INTO 
            landlordproperty (landlord_id, house_image)
            VALUES($1,$2) RETURNING property_id`, 
            [id, results.secure_url], (error, results) =>{
                if(error){
                    return res.status(400).json({
                        message: "Unable to add property details"
                    });
                }
                return res.status(200).json(results.rows[0].property_id) //Return a status 200 if there is no error
            })
        //}
    }catch{
        res.status(500).json({
            error: "Database error when adding property details", //Database connection error
        });
    }
}

const addRoomImages = async(req, res) =>{
    const id = parseInt(req.params.userid);
    try{  
        const property_id = parseInt(req.params.property_id); 
        const images = await cloudinary.uploader.upload(req.file.path);

        client.query(`INSERT INTO RoomsImages (property_id, images) VALUES ($1, $2)`, 
        [property_id, images.secure_url], (error, results) => {
                if(error){ //checks for errors and return them 
                    return res.status(400).json({
                        message: "Unable to add property images"
                    })//Throw t //Throw the error in the terminal
                }
                res.status(200).json(results.rows) //Return a status 200 if there is no error
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
                })//Throw t //Throw the error in the terminal
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