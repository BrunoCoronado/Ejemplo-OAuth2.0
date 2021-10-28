const jsonwebtoken = require('jsonwebtoken');

const SECRET_KEY = 'cnbZua0eCJ'

module.exports.login = async function(request, response, next){
    try {
        let index_usuario = usuarios.map(u => u.usuario).indexOf(request.body.usuario)

        let access_token;
        let refresh_token;

        if(usuarios[index_usuario].password != request.body.password){
            access_token = jsonwebtoken.sign({usuario: request.body.usuario}, SECRET_KEY, {expiresIn: '1m'});
            refresh_token = jsonwebtoken.sign({usuario: request.body.usuario, refresh: true}, SECRET_KEY, {expiresIn: '5m'});  
        }

        response.status(200).json({
            auth: usuarios[index_usuario].password == request.body.password,
            access_token: access_token,
            refresh_token: refresh_token,
            status: 200
        })
    } catch (error) {
        console.log(error)
        response.status(200).json({status: 404, mensaje: 'Error al autorizar usuario.'})
    }
}

module.exports.refresh = async function(request, response, next){
    try {
        refresh_token = request.body.refresh_token;
        const decoded = jsonwebtoken.verify(refresh_token, SECRET_KEY);
        if(!decoded.refresh){
            response.status(200).json({status: 404, mensaje: 'Refresh token inválido'})
            return
        }

        let access_token = jsonwebtoken.sign({usuario: decoded.usuario}, SECRET_KEY, {expiresIn: '1m'});
        response.status(200).json({
            access_token: access_token,
            status: 200
        })
    } catch (error) {
        console.log(error)
        response.status(200).json({status: 403, mensaje: 'Error al refrescar token.'})
    }
}

let usuarios = [
    {
        usuario: 'admin',
        password: '123456',
        rol: 1,
    },
    {
        usuario: 'cliente',
        password: '123456',
        rol: 2,
    },
]