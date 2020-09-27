const {duplicadoUsuarioEmail} = require ('../middleware/verifySignUp');
const authController = require ('../controllers/auth');

module.exports = function (server) {
  server.use (function (req, res, next) {
    res.header (
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next ();
  });
  server.get ('/signup', authController.signupGET);
  server.get ('/signin', authController.signinGET);
  server.post ('/signup', duplicadoUsuarioEmail, authController.signup);
  server.post ('/signin', authController.signin);
};
