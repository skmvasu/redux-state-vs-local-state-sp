import { connect } from 'react-redux';
import GoTCharacters from './GoTCharacters';

const mapStateToProps = (state) => ({
    ...state.flick
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(GoTCharacters);
