import { Provider } from 'react-redux';

import AppBar from '.';
import initializeStore from '../../state';

describe('AppBar', () => {
  it('should render', () => {
    const component = mount((
      <Provider store={initializeStore()}>
        <AppBar title="Title" />
      </Provider>
    ));
    return expect(toJson(component)).toMatchSnapshot();
  });
});
