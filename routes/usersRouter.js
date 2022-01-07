const express = require('express');

const router = express.Router()

//parametros tipo query
router.get('/', (req, res) => {
  const { limit, offset } = req.query;
  if(limit && offset){
    res.json({
      limit,
      offset
    })
  }else{
    res.send('No hay parametros')
  }
})
//http://localhost:8000/users?limit=10&offset=100

module.exports = router