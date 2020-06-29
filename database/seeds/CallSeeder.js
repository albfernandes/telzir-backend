'use strict'

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class CallSeeder {
  async run () {
    let call = await Factory.model('App/Models/Call').create({
      source: '011',
      destiny: '016',
      price: 1.90
    })

    await call.save();

    call = await Factory.model('App/Models/Call').create({
      source: '016',
      destiny: '011',
      price: 2.90
    })

    await call.save();

    call = await Factory.model('App/Models/Call').make({
      source: '011',
      destiny: '017',
      price: 1.70
    })

    await call.save();

    call = await Factory.model('App/Models/Call').make({
      source: '017',
      destiny: '011',
      price: 2.70
    })

    await call.save();

    call = await Factory.model('App/Models/Call').make({
      source: '011',
      destiny: '018',
      price: 0.90
    })

    await call.save();

    call = await Factory.model('App/Models/Call').make({
      source: '018',
      destiny: '011',
      price: 1.90
    })

    await call.save();
  }

}

module.exports = CallSeeder
