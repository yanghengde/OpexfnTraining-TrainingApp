/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name siemens.simaticit.common.widgets.characteristicRepr
     * @description
     * This module provides functionalities related to Caracteristic Represenation (Quality Execution).
     */
    angular.module('siemens.simaticit.common.widgets.characteristicRepr', []);

})();

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.characteristicRepr')
        .directive('characteristicRepr', characteristicRep)
        .filter('removeSpaces', [function () {
            return function (string) {
                if (!angular.isString(string)) {
                    return string;
                }
                return string.replace(/[\s]/g, '');
            };
        }]);

    characteristicRepController.$inject = ['$window',
        '$state',
        '$rootScope',
        '$scope',
        '$translate',
        'common',
        'common.services.runtime.backendService',
        'siemens.simaticit.common.characteristicReprService',
        'common.widgets.notificationTile.globalService',
        '$q',
        '$timeout'
    ];
     /**
    * @ngdoc directive
    * @name characteristicRepr
    * @module siemens.simaticit.common.widgets.characteristicRepr
    * @description
    * Displays a characteristic representation container in a Quality Execution runtime scenerio.
    * It is not intended to be used "as is".
    *
    * @usage
    * As an element:
    * ```
    *     <characteristic-repr cr-id="myid" container-id="000-0000-00000" context="{{vm.Context}}" mtu="mymtu"></characteristic-repr>
    * ```
    * @restrict E
	*
    * @param {Object[]} context {EquipmentNId: "myequipment",MaterialNId: "mymaterial", MaterialRevision: 1 }. All the members in the 
    * Context object signature are mandatory.
    * @param {string} [cr-id] _(Optional)_ a string to set an Id for directive elements.
    * @param {string} [container-id] A GUID referring to the Runtime Characteristic Represtation Container
    * @param {string} [mtu] the MTU Id
    */
    function characteristicRep() {
        return {
            restrict: 'E',
            replace: true,
            controller: characteristicRepController,
            controllerAs: 'vm',
            templateUrl: 'common/widgets/characteristicRepr/characteristic-repr-dir.html',
            bindToController: {
                crId: '@',
                containerId: '@',
                context: '@',
                mtu: '@',
                notifyViolations:'@'
            },
            scope: {}
        };
    }

            function FailureReference(){
            this.Id= "";
            this.AId= "";
            this.IsFrozen= false;
            this.ConcurrencyVersion= 0;
            this.IsDeleted= 0;
            this.CreatedOn= Date.now();
            this.LastUpdatedOn= Date.now();
            this.EntityType= "Siemens.SimaticIT.MasterData.CHR_MS.MSModel.DataModel.FailureReference";
            this.OptimisticVersion= "";
            this.ConcurrencyToken= null;
            this.IsLocked= false;
            this.ToBeCleaned = false;
    }

    function characteristicRepController($window,
        $state,
        $rootScope,
        $scope,
        $translate,
        common,
        backendService,
        characteristicRepService,
        notificationTileGlobalService,
        $q,
        $timeout)
    {

        var vm = this;
        var globalDialogService = common.globalDialog;
        var logger;
        vm.isloaded = false;
        vm.isenabled = false;
        vm.currentStateName = $state.current.name + "";
        vm.viewerData = [];
        vm.Specification = {};
        vm.InspectionContext = {};
        vm.IsVisual = false;
        vm.IsAttributive = false;
        vm.IsVariable = false;
        vm.HasValue = false;
        vm.HasImage = false;
        vm.Quantity = null;
        vm.HasFailure = false;
        vm.HasAttribute = null;
        vm.ImageWidth = 0;
        vm.ImageHeight = 0;
        vm.ImageId = "_tmp_image_" + $scope.$id;
        vm.placeholderid = "#tmpImagePlaceholder";
        vm.ImageSrc = "";
        vm.editable = false;
        vm.DisplayInfoBadge = false;
        vm.SaveSample = saveSample;
        vm.FailureNId = null;
        vm.ValueChanged = valueChanged;
        vm.SaveVisualSample = saveVisualSample;
        vm.SetTooltipPosition = setTooltipPosition;
        vm.onImageUploadRegisterApi = {};
        vm.FailuresToBeUpdated = [];
        vm.FNIdColorsAssociations = [];
        vm.propertyGridId = "pgridid";
        vm.defaultColor = "#ddffdd";
        vm.canvasHeight = 480;
        vm.canvasWidth = 640;
        vm.FailuresOptions = {
            "sit-options": [],
            "sit-to-display": "label",
            "sit-to-keep": "color"
        };
        vm.FailuresLegenda = [];
        vm.Colors = [
            "#B44B28",
            "#78cdcd",
            "#DC0000",
            "#730900",
            "#0F789B",
            "#FBEEED",
            "#EDFBF5",
            "#5A5A5A",
            "#DC6914",
            "#E3700F",
            "#FFCD50",
            "#FFF7CD",
            "#003750",
            "#411432",
            "#ebaba7",
            "#bec32b"
        ];

        vm.addIcon = {
            path: "common/icons/cmdAdd16.svg",
            size: "16"
        };
        vm.attachmentIcon = {
            path: "common/icons/cmdFileText24.svg",
            size: "16"
        };
        vm.deleteIcon ={
            path: "common/icons/cmdDelete16.svg",
            size: "16"
        };
        vm.changesIcon ={
            path: "common/icons/indicatorContainsChange16.svg",
            size: "16"
        };

        vm.chosenFailure = {};
        vm.Details = $translate.instant('characteristicRepr.Details');
        vm.propertyGridData = [];
        $scope.$watch('vm.containerId', function (newVal, oldVal) {
            getViewerData();
        });


        vm.dialogApi = {};

        function removeSpaces(string) {
            if (!angular.isString(string)) {
                return string;
            }
            return string.replace(/[\s]/g, '');
        }

       vm.dialogTemplateData = {
           alreadyAssigned: [],
           hasSelection: false,
           selectedItem: {},
           dialogWidth: ($window.innerWidth - 200)+"px",
           dialogHeight: ($window.innerHeight - 300)+"px"
        };

        vm.onButtonClick = onButtonClick;
        vm.modalId = 'popup_' + $scope.$id;
        vm.dialogTitle = $translate.instant('characteristicRepr.popupTitle');
        vm.templateUri = 'common/widgets/characteristicRepr/browse-failures-template.html';
        vm.buttonsList = [
            { id: "okButton", displayName: $translate.instant('common.ok'), disabled: !vm.dialogTemplateData.hasSelection, onClickCallback: function () { vm.addFailure(); } },
            { id: "cancelButton", displayName: $translate.instant('common.cancel'), disabled: false, onClickCallback: cancelButton }

        ];


        function cancelButton() {
            globalDialogService.hide();
            vm.chosenFailure = null;
        }

        $rootScope.$on('failuresModal.selection', function (event, hasselection) {
           vm.buttonsList[0].disabled = !hasselection;
        });

        function onButtonClick(mode, failurenid) {
            if (vm.Specification.CharacteristicSpecification.FailureReferences) {
                vm.dialogTemplateData.alreadyAssigned = angular.copy(vm.Specification.CharacteristicSpecification.FailureReferences)
            }
            vm.dialogTemplateData.showMode = mode;
            vm.dialogTemplateData.dialogWidth = ($window.innerWidth - 200) + "px";
            vm.dialogTemplateData.dialogHeight = ($window.innerHeight - 300) + "px";
            if (mode === 2) {
                vm.dialogTemplateData.alreadyAssigned = [_.find(vm.dialogTemplateData.alreadyAssigned, function (ass) { return ass.Failure.NId === failurenid })];
                vm.dialogTemplateData.dialogWidth = ($window.innerWidth / 2) + "px";
                vm.buttonsList[0].disabled = false;
            }
            var dialogData = {
                title: (mode === 2) ? $translate.instant('characteristicRepr.showAttachments'): $translate.instant('characteristicRepr.popupTitle'),
                templatedata: vm.dialogTemplateData,
                templateuri: 'common/widgets/characteristicRepr/browse-failures-template.html',
                buttons: vm.buttonsList,
                showClose:false
            }
            globalDialogService.set(dialogData);
            globalDialogService.show();
        }

        vm.removeFailure = function () {
            var InspectionId = vm.ActualValue.InspectionValues[0].Id;
            vm.HasFailure = false;
            var InspectionValue = {
                Id: InspectionId
            };

            characteristicRepService.RemoveFailureToInspectionValue(InspectionValue).then(function (data) {
                if (data && data.succeeded) {
                    logger.logInfo($translate.instant("characteristicRepr.failuredisassociated"));
                    vm.HasFailure = false;
                    vm.FailureNId = null;
                }
            }, backendService.error);
        }

        vm.addFailure = function () {
            if (vm.dialogTemplateData.showMode === 2) {
                globalDialogService.hide();
                return;
            }

            if (vm.dialogTemplateData.showMode === 1) {
                if (!vm.ActualValue) {
                    getActualValues(vm.InspectionContext.InspectionSamples);
                }
                associateFailure();
            }

            var idx = vm.FNIdColorsAssociations.length;
            if (vm.dialogTemplateData.hasSelection) {
                var item = vm.dialogTemplateData.selectedItem;
                vm.FailuresOptions["sit-options"].push(
                    {
                        "color": vm.Colors[idx],
                        "label": item.NId,
                        "hasAttachments": vm.dialogTemplateData.selectedItem.hasAttachments
                    });

                vm.FailuresLegenda.push({
                    "color": vm.Colors[idx],
                    "label": (item.Name === "" || item.Name === null )? item.NId : item.Name,
                    "description": item.Description,
                    "count": 0
                });
                vm.FNIdColorsAssociations.push({
                    "color": vm.Colors[idx],
                    "NId": item.NId
                });
            }
            var failureReference = new FailureReference();
            failureReference.CharacteristicSpecification_Id = vm.Specification.CharacteristicSpecification.Id;
            failureReference.Failure_Id = vm.dialogTemplateData.selectedItem.Id;
            failureReference.Failure = vm.dialogTemplateData.selectedItem;
            characteristicRepService.getAttachments(failureReference.Failure_Id).then(function (data) {
                failureReference.Failure.Attachments = data.value[0].Attachments;
            });

            var found = _.find(vm.Specification.CharacteristicSpecification.FailureReferences, function (ref)
            {
                return ref.Failure_Id === failureReference.Failure_Id;
            });
            if (typeof found === "undefined") {
                vm.Specification.CharacteristicSpecification.FailureReferences.push(failureReference);
            }
            globalDialogService.hide();
            vm.chosenFailure = null;
            vm.editable = false;
        }

        function associateFailure() {
            var InspectionId = vm.ActualValue.InspectionValues[0].Id;
            var FailureNId = vm.dialogTemplateData.selectedItem.NId;
            var FailureId = vm.dialogTemplateData.selectedItem.Id;
            characteristicRepService.AssociateFailureToInspectionValue(InspectionId, FailureId).then(function(data) {
                logger.logInfo($translate.instant("characteristicRepr.failureassociated"));
                vm.HasFailure = true;
                vm.FailureNId = FailureNId;
            }, backendService.error);
        }

        function getSpecification() {
            vm.IsAttributive = false;
            vm.IsVariable = false;
            vm.HasValue = false;
            vm.HasImage = false;
            characteristicRepService.GetCharacteristicSpecification(vm.Id).then(function (data) {
                vm.Specification = data.value[0];
                getAttachments().then(function () {

                    vm.IsVisual = vm.Specification.CharacteristicSpecification.EntityType.indexOf('VisualCharacteristicSpecification') !== -1;
                    vm.IsAttributive = vm.Specification.CharacteristicSpecification.EntityType.indexOf('AttributiveCharacteristicSpecification') !== -1;
                    vm.IsVariable = vm.Specification.CharacteristicSpecification.EntityType.indexOf('VariableCharacteristicSpecification') !== -1;

                    if (vm.Specification.CharacteristicSpecification.Sketch_Id_Id != null) {
                        vm.HasImage = true;
                    }

                    getInspectionContext().then(getSketch);
                    generateGridData();
                    vm.propertyGridId = vm.Specification.Id;
                });

            }, backendService.error);
        }

        function getAttachments() {
            var defer = $q.defer();
            var promises = [];
            _.each(vm.Specification.CharacteristicSpecification.FailureReferences, function (fref) {
                promises.push(characteristicRepService.getAttachments(fref.Failure_Id));
            });
            $q.all(promises).then(function (data) {
                _.each(data, function (datum) {
                    var failure = datum.value[0];
                    if (failure === null) { return;}
                    _.each(vm.Specification.CharacteristicSpecification.FailureReferences, function (ref) {
                        if (ref.Failure_Id === failure.Id) {
                              ref.Failure.Attachments = failure.Attachments;
                        }
                    });
                });
                   defer.resolve();
            });
           return defer.promise;
        }

        function registerEvents() {
            vm.onImageUploadRegisterApi = onImageUploadRegisterApi;
            vm.imageUploadApi = null;

            function onImageUploadRegisterApi(api) {
                vm.imageUploadApi = api;
            }
        }

        var imageOnLoad = function () {
            var reload = restorePoints();
            var rows = vm.Specification.CharacteristicSpecification.SketchRows;
            var columns = vm.Specification.CharacteristicSpecification.SketchColumns;
            if (vm.imageUploadApi) {
                vm.imageUploadApi.redrawPoints(reload);
                vm.imageUploadApi.load(rows, columns);
                vm.imageUploadApi.addPointClickedListener(clickedPoint);
            }
        };

        function getSketch() {

            if (!vm.IsVisual) {
                return;
            }

            var imageId = vm.Specification.CharacteristicSpecification.Sketch_Id_Id;
            if (null === imageId) {
                return;
            }
            characteristicRepService.GetSketch(imageId).then(function (data) {
                    vm.HasImage = data.value.length > 0;
                    if (vm.HasImage) {
                        var src = "data:" + data.value[0].ImageType + ";base64," + data.value[0].ImageUrl;
                        var img = new Image();
                        img.id = vm.ImageId;
                        img.src = src;
                        img.style["display"] = "none";
                        angular.element(vm.placeholderid)[0].appendChild(img);
                        img.onload = imageOnLoad;
                        vm.FailuresOptions["sit-options"] = [];
                        vm.FailuresLegenda = [];
                        vm.FNIdColorsAssociations = [];
                        _.each(vm.Specification.CharacteristicSpecification.FailureReferences,
                            function (item, index, list) {
                                var hasattachment = item.Failure.Attachments && item.Failure.Attachments.length > 0;
                                var idx = angular.copy(index);
                                if (idx >= vm.Colors.length) {
                                    idx = 0;
                                }
                                vm.FailuresOptions["sit-options"].push({
                                    "color": vm.Colors[idx],
                                    "label": item.Failure.NId,
                                    "hasAttachments": hasattachment
                                });
                                vm.FailuresLegenda.push({
                                    "color": vm.Colors[idx],
                                    "label": item.Failure.Name === "" ? item.Failure.NId : item.Failure.Name,
                                    "description": item.Failure.Description,
                                    "count": 0
                                });
                                vm.FNIdColorsAssociations.push({
                                    "color": vm.Colors[idx],
                                    "NId": item.Failure.NId
                                });

                            });

                }
            },
            backendService.error);

        }

        function generateGridData() {

            vm.propertyGridData = [
                {
                    label: $translate.instant('characteristicRepr.Name'),
                    value: vm.Specification.Name
                }, {
                    label: $translate.instant('characteristicRepr.Description'),
                    value: vm.Specification.CharacteristicSpecification.Description
                },
                {
                    label: $translate.instant('characteristicRepr.NId'),
                    value: vm.Specification.CharacteristicSpecification.NId
                },
                {
                    label: $translate.instant('characteristicRepr.Revision'),
                    value: vm.Specification.CharacteristicSpecification.Revision
                },
                {
                    label: $translate.instant('characteristicRepr.Criticality'),
                    value: vm.Specification.CharacteristicSpecification.CriticalityNId
                },
                {
                    label: $translate.instant('characteristicRepr.SpecifictionName'),
                    value: vm.Specification.CharacteristicSpecification.Name
                },
                {
                    label: $translate.instant('characteristicRepr.SpecifictionDescription'),
                    value: vm.Specification.CharacteristicSpecification.Description
                },
                {
                    label: $translate.instant('characteristicRepr.EquipmentNId'),
                    value: vm.context.EquipmentNId
                },
                {
                    label: $translate.instant('characteristicRepr.MTU'),
                    value: vm.mtu
                },
                {
                    label: $translate.instant('characteristicRepr.MaterialNId'),
                    value: vm.context.MaterialNId
                },
                {
                    label: $translate.instant('characteristicRepr.MaterialRevision'),
                    value: vm.context.MaterialRevision
                }
                ];

            if (vm.IsVariable) {
                vm.propertyGridData.push({
                    label: $translate.instant('characteristicRepr.NominalValue'),
                    value: vm.Specification.CharacteristicSpecification.NominalValue.QuantityValue
                });
                vm.propertyGridData.push({
                    label: $translate.instant('characteristicRepr.UoM'),
                    value: vm.Specification.CharacteristicSpecification.NominalValue.UoMNId
                });
                vm.propertyGridData.push({
                    label: $translate.instant('characteristicRepr.UpperTolerance'),
                    value: vm.Specification.CharacteristicSpecification.UpperTolerance.QuantityValue
                });
                vm.propertyGridData.push({
                    label: $translate.instant('characteristicRepr.LowerTolerance'),
                    value: vm.Specification.CharacteristicSpecification.LowerTolerance.QuantityValue
                });
            }

        }

        function getActualValues(samples) {
            var actualValue = null;
            angular.forEach(samples,
                function(value, key) {
                    var firstValue = value.InspectionValues?value.InspectionValues[0]:null;
                    if (firstValue) {
                        if (firstValue.MTUNId === vm.mtu) {
                            actualValue = value;
                        }
                    }
                    var firstFailure =value.VisualDetectedFailures?value.VisualDetectedFailures[0]:null;
                    if (firstFailure) {
                        if (firstFailure.MTUNId === vm.mtu) {
                            actualValue = value;
                        }
                    }
                });
            return actualValue;
        }


        function getUnlistedFailures(samples) {
            var defer = $q.defer();
            var listednids = _.map(vm.Specification.CharacteristicSpecification.FailureReferences, function (ref) { return ref.Failure.NId; });
            var nids = [];
            _.each(samples, function (sample) {
                _.each(sample.VisualDetectedFailures, function (failure) {
                    if (!_.contains(listednids, failure.FailureNId) && !_.contains(nids, failure.FailureNId)) {
                        nids.push(failure.FailureNId);
                    }
                });
            });
            characteristicRepService.getFailuresByNIds(nids).then(function (data) {
                if ((data) && (data.succeeded)) {
                    _.each(data.value, function (failure) {
                        var failureReference = new FailureReference();
                        failureReference.CharacteristicSpecification_Id = vm.Specification.CharacteristicSpecification.Id;
                        failureReference.Failure_Id =  failure.Id;
                        failureReference.Failure = failure;
                        vm.Specification.CharacteristicSpecification.FailureReferences.push(failureReference);
                    })
                }
                defer.resolve();
            }, backendService.error);
            return defer.promise;
        }

        function getInspectionContext() {
            var defer = $q.defer();
            characteristicRepService.GetInspectionContext(vm.context).then(function (data) {
                if (data.value.length > 0) {
                    vm.InspectionContext = data.value[0];

                    if (vm.InspectionContext.InspectionSamples.length > 0) {
                        getUnlistedFailures(vm.InspectionContext.InspectionSamples).then(function () {
                            vm.ActualValue = getActualValues(vm.InspectionContext.InspectionSamples);
                            if (null !== vm.ActualValue) {
                                fillValues();
                            }
                             defer.resolve();
                        });
                    }
                    else {
                        vm.DisplayInfoBadge = false;
                        vm.HasAttribute = null;
                        vm.ActualValue = null;
                        vm.Quantity = null;
                        vm.HasFailure = false;
                        defer.resolve();
                    }
                }
                else {
                    createInspectionContext();
                    defer.resolve();
                }

            }, backendService.error);
            return defer.promise;
        }

        vm.selectFailure = function (oldvalue, newvalue) {
			if(newvalue !== "" && typeof newvalue !== "undefined")
			{ 
				vm.editable = true;
				vm.defaultColor = newvalue.color;
		    }
        };

        function restorePoints() {
            vm.imageUploadApi.cleanpoints();
            var requiresRedraw = false;
            if (!vm.ActualValue) {
                vm.ActualValue = getActualValues(vm.InspectionContext.InspectionSamples);
                if (!vm.ActualValue) return false;
            }

            var visualSamples = vm.ActualValue.VisualDetectedFailures;
            for (var j = 0; j < visualSamples.length; j++) {
                var coords;
                if (visualSamples[j].Coords === null) {
                    coords = generateCoords(visualSamples[j], j);                  
                }
                else {
                    coords = JSON.parse(visualSamples[j].Coords);
                }
                if (coords.length > 0) {
                    var color = coords[0].color;
                    var legendaentry = _.find(vm.FailuresLegenda, function (leg) { return leg.color === color });
                    if (legendaentry != null) {
                        legendaentry.count = coords.length;
                    }
                }

                for (var i = 0; i < coords.length; i++) {
                    requiresRedraw = true;
                    vm.imageUploadApi.setPoints(coords[i]);
                }
            }

            $scope.$apply();
            return requiresRedraw;
        }

    function generateCoords(visualSample, yfactor) {
        var c = [];
        var fcolor = _.find(vm.FNIdColorsAssociations, function (ass) { return ass.NId === visualSample.FailureNId });
        var color = (typeof fcolor === "undefined") ? vm.Colors[0] : fcolor.color;
        for (var i = 0; i < visualSample.Count; i++) {
            c.push({
                x: 20 * (i+1),
                y: 20 * (yfactor+1),
                color: color
            })
        }
        return c;
    }

        function fillValues() {

            if (vm.IsVariable) {
                vm.Quantity = vm.ActualValue.InspectionValues[0].MeasuredVariableValue;
                vm.FailureNId = vm.ActualValue.InspectionValues[0].FailureNId;
                vm.HasFailure = vm.FailureNId  !== null && vm.FailureNId !== "";
                //TODO: avoid display badge in case of null Lower or Upper tolerance
                vm.DisplayInfoBadge = vm.Quantity < vm.Specification.CharacteristicSpecification.LowerTolerance.QuantityValue ||
                vm.Quantity > vm.Specification.CharacteristicSpecification.UpperTolerance.QuantityValue;
            }
            if (vm.IsAttributive) {
                vm.HasAttribute = vm.ActualValue.InspectionValues[0].MeasuredAttributeValue;
                vm.HasFailure = vm.ActualValue.InspectionValues[0].FailureNId !== "";
                vm.FailureNId = vm.ActualValue.InspectionValues[0].FailureNId;
            }

            if (vm.IsVisual) {
                if (typeof vm.ActualValue === "undefined") {
                    return;
                }
                var visualSamples =  vm.ActualValue.VisualDetectedFailures;
                if (vm.HasImage) {
                    angular.forEach(visualSamples, function (value, key) {
                        vm.FailuresToBeUpdated.push({ Id: value.Id, FailureNId: value.FailureNId, Count: value.Count });
                    });
                    return;
                }
          
                angular.forEach(visualSamples, function (value, key) {
                    var element = angular.element("#failure_" + removeSpaces(value.FailureNId))[0];
                    if (element == undefined) {
                        var message = $translate.instant("characteristicRepr.FailureNotMigrated", { FailureNId: value.FailureNId });
                        logger.logError(message);
                        //TODO: it is a simple race condition to be managed with right sequence of XHR callbacks instead of horrible $timeout
                        $timeout(function () {
                            if (angular.element("#failure_" + removeSpaces(value.FailureNId))[0]) {
                                vm.FailuresToBeUpdated.push({ Id: value.Id, FailureNId: value.FailureNId, Count: value.Count });
                                angular.element("#failure_" + removeSpaces(value.FailureNId))[0].value = value.Count;
                            }
                        }, 500);
                    }
                    else {
                        vm.FailuresToBeUpdated.push({ Id: value.Id, FailureNId: value.FailureNId, Count: value.Count });
                        angular.element("#failure_" + removeSpaces(value.FailureNId))[0].value = value.Count;
                    }
                });
            }
        }

        function createInspectionContext() {
            vm.DisplayInfoBadge = false;
            vm.HasAttribute = null;
            vm.ActualValue = null;
            vm.Quantity = null;
            vm.HasFailure = false;
            characteristicRepService.CreateInspectionContext(vm.context).then(function (value) {
                var inspectionContextId = value.data.Id;

                characteristicRepService.GetInspectionContextById(inspectionContextId).then(function (data) {
                    if (data.value.length > 0)
                        vm.InspectionContext = data.value[0];
                }, backendService.error);
            }, backendService.error);
        }

        function valueChanged() {
            if (!vm.notifyViolations) {
                return false;
            }

            if (vm.Quantity == undefined) {
                if (vm.ActualValue) {
                    vm.Quantity = vm.ActualValue.InspectionValues[0].MeasuredVariableValue;
                }
                vm.HasFailure = vm.ActualValue.InspectionValues[0].FailureNId != "";
                vm.DisplayInfoBadge = false;
                return false;
            }
            vm.DisplayInfoBadge = vm.Quantity < vm.Specification.CharacteristicSpecification.LowerTolerance.QuantityValue ||
                vm.Quantity > vm.Specification.CharacteristicSpecification.UpperTolerance.QuantityValue;
            return true;
        }

        function saveSample() {

            var validSample = false;

            if (vm.ActualValue !== null) {
                var sampleUpdateValue = {
                    Id: vm.ActualValue.InspectionValues[0].Id
                };

                if (vm.Quantity !== null) {
                    sampleUpdateValue.MeasuredVariableValue = vm.Quantity;
                    if (vm.Quantity < vm.Specification.CharacteristicSpecification.LowerTolerance.QuantityValue ||
                        vm.Quantity > vm.Specification.CharacteristicSpecification.UpperTolerance.QuantityValue) {
                        vm.HasFailure = false;
                        vm.FailureNId = null;
                    }
                    validSample = true;
                }

                if (vm.IsAttributive && vm.HasAttribute != null) {
                    sampleUpdateValue.MeasuredAttributeValue = vm.HasAttribute;
                    if (vm.HasAttribute) {
                        vm.HasFailure = false;
                        vm.FailureNId = null;
                    }
                    validSample = true;
                }

                if (validSample) {
                    characteristicRepService.UpdateInspectionValue(sampleUpdateValue).then(function (value) {
                        logger.logInfo($translate.instant("characteristicRepr.sampleupdated"));
                    }, backendService.error);
                }
                return;
            }

            var sampleValue = {
                InspectionAcquisitionContextId: vm.InspectionContext.Id,
                MTUNId: vm.mtu
            }

            if (vm.Quantity !== null) {
                sampleValue.MeasuredVariableValue = vm.Quantity;
                validSample = true;
            }

            if (vm.IsAttributive && vm.HasAttribute !== null) {
                sampleValue.MeasuredAttributeValue = vm.HasAttribute;
                validSample = true;
            }

            if (validSample) {
                var runtimeChrRepresentationNId = vm.context.RuntimeChrRepresentationNId;
                characteristicRepService.CreateInspectionValue(sampleValue).then(function (value) {

                    logger.logInfo($translate.instant("characteristicRepr.samplesaved"));
                    var inspectionContextId = sampleValue.InspectionAcquisitionContextId;
                    // the inspection value id is on value.data.Id;
                    characteristicRepService.GetInspectionContextById(inspectionContextId).then(function (data) {
                        if (data.value.length > 0 && runtimeChrRepresentationNId === vm.context.RuntimeChrRepresentationNId) {
                            vm.InspectionContext = data.value[0];
                            vm.ActualValue = getActualValues(vm.InspectionContext.InspectionSamples);
                        }
                        else if (vm.ActualValue == null) {
                            vm.DisplayInfoBadge = false;
                            vm.HasAttribute = null;
                            vm.Quantity = null;
                        }
                    }, backendService.error);
                }, backendService.error);
            }
        }

        function setTooltipPosition() {
            $(".icon-text").each(function(index) { $(this).css('left', -5 - $(this).width() * (1 - 1 / 1.618)) });
        }

        function clickedPoint(point) {
            saveSketchSample();
        }

        function saveSketchSample() {
            var detectedFailures = vm.imageUploadApi.getpoints();
            var gby = _.groupBy(detectedFailures, function (element) { return element.color });
            angular.forEach(vm.Specification.CharacteristicSpecification.FailureReferences, function(value, key) {
                var failureNId = value.Failure.NId;
                var failureColor = _.find(vm.FNIdColorsAssociations, function(failure) {
                    return failure.NId === failureNId;
                });
                var count;
                var coords;
                _.each(gby,
                    function (element, index, list) {
                        if (index === failureColor.color) {
                            count = element.length;
                            coords = "[" +
                                _.map(list[index], function(element) { return JSON.stringify(element) }).join(",") +
                                "]";
                        }
                    });
                var visualValue = {
                    InspectionAcquisitionContextId: vm.InspectionContext.Id,
                    MTUNId: vm.mtu,
                    FailureNId: failureNId,
                    Count: count,
                    Coords: coords
                }

                var foundLeg = _.find(vm.FailuresLegenda, function (option) { return option.color === failureColor.color });
                if (foundLeg) {
                    foundLeg.count = (count !== undefined)?count:0;
                }

                var found = _.findWhere(vm.FailuresToBeUpdated, { FailureNId: failureNId });
                if (found && found.Count !== count && !isNaN(count)) {
                    characteristicRepService.UpdateVisualDetectedFailure({ Id: found.Id, Count: count, Coords: coords }).then(function (value) {
                        logger.logInfo($translate.instant("characteristicRepr.sampleupdated"));
                    }, backendService.error);
                    return;
                }

                if (count !== null && isNaN(count) || (typeof found !== "undefined")) return;



                vm.FailuresToBeUpdated.push({ Id: null, FailureNId: failureNId, Count: count });
                characteristicRepService.CreateVisualDetectedFailure(visualValue).then(function (value) {
                    logger.logInfo($translate.instant("characteristicRepr.samplesaved"));
                    var found = _.findWhere(vm.FailuresToBeUpdated, { FailureNId: failureNId });
                    found.Id = value.data.Id;
                }, backendService.error);
            });
        }

        function saveVisualSample() {

            angular.forEach(vm.Specification.CharacteristicSpecification.FailureReferences, function (value, key) {

                var failureNId = value.Failure.NId;
                var count = angular.element("#failure_" + removeSpaces(failureNId))[0].value;
                count = Number.parseInt(count);
                var visualValue = {
                    InspectionAcquisitionContextId: vm.InspectionContext.Id,
                    MTUNId: vm.mtu,
                    FailureNId: failureNId,
                    Count: count
                }

                var found = _.findWhere(vm.FailuresToBeUpdated, { FailureNId: failureNId });

                if (found && found.Count !== count && !isNaN(count)) {
                    characteristicRepService.UpdateVisualDetectedFailure({ Id: found.Id, Count: count }).then(function (value) {
                        logger.logInfo($translate.instant("characteristicRepr.sampleupdated"));
                    }, backendService.error);
                    return;
                }

                if (typeof found !== "undefined") {
                    if (isNaN(count)) {
                        var element = angular.element("#failure_" + removeSpaces(failureNId))[0];
                        element.value = found.Count;
                    }
                    return;
                }

                if (isNaN(count)) return;

                characteristicRepService.CreateVisualDetectedFailure(visualValue).then(function (value) {
                    logger.logInfo($translate.instant("characteristicRepr.samplesaved"));
                    vm.FailuresToBeUpdated.push({ Id: value.data.Id, FailureNId: failureNId, Count: count });
                }, backendService.error);

            });
        }

        function getViewerData() {

            if (vm.containerId === "" || vm.containerId.indexOf('{') !== -1) {
                vm.HasImage = false;
                vm.isloaded = false;
                return;
            }
            resetInitialValues();
            characteristicRepService.GetCharacteristicRepresentation(vm.containerId).then(function (data) {
                vm.HasFailure = false;
                vm.HasImage = false;

                vm.isloaded = characteristicRepService.IsEnabled();
                vm.viewerData = data.value;
                registerEvents();
              }, backendService.error);
        }

        vm.currentTask = "";
        $scope.$on('common.widgets.containers.task-visible',  function (newVal, value) {
			if(value.taskId !== vm.currentTask)
			{
			   vm.currentTask = value.taskId;
               resetInitialValues();
			   initialize();
			}
        });


        function resetInitialValues() {
            //vm.viewerData = [];
            vm.Specification = {};
            vm.InspectionContext = {};
            vm.IsVisual = false;
            vm.IsAttributive = false;
            vm.IsVariable = false;
            vm.HasValue = false;
            vm.HasImage = false;
            vm.Quantity = null;
            vm.HasFailure = false;
            vm.HasAttribute = null;
            vm.ImageWidth = 0;
            vm.ImageHeight = 0;
            vm.FailureNId = null;
		    vm.FailuresToBeUpdated = [];
		    vm.chosenFailure = {};
		    vm.propertyGridData = [];
            vm.ActualValue = {};
            vm.hasAttachments = false;
        }

        vm.viewerOptions = {
            containerID: 'repritemlist',
            selectionMode: 'single',
            viewMode: 'c',
            svgIcon: 'common/icons/typeCharacteristicRepresentation48.svg',
            quickSearchOptions: {
                enabled: true,
                field: 'NId',
                filterText: ''
            },
            sortFields: ['NId'],
            filterBarOptions: "sq",
            tileConfig: {
                propertyFields: [
                    { field: 'CanBeSkipped', displayName: $translate.instant('characteristicRepr.CanBeSkipped') },
                    { field: 'ChrSpecNId', displayName: $translate.instant('characteristicRepr.NId')  },
                    { field: 'ChrSpecRevision', displayName: $translate.instant('characteristicRepr.Revision')  }
                ],
                titleField: 'Label',
                descriptionField: 'ChrReprNId',
                isCell: true
            },
            onSelectionChangeCallback: onSelectionChange
        };

        initialize();

        function initialize() {
            logger = common.logger;
            vm.isenabled = characteristicRepService.IsEnabled();
            if (typeof vm.context === "string") {
                vm.context = JSON.parse(vm.context);
            }
            if (vm.notifyViolations == undefined) {
                vm.notifyViolations = true;
            }
            var x = [];
            onSelectionChange(x);
        }


        function onSelectionChange(item) {

            var image = angular.element("#" + vm.ImageId);
            if (image.length > 0) {
                image[0].remove();
            }
            if (typeof vm.context === "string") {
                vm.context = JSON.parse(vm.context);
            }

            vm.IsVariable = false;
            vm.IsAttributive = false;
            vm.IsVisual = false;
            vm.HasImage = false;
            vm.FailureNId = null;
            vm.DisplayInfoBadge = false;
            vm.HasAttribute = null;
            vm.ActualValue = null;
            vm.Quantity = null;
            vm.HasFailure = false;
            vm.chosenFailure = null;
            vm.editable = false;

            if (item.length !== 0) {
                vm.Label = item[0].Label;
                vm.Id = item[0].ChrReprNId;
                vm.context.RuntimeChrRepresentationNId = item[0].NId;

                getSpecification();

            }
        }


    }

})();

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.characteristicRepr');
      //  .provider('siemens.simaticit.common.widgets.characteristicRepr.charrepProvider', charrepProvider)
     //   .controller('siemens.simaticit.common.widgets.characteristicRepr.characteristicReprRuntime', characteristicReprRuntime);


})();

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.characteristicRepr').service('siemens.simaticit.common.characteristicReprService', characteristicReprService);

    characteristicReprService.$inject = ['$q',  'common.services.runtime.backendService'];
    function characteristicReprService($q,  backendService) {
        var APP_NAME = "WorkInstruction";
        var isenabled = backendService.getAppEndPoint(APP_NAME) != null;

        this.IsEnabled = function()
        {
            return isenabled;
        }

        this.GetSketch = function(imageId)
        {
            var object = {
                "appName": APP_NAME,
                "functionName": "GeSketchImage",
                "params": { ImageId: imageId }
            };
            return backendService.read(object);
        }

        this.GetCharacteristicRepresentation = function (containerid) {
            var options = containerid === "" ? "" : "$filter=RuntimeChrReprContainer_Id eq " + containerid;
            var query = {
                appName: APP_NAME,
                entityName: "RuntimeCharacteristicRepresentation",
                options: options
            }
            return backendService.findAll(query);
        }

        this.GetCharacteristicSpecification = function (characteristicrepresentationnid) {
            var options = characteristicrepresentationnid === "" ? "" : "$filter=NId eq '" + characteristicrepresentationnid +"'&$expand=CharacteristicSpecification($expand=FailureReferences($expand=Failure))";
            var query = {
                appName: APP_NAME,
                entityName: "CharacteristicRepresentation",
                options: options
            }
            return backendService.findAll(query);
        }

        this.GetInspectionContext = function (context) {
            var options = "$filter=RuntimeCharacteristicRepresentationNId eq '" + context.RuntimeChrRepresentationNId +
                "' AND EquipmentNId eq '" + context.EquipmentNId +
                "' AND MaterialNId eq '" + context.MaterialNId +
                "'&$expand=InspectionSamples($expand=InspectionValues,VisualDetectedFailures)";
            var query = {
                appName: APP_NAME,
                entityName: "InspectionAcquisitionContext",
                options: options
            }
            return backendService.findAll(query);
        }

        this.GetInspectionContextById = function (Id) {
            var options = "$filter=Id eq " + Id +"&$expand=InspectionSamples($expand=InspectionValues,VisualDetectedFailures)";
            var query = {
                appName: APP_NAME,
                entityName: "InspectionAcquisitionContext",
                options: options
            }
            return backendService.findAll(query);
        }

        this.CreateInspectionContext = function(acquisitioncontext)
        {
            return backendService.invoke({
                'appName': APP_NAME,
                'commandName': 'CreateInspectionAcquisitionContext',
                'params': acquisitioncontext
            });
        }


        this.CreateInspectionValue = function (inspectionvalue)
        {
            return backendService.invoke({
                'appName': APP_NAME,
                'commandName': 'CreateInspectionValue',
                'params': inspectionvalue
            });
        }

        this.CreateVisualDetectedFailure = function (visualfailurevalue)
        {
            return backendService.invoke({
                'appName': APP_NAME,
                'commandName': 'CreateVisualDetectedFailure',
                'params': visualfailurevalue
            });
        }

        this.UpdateInspectionValue = function (inspectionvalue)
        {
            return backendService.invoke({
                'appName': APP_NAME,
                'commandName': 'UpdateInspectionValue',
                'params': inspectionvalue
            });
        }

        this.UpdateVisualDetectedFailure = function (visualfailurevalue)
        {
            return backendService.invoke({
                'appName': APP_NAME,
                'commandName': 'UpdateVisualDetectedFailure',
                'params': visualfailurevalue
            });
        }


        this.RemoveFailureToInspectionValue = function (visualfailurevalue) {
            return backendService.invoke({
                'appName': APP_NAME,
                'commandName': 'DisassociateFailureFromInspectionValue',
                'params': visualfailurevalue
            });
        }

        this.AssociateFailureToInspectionValue = function (Id, FailureId) {
            var payload = {
                Id: Id,
                FailureId: FailureId
            }
                 return backendService.invoke({
                'appName': APP_NAME,
                'commandName': 'AssociateFailureToInspectionValue',
                'params': payload
            });
        }

        this.getFailures = function (parentid) {
            var object = {
                "appName": "Defect",
                "functionName": "GetFailures",
                "params": { FailureId: parentid },
                "options": ""
            };

            return backendService.read(object);
        }

        this.getFailuresByNIds = function (nids) {
            if (nids.length <= 0) {
                return $q.resolve(null);
            }
            var options = "$expand=Attachments&$filter=";
            _.each(nids, function (nid, index) {
                if (index != 0) {
                    options += " or ";
                }
                options += "NId eq '" + nid + "'";
            })

            var query = {
                appName: "Defect",
                entityName: "Failure",
                options: options
            }
            return backendService.findAll(query);
        }

        this.getAttachments = function (failureid) {
            var options = "$expand=Attachments&$filter=Id eq " + failureid;
            var query = {
                appName: "Defect",
                entityName: "Failure",
                options: options
            }
            return backendService.findAll(query);
        }

        this.getAttachmentFile = function(fileId, iconId) {
            var object = {
                    "appName": "Defect",
                    "functionName": "GetAttachmentFile",
                    "params": { FileId: fileId, IconId: iconId }
            };
            return backendService.read(object);
        }
    }

})();

(function () {
    "use strict";
    angular.module('siemens.simaticit.common.widgets.characteristicRepr')
        .directive('sitFailuresBrowser', failuresBrowser);

    function failuresBrowser() {
        return {
            templateUrl: "common/widgets/characteristicRepr/sit-failures-browser-dir.html",
            controller: failuresBrowserController,
            restrict: "E",
            controllerAs: "vm",
            scope: {},
            bindToController: {
                alreadyAssigned: "=",
                selectedItem: "=",
                hasSelection: "=",
                displayMode: "="
            },
            link: {
                post: function postLink(scope, element, attrs, ctrl) {

                }
            }
        }
    }

    failuresBrowserController.$inject = ["$scope", "$rootScope","common.base","siemens.simaticit.common.characteristicReprService", "$translate", "$q"];

    function failuresBrowserController($scope, $rootScope, common, characteristicReprService, $translate, $q) {

        var vm = this;
        vm.onButtonClick = onButtonClick;
        vm.onGoBackClick = onGoBackClick;
        vm.id =  $scope.$id;
        vm.name = "failuresBrowser_" + $scope.$id;
        vm.ready = false;
        vm.viewerData = [];
        vm.viewerOptions = {};
        vm.attachmentsOnly = false;
        vm.NavigatingHierarchy = false;
        var backendService = common.services.runtime.backendService;
        function activate() {
            initGrid();

            switch (vm.displayMode) {
                case 0:
                    initData(null);
                    break;
                case 1:
                    _.each(vm.alreadyAssigned, function (ass) {
                        vm.viewerData.push(ass.Failure);
                    });
                    vm.ready = true;
                    break;
                case 2:
                    vm.attachmentsOnly = true;
                    getAttachments(vm.alreadyAssigned[0].Failure_Id);
                    break;
                default:

                    break;
            }
        }
        vm.homeIcon = {
            path: "common/icons/cmdHome24.svg",
            size: "16"
        };
        vm.browseIcon = {
            path: "common/icons/cmdGoToElement24.svg",
            size: "16"
        };
        vm.backIcon = {
            path: "common/icons/cmdBack24.svg",
            size: "16"
        };
        activate();

        function onGoBackClick() {
             vm.viewerData = [];
             _.each(vm.alreadyAssigned, function (ass) {
                vm.viewerData.push(ass.Failure);
            });
            vm.NavigatingHierarchy = false;
        }

        function onButtonClick() {
             vm.NavigatingHierarchy = true;
            initData(null);
        }

         function initGrid() {
             vm.viewerOptions = {

                 containerID: 'div_' + vm.name,
                 userPrefId: vm.id,
                 selectionMode: 'single',
                 viewMode: 'l',
                 viewOptions: 'l',
                 enablePaging: false,
                 alwaysShowPager:false,
                 svgIcon: 'common/icons/typeFMEAFailureSpecification48.svg',
                 tileConfig: {
                     isCell: true,
                     titleField: 'NId',
                     propertyFields: [
                         { field: 'Name', displayName: $translate.instant('characteristicRepr.Name') },                     
                         { field: 'Revision', displayName: $translate.instant('characteristicRepr.FailureRevision') }
                     ],
                     descriptionField: 'Description',
                     commands: [
                         {
                             cmdIcon: 'Open',
                             onClick: function (item) {
                                 initData(item.Id);
                                 vm.selectedItem = null;
                                 vm.hasSelection = false;
                                 vm.hasAttachments = false;
                             },
                             tooltip: $translate.instant('characteristicRepr.OpenChildrenFailures'),
                             visible: function (item) {return item.HasChildren }
                         }]
                 },
                 noDataMessage: $translate.instant('characteristicRepr.NoAssociatedFailures'),
                 onSelectionChangeCallback: onItemSelection
             };
        }


          vm.categories = [
                    {
                        "id": "1",
                        "label": $translate.instant('characteristicRepr.attachmentlist'),
                        "uploadEnabled": false,
                        "deleteEnabled": false
                    }
                ];


                vm.actions = [

                ];

                vm.config = {
                    "title":  $translate.instant('characteristicRepr.document'),
                    "showFirstDocument": false,
                    "mode": "display",
                    "fullScreenMode": "toolbar",
                    "plugins": [
                        {
                            "format": "svg",
                            "viewer": "sit-vector-viewer"
                        }
                    ]
                };

        function initData(id) {
            characteristicReprService.getFailures(id).then(function (data) {
                if ((data) && (data.succeeded)) {
                    vm.ready = true;
                    vm.viewerData = _.where(data.value, function (failure) {
                        var notfound = true;
                        angular.foreEach(vm.alreadyAssigned, function (already) {
                            notfound = (already.label === failure.NId);
                        });
                        return notfound;
                    });
                } else {
                    vm.viewerData = [];
                }
                vm.ready = true;
            }, backendService.backendError);
        }

        vm.attachmentData = {};
        vm.hasAttachments = false;
        function onItemSelection(items, item) {

            var found = _.find(vm.alreadyAssigned, function (already) { return already.Failure.NId === item.NId });
            if (found && vm.displayMode === 0) {
                vm.selectedItem = null;
                vm.hasSelection = false;
                return;
            }
            if (item && item.selected === true) {
                vm.selectedItem = item;
                vm.hasSelection = true;
                getAttachments(item.Id);

            } else {
                vm.selectedItem = null;
                vm.hasSelection = false;
                vm.hasAttachments = false;
            }
            $rootScope.$emit('failuresModal.selection', vm.hasSelection);
        }

        function getAttachments(failureid) {
            characteristicReprService.getAttachments(failureid).then(function (data) {
                if ((data) && (data.succeeded)) {
                    if (data.value[0].Attachments.length > 0) {
                        vm.attachmentData = data.value[0].Attachments;
                        loadFailureAttachments(vm.attachmentData).then(function (result) {

                        });
                    }
                    else {
                        vm.hasAttachments = false;
                    }
                }
                else {
                    vm.hasAttachments = false;
                }
            });

        }

        function loadFile(fileId, iconId) {
            characteristicReprService.getAttachmentFile(fileId, iconId).then(function (data) {
                if ((data) && (data.succeeded)) {
                    vm.hasAttachments = true;
                    vm.selectedItem.hasAttachments = true;
                    var len = vm.attachmentData.length;
                    vm.attachmentData[len] = {}
                    vm.attachmentData[len].name = data.value[0].File.name;
                    vm.attachmentData[len].category = "1";
                    vm.attachmentData[len].remote = "true";
                    vm.attachmentData[len].format = findFormat(data.value[0].File.type);
                    vm.attachmentData[len].source = data.value[0].File.data;
                    if (data.value[0].Icon !== undefined)
                        vm.attachmentData[len].thumbnail = data.value[0].Icon.data;
                }

            });
        }

         function findFormat(mimeType) {

             switch (mimeType) {
                case "text/plain":
                    return "text";
                case "image/svg+xml":
                    return "svg";
                case "application/pdf":
                    return "pdf";
                default:
                   if (mimeType.match(/^image\//))
                        return "image";
                   if (mimeType.match(/^video\//))
                       return "video";
             }

             return "unknown";

        }

        function loadFailureAttachments(data) {
                var defer = $q.defer();
                var promises = [];
                for (var ndx = 0; ndx < data.length; ndx++) {
                    var fileId = data[ndx].FileAttachment_Id_Id;
                    var iconId = data[ndx].IconAttachment_Id_Id;
                    promises.push(loadFile(fileId, iconId));
                }
                $q.all(promises).then(function () {
                    defer.resolve();
                });
                return defer.promise;
            }
    }
})();

(function () {
    "use strict";
    angular.module('siemens.simaticit.common.widgets.characteristicRepr')
        .directive('sitFailuresLegenda', failuresLegenda);

    function failuresLegenda() {
        return {
            template: "<div class='failures-legenda'><ul style='list-style:none'>" +
                "<li ng-repeat='option in options'><div style='padding: 8px' ><span class='badge'>{{option.count}}</span>" +
                "<div style='background-color:{{option.color}};min-width:32px;width:32px;height:32px;display:inline-block;border:1px solid black;vertical-align:top;'>" +
                "&nbsp;</div>" +
                "<div style='display:inline-block;vertical-align:top;padding-left:16px;'><b>{{option.label}}</b><br>" +
                "<em>{{option.description}}</em></div></div>"+
                "<li></ul></div>",
            restrict: "E",
            scope: {
                options: "=?"
            }
        }
    }
})();

(function () {
    "use strict";
    angular.module('siemens.simaticit.common.widgets.characteristicRepr')
        .directive('sitImageGrid', imageGrid);

    function imageGrid() {
        return {
            templateUrl: "common/widgets/characteristicRepr/sit-image-grid-dir.html",
            controller: imageGridController,
            restrict: "E",
            controllerAs: "vm",
            scope: {},
            bindToController: {
                gheight: "=",
                gwidth: "=",
                uploaderid: "@",
                imageid: "@",
                onRegisterApi: "&",
                editable: "=",
                pointscolor: "=?"
            },
            link: {
                post: function postLink(scope, element, attrs, ctrl) {
                    if (!attrs.pointscolor) {
                        ctrl.pointscolor = "#c0c0c0";
                    }
                }
            }
        }
    }

    imageGridController.$inject = ["$document", "$scope"];

    function imageGridController($document, $scope) {

        var vm = this;
        vm.strokecolor = "#000000";
        vm.points = [];
        vm.gid = "image_preview_canvas_" + $scope.$id;
        vm.drawingpoints = false;
        vm.gridRows = 0;
        vm.gridColumns = 0;
        vm.ctx = {};
        vm.canvas = {};
        vm.Radius = 5;

        function getFileUploader() {
            if (typeof XPathResult !== "undefined") {
                return $document[0] //NOSONAR
                    .evaluate("//sit-file-uploader[@sit-id='" + vm.uploaderid + "']/descendant::input[@type='file']",
                        $document[0],
                        null,
                        XPathResult.FIRST_ORDERED_NODE_TYPE,
                        null).singleNodeValue;
            }
            else if ($("input[type='file']").length > 0) {
                return $("input[type='file']")[0];
            }
            else {
                return { files: [] };
            }
        }


        $scope.$on('common.widgets.containers.task-visible',  function (newVal, value) {
             activate();
        });

        function update(rows, columns) {
            var fileUploader = getFileUploader();
            vm.img = angular.element("#" + vm.imageid)[0];
            vm.canvas = angular.element("#" + vm.gid)[0];
            vm.ctx = vm.canvas.getContext("2d");
            vm.gridRows = rows;
            vm.gridColumns = columns;
            var file = fileUploader.files[0];
            if (file) {
                refresh(rows, columns);
            } else {
                load(rows, columns);
            }
        }

        function load(rows, columns) {
            vm.img = angular.element("#" + vm.imageid)[0];
            vm.canvas = angular.element("#" + vm.gid)[0];
            vm.ctx = vm.canvas.getContext("2d");
            vm.gridRows = rows;
            vm.gridColumns = columns;
            ImageLoad();
        }

        function ImageLoad() {
            vm.img.wrh = vm.img.naturalWidth / vm.img.naturalHeight;
            vm.img.width = vm.canvas.width;
            vm.img.height = vm.img.width / vm.img.wrh;
            if (vm.img.height > vm.canvas.height) {
                vm.img.height = vm.canvas.height;
                vm.img.width = vm.img.height * vm.img.wrh;
            }
            vm.img.posX = 0;
            vm.img.posY = 0;
            vm.drawImage();
        }


        $scope.$watch('vm.editable', function (newVal) {
            if (vm.editable) {
                if (vm.canvas.addEventListener) {
                    vm.canvas.addEventListener('click', addPointClick, false);
                }
            } else {
                if (vm.canvas.removeEventListener) {
                    vm.canvas.removeEventListener('click', addPointClick, false);
                }
            }
        });

        function refresh(rows, columns) {
            vm.gridRows = rows;
            vm.gridColumns = columns;
            vm.canvas = angular.element("#" + vm.gid)[0];

            if (vm.editable) {
                vm.canvas.addEventListener('click', addPointClick, false);
            }
            var fileUploader = getFileUploader();

            vm.img = new Image();
            if (vm.canvas) {

                vm.ctx = vm.canvas.getContext("2d");

                vm.canvas.height = vm.canvasHeight;
                vm.canvas.width = vm.canvasWidth;
                // Create new vm.img element
                var file = fileUploader.files[0];
                var reader = new FileReader();
                if (file) {
                    reader.readAsDataURL(file);

                    reader.onload = function (e) {
                        vm.img.src = e.target.result;
                    }
                    vm.img.onload = function () {
                        ImageLoad();
                    }
                }
            }



        }
        vm.drawPoints = function () {
            // define the radius
           // var radius = 3.5;

            if (vm.editable || vm.drawingpoints) {
                for (var p = 0; p < vm.points.length; p++) {
                    // get the position
                    var x = vm.points[p].x;
                    var y = vm.points[p].y;
                    rescaleCoords(x, y, false);

                    // reformat the position to the drawing size
                    x *= vm.img.width / vm.img.naturalWidth;
                    y *= vm.img.height / vm.img.naturalHeight;

                    x += vm.img.posX;
                    y += vm.img.posY;

                    // draw the point
                    vm.ctx.beginPath();
                    vm.ctx.arc(x, y, vm.Radius, 0, 2 * Math.PI, false);
                    vm.ctx.fillStyle = vm.points[p].color;
                    vm.ctx.fill();
                    vm.ctx.stroke();
                }
            }
        }


        vm.drawGrid = function () {
            if (vm.gridColumns <= 0 || vm.gridRows <= 0) {
                return;
            }

            var columns = vm.gridColumns;
            var rows = vm.gridRows;

            var columnSize = vm.img.width / columns;
            var rowSize = vm.img.height / rows;

            // create the matrix
            var errorMatrix = [];
            var i;
            var j;
            for (i = 0; i < errorMatrix.length; i++) {
                errorMatrix.push([]);
                for (j = 0; j < errorMatrix[i].length; j++) {
                    errorMatrix[i].push(0);
                }
            }

            // draw the grid
            for (i = 0; i < columns; i++) {
                for (j = 0; j < rows; j++) {
                    vm.ctx.beginPath();
                    vm.ctx.moveTo((i * columnSize) + vm.img.posX, vm.img.posY);
                    vm.ctx.lineTo((i * columnSize) + vm.img.posX, vm.img.height + vm.img.posY);
                    vm.ctx.strokeStyle = vm.strokecolor;
                    vm.ctx.stroke();

                    vm.ctx.beginPath();
                    vm.ctx.moveTo(vm.img.posX, (j * rowSize) + vm.img.posY);
                    vm.ctx.lineTo(vm.img.width + vm.img.posX, (j * rowSize) + vm.img.posY);
                    vm.ctx.strokeStyle = vm.strokecolor;
                    vm.ctx.stroke();
                }
            }


            vm.ctx.beginPath();
            vm.ctx.moveTo(vm.img.width + vm.img.posX, vm.img.posY);
            vm.ctx.lineTo(vm.img.width + vm.img.posX, vm.img.height + vm.img.posY);
            vm.ctx.strokeStyle = vm.strokecolor;
            vm.ctx.stroke();

            vm.ctx.beginPath();
            vm.ctx.moveTo(vm.img.posX, vm.img.height + vm.img.posY);
            vm.ctx.lineTo(vm.img.width + vm.img.posX, vm.img.height + vm.img.posY);
            vm.ctx.strokeStyle = vm.strokecolor;
            vm.ctx.stroke();
        }

        vm.drawImage = function () {
            vm.ctx.clearRect(0, 0, vm.canvas.width, vm.canvas.height);
            vm.ctx.drawImage(vm.img, vm.img.posX, vm.img.posY, vm.img.width, vm.img.height);
            vm.drawGrid();
            vm.drawPoints();

        }
        function rescaleCoords(x, y, realtoper) {
            if (realtoper) {
                x = x * 100 / vm.canvas.width;
                y = y * 100 / vm.canvas.height;
            }
            else {
                x = x * vm.canvas.width / 100;
                y = y * vm.canvas.height / 100;
            }
        }



        function addPointClick(event) {
            // get the point in the canvas
            var rect = vm.canvas.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;


            // convert to original picture size
            x *= vm.img.naturalWidth / vm.img.width;
            y *= vm.img.naturalHeight / vm.img.height;

            // add the picture offset to the point
            x -= vm.img.posX * (vm.img.naturalWidth / vm.img.width);
            y -= vm.img.posY * (vm.img.naturalHeight / vm.img.height);

            rescaleCoords(x, y, true);

            var point = {
                x: x,
                y: y,
                color: vm.pointscolor
            };
            if (vm.editable && (x / vm.img.naturalWidth) <= 1 && (y / vm.img.naturalHeight) <= 1) {
                // add the point to the list
                vm.points.push(point);
                _.each(vm.Listeners,
                    function (item) {
                        (item)(point);
                    });
            }

            // redraw everything
            vm.drawImage();

            //notify points added

        }

        function clear() {
            vm.img = null;
            vm.ctx.clearRect(0, 0, vm.canvas.width, vm.canvas.height);
        }

        function cleanPoints() {
            vm.points = [];
        }

        function getPoints() {
            return vm.points;
        }

        function setPoints(point) {
            if (!_.contains(vm.points, point)) {
                vm.points.push(point);
            }

        }

        function redrawPoints(redraw) {
            vm.drawingpoints = redraw;
        }

        vm.Listeners = [];

        function addListener(callback) {
            // Check if the callback is not a function
            if (typeof callback !== 'function') {
                return;
            }

            if (!_.contains(vm.Listeners, callback)) {
                vm.Listeners.push(callback);
            }
        }


        function removeListener(callback) {
            if (_.contains(vm.Listeners, callback)) {
                var idx = vm.Listeners.indexOf(callback);
                vm.Listeners.slice(idx);
            }
        }

        function activate() {
            vm.strokecolor = "#000000";
            vm.points = [];
            vm.drawingpoints = false;
            vm.gridRows = 0;
            vm.gridColumns = 0;
            vm.ctx = {};
            vm.canvas = {};
            vm.canvasHeight = vm.gheight || 200;
            vm.canvasWidth = vm.gwidth || 320;
            vm.api = {
                clear: clear,
                refresh: refresh,
                load: load,
                update: update,
                setPoints: setPoints,
                redrawPoints:redrawPoints,
                getpoints: getPoints,
                cleanpoints: cleanPoints,
                addPointClickedListener: addListener,
                removePointClickedListener: removeListener
            }
            vm.onRegisterApi({ api: vm.api });
        }

        activate();

    }
})();
