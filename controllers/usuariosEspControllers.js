const db = require("../db/conection.js");
const {SqlCadastroUsuarioEsp } = require("./sql.js");

const CadatroUsuarioEsp = async ( request, response)=>{
    try {
        const res = await db.query(SqlCadastroUsuarioEsp);
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

module.exports = { CadatroUsuarioEsp,}