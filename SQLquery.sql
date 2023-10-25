create schema ChargerHelp

create table ChargerHelp.Cliente (
	cpf_cliente int IDENTITY ,
	nome_cliente varchar(40) NOT NULL,
	telefone_cliente char(12) NOT NULL,
	email_cliente varchar(40) NOT NULL,
	senha_cliente varchar(20) NOT NULL,
	CONSTRAINT PK_cliente PRIMARY KEY (cpf_cliente)
)

create table ChargerHelp.Carregador(
	cod_carregador INT IDENTITY,
	marca_carregador varchar(15) NOT NULL,
	tipo_carregador varchar(15) NOT NULL,
	CONSTRAINT PK_carregador PRIMARY KEY (cod_carregador)
)

create table ChargerHelp.Armario(
	id_armario INT IDENTITY,
	cod_carregador INT,
	CONSTRAINT PK_armario PRIMARY KEY (id_armario), 
	CONSTRAINT FK_Cod_carregador FOREIGN KEY (cod_carregador)
	REFERENCES ChargerHelp.Carregador(cod_carregador)
)

create table ChargerHelp.Pedido (
    id_pedido INT IDENTITY,
    cpf_cliente int NOT NULL,
    id_armario int NOT NULL,
	status_pedido varchar(10) NOT NULL,
	horario_inicio date NOT NULL,
	horario_final date NOT NULL,
    CONSTRAINT PK_pedido PRIMARY KEY (id_pedido),
    CONSTRAINT FK_cpf_cliente FOREIGN KEY (cpf_cliente)
	    REFERENCES ChargerHelp.Cliente(cpf_cliente),
    CONSTRAINT FK_id_armario FOREIGN KEY (id_armario)
	    REFERENCES ChargerHelp.Armario(id_armario)
)