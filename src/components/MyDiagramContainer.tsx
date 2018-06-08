import * as React from 'react';
import MyDiagram from './MyDiagram';
import { DiagramState, modelSelector, NodeModel } from '../reducers/diagramReducer';
import { connect, Dispatch } from 'react-redux';
import { nodeSelected, nodeDeselected, removeNode, removeLink } from '../actions/diagram';
import { DiagramModel, LinkModel, ModelChangeEvent, ModelChangeEventType } from 'react-gojs';
import { Action } from 'typescript-fsa';

interface MyDiagramContainerProps {
    model: DiagramModel<NodeModel, LinkModel>;
    onNodeSelection: (key: string, isSelected: boolean) => void;
    onModelChange: (event: ModelChangeEvent<NodeModel, LinkModel>) => void;
}

interface MyDiagramContainerDispatchProps {
    onNodeSelection: (key: string, isSelected: boolean) => void;
    onModelChange: (event: ModelChangeEvent<NodeModel, LinkModel>) => void;
}

const mapStateToProps = (state: DiagramState) => {
    return {
        model: modelSelector(state)
    };
};

const mapDispatchToProps =
    (dispatch: Dispatch<Action<string> | Action<LinkModel>>): MyDiagramContainerDispatchProps => {
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
                    case (ModelChangeEventType.Remove):
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
            }
        };
    };

class MyDiagramContainer extends React.Component<MyDiagramContainerProps, {}> {
    render() {
        return (
        <MyDiagram
                model={this.props.model}
                onNodeSelection={this.props.onNodeSelection}
                onModelChange={this.props.onModelChange}
        />
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyDiagramContainer);