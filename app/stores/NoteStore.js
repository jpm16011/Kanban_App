import uuid from 'node-uuid'; 
import alt from '../libs/alt'; 
import NoteActions from '../actions/NoteActions';

class NoteStore { 
	constructor() { 
		//Map each action to a method by name
		this.bindActions(NoteActions); 

		this.notes = []; 
		this.exportPublicMethods({
			getNotesByIds: this.getNotesByIds.bind(this)
		});
	}
	//Creates a note.  Assigns an id to the note and appends it to the current
	// note array
	create(note) {
		const notes = this.notes; 

		note.id = uuid.v4(); 

		this.setState({
			notes: notes.concat(note)
		});
		return note; 
	}
	// Updates note.  Creates 
	update(updatedNote) {
		const notes = this.notes.map(note => {
				if(note.id === updatedNote.id) {
					/*
						Object.assign is used to patch the note.
						It mutates the target (first parameter)
						by applying the subsequent arguments to it 
						So first, we create an empty object 
						Next we pass the current version of note into it 
						Lastly, we pass in the updated version of a note element
						Object.assign matches the updatedNote's id with note object
						and replaces the note's task
					*/
					return Object.assign({}, note, updatedNote);
				}
				return note; 
		});
		this.setState({notes});

	}
	delete(id) {
		this.setState({
			notes: this.notes.filter(
				note => note.id !== id)
		});
	}
	getNotesByIds(ids) {
		//Make sure we're operating on an array and map over the ids 
		return(ids || []).map(
			//Extract matching notes
			// [Note, Note, Note] -> [Note, ...] (match) or [] (no match)
			id => this.notes.filter(note => note.id == id)
			// Filter out possible empty arrays 
		).filter(a => a.length).map(a => a[0]);
	}
}

export default alt.createStore(NoteStore, 'NoteStore'); 