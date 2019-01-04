import React from 'react';
import MyDiagram from './MyDiagram';
import { DiagramState, modelSelector, NodeModel } from '../reducers/diagramReducer';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
    nodeSelected,
    nodeDeselected,
    removeNode,
    removeLink,
    UpdateNodeTextEvent,
    UpdateNodeText
} from '../actions/diagram';
import { DiagramModel, LinkModel, ModelChangeEvent, ModelChangeEventType } from 'react-gojs';
import { Action } from 'typescript-fsa';

interface MyDiagramContainerStateProps {
    model: DiagramModel<NodeModel, LinkModel>;
}

interface MyDiagramContainerDispatchProps {
    onNodeSelection: (key: string, isSelected: boolean) => void;
    onModelChange: (event: ModelChangeEvent<NodeModel, LinkModel>) => void;
    onTextChange: (event: UpdateNodeTextEvent) => void;
}

const mapStateToProps = (state: DiagramState) => {
    return {
        model: modelSelector(state)
    };
};

const mapDispatchToProps = (
    dispatch: Dispatch<Action<string> | Action<LinkModel> | Action<UpdateNodeTextEvent>>
): MyDiagramContainerDispatchProps => {
    return {
        onNodeSelection: (key: string, isSelected: boolean) => {
            if (isSelected) {
                dispatch(nodeSelected(key));
            } else {
                dispatch(nodeDeselected(key));
            }
        },
        onModelChange: (event: ModelChangeEvent<NodeModel, LinkModel>) => {
            switch (event.eventType) {
                case ModelChangeEventType.Remove:
                    if (event.nodeData) {
                        dispatch(removeNode(event.nodeData.key));
                    }
                    if (event.linkData) {
                        dispatch(removeLink(event.linkData));
                    }
                    break;
                default:
                    break;
            }
        },
        onTextChange: (event: UpdateNodeTextEvent) => {
            dispatch(UpdateNodeText(event));
        }
    };
};

const MyDiagramContainer = ({
    model,
    onNodeSelection,
    onModelChange,
    onTextChange
}: MyDiagramContainerStateProps & MyDiagramContainerDispatchProps) => {
    return (
        <MyDiagram
            model={model}
            onNodeSelection={onNodeSelection}
            onModelChange={onModelChange}
            onTextChange={onTextChange}
        />
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyDiagramContainer);
