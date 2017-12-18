import * as _ from 'lodash';
import { greet } from './modules/greeting';
import * as Rx from 'rxjs/Rx';

function bindingEvent() {
    //count the click times
    var button = document.querySelector('button');
    var clk = Rx.Observable.fromEvent(button, 'click')
        .mapTo(1)
        .scan((count) => count + 1, 0)
        .subscribe((count) => {
            console.log(`Clicked ${count} times!`);
        });


    var txt = document.getElementById('txt');
    var ipt: Rx.Observable<any> = Rx.Observable.fromEvent(txt, 'keyup').debounceTime(1500);
  
    ipt.subscribe(text => {
        var _txt: any = text.target || text.srcElement
        console.log(_txt.value);
    })
}

function component() {
    var element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack ts'], greet);
    bindingEvent();
    return element;
}

document.body.appendChild(component());