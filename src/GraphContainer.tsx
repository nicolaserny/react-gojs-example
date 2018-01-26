import * as React from 'react';
import GraphView from './GraphView';
import { GraphState, modelSelector, GraphModel } from './reducers/graphReducer';
import { connect, Dispatch } from 'react-redux';
import { nodeSelected, nodeDeselected } from './actions/graph';

interface GraphContainerStateProps {
    model: GraphModel;
}

interface GraphContainerDispatchProps {
    onNodeSelection: (key: string, isSelected: boolean) => void;
}

const mapStateToProps = (state: GraphState) => {
    return {
        model: modelSelector(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<GraphState>): GraphContainerDispatchProps => {
    return {
        onNodeSelection: (key: string, isSelected: boolean) => {
            if (isSelected) {
                dispatch(nodeSelected(key));
            } else {
                dispatch(nodeDeselected(key));
            }
        }
    };
};

const GraphContainer = ({ model, onNodeSelection }: GraphContainerStateProps & GraphContainerDispatchProps) => {
    return (
        <GraphView
            model={model}
            onNodeSelection={onNodeSelection}
        />
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GraphContainer);