const db = require("../db/conection");
const { SqlCadastroUsuario } = require("./sql");

const cadastroUsuarios = async (request, response)=>{
    try {
        const { usu_nome, usu_nascimento } = request.body;

        if(!(usu_nome && usu_nascimento)){
            return response.status(400).json({
                message: "invalid data"
            })
        }
        const values = [ usu_nome, usu_nascimento]
        const res = await db.query( SqlCadastroUsuario , values);

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

module.exports =  {cadastroUsuarios}