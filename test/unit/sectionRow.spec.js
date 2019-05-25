const Factory = use('Factory');
const { before, trait, test } = use('Test/Suite')('SectionRow');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

let user;
before(async () => {
  user = await Factory.model('App/Models/User').create();
});

test('can update order_index', async ({ client }) => {
  const { id } = await Factory.model('App/Models/SectionRow').create();

  const response = await client
    .put(`/api/sectionRows/${id}`)
    .loginVia(user, 'jwt')
    .send({ order_index: 1337 })
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({ order_index: 1337 });
});
