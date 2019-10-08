'use strict';

import "@babel/polyfill";
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import "formdata-polyfill";
import "es6-promise";

import toggleClub from "./module/toggleClub";
import modalPresent from "./module/modalPresent";
import handlingInput from "./module/handlingInput";
import calcClub from "./module/calcClub";


window.addEventListener('DOMContentLoaded', function () {
    toggleClub();
    handlingInput();
    calcClub();
});