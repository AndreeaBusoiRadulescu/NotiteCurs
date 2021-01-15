IF(DB_ID(N'NotiteCurs') IS NULL)
	CREATE DATABASE NotiteCurs
GO

USE NotiteCurs
GO

IF OBJECT_ID('Utilizator') IS NULL
CREATE TABLE Utilizator 
(
	UtilizatorId INT NOT NULL IDENTITY(1,1),
	EmailAddress NVARCHAR(100) NOT NULL,
	Parola NVARCHAR(100) NOT NULL,
	CONSTRAINT PK_Utilizator PRIMARY KEY (UtilizatorId)
)
GO


IF OBJECT_ID('Notita') IS NULL
CREATE TABLE Notita 
(
	IdNotita INT NOT NULL IDENTITY(1,1),
	Materie NVARCHAR(100) NOT NULL,
	UtilizatorId INT NOT NULL,
	Continut NVARCHAR(100) NOT NULL,
	DataNotita DATE,
	CONSTRAINT PK_Notita PRIMARY KEY (IdNotita)
)
GO

IF OBJECT_ID('FK_Notita_Utilizator')IS NULL
   ALTER TABLE Notita ADD CONSTRAINT FK_Notita_Utilizator FOREIGN KEY (UtilizatorId) REFERENCES Utilizator(UtilizatorId)
GO

IF OBJECT_ID('Atasament') IS NULL
CREATE TABLE Atasament
(
	IdAtasament INT NOT NULL IDENTITY(1,1),
	IdNotita INT NOT NULL,
	SursaAtasament NVARCHAR(200) NOT NULL,
	CONSTRAINT PK_Atasament PRIMARY KEY (IdAtasament)
)
GO

IF OBJECT_ID('FK_Atasament_Notita')IS NULL
   ALTER TABLE Atasament ADD CONSTRAINT FK_Atasament_Notita FOREIGN KEY (IdNotita) REFERENCES Notita(IdNotita)
GO
