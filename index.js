const express = require('express')
const morgan = require('morgan')
const account = require('./models/account.model')

const app = express()
const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.json({
    message: 'My bank API - by: Lana Schuster.'
  })
})

app.get('/accounts', (req, res) => {
  account.findAll()
    .then(accounts => {
      res.status(201).json(accounts)
    }).catch(error => {
      res.status(400).json(error) 
    }) 
})

app.get('/accounts/:id', (req, res) => {
  account.findById(req.params.id)
    .then(accounts => {
      res.status(201).json(accounts)
    }).catch(error => {
      res.status(400).json(error) 
    }) 
})


app.post('/accounts', (req, res) => {
  account.create(req.body)
    .then(account => {
      res.status(201).json(account)
    }).catch(error => {
      res.status(400).json(error) 
    }) 
})

app.patch('/accounts/deposit', (req, res) => {
  const { id, value } = req.body
  account.findById(id)
    .then(found => {
      account.deposit(found, value)
        .then(updatedAccount => {
          res.status(200).json(updatedAccount)
        }).catch(error => {
          res.status(400).json(error) 
        }) 
    }).catch(error => {
      res.status(400).json(error) 
    })
})

app.patch('/accounts/withdraw', (req, res) => {
  const { id, value } = req.body
  account.findById(id)
    .then(found => {
      account.withdraw(found, value)
        .then(updatedAccount => {
          res.status(200).json(updatedAccount)
        }).catch(error => {
          res.status(400).json(error) 
        }) 
    }).catch(error => {
      res.status(400).json(error) 
    })
})

app.delete('/accounts/:id', (req, res) => {
  account.findById(req.params.id)
    .then(found => {
      account.remove(found._id)
        .then(updatedAccount => {
          res.status(200).json(updatedAccount)
        }).catch(error => {
          res.status(400).json(error) 
        }) 
    }).catch(error => {
      res.status(400).json(error) 
    })
})


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
 