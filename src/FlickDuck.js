import km from 'keymirror';
import {createAction} from 'redux-actions';
import {characters} from './constants';

const FlixActions = km({
	FETCH_CHARACTERS: null,
	TOGGLE_CHARACTER_DESCRIPTION: null
});

const default_state = {
	characters: characters
};

export const toggleCharacterDescription = createAction(
	FlixActions.TOGGLE_CHARACTER_DESCRIPTION, (character) => ({character})
);

export default (current_state, action) => {
	const state = current_state || default_state;


	switch (action.type) {
		case FlixActions.TOGGLE_CHARACTER_DESCRIPTION:
			return {...state, characters: state.characters.map(char => {
				if (char.id === action.payload.character.id) {
					return {...char,show_description: !char.show_description};
				}

				return char;
			})}
		default:
			return state
	}
}