### Encurtador de URL

Tecnologias utilizadas:   
```
- Node 18
- Express
- ShortID
- MongoDB (mongoose)
```

Iniciar:   
```
npm i
nodemon app.js
```

---

#### Endpoints:   

*POST*   
```
http://localhsot:5000/encurtar

ex_json_body: {
  "longUrl": "URL QUE DESEJA ENCURTAR"
}
```
*GET*
```
http://localhsot:5000/${CODIGO DA URL}

CODIGO DA URL: coluna 'urlCode' da url que você ja encurtou antes.
```
---

#### Observacao

Como o app usa mongo, tem que ter o mongod instalado na maquina e o mesmo deve estar executando para que o banco possa ser criada.

A porta do mongo deve ser 27017. Não é preciso criar o banco antes de subi o projeto.

URL de conexão ao banco 'mongodb://localhost:27017/urlshortener'