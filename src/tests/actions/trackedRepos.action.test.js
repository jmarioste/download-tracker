import { addRepo, setRepos } from '../../actions/trackedRepo';

test('should create an addRepo action', () => {
  const action = addRepo("manga-viewer");
  expect(action).toEqual({
    type: 'ADD_REPO',
    repoName: "manga-viewer"
  })
})

test('should create a setRepos action', () => {
  const repos = ['manga-viewer', 'download-tracker'];
  const action = setRepos(repos);
  expect(action).toEqual({
    type: 'SET_REPOS',
    repos: repos
  })
})

