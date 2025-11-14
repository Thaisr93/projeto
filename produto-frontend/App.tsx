import React, { useState, useEffect } from "react";
import FormProduto from "./components/FormProduto";
import ListaProdutos from "./components/ListaProduto";

export default function App() {
  // Estado que guarda todos os produtos
  const [produtos, setProdutos] = useState<any[]>([]);

  // Estado que guarda o produto que está sendo editado
  const [produtoAtual, setProdutoAtual] = useState<any>(null);

  // URL do backend hospedado
  const API = "https://produto-backend.onrender.com/produtos";

  // Função para buscar todos os produtos do backend
  const fetchProdutos = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // Chama fetchProdutos quando o componente monta
  useEffect(() => {
    fetchProdutos();
  }, []);

  // Função para criar ou atualizar um produto
  const handleSubmit = async (produto: any) => {
    try {
      if (produtoAtual) {
        // Atualiza
        await fetch(`${API}/${produtoAtual.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(produto),
        });
        setProdutoAtual(null);
      } else {
        // Cria
        await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(produto),
        });
      }
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao enviar produto:", error);
    }
  };

  // Função para deletar produto
  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      fetchProdutos();
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  // Função para editar produto
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
