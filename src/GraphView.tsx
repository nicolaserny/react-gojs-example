import * as React from 'react';
import * as go from 'gojs';
import { Diagram, ToolManager, Node } from 'gojs';
import { GraphModel, NodeModel, LinkModel } from './reducers/graphReducer';

interface GraphViewProps {
    model: GraphModel;
    onNodeSelection: (key: string, isSelected: boolean) => void;
}

interface GojsLinkModel extends go.Model {
    linkDataArray: Object[];
    addLinkDataCollection: (links: Object[]) => void;
    removeLinkDataCollection: (links: Object[]) => void;
}

class GraphView extends React.PureComponent<GraphViewProps> {

    private myDiagram: Diagram;

    constructor(props: GraphViewProps) {
        super(props);
    }

    componentDidMount() {
        this.init();
    }

    componentDidUpdate() {
        this.myDiagram.startTransaction();
        const nodesToAdd = this.props.model.nodeDataArray.filter(e =>
            this.myDiagram.model.nodeDataArray.findIndex((el: NodeModel) =>
                el.key === e.key) === -1);
        this.myDiagram.model.addNodeDataCollection(nodesToAdd);

        const linksToAdd = this.props.model.linkDataArray.filter(e =>
            (this.myDiagram.model as GojsLinkModel).linkDataArray.findIndex((el: LinkModel) =>
                el.from === e.from && el.to === e.to) === -1);
        (this.myDiagram.model as GojsLinkModel).addLinkDataCollection(linksToAdd);

        const nodesToRemove = this.myDiagram.model.nodeDataArray.filter((e: NodeModel) =>
            this.props.model.nodeDataArray.findIndex(el =>
                el.key === e.key) === -1);
        this.myDiagram.model.removeNodeDataCollection(nodesToRemove);

        const linksToRemove = (this.myDiagram.model as GojsLinkModel).linkDataArray.filter((e: LinkModel) =>
            this.props.model.linkDataArray.findIndex(el =>
                el.from === e.from && el.to === e.to) === -1);
        (this.myDiagram.model as GojsLinkModel).removeLinkDataCollection(linksToRemove);

        this.myDiagram.model.applyIncrementalJson({
            class: 'go.GraphLinksModel',
            incremental: 1,
            nodeKeyProperty: 'key',
            linkKeyProperty: 'key',
            modifiedNodeData: this.props.model.nodeDataArray,
            modifiedLinkData: this.props.model.linkDataArray,
        });
        this.myDiagram.updateAllRelationshipsFromData();
        this.myDiagram.updateAllTargetBindings();
        this.myDiagram.commitTransaction('updated');
    }

    init() {
        const $ = go.GraphObject.make;  // for conciseness in defining templates

        this.myDiagram = $(
            go.Diagram,
            'myDiagramDiv',  // create a Diagram for the DIV HTML element
            {
                initialContentAlignment: go.Spot.LeftCenter,
                layout: $(
                    go.TreeLayout,
                    {
                        angle: 0,
                        arrangement: go.TreeLayout.ArrangementVertical,
                        treeStyle: go.TreeLayout.StyleLayered
                    }),
                isReadOnly: true
            });

        this.myDiagram.allowHorizontalScroll = true;
        this.myDiagram.allowVerticalScroll = true;
        this.myDiagram.allowZoom = false;
        this.myDiagram.allowSelect = true;
        this.myDiagram.autoScale = Diagram.Uniform;
        this.myDiagram.contentAlignment = go.Spot.LeftCenter;
        this.myDiagram.toolManager.panningTool.isEnabled = false;
        this.myDiagram.toolManager.mouseWheelBehavior = ToolManager.WheelScroll;

        // define a simple Node template
        this.myDiagram.nodeTemplate =
            $(
                go.Node,
                'Auto',  // the Shape will go around the TextBlock
                { selectionChanged: (node: Node) => this.props.onNodeSelection(node.key as string, node.isSelected) },
                $(
                    go.Shape,
                    'RoundedRectangle',
                    { strokeWidth: 0 },
                    // Shape.fill is bound to Node.data.color
                    new go.Binding('fill', 'color')),
                $(
                    go.TextBlock,
                    { margin: 8 },  // some room around the text
                    // TextBlock.text is bound to Node.data.key
                    new go.Binding('text', 'key'))
            );

        // create the model data that will be represented by Nodes and Links
        this.myDiagram.model = new go.GraphLinksModel(this.props.model.nodeDataArray, this.props.model.linkDataArray);
    }
    render() {
        return (
            <div id="myDiagramDiv" style={{ width: '70%', flex: '1 1 auto', margin: 'auto' }} />
        );
    }
}

export default GraphView;