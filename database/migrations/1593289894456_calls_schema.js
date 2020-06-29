'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CallsSchema extends Schema {
  up () {
    this.create('calls', (table) => {
      table.increments()
      table.timestamps()
      table.string('source').notNullable();
      table.string('destiny').notNullable();
      table.decimal('price').notNullable();
    })
  }

  down () {
    this.drop('calls')
  }
}

module.exports = CallsSchema
