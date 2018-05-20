import trackedRepoReducer from '../../reducers/trackedRepo';

test('should add a repo to state', () => {
  const action = {
    type: 'ADD_REPO',
    repoName: "manga-viewer"
  };

  const state = trackedRepoReducer([], action);
  expect(state).toEqual([action.repoName])
});


test('should should set tracked repos to state', () => {
  const action = {
    type: 'SET_REPOS',
    repos: [
      'manga-viewer',
      'download-tracker'
    ]
  }

  const state = trackedRepoReducer([], action);
  expect(state).toEqual(action.repos);
})
