CREATE TABLE vendas (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        nome_cliente VARCHAR(100),
                        data_venda DATETIME NOT NULL,
                        valor_total DECIMAL(10,2) NOT NULL
);

CREATE TABLE itens_venda (
                             id BIGINT AUTO_INCREMENT PRIMARY KEY,

                             venda_id BIGINT NOT NULL,
                             produto_id BIGINT NOT NULL,

                             quantidade INT NOT NULL,
                             preco_unitario DECIMAL(10,2) NOT NULL,
                             subtotal DECIMAL(10,2) NOT NULL,

                             CONSTRAINT fk_item_venda
                                 FOREIGN KEY (venda_id)
                                     REFERENCES vendas(id),

                             CONSTRAINT fk_item_produto
                                 FOREIGN KEY (produto_id)
                                     REFERENCES produto(id)
);
