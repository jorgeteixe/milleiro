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