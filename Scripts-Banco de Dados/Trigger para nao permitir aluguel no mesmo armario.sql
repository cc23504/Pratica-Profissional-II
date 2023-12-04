CREATE TRIGGER ChargerHelp.ImpedirMaisDeUmAluguel
ON ChargerHelp.Pedido
INSTEAD OF INSERT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @CodCliente INT,
            @StatusPedidoExistente VARCHAR(10);

    SELECT @CodCliente = cod_cliente
    FROM inserted;

    SELECT @StatusPedidoExistente = status_pedido
    FROM ChargerHelp.Pedido
    WHERE cod_cliente = @CodCliente AND (status_pedido = 'Ativo'  or status_pedido = 'Aguardando');

    IF @StatusPedidoExistente IS NOT NULL
    BEGIN
        RAISERROR('Cliente já possui um aluguel ativo.', 16, 1);
    END
    ELSE
    BEGIN
        -- Se não houver aluguel ativo, inserir o novo pedido
        INSERT INTO ChargerHelp.Pedido (cod_cliente, id_armario, status_pedido, horario_inicio, horario_final)
        SELECT cod_cliente, id_armario, status_pedido, horario_inicio, horario_final
        FROM inserted;
    END;
END;
