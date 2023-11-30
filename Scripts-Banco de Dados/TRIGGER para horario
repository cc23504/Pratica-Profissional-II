CREATE TRIGGER atualizar_horario_inicio
ON ChargerHelp.Pedido
AFTER INSERT
AS
BEGIN
    IF EXISTS (SELECT 1 FROM inserted WHERE status_pedido = 'Aguardando')
    BEGIN
        UPDATE p
        SET horario_inicio = CURRENT_TIMESTAMP
        FROM ChargerHelp.Pedido p
        INNER JOIN inserted i ON p.id_pedido = i.id_pedido
        WHERE p.id_pedido = i.id_pedido;
    END
END;

