const db = require("../db/conection.js");
const { SqlLastDataUser, SqlSelectAllDataUser } = require("./sql.js");


const AllDataUser = async ( request, response)=>{
    try {
        const res = await db.query(SqlSelectAllDataUser)
        return response.status(200).json({
            message:"suscesso",
            data: res[0]
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

module.exports = { AllDataUser, LastDataUsers }