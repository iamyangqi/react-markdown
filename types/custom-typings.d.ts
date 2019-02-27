declare module '*.png' {
    const value: string;
    export = value;
}

declare module '*.svg' {
    const value: string;
    export = value;
}


declare namespace JSX {
    interface IntrinsicElements {
        feDropShadow: any;
    }
}

declare module 'timer-decorator' {
    const timer: any;
    export = timer;
}

declare module 'cytoscape-dagre';
declare module 'cytoscape-klay';
declare module 'cytoscape-spread';
declare module 'cytoscape-cola';
declare module 'cytoscape-node-resize';
declare module 'konva';
declare module 'jquery';
declare module 'try-cy';
declare module 'react-horizontal-timeline';