const client = require("../Config/db.config");
const cloudinary = require("../Cloudinary/cloudinary");


const addProperty = async(req, res) =>{
   try{
        const id = parseInt(req.params.userid);
        const{ p_address, p_city, p_town, p_zip_code, p_propertyType, p_name, p_description, p_bedroom, p_bath, p_room, p_price, pet_friendly, title_deed} = req.body
        const image = await cloudinary.uploader.upload(req.file.path)
        
        const data = await client.query(`SELECT * FROM landlordProperty WHERE p_name= $1;`,[p_name]); //Check if user exist
        const user = data.rows;
      
        if(user.length != 0){
            return res.status(400).json({
                message: "Accomodation name already Exist, Add a new Property"
            });
        }else{
            client.query(`INSERT INTO 
            landlordProperty (landlord_id, p_address, p_city, p_town, p_zip_code, p_propertyType, p_name, p_description, p_bedroom, p_bath, p_room, p_price, pet_friendly, title_deed, house_image)
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14, $15) RETURNING property_id`, 
            [id, p_address, p_city, p_town, p_zip_code, p_propertyType, p_name, p_description, p_bedroom, p_bath, p_room, p_price, pet_friendly, title_deed, image.secure_url], (error, results) =>{
                if(error){
                    return res.status(400).json({
                        message: "Unable to add property details"
                    });
                }
                return res.status(200).json(results.rows[0].property_id) //Return a status 200 if there is no error
            })
        }
    }catch{
        res.status(500).json({
            error: "Database error while registring user!", //Database connection error
        });
    }
}

const addRoomImages = async(req, res) =>{
    const property_id = parseInt(req.params.property_id); 
    const {images} = req.body
    try{  
        client.query(`
            INSERT INTO RoomsImages (property_id, images) 
            VALUES ($1, $2)`, [property_id, images], (error, results) => {
                if(error){ //checks for errors and return them 
                    return res.status(400).json({
                        error: "Unable to add property images"
                    })//Throw t //Throw the error in the terminal
                }
                res.status(200).json(results.rows) //Return a status 200 if there is no error
            }
        )
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
           error: "Database error while retrieving products", 
        });
    };
}


module.exports = {
    addProperty,
    addRoomImages
}