import React, { useState, useEffect } from "react";
import FormProduto from "./components/FormProduto";
import ListaProdutos from "./components/ListaProdutos";

type Produto = {
  id?: number;
  nome: string;
  preco: number;
  descricao: string;
  quantidade: number;
};

export default function App() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtoAtual, setProdutoAtual] = useState<Produto | null>(null);

  const fetchProdutos = async () => {
    const res = await fetch("http://localhost:5000/produtos");
    const data = await res.json();
    setProdutos(data);
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const handleSubmit = async (produto: Produto) => {
    if (produtoAtual) {
      await fetch(`http://localhost:5000/produtos/${produtoAtual.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
      });
      setProdutoAtual(null);
    } else {
      await fetch("http://localhost:5000/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
      });
    }
    fetchProdutos();
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:5000/produtos/${id}`, { method: "DELETE" });
    fetchProdutos();
  };

  const handleEdit = (produto: Produto) => setProdutoAtual(produto);

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
