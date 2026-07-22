CREATE TABLE produto (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         nome VARCHAR(100) NOT NULL,
                         preco DECIMAL(10,2) NOT NULL,
                         quantidade_estoque INT NOT NULL,
                         ativo BOOLEAN NOT NULL DEFAULT TRUE
);