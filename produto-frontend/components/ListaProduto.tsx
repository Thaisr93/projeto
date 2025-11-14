interface ListaProdutosProps {
  produtos: any[];
  onDelete: (id: number) => void;
  onEdit: (produto: any) => void;
}

export default function ListaProdutos({
  produtos,
  onDelete,
  onEdit,
}: ListaProdutosProps) {
  return (
    <ul>
      {produtos.map((p) => (
        <li key={p.id}>
          {p.nome} - R$ {p.preco}
          <button onClick={() => onEdit(p)}>Editar</button>
          <button onClick={() => onDelete(p.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
}
