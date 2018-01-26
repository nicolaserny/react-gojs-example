[![Build Status](https://travis-ci.org/nicolaserny/react-gojs-example.svg?branch=master)](https://travis-ci.org/nicolaserny/react-gojs-example)
[![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.png?v=101)](https://github.com/ellerbrock/typescript-badges/)

# react-gojs-example

Example to show how to use [GoJS](https://gojs.net/latest/index.html) in a React/Redux environment.

![add a new state](https://raw.githubusercontent.com/nicolaserny/react-gojs-example/master/images/demo.gif)

You can try the live demo [here](https://nicolaserny.github.io/react-gojs-example/).

## Requirements

* Node.js
* Yarn

## Build and Start

* Run `yarn install`
* Run `yarn run build`
* Run `yarn start`

## How it works ?

GoJS is not designed to work out of the box with React and Redux.
This project shows how to wrap a GoJS diagram in a generic React component.

Key parts of the project:
* [DiagramModel](https://github.com/nicolaserny/react-gojs-example/blob/master/src/model/model.ts): generic model containing nodes and links. The model is stored in the redux state. The idea is to add, remove or update nodes or links by dispatching actions.
* [GojsDiagram](https://github.com/nicolaserny/react-gojs-example/blob/master/src/components/GojsDiagram.tsx): generic React component which is responsible for rendering and updating (when the model changes) the diagram. The render step is based on the model and the go.Diagram object provided as props. It acts as a go.Diagram wrapper.
* [MyDiagram](https://github.com/nicolaserny/react-gojs-example/blob/master/src/components/MyDiagram.tsx): example of a presentational component that uses *GojsDiagram* with a custom layout ([based on the GoJS minimal sample](https://gojs.net/latest/samples/minimal.html))
* [MyDiagramContainer](https://github.com/nicolaserny/react-gojs-example/blob/master/src/components/MyDiagramContainer.tsx): example of a container component connected to a redux store ([the react+redux container pattern](http://www.thegreatcodeadventure.com/the-react-plus-redux-container-pattern/))

## License

[MIT License](https://raw.githubusercontent.com/nicolaserny/react-gojs-example/master/LICENSE)