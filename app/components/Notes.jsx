// This component will be a container class for Notes.  

import React from 'react'
import Note from './Note.jsx';

export default ({notes}) => {
	return (

				<ul> {notes.map(note => 
					<li key={note.id}> 
						<Note task = {note.task} />
					</li>
				)} </ul>
		
	);
}