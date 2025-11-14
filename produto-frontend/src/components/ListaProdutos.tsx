interface Produto {
  id?: number;
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
      <table border={1} cellPadding={5}>
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
          {produtos.map((produto, index) => (
            <tr key={index}>
              <td>{produto.nome}</td>
              <td>{produto.preco}</td>
              <td>{produto.descricao}</td>
              <td>{produto.quantidade}</td>
              <td>
                <button onClick={() => onEdit(produto)}>Editar</button>
                <button onClick={() => produto.id && onDelete(produto.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
