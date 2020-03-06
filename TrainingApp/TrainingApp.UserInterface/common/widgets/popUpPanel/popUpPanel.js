/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
/* SIMATIC IT Unified Architecture Foundation V3.0 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
/**
 * @ngdoc module
 * @name siemens.simaticit.common.widgets.popUpPanel
 *
 * @description
 * This module provides the functionalities related to the visualization of the content details through a pop-up panel widget.
 */
(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.popUpPanel', []);

})();

/**
   * @ngdoc directive
   * @name sitPopUpPanel
   * @module siemens.simaticit.common.widgets.popUpPanel
   * @description
   * It is a directive which defines the standard structure for a pop-up panel. Its look and feel are like the side panel except it does not require any state transition.
   * The pop-up panel which looks like a side panel, can have a title and a content configured. This directive can include any structure provided with in the html.
   * It can be configured along the vertical command bar to open a stateless pop-up. Find below the usage of the pop-up panel for reference.
   * @usage
   * As an html element:
   * ```
   * <sit-pop-up-panel sit-pop-up-content="popUpPanel.contentInfos">
   *        <!-- Custom content goes here -->
   *</sit-pop-up-panel>
   * ```
   * @restrict E
   *
   * @param {Object} sit-pop-up-content An object containing the following properties:
   * * **title**, representing the heading of the pop-up panel
   * * **onClick**, representing an optional user-defined function to be executed when the user clicks the **Close** button
   * * **showContent**, a Boolean indicating if the content must be displayed **(true)** or not **(false)**
   *
   * @example
   * The following example shows how to configure a pop-up panel widget:
   *
   * In Controller:
   * ```
   *    (function () {
   *        PopUpPanelDemoController.$inject = ['scope']
   *        function initContentInfo() {
   *        vm.contentInfos= {
   *                showContent: false;
   *                title: "Content Info";
   *                onClick: function(){
   *                vm.contentInfos.showContent = false;
   *            }
   *        };
   *        vm.contentInfos.contents = [{
   *            label: 'Pop-up panel demo',
   *            value: 'Pop-up panel demo',
   *            tooltip: 'Pop-up panel demo'
   *        },
   *        {
   *            label: 'Pop-up panel details',
   *            value: 'Pop-up panel details',
   *            tooltip: 'Pop-up panel details'
   *        }
   *        ];
   *    }
   *  });
   * ```
   *
   * In Template:
   *```
   * <sit-pop-up-panel sit-pop-up-content="popUpPanel.contentInfos">
   *    <!-- Custom Content as below -->
   *    <ul ng-if="PopUpPanelDemoController.contentInfos.contents">
   *      <li ng-repeat="content in PopUpPanelDemoController.contentInfos.contents">
   *         <div class="content-menu-item">
   *             <div class="content-menu-item-title" title="{{content.tooltip}}" ng-if="content.label">{{content.label}}</div>
   *              <div class="content-menu-item-text" title="{{content.tooltip}}">{{content.value}}</div>
   *          </div>
   *        </li>
   *    </ul>
   * </sit-pop-up-panel>
   *```
   *
   */
(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.popUpPanel').directive('sitPopUpPanel', PopUpPanelDirective);

    function PopUpPanelDirective() {
        return {
            scope: {},
            restrict: 'E',
            bindToController: {
                sitPopUpContent: '=sitPopUpContent'
            },
            controller: PopUpPanelController,
            controllerAs: 'popUpPanel',
            templateUrl: 'common/widgets/popUpPanel/pop-up-panel.html',
            transclude: true
        }
    }
    PopUpPanelController.$inject = ["$scope"];
    function PopUpPanelController($scope) {
        var vm = this;
        vm.closePanel = {
            path: 'common/icons/cmdClosePanel24.svg',
            size: '16px'
        }

        vm.closePopUpPanel = function () {
            if (vm.sitPopUpContent.onClick && typeof vm.sitPopUpContent.onClick === 'function') {
                vm.sitPopUpContent.onClick();
            }
            else {
                vm.sitPopUpContent.showContent = false;
            }
        }
    }
})();
