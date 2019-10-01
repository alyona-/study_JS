import "@babel/polyfill";
import elementClosest from "element-closest";
import 'nodelist-foreach-polyfill';
elementClosest(window);
import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import togglePopup from "./modules/togglePopup";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import imagesStart from "./modules/imageStart";
import calc from "./modules/calc";
import sendForm from "./modules/sendForm";
window.addEventListener('DOMContentLoaded', function () {


    'use strict';


    countTimer();
    toggleMenu();
    togglePopup();
    tabs();
    slider();
    imagesStart();
    calc();
    sendForm();

});

