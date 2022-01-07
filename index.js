const express = require('express');
const cors = require('cors')
const routerApi = require('./routes')

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/errorHandlers')

const app = express();
const port = 8000;

//middle de express para recibir datos de un post
app.use(express.json());

const whitelist = [] //Dentro del array podemos incluir los dominios desde los cuales sí se puede recibir solicitudes.
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin)){
      callback(null, true)
    } else {
      callback(new Error('No permitido'))
    }
  }
}
app.use(cors(options))

app.get('/', (req, res) => {
  res.send('Hola mi server en express')
})

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola soy un nuevo endpoint')
})

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log('Mi port' + port)
})

