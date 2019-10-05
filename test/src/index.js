require('nodelist-foreach-polyfill');
require('@babel/polyfill');


let modone = require('./module/modone'),
    modtwo = require('./module/modtwo');


modone();
modtwo();