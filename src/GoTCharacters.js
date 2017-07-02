import React from 'react';
import './App.css';

const GoTCharacters = ({characters,toggleCharacterDescription}) => {
    return (
        <div className="characters-list">
            {characters.map(char => (
                <CharacterRow 
                    character={char} 
                    toggleCharacterDescription={toggleCharacterDescription} 
                    key={char.id}/>
            ))}
        </div>
    );
};

export default GoTCharacters;

export const CharacterRow = ({character, toggleCharacterDescription}) => (
    <div className="row">
        <div className="name">{character.name}</div>
        <a href="#" onClick={toggleCharacterDescription.bind(null, character)} >
            {character.show_description ? 'collapse' : 'expand'}
        </a>
        {character.show_description && 
            <div className="description">{character.description}</div>}
        
    </div>
);
