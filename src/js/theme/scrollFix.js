var $ = require('jquery');

function linearScale(domain, range, clamp) {
  return function(value) {
    if (domain[0] === domain[1] || range[0] === range[1]) {
      return range[0];
    }
    var ratio = (range[1] - range[0]) / (domain[1] - domain[0]),
      result = range[0] + ratio * (value - domain[0]);
    return clamp ? Math.min(range[1], Math.max(range[0], result)) : result;
  };
}

function init() {
  var $logo = $('.logo');
  var $body = $('.hengshidoc-body');
  var $input = $('#book-search-input');
  var $header = $('.hengshidoc-header');
  var $headerInner = $('.hengshidoc-header-inner');
  var $bodyInner = $('.hengshidoc-body-inner');
  var $breadcrumbContainer = $('.hengshidoc-breadcrumb');
  var $summaryContainer = $('.hengshidoc-summary');
  var fixed = false;


  function onScroll() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    var scaleYTOX = linearScale(
      [0, 60],
      [0, ($headerInner.width() / 2) - ($input.width() / 2)],
      true);

    if (scrollTop >= 187) {
      fixed = true;
      var fixedHeaderHeight = 62;
      var breadcrumbContainerHeight = 0;
      if ($breadcrumbContainer.length) {
        $breadcrumbContainer.css({
          top: fixedHeaderHeight + 'px',
          position: 'fixed',
          left: 0,
        });
        breadcrumbContainerHeight = 50;
      }
      $body.css({
        'padding-top': 187 + fixedHeaderHeight + breadcrumbContainerHeight + 'px',
      });
      $logo.removeAttr('style');
      $input.removeAttr('style');
      $header.addClass('hengshidoc-header-fixed');
      $summaryContainer.css({
        left: (Math.max(window.innerWidth, 1280) - 1280) / 2 + 'px',
        top: 35 + fixedHeaderHeight + breadcrumbContainerHeight + 'px',
        width: $summaryContainer.width(),
        position: 'fixed',
      });
    } else {
      if (fixed) {
        fixed = false;
        $body.removeAttr('style');
        $logo.removeAttr('style');
        $input.removeAttr('style');
        $summaryContainer.removeAttr('style');
        $header.removeClass('hengshidoc-header-fixed');
        if ($breadcrumbContainer.length) $breadcrumbContainer.removeAttr('style');
      }
      $logo.css({
        transform: 'translate(0, ' + scrollTop + 'px)',
      });
      if (scrollTop >= 130) {
        $input.css({
          transform: 'translate(' + scaleYTOX(scrollTop - 130) + 'px, ' + (scrollTop - 130) + 'px)',
        });
      } else {
        $input.removeAttr('style');
      }
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
  $input.find('input').attr('placeholder', '搜索');
}

module.exports = {
  init: init,
};
