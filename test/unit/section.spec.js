const Factory = use('Factory');
const { before, trait, test } = use('Test/Suite')('Section');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

let user;
before(async () => {
  user = await Factory.model('App/Models/User').create();
});

trait(suite => {
  suite.Context.macro('postCreateSection', async client => {
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
  postCreateSection,
}) => {
  const response = await postCreateSection(client);

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

test('can return a section with rows', async ({ client }) => {
  const sectionA = await Factory.model('App/Models/Section').create();
  const sectionARows = await Factory.model('App/Models/SectionRow').make({
    sectionId: sectionA.id,
  });
  await sectionA.rows().save(sectionARows);

  const response = await client
    .get('/api/sections')
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  response.assertJSONSubset([
    {
      id: sectionA.id,
      rows: [
        {
          id: sectionARows.id,
        },
      ],
    },
  ]);
});
