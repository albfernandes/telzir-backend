'use strict'

const { test, trait } = use('Test/Suite')('Plans')
const Plan = use('App/Models/Plan')

trait('Test/ApiClient')

test('Store a new plan', async ({ client }) => {

  const data = {
    name: "Plano teste",
    free_minutes: 60,
  };

  const response = await client.post('/plans')
    .send(data)
    .end()

  response.assertStatus(201)
  response.assertJSONSubset(data)
  const plan = await Plan.find(response.body.id)
  await plan.delete();
}).timeout(6000)


test('List all plans', async ({ client }) => {

  const plans = await Plan.all();
  const serialized_plans = plans.toJSON()

  const response = await client.get('/plans')
    .end()

  response.assertStatus(200)
  response.assertJSONSubset(
    serialized_plans
  )
}).timeout(6000)
