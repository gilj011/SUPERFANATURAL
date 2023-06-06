-- Active: 1678372440560@@127.0.0.1@3306@aquatech
-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql - banco local - ambiente de desenvolvimento
*/




CREATE DATABASE aquatech;

USE aquatech;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)

);
CREATE table temporadas (
	fkUsuario INT,
	temporadaVista INT
);

alter table temporadas add FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario);



