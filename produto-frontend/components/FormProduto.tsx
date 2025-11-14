import React, { useState, useEffect } from "react";

interface FormProdutoProps {
  onSubmit: (produto: any) => void;
  produtoAtual: any;
}

export default function FormProduto({
  onSubmit,
  produtoAtual,
}: FormProdutoProps) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  useEffect(() => {
    if (produtoAtual) {
      setNome(produtoAtual.nome);
      setPreco(produtoAtual.preco);
    } else {
      setNome("");
      setPreco("");
    }
  }, [produtoAtual]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nome, preco });
    setNome("");
    setPreco("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

      <input
        type="number"
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
      />

      <button type="submit">{produtoAtual ? "Atualizar" : "Adicionar"}</button>
    </form>
  );
}
