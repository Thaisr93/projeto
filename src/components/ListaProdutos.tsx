import React from "react";

type Produto = {
  id?: number;
  nome: string;
  preco: number;
  descricao: string;
  quantidade: number;
};

type ListaProdutosProps = {
  produtos: Produto[];
  onDelete: (id: number) => void;
  onEdit: (produto: Produto) => void;
};

export default function ListaProdutos({
  produtos,
  onDelete,
  onEdit,
}: ListaProdutosProps) {
  return (
    <ul>
      {produtos.map((p) => (
        <li key={p.id}>
          {p.nome} - R$ {p.preco} - {p.descricao} - {p.quantidade} unidades
          <button onClick={() => onEdit(p)}>Editar</button>
          <button onClick={() => p.id && onDelete(p.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
}
