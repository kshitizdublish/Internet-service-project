import { ZiggoSelfcarePage } from './app.po';

describe('ziggo-selfcare App', () => {
  let page: ZiggoSelfcarePage;

  beforeEach(() => {
    page = new ZiggoSelfcarePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
