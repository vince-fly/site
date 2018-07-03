'use strict';
import './main.scss';
import i18n from './i18n';
window.i18n = i18n;
console.log(i18n);
i18n.add('en',{"home name":'Name'});
i18n.add('cn',{"home name":'姓名'});
i18n.setActiveLanguage('en');
var el= document.getElementById('home name');
el.innerText = i18n.t('home name');
// Use the same template for the frontend code
// var template = require('./time.pug');

// setInterval(function () {
//   var div = document.getElementById('main');
//   div.innerHTML = template({ time: new Date() });
//   div.style.color = 'navy';
// }, 1000);
