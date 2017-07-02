import React, {Component} from 'react';
import './App.css';

const GoTCharacters = ({characters,toggleCharacterDescription, character_show_description}) => {
    return (
        <div className="characters-list">
            {characters.map(char => (
                <CharacterRow 
                    character={char} 
                    character_show_description={character_show_description} 
                    toggleCharacterDescription={toggleCharacterDescription} 
                    key={char.id}/>
            ))}
        </div>
    );
};

export default GoTCharacters;

export const CharacterRow = ({character, character_show_description, toggleCharacterDescription}) => (
    <div className="row">
        <div className="name">{character.name}</div>
        <a href="#" onClick={toggleCharacterDescription.bind(null, character)} >
            {character_show_description[character.id] ? 'collapse' : 'expand'}
        </a>
        {character_show_description[character.id] && 
            <div className="description">{character.description}</div>}
    </div>
);

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
