--survusers TABLE
DROP TABLE IF EXISTS survusers ;
CREATE TABLE survusers(
    userid SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phonenumber VARCHAR(15) NOT NULL,
    usertype VARCHAR(15),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    password VARCHAR(255) NOT NULL
);

--survlist TABLE
DROP TABLE IF EXISTS survlist ;
CREATE TABLE survlist(
    survid SERIAL PRIMARY KEY,
    title VARCHAR(100),
    desciption VARCHAR(255),
    status VARCHAR(12),
    code VARCHAR(12),
    userid integer,
    FOREIGN KEY(userid) REFERENCES survusers (userid)
);

