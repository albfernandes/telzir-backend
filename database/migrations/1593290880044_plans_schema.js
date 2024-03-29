'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PlansSchema extends Schema {
  up () {
    this.create('plans', (table) => {
      table.increments()
      table.timestamps()
      table.string('name').notNullable();
      table.integer('free_minutes');
    })
  }

  down () {
    this.drop('plans')
  }
}

module.exports = PlansSchema
