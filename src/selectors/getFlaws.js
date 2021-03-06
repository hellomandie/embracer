import { createSelector } from 'reselect';
import { maxFlawPoints } from '../constants/flaws';
import { getSelectedFlaws } from './simple';

const getFlaws = createSelector([getSelectedFlaws], selectedFlaws => {
  const additionalPoints = 0;
  const maxPoints = maxFlawPoints;

  let currentPoints = selectedFlaws
    .map(x => x.points)
    .reduce((acc, cur) => acc + cur, 0);

  currentPoints += additionalPoints;

  return {
    selected: selectedFlaws,
    currentPoints,
    availablePoints: maxPoints - currentPoints
  };
});

export default getFlaws;
