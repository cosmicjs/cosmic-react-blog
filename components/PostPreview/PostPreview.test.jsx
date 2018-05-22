import post from '../../__mocks__/post';
import { PurePostPreview } from '.';

describe('PostPreview', () => {
  it('should render', () => {
    const component = mount((
      <PurePostPreview
        classes={{
          button: {},
          hero: {},
        }}
        {...post}
      />
    ));
    return expect(toJson(component)).toMatchSnapshot();
  });
});
