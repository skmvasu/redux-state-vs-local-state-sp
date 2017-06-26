import React from 'react';
import './App.css';

const GoTCharacters = ({characters}) => {
    return (
        <div className="characters-list">
            {characters.map(char => (
                <CharacterRow 
                    character={char}  
                    key={char.id}/>
            ))}
        </div>
    );
};

export default GoTCharacters;

export const CharacterRow = ({character}) => (
    <div className="row">
        {character.name}
    </div>
);
