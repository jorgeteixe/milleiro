exports.REFLIST_QUERY = 'SELECT pf.REFERENCIA AS ref, count(TRAZA_ID) as trazado, (SELECT COUNT(*) FROM forma_traza WHERE PRODUTO_ID = ?) AS totalTrazas, max(DATA) as ultimaAct  FROM produto_ref pf LEFT JOIN traza t on pf.REFERENCIA = t.REFERENCIA WHERE PRODUTO_ID = ? GROUP BY pf.REFERENCIA';
exports.PRODUCT_LIST_SIMPLE = 'SELECT id, nome FROM produto';
exports.REF_TRAZAS = 'SELECT f.NUMERO as numTraza, f.NOME as nomeTraza, t.DATA as data, t.LOCALIZACION as localizacion, t.LATITUD as latitud, t.LONGITUD as longitud FROM traza t JOIN forma_traza f on t.TRAZA_ID = f.ID WHERE REFERENCIA = ?';
exports.PRODUCT_SIMPLE_BY_ID = 'SELECT id, NOME as nome, DESCRICION as descricion FROM produto WHERE ID = ?';
exports.PRODUTO_BY_REF = 'SELECT PRODUTO_ID FROM produto_ref WHERE REFERENCIA = ?';
exports.PREPARACION_BY_ID = 'SELECT NUMERO as numero, TEXTO as texto FROM PREPARACION WHERE PRODUTO_ID = ?';
exports.INGREDIENTES_BY_ID = 'SELECT NOME AS nome, CANTIDADE AS cantidade, UNIDADE AS uds FROM composicion WHERE PRODUTO_ID = ? ORDER BY CANTIDADE DESC';
exports.INSERT_REF = 'INSERT INTO PRODUTO_REF VALUE (?, ?)';