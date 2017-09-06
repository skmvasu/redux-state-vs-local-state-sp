import km from 'keymirror';
import {createAction} from 'redux-actions';
import {characters} from './constants';

const FlixActions = km({
    FETCH_CHARACTERS: null,
    TOGGLE_CHARACTER_DESCRIPTION: null,
    TOGGLE_CHARACTER_EDIT: null,
    SYNC_CHARACTER_EDIT_DATA: null,
    SAVE_CHARACTER_EDIT: null
});

const default_state = {
    characters: characters,
    character_show_description: {},
    show_character_edit: {},
    character_edit_form_data: {}
};

export const toggleCharacterDescription = createAction(
    FlixActions.TOGGLE_CHARACTER_DESCRIPTION, (character) => ({character})
);

export const toggleEdit = createAction(
    FlixActions.TOGGLE_CHARACTER_EDIT, (character) => ({character})
);

export const syncCharacterEditData = createAction(
    FlixActions.SYNC_CHARACTER_EDIT_DATA, (character, form_data) => ({character, form_data})
);
export const editCharacterDetails = createAction(
    FlixActions.SAVE_CHARACTER_EDIT, (character) => ({character})
);

export default (current_state, action) => {
    const state = current_state || default_state;
    let character;
    
    switch (action.type) {
        case FlixActions.TOGGLE_CHARACTER_DESCRIPTION:
            character =  action.payload.character;
            return {
                ...state, 
                character_show_description: {
                    ...state.character_show_description, 
                    [character.id]: !state.character_show_description[character.id]
                }
            }

        case FlixActions.TOGGLE_CHARACTER_EDIT:
            character =  action.payload.character;
            const show_character_edit = !state.show_character_edit[character.id];
            return {
                ...state, 
                show_character_edit: {
                    ...state.show_character_edit, 
                    [character.id]: show_character_edit
                }, character_edit_form_data : {
                    ...state.character_edit_form_data, 
                    [character.id]: show_character_edit ? {...character} : {}
                }
            }

        case FlixActions.SYNC_CHARACTER_EDIT_DATA:
            character =  action.payload.character;
            const {form_data} = action.payload;

            return {
                ...state, 
                character_edit_form_data: {
                    ...state.character_edit_form_data, 
                    [character.id]: {...form_data}
                }
            }

        case FlixActions.SAVE_CHARACTER_EDIT:
            character =  action.payload.character;
            const edit_form_data = state.character_edit_form_data[character.id];
            const characters = state.characters.map(char => {
                if (char.id === character.id) return {...char, name:edit_form_data.name, description: edit_form_data.description} 

                return char;
            });

            return {
                ...state, 
                characters,
                show_character_edit: {
                    ...state.show_character_edit, 
                    [character.id]: false
                }
            }

        default:
            return state
    }
}