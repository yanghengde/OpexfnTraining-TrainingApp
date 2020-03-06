/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';

    /**
    * @ngdoc module
    * @access internal
    * @name siemens.simaticit.common.widgets.bindDynamicHtml
    *
    * @description
    * The module consist of directive to bind dynamic Html in the markup.
    */

    angular.module('siemens.simaticit.common.widgets.bindDynamicHtml', []);

})();

(function () {
    'use strict';

    function sitBindDynamicHtml($compile, $rootScope) {
        return {
            restrict: 'A',
            replace: true,
            link: function (scope, element, attrs) {
                scope.$watch(attrs.sitBindDynamicHtml, function (html) {
                    if (!html) {
                        element.html('');
                        return;
                    }
                    element.html(html);
                    $compile(element.contents())(scope);
                    $rootScope.$broadcast('siemens.simaticit.common.page.contentRendered', {content: element.contents(), callee:attrs.sitBindDynamicHtml});
                });
            }
        };
    }

    /**
     * @ngdoc directive
     * @access internal
     * @name sitBindDynamicHtml
     * @module siemens.simaticit.common.widgets.bindDynamicHtml
     * @restrict A
     *
     * @description
     * A directive that is used to bind html dynamically. The directive is used as an attribute within
     * a html element that binds with the html content supplied in the directive.
     *
     * @example
     * As an attribute:
     * ```
     *   <p sit-bind-dynamic-html="pageContent"></p>
     * ```
     */

    angular.module('siemens.simaticit.common.widgets.bindDynamicHtml')
        .directive('sitBindDynamicHtml', ['$compile', '$rootScope', sitBindDynamicHtml]);
})();
