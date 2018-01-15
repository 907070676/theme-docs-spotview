var $ = require('jquery');

function flatArticles(articles) {
  var mapFileNameToBreadcrumb = {};
  function reduceMap(objs, parent, sibilings) {
    objs.forEach(function(a, index) {
      var newPath = {
        title: a.title,
      };
      if (a.path) {
        newPath.path = a.path.replace('.md', '');
      }
      if (sibilings) {
        newPath.sibilings = sibilings;
      }
      var newParent = parent.concat([newPath]);
      if (newPath.path) {
        mapFileNameToBreadcrumb[newPath.path] = newParent;
      }
      if (a.articles) {
        var childrens = [];
        a.articles.forEach(function(ar, i) {
          if (ar.path) {
            childrens.push({
              title: ar.title,
              path: ar.path.replace('.md', ''),
            });
          }
        });
        reduceMap(a.articles, newParent, childrens);
      }
    });
  }

  reduceMap(articles, [{
    title: '首页',
    path: '/',
  }]);
  return mapFileNameToBreadcrumb;
}

function init() {
  var $breadcrumbContainer = $('.hengshidoc-breadcrumb');
  var $breadcrumb = $('.hengshidoc-breadcrumb-inner');
  var currentPath = window.location.pathname.slice(1).split('/').pop().replace('.html', '');

  if (!currentPath) {
    $breadcrumbContainer.remove();
    return;
  }

  var allArticles = flatArticles(summaryObject.parts[0].articles.slice(1));
  var current = allArticles[currentPath];

  current.forEach(function(path, index) {
    var $menu = $('<div>');
    var $text, $ul;
    if (path.path) {
      $text = $('<a>', {
        text: path.title,
        href: path.path === '/' ? '/' : (path.path + '.html'),
      });
    } else {
      $text = $('<span>', {
        text: path.title,
      });
    }
    if (path.sibilings && path.sibilings.length) {
      $text.append($('<i>', {
        class: 'fa fa-angle-down',
      }));
      $ul = $('<ul>');
      path.sibilings.map(function(li, index) {
        $ul.append($('<li>', {
          html: '<a href="' + li.path + '.html">' + li.title + '</a>',
        }));
      });
    }
    if ($text) $menu.append($text);
    if ($ul) $menu.append($ul);
    $breadcrumb.append($menu);
    if (index < (current.length - 1)) {
      $breadcrumb.append($('<i>', {
        text: '/',
      }));
    }
  });
}

module.exports = {
  init: init,
};
