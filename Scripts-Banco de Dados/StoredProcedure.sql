CREATE PROCEDURE InserirCliente
    @NomeCliente VARCHAR(40),
    @CPFCliente VARCHAR(20),
    @TelefoneCliente VARCHAR(18),
    @EmailCliente VARCHAR(40),
    @SenhaCliente VARCHAR(20)
AS
BEGIN
    DECLARE @vCodCliente INT;
    DECLARE @vExisteCPF INT;
    DECLARE @vExisteEmail INT;


    SELECT @vExisteCPF = COUNT(*) FROM ChargerHelp.Cliente WHERE cpf_cliente = @CPFCliente;


    SELECT @vExisteEmail = COUNT(*) FROM ChargerHelp.Cliente WHERE email_cliente = @EmailCliente;


    IF @vExisteCPF > 0
    BEGIN
        SELECT 'CPF já existe! Cadastro não realizado' AS retorno;
    END
 
    ELSE IF @vExisteEmail > 0
    BEGIN
        SELECT 'E-mail já existe! Cadastro não realizado' AS retorno;
    END
    ELSE 
    BEGIN
     
        SELECT @vCodCliente = ISNULL(MAX(cod_cliente), 0) + 1 FROM ChargerHelp.Cliente;

        INSERT INTO ChargerHelp.Cliente (cod_cliente, cpf_cliente, nome_cliente, telefone_cliente, email_cliente, senha_cliente)
        VALUES (@vCodCliente, @CPFCliente, @NomeCliente, @TelefoneCliente, @EmailCliente, @SenhaCliente);

    
        SELECT @vCodCliente AS retorno;
    END
END;
GO