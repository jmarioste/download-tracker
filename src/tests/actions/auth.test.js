import { login, logout } from '../../actions/auth';
import userData from '../fixtures/userData'

test('should generate login action object', () => {

  const action = login(userData);
  expect(action).toEqual({
    type: 'LOGIN',
    userData
  });

});

test('should generate logout action object', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});