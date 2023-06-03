var database = require("../database/config");

function buscarUltimasMedidas(idAquario, limite_linhas) {

    instrucaoSql = ''

    // if (process.env.AMBIENTE_PROCESSO == "producao") {
    //     instrucaoSql = `select top ${limite_linhas}
    //     dht11_temperatura as temperatura, 
    //     dht11_umidade as umidade,  
    //                     momento,
    //                     FORMAT(momento, 'HH:mm:ss') as momento_grafico
    //                 from medida
    //                 where fk_aquario = ${idAquario}
    //                 order by id desc`;}
    if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select (SELECT COUNT(temporadasassistidas) from usuario where temporadasassistidas = 1 or temporadasassistidas = 0) as um_zero,
        (SELECT COUNT(temporadasassistidas) from usuario where temporadasassistidas > 1 and temporadasassistidas <= 5)                      as dois_cinco,
        (SELECT COUNT(temporadasassistidas) from usuario where temporadasassistidas >= 6 and temporadasassistidas <= 9)                     as seis_nove,
        (SELECT COUNT(temporadasassistidas) from usuario where temporadasassistidas >= 10 and temporadasassistidas <= 14)                   as dez_catorze,
        (SELECT COUNT(temporadasassistidas) from usuario where temporadasassistidas = 15)                                                   as todas;`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idAquario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,
                        DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idAquario} 
                    order by id desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
