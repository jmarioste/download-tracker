import { setAllRepos } from '../../actions/allRepos';

test('should create action for set all repos', () => {
  const repos = ['manga-viewer', 'download-tracker'];
  const action = setAllRepos(repos);
  expect(action).toEqual({
    type: 'SET_ALL_REPOS',
    allRepos: repos
  })
})
