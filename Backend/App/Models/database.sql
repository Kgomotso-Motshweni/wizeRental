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

DROP TABLE IF EXISTS LandlordToTenantNortifications CASCADE;
CREATE TABLE LandlordToTenantNortifications(
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

DROP TABLE IF EXISTS TenantToLandlordNortifications CASCADE;
CREATE TABLE TenantToLandlordNortifications(
    notification_id SERIAL PRIMARY KEY,
    landlord_id INT NOT NULL,
    tenant_id INT NOT NULL,
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
	p_address VARCHAR(100) ,
	p_city VARCHAR(100),
	p_town VARCHAR(100),
	p_zip_code INT,
	p_propertyType VARCHAR(100),
	p_name VARCHAR(150) UNIQUE,
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

DROP TABLE IF EXISTS ApplicationForm CASCADE;
CREATE TABLE ApplicationForm(
	applicant_id SERIAL PRIMARY KEY NOT NULL,
	tenant_id INT,
	property_id INT,
	full_name VARCHAR(255),
	email VARCHAR(50),
	phone_num VARCHAR(15),
	age INT,
	id_doc TEXT,
	occupation VARCHAR(255),
	view_date TIMESTAMPTZ DEFAULT NOW(),
	num_Tenants INT,
	num_pets INT,
	ped_desc TEXT,
	smoke CHAR(5),
	app_create_time TIMESTAMPTZ DEFAULT NOW(),
	FOREIGN KEY(tenant_id) REFERENCES users(userid),
	FOREIGN KEY(property_id) REFERENCES landlordProperty(property_id) 
);

DROP TABLE IF EXISTS Rentees CASCADE;
CREATE TABLE Rentees(
	rentee_id SERIAL PRIMARY KEY NOT NULL,
	tenant_id INT,
	property_id INT,
	full_name VARCHAR(255),
	unit VARCHAR(10),
	rent DECIMAL(8,2),
	moaStart TIMESTAMPTZ DEFAULT NOW(),
	moaEnd TIMESTAMPTZ DEFAULT NOW(),
	rent_paid  DECIMAL(8,2),
	paymentstatus BOOLEAN,
	moa_status VARCHAR(250),
	create_time TIMESTAMPTZ DEFAULT NOW(),
	r_update_time TIMESTAMPTZ DEFAULT NOW(),
	FOREIGN KEY (tenant_id) REFERENCES public.users (userid)
	FOREIGN KEY(property_id) REFERENCES landlordProperty(property_id) 
);

DROP TABLE IF EXISTS MOA CASCADE;
CREATE TABLE MOA(
	moa SERIAL PRIMARY KEY NOT NULL,
    rentee_id INT,
	amount decimal(8,2),
    agreeStartDate TIMESTAMPTZ DEFAULT NOW(),
    agreeEndDate TIMESTAMPTZ DEFAULT NOW(),
    payStartDate TIMESTAMPTZ DEFAULT NOW(),
    payendDate TIMESTAMPTZ DEFAULT NOW(),
    agreementType VARCHAR(100),
    FOREIGN KEY (rentee_id) REFERENCES public.rentees (rentee_id)
);