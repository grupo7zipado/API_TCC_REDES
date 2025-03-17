const db = require("../db/conection.js");
const { SqlLastDataUser } = require("./sql.js");


const Dados = async ( request, response)=>{
    try {
        const sql = "SELECT esp_id, dados_tipo, dados_valor, dados_generate, dados_timestamp FROM dados"
        const res = await db.query(sql)
        return response.status(200).json({
            message:"suscesso",
            data: res
        })

    } catch (error) {
        return response.status(400).json({
            message:"error",
            error: error
        })
    }
}
const LastDataUsers = async ( request, response)=>{
    try {
        const res = await db.query(SqlLastDataUser);
        const respostaTratada = res[0]        
        return response.status(200).json({
            message: "suscesso",
            data: respostaTratada
        })
    } catch (error) {
        return response.status(400).json({
            message:"error",
            error: error
        })
    }
}

module.exports = { Dados, LastDataUsers }