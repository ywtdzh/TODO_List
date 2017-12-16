import React, {Component} from "react";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";

class FieldInputGroup extends Component {
    render() {
        return (
            <FormGroup
                validationState={this.props.validationState}
                controlId={this.props.controlId}>
                <ControlLabel>{this.props.label}</ControlLabel>
                <FormControl
                    name={this.props.controlId}
                    value={this.props.value}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                    componentClass={this.props.componentClass}
                />
            </FormGroup>
        );
    }
}

export default FieldInputGroup