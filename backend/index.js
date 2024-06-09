const connect = require('./database');
const express = require('express');
const cors = require('cors');
const app = express()
const port = 3001

connect();
app.use(cors());
app.use(express.json())
app.use('/api/auth', require('./routes/authentication'))
app.use('/api/notes', require('./routes/noteservice'))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})