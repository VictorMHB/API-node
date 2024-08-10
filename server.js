const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/consulta-cep/:cep', async (req, res) => {
    const cep = req.params.cep; //Obtendo o CEP da URL

    if(cepRegex.test(cep)){
        try{
            //Fazendo a requisição para a API do ViaCEP
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            res.json(response.data) //Retorna os dados da resposta
        } catch (error){
            console.error('Erro na requisição: ', error);
            res.status(500).send('Erro ao consultar CEP');
        }
    } else{
        res.status(400).send('CEP Inválido. Formato: XXXXX-XXX');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});