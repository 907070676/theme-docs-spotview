var $ = require('jquery');

function init() {
  var $body = $('.hengshidoc-body');
  var $header = $('.hengshidoc-header');
  var $bodyInner = $('.hengshidoc-body-inner');
  var $breadcrumbContainer = $('.hengshidoc-breadcrumb');
  var $summaryContainer = $('.hengshidoc-summary');
  var fixed = false;

  function onScroll() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop >= 250) {
      fixed = true;
      var bodyPaddingTop = 50;
      var breadcrumbContainerHeight = 0;
      if ($breadcrumbContainer.length) {
        $breadcrumbContainer.css({
          top: bodyPaddingTop + 'px',
          position: 'fixed',
          left: 0,
        });
        breadcrumbContainerHeight = 50;
        bodyPaddingTop += breadcrumbContainerHeight;
      }
      $body.css({
        'padding-top': 250 + bodyPaddingTop + 'px',
      });
      $header.addClass('hengshidoc-header-fixed');
      $summaryContainer.css({
        left: (Math.max(window.innerWidth, 1280) - 1280) / 2 + 'px',
        top: 35 + 50 + breadcrumbContainerHeight + 'px',
        width: $summaryContainer.width(),
        position: 'fixed',
      });
    } else if (fixed) {
      fixed = false;
      $body.removeAttr('style');
      $summaryContainer.removeAttr('style');
      $header.removeClass('hengshidoc-header-fixed');
      if ($breadcrumbContainer.length) $breadcrumbContainer.removeAttr('style');
    }
    $bodyInner.css({
      'padding-left': $summaryContainer.width() + 'px',
    });
  }

  if (window.innerWidth > 960) {
    onScroll();
    $(document).on('scroll', onScroll);
    $(document).on('resize', onScroll);
  }
}

module.exports = {
  init: init,
};
