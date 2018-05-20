import authReducer from '../../reducers/auth';
import userData from "../fixtures/userData";
test('should set userData for login', () => {
  const action = {
    type: 'LOGIN',
    userData
  };

  const state = authReducer({}, action);
  expect(state).toEqual(action.userData);
});

test('should clear uid for logout', () => {
  const action = {
    type: 'LOGOUT',
  };

  const state = authReducer({ uid: 'anything' }, action);
  expect(state).toEqual({});

});