import React from 'react'; 

//Anonymous function that takes in an argument called task 
//and returns a div containing that task
export default class Editable extends React.Component {
	
	render() {
		const {value, onEdit, onValueClick, editing, ...props} = this.props;

		return (
			<div {...props}>
				{editing ? this.renderEdit() : this.renderValue()}
			</div>
		);
	}

	
	renderEdit = () => {
		//Returns a text input tag.  
		return <input type="text"
			ref={
				//If e is true, then the start position of the selected text will be at the end 
				// Otherwise, it will be null
				(e) => e ? e.selectionStart = this.props.value.length : null 
			}
			/* Properties of input tag are set
			*	autoFocus: Specifies that an <input> element should automatically get focus
				when the page loads

				defaultValue: Sets default value of input text.  In our code, we set it as 
				the current the current task of this note

				onBlur: Executes JS when a user leaves an input field.  In our code, we call
				finishEdit

				onKeyPress: Executes JS when user presses a key.  Passes key pressed as argument


			*/
			autoFocus={false}
			defaultValue={this.props.value}

			onBlur= {this.finishEdit}
			onKeyPress={this.checkEnter} />;

	};

	renderValue = () => {
		/*
		*	This function is called if a Note isn't being edited.
		*	In this case, Note just displays the current task as usual
		*	This function also provides the component with an onClick listener
		*	that gets triggered when a Note is clicked.  The listener calls
		*	edit, which begins the edit operation
		* 	
		*/
			const onDelete = this.props.onDelete;

			return (
				<div onClick = {this.props.onValueClick}>
					<span className="value"> {this.props.value} </span>
					{onDelete ? this.renderDelete() : null}
				</div>
			);
	};

	renderDelete = () => {
		return <button 
				className="delete" 
				onClick={this.props.onDelete}>x</button>;
	};

	/*
	*	This function simply changes the editing state of Note using the 
		setState() method.  setState() re-renders the component, which subsequently
		triggers the renderEdit() function
	
	/*	This function gets triggered when a user presses a key
	*	If the key pressed is Enter, we'll call the finishEdit method
	*/
	checkEnter = (e) => {
		//The user hit *enter*, so we finish up editing 
		if(e.key == 'Enter') {
			this.finishEdit(e);
		}

	};
	finishEdit = (e) => {
		

		/*
		*	e.target gets the element that triggered a specific event.  In our case, 
			e.target gets the element that triggered the keyPress
		*/
		const value = e.target.value;

		if(this.props.onEdit) {
			this.props.onEdit(value);
		}
	};
}