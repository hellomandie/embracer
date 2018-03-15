import { connect } from 'react-redux';
import {
  setStartingDots,
  purchaseOrUnpurchaseDot
} from '../actions/characterCreationActions';
import getDisciplineNames from '../selectors/getDisciplineNames';
import Disciplines from '../components/Disciplines';

const mapStateToProps = (state, ownProps) => {
  const { affinity } = ownProps;

  return {
    names: getDisciplineNames(state)[affinity],
    displayNameOverride: {},
    traits: state.character.disciplines[affinity]
  };
};

const mapDispatchToProps = {
  setStartingDots,
  purchaseOrUnpurchaseDot
};

export default connect(mapStateToProps, mapDispatchToProps)(Disciplines);
