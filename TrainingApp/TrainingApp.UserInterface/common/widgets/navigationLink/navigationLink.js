/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */

(function () {
    'use strict';

    /**
     * @ngdoc module
     * @access internal
     * @name siemens.simaticit.common.navigation-link
     * @description
     * Contains functionality related to tabs.
     */
    angular.module('siemens.simaticit.common.widgets.navigation-link', []);

})();

(function () {
    'use strict';

    /**
     * @name  tab & tabset Directives
     * @module siemens.simaticit.common.widgets.navigation-link
     *
     * @description
     * update ui-bootstrap tab & tabset Directives with new templates.
     *
     * tab Directive: created two isolate scope property: new (bool), warning (bool)
     */

    angular.module('siemens.simaticit.common.widgets.navigation-link').config(['$provide', function ($provide) {
        $provide.decorator('tabsetDirective', ['$delegate', tabsetTemplate]);

        $provide.decorator('tabDirective', ['$delegate', tabTemplate]);

        $provide.decorator('sitTabsetDirective', ['$delegate', tabsetTemplate]);

        $provide.decorator('sitTabDirective', ['$delegate', tabTemplate]);


        function tabsetTemplate($delegate) {
            //get tabsetDirective
            var directive = $delegate[0];
            var prefix = directive.name.indexOf('sit') === 0 ? 'sit-' : '';
            directive.templateUrl = 'common/widgets/navigationLink/' + prefix + 'tabset.html';
            return $delegate;
        }

        function tabTemplate($delegate) {
            //get tabDirective
            var directive = $delegate[0];
            var prefix = directive.name.indexOf('sit') === 0 ? 'sit-' : '';
            directive.templateUrl = 'common/widgets/navigationLink/' + prefix + 'tab.html';
            return $delegate;
        }
    }]);
})();

(function () {
    'use strict';
    /**
   * @ngdoc directive
   * @access internal
   * @name sitNavigationSlide
   * @module siemens.simaticit.common.widgets.navigation-link
   * @description
   * navigation slide directive is used to manage the sliding line for the active tabs.    *
   *
   * @usage
   * As an attribute:
   * ```
   *  <ul class="nav navbar-nav tabset" sit-navigation-slide="true" ng-transclude></ul>
   * ```
   * @restrict A
   *
   */
    function navigationSlide($timeout, $window) {
        return {
            restrict: 'A',
            link: link
        };
        function link(scope, element) {

            var navigate = $timeout(function () {
                var elems = $('ul.nav li', element.parent());
                var hr = element.next('.slider');
                hr.width($(element).children().first().width());
                $('.slider', element.parent())[0].style.left = $('.slider', element.parent())[0].style.left + 'px';

                for (var i = 0; i < elems.length; i++) {
                    slide(elems[i]);
                }

                function slide(elem) {
                    $(elem).children().bind('click', onclick);

                    scope.$watch(function () {
                        return $(elem).width();
                    }, function (newValue, oldValue) {
                        if (newValue !== oldValue) {
                            resetUnderline(elem);
                        }
                    })
                }

                angular.element($window).bind('resize', resetUnderline);

                function resetUnderline(elem) {
                    var ulElement = $(elem).parents('.sit-navigation-tabs')[0];
                    if (ulElement && $('li.navbar-nav-tab.active', element).length && $(elem).offset().left !== $('li.navbar-nav-tab.active', element).position().left) {
                        hr.width($('li.navbar-nav-tab.active', element).width());
                        hr.offset(({ left: $('li.navbar-nav-tab.active', element).offset().left }));
                        hr.css('position', 'absolute');
                    }
                }

                scope.$on('sit-layout-change', function (evt, arg) {
                    _.each($(element.parents('.sit-navigation-tabs')).find('ul.nav.navbar-nav.tabset li.navbar-nav-tab a'), function (item) {
                        $(item).bind('click', onclick);
                    });

                    var targetTabIndex = _.findIndex(evt.currentScope.tabs, { active: true });
                    var activeTab = element.find('li.navbar-nav-tab:eq(' + targetTabIndex + ') a');


                    if ($(evt.currentScope.currentTarget).index() === targetTabIndex) {

                        if (evt.currentScope.currentTarget && evt.currentScope.currentTarget.clientWidth && $(scope.currentTarget).parent('ul.tabset').length) {
                            ($(evt.currentScope.currentTarget).parent().next()).width($(evt.currentScope.currentTarget).width());
                            var offset = $(evt.currentScope.currentTarget).position();
                            ($(evt.currentScope.currentTarget).parent().next())[0].style.left = offset.left + 'px';
                        }
                        else { /*for drop-down*/
                            if (activeTab.length) {
                                var targetTabPositionFromLeft = activeTab.offset().left;
                                var activeIndicator = element.next('.slider');
                                $(activeIndicator).offset({ left: targetTabPositionFromLeft });
                                activeIndicator.width(activeTab.width());
                            }
                        }
                    }

                    else {
                        if (activeTab.length) {
                            targetTabPositionFromLeft = activeTab.offset().left;
                            activeIndicator = element.next('.slider');
                            $(activeIndicator).offset({ left: targetTabPositionFromLeft });
                            activeIndicator.width(activeTab.width());
                        }
                    }

                });


                function onclick(e) {
                    var liParent = $(e.currentTarget).parent();
                    if ($(liParent).children('button').length) {
                        return;
                    }
                    if ($(liParent).hasClass('disabled')) {
                        return;
                    }

                    if ($(liParent).parent('ul.dropdown-menu.dropdown-menu-right').length) {
                        scope.currentTarget = $(liParent)[0];
                        var targetTabPositionFromLeft;
                        if ($(liParent).parents('.navbar-nav-dropdown.open').prev().length > 0) {
                            targetTabPositionFromLeft = $(liParent).parents('.navbar-nav-dropdown.open').prev().position().left;
                        } else {
                            if ($(liParent).parents('.navbar-nav-dropdown.open').children('button.dropdown-toggle').length > 0) {
                                targetTabPositionFromLeft = $(liParent).parents('.navbar-nav-dropdown.open').children('button.dropdown-toggle').position().left;
                            }
                        }

                        if (($(liParent).parents('ul.nav.navbar-nav.tabset').next('.slider'))[0]) {
                            ($(liParent).parents('ul.nav.navbar-nav.tabset').next('.slider'))[0].style.left = targetTabPositionFromLeft + 'px';
                        }

                        var MAX_TAB_WIDTH = 250;
                        var TAB_ACTUAL_WIDTH = 258;
                        var elemWidth = $(e.target).closest('a')[0].firstElementChild.offsetWidth;

                        if (elemWidth > MAX_TAB_WIDTH) {
                            ($(liParent).parents('ul.nav.navbar-nav.tabset').next('.slider')).width(TAB_ACTUAL_WIDTH);
                        } else {
                            ($(liParent).parents('ul.nav.navbar-nav.tabset').next('.slider')).width(elemWidth);
                        }
                    } else {
                        scope.currentTarget = $(liParent)[0];
                        ($(liParent).parent().next()).width($(liParent).width());
                        var offset = $(liParent).position();
                        ($(liParent).parent().next())[0].style.left = offset.left + 'px';
                    }
                }

            });
            scope.$on('$destroy', function () {
                $timeout.cancel(navigate);
            });

        }
    }
    angular.module('siemens.simaticit.common.widgets.navigation-link').directive('sitNavigationSlide', ['$timeout', '$window', navigationSlide])

})();
