exports.LISTA_PRODUTOS = 'SELECT ID AS id, NOME AS nome FROM PRODUTO ORDER BY ID;';
exports.LISTA_TRAZAS_PROD = 'SELECT ID AS id, NUMERO AS numero, NOME AS nome FROM FORMA_TRAZA WHERE PRODUTO_ID = ? ORDER BY NUMERO;';
exports.COMPROBAR_TOKEN = 'SELECT ACTIVO AS activo FROM TOKENS WHERE TOKEN = ?';
exports.ADD_TRAZA = 'INSERT INTO TRAZA (REFERENCIA, TRAZA_ID, DATA, LOCALIZACION, LATITUD, LONGITUD) VALUE (?, ?, ?, ?, ?, ?);';