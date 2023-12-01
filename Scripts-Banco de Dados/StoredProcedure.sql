-- CÓDIGO ATUALIZADO PARA VERIFICAR A DUPLICAÇÃO DE CPF, EMAIL E TELEFONE NO BANCO DE DADOS

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
    DECLARE @vExisteTelefone INT;

    SELECT @vExisteCPF = COUNT(*) FROM ChargerHelp.Cliente WHERE cpf_cliente = @CPFCliente;

    SELECT @vExisteEmail = COUNT(*) FROM ChargerHelp.Cliente WHERE email_cliente = @EmailCliente;

    SELECT @vExisteTelefone = COUNT(*) FROM ChargerHelp.Cliente WHERE telefone_cliente = @TelefoneCliente;

    IF @vExisteCPF > 0
    BEGIN
        SELECT 'CPF já existe! Cadastro não realizado' AS retorno;
    END
    ELSE IF @vExisteEmail > 0
    BEGIN
        SELECT 'E-mail já existe! Cadastro não realizado' AS retorno;
    END
    ELSE IF @vExisteTelefone > 0
    BEGIN
        SELECT 'Telefone já existe! Cadastro não realizado' AS retorno;
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

-- ************* VERIFICAÇÃO DA STORED PROCEDURE ****************** 
-- (MOSTRAR O DUNCIONAMENTO PARA O PROFESSOR NA APRESENTAÇÃO)

-- COLOCAR OS DADOS DE UM CLIENTE JÁ INSERIDO NO BANCO DE DADOS E TAMBÉM DE UM NOVO CLIENTE

-- DECLARE @retorno INT;

-- -- Teste de inserção de um novo cliente
-- EXEC InserirCliente 
--     @NomeCliente = 'NOME',
--     @CPFCliente = 'CPF',
--     @TelefoneCliente = 'TELEFONE', 
--     @EmailCliente = 'EMAIL', 
--     @SenhaCliente = 'SENHA';

-- -- Captura do valor retornado pela stored procedure
-- SELECT @retorno = SCOPE_IDENTITY();

-- -- Exibição do resultado do teste
-- IF @retorno IS NOT NULL AND @retorno > 0
--     PRINT 'Novo cliente inserido com sucesso! Código do cliente: ' + CAST(@retorno AS VARCHAR(10));
-- ELSE
--     PRINT 'Erro ao inserir o cliente.';
