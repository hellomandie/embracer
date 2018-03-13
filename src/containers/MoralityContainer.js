import { connect } from 'react-redux';
import {
  humanity,
  moralityMaxDotsHumanity,
  moralityMaxDotsPath
} from '../constants/characterOptions';
import {
  purchaseMoralityDot,
  unpurchaseMoralityDot,
  updateMoralityIfPointsAvailable
} from '../actions/characterCreationActions';
import getDots from '../utils/getDots';
import getMoralityMeritsOptions from '../selectors/getMoralityMeritsOptions';
import Morality from '../components/Morality';

const mapStateToProps = state => {
  const path = state.character.morality.path;

  const maxDots =
    path === humanity ? moralityMaxDotsHumanity : moralityMaxDotsPath;

  return {
    optionsMap: getMoralityMeritsOptions(state),
    path,
    level: getDots(state.character.morality),
    maxDots,
    isEraser: state.mode.isEraser
  };
};

const mapDispatchToProps = {
  purchaseMoralityDot,
  unpurchaseMoralityDot,
  updateMoralityIfPointsAvailable
};

const mergeProps = (stateProps, dispatchProps) => ({
  optionsMap: stateProps.optionsMap,
  path: stateProps.path,
  level: stateProps.level,
  maxDots: stateProps.maxDots,
  purchaseOrUnpurchaseDot: stateProps.isEraser
    ? dispatchProps.unpurchaseMoralityDot
    : dispatchProps.purchaseMoralityDot,
  updateMoralityIfPointsAvailable: dispatchProps.updateMoralityIfPointsAvailable
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  Morality
);
