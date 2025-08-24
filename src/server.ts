import express from 'express';

const app = express();
app.use(express.json());

const notas: Record<string, any> = {};
const inutilizados: Record<string, any> = {};

app.post('/emitir-notas',  (req, res) => {
  const { emitente, destinatario, itens } = req.body;
    if (!emitente || !destinatario || !itens || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ error: 'Dados incompletos ou inválidos' });
    }

    const chaveAcesso = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const nota = {
        chaveAcesso,
        emitente,
        destinatario,
        itens,
        status:"Autorizada",
        protocolo: Math.floor(Math.random() * 1000000000).toString().padStart(9, '0'),
        data : new Date().toISOString()
    };
    notas[chaveAcesso] = notas;
    res.status(201).json(notas);


}
);


app.get('/consultar-nota/:chaveAcesso', (req, res) => {
  const { chaveAcesso } = req.params;   
    const nota = notas[chaveAcesso];

    if (!nota) {
      return res.status(404).json({ error: 'Nota não encontrada' });
    }   
    res.json(nota);
}
);

app.post('/inutilizar-nota', (req, res) => {    
    const { emitente, serie, numeroInicial, numeroFinal, justificativa } = req.body;   
        if (!emitente || !serie || !numeroInicial || !numeroFinal || !justificativa) {
        return res.status(400).json({ error: 'Dados incompletos ou inválidos' });
        }   
        const idInutilizacao = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const inutilizacao = {
            idInutilizacao,
            emitente,
            serie,
            numeroInicial,
            numeroFinal,
            justificativa,
            status:"Inutilizada",
            data : new Date().toISOString()
        };
        inutilizados[idInutilizacao] = inutilizacao;
        res.status(201).json(inutilizacao);
    });

    app.post('/cancelar-nota', (req, res) => {
        const { chaveAcesso, justificativa } = req.body;
        if (!chaveAcesso || !justificativa) {
            return res.status(400).json({ error: 'Dados incompletos ou inválidos' });
        }
        const nota = notas[chaveAcesso];
        if (!nota) {
            return res.status(404).json({ error: 'Nota não encontrada' });
        }   
        if (nota.status === 'Cancelada') {
            return res.status(400).json({ error: 'Nota já está cancelada' });
        }
        nota.status = 'Cancelada';
        nota.justificativaCancelamento = justificativa; 
        nota.dataCancelamento = new Date().toISOString();
        res.json(nota);
    }
    );
    

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
}       );