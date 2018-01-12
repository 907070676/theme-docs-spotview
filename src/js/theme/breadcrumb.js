var $ = require('jquery');

function flatArticles(articles) {
  var mapFileNameToBreadcrumb = {};
  function reduceMap(objs, parent) {
    objs.forEach(function(a, index) {

      var newPath = {
        title: a.title,
      };
      if (a.path) {
        newPath.path = a.path.replace('.md', '');
      }
      var newParent = parent.concat([newPath]);
      if (newPath.path) {
        mapFileNameToBreadcrumb[newPath.path] = newParent;
      }
      if (a.articles) {
        reduceMap(a.articles, newParent);
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
  var $breadcrumb = $('.hengshidoc-breadcrumb-inner');
  var currentPath = window.location.pathname.slice(1).split('/').pop().replace('.html', '');

  if (!currentPath) {
    $breadcrumb.append($('<a>', {
      text: '首页',
      href: '/',
    }));
    return;
  }

  var allArticles = flatArticles(summaryObject.parts[0].articles.slice(1));
  var current = allArticles[currentPath];

  current.forEach(function(path, index) {
    if (path.path) {
      $breadcrumb.append($('<a>', {
        text: path.title,
        href: path.path === '/' ? '/' : (path.path + '.html'),
      }));
    } else {
      $breadcrumb.append($('<span>', {
        text: path.title,
      }));
    }
    if (index < (current.length - 1)) {
      $breadcrumb.append($('<i>', {
        text: '/',
      }))
    }
  });
}

module.exports = {
  init: init,
};
