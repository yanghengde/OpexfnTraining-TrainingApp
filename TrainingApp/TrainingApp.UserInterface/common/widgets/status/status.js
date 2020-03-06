/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.status
    * @access internal
    * @description
    * This module provides functionalities related to displaying text.
    */
    angular.module('siemens.simaticit.common.widgets.status', [function () {
    }]);

})();

 (function () {
    "use strict";

 //#region ng-doc comments
    /**
    *  @ngdoc directive
    *  @access internal
    *  @name sit-status
    *  @module siemens.simaticit.common.widgets.status
    *  @restrict E
    *  @description
    *  **status** display a list of properties and status using the circle graph.
    *  @param {String} sit-title, Name for the status widget.
    *  @param {String} sit-desc, Represents an subtitle for the status widget.
    *  @param {Object[]} sit-properties Array of objects that contains label-value pairs.

    *  @usage
    *   As an element:
    *   ```
    *     <sit-status></sit-status>
    *   ```
    *  @example
    *  In a view template, the `sit-status` directive is used as follows:
    * ```
    * <div class="status-widget">
        <sit-status sit-title="Configuration Status" sit-desc="This Solution has been partially configured" sit-properties="slnSummaryCtr.configproperties">
        </sit-status>
    </div>
    <div class="deploy-status">
       <sit-status sit-title="Deploy Status" sit-desc="The Airbus has not been deployed on target hosts yet" sit-properties="slnSummaryCtr.deployproperties">
       </sit-status>
   </div>

    *   ```

    **/
    //#endregion

    angular.module('siemens.simaticit.common.widgets.status')
    .directive('sitStatus', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            bindToController: {
                title: "@?sitTitle",
                desc: "@?sitDesc",
                properties: '=?sitProperties',
                chart: "@?sitChart"
            },
            templateUrl: 'common/widgets/status/status.html',
            controller: StatusController,
            controllerAs: 'statusCtrl'
        };
    });

    function StatusController() {
        var vm = this;

        function active(vm) {
            init(vm);
        }

        function init(vm) {
            vm.progressValue = 10;
            vm.progressCSSClass = 'progress-' + vm.progressValue;
            vm.chart = vm.chart || false;
        }
        active(vm);
    }
})();


