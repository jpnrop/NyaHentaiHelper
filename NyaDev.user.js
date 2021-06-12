// ==UserScript==
// @name         NyaHentai Tag Finder
// @namespace    https://github.com/jpnrop
// @version      1.0.0
// @icon         https://static.nyahentai.pw/img/favicon.ico
// @description        NyaHentai Tag Finder for debug.
// @author       jpnrop
// @match        https://ja.nyahentai.com/*
// @license      GPL-3.0
// @require      https://cdn.jsdelivr.net/npm/jquery@latest/dist/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/underscore@latest/underscore-umd-min.js
// @run-at       document-end
// @noframes
// @homepageURL  https://github.com/jpnrop/NyaHentaiHelper
// @supportURL   https://github.com/jpnrop/NyaHentaiHelper/issues
// ==/UserScript==

function findCommonElements (inArrays) {
  // check for valid input
  if (typeof inArrays === 'undefined') return undefined;
  if (typeof inArrays[0] === 'undefined') return undefined;

  return _.intersection.apply(this, inArrays);
}

const tagCloud = [];

function getTags () {
  const $this = $(this);
  const tags = $this.attr('data-tags').split(' ');
  
  tagCloud.push(tags);
}

(function () {
  'use strict';
  
  const init = () => {
    $('.gallery').each(getTags);
    let tagname = $("h1")[0].childNodes[3].innerText;
    console.log(findCommonElements(tagCloud) + ' : ' + tagname);
  };
  init();
})();
