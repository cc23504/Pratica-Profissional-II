CREATE VIEW viewStatusAmario AS
SELECT DISTINCT A.id_armario,
    CASE 
        WHEN P.id_pedido IS NOT NULL AND P.status_pedido = 'Ativo' THEN 'Ocupado'
        WHEN P.id_pedido IS NOT NULL AND P.status_pedido = 'Aguardando' THEN 'Aguardando'
        ELSE 'Livre' 
    END AS status
FROM ChargerHelp.Armario AS A
INNER JOIN ChargerHelp.Carregador AS C ON A.cod_carregador = C.cod_carregador
LEFT OUTER JOIN ChargerHelp.Pedido AS P ON A.id_armario = P.id_armario AND P.status_pedido <> 'Livre'
WHERE A.id_armario IN (1, 2, 3, 4);