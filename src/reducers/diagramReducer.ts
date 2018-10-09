import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Reducer } from 'redux';
import {
    init,
    updateNodeColor,
    addNode,
    nodeSelected,
    nodeDeselected,
    removeNode,
    removeLink,
    UpdateNodeText,
    UpdateNodeTextEvent
} from '../actions/diagram';
import { BaseNodeModel, DiagramModel, LinkModel } from 'react-gojs';

export interface DiagramState {
    model: DiagramModel<NodeModel, LinkModel>;
    selectedNodeKeys: string[];
}

export interface NodeModel extends BaseNodeModel {
    label: string;
    color: string;
}

const initHandler = (state: DiagramState, payload: DiagramModel<NodeModel, LinkModel>): DiagramState => {
    return {
        ...state,
        model: payload
    };
};

const colors = ['lightblue', 'orange', 'lightgreen', 'pink', 'yellow', 'red', 'grey', 'magenta', 'cyan'];

const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
};

const updateNodeColorHandler = (state: DiagramState): DiagramState => {
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

const updateNodeTextHandler = (state: DiagramState, payload: UpdateNodeTextEvent): DiagramState => {
    const nodeIndex = state.model.nodeDataArray.findIndex(node => node.key === payload.key);

    return {
        ...state,
        model: {
            ...state.model,
            nodeDataArray: [
                ...state.model.nodeDataArray.slice(0, nodeIndex),
                {
                    ...state.model.nodeDataArray[nodeIndex],
                    label: payload.text
                },
                ...state.model.nodeDataArray.slice(nodeIndex + 1)
            ]
        }
    };
};

const addNodeHandler = (state: DiagramState, payload: string): DiagramState => {
    const linksToAdd: LinkModel[] = state.selectedNodeKeys.map(parent => {
        return { from: parent, to: payload };
    });
    return {
        ...state,
        model: {
            ...state.model,
            nodeDataArray: [...state.model.nodeDataArray, { key: payload, label: payload, color: getRandomColor() }],
            linkDataArray:
                linksToAdd.length > 0
                    ? [...state.model.linkDataArray].concat(linksToAdd)
                    : [...state.model.linkDataArray]
        }
    };
};

const removeNodeHandler = (state: DiagramState, payload: string): DiagramState => {
    const nodeToRemoveIndex = state.model.nodeDataArray.findIndex(node => node.key === payload);
    if (nodeToRemoveIndex === -1) {
        return state;
    }
    return {
        ...state,
        model: {
            ...state.model,
            nodeDataArray: [
                ...state.model.nodeDataArray.slice(0, nodeToRemoveIndex),
                ...state.model.nodeDataArray.slice(nodeToRemoveIndex + 1)
            ]
        }
    };
};

const removeLinkHandler = (state: DiagramState, payload: LinkModel): DiagramState => {
    const linkToRemoveIndex = state.model.linkDataArray.findIndex(
        link => link.from === payload.from && link.to === payload.to
    );
    if (linkToRemoveIndex === -1) {
        return state;
    }
    return {
        ...state,
        model: {
            ...state.model,
            linkDataArray: [
                ...state.model.linkDataArray.slice(0, linkToRemoveIndex),
                ...state.model.linkDataArray.slice(linkToRemoveIndex + 1)
            ]
        }
    };
};

const nodeSelectedHandler = (state: DiagramState, payload: string): DiagramState => {
    return {
        ...state,
        selectedNodeKeys: [...state.selectedNodeKeys, payload]
    };
};

const nodeDeselectedHandler = (state: DiagramState, payload: string): DiagramState => {
    const nodeIndexToRemove = state.selectedNodeKeys.findIndex(key => key === payload);
    if (nodeIndexToRemove === -1) {
        return state;
    }
    return {
        ...state,
        selectedNodeKeys: [
            ...state.selectedNodeKeys.slice(0, nodeIndexToRemove),
            ...state.selectedNodeKeys.slice(nodeIndexToRemove + 1)
        ]
    };
};

export const diagramReducer: Reducer<DiagramState> = reducerWithInitialState<DiagramState>({
    model: {
        nodeDataArray: [{ key: 'Root', color: 'lightblue', label: 'Root' }],
        linkDataArray: []
    },
    selectedNodeKeys: []
})
    .case(init, initHandler)
    .case(updateNodeColor, updateNodeColorHandler)
    .case(UpdateNodeText, updateNodeTextHandler)
    .case(addNode, addNodeHandler)
    .case(removeNode, removeNodeHandler)
    .case(removeLink, removeLinkHandler)
    .case(nodeSelected, nodeSelectedHandler)
    .case(nodeDeselected, nodeDeselectedHandler)
    .build();

export const modelSelector = (state: DiagramState) => state.model;
export const nodeSelectionSelector = (state: DiagramState) => state.selectedNodeKeys;
