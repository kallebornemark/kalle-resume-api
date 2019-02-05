'use strict'

const Factory = use('Factory')
const { before, trait, test } = use('Test/Suite')('Introduction')

trait('Test/ApiClient')
trait('Auth/Client')

let user
before(async () => {
  user = await Factory.model('App/Models/User').create()
})

trait(suite => {
  suite.Context.macro('createIntroduction', async (client) => {
    const { title, body } = await Factory.model('App/Models/Introduction').make()

    return await client
      .post('/api/introductions')
      .loginVia(user, 'jwt')
      .send({ title, body })
      .end()
  })
})

test('can create an introduction if authenticated', async ({ client }) => {
  const { title, body } = await Factory.model('App/Models/Introduction').make()

  const response = await client
    .post('/api/introductions')
    .loginVia(user, 'jwt')
    .send({ title, body })
    .end()

  response.assertStatus(201)
  response.assertJSONSubset({ title, body })
})

test('cannot create an introduction if not authenticated', async ({ client }) => {
  const { title, body } = await Factory.model('App/Models/Introduction').make()

  const response = await client
    .post('/api/introductions')
    .send({ title, body })
    .end()

  response.assertStatus(401)
})

test('cannot create an introduction without a title', async ({ client }) => {
  const { body } = await Factory.model('App/Models/Introduction').make()

  const response = await client
    .post('/api/introductions')
    .loginVia(user, 'jwt')
    .send({ body })
    .end()

  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: 'required validation failed on title',
      field: 'title',
      validation: 'required'
    }
  ])
})

test('cannot create an introduction if title and body are not strings', async ({ client }) => {
  const data = {
    title: 123,
    body: 123
  }

  const response = await client
    .post('/api/introductions')
    .loginVia(user, 'jwt')
    .send(data)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset([
    {
      message: 'string validation failed on title',
      field: 'title',
      validation: 'string'
    },
    {
      message: 'string validation failed on body',
      field: 'body',
      validation: 'string'
    }
  ])
})

test('can return an introduction', async({ client, createIntroduction }) => {
  const { body: { id } } = await createIntroduction(client, user)

  const introduction = await client
    .get(`/api/introductions/${id}`)
    .loginVia(user, 'jwt')
    .end()

  introduction.assertStatus(200)
  introduction.assertJSONSubset({
    title: introduction.body.title,
    body: introduction.body.body
  })
})

test('can update an introduction', async({ client, createIntroduction }) => {
  const { body: { id } } = await createIntroduction(client, user)

  const updatedData = {
    title: 'new title',
    body: 'new body'
  }

  const introduction = await client
    .put(`/api/introductions/${id}`)
    .loginVia(user, 'jwt')
    .send(updatedData)
    .end()

  introduction.assertStatus(200)
  introduction.assertJSONSubset(updatedData)
})
