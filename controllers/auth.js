const pool = require("../db_connection/database");
const config = require("../config/auth.config");
var jwt = require("jsonwebtoken");
var {encryptPassword, matchPassword} = require("../helpers/encryptPassword");
const path = require("path");

exports.signup = async (req, res)=>{
    const { usuario, nombre, apellido, email, contraseña } = req.body;
    const hPassword = encryptPassword(contraseña);
    var isAdmin;
        if(email === "andrespoliv@gmail.com"){
            isAdmin = 1;
        }else{
            isAdmin = 0;
        }
    const nuevoUsuario = {
        usuario,
        nombre,
        apellido,
        email,
        contraseña: hPassword
    }
    await pool.query("INSERT INTO usuarios set ?", [nuevoUsuario]);
    res.sendFile(path.join(__dirname, '../visuals/auth', 'signin.html'));
}

exports.signupGET = (req, res)=>{
    res.sendFile(path.join(__dirname, '../visuals/auth', 'signup.html'));
}

exports.signinGET = (req, res)=>{
    res.sendFile(path.join(__dirname, '../visuals/auth', 'signin.html'));
}

exports.signin = async (req, res)=>{
    const {usuario, contraseña} = req.body;
    const bUsuario = await pool.query("SELECT * FROM usuarios WHERE usuario = ?", [usuario]);
    if(bUsuario[0]){
            var verPassword = matchPassword(
                contraseña,
                bUsuario[0].contraseña
            )
        if(verPassword){
            var token = jwt.sign({id: bUsuario[0].id}, config.secret, {
                expiresIn: 86400 //24 horas
            });
            res.sendFile(path.join(__dirname, "../visuals/Juego/index.html"));
            } else{
            res.status(401).send({
                accessToken: null,
                message: "Contraseña inválida"
            });
        }
    }else{
        res.status(404).send({
            message: "Usuario no encontrado"
        })
    }
}
