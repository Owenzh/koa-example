import * as _ from 'lodash';
import { greet } from './modules/greeting';
function component() {
    var element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack ts'], greet);

    return element;
}

document.body.appendChild(component());