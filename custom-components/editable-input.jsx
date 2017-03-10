import React from 'react';
import request from 'superagent';

var inputStyle = {
	border: 'none',
	background: 'inherit',
	maxWidth: 'inherit',
	zIndex: '1000',
	width: '70%'
};

/**
 * EditableInput
 *
 * 
 */
class EditableInput extends React.Component {
	/**
     * React 'componentWillMount'
     * Add props to component
     * Set initial state
     * Bind 'this' to functions
     */
	constructor(props) {
        super(props);

        this.state = {
        	value: 'Edit Me'
        };
    }

    handleChange (event){
    	//e.preventDefault();
        event.stopPropagation();

        this.setState({
        	value: event.target.value
        });
    }

    /**
     * React 'render'
     */
	render() {
		return (
			<input type="text" 
					value={this.state.value} 
					onChange={this.handleChange}
					style={inputStyle}  />
		);
	}
}

module.exports = EditableInput;