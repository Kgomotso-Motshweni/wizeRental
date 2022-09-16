DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    userid SERIAL PRIMARY KEY NOT NULL,
    user_role VARCHAR(15),
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    cellno VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TABLE IF EXISTS tenant CASCADE;
CREATE TABLE tenant(
    id SERIAL PRIMARY KEY NOT NULL,
    profile_img TEXT NOT NULL,
    tenant_id INT,
    FOREIGN KEY(tenant_id) REFERENCES users (userid) 
);

DROP TABLE IF EXISTS Nortifications CASCADE;
CREATE TABLE Nortifications(
    notification_id SERIAL PRIMARY KEY,
    landlord_id INT NOT NULL,
    tenant_id INT NOT NULL,
    subject_id INT NOT NULL,
    notif_type INT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    FOREIGN KEY(tenant_id) REFERENCES users (userid),
    FOREIGN KEY(landlord_id) REFERENCES users (userid)
);

DROP TABLE IF EXISTS landlordProperty CASCADE;
CREATE TABLE landlordProperty(
	property_id SERIAL PRIMARY KEY NOT NULL,
	landlord_id INT,
	p_address VARCHAR(100),
	p_city VARCHAR(100),
	p_town VARCHAR(100),
	p_zip_code INT,
	p_propertyType VARCHAR(100),
	p_name VARCHAR(150),
	p_description TEXT,
	p_bedroom INT,
	p_bath INT,
	p_room INT,
	p_price DECIMAL(8,2),
	pet_friendly CHAR,
	title_deed TEXT,
	house_image TEXT,
	p_create_time TIMESTAMPTZ DEFAULT NOW(),
	p_update_time TIMESTAMPTZ DEFAULT NOW(),
	FOREIGN KEY(landlord_id) REFERENCES users (userid) 
);

DROP TABLE IF EXISTS RoomsImages CASCADE;
CREATE TABLE RoomsImages(
	image_id SERIAL PRIMARY KEY NOT NULL,
	property_id INT,
	images TEXT,
	FOREIGN KEY(property_id) REFERENCES landlordProperty(property_id) 
);
