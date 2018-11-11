import React, { Component } from 'react';
import {
    FormGroup,
    FormControl,
    InputGroup,
    Button,
} from 'react-bootstrap';

class Quote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        const { value } = event.target;

        this.setState({
            quote: value,
        });
    }

    handleClick(event) {
        const { timestamp, client, onQuote } = this.props;
        const { quote } = this.state;
        onQuote(timestamp, client, quote);
    }

    render() {
        return (
            <FormGroup>
                <InputGroup>
                    <FormControl type="text" onChange={this.handleChange} />
                    <InputGroup.Button>
                        <Button bsStyle="primary" onClick={this.handleClick}>Quote</Button>
                    </InputGroup.Button>
                </InputGroup>
            </FormGroup>
        );
    }
}

export default Quote;
