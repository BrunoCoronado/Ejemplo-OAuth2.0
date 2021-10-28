module.exports.productos = async function (request, response, next) {
    try {
        response.status(200).json({
            registros: [
                {
                    id: 1,
                    nombre: 'producto 1'
                },
                {
                    id: 2,
                    nombre: 'producto 2'
                },
                {
                    id: 3,
                    nombre: 'producto 3'
                },
        ],
            status: 200,
        })
        
    } catch (error) {
        console.log(error)
        response.status(200).json({
            mensaje: "ocurrio un error!",
            status: 404,
        })
    }
}