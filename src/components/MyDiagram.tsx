import React from 'react';
import go from 'gojs';
import { Diagram, ToolManager } from 'gojs';
import { NodeModel } from '../reducers/diagramReducer';
import { DiagramModel, LinkModel, GojsDiagram, ModelChangeEvent } from 'react-gojs';
import './MyDiagram.css';
import { UpdateNodeTextEvent } from '../actions/diagram';

interface MyDiagramProps {
    model: DiagramModel<NodeModel, LinkModel>;
    onNodeSelection: (key: string, isSelected: boolean) => void;
    onModelChange: (event: ModelChangeEvent<NodeModel, LinkModel>) => void;
    onTextChange: (event: UpdateNodeTextEvent) => void;
}

class MyDiagram extends React.PureComponent<MyDiagramProps> {
    constructor(props: MyDiagramProps) {
        super(props);
        this.createDiagram = this.createDiagram.bind(this);
        this.onTextEdited = this.onTextEdited.bind(this);
    }
    render() {
        return (
            <GojsDiagram
                diagramId="myDiagramDiv"
                model={this.props.model}
                createDiagram={this.createDiagram}
                className="myDiagram"
                onModelChange={this.props.onModelChange}
            />
        );
    }

    private createDiagram(diagramId: string): Diagram {
        const $ = go.GraphObject.make;

        const myDiagram: Diagram = $(go.Diagram, diagramId, {
            initialContentAlignment: go.Spot.LeftCenter,
            layout: $(go.TreeLayout, {
                angle: 0,
                arrangement: go.TreeLayout.ArrangementVertical,
                treeStyle: go.TreeLayout.StyleLayered
            }),
            isReadOnly: false,
            allowHorizontalScroll: true,
            allowVerticalScroll: true,
            allowZoom: false,
            allowSelect: true,
            autoScale: Diagram.Uniform,
            contentAlignment: go.Spot.LeftCenter,
            TextEdited: this.onTextEdited
        });

        myDiagram.toolManager.panningTool.isEnabled = false;
        myDiagram.toolManager.mouseWheelBehavior = ToolManager.WheelScroll;

        myDiagram.nodeTemplate = $(
            go.Node,
            'Auto',
            {
                selectionChanged: node => this.props.onNodeSelection(node.key as string, node.isSelected)
            },
            $(go.Shape, 'RoundedRectangle', { strokeWidth: 0 }, new go.Binding('fill', 'color')),
            $(go.TextBlock, { margin: 8, editable: true }, new go.Binding('text', 'label'))
        );

        return myDiagram;
    }

    private onTextEdited(e: go.DiagramEvent) {
        const tb = e.subject;
        if (tb === null) {
            return;
        }
        const node = tb.part;
        if (node instanceof go.Node && this.props.onTextChange) {
            this.props.onTextChange({ key: node.key as string, text: tb.text });
        }
    }
}

export default MyDiagram;
