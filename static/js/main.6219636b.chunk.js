(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{25:function(e,t,n){e.exports=n(40)},30:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},39:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(9),c=n.n(r),l=n(10),i=n(11),d=n(14),u=n(12),s=n(15),m=(n(30),n(2)),f=n(5),b=n(23),g=Object(b.actionCreatorFactory)("DIAGRAM"),y=g("INIT"),h=g("UPDATE_NODE_COLOR"),p=g("UPDATE_NODE_TEXT"),O=g("ADD_NODE"),D=g("REMOVE_NODE"),j=g("REMOVE_LINK"),E=g("NODE_SELECTED"),v=g("NODE_DESELECTED"),k=Object(f.b)(function(e){return Object(m.a)({},e)},function(e){var t=0;return{initHandler:function(){return e(y({nodeDataArray:[{key:"Alpha",label:"Alpha",color:"lightblue"},{key:"Beta",label:"Beta",color:"orange"},{key:"Gamma",label:"Gamma",color:"lightgreen"},{key:"Delta",label:"Delta",color:"pink"},{key:"Omega",label:"Omega",color:"grey"}],linkDataArray:[{from:"Alpha",to:"Beta"},{from:"Alpha",to:"Gamma"},{from:"Beta",to:"Delta"},{from:"Gamma",to:"Omega"}]}))},updateNodeColorHandler:function(){return e(h())},addNodeHandler:function(){e(O("node"+t)),t+=1}}})(function(e){var t=e.initHandler,n=e.updateNodeColorHandler,a=e.addNodeHandler;return o.a.createElement("div",{className:"centered-container"},o.a.createElement("div",{className:"inline-element"},o.a.createElement("button",{type:"button",onClick:function(){return t()}},"Init diagram")),o.a.createElement("div",{className:"inline-element"},o.a.createElement("button",{type:"button",onClick:function(){return n()}},"Update node color")),o.a.createElement("div",{className:"inline-element"},o.a.createElement("button",{type:"button",onClick:function(){return a()}},"Add node with selected node(s) as parent(s)")))}),A=n(7),N=n(1),w=n.n(N),C=n(13),x=(n(37),function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(d.a)(this,Object(u.a)(t).call(this,e))).createDiagram=n.createDiagram.bind(Object(A.a)(n)),n.onTextEdited=n.onTextEdited.bind(Object(A.a)(n)),n}return Object(s.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement(C.GojsDiagram,{diagramId:"myDiagramDiv",model:this.props.model,createDiagram:this.createDiagram,className:"myDiagram",onModelChange:this.props.onModelChange})}},{key:"createDiagram",value:function(e){var t=this,n=w.a.GraphObject.make,a=n(w.a.Diagram,e,{initialContentAlignment:w.a.Spot.LeftCenter,layout:n(w.a.TreeLayout,{angle:0,arrangement:w.a.TreeLayout.ArrangementVertical,treeStyle:w.a.TreeLayout.StyleLayered}),isReadOnly:!1,allowHorizontalScroll:!0,allowVerticalScroll:!0,allowZoom:!1,allowSelect:!0,autoScale:N.Diagram.Uniform,contentAlignment:w.a.Spot.LeftCenter,TextEdited:this.onTextEdited});return a.toolManager.panningTool.isEnabled=!1,a.toolManager.mouseWheelBehavior=N.ToolManager.WheelScroll,a.nodeTemplate=n(w.a.Node,"Auto",{selectionChanged:function(e){return t.props.onNodeSelection(e.key,e.isSelected)}},n(w.a.Shape,"RoundedRectangle",{strokeWidth:0},new w.a.Binding("fill","color")),n(w.a.TextBlock,{margin:8,editable:!0},new w.a.Binding("text","label"))),a}},{key:"onTextEdited",value:function(e){var t=e.subject;if(null!==t){var n=t.part;n instanceof w.a.Node&&this.props.onTextChange&&this.props.onTextChange({key:n.key,text:t.text})}}}]),t}(o.a.PureComponent)),T=n(3),S=n(24),M=["lightblue","orange","lightgreen","pink","yellow","red","grey","magenta","cyan"],R=function(){return M[Math.floor(Math.random()*M.length)]},I=Object(S.reducerWithInitialState)({model:{nodeDataArray:[{key:"Root",color:"lightblue",label:"Root"}],linkDataArray:[]},selectedNodeKeys:[]}).case(y,function(e,t){return Object(m.a)({},e,{model:t})}).case(h,function(e){var t=e.model.nodeDataArray.map(function(e){return Object(m.a)({},e,{color:R()})});return Object(m.a)({},e,{model:Object(m.a)({},e.model,{nodeDataArray:t})})}).case(p,function(e,t){var n=e.model.nodeDataArray.findIndex(function(e){return e.key===t.key});return Object(m.a)({},e,{model:Object(m.a)({},e.model,{nodeDataArray:[].concat(Object(T.a)(e.model.nodeDataArray.slice(0,n)),[Object(m.a)({},e.model.nodeDataArray[n],{label:t.text})],Object(T.a)(e.model.nodeDataArray.slice(n+1)))})})}).case(O,function(e,t){var n=e.selectedNodeKeys.map(function(e){return{from:e,to:t}});return Object(m.a)({},e,{model:Object(m.a)({},e.model,{nodeDataArray:[].concat(Object(T.a)(e.model.nodeDataArray),[{key:t,label:t,color:R()}]),linkDataArray:n.length>0?Object(T.a)(e.model.linkDataArray).concat(n):Object(T.a)(e.model.linkDataArray)})})}).case(D,function(e,t){var n=e.model.nodeDataArray.findIndex(function(e){return e.key===t});return-1===n?e:Object(m.a)({},e,{model:Object(m.a)({},e.model,{nodeDataArray:[].concat(Object(T.a)(e.model.nodeDataArray.slice(0,n)),Object(T.a)(e.model.nodeDataArray.slice(n+1)))})})}).case(j,function(e,t){var n=e.model.linkDataArray.findIndex(function(e){return e.from===t.from&&e.to===t.to});return-1===n?e:Object(m.a)({},e,{model:Object(m.a)({},e.model,{linkDataArray:[].concat(Object(T.a)(e.model.linkDataArray.slice(0,n)),Object(T.a)(e.model.linkDataArray.slice(n+1)))})})}).case(E,function(e,t){return Object(m.a)({},e,{selectedNodeKeys:[].concat(Object(T.a)(e.selectedNodeKeys),[t])})}).case(v,function(e,t){var n=e.selectedNodeKeys.findIndex(function(e){return e===t});return-1===n?e:Object(m.a)({},e,{selectedNodeKeys:[].concat(Object(T.a)(e.selectedNodeKeys.slice(0,n)),Object(T.a)(e.selectedNodeKeys.slice(n+1)))})}).build(),L=function(e){return e.model},K=function(e){return e.selectedNodeKeys},B=Object(f.b)(function(e){return{model:L(e)}},function(e){return{onNodeSelection:function(t,n){e(n?E(t):v(t))},onModelChange:function(t){switch(t.eventType){case C.ModelChangeEventType.Remove:t.nodeData&&e(D(t.nodeData.key)),t.linkData&&e(j(t.linkData))}},onTextChange:function(t){e(p(t))}}})(function(e){var t=e.model,n=e.onNodeSelection,a=e.onModelChange,r=e.onTextChange;return o.a.createElement(x,{model:t,onNodeSelection:n,onModelChange:a,onTextChange:r})}),_=Object(f.b)(function(e){return{nodes:K(e)}})(function(e){var t=e.nodes,n=t.reduce(function(e,t){return e+" "+t},"");return o.a.createElement("div",null,0===t.length?"No selection":"Selection: "+n)}),G=n(38),W=function(e){function t(){return Object(l.a)(this,t),Object(d.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"App"},o.a.createElement("header",{className:"App-header"},o.a.createElement("img",{src:G,className:"App-logo",alt:"logo"}),o.a.createElement("h1",{className:"App-title"},"React + Redux + GoJS Example")),o.a.createElement(k,null),o.a.createElement(_,null),o.a.createElement(B,null))}}]),t}(o.a.Component),H=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function U(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}n(39);var V,J=n(8),P="2bf842e3b26658c511d35a25403f7efb0bab2d66ce824df0595312f4e80a7a0424cab82a5180d89086ad4efb1b7fc9dfd897602e921b0369e761d48e41e0d6adb23024b2170a40d9b6132096c9fc2af3ac7963e2c1b477aac57893f1ef";w.a.licenseKey=P,c.a.render(o.a.createElement(f.a,{store:(V=I,Object(J.c)(V,J.a.apply(void 0,[])))},o.a.createElement(W,null)),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/react-gojs-example",window.location.toString()).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/react-gojs-example","/service-worker.js");H?function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):U(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e):U(e)})}}()}},[[25,1,2]]]);
//# sourceMappingURL=main.6219636b.chunk.js.map