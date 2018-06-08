import * as React from 'react';
import { DiagramState, nodeSelectionSelector } from '../reducers/diagramReducer';
import { connect } from 'react-redux';

interface SelectionDetailsStateProps {
    nodes: string[];
}

const mapStateToProps = (state: DiagramState): SelectionDetailsStateProps => {
    return {
        nodes: nodeSelectionSelector(state)
    };
};

class SelectionDetails extends React.Component<SelectionDetailsStateProps, {}> {
    message = this.props.nodes.reduce((result: string, current: string) => result + ' ' + current, '');
    render() {
        return <div> {this.props.nodes.length === 0 ? 'No selection' : 'Selection: ' + this.message} </div>;
    }
}

export default connect(
    mapStateToProps
)(SelectionDetails);