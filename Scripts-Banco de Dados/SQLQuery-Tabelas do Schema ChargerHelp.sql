schema ChargerHelp 

create table
    ChargerHelp.Cliente (
        cod_cliente INT IDENTITY,
        cpf_cliente VARCHAR(20) NOT NULL,
        nome_cliente varchar(40) NOT NULL,
        telefone_cliente varchar (18) NOT NULL,
        email_cliente varchar(40) NOT NULL,
        senha_cliente varchar(20) NOT NULL,
        CONSTRAINT PK_cliente PRIMARY KEY (cod_cliente)
    )

create table
    ChargerHelp.Carregador(
        cod_carregador INT IDENTITY,
        marca_carregador varchar(15) NOT NULL,
        tipo_carregador varchar(15) NOT NULL,
        CONSTRAINT PK_carregador PRIMARY KEY (cod_carregador)
    )

create table
    ChargerHelp.Armario(
        id_armario INT IDENTITY,
        cod_carregador INT,
        CONSTRAINT PK_armario PRIMARY KEY (id_armario),
        CONSTRAINT FK_Cod_carregador FOREIGN KEY (cod_carregador) REFERENCES ChargerHelp.Carregador(cod_carregador)
    )

create table
    ChargerHelp.Pedido (
        id_pedido INT IDENTITY,
        cod_cliente INT NOT NULL,
        id_armario int NOT NULL,
        status_pedido varchar(10) NOT NULL,
        horario_inicio date NOT NULL,
        horario_final date NULL,
        CONSTRAINT PK_pedido PRIMARY KEY (id_pedido),
        CONSTRAINT FK_cod_cliente FOREIGN KEY (cod_cliente) REFERENCES ChargerHelp.Cliente(cod_cliente),
        CONSTRAINT FK_id_armario FOREIGN KEY (id_armario) REFERENCES ChargerHelp.Armario(id_armario)
    )

