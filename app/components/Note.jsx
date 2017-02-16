import React from 'react'; 

//Anonymous function that takes in an argument called task 
//and returns a div containing that task
export default class Note extends React.Component {
	constructor(props) {
		super(props);

		//Track 'editing' state

		this.state = {
			editing: false
		};
	}

	render() {
		//Render the component differently based on state
		if(this.state.editing) {
			return this.renderEdit();
		}

		return this.renderNote(); 
	}

	/* We deal with blur and input handlers here.  These map to DOM events
	* We also set selection to input end using a callback at a ref
	* It gets triggered after the component is mounted
	* 
	*  We could also use a string reference and then refer to the element
	*  in question later in the code.  This would allow us to use the underlying
	*  DOM API through this.refs.input.  This can be useful when combined with 
	*  React lifecycle hooks.  
	*/
	renderEdit = () => {
		//Returns an input tag of type text.  Inside the input tag
		return <input type="text"
			ref={
				//If e is true, then the start position of the selected text will be at the end 
				// Otherwise, it will be null
				(e) => e ? e.selectionStart = this.props.task.length : null 
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
			defaultValue={this.props.task}

			onBlur= {this.finishEdit}
			onKeyPress={this.checkEnter} />;

	};

	renderNote = () => {
		/*
		*	This function is called if a Note isn't being edited.
		*	In this case, Note just displays the current task as usual
		*	This function also provides the component with an onClick listener
		*	that gets triggered when a Note is clicked.  The listener calls
		*	edit, which begins the edit operation
		* 	
		*/
			return <div onClick={this.edit}> {this.props.task} </div>;
	};

	/*
	*	This function simply changes the editing state of Note using the 
		setState() method.  setState() re-renders the component, which subsequently
		triggers the renderEdit() function
	*/
	edit = () => {
		this.setState({
			editing:true
		});
	};
	/*	This function gets triggered when a user presses a key
	*	If the key pressed is Enter, we'll call the finishEdit method
	*/
	checkEnter = (e) => {
		//The user hit *enter*, let's finish up 
		if(e.key == 'Enter') {
			this.finishEdit(e);
		}

	};
	finishEdit = (e) => {
		/*	Note will trigger an optional 'onEdit' callback once it has a new value
		*	We will use this to communicate the change to 'App'
		* 	A smarter way to deal with the default value would be to set it through 
		*	'defaultProps'
		*	
		*/

		/*
		*	e.target gets the element that triggered a specific event.  In our case, 
			e.target gets the element that triggered the keyPress
		*/
		alert(e.target.value);
		const value = e.target.value;

		if(this.props.onEdit) {
			this.props.onEdit(value);

			//Exit edit mode.
			this.setState({
				editing:false
			});
		}
	};
}