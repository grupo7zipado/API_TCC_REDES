// Imports
// Conexão com Banco de dados
const db = require("../db/conection");
// SQL
const { SqlCadastroEsp } = require("./sql");


// Cadastro Esp
const CadastroEsp = async( request, response)=>{
    try {
        
        // Recebe os dados do body
        const { esp_mac} = request.body
        
        // Verifica os dados do esp existem
        if(!esp_mac){
            return response.status(400).json({
                message: "invalid data"
            })
        }

        // Cadastra o esp
        console.log(esp_mac);
        
        const res = await db.query( SqlCadastroEsp, esp_mac)

        //retorna sucesso
        return response.status(200).json({
            message:"suscesso",
            data: res
        })

    // Em caso de erro
    } catch (error) {
        return response.status(400).json({
            message:"error",
            error: error
        })
    }
};

// Exporta as Funcões
module.exports = {CadastroEsp};