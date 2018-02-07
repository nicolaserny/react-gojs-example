import * as React from 'react';
import MyDiagram from './MyDiagram';
import { DiagramState, modelSelector, NodeModel } from '../reducers/diagramReducer';
import { connect, Dispatch } from 'react-redux';
import { nodeSelected, nodeDeselected } from '../actions/diagram';
import { DiagramModel, LinkModel } from 'react-gojs';

interface MyDiagramContainerStateProps {
    model: DiagramModel<NodeModel, LinkModel>;
}

interface MyDiagramContainerDispatchProps {
    onNodeSelection: (key: string, isSelected: boolean) => void;
}

const mapStateToProps = (state: DiagramState) => {
    return {
        model: modelSelector(state)
    };
};

const mapDispatchToProps = (dispatch: Dispatch<DiagramState>): MyDiagramContainerDispatchProps => {
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

const MyDiagramContainer =
    ({ model, onNodeSelection }: MyDiagramContainerStateProps & MyDiagramContainerDispatchProps) => {
        return (
            <MyDiagram
                model={model}
                onNodeSelection={onNodeSelection}
            />
        );
    };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyDiagramContainer);