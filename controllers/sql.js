// cadastro de esp
const SqlCadastroEsp = `
    INSERT INTO 
        esp( 
            esp_mac
        )   
    VALUE 
        (
            ?
        )
    ;
`
;

// cadastro de usuarios
const SqlCadastroUsuario = `
    INSERT INTO 
        usuarios( 
            usu_nome, 
            usu_nascimento
        ) 
    VALUE 
        ( 
            ?, 
            ?
        );
`
;

// cadastro do relacionamento usuario <> esp
const SqlCadastroUsuarioEsp = `
    INSERT INTO 
        usuariosEsp( 
            usu_id, 
            esp_id
        ) 
    VALUE( 
        ?, 
        ?
    )
    ;
`
;

// Retorna todos os Dados relacionado ao ultimo relacionamento do usuario com um esp

const SqlSelectAllDataUser = `
    
(
    SELECT 
		dados_id, 
        dados_tipo, 
        dados_valor, 
        DATE_FORMAT(dados_generate,'%d/%m/%Y') AS dados_generate
    FROM 
        dados
    WHERE 
        dados_tipo = 'bpm' 
        AND 
        use_id = ?
    ORDER BY 
        dados_id 
        DESC
    LIMIT 
        100
    )
    UNION ALL
    (
        SELECT 
            dados_id, 
            dados_tipo, 
            dados_valor, 
            DATE_FORMAT(dados_generate,'%d/%m/%Y') AS dados_generate FROM dados
        WHERE 
            dados_tipo = 'temperatura' 
            AND 
            use_id = ?
        ORDER BY 
            dados_id 
            DESC
        LIMIT 
            100
    )
    UNION ALL
    (
        SELECT 
            dados_id, 
            dados_tipo, 
            dados_valor, 
            DATE_FORMAT(dados_generate,'%d/%m/%Y') AS dados_generate FROM dados
        WHERE d
            ados_tipo = 'oxigenacao' 
            AND 
            use_id = ?
        ORDER BY 
            dados_id 
            DESC
        LIMIT 
            100
    )
`
;


/*
const SqlSelectAllDataUser = `
    SELECT 
        -- talvez não precisa trazer por prop
        -- usu_id, 
        -- esu.use_id, 
        -- esp_id, 
        -- use_status,
        -- trazer 100%
        dados_id, 
        dados_tipo, 
        dados_valor, 
        DATE_FORMAT(dados_generate,'%d/%m/%Y') AS dados_generate
    FROM 
        usuariosEsp esu
    INNER JOIN 
        dados dad 
    ON 
        esu.use_id = dad.use_id
    WHERE 
        -- pega o ultimo relacionamento esp <> usuario
        esu.use_id = ( 
            SELECT 
                MAX(use_id) 
            FROM 
                usuariosEsp t
            WHERE 
                t.usu_id = esu.usu_id
        )
    -- fitrar pro id
    AND 
        usu_id = ?
    ORDER BY dados_generate DESC;
`;
*/
/*
const SqlSelectAllDataUser = `
    SELECT 
        -- talvez não precisa trazer por prop
        -- usu_id, 
        -- esu.use_id, 
        -- esp_id, 
        -- use_status,
        -- trazer 100%
        dados_id, 
        dados_tipo, 
        dados_valor, 
        dados_generate
    FROM 
        usuariosEsp esu
    INNER JOIN 
        dados dad 
    ON 
        esu.use_id = dad.use_id
    WHERE 
        -- pega o ultimo relacionamento esp <> usuario
        esu.use_id = ( 
            SELECT 
                MAX(use_id) 
            FROM 
                usuariosEsp t
            WHERE 
                t.usu_id = esu.usu_id
        )
    -- fitrar pro id
    AND 
        usu_id = ?
    ORDER BY dados_generate DESC
    ;
`
;
*/

// select do ultimo dado de temperatura, bpm e oxigenação registrado do usuario
const SqlLastDataUser = `
    SELECT 
        esu.use_id, 
        esu.usu_id, 
        esu.esp_id, 
        usu.usu_nome, 
        usu.usu_nascimento,
        (
            -- seleciona o valor do dado 
            SELECT 
                dados_valor 
            FROM 
                dados dad
            WHERE 
                -- o id do ultimo relacionamento do usuario com esp
                dad.use_id = d.use_id 
                AND 
                -- tipo temperatura
                dados_tipo = 'temperatura' 
            -- apenas o ultimo registro com base quando o dado foi gerado
            ORDER BY dados_id DESC LIMIT 1
        ) AS temp_valor,
        (
            SELECT 
                dados_valor 
            FROM 
                dados dad
            WHERE 
                -- o id do ultimo relacionamento do usuario com esp
                dad.use_id = d.use_id  
                AND 
                -- tipo bpm
                dados_tipo = 'bpm' 
            -- apenas o ultimo registro com base quando o dado foi gerado
            ORDER BY dados_id DESC LIMIT 1 
        ) AS bpm_valor,
        (
            SELECT 
                dados_valor 
            FROM 
                dados dad 
            WHERE 
                -- o id do ultimo relacionamento do usuario com esp
                dad.use_id = d.use_id  
                AND 
                -- tipo oxigenacao
                dados_tipo = 'oxigenacao' 
            -- apenas o ultimo registro com base quando o dado foi gerado
            ORDER BY dados_id DESC LIMIT 1 
            ) AS oxig_valor
    FROM 
        usuariosEsp esu
    INNER JOIN 
        usuarios usu 
    ON 
        -- pega os dados do usuario
        usu.usu_id = esu.usu_id 
    INNER JOIN 
        dados d 
    ON 
        -- pega os dados dos dados
        d.use_id = esu.use_id 
    WHERE 
        -- pega o ultimo relacionamento esp <> usuario
        esu.use_id = ( 
            SELECT 
                MAX(use_id) 
            FROM 
                usuariosEsp t
            WHERE 
                t.usu_id = esu.usu_id
        )
    -- organiza pelos usuarios
    GROUP BY 
        usu.usu_id 
    ;
`
;

// Exporta todas os Query
module.exports = { SqlCadastroEsp, SqlCadastroUsuario, SqlCadastroUsuarioEsp, SqlSelectAllDataUser, SqlLastDataUser, };