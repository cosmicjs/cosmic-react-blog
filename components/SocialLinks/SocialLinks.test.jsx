import { Provider } from 'react-redux';
import initializeStore from '../../state';
import links from '../../__mocks__/links';
import { DisconnectedSocialLinks } from '.';

describe('SocialLinks', () => {
  it('should render', () => {
    const component = mount((
      <Provider store={initializeStore()}>
        <DisconnectedSocialLinks links={links} />
      </Provider>
    ));
    return expect(toJson(component)).toMatchSnapshot();
  });
});
