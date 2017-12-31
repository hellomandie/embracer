import dotSelector from './dotSelector';

it('should return 0 if unset', () => {
  const traitState = {};

  const result = dotSelector(traitState);

  expect(result).toEqual(0);
});

it('should return dots from rank if no other dots', () => {
  const traitState = {
    dotsFromRank: 7
  };

  const result = dotSelector(traitState);

  expect(result).toEqual(7);
});
