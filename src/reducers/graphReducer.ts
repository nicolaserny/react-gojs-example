import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Reducer } from 'redux';
import { init, updateNodeColor, addNode, AddNodeParamter, } from '../actions/graph';

export interface GraphState {
    model: GraphModel;
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

const addNodeHandler = (state: GraphState, payload: AddNodeParamter): GraphState => {
    return {
        ...state,
        model: {
            ...state.model,
            nodeDataArray: [...state.model.nodeDataArray, { key: payload.nodeKey, color: getRandomColor() }],
            linkDataArray: payload.parentNodeKey ?
                [...state.model.linkDataArray, { from: payload.parentNodeKey, to: payload.nodeKey }] :
                [...state.model.linkDataArray]
        }
    };
};

export const graphReducer: Reducer<GraphState> =
    reducerWithInitialState<GraphState>({ model: { nodeDataArray: [], linkDataArray: [] } })
        .case(init, initHandler)
        .case(updateNodeColor, updateNodeColorHandler)
        .case(addNode, addNodeHandler)
        .build();

export const modelSelector = (state: GraphState) => state.model;