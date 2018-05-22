import { DisconnectedAppearanceDialog } from '.';
import { THEMES } from '../../utils/constants';

describe('AppearanceDialog', () => {
  it('should render', () => {
    const component = mount((
      <DisconnectedAppearanceDialog
        dispatch={jest.fn()}
        onClose={jest.fn()}
        open={false}
        theme={THEMES.LIGHT}
      />
    ));
    return expect(toJson(component)).toMatchSnapshot();
  });
});
