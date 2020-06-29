'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/calls', 'CallController.index')
Route.get('/calls/:id', 'CallController.show')
Route.put('/calls/:id', 'CallController.update')
Route.post('/calls', 'CallController.store').validator('StoreCall')
Route.delete('/calls/:id', 'CallController.destroy')


Route.get('/plans', 'PlanController.index')
Route.get('/plans/:id', 'PlanController.show')
Route.put('/plans/:id', 'PlanController.update')
Route.post('/plans', 'PlanController.store')
Route.delete('/plans/:id', 'PlanController.destroy')

Route.post('/calculators', 'CalculatorController.calculate').validator('Calculator')


