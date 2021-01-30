/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SectionsSchema extends Schema {
  up() {
    this.table('sections', table => {
      table
        .boolean('hidden')
        .notNullable()
        .defaultTo(false);
    });
  }

  down() {
    this.table('sections', table => {
      // reverse alternations
    });
  }
}

module.exports = SectionsSchema;
