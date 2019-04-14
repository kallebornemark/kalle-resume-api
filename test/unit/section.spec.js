const Factory = use('Factory');
const { before, trait, test } = use('Test/Suite')('Section');

trait('Test/ApiClient');
trait('Auth/Client');

let user;
before(async () => {
  user = await Factory.model('App/Models/User').create();
});

trait(suite => {
  suite.Context.macro('createSection', async client => {
    const { name } = await Factory.model('App/Models/Section').make();

    return client
      .post('/api/sections')
      .loginVia(user, 'jwt')
      .send({ name })
      .end();
  });
});

test('can create a section if authenticated', async ({
  client,
  createSection,
}) => {
  const response = await createSection(client);

  response.assertStatus(201);
  response.assertJSONSubset({ name: response.body.name });
});

test('cannot create a section if not authenticated', async ({ client }) => {
  const { name } = await Factory.model('App/Models/Section').make();

  const response = await client
    .post('/api/sections')
    .send({ name })
    .end();

  response.assertStatus(401);
});

test('cannot create a section without a name', async ({ client }) => {
  const response = await client
    .post('/api/sections')
    .loginVia(user, 'jwt')
    .send({})
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: 'required validation failed on name',
      field: 'name',
      validation: 'required',
    },
  ]);
});

test('cannot create a section if name is not a string', async ({ client }) => {
  const data = { name: 123 };

  const response = await client
    .post('/api/sections')
    .loginVia(user, 'jwt')
    .send(data)
    .end();

  response.assertStatus(400);
  response.assertJSONSubset([
    {
      message: 'string validation failed on name',
      field: 'name',
      validation: 'string',
    },
  ]);
});

test('can return all sections', async ({ client, createSection }) => {
  const sectionA = await createSection(client);
  const sectionB = await createSection(client);

  const response = await client
    .get('/api/sections')
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  response.assertJSONSubset([sectionA.body, sectionB.body]);
});
