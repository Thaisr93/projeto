import { useState, useEffect } from "react";

interface Produto {
  nome: string;
  preco: number;
  descricao: string;
  quantidade: number;
}

interface FormProdutoProps {
  onSubmit: (produto: Produto) => void;
  produtoAtual: Produto | null;
}

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
      <h2>{produtoAtual ? "Editar Produto" : "Novo Produto"}</h2>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Preço"
        value={preco}
        onChange={(e) => setPreco(Number(e.target.value))}
        required
      />
      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(Number(e.target.value))}
        required
      />
      <button type="submit">{produtoAtual ? "Atualizar" : "Cadastrar"}</button>
    </form>
  );
}
