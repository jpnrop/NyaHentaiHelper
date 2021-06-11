// ==UserScript==
// @name         NyaHentai Helper Alpha
// @namespace    https://github.com/jpnrop
// @version      1.0.1a
// @icon         https://static.nyahentai.pw/img/favicon.ico
// @description        Add tag filter.
// @author       jpnrop
// @match        https://ja.nyahentai.com/*
// @license      GPL-3.0
// @resource     select2 https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css
// @require      https://cdn.jsdelivr.net/npm/jquery@v3.4.1/dist/jquery.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js
// @require      http://underscorejs.org/underscore-min.js
// @run-at       document-end
// @noframes
// @homepageURL  https://github.com/jpnrop/SomeHentaiHelper
// @supportURL   https://github.com/jpnrop/SomeHentaiHelper/issues
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
