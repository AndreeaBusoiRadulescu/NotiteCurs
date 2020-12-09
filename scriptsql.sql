IF(DB_ID(N'NotiteCurs') IS NULL)
	CREATE DATABASE NotiteCurs
GO

USE NotiteCurs
GO

IF OBJECT_ID('NotiteCurs') IS NULL
CREATE TABLE Utilizator 
(
	UtilizatorId INT NOT NULL IDENTITY(1,1),
	EmailAddress NVARCHAR(100) NOT NULL,
	Parola NVARCHAR(100) NOT NULL,
	CONSTRAINT PK_Utilizator PRIMARY KEY (UtilizatorId)
)