/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';

    /**
     * @ngdoc module
    * @access internal
    * @name siemens.simaticit.common.widgets.highlight
     *
     * @description
    * The module consist of directive to highlight a code snippet.
     */
    angular.module('siemens.simaticit.common.widgets.highlight', []);

})();

(function () {
    'use strict';

    function sitCodeHighlight($timeout) {
        return {
            restrict: 'A',
            transclude: false,
            link: function (scope, element) {
                var timer = $timeout(function () {
                    scope.$apply(function () {
                        var codeBlock = element.html();
                        var language = hljs.highlightAuto(element[0].innerText).language;
                        codeBlock = codeBlock.replace(/\&lt;/g, '<')
                            .replace(/\&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
                        if (undefined !== language) {
                            var html = hljs.highlight(language, codeBlock).value;
                            element.html(html);
                        } else {
                            element.html(codeBlock);
                        }
                    });
                });

                scope.$on('$destroy', function () {
                    $timeout.cancel(timer);
                    timer = null;
                });
            }
        };
    }

    /**
     * @ngdoc directive
     * @access internal
     * @name sitHighlight
     * @module siemens.simaticit.common.widgets.highlight
     * @restrict A
     *
     * @description
     * The directive is used to highlight code snippets. The directive uses the **highlight.js** library
     * for highlighting code snippets based on the language.
     *
     * @example
     * As an attribute:
     * ```
     *   <code sit-code-highlight>
     * ```
     * The directive is used within the view template, by simply adding **highlight** to the **code** html
     * element.
     *
     */

    angular.module('siemens.simaticit.common.widgets.highlight')
        .directive('sitCodeHighlight', ['$timeout', sitCodeHighlight]);

})();

