module.exports = app => {
    const add = require("../Controllers/apply");
    
    app.post('/addAplicant', add.applyRoom)
}