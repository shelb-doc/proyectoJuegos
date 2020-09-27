const authJWT = require ('../middleware/jsonWebToken');
const path = require ('path');

module.exports = function (server) {
  server.get ('/game/hangman', authJWT.verifyToken, function (req, res) {
    res.sendFile (
      path.join (__dirname, '../visuals/Juegos/hangman/index.html')
    );
  });
};
