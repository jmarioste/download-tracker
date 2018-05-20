import allRepos from '../../reducers/allRepos';

test('should set all repos', () => {
  const action = {
    type: 'SET_ALL_REPOS',
    allRepos: ['manga-viewer', 'download-tracker']
  }

  const state = allRepos({}, action);
  expect(state).toEqual(action.allRepos);
})
