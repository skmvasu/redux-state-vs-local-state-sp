import { connect } from 'react-redux';
import GoTCharacters from './GoTCharacters';
import {toggleCharacterDescription} from './FlickDuck';

const mapStateToProps = (state) => ({
    ...state.flick
});

const mapDispatchToProps = (dispatch) => ({
    toggleCharacterDescription : (data) => dispatch(toggleCharacterDescription(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(GoTCharacters);
