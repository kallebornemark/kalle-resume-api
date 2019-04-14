/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SectionRowSchema extends Schema {
  up() {
    this.table('section_rows', table => {
      table.string('category', 80).alter();
    });
  }

  down() {
    this.table('section_rows', () => {
      // reverse alternations
    });
  }
}

module.exports = SectionRowSchema;
