const authJWT = require("../middleware/jsonWebToken");
const path = require("path");

module.exports = function(server){
    server.get("/game/tictactoe", authJWT.verifyToken, function(req, res){
        res.sendFile(path.join(__dirname, "../visuals/juego/ticTactoe/index.html"));
    });
}