import { actionCreatorFactory } from 'typescript-fsa';
import { NodeModel } from '../reducers/diagramReducer';
import { DiagramModel, LinkModel } from 'react-gojs';

const actionCreator = actionCreatorFactory('DIAGRAM');

export interface UpdateNodeTextEvent {
    key: string;
    text: string;
}

export const init = actionCreator<DiagramModel<NodeModel, LinkModel>>('INIT');
export const updateNodeColor = actionCreator('UPDATE_NODE_COLOR');
export const UpdateNodeText = actionCreator<UpdateNodeTextEvent>('UPDATE_NODE_TEXT');
export const addNode = actionCreator<string>('ADD_NODE');
export const removeNode = actionCreator<string>('REMOVE_NODE');
export const removeLink = actionCreator<LinkModel>('REMOVE_LINK');
export const nodeSelected = actionCreator<string>('NODE_SELECTED');
export const nodeDeselected = actionCreator<string>('NODE_DESELECTED');
