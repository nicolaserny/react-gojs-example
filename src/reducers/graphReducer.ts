import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Reducer } from 'redux';
import { init, updateNodeColor, addNode, nodeSelected, nodeDeselected, } from '../actions/graph';

export interface GraphState {
    model: GraphModel;
    selectedNodeKeys: string[];
}

export interface GraphModel {
    nodeDataArray: NodeModel[];
    linkDataArray: LinkModel[];
}

export interface NodeModel {
    key: string;
    color: string;
}

export interface LinkModel {
    from: string;
    to: string;
}

const initHandler = (state: GraphState, payload: GraphModel): GraphState => {
    return {
        ...state,
        model: payload
    };
};

const colors = [
    'lightblue',
    'orange',
    'lightgreen',
    'pink',
    'yellow',
    'red',
    'grey',
    'magenta',
    'cyan'
];

const getRandomColor = () => {
    return colors[Math.floor(Math.random() * (colors.length))];
};

const updateNodeColorHandler = (state: GraphState): GraphState => {
    const updatedNodes = state.model.nodeDataArray.map(node => {
        return {
            ...node,
            color: getRandomColor()
        };
    });

    return {
        ...state,
        model: {
            ...state.model,
            nodeDataArray: updatedNodes
        }
    };
};

const addNodeHandler = (state: GraphState, payload: string): GraphState => {
    const linksToAdd: LinkModel[] = state.selectedNodeKeys.map(parent => {
        return { from: parent, to: payload };
    }
    );
    return {
        ...state,
        model: {
            ...state.model,
            nodeDataArray: [...state.model.nodeDataArray, { key: payload, color: getRandomColor() }],
            linkDataArray: linksToAdd.length > 0 ?
                [...state.model.linkDataArray].concat(linksToAdd) :
                [...state.model.linkDataArray]
        }
    };
};

const nodeSelectedHandler = (state: GraphState, payload: string): GraphState => {
    return {
        ...state,
        selectedNodeKeys: [
            ...state.selectedNodeKeys,
            payload
        ]
    };
};

const nodeDeselectedHandler = (state: GraphState, payload: string): GraphState => {
    const nodeIndexToRemove = state.selectedNodeKeys.findIndex(key => key === payload);
    if (nodeIndexToRemove === -1) {
        return {
            ...state
        };
    }
    return {
        ...state,
        selectedNodeKeys: [
            ...state.selectedNodeKeys.slice(0, nodeIndexToRemove),
            ...state.selectedNodeKeys.slice(nodeIndexToRemove + 1)
        ]
    };
};

export const graphReducer: Reducer<GraphState> =
    reducerWithInitialState<GraphState>(
        { model: { nodeDataArray: [{ key: 'Root', color: 'lightblue' }], linkDataArray: [] }, selectedNodeKeys: [] })
        .case(init, initHandler)
        .case(updateNodeColor, updateNodeColorHandler)
        .case(addNode, addNodeHandler)
        .case(nodeSelected, nodeSelectedHandler)
        .case(nodeDeselected, nodeDeselectedHandler)
        .build();

export const modelSelector = (state: GraphState) => state.model;
export const nodeSelectionSelector = (state: GraphState) => state.selectedNodeKeys;