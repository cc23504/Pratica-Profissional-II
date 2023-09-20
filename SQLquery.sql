create schema Carregaytor

create table Carregaytor.Cliente (
	id_usuario INT IDENTITY,
	nome_usuario NOT NULL,
	telefone_usuario NOT NULL,
	email_usuario NOT NULL,
	CONSTRAINT PK_Usuario PRIMARY KEY (id_usuario)
)

create table Carregaytor.Carregadores(
	cod_prod INT INDENTITY,
	marca_prod NOT NULL,
	tipo_prod NOT NULL,
	CONSTRAINT PK_Prod PRIMARY KEY (cod_prod)
)

create table Carregaytor.Armario(
	id_lock INT IDENTITY,
	cod_prod INT,
	CONSTRAINT PK_Lock PRIMARY KEY (id_lock), 
	CONSTRAINT FK_Cod_prod FOREIGN KEY (cod_prod)
	REFERENCES Carregaytor.Carregadores(cod_prod)

)

create table Carregaytor.Pedido (
    id_pedido INT IDENTITY,
    id_usuario NOT NULL,
    id_lock NOT NULL,
    CONSTRAINT PK_pedido PRIMARY KEY (id_pedido),
    CONSTRAINT FK_id_usuario FOREIGN KEY (id_usuario)
	    REFERENCES Carregaytor.Cliente(id_usuario),
    CONSTRAINT FK_id_lock FOREIGN KEY (id_lock)
	    REFERENCES Carregaytor.Armario(id_lock)
)