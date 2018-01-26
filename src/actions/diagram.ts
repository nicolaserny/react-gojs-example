import { actionCreatorFactory } from 'typescript-fsa';
import { NodeModel } from '../reducers/diagramReducer';
import { DiagramModel, LinkModel } from '../model/model';

const actionCreator = actionCreatorFactory('DIAGRAM');

export const init = actionCreator<DiagramModel<NodeModel, LinkModel>>('INIT');
export const updateNodeColor = actionCreator('UPDATE_NODE_COLOR');
export const addNode = actionCreator<string>('ADD_NODE');
export const nodeSelected = actionCreator<string>('NODE_SELECTED');
export const nodeDeselected = actionCreator<string>('NODE_DESELECTED');