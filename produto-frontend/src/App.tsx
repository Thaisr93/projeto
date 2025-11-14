import { useState, useEffect } from "react";
import FormProduto from "./components/FormProduto";
import ListaProdutos from "./components/ListaProdutos";

export default function App() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [produtoAtual, setProdutoAtual] = useState<any>(null);

  const API = "https://produto-backend.onrender.com/produtos";

  // Buscar produtos
  const fetchProdutos = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setProdutos(data);
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Criar ou atualizar produto
  const handleSubmit = async (produto: any) => {
    if (produtoAtual) {
      // Atualizar
      await fetch(`${API}/${produtoAtual.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
      });
      setProdutoAtual(null);
    } else {
      // Criar
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
      });
    }

    fetchProdutos();
  };

  // Deletar produto
  const handleDelete = async (id: number) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    fetchProdutos();
  };

  const handleEdit = (produto: any) => setProdutoAtual(produto);

  return (
    <div>
      <h1>CRUD de Produtos</h1>
      <FormProduto onSubmit={handleSubmit} produtoAtual={produtoAtual} />
      <ListaProdutos
        produtos={produtos}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}
