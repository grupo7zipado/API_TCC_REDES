const db = require("../db/conection");
const { SqlCadastroEsp } = require("./sql");


const CadastroEsp = async( request, response)=>{
    try {
        const { esp_mac} = request.body
        if(!esp_mac){
            return response.status(400).json({
                message: "invalid data"
            })
        }

        const res = await db.query( SqlCadastroEsp, [ esp_mac])
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

module.exports = {};