const express = require('express');
const mongoose = require('mongoose');

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/curriculos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Criar o esquema do currículo
const curriculumSchema = new mongoose.Schema({
    nome: String,
    email: String,
    telefone: String,
    experiencia: String
});

// Criar o modelo do currículo
const Curriculum = mongoose.model('Curriculum', curriculumSchema);

const app = express();
app.use(express.json());

// Rota para salvar um novo currículo
app.post('/curriculos', async (req, res) => {
    try {
        const curriculum = new Curriculum(req.body);
        await curriculum.save();
        res.status(201).send(curriculum);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Rota para obter todos os currículos salvos
app.get('/curriculos', async (req, res) => {
    try {
        const curriculos = await Curriculum.find();
        res.send(curriculos);
    } catch (error) {
        res.status(500).send(error);
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
