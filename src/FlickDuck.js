import km from 'keymirror';
import {createAction} from 'redux-actions';
import {characters} from './constants';

const FlixActions = km({
	FETCH_CHARACTERS: null,
});

const default_state = {
	characters: characters
};

export default (current_state, action) => {
	const state = current_state || default_state;
	switch (action.type) {
		default:
			return state
	}
}