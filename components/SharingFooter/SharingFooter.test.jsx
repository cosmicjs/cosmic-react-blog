import SharingFooter from '.';

describe('SharingFooter', () => {
  it('should render', () => {
    const component = mount((
      <SharingFooter
        asPath="/post/blog-post"
        hashtags={['yay']}
        title="Blog Post"
      />
    ));
    return expect(toJson(component)).toMatchSnapshot();
  });
});
