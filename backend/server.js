const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const produtosFile = "backend/produtos.json";

// Listar todos os produtos
app.get("/produtos", (req, res) => {
  const produtos = JSON.parse(fs.readFileSync(produtosFile));
  res.json(produtos);
});

// Criar um produto
app.post("/produtos", (req, res) => {
  const produtos = JSON.parse(fs.readFileSync(produtosFile));
  const novoProduto = { id: Date.now(), ...req.body };
  produtos.push(novoProduto);
  fs.writeFileSync(produtosFile, JSON.stringify(produtos, null, 2));
  res.json(novoProduto);
});

// Atualizar produto
app.put("/produtos/:id", (req, res) => {
  const produtos = JSON.parse(fs.readFileSync(produtosFile));
  const index = produtos.findIndex((p) => p.id == req.params.id);
  if (index >= 0) {
    produtos[index] = { id: produtos[index].id, ...req.body };
    fs.writeFileSync(produtosFile, JSON.stringify(produtos, null, 2));
    res.json(produtos[index]);
  } else {
    res.status(404).json({ error: "Produto não encontrado" });
  }
});

// Deletar produto
app.delete("/produtos/:id", (req, res) => {
  let produtos = JSON.parse(fs.readFileSync(produtosFile));
  produtos = produtos.filter((p) => p.id != req.params.id);
  fs.writeFileSync(produtosFile, JSON.stringify(produtos, null, 2));
  res.json({ success: true });
});

app.listen(5000, () => console.log("Backend rodando na porta 5000"));
