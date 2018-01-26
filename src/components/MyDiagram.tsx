import * as React from 'react';
import * as go from 'gojs';
import { Diagram, ToolManager, Node } from 'gojs';
import { NodeModel } from '../reducers/diagramReducer';
import GojsDiagram from './GojsDiagram';
import { DiagramModel, LinkModel } from '../model/model';
import './MyDiagram.css';

interface MyDiagramProps {
    model: DiagramModel<NodeModel, LinkModel>;
    onNodeSelection: (key: string, isSelected: boolean) => void;
}

class MyDiagram extends React.PureComponent<MyDiagramProps> {

    constructor(props: MyDiagramProps) {
        super(props);
        this.createDiagram = this.createDiagram.bind(this);
    }
    render() {
        return (
            <GojsDiagram
                diagramId="myDiagramDiv"
                model={this.props.model}
                createDiagram={this.createDiagram}
                className="myDiagram"
            />
        );
    }

    private createDiagram(diagramId: string) {
        const $ = go.GraphObject.make;

        const myDiagram: Diagram = $(
            go.Diagram,
            diagramId,
            {
                initialContentAlignment: go.Spot.LeftCenter,
                layout: $(
                    go.TreeLayout,
                    {
                        angle: 0,
                        arrangement: go.TreeLayout.ArrangementVertical,
                        treeStyle: go.TreeLayout.StyleLayered
                    }),
                isReadOnly: true,
                allowHorizontalScroll: true,
                allowVerticalScroll: true,
                allowZoom: false,
                allowSelect: true,
                autoScale: Diagram.Uniform,
                contentAlignment: go.Spot.LeftCenter
            });

        myDiagram.toolManager.panningTool.isEnabled = false;
        myDiagram.toolManager.mouseWheelBehavior = ToolManager.WheelScroll;

        myDiagram.nodeTemplate =
            $(
                go.Node,
                'Auto',
                { selectionChanged: (node: Node) => this.props.onNodeSelection(node.key as string, node.isSelected) },
                $(
                    go.Shape,
                    'RoundedRectangle',
                    { strokeWidth: 0 },
                    new go.Binding('fill', 'color')),
                $(
                    go.TextBlock,
                    { margin: 8 },
                    new go.Binding('text', 'key'))
            );

        return myDiagram;
    }
}

export default MyDiagram;