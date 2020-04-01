exports.PRODUTOS_CON_TRAZA = `SELECT DISTINCT PR.PRODUTO_ID AS id, P.NOME as nome
FROM TRAZA T
         LEFT JOIN PRODUTO_REF PR on T.REFERENCIA = PR.REFERENCIA
         LEFT JOIN PRODUTO P ON PR.PRODUTO_ID = P.ID
WHERE DATE(T.DATA) > CURDATE() - INTERVAL 7 DAY
GROUP BY PR.PRODUTO_ID, P.NOME
ORDER BY COUNT(*) DESC, P.NOME;`;
exports.DATASET_POR_ID = `SELECT SUM(IF(DATE(T.DATA) = CURDATE() - INTERVAL 6 DAY, 1, 0)) AS minus6,
SUM(IF(DATE(T.DATA) = CURDATE() - INTERVAL 5 DAY, 1, 0)) AS minus5,
SUM(IF(DATE(T.DATA) = CURDATE() - INTERVAL 4 DAY, 1, 0)) AS minus4,
SUM(IF(DATE(T.DATA) = CURDATE() - INTERVAL 3 DAY, 1, 0)) AS minus3,
SUM(IF(DATE(T.DATA) = CURDATE() - INTERVAL 2 DAY, 1, 0)) AS minus2,
SUM(IF(DATE(T.DATA) = CURDATE() - INTERVAL 1 DAY, 1, 0)) AS minus1,
SUM(IF(DATE(T.DATA) = CURDATE(), 1, 0)) AS minus0
FROM PRODUTO P
  JOIN PRODUTO_REF PR ON P.ID = PR.PRODUTO_ID
  JOIN TRAZA T ON PR.REFERENCIA = T.REFERENCIA
WHERE P.ID = ?
GROUP BY P.ID;`;
exports.INSERT_PRODUTO = `INSERT INTO PRODUTO (NOME, DESCRICION) VALUE (?, ?);`;
exports.GET_ID_FROM_NAME = `SELECT ID as id FROM PRODUTO WHERE NOME = ?;`;
exports.INSERT_INGREDIENTE = `INSERT INTO composicion (PRODUTO_ID, NOME, CANTIDADE, UNIDADE) VALUE (?, ?, ?, ?);`;
exports.INSERT_PREPARACION = `INSERT INTO preparacion (PRODUTO_ID, NUMERO, TEXTO)  VALUE (?, ?, ?);`;
exports.INSERT_TRAZA = `INSERT INTO FORMA_TRAZA (PRODUTO_ID, NUMERO, NOME)  VALUE (?, ?, ?);`;
exports.LISTA_TRAZADOS = `SELECT P.ID as id, P.NOME as nome,
SUBSTRING(P.DESCRICION, 1, 20) AS descr,
COUNT(DISTINCT PR.REFERENCIA)  AS referencias,
COUNT(DISTINCT C.ID)           AS ingredentes,
COUNT(DISTINCT T.ID)           AS trazados
FROM PRODUTO P
  LEFT JOIN produto_ref PR on P.ID = PR.PRODUTO_ID
  LEFT JOIN composicion C ON P.ID = C.PRODUTO_ID
  LEFT JOIN forma_traza FT ON P.ID = FT.PRODUTO_ID
  LEFT JOIN traza T on FT.ID = T.TRAZA_ID
GROUP BY P.ID
HAVING trazados > 0`;
exports.LISTA_SIN_TRAZAR = `SELECT P.ID as id, P.NOME as nome,
SUBSTRING(P.DESCRICION, 1, 20) AS descr,
COUNT(DISTINCT PR.REFERENCIA)  AS referencias,
COUNT(DISTINCT C.ID)           AS ingredentes,
COUNT(DISTINCT T.ID)           AS trazados
FROM PRODUTO P
  LEFT JOIN produto_ref PR on P.ID = PR.PRODUTO_ID
  LEFT JOIN composicion C ON P.ID = C.PRODUTO_ID
  LEFT JOIN forma_traza FT ON P.ID = FT.PRODUTO_ID
  LEFT JOIN traza T on FT.ID = T.TRAZA_ID
GROUP BY P.ID
HAVING trazados = 0`;