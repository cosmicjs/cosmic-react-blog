import metadata from '../../__mocks__/metadata';
import pages from '../../__mocks__/pages';
import posts from '../../__mocks__/posts';
import { DisconnectedIndex } from '.';

describe('Disconnected Index Page', () => {
  it('should render', () => {
    const wrapper = shallow((
      <DisconnectedIndex
        metadata={metadata}
        page={1}
        pages={pages}
        posts={posts}
      />
    ));
    return expect(toJson(wrapper)).toMatchSnapshot();
  });
});
