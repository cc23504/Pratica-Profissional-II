create schema Carregaytor

create table Carregaytor.Cliente (
	id_usuario INT IDENTITY,
	cpf_usuario INT NOT NULL,
	nome_usuario varchar(40) NOT NULL,
	telefone_usuario char(12) NOT NULL,
	email_usuario varchar(40) NOT NULL,
	senha_usuario varchar(20) NOT NULL,
	CONSTRAINT PK_Usuario PRIMARY KEY (id_usuario)
)

create table Carregaytor.Carregadores(
	cod_prod INT IDENTITY,
	marca_prod varchar(15) NOT NULL,
	tipo_prod varchar(15) NOT NULL,
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
    id_usuario int NOT NULL,
    id_lock int NOT NULL,
	status_pedido char(5) NOT NULL,
	horario_inicio date NOT NULL,
	horario_final date NOT NULL,
    CONSTRAINT PK_pedido PRIMARY KEY (id_pedido),
    CONSTRAINT FK_id_usuario FOREIGN KEY (id_usuario)
	    REFERENCES Carregaytor.Cliente(id_usuario),
    CONSTRAINT FK_id_lock FOREIGN KEY (id_lock)
	    REFERENCES Carregaytor.Armario(id_lock)
)