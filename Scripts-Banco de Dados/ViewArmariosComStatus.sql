CREATE VIEW ViewArmariosComStatus AS
SELECT DISTINCT
    A.id_armario,
    C.marca_carregador,
    C.tipo_carregador,
    CASE
        WHEN P.id_pedido IS NOT NULL THEN 'Ocupado'
        ELSE 'Livre'
    END AS status
FROM ChargerHelp.Armario AS A
    INNER JOIN ChargerHelp.Carregador AS C ON A.cod_carregador = C.cod_carregador
    LEFT OUTER JOIN ChargerHelp.Pedido AS P ON A.id_armario = P.id_armario AND P.status_pedido <> 'Livre'