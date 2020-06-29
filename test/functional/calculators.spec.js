'use strict'

const { test, trait } = use('Test/Suite')('Calculators')

trait('Test/ApiClient')

test('Get pricing of call', async ({ client }) => {

  const data = {
    source: "018",
    destiny: "011",
    time: 200,
    plan_id: 3
  };

  const response = await client.post('/calculators')
    .send(data)
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    price_without_plan: 380,
    price_with_plan: 167.2
  })
}).timeout(6000)

test('Fail at plan not found', async ({ client }) => {

  const data = {
    source: "018",
    destiny: "011",
    time: 200,
    plan_id: 0
  };

  const response = await client.post('/calculators')
    .send(data)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    description: "Plan not found",
    error: true,
  })
}).timeout(6000)


test('Fail at invalid relationship between origin and destination', async ({ client }) => {

  const data = {
    source: "000",
    destiny: "000",
    time: 200,
    plan_id: 0
  };

  const response = await client.post('/calculators')
    .send(data)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    description: "Invalid relationship between origin and destination",
    error: true,
  })
}).timeout(6000)

test('Fail at minimal 3 characters source', async ({ client }) => {

  const data = {
    source: "0",
    destiny: "000",
    time: 200,
    plan_id: 0
  };

  const response = await client.post('/calculators')
    .send(data)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    description: "Field source must contain at least 3 character(s)",
    error: true
  })
}).timeout(6000)

test('Fail at required field: source', async ({ client }) => {

  const data = {
    destiny: "000",
    time: 200,
    plan_id: 0
  };

  const response = await client.post('/calculators')
    .send(data)
    .end()

  response.assertStatus(400)
  response.assertJSONSubset({
    description: "source is required",
    error: true
  })
}).timeout(6000)
