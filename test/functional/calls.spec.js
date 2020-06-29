'use strict'


const { test, trait } = use('Test/Suite')('Calls')
const Call = use('App/Models/Call')

trait('Test/ApiClient')

test('Store a new call rule', async ({ client }) => {

  const data = {
    source: "987",
    destiny: "987",
    price: 499.99
  };

  const response = await client.post('/calls')
    .send(data)
    .end()

  response.assertStatus(201)
  response.assertJSONSubset(data)
  const call = await Call.find(response.body.id)
  await call.delete();
}).timeout(6000)


test('List all calls', async ({ client }) => {

  const calls = await Call.all();
  const serialized_calls = calls.toJSON()

  const response = await client.get('/calls')
    .end()

  response.assertStatus(200)
  response.assertJSONSubset(
    serialized_calls
  )
}).timeout(6000)


test('Fail at store new call with wrong source', async ({ client }) => {

  const data = {
    source: "12",
    destiny: "123",
    price: 4.99
  };

  const response = await client.post('/calls')
    .send(data)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    description: "Field source must contain at least 3 character(s)",
    error: true,
  })
}).timeout(6000)
