/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SectionRowSchema extends Schema {
  up() {
    this.table('section_rows', table => {
      table.integer('order_index', 5000);
    });
  }

  down() {
    this.table('section_rows', table => {
      // reverse alternations
    });
  }
}

module.exports = SectionRowSchema;
