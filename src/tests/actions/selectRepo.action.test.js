import { selectRepo } from "../../actions/selectRepo";

test('should create select repo action', () => {
  const action = selectRepo('manga-viewer');
  expect(action).toEqual({
    type: 'SELECT_REPO',
    selectedRepo: 'manga-viewer'
  });
});