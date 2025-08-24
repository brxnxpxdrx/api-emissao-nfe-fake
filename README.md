# 🧾 Fake NF-e API / PDV

Uma API simulada para **emissão, consulta, inutilização e cancelamento de notas fiscais**. Ideal para testes de PDV sem necessidade de integração real com a SEFAZ.

---

## 🛠 Stack
- ⚡ **Node.js**
- 💙 **TypeScript**
- 🌐 **Express**
- 📝 **JSON como armazenamento local em memória**

---

## 🚀 Base URL
http://localhost:3000



---

## 🗂 Estrutura de Dados

### **Nota**
```json
{
  "chaveAcesso": "string",
  "emitente": { "nome": "string", "cnpj": "string" },
  "destinatario": { "nome": "string", "cpf": "string" },
  "itens": [
    { "descricao": "string", "quantidade": "number", "valorUnitario": "number" }
  ],
  "status": "Autorizada | Cancelada",
  "protocolo": "string",
  "data": "ISO Date String",
  "justificativaCancelamento": "string (opcional)",
  "dataCancelamento": "ISO Date String (opcional)"
}
### **InutilizaçãoInutilização**
{
  "idInutilizacao": "string",
  "emitente": { "nome": "string", "cnpj": "string" },
  "serie": "string",
  "numeroInicial": "number",
  "numeroFinal": "number",
  "justificativa": "string",
  "status": "Inutilizada",
  "data": "ISO Date String"
}

📝 Endpoints
1️⃣ Emitir Nota

URL: /emitir-notas

Método: POST

Descrição: Cria uma nova nota fiscal simulada.

Request Body:

{
  "emitente": { "nome": "Loja X", "cnpj": "12345678000199" },
  "destinatario": { "nome": "Cliente Y", "cpf": "12345678901" },
  "itens": [
    { "descricao": "Produto A", "quantidade": 2, "valorUnitario": 10.5 }
  ]
}


Response 201:

{
  "chaveAcesso": "abcd1234efgh5678",
  "emitente": { "nome": "Loja X", "cnpj": "12345678000199" },
  "destinatario": { "nome": "Cliente Y", "cpf": "12345678901" },
  "itens": [ { "descricao": "Produto A", "quantidade": 2, "valorUnitario": 10.5 } ],
  "status": "Autorizada",
  "protocolo": "000123456",
  "data": "2025-08-24T20:00:00.000Z"
}


Response 400: Dados incompletos ou inválidos.

2️⃣ Consultar Nota

URL: /consultar-nota/:chaveAcesso

Método: GET

Descrição: Retorna a nota correspondente à chaveAcesso.

Response 200:

{
  "chaveAcesso": "abcd1234efgh5678",
  "emitente": { "nome": "Loja X", "cnpj": "12345678000199" },
  "destinatario": { "nome": "Cliente Y", "cpf": "12345678901" },
  "itens": [ { "descricao": "Produto A", "quantidade": 2, "valorUnitario": 10.5 } ],
  "status": "Autorizada",
  "protocolo": "000123456",
  "data": "2025-08-24T20:00:00.000Z"
}


Response 404: Nota não encontrada.

3️⃣ Inutilizar Nota

URL: /inutilizar-nota

Método: POST

Descrição: Marca um intervalo de números de nota como inutilizado.

Request Body:

{
  "emitente": { "nome": "Loja X", "cnpj": "12345678000199" },
  "serie": "1",
  "numeroInicial": 10,
  "numeroFinal": 15,
  "justificativa": "Erro de emissão"
}


Response 201:

{
  "idInutilizacao": "abcd1234efgh5678",
  "emitente": { "nome": "Loja X", "cnpj": "12345678000199" },
  "serie": "1",
  "numeroInicial": 10,
  "numeroFinal": 15,
  "justificativa": "Erro de emissão",
  "status": "Inutilizada",
  "data": "2025-08-24T20:00:00.000Z"
}


Response 400: Dados incompletos ou inválidos.

4️⃣ Cancelar Nota

URL: /cancelar-nota

Método: POST

Descrição: Cancela uma nota existente.

Request Body:

{
  "chaveAcesso": "abcd1234efgh5678",
  "justificativa": "Erro de emissão"
}


Response 200:

{
  "chaveAcesso": "abcd1234efgh5678",
  "emitente": { "nome": "Loja X", "cnpj": "12345678000199" },
  "destinatario": { "nome": "Cliente Y", "cpf": "12345678901" },
  "itens": [ { "descricao": "Produto A", "quantidade": 2, "valorUnitario": 10.5 } ],
  "status": "Cancelada",
  "protocolo": "000123456",
  "data": "2025-08-24T20:00:00.000Z",
  "justificativaCancelamento": "Erro de emissão",
  "dataCancelamento": "2025-08-24T20:05:00.000Z"
}


Response 400: Dados incompletos ou nota já cancelada.

Response 404: Nota não encontrada.

⚠️ Observações

Todos os dados são armazenados em memória. Ao reiniciar o servidor, tudo será perdido.

Este mock simula o comportamento da SEFAZ para testes de PDV.

chaveAcesso e idInutilizacao são gerados aleatoriamente.

Ideal para desenvolvimento local antes de integrar com a SEFAZ real.

💻 Como rodar
npm install
npm run dev


Servidor disponível em: http://localhost:3000


---


