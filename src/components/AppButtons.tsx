import * as React from 'react';
import { DiagramState, NodeModel } from '../reducers/diagramReducer';
import { connect, Dispatch } from 'react-redux';
import { init, updateNodeColor, addNode } from '../actions/diagram';
import { Action } from 'typescript-fsa';
import { DiagramModel, LinkModel } from 'react-gojs';

export interface AppButtonsDispatchProps {
    initHandler: () => void;
    updateNodeColorHandler: () => void;
    addNodeHandler: () => void;
}

const mapStateToProps = (state: DiagramState) => {
    return {
        ...state
    };
};

const mapDispatchToProps = (
    dispatch: Dispatch<Action<DiagramModel<NodeModel, LinkModel>> | Action<void> | Action<string>>
): AppButtonsDispatchProps => {
    let nodeId = 0;
    return {
        initHandler: () =>
            dispatch(
                init({
                    nodeDataArray: [
                        { key: 'Alpha', color: 'lightblue' },
                        { key: 'Beta', color: 'orange' },
                        { key: 'Gamma', color: 'lightgreen' },
                        { key: 'Delta', color: 'pink' },
                        { key: 'Omega', color: 'grey' }
                    ],
                    linkDataArray: [
                        { from: 'Alpha', to: 'Beta' },
                        { from: 'Alpha', to: 'Gamma' },
                        { from: 'Beta', to: 'Delta' },
                        { from: 'Gamma', to: 'Omega' }
                    ]
                })
            ),
        updateNodeColorHandler: () => dispatch(updateNodeColor()),
        addNodeHandler: () => {
            dispatch(addNode('node' + nodeId));
            nodeId += 1;
        }
    };
};

const AppButtons = ({ initHandler, updateNodeColorHandler, addNodeHandler }: AppButtonsDispatchProps) => {
    return (
        <div className="centered-container">
            <div className="inline-element">
                <button type="button" onClick={() => initHandler()}>
                    Init diagram
                </button>
            </div>
            <div className="inline-element">
                <button type="button" onClick={() => updateNodeColorHandler()}>
                    Update node color
                </button>
            </div>
            <div className="inline-element">
                <button type="button" onClick={() => addNodeHandler()}>
                    Add node with selected node(s) as parent(s)
                </button>
            </div>
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppButtons);
