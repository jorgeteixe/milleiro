DROP DATABASE IF EXISTS MILLEIRO;
CREATE DATABASE MILLEIRO;

USE MILLEIRO;

CREATE TABLE PRODUTO (
    ID INT(8) NOT NULL AUTO_INCREMENT,
    NOME VARCHAR(20) NOT NULL,
    DESCRICION VARCHAR(60) NOT NULL,

    PRIMARY KEY (ID),

    UNIQUE INDEX UNIQUE_NOME (NOME)

) ENGINE INNODB;

CREATE TABLE PRODUTO_REF (
    REFERENCIA VARCHAR(10) NOT NULL,
    PRODUTO_ID INT(8) NOT NULL,

    PRIMARY KEY (REFERENCIA),

    FOREIGN KEY FK_PRODUTO_REF_PRODUTO(PRODUTO_ID)
        REFERENCES PRODUTO(ID)
        ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE INNODB;

CREATE TABLE COMPOSICION (
    ID INT(8) NOT NULL AUTO_INCREMENT,
    PRODUTO_ID INT(8) NOT NULL,
    NOME VARCHAR(25) NOT NULL,
    CANTIDADE INT(4) NOT NULL,
    UNIDADE VARCHAR(12) NOT NULL,

    PRIMARY KEY (ID),
    
    UNIQUE INDEX UNIQUE_PRODUTO_NOME(PRODUTO_ID, NOME),

    FOREIGN KEY FK_COMPOSICION_PRODUTO(PRODUTO_ID)
        REFERENCES PRODUTO(ID)
        ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE INNODB;

CREATE TABLE PREPARACION (
    ID INT(8) NOT NULL AUTO_INCREMENT,
    PRODUTO_ID INT(8) NOT NULL,
    NUMERO INT(2) NOT NULL,
    TEXTO TEXT NOT NULL,

    PRIMARY KEY (ID),

	UNIQUE INDEX UNIQUE_PRODUTO_NUMERO(PRODUTO_ID, NUMERO),

    FOREIGN KEY FK_PREPARACION_PRODUTO(PRODUTO_ID)
        REFERENCES PRODUTO(ID)
        ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE INNODB;

CREATE TABLE FORMA_TRAZA (
    ID INT(8) NOT NULL AUTO_INCREMENT,
    PRODUTO_ID INT(8) NOT NULL,
    NUMERO INT(2) NOT NULL,
    NOME VARCHAR(30) NOT NULL,

    PRIMARY KEY (ID),

	UNIQUE INDEX UNIQUE_PRODUTO_NUMERO(PRODUTO_ID, NUMERO),

    FOREIGN KEY FK_FORMA_TRAZA_PRODUTO(PRODUTO_ID)
        REFERENCES PRODUTO(ID)
        ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE INNODB;

CREATE TABLE TRAZA (
    ID INT(8) NOT NULL AUTO_INCREMENT,
    REFERENCIA VARCHAR(10) NOT NULL,
    TRAZA_ID INT(8) NOT NULL,
    DATA DATETIME NOT NULL,
    LOCALIZACION VARCHAR(30) NOT NULL,
    LATITUD FLOAT NOT NULL,
    LONGITUD FLOAT NOT NULL,

    PRIMARY KEY (ID),
    
    UNIQUE INDEX UNIQUE_REFERENCIA_TRAZA(REFERENCIA, TRAZA_ID),

    FOREIGN KEY FK_TRAZA_PRODUTO_REF(REFERENCIA)
        REFERENCES PRODUTO_REF(REFERENCIA)
        ON DELETE CASCADE ON UPDATE CASCADE,

    FOREIGN KEY FK_TRAZA_FORMA_TRAZA(TRAZA_ID)
        REFERENCES FORMA_TRAZA(ID)
        ON DELETE CASCADE ON UPDATE CASCADE

) ENGINE INNODB;

CREATE TABLE TOKENS (
    TOKEN VARCHAR(12) NOT NULL,
    NOME VARCHAR(20) NOT NULL,
    ACTIVO BOOLEAN NOT NULL DEFAULT 1,

    PRIMARY KEY (TOKEN)

) ENGINE INNODB; 
 
 

USE milleiro;
INSERT INTO `PRODUTO` (`ID`, `NOME`, `DESCRICION`) VALUES
(1, 'Pan millo', 'Lorem ipsum dolor sit amet.'),
(2, 'Pan centeo', 'Laoreet odio vestibulum.'),
(3, 'Pan avea', 'Integer feugiat pellentesque rutrum.');
INSERT INTO `COMPOSICION` (`ID`, `PRODUTO_ID`, `NOME`, `CANTIDADE`, `UNIDADE`) VALUES
(1, 1, 'Fariña de millo', 250, 'g'),
(2, 1, 'Levadura', 60, 'g'),
(3, 1, 'Sal', 15, 'g'),
(4, 2, 'Fariña de centeo', 300, 'g'),
(5, 2, 'Levadura', 70, 'g'),
(6, 2, 'Sal', 12, 'g'),
(7, 3, 'Fariña de avea', 500, 'g'),
(8, 3, 'Levadura', 50, 'g'),
(9, 3, 'Sal', 10, 'g');

INSERT INTO `FORMA_TRAZA` (`ID`, `PRODUTO_ID`, `NUMERO`, `NOME`) VALUES
(1, 1, 1, 'Plantado'),
(2, 1, 2, 'Recolectado'),
(3, 1, 3, 'Entrada'),
(4, 1, 4, 'Forneado'),
(5, 1, 5, 'Envasado'),
(6, 1, 6, 'Salida'),
(7, 2, 1, 'Entrada'),
(8, 2, 2, 'Preparado'),
(9, 2, 3, 'Masa feita'),
(10, 2, 4, 'Forneado'),
(11, 2, 5, 'Salida'),
(12, 3, 1, 'Plantado'),
(13, 3, 2, 'Recolectado'),
(14, 3, 3, 'Forneado'),
(15, 3, 4, 'Envasado');

INSERT INTO `PREPARACION` (`ID`, `PRODUTO_ID`, `NUMERO`, `TEXTO`) VALUES
(1, 1, 1, 'Laoreet odio vestibulum ullamcorper himenaeos cubilia magna montes velit rhoncus conubia id tortor.'),
(2, 1, 2, 'Velit turpis ut hendrerit duis commodo taciti morbi cursus, imperdiet habitant curae malesuada vulputate diam condimentum neque volutpat, ligula venenatis accumsan orci penatibus sociis natoque.'),
(3, 1, 3, 'Tortor nostra lacus sodales aliquam magnis venenatis blandit, sociosqu senectus nibh pretium dictum nisl massa, metus imperdiet risus donec curabitur luctus.'),
(4, 1, 4, 'Suscipit et imperdiet interdum nunc mauris pharetra at urna nec, tempor nostra arcu litora penatibus in luctus felis.'),
(5, 2, 1, 'Lorem ipsum dolor sit amet consectetur adipiscing elit nec vestibulum, in accumsan nisi orci habitant neque ornare. At dictumst semper felis dui lectus aliquam convallis, leo hendrerit odio pellentesque purus.'),
(6, 2, 2, 'Auctor nulla vehicula lobortis conubia augue varius risus litora imperdiet, ornare cras sollicitudin ultricies integer eget viverra curae, nibh mollis quisque sociosqu pellentesque eleifend sed ante.'),
(7, 2, 3, 'Sem phasellus nam dictum libero potenti ac interdum mus ligula, fusce semper habitasse vivamus aptent convallis duis purus lobortis, auctor varius ante himenaeos felis mauris quisque etiam.'),
(8, 2, 4, 'Penatibus condimentum facilisis ullamcorper metus hac venenatis arcu nibh varius morbi dictumst eu nam, quisque imperdiet mus duis urna elementum vitae consequat dictum congue et.'),
(9, 3, 1, 'Blandit dictumst lacus class ac mus. Auctor mollis donec orci eu accumsan facilisi, scelerisque ante velit aliquet mattis mi, penatibus montes dignissim etiam dictumst.'),
(10, 3, 2, 'Dis interdum venenatis egestas auctor penatibus donec fusce ultricies rhoncus, bibendum conubia non augue aptent odio pellentesque tellus mus, sed ante est lectus euismod curae accumsan commodo.'),
(11, 3, 3, 'Iaculis platea mattis augue sem habitasse dui quam nunc eros conubia ligula nullam scelerisque consequat nam, rutrum ridiculus aptent volutpat integer eu dictumst varius ut imperdiet tortor convallis himenaeos proin.'),
(12, 3, 4, 'Id ullamcorper porta natoque interdum arcu ligula habitasse et tempor, convallis risus quam sociis justo congue ornare vestibulum, habitant magnis rutrum mi velit posuere nostra ultrices.');



INSERT INTO `PRODUTO_REF` (`REFERENCIA`, `PRODUTO_ID`) VALUES
('PM1A20001', 1),
('PM1A20002', 1),
('PC1A20001', 2),
('PC1A20002', 2),
('PA1A20001', 3),
('PA1A20002', 3);

INSERT INTO `TRAZA` (`ID`, `REFERENCIA`, `TRAZA_ID`, `DATA`, `LOCALIZACION`, `LATITUD`, `LONGITUD`) VALUES
(1, 'PM1A20001', 1, NOW() - INTERVAL 6 DAY, 'O Covelo, Lodoselo', 42.0774, -7.59567),
(2, 'PM1A20001', 2, NOW() - INTERVAL 5 DAY, 'O Covelo, Lodoselo', 42.0774, -7.59567),
(3, 'PM1A20001', 3, NOW() - INTERVAL 4 DAY, 'Mais Que Pan', 42.0312, -7.9766),
(4, 'PM1A20001', 4, NOW() - INTERVAL 3 DAY, 'Mais Que Pan', 42.0312, -7.9766),
(5, 'PM1A20001', 5, NOW() - INTERVAL 2 DAY, 'Mais Que Pan', 42.0312, -7.9766),
(6, 'PM1A20001', 6, NOW() - INTERVAL 1 DAY, 'Mais Que Pan', 42.0312, -7.9766),
(7, 'PM1A20002', 1, NOW() - INTERVAL 6 DAY, 'O Covelo, Lodoselo', 42.0766, -7.59547),
(8, 'PM1A20002', 2, NOW() - INTERVAL 5 DAY, 'O Covelo, Lodoselo', 42.0766, -7.59547),
(9, 'PM1A20002', 3, NOW() - INTERVAL 5 DAY, 'Mais Que Pan', 42.0312, -7.9766),
(10, 'PM1A20002', 4, NOW() - INTERVAL 3 DAY, 'Mais Que Pan', 42.0312, -7.9766),
(11, 'PM1A20002', 5, NOW() - INTERVAL 1 DAY, 'Mais Que Pan', 42.0312, -7.9766),
(12, 'PM1A20002', 6, NOW() - INTERVAL 0 DAY, 'Mais Que Pan', 42.0312, -7.9766),
(13, 'PC1A20001', 7, NOW() - INTERVAL 4 DAY, 'Milucho', 42.2977, -8.60343),
(14, 'PC1A20001', 8, NOW() - INTERVAL 2 DAY, 'Milucho', 42.2977, -8.60343),
(15, 'PC1A20001', 9, NOW() - INTERVAL 3 DAY, 'Milucho', 42.2977, -8.60343),
(16, 'PC1A20001', 10, NOW() - INTERVAL 1 DAY, 'Milucho', 42.2977, -8.60343),
(17, 'PC1A20001', 11, NOW() - INTERVAL 7 DAY, 'Milucho', 42.2977, -8.60343),
(18, 'PC1A20002', 7, NOW() - INTERVAL 5 DAY, 'Milucho', 42.2977, -8.60343),
(19, 'PC1A20002', 8, NOW() - INTERVAL 4 DAY, 'Milucho', 42.2977, -8.60343),
(20, 'PC1A20002', 9, NOW() - INTERVAL 3 DAY, 'Milucho', 42.2977, -8.60343),
(21, 'PC1A20002', 10, NOW() - INTERVAL 2 DAY, 'Milucho', 42.2977, -8.60343),
(22, 'PC1A20002', 11, NOW() - INTERVAL 4 DAY, 'Milucho', 42.2977, -8.60343),
(23, 'PA1A20001', 12, NOW() - INTERVAL 2 DAY, 'Cercedo, Pontevedra', 42.5482, -8.44509),
(24, 'PA1A20001', 13, NOW() - INTERVAL 6 DAY, 'Cercedo, Pontevedra', 42.5482, -8.44509),
(25, 'PA1A20001', 14, NOW() - INTERVAL 7 DAY, 'O Panadeiro, Codeseda', 42.6195, -8.43754),
(26, 'PA1A20001', 15, NOW() - INTERVAL 3 DAY, 'O Panadeiro, Codeseda', 42.6195, -8.43754),
(27, 'PA1A20002', 12, NOW() - INTERVAL 5 DAY, 'Cercedo, Pontevedra', 42.5415, -8.39388),
(28, 'PA1A20002', 13, NOW() - INTERVAL 2 DAY, 'Cercedo, Pontevedra', 42.5415, -8.39388),
(29, 'PA1A20002', 14, NOW() - INTERVAL 4 DAY, 'O Panadeiro, Codeseda', 42.6195, -8.43754),
(30, 'PA1A20002', 15, NOW() - INTERVAL 4 DAY, 'O Panadeiro, Codeseda', 42.6195, -8.43754);

INSERT INTO `TOKENS` (`TOKEN`, `NOME`, `ACTIVO`) VALUES 
('K3287FDHFJAS', 'TELF. PRUEBAS', 1),
('FJ63G54GFD7J', 'TOKEN 2', 0),
('ASFGD67SDUIA', 'FÁBRICA', 1),
('ASDF5234FGSD', 'KEVIN', 0); 
 
