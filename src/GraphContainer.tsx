import * as React from 'react';
import GraphView from './GraphView';
import { GraphState, modelSelector, GraphModel } from './reducers/graphReducer';
import { connect } from 'react-redux';

interface GraphContainerStateProps {
    model: GraphModel;
}

const mapStateToProps = (state: GraphState) => {
    return {
        model: modelSelector(state)
    };
};

const GraphContainer = ({ model }: GraphContainerStateProps) => {
    return (
        <GraphView model={model} />
    );
};

export default connect(
    mapStateToProps
)(GraphContainer);