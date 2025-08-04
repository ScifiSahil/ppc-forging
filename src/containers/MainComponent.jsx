import React from 'react';
import {SinglePage, PageFrame} from 'cs-web-components-base';
import HelloWorld from '../components/Dashboard';

export default class MainComponent extends React.Component {
    render() {
        return (<SinglePage frameComponent={PageFrame.ApplicationFrame}
                            pageContent={HelloWorld} />);
    }
}


