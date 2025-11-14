import React, { useState, useEffect } from "react";

type Produto = {
  id?: number;
  nome: string;
  preco: number;
  descricao: string;
  quantidade: number;
};

type FormProdutoProps = {
  onSubmit: (produto: Produto) => void;
  produtoAtual: Produto | null;
};

export default function FormProduto({
  onSubmit,
  produtoAtual,
}: FormProdutoProps) {
  const [nome, setNome] = useState<string>("");
  const [preco, setPreco] = useState<number>(0);
  const [descricao, setDescricao] = useState<string>("");
  const [quantidade, setQuantidade] = useState<number>(0);

  useEffect(() => {
    if (produtoAtual) {
      setNome(produtoAtual.nome);
      setPreco(produtoAtual.preco);
      setDescricao(produtoAtual.descricao);
      setQuantidade(produtoAtual.quantidade);
    } else {
      setNome("");
      setPreco(0);
      setDescricao("");
      setQuantidade(0);
    }
  }, [produtoAtual]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nome, preco, descricao, quantidade });
    setNome("");
    setPreco(0);
    setDescricao("");
    setQuantidade(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome"
      />
      <input
        type="number"
        value={preco}
        onChange={(e) => setPreco(Number(e.target.value))}
        placeholder="Preço"
      />
      <input
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        placeholder="Descrição"
      />
      <input
        type="number"
        value={quantidade}
        onChange={(e) => setQuantidade(Number(e.target.value))}
        placeholder="Quantidade"
      />
      <button type="submit">Salvar</button>
    </form>
  );
}
