import React, {Component} from 'react';
import './App.css';

const GoTCharacters = (props) => {
    const {characters,toggleCharacterDescription, syncCharacterEditData, character_show_description, character_edit_form_data,  show_character_edit, toggleEdit, editCharacterDetails} = props;
    return (
        <div className="characters-list">
            {characters.map(char => (
                <CharacterRow 
                    character={char} 
                    character_show_description={character_show_description} 
                    character_edit_form_data={character_edit_form_data} 
                    show_character_edit={show_character_edit} 
                    toggleCharacterDescription={toggleCharacterDescription} 
                    editCharacterDetails={editCharacterDetails} 
                    syncCharacterEditData={syncCharacterEditData} 
                    toggleEdit={toggleEdit} 
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
        this.state = {
            show_description: false
        }
    }

    render() {
        const {character} = this.props;
        return (<div className="row">
            <div className="name">{character.name}</div>
            <a href="#" onClick={() => this.setState({
                show_description: !this.state.show_description})} >
                {this.state.show_description ? 'collapse' : 'expand'}
            </a>
            {this.state.show_description && 
                <div className="description">{character.description}</div>}
        </div>);
    }
};

export const EditCharacterDetails = ({character, character_edit_form_data, syncCharacterEditData, editCharacterDetails, cancelEdit}) =>  {
    const edit_data = character_edit_form_data[character.id];
    const syncFormData = (key, e) => {
        const {value} = e.currentTarget;
        syncCharacterEditData(character, {
            ...edit_data,
            [key]: value
        });
    };

    const saveForm = (e) => {
        e.preventDefault();
        editCharacterDetails(character);
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
