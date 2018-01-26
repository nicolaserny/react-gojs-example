import { actionCreatorFactory } from 'typescript-fsa';
import { GraphModel } from '../reducers/graphReducer';

const actionCreator = actionCreatorFactory('GRAPH');

export interface AddNodeParamter {
    nodeKey: string;
    parentNodeKey?: string;
}
export const init = actionCreator<GraphModel>('INIT');
export const updateNodeColor = actionCreator('UPDATE_NODE_COLOR');
export const addNode = actionCreator<AddNodeParamter>('ADD_NODE');