-- CÓDIGO ATUALIZADO PARA VERIFICAR A DUPLICAÇÃO DE CPF, EMAIL E TELEFONE NO BANCO DE DADOS

CREATE PROCEDURE ChargerHelp.InserirCliente
    @NomeCliente VARCHAR(40),
    @CPFCliente VARCHAR(20),
    @TelefoneCliente VARCHAR(18),
    @EmailCliente VARCHAR(40),
    @SenhaCliente VARCHAR(20)
AS
BEGIN
    --DECLARE @vCodCliente INT;
    DECLARE @vExisteCPF INT;
    DECLARE @vExisteEmail INT;
    DECLARE @vExisteTelefone INT;

    SELECT @vExisteCPF = COUNT(*) FROM ChargerHelp.Cliente WHERE cpf_cliente = @CPFCliente;

    SELECT @vExisteEmail = COUNT(*) FROM ChargerHelp.Cliente WHERE email_cliente = @EmailCliente;

    SELECT @vExisteTelefone = COUNT(*) FROM ChargerHelp.Cliente WHERE telefone_cliente = @TelefoneCliente;

    IF @vExisteCPF > 0
    BEGIN
        RAISERROR( 'CPF já existe! Cadastro não realizado',16 ,1 );
    END
    ELSE IF @vExisteEmail > 0
    BEGIN
        RAISERROR('E-mail já existe! Cadastro não realizado' ,16 ,1);
    END
    ELSE IF @vExisteTelefone > 0
    BEGIN
        RAISERROR('Telefone já existe! Cadastro não realizado',16 ,1);
    END
    ELSE 
    BEGIN
       -- SELECT @vCodCliente = ISNULL(MAX(cod_cliente), 0) + 1 FROM ChargerHelp.Cliente;

        INSERT INTO ChargerHelp.Cliente (cpf_cliente, nome_cliente, telefone_cliente, email_cliente, senha_cliente)
        VALUES (@CPFCliente, @NomeCliente, @TelefoneCliente, @EmailCliente, @SenhaCliente);

        SELECT @@IDENTITY AS retorno;
    END
END;
GO

