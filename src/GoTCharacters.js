import React, {Component} from 'react';
import './App.css';

const GoTCharacters = (props) => {
    const {characters,toggleCharacterDescription, syncCharacterEditData, character_show_description, character_edit_form_data,  show_character_edit, toggleEdit, editCharacterDetails} = props;
    return (
        <div className="characters-list">
            {characters.map(char => (
                <StatefulCharacterRow
                    character={char}
                    editCharacterDetails={editCharacterDetails}
                    key={char.id}/>
            ))}
        </div>
    );
};

export default GoTCharacters;

export const CharacterRow = ({character, character_show_description, character_edit_form_data, show_character_edit, toggleCharacterDescription, toggleEdit, syncCharacterEditData, editCharacterDetails}) => {
    const toggleEditPartial = toggleEdit.bind(null, character);
    return (<div className="row">
        <div className="name">{character.name}</div>
        <a href="#" onClick={toggleCharacterDescription.bind(null, character)} >
            {character_show_description[character.id] ? 'collapse' : 'expand'}
        </a>
        {!character_show_description[character.id] && <a href="#" onClick={toggleEditPartial} >
            edit
        </a>}
        {character_show_description[character.id] && 
            <div className="description">{character.description}</div>}

        {show_character_edit[character.id] &&
            <EditCharacterDetails character={character}
                cancelEdit={toggleEditPartial}
                syncCharacterEditData={syncCharacterEditData}
                editCharacterDetails={editCharacterDetails}
                character_edit_form_data={character_edit_form_data}/>
        }
    </div>);
}

export class StatefulCharacterRow extends Component {
    constructor() {
        super();
        this.toggleEditForm = this.toggleEditForm.bind(this);
        this.syncCharacterEditData = this.syncCharacterEditData.bind(this);
        this.state = {
            show_description: false,
            show_edit_form: false,
            edit_data: {}
        }
    }

    toggleEditForm() {
        const {name, description} = this.props.character;
        const show_edit_form = !this.state.show_edit_form;
        const edit_data = show_edit_form ? {name, description} : {};
        this.setState({show_edit_form, edit_data});
    }

    syncCharacterEditData(character, form_data) {
        this.setState({
            edit_data: {...this.state.edit_data, ...form_data}
        });
    }

    render() {
        const {character} = this.props;
        return (<div className="row">
            <div className="name">{character.name}</div>
            <a href="#" onClick={() => this.setState({
                show_description: !this.state.show_description})} >
                {this.state.show_description ? 'collapse' : 'expand'}
            </a>

            {!this.state.show_edit_form && <a href="#" onClick={this.toggleEditForm} >
                edit
            </a>}
            {this.state.show_description && 
                <div className="description">{character.description}</div>}

            {this.state.show_edit_form &&
                <EditCharacterDetails character={character}
                    cancelEdit={this.toggleEditForm}
                    syncCharacterEditData={this.syncCharacterEditData}
                    editCharacterDetails={this.props.editCharacterDetails}
                    edit_data={this.state.edit_data}/>}
        </div>);
    }
};

export const EditCharacterDetails = ({character, edit_data, syncCharacterEditData, editCharacterDetails, cancelEdit}) =>  {
    const syncFormData = (key, e) => {
        const {value} = e.currentTarget;
        syncCharacterEditData(character, {
            ...edit_data,
            [key]: value
        });
    };

    const saveForm = (e) => {
        e.preventDefault();
        editCharacterDetails(character, edit_data);
    };

    return (
        <form onSubmit={saveForm}>
            <label>Name: </label>
            <input name='name' value={edit_data.name} onChange={syncFormData.bind(null, 'name')}/>
            
            <label>Description:</label>
            <textarea name='description' value={edit_data.description} onChange={syncFormData.bind(null, 'description')}/>

            <button type="reset" onClick={cancelEdit}> Cancel </button>
            <button type="submit"> Submit </button>

        </form>
    );
};
