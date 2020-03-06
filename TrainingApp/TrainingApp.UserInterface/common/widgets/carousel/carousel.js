/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';

    /**
    * @ngdoc module
    * @access internal
    * @name siemens.simaticit.common.widgets.carousel
    *
    * @description
    * This module provides functionalities related to the carousel.
    */

    angular.module('siemens.simaticit.common.widgets.carousel', []);

})();

(function () {
    'use strict';

    /**
   * @ngdoc directive
   * @name sitCarousel
   * @module siemens.simaticit.common.widgets.carousel
   * @access internal
   * @description
   * Displays a carousel widget with images.
   *
   * @usage
   * As an element:
   * ```
   * <sit-carousel sit-value="value" sit-items="CarouselInputModel" ng-readonly="false">
   * </sit-carousel>
   * ```
   * @restrict E
   *
   * @param {string} sit-value A string value to highlight an image on load of a page.
   * @param {boolean} ng-readonly A Boolean value to inform whether carousel is just read only or not.
   * @param {CarouselInputModel} sit-items See {@link CarouselInputModel}.
   *
   * @example
   * The following example shows how to configure a carousel widget slides within the sit-items attribute:
   * ```
    *   [{
            id: 'AutoOEM',
            title: utils.translate('homeCards.autoOem.title'),
            image: 'common/images/home-cards/imgOEM.png'
        }, {
            id: 'Discrete',
            title: utils.translate('homeCards.discrete.title'),
            image: 'common/images/home-cards/imgDiscrete.png'
        }, {
            id: 'Process',
            title: utils.translate('homeCards.process.title'),
            image: 'common/images/home-cards/imgProcess.png'
        }, {
            id: 'System',
            title: utils.translate('homeCards.system.title'),
            image: 'common/images/home-cards/imgSettings.png'
        }
      ];
   * ```
   * ```
   *  id is an unique value to differentiate each slide
   *  title is string which will be displayed below slide
   *  image is the carousel slide which denotes image to be shown for home page
   * ```
   */
    /**
     * @ngdoc type
     * @name CarouselInputModel
     * @access internal
     * @module siemens.simaticit.common.widgets.carousel
	 * @description An object containing the carousel configuration.
	 * @property {Object} [slides={}] Information about the Carousel Slides.
     *  The object has the following format:
     * ```
     *    {
     *       id: 'System',
     *       title: utils.translate('homeCards.system.title'),
     *       image: 'common/images/home-cards/imgSettings.png'
     *    }
     * ```
      */


    function CarouselController() { }

    SitCarouselDirective.$inject = ['$window', '$timeout'];
    function SitCarouselDirective($window, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'common/widgets/carousel/carousel.html',
            controller: CarouselController,
            controllerAs: 'carouselCtrl',
            scope: {},
            bindToController: {
                sitItems: '=',
                sitValue: '=',
                onSelectionCallback: '=sitOnSelectionCallback',
                readonly: '=ngReadonly'
            },
            link: function (scope, element, attrs, ctrl) {

                var valueListner;
                var SLIDE_WIDTH = 150;
                var TOTAL_SLIDE_WIDTH = 0;
                var WAIT_TIME = 1000;
                var windowWidth = window.innerWidth;

                $('.carousel-inner').ready(function () {
                    $timeout(function () {
                        initCarousel();
                    }, WAIT_TIME);
                });

                function initCarousel() {
                    var scrollToSlide = 0;

                    windowWidth = window.innerWidth;

                    if ($('.carousel-inner').width() > 0) {

                        var slideCount = Math.min(parseInt($(".carousel-inner").width() / 160), ctrl.sitItems.length);
                        ctrl.slideCount = slideCount;

                        TOTAL_SLIDE_WIDTH = slideCount * SLIDE_WIDTH + 40;

                        for (var i = 0, len = ctrl.sitItems.length; i < len; i++) {
                            if (ctrl.sitItems[i].id === ctrl.sitValue) {

                                $('.carousel-inner .inner').width(slideCount * SLIDE_WIDTH);
                                $('.carousel-inner').width(TOTAL_SLIDE_WIDTH);
                                if (i < ctrl.sitItems.length - slideCount) {
                                    scrollToSlide = -(i * SLIDE_WIDTH) + 'px'; //scroll to the selected Image if selected image is at last
                                    ctrl.firstImage = i + 1;
                                } else {
                                    scrollToSlide = -((ctrl.sitItems.length - slideCount) * SLIDE_WIDTH) + 'px'; //scroll to the selected Image if selected image is not at last
                                    ctrl.firstImage = ctrl.sitItems.length - slideCount + 1;
                                }

                                ctrl.lastImage = (i + slideCount) < ctrl.sitItems.length ? (i + slideCount) : ctrl.sitItems.length;

                            }
                        }

                        $('.carousel-inner ul').animate({
                            marginLeft: scrollToSlide
                        }).width(ctrl.sitItems.length * SLIDE_WIDTH + 'px');
                    }
                }

                ctrl.resizeLogic = function () {
                    if (windowWidth !== window.innerWidth) {
                        initCarousel();
                    }
                }

                angular.element($window).bind('resize', function () {
                    $timeout(ctrl.resizeLogic(), 100);
                });
                ctrl.next = function () {
                    if (ctrl.lastImage !== ctrl.sitItems.length && ctrl.readonly !== true) {
                        $('.carousel-inner ul').animate({
                            marginLeft: '-=' + SLIDE_WIDTH + 'px'
                        });
                        ctrl.lastImage++;
                        ctrl.firstImage++;
                    }
                }
                ctrl.prev = function () {
                    if (ctrl.firstImage !== 1 && ctrl.readonly !== true) {
                        $('.carousel-inner ul').animate({
                            marginLeft: '+=' + SLIDE_WIDTH + 'px'
                        });
                        ctrl.firstImage--;
                        ctrl.lastImage--;
                    }
                }
                ctrl.selectHomeCard = function (item) {
                    if (ctrl.readonly === true) {
                        return;
                    }
                    valueListner();
                    ctrl.sitValue = item.id;
                    if (typeof ctrl.onSelectionCallback === 'function') {
                        ctrl.onSelectionCallback(item);
                    }
                    registerWatch();
                }

                function registerWatch() {
                    valueListner = scope.$watch('carouselCtrl.sitValue', function (newVal, oldVal) {
                        if (newVal !== oldVal) {
                            initCarousel();
                        }
                    });
                }
                registerWatch();

                scope.$on('$destroy', function () {
                    valueListner();
                });

            }
        }
    }

    angular.module('siemens.simaticit.common.widgets.carousel').directive('sitCarousel', SitCarouselDirective);
}());
