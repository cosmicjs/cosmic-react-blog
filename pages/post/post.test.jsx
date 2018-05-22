import { Provider } from 'react-redux';

import { BasicPost } from '.';
import post from '../../__mocks__/post';
import initializeStore from '../../state';

describe('Post page', () => {
  it('should render', () => {
    const component = mount((
      <Provider store={initializeStore()}>
        <BasicPost {...post} />
      </Provider>
    ));
    return expect(toJson(component)).toMatchSnapshot();
  });
});
