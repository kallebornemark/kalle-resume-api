/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class IntroductionSchema extends Schema {
  up() {
    this.create('introductions', table => {
      table.increments();
      table.string('title', 80).notNullable();
      table.string('body', 5000).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('introductions');
  }
}

module.exports = IntroductionSchema;
