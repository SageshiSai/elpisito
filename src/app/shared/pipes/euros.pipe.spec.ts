import { EurosPipe } from './euros.pipe';

describe('EurosPipe', () => {
  it('create an instance', () => {
    const pipe = new EurosPipe();
    expect(pipe).toBeTruthy();
  });
});
