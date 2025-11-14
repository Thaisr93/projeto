import { useState, useEffect } from "react";
import FormProduto from "./components/FormProduto";
import ListaProdutos from "./components/ListaProdutos";

export default function App() {
  // Estado que guarda todos os produtos
  const [produtos, setProdutos] = useState<any[]>([]);

  // Estado que guarda o produto que está sendo editado
  const [produtoAtual, setProdutoAtual] = useState<any>(null);

  // Função para buscar todos os produtos do backend
  const fetchProdutos = async () => {
    const res = await fetch("https://v5trt7-5000.csb.app/produtos");
    const data = await res.json();
    setProdutos(data);
  };

  // Chama fetchProdutos quando o componente monta
  useEffect(() => {
    fetchProdutos();
  }, []);

  // Função para criar ou atualizar um produto
  const API = "https://v5trt7-5000.csb.app/produtos";

  const handleSubmit = async (produto: any) => {
    if (produtoAtual) {
      // Atualiza
      await fetch(`"https://v5trt7-5000.csb.app/produtos"${produtoAtual.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
      });
      setProdutoAtual(null);
    } else {
      // Cria
      await fetch("https://v5trt7-5000.csb.app/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produto),
      });
    }
    fetchProdutos();
    const res = await fetch(API);
  };

  // Função para deletar produto
  const handleDelete = async (id: number) => {
    await fetch(`"https://v5trt7-5000.csb.app/produtos"${id}`, {
      method: "DELETE",
    });
    fetchProdutos();
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
