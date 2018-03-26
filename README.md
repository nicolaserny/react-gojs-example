[![Build Status](https://travis-ci.org/nicolaserny/react-gojs-example.svg?branch=master)](https://travis-ci.org/nicolaserny/react-gojs-example)
[![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.png?v=101)](https://github.com/ellerbrock/typescript-badges/)

# react-gojs-example

Example to show how to use [GoJS](https://gojs.net/latest/index.html) in a React/Redux environment with [react-gojs](https://github.com/xcomponent/react-gojs).

![add a new state](https://raw.githubusercontent.com/nicolaserny/react-gojs-example/master/images/demo.gif)

You can try the live demo [here](https://nicolaserny.github.io/react-gojs-example/).

## Requirements

* Node.js
* Yarn

## Build and Start

* Run `yarn install`
* Run `yarn run build`
* Run `yarn start`

## How it works?

GoJS is not designed to work out of the box with React and Redux.
This project shows how to create a GoJS diagram with react-gojs.
*react-gojs* provides a generic React component that wraps the diagram object and makes the integration in a React project easier.

Key parts of the project:
* Diagram model (*DiagramModel<NodeModel, LinkModel>* type): The model is stored in the redux state. The idea is to add, remove or update nodes or links by dispatching actions.
* [MyDiagram](https://github.com/nicolaserny/react-gojs-example/blob/master/src/components/MyDiagram.tsx): example of a presentational component that uses *GojsDiagram* with a custom layout ([based on the GoJS minimal sample](https://gojs.net/latest/samples/minimal.html))
* [MyDiagramContainer](https://github.com/nicolaserny/react-gojs-example/blob/master/src/components/MyDiagramContainer.tsx): example of a container component connected to a redux store ([the react+redux container pattern](http://www.thegreatcodeadventure.com/the-react-plus-redux-container-pattern/))
* The *onModelChange* event (MyDiagram component) is used to sync our model (in the redux state) when a link or a node is removed from the ui diagram (with the *delete* key for example).

## License

[MIT License](https://raw.githubusercontent.com/nicolaserny/react-gojs-example/master/LICENSE)