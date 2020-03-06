/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
	'use strict';

	/**
	 * @ngdoc module
	 * @name siemens.simaticit.common.widgets.graph
	 * @description
     * This module provides functionalities related to displaying graphs with nodes and edges.
     *
     * Each node and edge can be selected and their styles can be configured.
	 */
	angular.module('siemens.simaticit.common.widgets.graph', []);
	angular.module('siemens.simaticit.common.widgets.graph').constant('d3',window.d3);

})();

(function () {
    'use strict';
    var fontAwesomIconJson = {
        'fontAwesomIcon': [
            { 'icon': 'fa-500px', 'charCode': '\uf26e' },
            { 'icon': 'fa-adjust', 'charCode': '\uf042' },
            { 'icon': 'fa-adn', 'charCode': '\uf170' },
            { 'icon': 'fa-align-center', 'charCode': '\uf037' },
            { 'icon': 'fa-align-justify', 'charCode': '\uf039' },
            { 'icon': 'fa-align-left', 'charCode': '\uf036' },
            { 'icon': 'fa-align-right', 'charCode': '\uf038' },
            { 'icon': 'fa-amazon', 'charCode': '\uf270' },
            { 'icon': 'fa-ambulance', 'charCode': '\uf0f9' },
            { 'icon': 'fa-anchor', 'charCode': '\uf13d' },
            { 'icon': 'fa-android', 'charCode': '\uf17b' },
            { 'icon': 'fa-angellist', 'charCode': '\uf209' },
            { 'icon': 'fa-angle-double-down', 'charCode': '\uf103' },
            { 'icon': 'fa-angle-double-left', 'charCode': '\uf100' },
            { 'icon': 'fa-angle-double-right', 'charCode': '\uf101' },
            { 'icon': 'fa-angle-double-up', 'charCode': '\uf102' },
            { 'icon': 'fa-angle-down', 'charCode': '\uf107' },
            { 'icon': 'fa-angle-left', 'charCode': '\uf104' },
            { 'icon': 'fa-angle-right', 'charCode': '\uf105' },
            { 'icon': 'fa-angle-up', 'charCode': '\uf106' },
            { 'icon': 'fa-apple', 'charCode': '\uf179' },
            { 'icon': 'fa-archive', 'charCode': '\uf187' },
            { 'icon': 'fa-area-chart', 'charCode': '\uf1fe' },
            { 'icon': 'fa-arrow-circle-down', 'charCode': '\uf0ab' },
            { 'icon': 'fa-arrow-circle-left', 'charCode': '\uf0a8' },
            { 'icon': 'fa-arrow-circle-o-down', 'charCode': '\uf01a' },
            { 'icon': 'fa-arrow-circle-o-left', 'charCode': '\uf190' },
            { 'icon': 'fa-arrow-circle-o-right', 'charCode': '\uf18e' },
            { 'icon': 'fa-arrow-circle-o-up', 'charCode': '\uf01b' },
            { 'icon': 'fa-arrow-circle-right', 'charCode': '\uf0a9' },
            { 'icon': 'fa-arrow-circle-up', 'charCode': '\uf0aa' },
            { 'icon': 'fa-arrow-down', 'charCode': '\uf063' },
            { 'icon': 'fa-arrow-left', 'charCode': '\uf060' },
            { 'icon': 'fa-arrow-right', 'charCode': '\uf061' },
            { 'icon': 'fa-arrow-up', 'charCode': '\uf062' },
            { 'icon': 'fa-arrows', 'charCode': '\uf047' },
            { 'icon': 'fa-arrows-alt', 'charCode': '\uf0b2' },
            { 'icon': 'fa-arrows-h', 'charCode': '\uf07e' },
            { 'icon': 'fa-arrows-v', 'charCode': '\uf07d' },
            { 'icon': 'fa-asterisk', 'charCode': '\uf069' },
            { 'icon': 'fa-at', 'charCode': '\uf1fa' },
            { 'icon': 'fa-automobile ', 'charCode': '\uf1b9' },
            { 'icon': 'fa-backward', 'charCode': '\uf04a' },
            { 'icon': 'fa-balance-scale', 'charCode': '\uf24e' },
            { 'icon': 'fa-ban', 'charCode': '\uf05e' },
            { 'icon': 'fa-bank ', 'charCode': '\uf19c' },
            { 'icon': 'fa-bar-chart', 'charCode': '\uf080' },
            { 'icon': 'fa-bar-chart-o ', 'charCode': '\uf080' },
            { 'icon': 'fa-barcode', 'charCode': '\uf02a' },
            { 'icon': 'fa-bars', 'charCode': '\uf0c9' },
            { 'icon': 'fa-battery-0 ', 'charCode': '\uf244' },
            { 'icon': 'fa-battery-1 ', 'charCode': '\uf243' },
            { 'icon': 'fa-battery-2 ', 'charCode': '\uf242' },
            { 'icon': 'fa-battery-3 ', 'charCode': '\uf241' },
            { 'icon': 'fa-battery-4 ', 'charCode': '\uf240' },
            { 'icon': 'fa-battery-empty', 'charCode': '\uf244' },
            { 'icon': 'fa-battery-full', 'charCode': '\uf240' },
            { 'icon': 'fa-battery-half', 'charCode': '\uf242' },
            { 'icon': 'fa-battery-quarter', 'charCode': '\uf243' },
            { 'icon': 'fa-battery-three-quarters', 'charCode': '\uf241' },
            { 'icon': 'fa-bed', 'charCode': '\uf236' },
            { 'icon': 'fa-beer', 'charCode': '\uf0fc' },
            { 'icon': 'fa-behance', 'charCode': '\uf1b4' },
            { 'icon': 'fa-behance-square', 'charCode': '\uf1b5' },
            { 'icon': 'fa-bell', 'charCode': '\uf0f3' },
            { 'icon': 'fa-bell-o', 'charCode': '\uf0a2' },
            { 'icon': 'fa-bell-slash', 'charCode': '\uf1f6' },
            { 'icon': 'fa-bell-slash-o', 'charCode': '\uf1f7' },
            { 'icon': 'fa-bicycle', 'charCode': '\uf206' },
            { 'icon': 'fa-binoculars', 'charCode': '\uf1e5' },
            { 'icon': 'fa-birthday-cake', 'charCode': '\uf1fd' },
            { 'icon': 'fa-bitbucket', 'charCode': '\uf171' },
            { 'icon': 'fa-bitbucket-square', 'charCode': '\uf172' },
            { 'icon': 'fa-bitcoin ', 'charCode': '\uf15a' },
            { 'icon': 'fa-black-tie', 'charCode': '\uf27e' },
            { 'icon': 'fa-bluetooth', 'charCode': '\uf293' },
            { 'icon': 'fa-bluetooth-b', 'charCode': '\uf294' },
            { 'icon': 'fa-bold', 'charCode': '\uf032' },
            { 'icon': 'fa-bolt', 'charCode': '\uf0e7' },
            { 'icon': 'fa-bomb', 'charCode': '\uf1e2' },
            { 'icon': 'fa-book', 'charCode': '\uf02d' },
            { 'icon': 'fa-bookmark', 'charCode': '\uf02e' },
            { 'icon': 'fa-bookmark-o', 'charCode': '\uf097' },
            { 'icon': 'fa-briefcase', 'charCode': '\uf0b1' },
            { 'icon': 'fa-btc', 'charCode': '\uf15a' },
            { 'icon': 'fa-bug', 'charCode': '\uf188' },
            { 'icon': 'fa-building', 'charCode': '\uf1ad' },
            { 'icon': 'fa-building-o', 'charCode': '\uf0f7' },
            { 'icon': 'fa-bullhorn', 'charCode': '\uf0a1' },
            { 'icon': 'fa-bullseye', 'charCode': '\uf140' },
            { 'icon': 'fa-bus', 'charCode': '\uf207' },
            { 'icon': 'fa-buysellads', 'charCode': '\uf20d' },
            { 'icon': 'fa-cab ', 'charCode': '\uf1ba' },
            { 'icon': 'fa-calculator', 'charCode': '\uf1ec' },
            { 'icon': 'fa-calendar', 'charCode': '\uf073' },
            { 'icon': 'fa-calendar-check-o', 'charCode': '\uf274' },
            { 'icon': 'fa-calendar-minus-o', 'charCode': '\uf272' },
            { 'icon': 'fa-calendar-o', 'charCode': '\uf133' },
            { 'icon': 'fa-calendar-plus-o', 'charCode': '\uf271' },
            { 'icon': 'fa-calendar-times-o', 'charCode': '\uf273' },
            { 'icon': 'fa-camera', 'charCode': '\uf030' },
            { 'icon': 'fa-camera-retro', 'charCode': '\uf083' },
            { 'icon': 'fa-car', 'charCode': '\uf1b9' },
            { 'icon': 'fa-caret-down', 'charCode': '\uf0d7' },
            { 'icon': 'fa-caret-left', 'charCode': '\uf0d9' },
            { 'icon': 'fa-caret-right', 'charCode': '\uf0da' },
            { 'icon': 'fa-caret-square-o-down', 'charCode': '\uf150' },
            { 'icon': 'fa-caret-square-o-left', 'charCode': '\uf191' },
            { 'icon': 'fa-caret-square-o-right', 'charCode': '\uf152' },
            { 'icon': 'fa-caret-square-o-up', 'charCode': '\uf151' },
            { 'icon': 'fa-caret-up', 'charCode': '\uf0d8' },
            { 'icon': 'fa-cart-arrow-down', 'charCode': '\uf218' },
            { 'icon': 'fa-cart-plus', 'charCode': '\uf217' },
            { 'icon': 'fa-cc', 'charCode': '\uf20a' },
            { 'icon': 'fa-cc-amex', 'charCode': '\uf1f3' },
            { 'icon': 'fa-cc-diners-club', 'charCode': '\uf24c' },
            { 'icon': 'fa-cc-discover', 'charCode': '\uf1f2' },
            { 'icon': 'fa-cc-jcb', 'charCode': '\uf24b' },
            { 'icon': 'fa-cc-mastercard', 'charCode': '\uf1f1' },
            { 'icon': 'fa-cc-paypal', 'charCode': '\uf1f4' },
            { 'icon': 'fa-cc-stripe', 'charCode': '\uf1f5' },
            { 'icon': 'fa-cc-visa', 'charCode': '\uf1f0' },
            { 'icon': 'fa-certificate', 'charCode': '\uf0a3' },
            { 'icon': 'fa-chain ', 'charCode': '\uf0c1' },
            { 'icon': 'fa-chain-broken', 'charCode': '\uf127' },
            { 'icon': 'fa-check', 'charCode': '\uf00c' },
            { 'icon': 'fa-check-circle', 'charCode': '\uf058' },
            { 'icon': 'fa-check-circle-o', 'charCode': '\uf05d' },
            { 'icon': 'fa-check-square', 'charCode': '\uf14a' },
            { 'icon': 'fa-check-square-o', 'charCode': '\uf046' },
            { 'icon': 'fa-chevron-circle-down', 'charCode': '\uf13a' },
            { 'icon': 'fa-chevron-circle-left', 'charCode': '\uf137' },
            { 'icon': 'fa-chevron-circle-right', 'charCode': '\uf138' },
            { 'icon': 'fa-chevron-circle-up', 'charCode': '\uf139' },
            { 'icon': 'fa-chevron-down', 'charCode': '\uf078' },
            { 'icon': 'fa-chevron-left', 'charCode': '\uf053' },
            { 'icon': 'fa-chevron-right', 'charCode': '\uf054' },
            { 'icon': 'fa-chevron-up', 'charCode': '\uf077' },
            { 'icon': 'fa-child', 'charCode': '\uf1ae' },
            { 'icon': 'fa-chrome', 'charCode': '\uf268' },
            { 'icon': 'fa-circle', 'charCode': '\uf111' },
            { 'icon': 'fa-circle-o', 'charCode': '\uf10c' },
            { 'icon': 'fa-circle-o-notch', 'charCode': '\uf1ce' },
            { 'icon': 'fa-circle-thin', 'charCode': '\uf1db' },
            { 'icon': 'fa-clipboard', 'charCode': '\uf0ea' },
            { 'icon': 'fa-clock-o', 'charCode': '\uf017' },
            { 'icon': 'fa-clone', 'charCode': '\uf24d' },
            { 'icon': 'fa-close ', 'charCode': '\uf00d' },
            { 'icon': 'fa-cloud', 'charCode': '\uf0c2' },
            { 'icon': 'fa-cloud-download', 'charCode': '\uf0ed' },
            { 'icon': 'fa-cloud-upload', 'charCode': '\uf0ee' },
            { 'icon': 'fa-cny ', 'charCode': '\uf157' },
            { 'icon': 'fa-code', 'charCode': '\uf121' },
            { 'icon': 'fa-code-fork', 'charCode': '\uf126' },
            { 'icon': 'fa-codepen', 'charCode': '\uf1cb' },
            { 'icon': 'fa-codiepie', 'charCode': '\uf284' },
            { 'icon': 'fa-coffee', 'charCode': '\uf0f4' },
            { 'icon': 'fa-cog', 'charCode': '\uf013' },
            { 'icon': 'fa-cogs', 'charCode': '\uf085' },
            { 'icon': 'fa-columns', 'charCode': '\uf0db' },
            { 'icon': 'fa-comment', 'charCode': '\uf075' },
            { 'icon': 'fa-comment-o', 'charCode': '\uf0e5' },
            { 'icon': 'fa-commenting', 'charCode': '\uf27a' },
            { 'icon': 'fa-commenting-o', 'charCode': '\uf27b' },
            { 'icon': 'fa-comments', 'charCode': '\uf086' },
            { 'icon': 'fa-comments-o', 'charCode': '\uf0e6' },
            { 'icon': 'fa-compass', 'charCode': '\uf14e' },
            { 'icon': 'fa-compress', 'charCode': '\uf066' },
            { 'icon': 'fa-connectdevelop', 'charCode': '\uf20e' },
            { 'icon': 'fa-contao', 'charCode': '\uf26d' },
            { 'icon': 'fa-copy ', 'charCode': '\uf0c5' },
            { 'icon': 'fa-copyright', 'charCode': '\uf1f9' },
            { 'icon': 'fa-creative-commons', 'charCode': '\uf25e' },
            { 'icon': 'fa-credit-card', 'charCode': '\uf09d' },
            { 'icon': 'fa-credit-card-alt', 'charCode': '\uf283' },
            { 'icon': 'fa-crop', 'charCode': '\uf125' },
            { 'icon': 'fa-crosshairs', 'charCode': '\uf05b' },
            { 'icon': 'fa-css3', 'charCode': '\uf13c' },
            { 'icon': 'fa-cube', 'charCode': '\uf1b2' },
            { 'icon': 'fa-cubes', 'charCode': '\uf1b3' },
            { 'icon': 'fa-cut ', 'charCode': '\uf0c4' },
            { 'icon': 'fa-cutlery', 'charCode': '\uf0f5' },
            { 'icon': 'fa-dashboard ', 'charCode': '\uf0e4' },
            { 'icon': 'fa-dashcube', 'charCode': '\uf210' },
            { 'icon': 'fa-database', 'charCode': '\uf1c0' },
            { 'icon': 'fa-dedent ', 'charCode': '\uf03b' },
            { 'icon': 'fa-delicious', 'charCode': '\uf1a5' },
            { 'icon': 'fa-desktop', 'charCode': '\uf108' },
            { 'icon': 'fa-deviantart', 'charCode': '\uf1bd' },
            { 'icon': 'fa-diamond', 'charCode': '\uf219' },
            { 'icon': 'fa-digg', 'charCode': '\uf1a6' },
            { 'icon': 'fa-dollar ', 'charCode': '\uf155' },
            { 'icon': 'fa-dot-circle-o', 'charCode': '\uf192' },
            { 'icon': 'fa-download', 'charCode': '\uf019' },
            { 'icon': 'fa-dribbble', 'charCode': '\uf17d' },
            { 'icon': 'fa-dropbox', 'charCode': '\uf16b' },
            { 'icon': 'fa-drupal', 'charCode': '\uf1a9' },
            { 'icon': 'fa-edge', 'charCode': '\uf282' },
            { 'icon': 'fa-edit ', 'charCode': '\uf044' },
            { 'icon': 'fa-eject', 'charCode': '\uf052' },
            { 'icon': 'fa-ellipsis-h', 'charCode': '\uf141' },
            { 'icon': 'fa-ellipsis-v', 'charCode': '\uf142' },
            { 'icon': 'fa-empire', 'charCode': '\uf1d1' },
            { 'icon': 'fa-envelope', 'charCode': '\uf0e0' },
            { 'icon': 'fa-envelope-o', 'charCode': '\uf003' },
            { 'icon': 'fa-envelope-square', 'charCode': '\uf199' },
            { 'icon': 'fa-eraser', 'charCode': '\uf12d' },
            { 'icon': 'fa-eur', 'charCode': '\uf153' },
            { 'icon': 'fa-euro ', 'charCode': '\uf153' },
            { 'icon': 'fa-exchange', 'charCode': '\uf0ec' },
            { 'icon': 'fa-exclamation', 'charCode': '\uf12a' },
            { 'icon': 'fa-exclamation-circle', 'charCode': '\uf06a' },
            { 'icon': 'fa-exclamation-triangle', 'charCode': '\uf071' },
            { 'icon': 'fa-expand', 'charCode': '\uf065' },
            { 'icon': 'fa-expeditedssl', 'charCode': '\uf23e' },
            { 'icon': 'fa-external-link', 'charCode': '\uf08e' },
            { 'icon': 'fa-external-link-square', 'charCode': '\uf14c' },
            { 'icon': 'fa-eye', 'charCode': '\uf06e' },
            { 'icon': 'fa-eye-slash', 'charCode': '\uf070' },
            { 'icon': 'fa-eyedropper', 'charCode': '\uf1fb' },
            { 'icon': 'fa-facebook', 'charCode': '\uf09a' },
            { 'icon': 'fa-facebook-f ', 'charCode': '\uf09a' },
            { 'icon': 'fa-facebook-official', 'charCode': '\uf230' },
            { 'icon': 'fa-facebook-square', 'charCode': '\uf082' },
            { 'icon': 'fa-fast-backward', 'charCode': '\uf049' },
            { 'icon': 'fa-fast-forward', 'charCode': '\uf050' },
            { 'icon': 'fa-fax', 'charCode': '\uf1ac' },
            { 'icon': 'fa-feed ', 'charCode': '\uf09e' },
            { 'icon': 'fa-female', 'charCode': '\uf182' },
            { 'icon': 'fa-fighter-jet', 'charCode': '\uf0fb' },
            { 'icon': 'fa-file', 'charCode': '\uf15b' },
            { 'icon': 'fa-file-archive-o', 'charCode': '\uf1c6' },
            { 'icon': 'fa-file-audio-o', 'charCode': '\uf1c7' },
            { 'icon': 'fa-file-code-o', 'charCode': '\uf1c9' },
            { 'icon': 'fa-file-excel-o', 'charCode': '\uf1c3' },
            { 'icon': 'fa-file-image-o', 'charCode': '\uf1c5' },
            { 'icon': 'fa-file-movie-o ', 'charCode': '\uf1c8' },
            { 'icon': 'fa-file-o', 'charCode': '\uf016' },
            { 'icon': 'fa-file-pdf-o', 'charCode': '\uf1c1' },
            { 'icon': 'fa-file-photo-o ', 'charCode': '\uf1c5' },
            { 'icon': 'fa-file-picture-o ', 'charCode': '\uf1c5' },
            { 'icon': 'fa-file-powerpoint-o', 'charCode': '\uf1c4' },
            { 'icon': 'fa-file-sound-o ', 'charCode': '\uf1c7' },
            { 'icon': 'fa-file-text', 'charCode': '\uf15c' },
            { 'icon': 'fa-file-text-o', 'charCode': '\uf0f6' },
            { 'icon': 'fa-file-video-o', 'charCode': '\uf1c8' },
            { 'icon': 'fa-file-word-o', 'charCode': '\uf1c2' },
            { 'icon': 'fa-file-zip-o ', 'charCode': '\uf1c6' },
            { 'icon': 'fa-files-o', 'charCode': '\uf0c5' },
            { 'icon': 'fa-film', 'charCode': '\uf008' },
            { 'icon': 'fa-filter', 'charCode': '\uf0b0' },
            { 'icon': 'fa-fire', 'charCode': '\uf06d' },
            { 'icon': 'fa-fire-extinguisher', 'charCode': '\uf134' },
            { 'icon': 'fa-firefox', 'charCode': '\uf269' },
            { 'icon': 'fa-flag', 'charCode': '\uf024' },
            { 'icon': 'fa-flag-checkered', 'charCode': '\uf11e' },
            { 'icon': 'fa-flag-o', 'charCode': '\uf11d' },
            { 'icon': 'fa-flash ', 'charCode': '\uf0e7' },
            { 'icon': 'fa-flask', 'charCode': '\uf0c3' },
            { 'icon': 'fa-flickr', 'charCode': '\uf16e' },
            { 'icon': 'fa-floppy-o', 'charCode': '\uf0c7' },
            { 'icon': 'fa-folder', 'charCode': '\uf07b' },
            { 'icon': 'fa-folder-o', 'charCode': '\uf114' },
            { 'icon': 'fa-folder-open', 'charCode': '\uf07c' },
            { 'icon': 'fa-folder-open-o', 'charCode': '\uf115' },
            { 'icon': 'fa-font', 'charCode': '\uf031' },
            { 'icon': 'fa-fonticons', 'charCode': '\uf280' },
            { 'icon': 'fa-fort-awesome', 'charCode': '\uf286' },
            { 'icon': 'fa-forumbee', 'charCode': '\uf211' },
            { 'icon': 'fa-forward', 'charCode': '\uf04e' },
            { 'icon': 'fa-foursquare', 'charCode': '\uf180' },
            { 'icon': 'fa-frown-o', 'charCode': '\uf119' },
            { 'icon': 'fa-futbol-o', 'charCode': '\uf1e3' },
            { 'icon': 'fa-gamepad', 'charCode': '\uf11b' },
            { 'icon': 'fa-gavel', 'charCode': '\uf0e3' },
            { 'icon': 'fa-gbp', 'charCode': '\uf154' },
            { 'icon': 'fa-ge ', 'charCode': '\uf1d1' },
            { 'icon': 'fa-gear ', 'charCode': '\uf013' },
            { 'icon': 'fa-gears ', 'charCode': '\uf085' },
            { 'icon': 'fa-genderless', 'charCode': '\uf22d' },
            { 'icon': 'fa-get-pocket', 'charCode': '\uf265' },
            { 'icon': 'fa-gg', 'charCode': '\uf260' },
            { 'icon': 'fa-gg-circle', 'charCode': '\uf261' },
            { 'icon': 'fa-gift', 'charCode': '\uf06b' },
            { 'icon': 'fa-git', 'charCode': '\uf1d3' },
            { 'icon': 'fa-git-square', 'charCode': '\uf1d2' },
            { 'icon': 'fa-github', 'charCode': '\uf09b' },
            { 'icon': 'fa-github-alt', 'charCode': '\uf113' },
            { 'icon': 'fa-github-square', 'charCode': '\uf092' },
            { 'icon': 'fa-gittip ', 'charCode': '\uf184' },
            { 'icon': 'fa-glass', 'charCode': '\uf000' },
            { 'icon': 'fa-globe', 'charCode': '\uf0ac' },
            { 'icon': 'fa-google', 'charCode': '\uf1a0' },
            { 'icon': 'fa-google-plus', 'charCode': '\uf0d5' },
            { 'icon': 'fa-google-plus-square', 'charCode': '\uf0d4' },
            { 'icon': 'fa-google-wallet', 'charCode': '\uf1ee' },
            { 'icon': 'fa-graduation-cap', 'charCode': '\uf19d' },
            { 'icon': 'fa-gratipay', 'charCode': '\uf184' },
            { 'icon': 'fa-group ', 'charCode': '\uf0c0' },
            { 'icon': 'fa-h-square', 'charCode': '\uf0fd' },
            { 'icon': 'fa-hacker-news', 'charCode': '\uf1d4' },
            { 'icon': 'fa-hand-grab-o ', 'charCode': '\uf255' },
            { 'icon': 'fa-hand-lizard-o', 'charCode': '\uf258' },
            { 'icon': 'fa-hand-o-down', 'charCode': '\uf0a7' },
            { 'icon': 'fa-hand-o-left', 'charCode': '\uf0a5' },
            { 'icon': 'fa-hand-o-right', 'charCode': '\uf0a4' },
            { 'icon': 'fa-hand-o-up', 'charCode': '\uf0a6' },
            { 'icon': 'fa-hand-paper-o', 'charCode': '\uf256' },
            { 'icon': 'fa-hand-peace-o', 'charCode': '\uf25b' },
            { 'icon': 'fa-hand-pointer-o', 'charCode': '\uf25a' },
            { 'icon': 'fa-hand-rock-o', 'charCode': '\uf255' },
            { 'icon': 'fa-hand-scissors-o', 'charCode': '\uf257' },
            { 'icon': 'fa-hand-spock-o', 'charCode': '\uf259' },
            { 'icon': 'fa-hand-stop-o ', 'charCode': '\uf256' },
            { 'icon': 'fa-hashtag', 'charCode': '\uf292' },
            { 'icon': 'fa-hdd-o', 'charCode': '\uf0a0' },
            { 'icon': 'fa-header', 'charCode': '\uf1dc' },
            { 'icon': 'fa-headphones', 'charCode': '\uf025' },
            { 'icon': 'fa-heart', 'charCode': '\uf004' },
            { 'icon': 'fa-heart-o', 'charCode': '\uf08a' },
            { 'icon': 'fa-heartbeat', 'charCode': '\uf21e' },
            { 'icon': 'fa-history', 'charCode': '\uf1da' },
            { 'icon': 'fa-home', 'charCode': '\uf015' },
            { 'icon': 'fa-hospital-o', 'charCode': '\uf0f8' },
            { 'icon': 'fa-hotel ', 'charCode': '\uf236' },
            { 'icon': 'fa-hourglass', 'charCode': '\uf254' },
            { 'icon': 'fa-hourglass-1 ', 'charCode': '\uf251' },
            { 'icon': 'fa-hourglass-2 ', 'charCode': '\uf252' },
            { 'icon': 'fa-hourglass-3 ', 'charCode': '\uf253' },
            { 'icon': 'fa-hourglass-end', 'charCode': '\uf253' },
            { 'icon': 'fa-hourglass-half', 'charCode': '\uf252' },
            { 'icon': 'fa-hourglass-o', 'charCode': '\uf250' },
            { 'icon': 'fa-hourglass-start', 'charCode': '\uf251' },
            { 'icon': 'fa-houzz', 'charCode': '\uf27c' },
            { 'icon': 'fa-html5', 'charCode': '\uf13b' },
            { 'icon': 'fa-i-cursor', 'charCode': '\uf246' },
            { 'icon': 'fa-ils', 'charCode': '\uf20b' },
            { 'icon': 'fa-image ', 'charCode': '\uf03e' },
            { 'icon': 'fa-inbox', 'charCode': '\uf01c' },
            { 'icon': 'fa-indent', 'charCode': '\uf03c' },
            { 'icon': 'fa-industry', 'charCode': '\uf275' },
            { 'icon': 'fa-info', 'charCode': '\uf129' },
            { 'icon': 'fa-info-circle', 'charCode': '\uf05a' },
            { 'icon': 'fa-inr', 'charCode': '\uf156' },
            { 'icon': 'fa-instagram', 'charCode': '\uf16d' },
            { 'icon': 'fa-institution ', 'charCode': '\uf19c' },
            { 'icon': 'fa-internet-explorer', 'charCode': '\uf26b' },
            { 'icon': 'fa-intersex ', 'charCode': '\uf224' },
            { 'icon': 'fa-ioxhost', 'charCode': '\uf208' },
            { 'icon': 'fa-italic', 'charCode': '\uf033' },
            { 'icon': 'fa-joomla', 'charCode': '\uf1aa' },
            { 'icon': 'fa-jpy', 'charCode': '\uf157' },
            { 'icon': 'fa-jsfiddle', 'charCode': '\uf1cc' },
            { 'icon': 'fa-key', 'charCode': '\uf084' },
            { 'icon': 'fa-keyboard-o', 'charCode': '\uf11c' },
            { 'icon': 'fa-krw', 'charCode': '\uf159' },
            { 'icon': 'fa-language', 'charCode': '\uf1ab' },
            { 'icon': 'fa-laptop', 'charCode': '\uf109' },
            { 'icon': 'fa-lastfm', 'charCode': '\uf202' },
            { 'icon': 'fa-lastfm-square', 'charCode': '\uf203' },
            { 'icon': 'fa-leaf', 'charCode': '\uf06c' },
            { 'icon': 'fa-leanpub', 'charCode': '\uf212' },
            { 'icon': 'fa-legal ', 'charCode': '\uf0e3' },
            { 'icon': 'fa-lemon-o', 'charCode': '\uf094' },
            { 'icon': 'fa-level-down', 'charCode': '\uf149' },
            { 'icon': 'fa-level-up', 'charCode': '\uf148' },
            { 'icon': 'fa-life-bouy ', 'charCode': '\uf1cd' },
            { 'icon': 'fa-life-buoy ', 'charCode': '\uf1cd' },
            { 'icon': 'fa-life-ring', 'charCode': '\uf1cd' },
            { 'icon': 'fa-life-saver ', 'charCode': '\uf1cd' },
            { 'icon': 'fa-lightbulb-o', 'charCode': '\uf0eb' },
            { 'icon': 'fa-line-chart', 'charCode': '\uf201' },
            { 'icon': 'fa-link', 'charCode': '\uf0c1' },
            { 'icon': 'fa-linkedin', 'charCode': '\uf0e1' },
            { 'icon': 'fa-linkedin-square', 'charCode': '\uf08c' },
            { 'icon': 'fa-linux', 'charCode': '\uf17c' },
            { 'icon': 'fa-list', 'charCode': '\uf03a' },
            { 'icon': 'fa-list-alt', 'charCode': '\uf022' },
            { 'icon': 'fa-list-ol', 'charCode': '\uf0cb' },
            { 'icon': 'fa-list-ul', 'charCode': '\uf0ca' },
            { 'icon': 'fa-location-arrow', 'charCode': '\uf124' },
            { 'icon': 'fa-lock', 'charCode': '\uf023' },
            { 'icon': 'fa-long-arrow-down', 'charCode': '\uf175' },
            { 'icon': 'fa-long-arrow-left', 'charCode': '\uf177' },
            { 'icon': 'fa-long-arrow-right', 'charCode': '\uf178' },
            { 'icon': 'fa-long-arrow-up', 'charCode': '\uf176' },
            { 'icon': 'fa-magic', 'charCode': '\uf0d0' },
            { 'icon': 'fa-magnet', 'charCode': '\uf076' },
            { 'icon': 'fa-mail-forward ', 'charCode': '\uf064' },
            { 'icon': 'fa-mail-reply ', 'charCode': '\uf112' },
            { 'icon': 'fa-mail-reply-all ', 'charCode': '\uf122' },
            { 'icon': 'fa-male', 'charCode': '\uf183' },
            { 'icon': 'fa-map', 'charCode': '\uf279' },
            { 'icon': 'fa-map-marker', 'charCode': '\uf041' },
            { 'icon': 'fa-map-o', 'charCode': '\uf278' },
            { 'icon': 'fa-map-pin', 'charCode': '\uf276' },
            { 'icon': 'fa-map-signs', 'charCode': '\uf277' },
            { 'icon': 'fa-mars', 'charCode': '\uf222' },
            { 'icon': 'fa-mars-double', 'charCode': '\uf227' },
            { 'icon': 'fa-mars-stroke', 'charCode': '\uf229' },
            { 'icon': 'fa-mars-stroke-h', 'charCode': '\uf22b' },
            { 'icon': 'fa-mars-stroke-v', 'charCode': '\uf22a' },
            { 'icon': 'fa-maxcdn', 'charCode': '\uf136' },
            { 'icon': 'fa-meanpath', 'charCode': '\uf20c' },
            { 'icon': 'fa-medium', 'charCode': '\uf23a' },
            { 'icon': 'fa-medkit', 'charCode': '\uf0fa' },
            { 'icon': 'fa-meh-o', 'charCode': '\uf11a' },
            { 'icon': 'fa-mercury', 'charCode': '\uf223' },
            { 'icon': 'fa-microphone', 'charCode': '\uf130' },
            { 'icon': 'fa-microphone-slash', 'charCode': '\uf131' },
            { 'icon': 'fa-minus', 'charCode': '\uf068' },
            { 'icon': 'fa-minus-circle', 'charCode': '\uf056' },
            { 'icon': 'fa-minus-square', 'charCode': '\uf146' },
            { 'icon': 'fa-minus-square-o', 'charCode': '\uf147' },
            { 'icon': 'fa-mixcloud', 'charCode': '\uf289' },
            { 'icon': 'fa-mobile', 'charCode': '\uf10b' },
            { 'icon': 'fa-mobile-phone ', 'charCode': '\uf10b' },
            { 'icon': 'fa-modx', 'charCode': '\uf285' },
            { 'icon': 'fa-money', 'charCode': '\uf0d6' },
            { 'icon': 'fa-moon-o', 'charCode': '\uf186' },
            { 'icon': 'fa-mortar-board ', 'charCode': '\uf19d' },
            { 'icon': 'fa-motorcycle', 'charCode': '\uf21c' },
            { 'icon': 'fa-mouse-pointer', 'charCode': '\uf245' },
            { 'icon': 'fa-music', 'charCode': '\uf001' },
            { 'icon': 'fa-navicon ', 'charCode': '\uf0c9' },
            { 'icon': 'fa-neuter', 'charCode': '\uf22c' },
            { 'icon': 'fa-newspaper-o', 'charCode': '\uf1ea' },
            { 'icon': 'fa-object-group', 'charCode': '\uf247' },
            { 'icon': 'fa-object-ungroup', 'charCode': '\uf248' },
            { 'icon': 'fa-odnoklassniki', 'charCode': '\uf263' },
            { 'icon': 'fa-odnoklassniki-square', 'charCode': '\uf264' },
            { 'icon': 'fa-opencart', 'charCode': '\uf23d' },
            { 'icon': 'fa-openid', 'charCode': '\uf19b' },
            { 'icon': 'fa-opera', 'charCode': '\uf26a' },
            { 'icon': 'fa-optin-monster', 'charCode': '\uf23c' },
            { 'icon': 'fa-outdent', 'charCode': '\uf03b' },
            { 'icon': 'fa-pagelines', 'charCode': '\uf18c' },
            { 'icon': 'fa-paint-brush', 'charCode': '\uf1fc' },
            { 'icon': 'fa-paper-plane', 'charCode': '\uf1d8' },
            { 'icon': 'fa-paper-plane-o', 'charCode': '\uf1d9' },
            { 'icon': 'fa-paperclip', 'charCode': '\uf0c6' },
            { 'icon': 'fa-paragraph', 'charCode': '\uf1dd' },
            { 'icon': 'fa-paste ', 'charCode': '\uf0ea' },
            { 'icon': 'fa-pause', 'charCode': '\uf04c' },
            { 'icon': 'fa-pause-circle', 'charCode': '\uf28b' },
            { 'icon': 'fa-pause-circle-o', 'charCode': '\uf28c' },
            { 'icon': 'fa-paw', 'charCode': '\uf1b0' },
            { 'icon': 'fa-paypal', 'charCode': '\uf1ed' },
            { 'icon': 'fa-pencil', 'charCode': '\uf040' },
            { 'icon': 'fa-pencil-square', 'charCode': '\uf14b' },
            { 'icon': 'fa-pencil-square-o', 'charCode': '\uf044' },
            { 'icon': 'fa-percent', 'charCode': '\uf295' },
            { 'icon': 'fa-phone', 'charCode': '\uf095' },
            { 'icon': 'fa-phone-square', 'charCode': '\uf098' },
            { 'icon': 'fa-photo ', 'charCode': '\uf03e' },
            { 'icon': 'fa-picture-o', 'charCode': '\uf03e' },
            { 'icon': 'fa-pie-chart', 'charCode': '\uf200' },
            { 'icon': 'fa-pied-piper', 'charCode': '\uf1a7' },
            { 'icon': 'fa-pied-piper-alt', 'charCode': '\uf1a8' },
            { 'icon': 'fa-pinterest', 'charCode': '\uf0d2' },
            { 'icon': 'fa-pinterest-p', 'charCode': '\uf231' },
            { 'icon': 'fa-pinterest-square', 'charCode': '\uf0d3' },
            { 'icon': 'fa-plane', 'charCode': '\uf072' },
            { 'icon': 'fa-play', 'charCode': '\uf04b' },
            { 'icon': 'fa-play-circle', 'charCode': '\uf144' },
            { 'icon': 'fa-play-circle-o', 'charCode': '\uf01d' },
            { 'icon': 'fa-plug', 'charCode': '\uf1e6' },
            { 'icon': 'fa-plus', 'charCode': '\uf067' },
            { 'icon': 'fa-plus-circle', 'charCode': '\uf055' },
            { 'icon': 'fa-plus-square', 'charCode': '\uf0fe' },
            { 'icon': 'fa-plus-square-o', 'charCode': '\uf196' },
            { 'icon': 'fa-power-off', 'charCode': '\uf011' },
            { 'icon': 'fa-print', 'charCode': '\uf02f' },
            { 'icon': 'fa-product-hunt', 'charCode': '\uf288' },
            { 'icon': 'fa-puzzle-piece', 'charCode': '\uf12e' },
            { 'icon': 'fa-qq', 'charCode': '\uf1d6' },
            { 'icon': 'fa-qrcode', 'charCode': '\uf029' },
            { 'icon': 'fa-question', 'charCode': '\uf128' },
            { 'icon': 'fa-question-circle', 'charCode': '\uf059' },
            { 'icon': 'fa-quote-left', 'charCode': '\uf10d' },
            { 'icon': 'fa-quote-right', 'charCode': '\uf10e' },
            { 'icon': 'fa-ra ', 'charCode': '\uf1d0' },
            { 'icon': 'fa-random', 'charCode': '\uf074' },
            { 'icon': 'fa-rebel', 'charCode': '\uf1d0' },
            { 'icon': 'fa-recycle', 'charCode': '\uf1b8' },
            { 'icon': 'fa-reddit', 'charCode': '\uf1a1' },
            { 'icon': 'fa-reddit-alien', 'charCode': '\uf281' },
            { 'icon': 'fa-reddit-square', 'charCode': '\uf1a2' },
            { 'icon': 'fa-refresh', 'charCode': '\uf021' },
            { 'icon': 'fa-registered', 'charCode': '\uf25d' },
            { 'icon': 'fa-remove ', 'charCode': '\uf00d' },
            { 'icon': 'fa-renren', 'charCode': '\uf18b' },
            { 'icon': 'fa-reorder ', 'charCode': '\uf0c9' },
            { 'icon': 'fa-repeat', 'charCode': '\uf01e' },
            { 'icon': 'fa-reply', 'charCode': '\uf112' },
            { 'icon': 'fa-reply-all', 'charCode': '\uf122' },
            { 'icon': 'fa-retweet', 'charCode': '\uf079' },
            { 'icon': 'fa-rmb ', 'charCode': '\uf157' },
            { 'icon': 'fa-road', 'charCode': '\uf018' },
            { 'icon': 'fa-rocket', 'charCode': '\uf135' },
            { 'icon': 'fa-rotate-left ', 'charCode': '\uf0e2' },
            { 'icon': 'fa-rotate-right ', 'charCode': '\uf01e' },
            { 'icon': 'fa-rouble ', 'charCode': '\uf158' },
            { 'icon': 'fa-rss', 'charCode': '\uf09e' },
            { 'icon': 'fa-rss-square', 'charCode': '\uf143' },
            { 'icon': 'fa-rub', 'charCode': '\uf158' },
            { 'icon': 'fa-ruble ', 'charCode': '\uf158' },
            { 'icon': 'fa-rupee ', 'charCode': '\uf156' },
            { 'icon': 'fa-safari', 'charCode': '\uf267' },
            { 'icon': 'fa-save ', 'charCode': '\uf0c7' },
            { 'icon': 'fa-scissors', 'charCode': '\uf0c4' },
            { 'icon': 'fa-scribd', 'charCode': '\uf28a' },
            { 'icon': 'fa-search', 'charCode': '\uf002' },
            { 'icon': 'fa-search-minus', 'charCode': '\uf010' },
            { 'icon': 'fa-search-plus', 'charCode': '\uf00e' },
            { 'icon': 'fa-sellsy', 'charCode': '\uf213' },
            { 'icon': 'fa-send ', 'charCode': '\uf1d8' },
            { 'icon': 'fa-send-o ', 'charCode': '\uf1d9' },
            { 'icon': 'fa-server', 'charCode': '\uf233' },
            { 'icon': 'fa-share', 'charCode': '\uf064' },
            { 'icon': 'fa-share-alt', 'charCode': '\uf1e0' },
            { 'icon': 'fa-share-alt-square', 'charCode': '\uf1e1' },
            { 'icon': 'fa-share-square', 'charCode': '\uf14d' },
            { 'icon': 'fa-share-square-o', 'charCode': '\uf045' },
            { 'icon': 'fa-shekel ', 'charCode': '\uf20b' },
            { 'icon': 'fa-sheqel ', 'charCode': '\uf20b' },
            { 'icon': 'fa-shield', 'charCode': '\uf132' },
            { 'icon': 'fa-ship', 'charCode': '\uf21a' },
            { 'icon': 'fa-shirtsinbulk', 'charCode': '\uf214' },
            { 'icon': 'fa-shopping-bag', 'charCode': '\uf290' },
            { 'icon': 'fa-shopping-basket', 'charCode': '\uf291' },
            { 'icon': 'fa-shopping-cart', 'charCode': '\uf07a' },
            { 'icon': 'fa-sign-in', 'charCode': '\uf090' },
            { 'icon': 'fa-sign-out', 'charCode': '\uf08b' },
            { 'icon': 'fa-signal', 'charCode': '\uf012' },
            { 'icon': 'fa-simplybuilt', 'charCode': '\uf215' },
            { 'icon': 'fa-sitemap', 'charCode': '\uf0e8' },
            { 'icon': 'fa-skyatlas', 'charCode': '\uf216' },
            { 'icon': 'fa-skype', 'charCode': '\uf17e' },
            { 'icon': 'fa-slack', 'charCode': '\uf198' },
            { 'icon': 'fa-sliders', 'charCode': '\uf1de' },
            { 'icon': 'fa-slideshare', 'charCode': '\uf1e7' },
            { 'icon': 'fa-smile-o', 'charCode': '\uf118' },
            { 'icon': 'fa-soccer-ball-o ', 'charCode': '\uf1e3' },
            { 'icon': 'fa-sort', 'charCode': '\uf0dc' },
            { 'icon': 'fa-sort-alpha-asc', 'charCode': '\uf15d' },
            { 'icon': 'fa-sort-alpha-desc', 'charCode': '\uf15e' },
            { 'icon': 'fa-sort-amount-asc', 'charCode': '\uf160' },
            { 'icon': 'fa-sort-amount-desc', 'charCode': '\uf161' },
            { 'icon': 'fa-sort-asc', 'charCode': '\uf0de' },
            { 'icon': 'fa-sort-desc', 'charCode': '\uf0dd' },
            { 'icon': 'fa-sort-down ', 'charCode': '\uf0dd' },
            { 'icon': 'fa-sort-numeric-asc', 'charCode': '\uf162' },
            { 'icon': 'fa-sort-numeric-desc', 'charCode': '\uf163' },
            { 'icon': 'fa-sort-up ', 'charCode': '\uf0de' },
            { 'icon': 'fa-soundcloud', 'charCode': '\uf1be' },
            { 'icon': 'fa-space-shuttle', 'charCode': '\uf197' },
            { 'icon': 'fa-spinner', 'charCode': '\uf110' },
            { 'icon': 'fa-spoon', 'charCode': '\uf1b1' },
            { 'icon': 'fa-spotify', 'charCode': '\uf1bc' },
            { 'icon': 'fa-square', 'charCode': '\uf0c8' },
            { 'icon': 'fa-square-o', 'charCode': '\uf096' },
            { 'icon': 'fa-stack-exchange', 'charCode': '\uf18d' },
            { 'icon': 'fa-stack-overflow', 'charCode': '\uf16c' },
            { 'icon': 'fa-star', 'charCode': '\uf005' },
            { 'icon': 'fa-star-half', 'charCode': '\uf089' },
            { 'icon': 'fa-star-half-empty ', 'charCode': '\uf123' },
            { 'icon': 'fa-star-half-full ', 'charCode': '\uf123' },
            { 'icon': 'fa-star-half-o', 'charCode': '\uf123' },
            { 'icon': 'fa-star-o', 'charCode': '\uf006' },
            { 'icon': 'fa-steam', 'charCode': '\uf1b6' },
            { 'icon': 'fa-steam-square', 'charCode': '\uf1b7' },
            { 'icon': 'fa-step-backward', 'charCode': '\uf048' },
            { 'icon': 'fa-step-forward', 'charCode': '\uf051' },
            { 'icon': 'fa-stethoscope', 'charCode': '\uf0f1' },
            { 'icon': 'fa-sticky-note', 'charCode': '\uf249' },
            { 'icon': 'fa-sticky-note-o', 'charCode': '\uf24a' },
            { 'icon': 'fa-stop', 'charCode': '\uf04d' },
            { 'icon': 'fa-stop-circle', 'charCode': '\uf28d' },
            { 'icon': 'fa-stop-circle-o', 'charCode': '\uf28e' },
            { 'icon': 'fa-street-view', 'charCode': '\uf21d' },
            { 'icon': 'fa-strikethrough', 'charCode': '\uf0cc' },
            { 'icon': 'fa-stumbleupon', 'charCode': '\uf1a4' },
            { 'icon': 'fa-stumbleupon-circle', 'charCode': '\uf1a3' },
            { 'icon': 'fa-subscript', 'charCode': '\uf12c' },
            { 'icon': 'fa-subway', 'charCode': '\uf239' },
            { 'icon': 'fa-suitcase', 'charCode': '\uf0f2' },
            { 'icon': 'fa-sun-o', 'charCode': '\uf185' },
            { 'icon': 'fa-superscript', 'charCode': '\uf12b' },
            { 'icon': 'fa-support ', 'charCode': '\uf1cd' },
            { 'icon': 'fa-table', 'charCode': '\uf0ce' },
            { 'icon': 'fa-tablet', 'charCode': '\uf10a' },
            { 'icon': 'fa-tachometer', 'charCode': '\uf0e4' },
            { 'icon': 'fa-tag', 'charCode': '\uf02b' },
            { 'icon': 'fa-tags', 'charCode': '\uf02c' },
            { 'icon': 'fa-tasks', 'charCode': '\uf0ae' },
            { 'icon': 'fa-taxi', 'charCode': '\uf1ba' },
            { 'icon': 'fa-television', 'charCode': '\uf26c' },
            { 'icon': 'fa-tencent-weibo', 'charCode': '\uf1d5' },
            { 'icon': 'fa-terminal', 'charCode': '\uf120' },
            { 'icon': 'fa-text-height', 'charCode': '\uf034' },
            { 'icon': 'fa-text-width', 'charCode': '\uf035' },
            { 'icon': 'fa-th', 'charCode': '\uf00a' },
            { 'icon': 'fa-th-large', 'charCode': '\uf009' },
            { 'icon': 'fa-th-list', 'charCode': '\uf00b' },
            { 'icon': 'fa-thumb-tack', 'charCode': '\uf08d' },
            { 'icon': 'fa-thumbs-down', 'charCode': '\uf165' },
            { 'icon': 'fa-thumbs-o-down', 'charCode': '\uf088' },
            { 'icon': 'fa-thumbs-o-up', 'charCode': '\uf087' },
            { 'icon': 'fa-thumbs-up', 'charCode': '\uf164' },
            { 'icon': 'fa-ticket', 'charCode': '\uf145' },
            { 'icon': 'fa-times', 'charCode': '\uf00d' },
            { 'icon': 'fa-times-circle', 'charCode': '\uf057' },
            { 'icon': 'fa-times-circle-o', 'charCode': '\uf05c' },
            { 'icon': 'fa-tint', 'charCode': '\uf043' },
            { 'icon': 'fa-toggle-down ', 'charCode': '\uf150' },
            { 'icon': 'fa-toggle-left ', 'charCode': '\uf191' },
            { 'icon': 'fa-toggle-off', 'charCode': '\uf204' },
            { 'icon': 'fa-toggle-on', 'charCode': '\uf205' },
            { 'icon': 'fa-toggle-right ', 'charCode': '\uf152' },
            { 'icon': 'fa-toggle-up ', 'charCode': '\uf151' },
            { 'icon': 'fa-trademark', 'charCode': '\uf25c' },
            { 'icon': 'fa-train', 'charCode': '\uf238' },
            { 'icon': 'fa-transgender', 'charCode': '\uf224' },
            { 'icon': 'fa-transgender-alt', 'charCode': '\uf225' },
            { 'icon': 'fa-trash', 'charCode': '\uf1f8' },
            { 'icon': 'fa-trash-o', 'charCode': '\uf014' },
            { 'icon': 'fa-tree', 'charCode': '\uf1bb' },
            { 'icon': 'fa-trello', 'charCode': '\uf181' },
            { 'icon': 'fa-tripadvisor', 'charCode': '\uf262' },
            { 'icon': 'fa-trophy', 'charCode': '\uf091' },
            { 'icon': 'fa-truck', 'charCode': '\uf0d1' },
            { 'icon': 'fa-try', 'charCode': '\uf195' },
            { 'icon': 'fa-tty', 'charCode': '\uf1e4' },
            { 'icon': 'fa-tumblr', 'charCode': '\uf173' },
            { 'icon': 'fa-tumblr-square', 'charCode': '\uf174' },
            { 'icon': 'fa-turkish-lira ', 'charCode': '\uf195' },
            { 'icon': 'fa-tv ', 'charCode': '\uf26c' },
            { 'icon': 'fa-twitch', 'charCode': '\uf1e8' },
            { 'icon': 'fa-twitter', 'charCode': '\uf099' },
            { 'icon': 'fa-twitter-square', 'charCode': '\uf081' },
            { 'icon': 'fa-umbrella', 'charCode': '\uf0e9' },
            { 'icon': 'fa-underline', 'charCode': '\uf0cd' },
            { 'icon': 'fa-undo', 'charCode': '\uf0e2' },
            { 'icon': 'fa-university', 'charCode': '\uf19c' },
            { 'icon': 'fa-unlink ', 'charCode': '\uf127' },
            { 'icon': 'fa-unlock', 'charCode': '\uf09c' },
            { 'icon': 'fa-unlock-alt', 'charCode': '\uf13e' },
            { 'icon': 'fa-unsorted ', 'charCode': '\uf0dc' },
            { 'icon': 'fa-upload', 'charCode': '\uf093' },
            { 'icon': 'fa-usb', 'charCode': '\uf287' },
            { 'icon': 'fa-usd', 'charCode': '\uf155' },
            { 'icon': 'fa-user', 'charCode': '\uf007' },
            { 'icon': 'fa-user-md', 'charCode': '\uf0f0' },
            { 'icon': 'fa-user-plus', 'charCode': '\uf234' },
            { 'icon': 'fa-user-secret', 'charCode': '\uf21b' },
            { 'icon': 'fa-user-times', 'charCode': '\uf235' },
            { 'icon': 'fa-users', 'charCode': '\uf0c0' },
            { 'icon': 'fa-venus', 'charCode': '\uf221' },
            { 'icon': 'fa-venus-double', 'charCode': '\uf226' },
            { 'icon': 'fa-venus-mars', 'charCode': '\uf228' },
            { 'icon': 'fa-viacoin', 'charCode': '\uf237' },
            { 'icon': 'fa-video-camera', 'charCode': '\uf03d' },
            { 'icon': 'fa-vimeo', 'charCode': '\uf27d' },
            { 'icon': 'fa-vimeo-square', 'charCode': '\uf194' },
            { 'icon': 'fa-vine', 'charCode': '\uf1ca' },
            { 'icon': 'fa-vk', 'charCode': '\uf189' },
            { 'icon': 'fa-volume-down', 'charCode': '\uf027' },
            { 'icon': 'fa-volume-off', 'charCode': '\uf026' },
            { 'icon': 'fa-volume-up', 'charCode': '\uf028' },
            { 'icon': 'fa-warning ', 'charCode': '\uf071' },
            { 'icon': 'fa-wechat ', 'charCode': '\uf1d7' },
            { 'icon': 'fa-weibo', 'charCode': '\uf18a' },
            { 'icon': 'fa-weixin', 'charCode': '\uf1d7' },
            { 'icon': 'fa-whatsapp', 'charCode': '\uf232' },
            { 'icon': 'fa-wheelchair', 'charCode': '\uf193' },
            { 'icon': 'fa-wifi', 'charCode': '\uf1eb' },
            { 'icon': 'fa-wikipedia-w', 'charCode': '\uf266' },
            { 'icon': 'fa-windows', 'charCode': '\uf17a' },
            { 'icon': 'fa-won ', 'charCode': '\uf159' },
            { 'icon': 'fa-wordpress', 'charCode': '\uf19a' },
            { 'icon': 'fa-wrench', 'charCode': '\uf0ad' },
            { 'icon': 'fa-xing', 'charCode': '\uf168' },
            { 'icon': 'fa-xing-square', 'charCode': '\uf169' },
            { 'icon': 'fa-y-combinator', 'charCode': '\uf23b' },
            { 'icon': 'fa-y-combinator-square', 'charCode': '\uf1d4' },
            { 'icon': 'fa-yahoo', 'charCode': '\uf19e' },
            { 'icon': 'fa-yc ', 'charCode': '\uf23b' },
            { 'icon': 'fa-yc-square ', 'charCode': '\uf1d4' },
            { 'icon': 'fa-yelp', 'charCode': '\uf1e9' },
            { 'icon': 'fa-yen ', 'charCode': '\uf157' },
            { 'icon': 'fa-youtube', 'charCode': '\uf167' },
            { 'icon': 'fa-youtube-play', 'charCode': '\uf16a' },
            { 'icon': 'fa-youtube-square', 'charCode': '\uf166' }
        ]
    };
    angular.module('siemens.simaticit.common.widgets.graph').value('common.graph.fontAwesomIconData', fontAwesomIconJson);

})();

/*jshint -W117,-W098, -W116 */
(function () {
    'use strict';
    //#region ng-doc comments
    /**
    * @ngdoc type
    * @name GraphOptions
    * @module siemens.simaticit.common.widgets.graph
    * @description Represents the style of an interactive graph. (for further information see {@link sitInteractiveGraph}).
    * @property {String} layout Represents the layout of the graph, either **vertical** or **horizontal**.
    * @property {Boolean} [zooming = true] If false, the pan and zoom slider and buttons will be hidden, otherwise they will be shown.
    * @property {Boolean} [autoRefresh = false] If true, watches will be enabled for data change, otherwise they will be disabled.
    * @property {Boolean} [iconVisibility = true] If false, the nodes icon will be hidden, otherwise they will be shown.
    * @property {String} [nodeSize = small] Represents the node size, possible values are **small**,**medium** or **large**.
    * @property {NodeStyle} nodeStyle See {@link NodeStyle} for details.
    * @property {Array} edgeStyle This object contains the following properties:
    ** **color** Represents the color of the edge, either as a CSS color value or name.
    ** **width** Represents the width of the edge.
    * @property {Object} selectedNodeStyle This object contains the following properties:
    ** **background-color** Represents the color of the node, either as a CSS color value or name.
    ** **stroke** Represents the color of the node border.
    ** **stroke-width** Represents the thickness of the node border.
    * @property {Object} selectedEdgeStyle This object contains the following properties:
    ** **stroke** Represents the color of the edge, either as a CSS color value or name.
    ** **stroke-width** Represents the thickness of the edge.

     */

    /**
    * @ngdoc type
    * @name NodeStyle
    * @module siemens.simaticit.common.widgets.graph
    * @description Represents the style of a node within an interactive graph (for further information see {@link sitInteractiveGraph}).
    * @property {String} background-color Represents the color of the background, either as a CSS color value or name.
    * @property {String} color Represents the color of the text, either as a CSS color value or name.
    * @property {Number} stroke-width Represents the border-width of the node.
    * @property {String} stroke Represents the border color of the node, either as a CSS color value or name.
    */

    /**
    * @ngdoc type
    * @name GraphData
    * @module siemens.simaticit.common.widgets.graph
    * @description Represents the nodes and edges of an interactive graph (for further information see {@link sitInteractiveGraph}).
    * @property {Node[]} nodes An array of {@link Node} objects.
    * @property {Edge[]} edges An array of {@link Edge} objects.
    */

    /**
    * @ngdoc type
    * @name Node
    * @module siemens.simaticit.common.widgets.graph
    * @description Represents a node of an interactive graph. (for further information see {@link sitInteractiveGraph}).
    * @property {Number|String} id Unique identifier of the node.
    * @property {String} name Name of the node.
    * @property {String} description Contains information about the node that is displayed when hovered over.
    * @property {Object} data Object that contains customized attributes that can be used for configuring nodes.
    * The properties used are: <ul><li>**status**: defines the current node selection status </li></ul>
    * @property {String} icon Optional property that is used to display an icon for each of the nodes.
    * A valid [FontAwesome](http://fortawesome.github.io/Font-Awesome/icons/) CSS class that determines the node icon to be displayed.
    * If not specified, the default icon is displayed.
    * @property {String} charCode Optional property that can be used to specify the **characterCode** of the **Font Awesome** icon if the icon property is not specified.
    * @property {String} style Configurable object for node style. This object contains the following properties:
    ** **background-color** Represents the color of the background, either as a CSS color value or name.
    ** **color** Represents the color of the text, either as a CSS color value or name.
    ** **stroke-width** Represents the border-width of the node.
    ** **stroke** Represents the border color of the node, either as a CSS color value or name.
    ** **rx** Co-ordinate value for the node.
    ** **ry** Co-ordinate value for the node.
    */

    /**
    * @ngdoc type
    * @name Edge
    * @module siemens.simaticit.common.widgets.graph
    * @description Represents an edge of the interactive graph. (for further information see {@link sitInteractiveGraph}).
    * @property {Number|String} id Unique identifier of the edge.
    * @property {String} name Name of the edge.
    * @property {String} description Information about the edge.
    * @property {Number|String} from Specifies the originating Node Id for the edge.
    * @property {Number|String} to Specifies the terminating Node Id for the edge.
    * @property {Object} data An object that contains customized attributes that can be used for configuring edges.
    * @property {String} style The configurable object for the edge style. This object contains following properties:
    ** **color** Color of the text.
    ** **width** Width of the edge.
    */

    /**
    *   @ngdoc directive
    *   @name sitInteractiveGraph
    *   @module siemens.simaticit.common.widgets.graph
    *   @restrict E
    *   @description
    *   A graph represents the state and the relationship between nodes and edges. This widget contains a group of selectable nodes and directed edges.
    *   The style of the graph can be configured at node level or graph level.
    *
    * @usage
    *   As an element:
    *   ```
    *   <sit-interactive-graph
    *     sit-data="ctrl.data"
    *     sit-options="ctrl.options">
    *  </sit-interactive-graph>
    *   ```
    *
    *  @param {GraphOptions} sit-options For a description of this object see {@link GraphOptions}
    *  @param {GraphData} sit-data For a description of this object see {@link GraphData}
    *
    *    @example
    *   In a view template, the `sit-interactive-graph` directive can be used as follows:
    *
    * ```
    * <div style="width: 550px; height: 600px; margin-left: 100px">
    *   <sit-interactive-graph
    *   sit-data="ctrl.data" sit-options="ctrl.options">
    *  </sit-interactive-graph>
    * </div>
    *   ```
    *  The following example shows how to add nodes and edges, and define graph option properties in a graph by defining them in the
    *  ** GraphData** and ** GraphOptions**. This type of example is should be used if, **sit-autoRefresh** property is 'false' or
    *  'undefined'.
    * ```
    * // ...
    *      var ctrl=this;
    *      ctrl.data = {
    *         nodes: [ {
    *                   id: 1,
    *                   name: "node1",
    *                   description: "parent description",
    *                   icon: "fa fa-book",
    *                    data: {},
    *                    style: {
    *                           "background-color": "#B8E6FA",
    *                           "color": "#050605",
    *                           "stroke-width": 1,
    *                           "stroke": "#D8D334"
    *                           }
    *                  },
    *                  {
    *                    id: 2,
    *                    name: "node2",
    *                     description: "parent description",
    *                     charCode:"\uf039",
    *                     data: {},
    *                     style: {
    *                              "background-color": "#B8E6FA",
    *                              "color": "#050605",
    *                              "stroke-width": 1,
    *                              "stroke": "#D8D334"
    *                            }
    *                 },
    *                 {
    *                   id: 3,
    *                   name: "node3",
    *                   description: "parent description",
    *                   icon:"",
    *                   charCode:"\uf0c5",
    *                   data: {},
    *                   style: {
    *                           "background-color": "#B8E6FA",
    *                           "color": "#050605",
    *                           "stroke-width": 1,
    *                           "stroke": "#D8D334"
    *                           }
    *                  }],
    *
    *        edges: [{
    *                   id: 1,
    *                   name: "link1",
    *                   description: "link1 ",
    *                   from: 1,
    *                   to: 2,
    *                   data: {}
    *               },
    *               {
    *               id: 2,
    *               name: "link2",
    *               description: "link2 ",
    *               from: 1,
    *               to: 3,
    *               data: {}
    *               }]
    *        };
    *
    *       ctrl.options = {
    *           autoRefresh : false,
    *           zooming:true,
    *           iconVisibility: true,
    *           nodeSize : 'small',
    *           selectedNodeStyle: {
    *               "stroke": "black",
    *               "background-color": "green",
    *           },
    *           selectedEdgeStyle: {
    *               "stroke": "yellow",
    *           },
    *           nodeStyle={
    *                 "background-color": "#B8E6FA",
    *                 "color": "#050605",
    *                 "stroke-width": 1,
    *                 "stroke": "#D8D334"
    *           },
    *          edgeStyle={
    *                  color: "red",
    *                  width: 4
    *           },
    *           onNodeSelectCallback: ctrl.nodeClicked,
    *           onEdgeSelectCallback: ctrl.edgeClicked,
    *           onBeforeRenderCallback: function (node) {
    *               if (node.data != undefined && node.data.status != undefined && node.data.status == "current") {
    *                   if (node.style != undefined && node.style["background-color"] != undefined)
    *                       node.style["background-color"] = "red";
    *                       if (node.style != undefined && node.style["stroke"] != undefined)
    *                           node.style["stroke"] = "#FF824D";
    *               }
    *           }
    *       };
    **   ```
    *
    *   The following example shows how to add nodes and edges to **GraphData** and to set **GraphOptions**. This type of example should be used
    *   if, **sit-autoRefresh** property is 'true'.
    *
    *   ```
    *     ctrl.data.nodes= [
    *          {
    *                id: 1,
    *                name: "node1",
    *                description: "parent description",
    *                icon: "fa fa-book",
    *                data: {},
    *                style: {
    *                         "background-color": "#B8E6FA",
    *                         "color": "#050605",
    *                         "stroke-width": 1,
    *                         "stroke": "#D8D334"
    *                        }
    *          },
    *          {
    *                id: 2,
    *                name: "node2",
    *                description: "parent description",
    *                charCode:"\uf039",
    *                data: {},
    *                style: {
    *                         "background-color": "#B8E6FA",
    *                         "color": "#050605",
    *                         "stroke-width": 1,
    *                         "stroke": "#D8D334"
    *                        }
    *          },
    *          {
    *                id: 3,
    *                name: "node3",
    *                description: "parent description",
    *                icon:"",
    *                charCode:"\uf0c5",
    *                data: {},
    *                style: {
    *                         "background-color": "#B8E6FA",
    *                         "color": "#050605",
    *                         "stroke-width": 1,
    *                         "stroke": "#D8D334"
    *                        }
    *          }
    *    ];
    *
    *    ctrl.data.edges= [
    *           {
    *               id: 1,
    *               name: "link1",
    *               description: "link1 ",
    *               from: 1,
    *               to: 2,
    *               data: {}
    *           },
    *           {
    *               id: 2,
    *               name: "link2",
    *               description: "link2 ",
    *               from: 1,
    *               to: 3,
    *               data: {}
    *           }
    *            ];
    *
    *
    *   ctrl.options.autoRefresh=true;
    *   ctrl.options.zooming=false;
    *   ctrl.options.iconVisibility=false;
    *   ctrl.options.nodeSize="small"
    *   ctrl.options.layout="horizontal";
    *   ctrl.options.selectedNodeStyle= {
    *                     "background-color": "green",
    *                     "stroke": "blue",
    *                       };
    *   ctrl.options.selectedEdgeStyle= {
    *                     "stroke": "green",
    *                      };
    *   ctrl.options.nodeStyle={
    *                     "background-color": "#B8E6FA",
    *                     "color": "#050605",
    *                     "stroke-width": 1,
    *                     "stroke": "#D8D334"
    *                   };
    *   ctrl.options.edgeStyle={
    *                      color: "red",
    *                      width: 4
    *                      };
    *   ctrl.options.onNodeSelectCallback= ctrl.nodeClicked;
    *   ctrl.options.onEdgeSelectCallback= ctrl.edgeClicked;
    *   ctrl.options.onBeforeRenderCallback= function (node) {
   *         if (node.data != undefined && node.data.status != undefined && node.data.status == "current") {
   *        if (node.style !=undefined && node.style["background-color"]!= undefined)
   *                 node.style["background-color"]= "red";
   *             if (node.style != undefined &&  node.style["stroke"]!= undefined)
   *             node.style["stroke"]= "#FF824D";
   *         }
   *       };
   *      ctrl.options.drawGraph(ctrl.graphdata.nodes, ctrl.graphdata.edges);
   * ```
   *
   *
   * The following example shows how to configure a function to be executed when a node is selected.
   *
   * ```
   * ctrl.nodeClicked = function (node) {
   *         alert(node.name);
   * }
   * ```
   *
   * The following example shows how to display the node-name.
   *
   * ```
   * ctrl.options.onBeforeRenderCallback: function (node) {
   *         if (node.data != undefined && node.data.status != undefined && node.data.status == "current") {
   *        if (node.style !=undefined && node.style["background-color"]!= undefined)
   *                 node.style["background-color"]= "red";
   *             if (node.style != undefined &&  node.style["stroke"]!= undefined)
   *             node.style["stroke"]= "#FF824D";
   *         }
   * }
   * ```
   *
    * The **onBeforeRenderCallback** event is fired before each node is initialized to make sure that the nodes are configured based on user-defined conditions.
    * In the above example, the **onBeforeRenderCallback** is handled to change the style of each node based on user-defined conditions.
   *

*/
    //#endregion

    sitInteractiveGraph.$inject = ['$translate', '$compile', '$timeout', 'd3', '$window'];
    function sitInteractiveGraph($translate, $compile, $timeout, d3, $window) {

        GraphController.$inject = ['$scope', '$element', '$compile', 'common.graph.fontAwesomIconData'];
        function GraphController($scope, $element, $compile, fontAwesomIconJson) {
            var vm = this;

            function init() {
                if (vm.sitData) {
                    vm.graphdata = vm.sitData;
                }
                if (vm.sitOptions) {
                    vm.graphstyle = vm.sitOptions;
                }
                else {
                    vm.sitOptions = vm.graphstyle;
                }

                $scope.ctrl = vm;
                $scope.zoomLevel = 4;
                vm.showPan = 0;
                vm.isGraphValid = true;
                vm.graphError = '';

                //graph methods
                vm.isValidGraph = isValidGraph;
                vm.getShowPanVal = getShowPanVal;
                vm.setShowPanVal = setShowPanVal;
                vm.setPanRectValues = setPanRectValues;
                vm.getNodeStyle = getNodeStyle;
                vm.getEdgeStyle = getEdgeStyle;
                vm.getFontAwesomeIconData = getFontAwesomeIconData;
                vm.validateGraph = validateGraph;

                //set empty graphstyle if not graph style is passed
                if (!vm.sitOptions) {
                    vm.sitOptions = {
                    };
                }

                if (undefined === vm.sitOptions.autoRefresh || null === vm.sitOptions.autoRefresh) {
                    vm.sitOptions.autoRefresh = false; // the watches will be disabled.
                }

                if (undefined === vm.sitOptions.zooming || null === vm.sitOptions.zooming) {
                    vm.sitOptions.zooming = true;//by default zooming controls are visible
                }
                vm.sitOptions.iconVisibility = typeof vm.sitOptions.iconVisibility === 'boolean' ? vm.sitOptions.iconVisibility : true;
            }

            function initAPI() {
                /**
                *@ngdoc method
                *@module siemens.simaticit.common.widgets.graph
                *@name GraphOptions#drawGraph
                *
                *@description
                * This method will draw the graph for the given edge and node set.
                *
                *@param {Array} nodeList The list of nodes which are required to draw a graph.
                *@param {Array} edgeList The list of edges which are required to draw a graph.
                */
                vm.sitOptions.drawGraph = drawGraph;

                /**
                *@ngdoc method
                *@module siemens.simaticit.common.widgets.graph
                *@name GraphOptions#getNode
                *
                *@description
                * Returns the node object for the given ID.
                *
                *@param {Integer} id The unique identification number of each node.
                *@returns {Object} Returns the complete node object for the node specified by the **id**; if the node is not found, an empty object is returned.
                */
                vm.sitOptions.getNode = getNode;

                /**
                *@ngdoc method
                *@module siemens.simaticit.common.widgets.graph
                *@name GraphOptions#getNeighbors
                *
                *@description
                *Returns information on all the nodes linked to the given node.
                *
                *@param {Object} node The node object.
                *@returns {Array} Returns an array of unique neighbouring nodes for the given node.
                */
                vm.sitOptions.getNeighbors = getNeighbors;

                /**
                *@ngdoc method
                *@module siemens.simaticit.common.widgets.graph
                *@name GraphOptions#getNodes
                *
                *@description
                *Returns the object containing all nodes and edges.
                *
                *@returns {Object} Returns an object that contains all the nodes and egdes of the graph widget.
                */
                vm.sitOptions.getNodes = getNodes;

                /**
                *@ngdoc method
                *@module siemens.simaticit.common.widgets.graph
                *@name GraphOptions#getEdge
                *
                *@description
                *Returns the edge object for the given 'from' and 'to' nodes.
                *
                *@param {Object} d The 'from' and 'to' nodes.
                *@returns {Object} The edge which connects the given nodes. If a node is not found, an empty object is returned.
                */
                vm.sitOptions.getEdge = getEdge;

                /**
                *@ngdoc method
                *@module siemens.simaticit.common.widgets.graph
                *@name GraphOptions#showZoomingControls
                *
                *@description
                *Shows the graph zooming controls.
                */
                vm.sitOptions.showZoomingControls = showZoomingControls;

                /**
                *@ngdoc method
                *@module siemens.simaticit.common.widgets.graph
                *@name GraphOptions#hideZoomingControls
                *
                *@description
                *Hides the graph zooming controls.
                */
                vm.sitOptions.hideZoomingControls = hideZoomingControls;

                /**
                *@ngdoc method
                *@module siemens.simaticit.common.widgets.graph
                *@name GraphOptions#zoomIn
                *
                *@description
                *Increases the magnification of the graph.
                */
                vm.sitOptions.zoomIn = zoomIn;

                /**
                *@ngdoc method
                *@module siemens.simaticit.common.widgets.graph
                *@name GraphOptions#zoomOut
                *
                *@description
                *Reduces the magnification of the graph.
                */
                vm.sitOptions.zoomOut = zoomOut;

                /**
                *@ngdoc method
                *@module siemens.simaticit.common.widgets.graph
                *@name GraphOptions#autoFit
                *
                *@description
                *Fits the graph size to the graph window size.
                */
                vm.sitOptions.autoFit = autoFit;
            }

            function activate() {
                init();
                initAPI();

                // validate the given graph data
                validateGraph();
            }

            //#region getter and setters
            function isValidGraph() {
                return vm.isGraphValid;
            }

            function getShowPanVal() {
                return vm.showPan;
            }

            function setShowPanVal(showPan) {
                vm.showPan = showPan;
            }

            function setPanRectValues(panRect) {
                vm.panRect = panRect;
            }
            //#endregion

            //#region API methods
            function drawGraph(nodeList, edgeList) {
                vm.graphdata.nodes = nodeList;
                vm.graphdata.edges = edgeList;
                if (validateGraph()) {
                    $scope.graphUtil.drawInteractiveGraph();
                    $scope.graphUtil.calcPanWinSize();
                    $scope.graphUtil.generatePanAndZoom();
                    if (vm.getShowPanVal()) {
                        $scope.graphUtil.drawPanGraph();
                    }
                    $scope.setWatch();
                }
            }

            function getNode(id) {
                var _node;
                if (vm.graphdata !== undefined && vm.graphdata.nodes !== undefined && vm.graphdata.nodes.length > 0) {
                    vm.graphdata.nodes.forEach(function (node) {
                        if (node.id === parseInt(id, 10)) {
                            _node = node;
                        }
                    });
                }
                return _node;
            }

            function getNeighbors(node) {
                var neighbors = [];
                if (vm.graphdata !== undefined && vm.graphdata.nodes !== undefined && 0 < vm.graphdata.nodes.length) {
                    if (vm.graphdata !== undefined && vm.graphdata.edges !== undefined && 0 < vm.graphdata.edges.length) {
                        // Neighbor nodes are nodes which are connected to given node.
                        vm.graphdata.edges.forEach(function (link) {
                            var nodeid;
                            if (link.from === node.id) {
                                nodeid = link.to;
                            } else if (link.to === node.id) {
                                nodeid = link.from;
                            } else {
                                return;
                            }
                            neighbors.push(vm.sitOptions.getNode(nodeid));
                        });
                    }
                }

                return _.uniq(neighbors);
            }

            function getNodes() {
                var object = [];
                object.push(vm.graphdata.nodes);
                object.push(vm.graphdata.edges);
                return object;
            }

            function getEdge(d) {
                var fromNode = Number(d.v);
                var toNode = Number(d.w);
                var edge;
                vm.graphdata.edges.forEach(function (link) {
                    if (link !== undefined && link.from !== undefined && link.to !== undefined && link.from === fromNode && link.to === toNode) {
                        edge = link;
                    }
                });
                return edge;
            }

            function showZoomingControls() {
                vm.sitOptions.zooming = true;
            }

            function hideZoomingControls() {
                vm.sitOptions.zooming = false;
            }

            function zoomIn() {
                if ($scope.zoomLevel < 8) {
                    $scope.zoomLevel = Number($scope.zoomLevel) + 0.1;
                }
                else {
                    $scope.zoomLevel = $scope.zoomLevel;
                }
                $scope.graphUtil.handleZoom();
            }

            function zoomOut() {
                if ($scope.zoomLevel > 1) {
                    $scope.zoomLevel = Number($scope.zoomLevel) - 0.1;
                }
                else {
                    $scope.zoomLevel = $scope.zoomLevel;
                }
                $scope.graphUtil.handleZoom();
            }

            function autoFit() {
                $scope.graphUtil.autoFit();
            }
            //#endregion

            //#region Draw Interactive Graph
            //returns the style object for the nodes.
            function getNodeStyle(nodeStyle) {
                var style, lableStyle;
                style = 'fill:' + nodeStyle['background-color'] + ';' + 'stroke-width:' + nodeStyle['stroke-width'] + 'px' + ';' + 'stroke:' + nodeStyle['stroke'];
                lableStyle = 'color:' + nodeStyle['color'];
                return {
                    style: style, lableStyle: lableStyle
                };
            }

            //returns the style object for the edges.
            function getEdgeStyle(edgeStyle) {
                var style;
                style = 'stroke:' + edgeStyle.color + ';' + 'stroke-width:' + edgeStyle.width + 'px';
                return style;
            }

            function getFontAwesomeIconData() {
                return fontAwesomIconJson.fontAwesomIcon;
            }

            //validate edges according to nodes
            function validateEdges() {
                //if an edge has corresponding node not found, the edge will be rejected
                vm.graphdata.edges = _.reject(vm.graphdata.edges, function (edge) {
                    //look for edge 'from' node
                    var nodeObj = _.find(vm.graphdata.nodes, function (node) {
                        //return true if match is found
                        if (node.id === edge.from) {
                            return true;
                        }
                        if (node.originalNodeId && node.originalNodeId === edge.from) {
                            return true;
                        }
                    });
                    //reject the node if match is not found
                    if (!nodeObj) {
                        return true;
                    }
                    //look for edge 'to' node
                    nodeObj = _.find(vm.graphdata.nodes, function (node) {
                        if (node.id === edge.to) {
                            return true;
                        }
                        if (node.originalNodeId && node.originalNodeId === edge.to) {
                            return true;
                        }
                    });
                    if (!nodeObj) {
                        return true;
                    }
                });
            }

            //generate numeric ID for nodes and edges
            function generateID() {
                var i, j, id;
                var nodeLength = vm.graphdata.nodes.length;
                var edgeLength = vm.graphdata.edges.length;
                //generating unique node id
                for (i = 0; i < nodeLength; i++) {
                    id = i + 1;
                    vm.graphdata.nodes[i].originalNodeId = vm.graphdata.nodes[i].originalNodeId ? vm.graphdata.nodes[i].originalNodeId : vm.graphdata.nodes[i].id;
                    vm.graphdata.nodes[i].id = id;
                }

                //generating unique edge id
                for (i = 0; i < edgeLength; i++) {
                    id = i + 1;
                    vm.graphdata.edges[i].originalEdgeId = vm.graphdata.edges[i].originalEdgeId ? vm.graphdata.edges[i].originalEdgeId : vm.graphdata.edges[i].id;
                    vm.graphdata.edges[i].id = id;

                    vm.graphdata.edges[i].originalFrom = vm.graphdata.edges[i].originalFrom ? vm.graphdata.edges[i].originalFrom : vm.graphdata.edges[i].from;
                    vm.graphdata.edges[i].originalTo = vm.graphdata.edges[i].originalTo ? vm.graphdata.edges[i].originalTo : vm.graphdata.edges[i].to;
                }

                //changing the 'to' and 'from' value of edge
                for (i = 0; i < edgeLength; i++) {
                    var count = 0;
                    for (j = 0; j < nodeLength; j++) {
                        if (vm.graphdata.edges[i].originalFrom === vm.graphdata.nodes[j].originalNodeId) {
                            vm.graphdata.edges[i].from = vm.graphdata.nodes[j].id;
                            count++;
                        }
                        if (vm.graphdata.edges[i].originalTo === vm.graphdata.nodes[j].originalNodeId) {
                            vm.graphdata.edges[i].to = vm.graphdata.nodes[j].id;
                            count++;
                        }
                        if (2 === count) {
                            break;
                        }
                    }
                }
            }

            //validating the graph data
            function validateGraph() {
                if (!vm.graphdata) {
                    vm.graphError = $translate.instant('Graph.error.graphUndefined');
                    vm.isGraphValid = false;
                    return false;
                }

                //validate nodes of graph for uniqueness
                var uniqueNodes = _.uniq(vm.graphdata.nodes, false, function (node) {
                    return node.id;
                });
                if (uniqueNodes.length !== vm.graphdata.nodes.length) {
                    vm.graphError = $translate.instant('Graph.error.uniqueNodeId');
                    vm.isGraphValid = false;
                    return false;
                }
                //validate nodes of graph for mandatory properties, reject the ones which have properties missing
                vm.graphdata.nodes = _.reject(vm.graphdata.nodes, function (node) {
                    if (!node.id)
                        return true;
                });

                //validate edges of graph for uniqueness
                var uniqueEdges = _.uniq(vm.graphdata.edges, false, function (edge) {
                    return edge.id;
                });
                if (uniqueEdges.length !== vm.graphdata.edges.length) {
                    vm.graphError = $translate.instant('Graph.error.uniqueEdgeId');
                    vm.isGraphValid = false;
                    return false;
                }
                //validate edges of graph for mandatory properties, reject the ones which have properties missing
                vm.graphdata.edges = _.reject(vm.graphdata.edges, function (edge) {
                    if (!edge.id) {
                        return true;
                    }
                });
                //validate edges according to nodes
                validateEdges();

                //generate numeric ID for nodes and edges
                generateID();

                return true;
            }
            //#endregion

            //chrome (48.0.2564.23)+ removes SVGElement.prototype.getTransformToElement which is used when creating edges.
            window.SVGElement.prototype.getTransformToElement = window.SVGElement.prototype.getTransformToElement || function (elem) {
                return elem.getScreenCTM().inverse().multiply(this.getScreenCTM());
            };

            activate();
        }


        function GraphUtil(scope, $compile, element, controller) {

            //graph attributes
            this.graphHeight = null;
            this.graphWidth = null;
            this.g = null;
            this.rectRatio = null;
            this.panWindowWidth = null;
            this.panWindowHeight = null;
            this.panZoomLevel = null;
            this.panRect = null;
            this.dispatch = null;
            this.isRectAdded = false;
            this.autoFitZoom = 1;
            this.parentWidth = $(element).parent().width() - 40;
            this.parentHeight = $(element).parent().height() - 68;
            var graphTranslateValueY = 0;
            var minPanRectWidth, maxPanRectWidth;
            var callFromDrag = false;
            var graphstyle = controller.sitOptions;
            var graphdata = controller.graphdata;
            var currInstance = this;
            var LARGE_NODE_WIDTH = 320;
            var LARGE_NODE_HEIGHT = 48;
            var MEDIUM_NODE_WIDTH = 220;
            var MEDIUM_NODE_HEIGHT = 44;
            var SMALL_NODE_WIDTH = 120;
            var SMALL_NODE_HEIGHT = 40;
            var DEFAULT_NODE_PADDING = 20;
            var DEFAULT_ICONWIDTH = 20;
            var EDGE_WIDTH = 100;


            (function seGraphUtilMethods() {
                // graph methods
                currInstance.drawInteractiveGraph = drawInteractiveGraph;
                currInstance.createNodes = createNodes;
                currInstance.createEdges = createEdges;
                currInstance.attachToolTipForNodes = attachToolTipForNodes;
                currInstance.attachToolTipForEdges = attachToolTipForEdges;
                currInstance.registerDispatchers = registerDispatchers;
                currInstance.calcEllipsis = calcEllipsis;
                currInstance.setFontIconsForNode = setFontIconsForNode;
                currInstance.handlePathClickCallBack = handlePathClickCallBack;
                currInstance.handleNodeClickCallBack = handleNodeClickCallBack;
                currInstance.calcPanWinSize = calcPanWinSize;
                currInstance.calcPanRectSize = calcPanRectSize;
                currInstance.calcPanScale = calcPanScale;
                currInstance.showPanWindow = showPanWindow;
                currInstance.graphRefresh = graphRefresh;
                currInstance.moveOnScroll = moveOnScroll;
                currInstance.generatePanAndZoom = generatePanAndZoom;
                currInstance.translateGraph = translateGraph;
                currInstance.slided = slided;
                currInstance.handleZoom = handleZoom;
                currInstance.autoFit = autoFit;
                currInstance.drawPanGraph = drawPanGraph;
                currInstance.recalculateDimentions = recalculateDimentions;
            })();

            function selectElement(selector) {

                var e = element.find(selector)[0];
                return d3.select(e);

            }

            function recalculateDimentions() {
                this.parentWidth = $(element).parent().width() - 40;
                this.parentHeight = $(element).parent().height() - 68;
            }

            // Draws the graph when graph data is given
            function drawInteractiveGraph() {

                // if layout is horizontal then graph will be displayed horizontal otherwise vertical
                var layout;
                if (graphstyle.layout !== undefined) {
                    if (graphstyle.layout === 'horizontal') {
                        layout = 'LR';
                    }
                    else {
                        layout = 'TB';
                    }
                }
                else {
                    layout = 'TB';
                }
                this.g = new dagreD3.graphlib.Graph().setGraph({ rankdir: layout }).setDefaultEdgeLabel(function () {
                    return {
                    };
                });

                var nodeWidth, nodeHeight;
                var nodeSize = graphstyle.nodeSize ? graphstyle.nodeSize.toLowerCase() : 'small';

                //padding of 10px is added on all the sides of node in dagre.d3.js , hence DEFAULT_NODE_PADDING(20px) is subtracted from width and height
                switch (nodeSize) {
                    case 'medium':
                        nodeWidth = MEDIUM_NODE_WIDTH - DEFAULT_NODE_PADDING;
                        nodeHeight = MEDIUM_NODE_HEIGHT  - DEFAULT_NODE_PADDING;
                        break;
                    case 'large':
                        nodeWidth = LARGE_NODE_WIDTH - DEFAULT_NODE_PADDING;
                        nodeHeight = LARGE_NODE_HEIGHT - DEFAULT_NODE_PADDING;
                        break;
                    default:
                        nodeWidth = SMALL_NODE_WIDTH - DEFAULT_NODE_PADDING;
                        nodeHeight = SMALL_NODE_HEIGHT - DEFAULT_NODE_PADDING;
                }

                this.createNodes(nodeWidth, nodeHeight, nodeSize);
                this.createEdges(EDGE_WIDTH);

                // sets node width and height
                //this.g.nodes().forEach(function (v) {
                //    var node = currInstance.g.node(v);
                //    node.rx = node.ry = 5;
                //    node.width = nodeWidth;
                //    node.height = 20;
                //});
                var svg = selectElement('svg');
                svg.html('');
                var svgGroup = svg.append('g');

                // Create the renderer
                var render = new dagreD3.render(); //eslint-disable-line new-cap

                // Run the renderer. This is what draws the final graph.
                render(svg.select('svg g'), this.g);

                // set the icon for the nodes
                if (graphstyle.iconVisibility) {
                    this.setFontIconsForNode(svg,nodeSize);
                 }

                svg.select('g').selectAll('.node')[0].forEach(function (node) {
                    if (node.childNodes[0].getAttribute('style')) {
                        node.childNodes[0].setAttribute('data-style', node.childNodes[0].getAttribute('style'));
                    }
                });
                svg.select('g').selectAll('path')[0].forEach(function (path) {
                    if (path.getAttribute('style')) {
                        path.setAttribute('data-style', path.getAttribute('style'));
                    }
                });
                this.registerDispatchers();
                svg.select('g').selectAll('path').on('click', this.handlePathClickCallBack);

                // can custom events for handling node selection
                svg.select('g').selectAll('.node').on('click', this.handleNodeClickCallBack);

                this.attachToolTipForNodes(svg);
                this.attachToolTipForEdges(svg);
                this.graphHeight = this.g.graph().height + 40;
                this.graphWidth = this.g.graph().width + 40;

                svg.attr('height', this.graphHeight + 40);
                svg.attr('width', this.graphWidth + 40);

                var parentWidth = this.parentWidth;
                var parentHeight = this.parentHeight;
                var xscale = parentWidth / this.graphWidth;
                var yscale = parentHeight / this.graphWidth;
                var scaleFactor = xscale < yscale ? xscale : yscale;
                scaleFactor = 2 < scaleFactor ? 2 : scaleFactor;
                this.autoFitZoom = Math.floor(scaleFactor / 0.25);

                translateGraph();
            }

            function createNodes(nodeWidth, nodeHeight, nodeSize) {
                // create each node for the graphdata and add it to vm.g.
                graphdata.nodes.forEach(function (node) {
                    var nodeStyle;

                    // add event to configure node before renderiing
                    if (graphstyle.onBeforeRenderCallback !== undefined) {
                        graphstyle.onBeforeRenderCallback(node);
                        scope.$broadcast('sit-graph.before-rendering', node);
                    }

                    if (node.style !== undefined) {
                        nodeStyle = controller.getNodeStyle(node.style);
                    }
                    else if (graphstyle.nodeStyle !== undefined) {
                        nodeStyle = controller.getNodeStyle(graphstyle.nodeStyle);
                    }


                    var labelContWidth;
                    switch (nodeSize) {
                        case 'medium':
                            labelContWidth = MEDIUM_NODE_WIDTH;
                            break;
                        case 'large':
                            labelContWidth = LARGE_NODE_WIDTH;
                            break;
                        default:
                            labelContWidth = SMALL_NODE_WIDTH;
                    }
                    labelContWidth -= DEFAULT_NODE_PADDING;
                    if (graphstyle.iconVisibility === true) {
                        labelContWidth -= DEFAULT_ICONWIDTH;
                    }
                    var displayName = calcEllipsis(node.name, labelContWidth);

                    currInstance.g.setNode(node.id, {
                        style: nodeStyle !== undefined ? nodeStyle.style : '', lableStyle: nodeStyle !== undefined ? nodeStyle.lableStyle : '',
                        label: displayName,
                        width: nodeWidth,
                        height: nodeHeight,
                        rx: 5,
                        ry: 5,
                        type: 'node',
                        isIconVisible: graphstyle.iconVisibility
                    });
                });
            }

            function createEdges(nodeWidth) {
                // create each edge for the graphdata and add it to vm.g.
                graphdata.edges.forEach(function (link) {
                    var fromName, toName;
                    var linkStyle;
                    if (link.from !== undefined && link.from !== null && link.to !== undefined && link.to !== null) {
                        graphdata.nodes.forEach(function (node) {
                            if (node.id === link.from)
                            { fromName = node.id; }

                            if (node.id === link.to)
                            { toName = node.id; }
                        });

                        if (link.style !== undefined) {
                            linkStyle = controller.getEdgeStyle(link.style);
                        }
                        else if (graphstyle.edgeStyle !== undefined) {
                            linkStyle = controller.getEdgeStyle(graphstyle.edgeStyle);

                        }
                        var displayName = calcEllipsis(link.name, nodeWidth);
                        currInstance.g.setEdge(fromName, toName, {
                            style: linkStyle !== undefined ? linkStyle : '', label: displayName
                        });
                    }
                });
            }

            function attachToolTipForNodes(svg) {
                // attach toolTip for each node
                svg.select('g').selectAll('g.node')
                    .append('svg:title')
                    .text(function (d) {
                        var title;
                        graphdata.nodes.forEach(function (node) {
                            if (node.id === parseInt(d, 10)) {
                                if (!node.description || !node.description.trim()) {
                                    title = node.name || '';
                                }
                                else {
                                    title = node.name ? node.name +
                                        '\n' + node.description : node.description;
                                }
                            }

                        });
                        return title;
                    });
            }

            function attachToolTipForEdges(svg) {
                var elements = svg.select('g').selectAll('g.edgePath');

                _.each(elements[0], function (item) {
                    $(item).find('title').remove();
                });

                elements.append('svg:title')
                .text(function (d) {
                    var title;
                    graphdata.edges.forEach(function (edge) {
                        if (edge.from.toString() === d.v && edge.to.toString() === d.w) {
                            if (!edge.description || !edge.description.trim()) {
                                title = edge.name || '';
                            }
                            else {
                                title = edge.name ? edge.name +
                                    '\n' +edge.description: edge.description;
                            }
                        }
                    });
                    return title;
                });
            }

            //Sets the style for edge and node On select
            function getSelectedStyle(selectedStyle) {
                return 'fill:' + selectedStyle['background-color'] + ';' + 'stroke-width:' + selectedStyle['stroke-width'] + 'px' + ';' + 'stroke:' + selectedStyle['stroke'];
            }

            function registerDispatchers() {
                // register dispatchers and set listeners
                this.dispatch = d3.dispatch('unhighlightAll', 'toggleNode', 'toggleEdge')
                     .on('unhighlightAll', function () {
                         var rectEl = element.find('rect');
                         if (controller.sitOptions.selectedNodeStyle) {
                             d3.selectAll(rectEl)[0].forEach(function (node) {
                                 node.removeAttribute('style');
                                 if (node.getAttribute('data-style')) {
                                     node.setAttribute('style', node.getAttribute('data-style'));
                                 }
                             });
                         }
                         else {
                             d3.selectAll(rectEl).classed('highlightNode', false);
                         }
                         var pathElem = element.find('path');
                         if (controller.sitOptions.selectedEdgeStyle) {
                             d3.selectAll(pathElem)[0].forEach(function (path) {
                                 path.removeAttribute('style');
                                 if (path.getAttribute('data-style')) {
                                     path.setAttribute('style', path.getAttribute('data-style'));
                                 }
                             });
                         }
                         else {
                             d3.selectAll(pathElem).classed('highlightlink', false);
                         }
                         var textElem = element.find('text')[0];
                         d3.selectAll(textElem).classed('textBold', false);
                     })
                     .on('toggleNode', function (el) {
                         currInstance.dispatch.unhighlightAll();
                         if (controller.sitOptions.selectedNodeStyle) {
                             el.setAttribute('style', getSelectedStyle(controller.sitOptions.selectedNodeStyle));
                         } else {
                             el.setAttribute('class', 'highlightNode');
                         }
                     })
                     .on('toggleEdge', function (el) {
                         currInstance.dispatch.unhighlightAll();
                         if (controller.sitOptions.selectedEdgeStyle) {
                             el.setAttribute('style', getSelectedStyle(controller.sitOptions.selectedEdgeStyle));
                         } else {
                             d3.select(el).classed('highlightlink', true);
                         }

                     });
            }

            function handlePathClickCallBack(d) {
                if (graphstyle.onEdgeSelectCallback !== undefined) {
                    var _edge = graphstyle.getEdge(d);
                    graphstyle.onEdgeSelectCallback(_edge);
                    scope.$broadcast('sit-graph.edge-selected', _edge);
                }
                currInstance.dispatch.toggleEdge(this);
            }

            function handleNodeClickCallBack(d) {

                if (graphstyle.onNodeSelectCallback !== undefined) {
                    var _node = graphstyle.getNode(parseInt(d, 10));
                    graphstyle.onNodeSelectCallback(_node);
                    scope.$broadcast('sit-graph.node-selected', _node);
                }
                currInstance.dispatch.toggleNode(this.firstChild);
            }

            function calcEllipsis(textStringParam, maxWidth) {
                // The rendered font size is 12px , so ideally 9pt should be used for calculation,
                // But in Forefox bowser with 9pt there is an issue on certain zoom levels, where the text renderes outside the node.
                // To avoid this we have used 9.5pt for calculation.
                var myDiv = $('<div></div>').css({
                    'font-family': '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                    'font-size': '9.5pt',
                    'display': 'inline-block'
                }).appendTo($('.graphbackground'));
                var textString = textStringParam || '';
                myDiv.html(textString);
                var width = myDiv.width();
                maxWidth = maxWidth || 100;
                var strLength = textString.length;
                var currSubStringWidth = '';

                // ellipsis is needed
                if (width >= maxWidth) {
                    myDiv.html(textString + '...');
                    strLength += 3;
                    // guess truncate position
                    var i = Math.floor(strLength * maxWidth / width) + 1;
                    // refine by expansion if necessary
                    while (++i < strLength) {
                        currSubStringWidth = myDiv.html(textString.substring(0, i) + '...').width();
                        if (currSubStringWidth > maxWidth) { break; }
                    }
                    // refine by reduction if necessary
                    while (--i > 3) {
                        currSubStringWidth = myDiv.html(textString.substring(0, i) + '...').width();
                        if (currSubStringWidth < maxWidth) { break; }
                    }
                    textString = myDiv.html();
                }
                myDiv.remove();
                return textString;
            }


            function setFontIconsForNode(svg , nodeSize) {
                var fontIcons = controller.getFontAwesomeIconData();
                var PADDING_LEFT = 10;
                var nodeWidth;
                switch (nodeSize) {
                    case 'medium':
                        nodeWidth = MEDIUM_NODE_WIDTH;
                    break;
                    case 'large':
                        nodeWidth = LARGE_NODE_WIDTH;
                    break;
                    default :
                        nodeWidth = SMALL_NODE_WIDTH;

                }
                // attach Icon if node has . Otherwise defualt Icon to  fa-chevron-circle-right
                svg.select('g').selectAll('g.node').append('text')
               .attr('x', -(nodeWidth / 2) + PADDING_LEFT)
               .attr('y', 4)
               .attr('width', 50)
               .attr('height', 50)
               .attr('class', 'fa')
               .attr('font-family', 'FontAwesome').text(function (d) {
                   var iconCode;
                   var node = graphstyle.getNode(parseInt(d, 10));
                   if (node.icon !== undefined && node.icon !== '') {
                       fontIcons.forEach(function (value, index) {
                           if (value.icon === node.icon)
                           { iconCode = value.charCode; }
                       });
                   }
                   if ((node.icon === undefined || node.icon === '') && node.charCode !== undefined && node.charCode !== '') {
                       iconCode = node.charCode;
                   }

                   if (iconCode === undefined) {
                       fontIcons.forEach(function (value, index) {
                           if (value.icon === 'fa-chevron-circle-right')
                           { iconCode = value.charCode; }
                       });
                   }
                   return iconCode;
               });
            }

            //#region Pan and Zoom methods
            //calculate pan and zoom window size based on the graph window size
            function calcPanWinSize() {
                var graphHeight = this.graphHeight + 40;
                var graphWidth = this.graphWidth + 40;

                var biggerWidth, biggerHeight;

                if (graphHeight >= this.parentHeight) {
                    biggerHeight = graphHeight;
                }
                else {
                    biggerHeight = this.parentHeight;
                }

                if (graphWidth >= this.parentWidth) {
                    biggerWidth = graphWidth;
                }
                else {
                    biggerWidth = this.parentWidth;
                }

                var panWindowRatio = biggerWidth / biggerHeight;
                this.panWindowWidth = this.panWindowWidth || biggerWidth / 10;
                if (200 > this.panWindowWidth) {
                    this.panWindowWidth = 200;
                }
                this.panWindowHeight = this.panWindowHeight || this.panWindowWidth / panWindowRatio;
                this.panWindowHeight -= graphTranslateValueY;
                if (this.panWindowHeight < 100) {
                    this.panWindowHeight = 100;
                    this.panWindowWidth = panWindowRatio * this.panWindowHeight;
                    this.panWindowHeight += graphTranslateValueY;
                }

                selectElement('div.graphbackground svg[data-internal-type=\'panWindow\']')
                .attr('width', this.panWindowWidth)
                .attr('height', this.panWindowHeight);

                minPanRectWidth = 50;  //specifying the minimum width for the panRect width, which has to be considered while zoom out.
                maxPanRectWidth = this.panWindowWidth;
                this.rectRatio = this.parentWidth / this.parentHeight;
            }

            //calculate pan and zoom rectangle size based on the pan and zoom window size
            function calcPanRectSize() {
                var parentWidth = this.parentWidth;
                var parentHeight = this.parentHeight;
                var svg = selectElement('div.graphbackground svg[data-internal-type=\'graphsvg\']');
                var graphHeight = svg.attr('height');
                var graphWidth = svg.attr('width');
                var xscale = parentWidth / graphWidth;
                var yscale = parentHeight / graphHeight;
                var scaleFactor = xscale < yscale ? xscale : yscale;
                scaleFactor = 2 < scaleFactor ? 2 : scaleFactor;
                var rectWidth = this.panWindowWidth * scaleFactor;
                var rectHeight = this.panWindowHeight * scaleFactor;
                if (rectWidth < minPanRectWidth) {
                    rectWidth = minPanRectWidth;
                }
                if (rectWidth > maxPanRectWidth) {
                    rectWidth = maxPanRectWidth;
                }
                rectHeight = (rectWidth - 4) / this.rectRatio;
                this.panRect.w = rectWidth;
                this.panRect.h = rectHeight - 2;  // hiding scaling pixcel loss during panscale calculation
                this.panRect.maxXPosition = this.panWindowWidth - this.panRect.w;
                this.panRect.maxYPosition = this.panWindowHeight - this.panRect.h;
                controller.setPanRectValues(this.panRect);
            }

            //calculate the scale for pan and zoom window so that complete graph can fit in
            function calcPanScale() {
                var svg = selectElement('div.graphbackground svg[data-internal-type=\'graphsvg\']');
                var graphHeight, graphWidth;
                try {
                    graphHeight = svg.attr('height');
                    graphWidth = svg.attr('width');
                }
                catch (e) {
                    graphHeight = this.graphWidth;
                    graphWidth = this.graphWidth;
                }
                var xscale = this.panWindowWidth / graphWidth;
                var yscale = this.panWindowHeight / graphHeight;
                var scaleFactor = xscale < yscale ? xscale : yscale;
                scaleFactor = 2 < scaleFactor ? 2 : scaleFactor;
                this.panZoomLevel = scaleFactor;
            }

            //this method will be executed when user clicks on Pan and zoom button and toggle visibility of pan and zoom window
            function showPanWindow() {

                if (controller.getShowPanVal()) {
                    controller.setShowPanVal(0);
                    currInstance.graphRefresh();
                    return;
                }
                drawPanGraph();
                controller.setShowPanVal(1);
            }

            function drawPanGraph() {
                var panAndZoomWindow = element.find('div svg[data-internal-type=\'panWindow\']');
                if (panAndZoomWindow) {
                    if (panAndZoomWindow.find('g.output').length) {
                        panAndZoomWindow.find('g.output').remove();
                    }
                    var clonedGraph = selectElement('div.graphbackground svg[data-internal-type=\'graphsvg\']')[0][0].cloneNode(true);

                    while (clonedGraph.hasChildNodes()) {
                        panAndZoomWindow[0].appendChild(clonedGraph.childNodes[0]);
                    }
                    var panAndZoomGraph = panAndZoomWindow.find('g.output');
                    // traslated by 14 to compensate for the height error mapping when calculating the panscale, 6 to compensate foe the pan box line width
                    panAndZoomGraph.attr('transform', 'scale(' + currInstance.panZoomLevel + ') translate(6 ,' + 14 + ') ');
                }
            }

            function graphRefresh() {
                var svg = selectElement('div.graphbackground svg[data-internal-type=\'graphsvg\']');
                if (svg.attr('display') === 'inline') {
                    svg.attr('display', 'block');
                } else {
                    svg.attr('display', 'inline');
                }
            }

            //this method updates pan and zoom window rectangle on scroll
            function moveOnScroll() {
                var scrollLevel = Math.floor(1 / currInstance.panZoomLevel);
                currInstance.panRect.x = element.find('div.graphbackground div[data-internal-type=\'graphwrapper\']')[0].scrollLeft / scrollLevel;
                currInstance.panRect.y = element.find('div.graphbackground div[data-internal-type=\'graphwrapper\']')[0].scrollTop / scrollLevel;
                controller.setPanRectValues(currInstance.panRect);
                if (scope.$root.$$phase !== '$apply' && scope.$root.$$phase !== '$digest') {
                    scope.$apply();
                }
            }

            //this method will generate pan and zoom window
            function generatePanAndZoom() {
                this.calcPanScale();
                this.panRect = {
                    w: this.parentWidth * this.panZoomLevel + 4,
                    h: this.parentWidth * this.panZoomLevel / this.rectRatio,
                    x: 0,
                    y: 0,
                    maxXPosition: this.panWindowWidth,
                    maxYPosition: this.panWindowHeight
                };
                var minXPosition = 0, minYPosition = 0;
                var minPanRectWidth = this.panWindowWidth / 2;
                this.panRect.maxXPosition = this.panWindowWidth - this.panRect.w;
                this.panRect.maxYPosition = this.panWindowHeight - this.panRect.h;
                var drag = d3.behavior.drag()
                    .origin(Object)
                    .on('drag', function () {
                        var x = this.x.baseVal.value;
                        var y = this.y.baseVal.value;
                        x += d3.event.dx;
                        y += d3.event.dy;
                        if (x < minXPosition) {
                            x = minXPosition;
                        }
                        if (x > currInstance.panRect.maxXPosition) {
                            x = currInstance.panRect.maxXPosition;
                        }
                        if (y < minYPosition) {
                            y = minYPosition;
                        }
                        if (y > currInstance.panRect.maxYPosition) {
                            y = currInstance.panRect.maxYPosition;
                        }
                        this.x.baseVal.value = x;
                        this.y.baseVal.value = y;
                        currInstance.panRect.x = x;
                        currInstance.panRect.y = y;
                        var scrollLevel = Math.floor(1 / currInstance.panZoomLevel);
                        $(element).find('div.graphbackground div[data-internal-type=\'graphwrapper\']')[0].scrollLeft += d3.event.dx * scrollLevel;
                        $(element).find('div.graphbackground div[data-internal-type=\'graphwrapper\']')[0].scrollTop += d3.event.dy * scrollLevel;
                        controller.setPanRectValues(currInstance.panRect);
                        scope.$apply();
                    });
                var nresize = d3.behavior.drag()
                            .origin(Object)
                    .on('dragstart', function (d) {
                        d3.event.sourceEvent.stopPropagation();
                    })
                    .on('drag', function (d) {  // on drag it changes the window size and also zoomlevel of the graph .
                        d3.event.sourceEvent.stopPropagation();
                        scope.$apply(function () {
                            var rectWidth = currInstance.panRect.w + d3.event.dx;
                            if (rectWidth < minPanRectWidth) {
                                rectWidth = minPanRectWidth;
                            }
                            if (rectWidth > maxPanRectWidth) {
                                rectWidth = maxPanRectWidth;
                            }
                            var rectHeight = (rectWidth - 4) / currInstance.rectRatio;
                            currInstance.panRect.w = rectWidth;
                            currInstance.panRect.h = rectHeight;
                            currInstance.panRect.maxXPosition = currInstance.panWindowWidth - currInstance.panRect.w;
                            currInstance.panRect.maxYPosition = currInstance.panWindowHeight - currInstance.panRect.h;

                            var xscale = currInstance.panWindowWidth / rectWidth;
                            var yscale = currInstance.panWindowHeight / rectHeight;
                            var scaleFactor = xscale < yscale ? xscale : yscale;
                            scaleFactor = scaleFactor > 2 ? 2 : scaleFactor;
                            scope.zoomLevel = scaleFactor / 0.25;
                            callFromDrag = true;
                            controller.setPanRectValues(currInstance.panRect);
                        });
                    });
                controller.setPanRectValues(this.panRect);
                var myGroup = selectElement('div.graphbackground svg[data-internal-type=\'panWindow\'] g');
                if (!this.isRectAdded) {
                    var myRect = myGroup.append('rect')
                        .attr('ng-attr-width', '{{GraphCtrl.panRect.w}}')
                        .attr('ng-attr-height', '{{GraphCtrl.panRect.h}}')
                        .attr('ng-attr-x', '{{GraphCtrl.panRect.x}}')
                        .attr('ng-attr-y', '{{GraphCtrl.panRect.y}}')
                        .attr('class', 'panRectPan')
                        .call(drag);
                    $compile(myRect.node())(scope);
                    var resizer = myGroup.append('rect')
                        .attr('width', 5)
                        .attr('height', 5)
                        .attr('ng-attr-x', '{{GraphCtrl.panRect.x+GraphCtrl.panRect.w-2.5}}')
                        .attr('ng-attr-y', '{{GraphCtrl.panRect.y+GraphCtrl.panRect.h-2.5}}')
                        .attr('class', 'panRectZoom')
                        .call(nresize);
                    $compile(resizer.node())(scope);
                    this.isRectAdded = true;
                }
            }
            //#endregion

            function translateGraph() {
            }

            //this method is used for zooming the graph when slidebar is changed
            function slided() {
                var width = currInstance.graphWidth;
                var height = currInstance.graphHeight;
                var svg = selectElement('div.graphbackground svg[data-internal-type=\'graphsvg\']');
                var g = selectElement('g');
                //change the scale based on zoomLevel
                g.attr('transform', 'scale(' + 0.25 * scope.zoomLevel + ')');
                svg.attr('width', width * (0.25 * scope.zoomLevel));
                svg.attr('height', height * (0.25 * scope.zoomLevel) + 20);
                currInstance.calcPanScale();
                if (callFromDrag) {
                    callFromDrag = false;
                }
                else {
                    currInstance.calcPanRectSize();
                }
            }

            function handleZoom() {
                if (currInstance.autoFitZoom > scope.zoomLevel) {
                    $('.panRect', element).hide();
                }
                else { $('.panRect', element).show(); }
                var scrollLevel = Math.floor(1 / currInstance.panZoomLevel);
                currInstance.panRect.x = element.find('div.graphbackground div[data-internal-type=\'graphwrapper\']')[0].scrollLeft / scrollLevel;
                currInstance.panRect.y = element.find('div.graphbackground div[data-internal-type=\'graphwrapper\']')[0].scrollTop / scrollLevel;
                controller.setPanRectValues(currInstance.panRect);
                currInstance.translateGraph();
                currInstance.slided();
            }

            //this method is used for resizing  the graph so that it can fit in completely
            function autoFit() {
                var parentWidth = currInstance.parentWidth;
                var parentHeight = currInstance.parentHeight;
                var svg = selectElement('div.graphbackground svg[data-internal-type=\'graphsvg\']');
                var xscale = parentWidth / currInstance.graphWidth;
                var yscale = parentHeight / currInstance.graphHeight;
                var scaleFactor = xscale < yscale ? xscale : yscale;
                scaleFactor = 2 < scaleFactor ? 2 : scaleFactor;
                scope.zoomLevel = Math.floor(scaleFactor / 0.25);
                currInstance.slided();
            }
        }

        function link(scope, element, attrs, controller) {
            var graphUtil;
            $timeout(function () {
                if (!controller.isValidGraph())
                { return; }

                // Graph Util Class handles all the Dom manipulations
                graphUtil = new GraphUtil(scope, $compile, element, controller);
                graphUtil.drawInteractiveGraph();
                graphUtil.calcPanWinSize();
                graphUtil.generatePanAndZoom();

                scope.graphUtil = graphUtil;
                scope.setWatch = setWatch;

                element.find('button.graphAutoFit').click(graphUtil.autoFit);
                element.find('button.panAndZoom').click(graphUtil.showPanWindow);
                element.find('div.graphbackground div[data-internal-type=\'graphwrapper\']').bind('scroll', graphUtil.moveOnScroll);
                element.find('div.graphbackground svg[data-internal-type=\'graphsvg\'] g.edgePath').hover(graphUtil.graphRefresh);
                var zoomWatchUnbind = scope.$watch('zoomLevel', graphUtil.handleZoom);

                setWatch();

                function setWatch() {
                    if (!controller.watches) {
                        controller.watches = {
                        };
                    }

                    if (controller.watches.nodesWatch) {
                        controller.watches.nodesWatch();
                    }
                    if (controller.watches.edgesWatch) {
                        controller.watches.edgesWatch();
                    }
                    if (controller.watches.optionsWatch) {
                        controller.watches.optionsWatch();
                    }
                    if (controller.watches.graphstyleWatch) {
                        controller.watches.graphstyleWatch();
                    }

                    if (controller.sitOptions.autoRefresh === true) {
                        controller.watches.nodesWatch = scope.$watchCollection(function () {
                            return controller.graphdata.nodes;
                        }, validateAndRefreshGraph);

                        controller.watches.edgesWatch = scope.$watchCollection(function () {
                            return controller.graphdata.edges;
                        }, validateAndRefreshGraph);

                        controller.watches.optionsWatch = scope.$watchCollection(function () {
                            return controller.sitOptions;
                        }, refreshGraph);

                        controller.watches.graphstyleWatch = scope.$watchCollection(function () {
                            return controller.graphstyle;
                        }, refreshGraph);
                    }
                }

                function validateAndRefreshGraph() {
                    controller.validateGraph();
                    refreshGraph();
                }

                function refreshGraph() {
                    graphUtil.drawInteractiveGraph();
                    graphUtil.calcPanWinSize();
                    graphUtil.generatePanAndZoom();
                    if (controller.getShowPanVal()) {
                        graphUtil.drawPanGraph();
                        graphUtil.moveOnScroll();
                    }
                }

                scope.$on('$destroy', function () {
                    zoomWatchUnbind();
                    element.find('div.graphbackground div[data-internal-type=\'graphwrapper\']').unbind('scroll', graphUtil.moveOnScroll);
                    angular.element($window).unbind('resize', windowResize);
                });
            }, 100);

            function windowResize() {
                if (graphUtil === null || graphUtil === undefined) {
                    return;
                }
                graphUtil.recalculateDimentions();
            }

            angular.element($window).bind('resize', windowResize);
        }

        return {
            restrict: 'E',
            scope: true,
            bindToController: {
                graphdata: '=?sitGraphdata',
                graphstyle: '=?sitGraphstyle',
                sitData: '=?sitData',
                sitOptions: '=?sitOptions'
            },
            templateUrl: 'common/widgets/graph/graph.html',
            controller: GraphController,
            controllerAs: 'GraphCtrl',
            link: link
        };
    }
    angular.module('siemens.simaticit.common.widgets.graph').directive('sitInteractiveGraph', sitInteractiveGraph);

})();
