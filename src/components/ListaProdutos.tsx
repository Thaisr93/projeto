import React from "react";

interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  quantidade: number;
}

interface ListaProdutosProps {
  produtos: Produto[];
  onDelete: (id: number) => void;
  onEdit: (produto: Produto) => void;
}

export default function ListaProdutos({
  produtos,
  onDelete,
  onEdit,
}: ListaProdutosProps) {
  return (
    <div>
      <h2>Lista de Produtos</h2>
      {produtos.length === 0 ? (
        <p>Nenhum produto cadastrado</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.preco}</td>
                <td>{p.descricao}</td>
                <td>{p.quantidade}</td>
                <td>
                  <button onClick={() => onEdit(p)}>Editar</button>
                  <button onClick={() => onDelete(p.id!)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
