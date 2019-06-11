'use strict'

const router = require('express').Router()
const {
  createTransaction,
  jwtAuth,
  handleRole,
  handleImage
} = require('../middleware')
const { create, fetchPage, fetch, update, destroy } = require('./controller')

router.post(
  '/presences',
  createTransaction,
  jwtAuth.required,
  handleRole('admin'),
  handleImage('static/uploads/images/presences').single('image'),
  create
)
router.get(
  '/presences',
  createTransaction,
  jwtAuth.required,
  handleRole('admin'),
  fetchPage
)
router.get(
  '/presences/:id',
  createTransaction,
  jwtAuth.required,
  handleRole('admin'),
  fetch
)
router.put(
  '/presences/:id',
  createTransaction,
  jwtAuth.required,
  handleRole('admin'),
  handleImage('static/uploads/images/presences').single('image'),
  update
)
router.delete(
  '/presences/:id',
  createTransaction,
  jwtAuth.required,
  handleRole('admin'),
  destroy
)

module.exports = router