import * as actionTypes from '../actions/actionTypes';

const initialState = {
    players: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INITIAL_PLAYER_COLOR:
            let players = [];
            let count = 1;
            for (let key in action.colors) {
                let color = action.colors[key];
                if (color) {
                    players.push({
                        name: `player${count}`,
                        color: color
                    });
                }
                count += 1;
            }
            return {
                ...state,
                players: players,
            }
        case actionTypes.CHANGE_PLAYER_COLOR:
            return {
                ...state,
                players: state.players.map(player => player.name === action.player.name ?
                    { ...player, color: action.color } : 
                    player
                ),
            }
        default:
            return state;
    }
}

export default reducer;