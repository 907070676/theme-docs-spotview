// var dropdown =   require('./dropdown');
// var keyboard =   require('./keyboard');
// var navigation = require('./navigation');
// var sidebar =    require('./sidebar');
// var toolbar =    require('./toolbar');
var breadcrumb = require('./breadcrumb');
var scrollFix = require('./scrollFix');

var gitbook = window.gitbook;

function init() {
    // Init sidebar
    // sidebar.init();

    // Init keyboard
    // keyboard.init();

    // Bind dropdown
    // dropdown.init();

    // Init navigation
    // navigation.init();

    // Init breadcrumb
    breadcrumb.init();

    // Init element position fix when scroll
    scrollFix.init();

    $('.page-inner img').on('click', function(e) {
        window.open(e.target.src);
    });

    if (!window.location.pathname.slice(1).split('/').pop()) {
        // is index page
        $('.navigation').remove();

        var $lis = $('.hengshidoc-indexpage > .normal > ul > li');
        $($lis[1]).find('li:last-child a').addClass('hengshidoc-indexpage-more');
        $($lis[3]).find('li:last-child a').addClass('hengshidoc-indexpage-more');
    } else {
        $('.logo').css({ cursor: 'pointer' }).on('click', function(e) {
            window.location.href = '/';
        });
    }

    // Add action to toggle sidebar
    // toolbar.createButton({
    //     index: 0,
    //     icon: 'fa fa-align-justify',
    //     onClick: function(e) {
    //         e.preventDefault();
    //         sidebar.toggle();
    //     }
    // });
}

gitbook.events.on('start', init);

// gitbook.keyboard = keyboard;
// gitbook.navigation = navigation;
// gitbook.sidebar = sidebar;
// gitbook.toolbar = toolbar;
