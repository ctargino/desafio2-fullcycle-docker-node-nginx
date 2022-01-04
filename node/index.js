const express = require('express');

const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}
const mysql = require('mysql');
const connection = mysql.createConnection(config);

const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

connection.connect(async (err) => {
  if (err) {
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
})

app.post('/', async (req, res) => {
  const { name } = req.body;

  const insert = `INSERT INTO people(name) VALUES(?)`;
  connection.query(insert, name, async (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(`<h1> ${name} Successfully inserted in database</h1>`);
  })
})

app.get('/', async (req, res) => {
  const list = `SELECT * FROM people`;
  connection.query(list, async (err, results) => {
    const peoples = []
    if (err) {
      console.log(err);
      return;
    }

    if (results.length === 0) {
      res.send(`
      <h1> Full Cycle Rocks! </h1> 
      <h2>No data found</h2> 
      * caso deseje adicionar algum nome, url: POST http://localhost:8080/ BODY: { "name": "Nome" } <br>`)
    } else {

      await results.forEach(async element => {
        return peoples.push(element.name)
      });

      res.send(`
      <h1> Full Cycle Rocks! </h1> 
      <h2> - Lista de nomes cadastrada no banco de dados </h2> 
      <h3> ${peoples.map(people => `<p> ${people}</p>`).join('')} </h3>
      * caso deseje adicionar algum nome, url: POST http://localhost:8080/ adicionando ao BODY: { "name": "Nome" } <br>
      * caso deseje deletar algum nome, url: DELETE http://localhost:8080/:name
    `)
    }
  })
}
);

app.delete('/:name', async (req, res) => {
  const { name } = req.params;

  const deletePeople = `DELETE FROM people WHERE name LIKE ?`;
  connection.query(deletePeople, name, async (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(`<h1> ${name} Successfully deleted from database</h1>`);
  })
})


app.listen(port, () => console.log(`Rodando na porta ${port}!`));