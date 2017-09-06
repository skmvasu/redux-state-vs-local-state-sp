import { connect } from 'react-redux';
import GoTCharacters from './GoTCharacters';
import {toggleCharacterDescription, toggleEdit, syncCharacterEditData, editCharacterDetails} from './FlickDuck';

const mapStateToProps = (state) => ({
    ...state.flick
});

const mapDispatchToProps = (dispatch) => ({
    toggleCharacterDescription : (data) => dispatch(toggleCharacterDescription(data)),
    syncCharacterEditData : (character, form_data) => dispatch(syncCharacterEditData(character, form_data)),
    editCharacterDetails : (character) => dispatch(editCharacterDetails(character)),
    toggleEdit : (data) => dispatch(toggleEdit(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(GoTCharacters);
