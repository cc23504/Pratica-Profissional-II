-- OS CÓDIGOS ABAIXO SÃO DESTINADOS A VERIFICAÇÃO MANUAL DE DUPLICAÇÕES NO BANCO DE DADOS

SELECT cpf_cliente, COUNT(*) AS quantidade
FROM ChargerHelp.Cliente
GROUP BY cpf_cliente
HAVING COUNT(*) > 1;

SELECT email_cliente, COUNT(*) AS quantidade
FROM ChargerHelp.Cliente
GROUP BY email_cliente
HAVING COUNT(*) > 1;

SELECT telefone_cliente, COUNT(*) AS quantidade
FROM ChargerHelp.Cliente
GROUP BY telefone_cliente
HAVING COUNT(*) > 1;

-- OS CÓDIGOS ABAIXO SÃO DESTINADOS A EXCLUSÃO MANUAL DE DUPLICAÇÕES NO BANCO DE DADOS


DELETE FROM ChargerHelp.Cliente
WHERE cod_cliente NOT IN (
    SELECT MIN(cod_cliente)
    FROM ChargerHelp.Cliente
    GROUP BY email_cliente
);

-- TRANSFORMANDO AS CHAVES EM UNICAS 

ALTER TABLE ChargerHelp.Cliente
ADD CONSTRAINT UK_CPF UNIQUE (cpf_cliente);

ALTER TABLE ChargerHelp.Cliente
ADD CONSTRAINT UK_Email UNIQUE (email_cliente);

ALTER TABLE ChargerHelp.Cliente
ADD CONSTRAINT UK_Telefone UNIQUE (telefone_cliente);

-- VISUALIZAR CHAVES ÚNICAS

EXEC sp_helpindex 'ChargerHelp.Cliente';
