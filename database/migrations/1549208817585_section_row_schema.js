'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SectionRowSchema extends Schema {
  up () {
    this.create('section_rows', (table) => {
      table.increments()
      table.integer('section_id').notNullable()
      table.string('category', 80).notNullable()
      table.string('content', 5000)
      table.string('description', 5000)
      table.string('timespan', 80)
      table.string('linkLabel', 500)
      table.string('linkURL', 500)
      table.boolean('hidden').notNullable().defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('section_rows')
  }
}

module.exports = SectionRowSchema
