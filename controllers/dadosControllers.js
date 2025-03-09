const db = require("../db/conection.js");


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
        const sql = 
        `
            SELECT esp_id, 
                (SELECT dados_valor 
                FROM dados 
                WHERE dados.esp_id = d.esp_id AND dados_tipo = 'temperatura' 
                ORDER BY dados_generate DESC LIMIT 1) AS temp_valor,
                (SELECT dados_generate
                FROM dados
                WHERE dados.esp_id = d.esp_id AND dados_tipo = 'temperatura' 
                ORDER BY dados_generate DESC LIMIT 1) AS temp_generate,
                (SELECT dados_valor 
                FROM dados 
                WHERE dados.esp_id = d.esp_id AND dados_tipo = 'bpm' 
                ORDER BY dados_generate DESC LIMIT 1) AS bpm_valor,
                (SELECT dados_generate
                FROM dados
                WHERE dados.esp_id = d.esp_id AND dados_tipo = 'bpm' 
                ORDER BY dados_generate DESC LIMIT 1) AS bpm_generate,
                (SELECT dados_valor 
                FROM dados 
                WHERE dados.esp_id = d.esp_id AND dados_tipo = 'oxigenacao' 
                ORDER BY dados_generate DESC LIMIT 1) AS oxig_valor,
                (SELECT dados_generate
                FROM dados
                WHERE dados.esp_id = d.esp_id AND dados_tipo = 'oxigenacao' 
                ORDER BY dados_generate DESC LIMIT 1) AS oxig_generate
            FROM dados d
            GROUP BY esp_id;
        `
        const res = await db.query(sql);
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