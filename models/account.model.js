const database = require('../database/connection.js')
const Joi = require('joi')

const schema = Joi.object().keys({
  name: Joi.string().required(),
  balance: Joi.number().min(0).required()
})

const accounts = database.get('accounts')

function findAll() {
  return accounts.find()
}

function findById(id) {
  return accounts.findOne({ _id: id})
}

function create(account) {
  const result = schema.validate(account)
  
  if (!result.error) {
    account.created = new Date()
    return accounts.insert(account)
  }

  return Promise.reject(result.error)
}

function deposit(account, value) {
  if (!value || value <= 0) {
    return Promise.reject({message: 'Invalid deposit value.'})
  }
  
  account.balance += value
  return accounts.update(account._id, { $set: { balance: account.balance} })
}

function withdraw(account, value) {
  if (!value || value <= 0) {
    return Promise.reject({message: 'Invalid withdraw value.'})
  }
  
  account.balance -= value
  return accounts.update(account._id, { $set: { balance: account.balance} })
}

function remove(id) {
  if (!id) {
    return Promise.reject({message: 'Invalid id value.'})
  }

  return accounts.remove({_id: id})
}

module.exports = {
  findById,
  findAll,
  create,
  deposit,
  withdraw,
  remove
}
