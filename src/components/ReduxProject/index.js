import ReduxProject from './ReduxProject';
import * as colorsActions from '../../store/actions/colors';
import * as playersActions from '../../store/actions/players';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    byId: state.colorsReducer.byId,
    allIds: state.colorsReducer.allIds,
    error: state.colorsReducer.error,
    players: state.playersReducer.players
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitColors: () => dispatch(colorsActions.initColors()),
    onUpdateSelected: (color) => dispatch(colorsActions.updateSelected(color)),
    onChangeSelected: (prevColor, newColor) => dispatch(colorsActions.changeSelected(prevColor, newColor)),
    onInitPlayerColors: (initColors) => dispatch(playersActions.initPlayerColors(initColors)),
    onChangePlayerColors: (player, color) => dispatch(playersActions.changePlayerColors(player, color)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(ReduxProject);