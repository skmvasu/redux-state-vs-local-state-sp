import km from 'keymirror';
import {createAction} from 'redux-actions';
import {characters} from './constants';

const FlixActions = km({
	FETCH_CHARACTERS: null,
	TOGGLE_CHARACTER_DESCRIPTION: null
});

const default_state = {
	characters: characters,
	character_show_description: {}
};

export const toggleCharacterDescription = createAction(
	FlixActions.TOGGLE_CHARACTER_DESCRIPTION, (character) => ({character})
);

export default (current_state, action) => {
	const state = current_state || default_state;

	switch (action.type) {
		case FlixActions.TOGGLE_CHARACTER_DESCRIPTION:
			const {character} = action.payload;
			return {
				...state, 
				character_show_description: {
					...state.character_show_description, 
					[character.id]: !state.character_show_description[character.id]
				}
			}

		default:
			return state
	}
}