// This component will be a container class for Notes.  

import React from 'react'
import Note from './Note.jsx';

export default ({notes, onEdit, onDelete}) => {
	return (

				<ul className="notes"> {notes.map(note => 
					<li className="note" key={note.id}> 
						<Note task = {note.task} 
						 onEdit={onEdit.bind(null, note.id)}
						 onDelete={onDelete.bind(null, note.id)}/>
					</li>
				)} </ul>
		
	);
}