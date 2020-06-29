'use strict'

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class PlanSeeder {
  async run () {
    let plan = await Factory.model('App/Models/Plan').make({
      name: 'FaleMais 30',
      free_minutes: 30,
    })

    await plan.save()

    plan = await Factory.model('App/Models/Plan').make({
      name: 'FaleMais 60',
      free_minutes: 60,
    })

    await plan.save()

    plan = await Factory.model('App/Models/Plan').make({
      name: 'FaleMais 120',
      free_minutes: 120,
    })

    await plan.save()
  }
}

module.exports = PlanSeeder
