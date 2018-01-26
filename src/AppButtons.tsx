import * as React from 'react';
import { GraphState } from './reducers/graphReducer';
import { connect, Dispatch } from 'react-redux';
import { init, updateNodeColor, addNode } from './actions/graph';

export interface GraphButtonsDispatchProps {
    initHandler: () => void;
    updateNodeColorHandler: () => void;
    addNodeHandler: () => void;
}

const mapStateToProps = (state: GraphState) => {
    return {
        ...state
    };
};

const mapDispatchToProps = (dispatch: Dispatch<GraphState>): GraphButtonsDispatchProps => {
    let nodeId = 0;
    return {
        initHandler: () => dispatch(init(
            {
                nodeDataArray: [
                    { key: 'Alpha', color: 'lightblue' },
                    { key: 'Beta', color: 'orange' },
                    { key: 'Gamma', color: 'lightgreen' },
                    { key: 'Delta', color: 'pink' },
                    { key: 'Omega', color: 'grey' }
                ],
                linkDataArray:
                    [
                        { from: 'Alpha', to: 'Beta' },
                        { from: 'Alpha', to: 'Gamma' },                        
                        { from: 'Beta', to: 'Delta' },
                        { from: 'Gamma', to: 'Omega' }
                    ]
            }
        )),
        updateNodeColorHandler: () => dispatch(updateNodeColor()),
        addNodeHandler: () => {
            dispatch(addNode({ nodeKey: 'node' + nodeId, parentNodeKey: 'Delta' }));
            nodeId += 1;
        }
    };
};

const AppButtons = ({ initHandler, updateNodeColorHandler, addNodeHandler }: GraphButtonsDispatchProps) => {
    return (
        <div className="centered-container">
            <div className="inline-element">
                <button type="button" onClick={() => initHandler()} >Init graph</button>
            </div>
            <div className="inline-element">
                <button type="button" onClick={() => updateNodeColorHandler()}>Update node color</button>
            </div>
            <div className="inline-element">
                <button type="button" onClick={() => addNodeHandler()}>Add node</button>
            </div>
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppButtons);
