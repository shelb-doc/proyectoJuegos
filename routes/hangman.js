const authJWT = require("../middleware/jsonWebToken");
const path = require("path");

module.exports = function(server){
    server.get("/game", authJWT.verifyToken, function(req, res){
        res.sendFile(path.join(__dirname, "../Visuals/Juego/index.html"));
    });
}