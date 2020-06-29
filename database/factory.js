'use strict'

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Call', (faker, i, { source, destiny, price}) => {
  console.log(source, destiny, price)
  return {
    source,
    destiny,
    price
  }
})


Factory.blueprint('App/Models/Plan', (faker, i, { name, free_minutes}) => {
  return {
    name,
    free_minutes
  }
})
