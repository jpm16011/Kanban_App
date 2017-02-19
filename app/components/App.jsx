import React from 'react'; 
import uuid from 'node-uuid';
import Notes from './Notes.jsx'; 

export default class App extends React.Component { 
	constructor(props) {
		super(props);

		this.state = { 
			notes : [
				{
					id: uuid.v4(), 
					task: 'Learn Webpack'
				}, 
				{
					id: uuid.v4(), 
					task: 'Learn React'
				},

				{
					id: uuid.v4(), 
					task: 'Do laundry'
				}

			]
		};
	}
	render() { 
	
			const notes = this.state.notes; 
		return (
			<div> 
				<button onClick={this.addNote}>+</button>
				<Notes notes={notes} 
				 onEdit={this.editNote} 
				 onDelete = {this.removeNote}/>
			</div>

		);

	}

	addNote = () => {
		this.setState({
			notes: this.state.notes.concat([{
				id: uuid.v4(),
				task: 'New Task'
			}])
		});

	};

	editNote = (id, task) => {
		//Check if string is empty.  If so, just return
		if(!task.trim()){
			return;
		}
		/* Clones the current notes array we have and iterates through it 
			If the array element is equal to the element we want to edit, 
			we set the task of that element to the new task
		*/
		const notes = this.state.notes.map(note => {
			if(note.id == id && task) {
				note.task = task;
			}

			return note; 
		});
		// Calls setState so component wil be re-rendered
		this.setState({notes});
	};

	removeNote = (id, e) => {
		//Avoid bubbling to edit 
		e.stopPropagation(); 
		
		this.setState({
			notes: this.state.notes.filter(note => note.id !== id)
		});
		
	};
}