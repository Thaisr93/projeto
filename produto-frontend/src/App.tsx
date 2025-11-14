import { useState, useEffect } from "react";
import FormProduto from "./components/FormProduto";
import ListaProdutos from "./components/ListaProdutos";

export default function App() {
  const API = "https://produto-backend.onrender.com/produtos";

  const [produtos, setProdutos] = useState<any[]>([]);
  const [produtoAtual, setProdutoAtual] = useState<any>(null);

  // Buscar produtos do backend
  const fetchProdutos = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setProdutos(data);
    } catch (err) {
      console.error("Erro ao buscar produtos:", err);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Criar ou atualizar produto
  const handleSubmit = async (produto: any) => {
    try {
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
    } catch (err) {
      console.error("Erro ao salvar produto:", err);
    }
  };

  // Deletar produto
  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      fetchProdutos();
    } catch (err) {
      console.error("Erro ao deletar produto:", err);
    }
  };

  // Editar produto
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
