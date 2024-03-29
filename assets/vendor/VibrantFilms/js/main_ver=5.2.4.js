jQuery(document).ready(function () {
  jQuery('#delay-load').show();

  // TEAM
  var gridContainer = jQuery('#grid-container,#grid-container2');

  gridContainer.cubeportfolio({
    animationType: 'sequentially',
    gapHorizontal: 0,
    gapVertical: 10,
    gridAdjustment: 'responsive',
    caption: 'zoom',
    displayType: 'sequentially ',
    displayTypeSpeed: 100,
    lightboxDelegate: '.cbp-lightbox',
    lightboxGallery: true,
    lightboxTitleSrc: 'data-title',
    lightboxShowCounter: true,
    singlePageDelegate: '.cbp-singlePage',
    singlePageDeeplinking: true,
    singlePageStickyNavigation: true,
    singlePageShowCounter: true,
    singlePageCallback: function (url, element) {
      var t = this;
      jQuery
        .ajax({
          url: url,
          type: 'GET',
          dataType: 'html',
          timeout: 5000,
        })
        .done(function (result) {
          result = jQuery(result).find('#single');
          t.updateSinglePage(result);
        })
        .fail(function () {
          t.updateSinglePage('Error! Please refresh the page!');
        });
    },
  });

  // PORTFOLIO
  var gridContainer = jQuery('#grid-container3'),
    filtersContainer = jQuery('#filters-container');

  gridContainer.cubeportfolio({
    defaultFilter: '*',
    animationType: 'flipOut',
    gapHorizontal: -50,
    gapVertical: 20,
    gridAdjustment: 'responsive',
    caption: 'pushTop',
    displayType: 'sequentially',
    displayTypeSpeed: 100,
    lightboxDelegate: '.cbp-lightbox',
    lightboxGallery: true,
    lightboxTitleSrc: 'data-title',
    lightboxShowCounter: true,
    singlePageDelegate: '.cbp-singlePage',
    singlePageDeeplinking: true,
    singlePageStickyNavigation: true,
    singlePageShowCounter: true,
    singlePageCallback: function (url, element) {
      var t = this;
      jQuery
        .ajax({
          url: url,
          type: 'GET',
          dataType: 'html',
          timeout: 5000,
        })
        .done(function (result) {
          result = jQuery(result).find('#single');
          t.updateSinglePage(result);
          jQuery('#big').owlCarousel({
            navigation: false,
            slideSpeed: 300,
            paginationSpeed: 400,
            lazyLoad: true,
            singleItem: true,
          });
        })
        .fail(function () {
          t.updateSinglePage('Error! Please refresh the page!');
        });
    },
  });

  if (jQuery('body').hasClass('mobile')) {
    filtersContainer.on('click', '.cbp-filter-item', function (e) {
      gridContainer.cubeportfolio('filter', jQuery(this).data('filter'));
      jQuery('.cbp-filter-item').removeClass('cbp-filter-item-active');
      jQuery(this).addClass('cbp-filter-item-active');
    });
  } else {
    // add listener for filters click
    filtersContainer.on('click', '.cbp-filter-item', function (e) {
      var me = jQuery(this),
        wrap;
      // get cubeportfolio data and check if is still animating (reposition) the items.
      if (!jQuery.data(gridContainer[0], 'cubeportfolio').isAnimating) {
        if (filtersContainer.hasClass('cbp-l-filters-dropdown')) {
          wrap = jQuery('.cbp-l-filters-dropdownWrap');
          wrap.find('.cbp-filter-item').removeClass('cbp-filter-item-active');
          wrap.find('.cbp-l-filters-dropdownHeader').text(me.text());
          me.addClass('cbp-filter-item-active');
        } else {
          me.addClass('cbp-filter-item-active')
            .siblings()
            .removeClass('cbp-filter-item-active');
        }
      }
      // filter the items
      gridContainer.cubeportfolio('filter', me.data('filter'), function () {});
    });
    // activate counters
    gridContainer.cubeportfolio(
      'showCounter',
      filtersContainer.find('.cbp-filter-item')
    );
  }

  // Load popup if it's the first time you load the website
  if (
    getCookie('isNewsletterPopupDisplayed') === false ||
    getCookie('isNewsletterPopupDisplayed') === ''
  ) {
    initPopup();
    setCookie('isNewsletterPopupDisplayed', 'true');
  }

  function initPopup() {
    jQuery('#quote-modal a[href="#contact-modal"]').tab('show');
    setTimeout(function () {
      jQuery('#quote-modal').modal();
    }, 10000);
  }

  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    if (typeof exdays === 'undefined') {
      exdays = 30;
    }
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  function getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
});
