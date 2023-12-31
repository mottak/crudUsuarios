import { Router } from 'express'
import { userSchema, updateSchema } from '../validators/userValidator'
import { userFactory } from '../factories/userFactorie'
import { idSchema } from '../validators/idValidator'

const userRoutes = Router()

userRoutes.post('/user', async (req, res) => {
  const dataUser = await userSchema.validateAsync(req.body)
  const resultUser = await userFactory().add(dataUser)


  return res.status(201).json(resultUser)
})

userRoutes.get('/user', async (req, res) => {

  const resultUser = await userFactory().find()

  return res.status(200).json(resultUser)
})

userRoutes.get('/user/:id', async (req, res) => {
  const resultUser = await userFactory().findOne(Number(req.params.id))

  return res.status(200).json(resultUser)
})

userRoutes.put('/user/:id', async (req, res) => {
  const dataUser = await updateSchema.validateAsync(req.body)
 
  const resultUser = await userFactory().update(dataUser, Number(req.params.id))


  return res.status(200).json(resultUser)
})

userRoutes.delete('/user/:id', async (req, res) => {
  const idUser = await idSchema.validateAsync(req.params)
  const { id } = idUser;
  await userFactory().delete(id)


  return res.status(204).json()
})


export default userRoutes