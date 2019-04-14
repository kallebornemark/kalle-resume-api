/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  // Users and auth
  // Route.post('users/register', 'UserController.register')
  Route.post('users/login', 'UserController.login');
  Route.get('users/:id', 'UserController.show').middleware('auth');

  // Introduction
  Route.get('introductions', 'IntroductionController.index');
  Route.get('introductions/:id', 'IntroductionController.show');
  Route.post('introductions', 'IntroductionController.create')
    .validator('CreateIntroduction')
    .middleware('auth');
  Route.put('introductions/:id', 'IntroductionController.update').middleware(
    'auth'
  );

  // Sections
  Route.get('sections', 'SectionController.index');
  Route.post('sections', 'SectionController.create')
    .validator('CreateSection')
    .middleware('auth');

  // Section rows
  Route.get('sectionRows/:id', 'SectionRowController.show');
  Route.post('sectionRows', 'SectionRowController.create').middleware('auth');
  Route.put('sectionRows/:id', 'SectionRowController.update').middleware(
    'auth'
  );
  Route.delete('sectionRows/:id', 'SectionRowController.destroy').middleware(
    'auth'
  );
}).prefix('api');
