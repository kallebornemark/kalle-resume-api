const User = use('App/Models/User');

class UserController {
  async register({ request, response }) {
    const userData = request.only(['username', 'email', 'password']);
    console.log(userData);

    await User.create(userData);
    return response.status(201).send();
  }

  async login({ auth, request }) {
    const { username, password } = request.all();

    return auth.attempt(username, password);
  }

  async show({ auth, params }) {
    if (auth.user.id !== Number(params.id)) {
      return `You cannot see someone else's profile`;
    }

    return auth.user;
  }
}

module.exports = UserController;
