const fs = require('fs')
const path = require('path')

module.exports.productos = async function (req, res, next) {
    try {
        let tmp_productos = []
        productos.forEach((p, i) => {
            let archivo = fs.readFileSync(path.join(__dirname,'..', 'assets', p.nombre_imagen), { encoding: 'base64' });
            p.imagen = `data:application/jpg;base64,${archivo}`
            tmp_productos.push(p)
        });
        res.status(200).json({
            productos: tmp_productos,
            status: 200
        })
        
    } catch (error) {
        console.log(error)
        response.status(200).json({
            mensaje: "ocurrio un error!",
            status: 404,
        })
    }
}

module.exports.producto = async function(req, res, next) {
    try {
        if(req.body.imagen){
            let match =  req.body.imagen.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
            let contenido =  Buffer.from(match[2],'base64');
            let nombre = `producto_${productos.length}.jpg`
            fs.writeFile(
                path.join(__dirname,'..', 'assets', nombre), 
                contenido, 
                (err) => {
                    if(err){
                        res.status(200).json({mensaje: 'Ocurrio un error al guardar imagen'})
                        return
                    }            
                    productos.push({
                        nombre: req.body.nombre,
                        precio: req.body.precio,
                        nombre_imagen: nombre
                    })
                    res.status(200).json({mensaje: 'Producto creado con éxito', status: 200})
                }
            );
        }
    } catch (error) {
        console.log(error)
        res.status(200).json({mensaje: 'Ocurrio un error'})
    }
}

let productos = []