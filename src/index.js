import {Registry} from 'cs-web-components-base';
import {prefixNS} from './helpers';
import reducer from './reducers/reducers';
import MainComponent from './containers/MainComponent';
import ProductionDashboardContainer from './containers/ProductionDashboardContainer';

Registry.registerComponent(prefixNS('MainComponent'), MainComponent);
Registry.registerReducer(prefixNS('reducer'), reducer);
Registry.registerComponent(prefixNS('ProductionDashboardContainer'), ProductionDashboardContainer);


export default {
    MainComponent,
    ProductionDashboardContainer,
    // CSVUploadWidget,
};
