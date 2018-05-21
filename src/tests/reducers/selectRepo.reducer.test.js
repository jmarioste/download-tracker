import selectRepoReducer from "../../reducers/selectRepo";

test('should set state to be selectedRepo', () => {
  const action = {
    type: 'SELECT_REPO',
    selectedRepo: 'manga-viewer'
  };

  const state = selectRepoReducer('', action);
  expect(state).toBe('manga-viewer');
});