import author from '../../__mocks__/author';
import AuthorInfo from '.';

describe('AuthorInfo', () => {
  it('should render', () => {
    const component = mount((
      <AuthorInfo
        {...author}
        className="customClassName"
      />
    ));
    return expect(toJson(component)).toMatchSnapshot();
  });
});
