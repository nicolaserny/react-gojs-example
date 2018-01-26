import * as React from 'react';
import { GraphState, nodeSelectionSelector } from './reducers/graphReducer';
import { connect } from 'react-redux';

interface SelectionDetailsStateProps {
    nodes: string[];
}

const mapStateToProps = (state: GraphState): SelectionDetailsStateProps => {
    return {
        nodes: nodeSelectionSelector(state)
    };
};

const SelectionDetails = ({ nodes }: SelectionDetailsStateProps) => {
    const message = nodes.reduce((result: string, current: string) => result + ' ' + current, '');
    return (
        <div>{nodes.length === 0 ? 'No selection' : 'Selection: ' + message}</div>
    );
};

export default connect(
    mapStateToProps
)(SelectionDetails);