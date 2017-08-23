import { BlogistPage } from './app.po';

describe('blogist App', () => {
  let page: BlogistPage;

  beforeEach(() => {
    page = new BlogistPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
