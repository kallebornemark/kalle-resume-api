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

test('can delete a section if authenticated', async ({ client }) => {
  const { id } = await Factory.model('App/Models/Section').create();
  const response = await client
    .delete(`/api/sections/${id}`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(204);
});

test('cannot delete a section if not authenticated', async ({ client }) => {
  const { id } = await Factory.model('App/Models/Section').create();
  const response = await client.delete(`/api/sections/${id}`).end();

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

test('can update a section if authenticated', async ({ client }) => {
  const { id } = await Factory.model('App/Models/Section').create();
  const newSectionname = 'new section name';

  const response = await client
    .put(`/api/sections/${id}`)
    .loginVia(user, 'jwt')
    .send({ name: newSectionname })
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    name: newSectionname,
  });
});

test('cannot update a section if not authenticated', async ({ client }) => {
  const { id } = await Factory.model('App/Models/Section').create();
  const newSectionname = 'new section name';

  const response = await client
    .put(`/api/sections/${id}`)
    .send({ name: newSectionname })
    .end();

  response.assertStatus(401);
});
