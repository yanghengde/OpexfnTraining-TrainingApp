/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
     * @ngdoc module
     * @name siemens.simaticit.common.widgets.tagsManager
     * @access internal
     * @description
     * This module provides UI elements to edit tags for entity instance.
     */
    angular.module('siemens.simaticit.common.widgets.tagsManager', []);
})();

(function () {
    'use strict';
    /**
    * @ngdoc directive
    * @name tagsManager
    * @module siemens.simaticit.common.widgets.tagsManager
    * @description
    * It is a directive which allows to manage a collection of tags.
    * Using this directive you can show a list of available tag (that can be assigned) and a list of assigned tags (that can be removed).
    *
    *
    * In order to do that you should use the following manage-tags-editor directive attributes:
	* * Tags lists  (assigned-tags, available-tags).
	* * Callbacks ( on-validity-changed, on-register-api).
    *
    * @usage
    * As an element:
    * ```
    * <sit-manage-tags-editor assigned-tags="vm.assignedTags"
                                available-tags="vm.availableTags"
                                on-validity-changed="vm.validityChanged(validity)"
                                on-register-api="vm.onRegisterApi(api)">
        </sit-manage-tags-editor>
	*
    *
    * ```
    * @restrict E
    *
    * @param {Array<Tags>} assigned-tags: list of already assigned tags
	* @param {Array<Tags>} available-tags: list of tags available to be assigned
    * @param {function} on-validity-changed: callback that will be invoked whenever the collections validity will change (i.e. it is requested to save something
    * @param {function} on-register-api: callback that will be invoked to get the two collection after something is changed (assigned tag is removed or available tag is added).

    *
    * @example
    * The following example shows how to configure a side-panel widget:
    *
    * In Controller:
    * ```
    *       vm.TagsApi = {};
    *       vm.availableTags = [{ Id: 1, Name: "tag1", Color: "#49576d" },
    *                           { Id: 5, Name: "tag5", Color: "#602310" },
    *							{ Id: 3, Name: "tag3", Color: "#132747" },
    *                           { Id: 7, Name: "Colorless Tag" }];
    *       vm.assignedTags = [{ Id: 4, Name: "tag4", Color: "#992c68" },
    *                           { Id: 2, Name: "tag2", Color: "#2a6646" },
    *                           { Id: 6, Name: "tag6", Color: "#e03500" }];
    *       vm.cansave = false;
    *       vm.savedchanges=false;
    *       vm.validityChanged = function (validity) {
    *            vm.cansave = validity;
    *       };
    *       vm.onRegisterApi = function (api) {
    *            vm.TagsApi = api;
    *       };
    *
    *       vm.saveChanges = function () {
    *       vm.savedchanges = true;
    *       vm.addedtags = vm.TagsApi.tags.tagsNamesToAdd;
    *       vm.removedtags = vm.TagsApi.tags.tagsNamesToRemove;
    *       };
    */

    angular
        .module('siemens.simaticit.common.widgets.tagsManager')
        .directive('sitManageTagsEditor', tmManageTagsEditor);


    function tmManageTagsEditor() {
        return {
            templateUrl: 'common/widgets/tagsManager/sit-manage-tags-editor.directive.html',
            controller: ManageTagsEditorController,
            restrict: 'E',
            controllerAs: 'vm',
            scope: {},
            bindToController: {
                onRegisterApi: '&',
                assignedTags: '=',
                availableTags: '=',
                onValidityChanged: '&',
                warningMessageVisible: '=',
                warningMessage: '='
            }
        }
    }

    ManageTagsEditorController.$inject = ['$translate', 'common.services.tagsManager.tagsManagementService', '$timeout', '$q', '$scope'];

    function ManageTagsEditorController($translate, tagsManagementService, $timeout, $q, $scope) {
        var vm = this;
        vm.assignedTagsVisible = true;
        vm.availableTagsVisible = true;
        vm.cancel = cancel;
        vm.saveButtonVisible = false;

        (function tagViewerMethods(vm) {
            vm.tagViewerAddAvailableTag = tagViewerAddAvailableTag;
            vm.tagViewerRemoveAssignedTag = tagViewerRemoveAssignedTag;

            vm.assignedTagViewerMode = 'remove';
            vm.availableTagViewerMode = 'add';
            vm.onAssignedTagsViewerRegisterApi = onAssignedTagsViewerRegisterApi;
            vm.onAvailableTagsViewerRegisterApi = onAvailableTagsViewerRegisterApi;
            vm.assignedTagsViewerApi = null;
            vm.availableTagsViewerApi = null;
            vm.originalAssignedTags = null;
            vm.tagsNamesToAdd = [];
            vm.tagsNamesToRemove = [];

            function setOriginalAssignedTags() {
                if (vm.originalAssignedTags === null) {
                    vm.originalAssignedTags = angular.copy(vm.assignedTags);
                }
            }

            function tagViewerAddAvailableTag(tag) {
                setOriginalAssignedTags();
                vm.assignedTags[vm.assignedTags.length] = tag;
                var index = _.findIndex(vm.availableTags, function (t) { return t.Name === tag.Name; });
                if (index !== -1) vm.availableTags.splice(index, 1);
                if (vm.assignedTagsViewerApi) { vm.assignedTagsViewerApi.refresh(); }
                if (vm.availableTagsViewerApi) { vm.availableTagsViewerApi.refresh(); }
                updateListOfTagsToAddAndToRemove(tag, true);
                vm.saveButtonVisible = vm.tagsNamesToAdd.length > 0 || vm.tagsNamesToRemove.length > 0;
                if (vm.onValidityChanged) vm.onValidityChanged({ validity: vm.saveButtonVisible });
            }

            function tagViewerRemoveAssignedTag(tag) {
                setOriginalAssignedTags();
                vm.availableTags[vm.availableTags.length] = tag;
                var index = _.findIndex(vm.assignedTags, function (t) { return t.Name === tag.Name; });
                if (index !== -1) vm.assignedTags.splice(index, 1);
                if (vm.assignedTagsViewerApi) { vm.assignedTagsViewerApi.refresh(); }
                if (vm.availableTagsViewerApi) { vm.availableTagsViewerApi.refresh(); }
                updateListOfTagsToAddAndToRemove(tag, false);
                vm.saveButtonVisible = vm.tagsNamesToAdd.length > 0 || vm.tagsNamesToRemove.length > 0;
                if (vm.onValidityChanged) vm.onValidityChanged({ validity: vm.saveButtonVisible });
            }

            function updateListOfTagsToAddAndToRemove(tag, isAdd) {
                var index = _.findIndex(vm.originalAssignedTags, function (t) { return t.Name === tag.Name; });
                if (isAdd) {
                    if (index === -1) {
                        index = _.findIndex(vm.tagsNamesToAdd, function (t) { return t === tag.Name; });
                        if (index === -1) vm.tagsNamesToAdd[vm.tagsNamesToAdd.length] = tag.Name;
                        return;
                    }
                    index = _.findIndex(vm.tagsNamesToRemove, function (t) { return t === tag.Name; });
                    if (index !== -1) vm.tagsNamesToRemove.splice(index, 1);
                    return;
                }
                if (index !== -1) {
                    index = _.findIndex(vm.tagsNamesToRemove, function (t) { return t === tag.Name; });
                    if (index === -1) vm.tagsNamesToRemove[vm.tagsNamesToRemove.length] = tag.Name;
                    return;
                }
                index = _.findIndex(vm.tagsNamesToAdd, function (t) { return t === tag.Name; });
                if (index !== -1) vm.tagsNamesToAdd.splice(index, 1);
            }

            function onAssignedTagsViewerRegisterApi(api) {
                vm.assignedTagsViewerApi = api;
            }

            function onAvailableTagsViewerRegisterApi(api) {
                vm.availableTagsViewerApi = api;
            }
        })(vm);

        function cancel() {
            if (vm.onCancel) vm.onCancel();
        }

        function activate() {
            vm.assignedTagsViewerApi = null;
            vm.availableTagsViewerApi = null;

            vm.api = {
                tags: {
                    tagsNamesToAdd: vm.assignedTags,
                    tagsNamesToRemove: vm.tagsNamesToRemove
                }
            }
            vm.onRegisterApi({ api: vm.api });
        }
        activate();
    }
})();

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.tagsManager').directive('sitTagElement', sitTagElement);

    function sitTagElement() {
        return {
            templateUrl: 'common/widgets/tagsManager/sit-tag-element.directive.html',
            controller: TagElementController,
            restrict: 'E',
            controllerAs: 'vm',
            scope: {},
            bindToController: {
                tag: '=',
                mode: '=',
                onAdd: '&',
                onRemove: '&',
                onSelectionChanged: '&'
            }
        };
    }

    TagElementController.$inject = ['$translate', '$timeout', '$element', '$rootScope'];
    function TagElementController($translate, $timeout, $element, $rootScope) {
        var vm = this;
        vm.add = add;
        vm.remove = remove;
        vm.selectionChanged = selectionChanged;
        vm.defaultcolor = '#f0f0f0';
        activate();

        function activate() {

            vm.addIcon = {
                path: 'common/icons/cmdAdd16.svg',
                size: '16px'
            };

            vm.removeIcon = {
                path: 'common/icons/cmdDelete16.svg',
                size: '16px'
            };

            if (vm.mode === undefined) vm.mode = 'add';
            vm.tagNameAsHtml = escapeHtml(vm.tag.Name);
            var _isColorDefined = isColorDefined();
            var _textcolor = GetTextColorTreshold(_isColorDefined, vm.tag.Color);
            vm.style = _isColorDefined ? { backgroundColor: vm.tag.Color, color: _textcolor } : { backgroundColor: vm.defaultcolor, color: _textcolor };


            function isColorDefined() {
                return vm.tag.Color !== undefined && vm.tag.Color != null && vm.tag.Color !== '';
            }

            function GetTextColorTreshold(isdefined, color) {
                if (!isdefined)
                    return "#464646";

                return isCssColorDark(color) ? "#FFFFFF" : "#464646";
            }
            function isCssColorDark(cssColor) {
                //Determine if an elements css color is light or dark
                //https://gist.github.com/larryfox/1636338
                var r, b, g, hsp
                    , a = cssColor;

                if (a.match(/^rgb/)) {
                    a = a.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/); //NOSONAR
                    r = a[1];
                    g = a[2];
                    b = a[3];
                } else {
                    a = +("0x" + a.slice(1).replace( // thanks to jed : http://gist.github.com/983661
                        a.length < 5 && /./g, '$&$&'
                    )
                    );
                    r = a >> 16;
                    g = a >> 8 & 255;
                    b = a & 255;
                }
                hsp = Math.sqrt( // HSP equation from http://alienryderflex.com/hsp.html
                    0.2126 * (r * r) +
                    0.7152 * (g * g) +
                    0.0772 * (b * b)
                );
                if (hsp > 160) {
                    return false;
                }
                return true;
            }

            function escapeHtml(text) {
                return text
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;")
                    .replace(/-/g, "&minus;");
            }
        }

        function add() {
            if (vm.onAdd) vm.onAdd({ tag: vm.tag });
        }

        function remove() {
            if (vm.onRemove) vm.onRemove({ tag: vm.tag });
        }

        function selectionChanged() {
            if (vm.onSelectionChanged) vm.onSelectionChanged({ tag: vm.tag });
        }
    }
})();

(function () {
    'use strict';
    angular.module('siemens.simaticit.common.widgets.tagsManager').controller('siemens.simaticit.common.widgets.tagsManager.TagMgmtScreenController', TagMgmtScreenController);

    TagMgmtScreenController.$inject = [
        'common.services.tagsManager.tagsManagementService',
        '$state',
        '$stateParams',
        'common.base',
        '$filter',
        '$scope',
        '$translate',
        '$q',
        '$log',
        'common.widgets.messageOverlay.service'
    ];
    function TagMgmtScreenController(tagsManagementService, $state, $stateParams, common, $filter, $scope, $translate, $q, $log, messageOverlayService) {
        var self = this;
        var sidePanelManager, backendService;
        self.availableTags = [];
        self.title = $translate.instant("tagsManager.title");
        self.validityChanged = validityChanged;
        self.actionButtons = [];
        self.manageTagsEditorApi = {};
        self.onManageTagsEditorRegisterApi = onManageTagsEditorRegisterApi;
        self.manageTagsEditorApiRegistered = $q.defer();
        self.closeButton = {
            showClose: true,
            tooltip: $translate.instant('tagsManager.sidePanel.closeToolTip'),
            onClick: function () {
                $state.go('^');
            }
        };
        self.warningMessageVisible = false;
        self.entityinfo = {
            AppShortName: "",
            IsComposition: false,
            IsCompositionMandatory: false,
            IsSegregable: false,
            IsThirdParty: false,
            PublicModelEntityShortName: "",
            ReadingModelEntityFullName: "",
            ReferencedEntityFullName: ""
        };
        self.entityIsFrozen = false;
        self.entityIsLocked = false;
        self.entityIsMarkedForCleaning = false;
        self.entityNId = "";
        self.warningMessage = $translate.instant('tagsManager.canModifyWarning');
        activate();

        function activate() {
            init();
            registerEvents();
            setActionButtons();
            getIsComposition();
            tagsManagementService.setEntityName($stateParams['entity']);
            tagsManagementService.setAppName($stateParams['app']);

            self.originalAssignedTags = [];
            var deferreds = [];
            deferreds[deferreds.length] = tagsManagementService.getSegregationTags($stateParams["objId"], $stateParams["objIdType"]);
            deferreds[deferreds.length] = tagsManagementService.getAvailableTags();
            $q.all(deferreds).then(onGetAssignedAndAvailableTagsSuccess);
            sidePanelManager.open('p');
        }

        $scope.$on('sit-item-collection-viewer.rows-selection-changed', function (event, filterOptions) {
            var currentState = $state.current.name;
            var _id = filterOptions.selectedItemId;
            var _entity = $stateParams['entity'];
            var _app = $stateParams['app'];
            var _objIdType = $stateParams['objIdType'];
            if (_id && _entity && _app && $state.current.name.lastIndexOf('TagsMgt') >= 0) {
                $state.go(currentState, { id: _id, objIdType: _objIdType, entity: _entity, app: _app }, { reload: false });
            }
        });

        function removeAssignedToAvailabletags() {
            _.each(self.originalAssignedTags, function (value, key, list) {
                self.availableTags = _.without(self.availableTags, _.findWhere(self.availableTags, { Name: value.Name }));
            });
        }

        function onGetAssignedAndAvailableTagsSuccess(result) {
            self.originalAssignedTags = result[0].value[0].SegregationTags;
            self.entityIsFrozen = result[0].value[0].IsFrozen;
            self.entityIsLocked = result[0].value[0].IsLocked;
            self.entityIsMarkedForCleaning = result[0].value[0].ToBeCleaned;
            self.entityNId = result[0].value[0].NId ? result[0].value[0].NId : result[0].value[0].Id;
            self.availableTags = result[1].value;
            removeAssignedToAvailabletags();
        }

        function onManageTagsEditorRegisterApi(api) {
            self.manageTagsEditorApi = api;
            self.manageTagsEditorApiRegistered.resolve(api);
        }

        function init() {
            sidePanelManager = common.services.sidePanel.service;
            backendService = common.services.runtime.backendService;

            //Initialize Model Data
            // TOD: Put here the properties of the entity managed by the service
            self.currentItem = angular.copy($stateParams.selectedItem);
            self.validInputs = false;

            //Expose Model Methods
            self.save = save;
            self.cancel = cancel;
        }

        function validityChanged(validity) {
            if (!validity) {
                validity = false;
            }
            self.validInputs = validity;
            setActionButtons();
        }

        function setActionButtons() {
            self.actionButtons = [
                                {
                                    img: "fa-floppy-o",
                                    label: $translate.instant("common.saveAll"),
                                    tooltip: $translate.instant("common.saveAll"),
                                    onClick: self.save,
                                    enabled: true,
                                    visible: self.validInputs
                                },
                                {
                                    label: $translate.instant("common.cancel"),
                                    tooltip: $translate.instant("common.cancel"),
                                    onClick: self.cancel,
                                    enabled: true,
                                    visible: true
                                }
            ];
        }

        function registerEvents() {
            $scope.$on('sit-property-grid.validity-changed', onPropertyGridValidityChange);
        }

        function GetFinalTagsList(tagstoadd, tagstoremove) {
            var tags = [];
            _.each(self.originalAssignedTags, function (tag) {
                tags.push(tag.Name);
            });
            tags = tags.concat(tagstoadd);
            tags = _.without(tags, tagstoremove);
            return tags;
        }

        function save() {
            var tagstoadd = self.manageTagsEditorApi.tags.tagsNamesToAdd;
            var tagstoremove = self.manageTagsEditorApi.tags.tagsNamesToRemove;

            var tags = GetFinalTagsList(tagstoadd, tagstoremove);
            var id = $stateParams['objId'];

            var showErrorMessage = false;
            var errorMessage = $translate.instant('common.error');
            if (self.entityIsFrozen) {
                showErrorMessage = true;
                errorMessage = $translate.instant('tagsManager.cantAssignTagToFrozen', { EntityType: self.entityinfo.PublicModelEntityShortName, EntityId: self.entityNId });
            }
            else if (self.entityIsLocked) {
                showErrorMessage = true;
                errorMessage = $translate.instant('tagsManager.cantAssignTagToLocked', { EntityType: self.entityinfo.PublicModelEntityShortName, EntityId: self.entityNId });
            }
            else if (self.entityIsMarkedForCleaning) {
                showErrorMessage = true;
                errorMessage = $translate.instant('tagsManager.cantAssignTagToMarkedForCleaning', { EntityType: self.entityinfo.PublicModelEntityShortName, EntityId: self.entityNId });
            }

            if (showErrorMessage) {
                messageOverlayService.set({
                    buttons: [{
                        id: 'ok',
                        displayName: 'OK',
                        onClickCallback: function () {
                            messageOverlayService.hide();
                        }
                    }],
                    title: $translate.instant('common.error'),
                    text: errorMessage
                });
                messageOverlayService.show();
            }
            else {
              tagsManagementService.setEntityInfo(self.entityinfo);
              tagsManagementService.setSegregationTags(id, tags).then(onSaveSuccess, backendService.backendError);
            }
        }

        function cancel() {
            sidePanelManager.close();
            $state.go('^');
        }

        function onSaveSuccess(data) {
            sidePanelManager.close();
            $state.go('^', {}, { reload: true });
        }

        function onPropertyGridValidityChange(event, params) {
            self.validInputs = params.validity;
        }

        function getIsComposition() {
            var success = function (data) {
                self.warningMessageVisible = data.value[0].EntityInfo.IsComposition;
                self.entityinfo = data.value[0].EntityInfo;
            };

            var error = function (error) {
                $log.log(error);
            };

            tagsManagementService.getCompositionInfo($stateParams['app'], $stateParams['entity']).then(success, error);
        }
    }
}());

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.tagsManager').provider('siemens.simaticit.common.widgets.tagsManager.tagMgtProvider', tagMgtProvider);

    tagMgtProvider.$inject = ['$stateProvider'];
    function tagMgtProvider($stateProvider) {
        var vm = this;
        activate();

        function activate() {
            vm.$get = getService;
            vm.getService = getService;
        }

        function getService() {
            return new Service($stateProvider);
        }
    }

    function Service($stateProvider) {
        this.addState = function (icvId, currentState) {
            $stateProvider.state({
                name: currentState + '.' + icvId + 'TagsMgt',
                url: '/' + icvId + 'TagsMgt/:objId',
                views: {
                    'property-area-container@': {
                        templateUrl: 'common/widgets/tagsManager/sit-tags-manager.html',
                        controller: 'siemens.simaticit.common.widgets.tagsManager.TagMgmtScreenController',
                        controllerAs: 'vm'
                    }
                },
                data: {
                    title: 'Segregation Tags Manager'
                },
                params: {
                    objId: null,
                    objIdType: null,
                    entity: '',
                    app: ''
                }
            });
        }
    }
})();

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.tagsManager').directive('sitTagsViewer', tmTagsViewer);

    function tmTagsViewer() {
        return {
            templateUrl: 'common/widgets/tagsManager/sit-tags-viewer.directive.html',
            controller: TagsViewerController,
            restrict: 'E',
            controllerAs: 'vm',
            scope: {},
            bindToController: {
                tags: '=',
                mode: '=',
                onAdd: '&',
                onRemove: '&',
                onSelectionChanged: '&',
                onRegisterApi: '&',
                isDisabled: '='
            }
        };
    }

    TagsViewerController.$inject = ['$translate', '$scope', '$element'];
    function TagsViewerController($translate, $scope, $element) {
        var vm = this;

        (function tagElementDirectiveMethods(vm) {
            vm.onTagAdd = onTagAdd;
            vm.onTagRemove = onTagRemove;
            vm.initTagElementDirective = initTagElementDirective;
            vm.onTagSelectionChanged = onTagSelectionChanged;
            vm.trimLength = trimLength;
            function initTagElementDirective() {
                if (vm.mode === undefined) vm.mode = 'add';
            }

            function onTagAdd(tag) {
                if (vm.onAdd) vm.onAdd({ tag: tag });
                vm.showIcon = false;
            }

            function onTagRemove(tag) {
                if (vm.onRemove) vm.onRemove({ tag: tag });
                vm.showIcon = false;
            }

            function onTagSelectionChanged(tag) {
                if (vm.onSelectionChanged) vm.onSelectionChanged({ tag: tag });
            }

            //note: it has been done with js instead of css 'cause css "text-overflow: ellipsis;" causes
            //bad rendering of "before" pseudo-element (which is the arrow in the tag).
            function trimLength() {
                _.each(vm.tags, function (tag, idx) {
                    tag.ShortName = angular.copy(tag.Name);
                    if (tag.Name.length > 10) {
                        tag.ShortName = tag.ShortName.substring(0, 10) + "...";
                    }
                });
            }
        })(vm);

        (function pagerMethods(vm) {
            vm.pageChanged = pageChanged;
            vm.initPager = initPager;
            vm.getTagsForPage = getTagsForPage;

            function initPager() {
                vm.currentPage = 1;
                vm.pageSize = 10;
                vm.pagerNumberTotalItems = vm.tags.length;
                pageChanged();
            }

            function pageChanged() {
                vm.currentPageTags = getTagsForPage(vm.currentPage);
            }

            function getTagsForPage(page, tags) {
                if (tags === undefined) tags = vm.tags;
                if (page < 1) throw new Error('pageIndex should be greater equal than 1');
                var resultTags = [];
                var start = (page - 1) * vm.pageSize;
                var end = Math.min(start + vm.pageSize, tags.length);
                for (var i = start; i < end; i++) {
                    resultTags[resultTags.length] = tags[i];
                }
                return resultTags;
            }
        })(vm);

        (function filterMethods(vm) {
            vm.filterChanged = filterChanged;
            vm.initFilter = initFilter;
            vm.clearFilter = clearFilter;
            vm.quickSearchText = $translate.instant('tagsManager.inputPlaceholderText');
            vm.showIcon = false;
            vm.focus = function () {
                $element.find('#quickSearchContainer').css('border-color', '#3296b9')
            }
            vm.blur = function () {
                $element.find('#quickSearchContainer').css('border-color', '#969696')
            }

            function initFilter() {
                vm.filterOptions = vm.tags.map(function (tag) { return tag.Name; });
            }

            function filterChanged() {
                if (vm.filterValue !== undefined && vm.filterValue != null && vm.filterValue !== '') {
                    vm.showIcon = true;
                    var filteredTags = vm.tags.filter(function (tag) { return tag.Name.toLowerCase().startsWith(vm.filterValue.toLowerCase()); });
                    vm.pagerNumberTotalItems = filteredTags.length;
                    vm.currentPageTags = vm.getTagsForPage(vm.currentPage, filteredTags);
                }
                else {
                    vm.showIcon = false;
                    vm.pagerNumberTotalItems = vm.tags.length;
                    vm.pageChanged();
                }
            }

            function clearFilter() {
                vm.filterValue = '';
                vm.filterChanged();
            }
        })(vm);

        function refresh() {
            vm.currentPage = 1;
            vm.filterValue = null;
            vm.showIcon = false;
            vm.pagerNumberTotalItems = vm.tags.length;
            if (vm.isDisabled === true) {
                for (var i = 0; i < vm.tags.length; i++) vm.tags[i].disabled = true;
            }
            sortTagsByNameAscending();
            vm.pageChanged();
        }

        function sortTagsByNameAscending() {
            var sortByName = function (tag1, tag2) {
                var tag1Name = tag1.Name.toLowerCase();
                var tag2Name = tag2.Name.toLowerCase();
                // is tag1 is small
                if (tag1Name < tag2Name) {
                    return -1;
                }
                return tag1Name > tag2Name ? 1 : 0;
            };
            vm.tags.sort(sortByName);
        }

        function activate() {
            vm.svgIcons = {
                close: {
                    path: 'common/icons/cmdClosePanel24.svg'
                },
                search: {
                    path: 'common/icons/cmdSearch24.svg'
                }
            }

            sortTagsByNameAscending();
            vm.initTagElementDirective();
            vm.initPager();
            vm.initFilter();
            vm.trimLength();
            vm.api = {
                refresh: refresh
            }
            vm.onRegisterApi({ api: vm.api });
        }
        activate();
    }
})();

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.tagsManager').directive('sitTagsWarningPanel', WarningPanel);

    function WarningPanel() {
        return {
            templateUrl: 'common/widgets/tagsManager/sit-tags-warning-panel.directive.html',
            controller: WarningPanelController,
            restrict: 'E',
            controllerAs: 'vm',
            scope: {},
            bindToController: {
                visible: '=',
                message: '='
            }
        };
    }

    WarningPanelController.$inject = [];

    function WarningPanelController() {
        activate();

        function activate() {

        }
    }
})();
