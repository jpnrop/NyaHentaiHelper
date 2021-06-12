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

const tagCloud = [];
const filteredTags = ['6346'];

function tagGrant () {
  const $this = $(this);

  // For Tag filtering
  const tags = $this.attr('data-tags').split(' ');

  if (filteredTags.every(element => tags.includes(element))) {
    $this.attr('filter', 'filtered');
  }

  tagCloud.push(tags);
  // console.log(tags);
}

function findCommonElements (inArrays) {
  // check for valid input
  if (typeof inArrays === 'undefined') return undefined;
  if (typeof inArrays[0] === 'undefined') return undefined;

  return _.intersection.apply(this, inArrays);
}

(function () {
  'use strict';

  // Tag Filter
  const tagFilter = (tag, $node) => {
    const getNode = $node ? selector => $node.find(selector) : selector => $(selector);
    if (tag === 'none') getNode('.gallery').removeClass('hidden');
    else {
      getNode(`.gallery[filter=${tag}]`).removeClass('hidden');
      getNode(`.gallery:not([filter=${tag}])`).addClass('hidden');
    }
  };

  // Function initialization
  const init = () => {
    if (!(/^\/g\/[0-9]+\//.test(window.location.pathname))) {
      $('.gallery').each(tagGrant);
      new MutationObserver(mutations => {
        mutations.forEach(({
          addedNodes
        }) => {
          addedNodes.forEach(node => {
            const $node = $(node);
            $node.find('.gallery').each(tagGrant);
            (val => val && tagFilter(val, $node))($('#tag-Filter').val());
          });
        });
      }).observe($('#content')[0], {
        childList: true
      });

      // Tag Filter Selecting
      $('ul.menu.left').append('<li style="padding:0 10px">Lang: <select id="tag-Filter"><option value="none">None</option><option value="filtered">Filter</option></select></li>');
      $('#tag-Filter').change(function () {
        tagFilter(this.value);
        sessionStorage.setItem('tag-Filter', this.value);
        const tagArray = [];
        $('#tag-Filter option:selected').each(function () {
          tagArray.push($(this).val());
        });
        console.log(tagArray);
      });

      // Restore the remembered tag filter
      const rememberedTAG = sessionStorage.getItem('tag-Filter');
      if (rememberedTAG) {
        $('#tag-Filter').val(rememberedTAG);
        tagFilter(rememberedTAG);
      }
      // Dubug for tag filtering
      // console.log(findCommonElements(tagCloud));
    }
  };
  init();
})();
