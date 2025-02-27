const db = require("../db.js");


const Dados = async ( request, response)=>{
    try {
        const token = request.headers["authorization"]
        //verifica a existencia do token
        if (!token) {
            return response.status(401).json({
                message:'Token não fornecido'
            });
        }
        const resToken = validate(token);
        //valida a sesão
        if (resToken) {
            return response.status(401).json({
                message:"token invalido"
            })
        }
        //valida as entradas
        const { user_id, event_id} = request.body;
        if(!(user_id && event_id)){
            return response.status(400).json({
                message: "invalid data"
            })
        }
        const sql = "INSERT INTO enrollments( user_id, event_id ) VALUES ( ?, ? )"
        const res = await db.query( sql, [ user_id, event_id ] )

        return response.status(200).json({
            message:"suscesso"
        })

    } catch (error) {
        return response.status(400).json({
            message:"error",
            error: error
        })
    }
}

module.exports = { Dados }