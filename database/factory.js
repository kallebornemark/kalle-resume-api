/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/User', faker => ({
  username: faker.username(),
  email: faker.email(),
  password: faker.password(),
}));

Factory.blueprint('App/Models/Introduction', faker => ({
  title: faker.sentence({ words: 5 }),
  body: faker.paragraph({ sentences: 3 }),
}));

Factory.blueprint('App/Models/Section', faker => ({
  name: faker.sentence({ words: 3 }),
}));

Factory.blueprint('App/Models/SectionRow', (faker, i, data) => ({
  category: faker.sentence({ words: 1 }),
  content: faker.sentence({ words: 3 }),
  description: faker.sentence({ words: 3 }),
  timespan: faker.sentence({ words: 2 }),
  linkLabel: faker.sentence({ words: 1 }),
  linkURL: faker.url(),

  // Custom data
  section_id: data.sectionId || 1,
  order_index: data.order_index || 1,
}));
