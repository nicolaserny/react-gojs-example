import { actionCreatorFactory } from 'typescript-fsa';
import { GraphModel } from '../reducers/graphReducer';

const actionCreator = actionCreatorFactory('GRAPH');

export const init = actionCreator<GraphModel>('INIT');
export const updateNodeColor = actionCreator('UPDATE_NODE_COLOR');
export const addNode = actionCreator<string>('ADD_NODE');
export const nodeSelected = actionCreator<string>('NODE_SELECTED');
export const nodeDeselected = actionCreator<string>('NODE_DESELECTED');