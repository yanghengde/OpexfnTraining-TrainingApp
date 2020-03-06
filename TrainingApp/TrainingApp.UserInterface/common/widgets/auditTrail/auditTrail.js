/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */

(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name siemens.simaticit.common.widgets.auditTrail
     * @description
     * This module provides functionalities related to audit trail.
     */
    angular.module('siemens.simaticit.common.widgets.auditTrail', []);

})();

"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var Actions = /** @class */ (function () {
            function Actions() {
            }
            Actions.ADDED = 'Added';
            Actions.MODIFIED = 'Modified';
            Actions.REMOVED = 'Removed';
            Actions.SIGNATURE_APPROVED = 'Signature Approved';
            Actions.SIGNATURE_REJECTED = 'Signature Rejected';
            return Actions;
        }());
        var AuditTrailService = /** @class */ (function () {
            function AuditTrailService($q, $window, $filter, backendService) {
                this.$q = $q;
                this.$window = $window;
                this.$filter = $filter;
                this.backendService = backendService;
                this.enabled = null !== backendService.getAppEndPoint(AuditTrailService.APP_NAME);
            }
            AuditTrailService.prototype.isEnabled = function () {
                return this.enabled;
            };
            AuditTrailService.prototype.getFilterString = function (filter) {
                return this.processFilter(filter);
            };
            AuditTrailService.prototype.getRecords = function (query, additionalFilter) {
                var _this = this;
                if (additionalFilter === void 0) { additionalFilter = null; }
                var defer = this.$q.defer();
                if (additionalFilter) {
                    var queryString = query.options;
                    if (-1 === queryString.indexOf('$filter=')) {
                        queryString = '$filter=' + additionalFilter + '&' + queryString;
                    }
                    else {
                        queryString = queryString.replace('$filter=', '$filter=' + additionalFilter + ' and ');
                    }
                    query.options = queryString;
                }
                this.backendService.findAll(query).then(function (data) {
                    data.value.forEach(function (record) {
                        _this.processRecord(record, true);
                    });
                    defer.resolve(data);
                }, function (err) {
                    defer.reject(err);
                });
                return defer.promise;
            };
            AuditTrailService.prototype.getCompositionPartEntities = function (rootEntityId, transactionId) {
                var _this = this;
                var defer = this.$q.defer();
                var select = '$select=Id,EntityType,RootEntityId,RootEntityName,RootEntityType,ChangedEntityId,ChangedEntityName,ChangedEntityType,RootCommand,'
                    + 'Action,UserName,UpdatedOn,Environment,ComputerName,ChangedEntity,CorrelationId,Domain,Ordering,TransactionId,AssociatedRows,ElectronicSignatureId';
                var query = {
                    appName: AuditTrailService.APP_NAME,
                    entityName: AuditTrailService.ENTITY_NAME,
                    options: select + '&$filter=RootEntityId ne ChangedEntityId and RootEntityId eq ' + rootEntityId + ' and TransactionId eq ' + transactionId
                };
                this.backendService.findAll(query).then(function (data) {
                    data.value.forEach(function (record) {
                        _this.processRecord(record, false);
                    });
                    defer.resolve(data.value);
                }, function (err) {
                    defer.reject(err);
                });
                return defer.promise;
            };
            AuditTrailService.prototype.processRecord = function (record, isRootEntity) {
                var _this = this;
                if (isRootEntity === void 0) { isRootEntity = false; }
                if (record.isProcessed) {
                    return;
                }
                record.isProcessed = true;
                record.RootCommandShortName = this.getShortName(record.RootCommand);
                record.RootEntityShortType = this.getShortName(record.RootEntityType);
                record.ChangedEntityShortType = this.getShortName(record.ChangedEntityType);
                try {
                    record.RootEntityName = JSON.parse(record.RootEntityName);
                    record.ChangedEntityName = JSON.parse(record.ChangedEntityName);
                    record.ChangedEntity = JSON.parse(record.ChangedEntity);
                    //If the ChangedEntity filed is an empty array that means that it is an Electronic Signature AT Record
                    if (record.ChangedEntity.length === 0) {
                        record.RootEntityName = [];
                        record.ChangedEntityName = [];
                        record.ChangedEntity = {
                            LogicalKeyProperties: [],
                            ChangedScalarProperties: [],
                            ChangedComplexProperties: [],
                            ChangedForwardNavigationProperties: [],
                            ChangedBackwardNavigationProperties: []
                        };
                        record.isESRecord = true;
                    }
                }
                catch (ex) {
                    record.RootEntityName = [];
                    record.ChangedEntityName = [];
                    record.ChangedEntity = {
                        LogicalKeyProperties: [],
                        ChangedScalarProperties: [],
                        ChangedComplexProperties: [],
                        ChangedForwardNavigationProperties: [],
                        ChangedBackwardNavigationProperties: []
                    };
                }
                record.isRootEntity = isRootEntity;
                if (!isRootEntity) {
                    return;
                }
                record.isCompositionModified = record.ChangedEntity.ChangedBackwardNavigationProperties.some(function (navigationProperty) {
                    return navigationProperty.IsComposition;
                });
                record.isManyToMany = record.ChangedEntity.ChangedBackwardNavigationProperties.some(function (navigationProperty) {
                    return !navigationProperty.IsComposition;
                });
                record.isManyToOne = record.ChangedEntity.ChangedForwardNavigationProperties.some(function (navigationProperty) {
                    return !navigationProperty.IsComposition;
                });
                record.isMoreDetailsAvailable = false;
                record.isOnlyPartModified = false;
                if (1 < record.AssociatedRows) {
                    // In a single transation..........
                    // composition of a root entity is changed (part added or removed)
                    // or
                    // Both root and part properties changed
                    // or
                    // two or more parts of a root entity are changed
                    record.isMoreDetailsAvailable = true;
                }
                else if (record.RootEntityType !== record.ChangedEntityType) {
                    // Part properties are changed
                    // or
                    // Two root entities got married
                    record.isMoreDetailsAvailable = true;
                    record.isOnlyPartModified = !record.isManyToMany;
                }
                else {
                    // only root entity properties are modified
                    record.isMoreDetailsAvailable = false;
                    record.isOnlyPartModified = false;
                }
                record.summary = {
                    timestamp: record.UpdatedOn,
                    username: record.UserName,
                    action: record.Action.replace(/\s+/g, ''),
                    entity: record.RootEntityShortType,
                    environment: record.Environment
                };
                if (record.RootEntityName.length) {
                    var logicalKeyDetails = '';
                    record.RootEntityName.forEach(function (logicalKey) {
                        logicalKeyDetails = logicalKeyDetails + ', ' + logicalKey.Name + ': ' + logicalKey.Value;
                    });
                    record.summary.entity = record.summary.entity + ' (' + logicalKeyDetails.substr(2) + ')';
                }
                record.relationships = [];
                if (record.isManyToMany) {
                    record.ChangedEntity.ChangedBackwardNavigationProperties.forEach(function (navigationProperty) {
                        if (navigationProperty.IsComposition) {
                            return;
                        }
                        var relationship;
                        if (-1 !== navigationProperty.$type.indexOf('ChangedOneNavigationProperty')) {
                            relationship = _this.processOnePartRelationship(navigationProperty);
                        }
                        else {
                            relationship = _this.processManyPartRelationship(navigationProperty);
                        }
                        if (null === relationship) {
                            return;
                        }
                        record.relationships.push(relationship);
                    });
                }
                if (record.isManyToOne) {
                    record.ChangedEntity.ChangedForwardNavigationProperties.forEach(function (navigationProperty) {
                        if (navigationProperty.IsComposition) {
                            return;
                        }
                        var relationship;
                        if (-1 !== navigationProperty.$type.indexOf('ChangedOneNavigationProperty')) {
                            relationship = _this.processOnePartRelationship(navigationProperty);
                        }
                        else {
                            relationship = _this.processManyPartRelationship(navigationProperty);
                        }
                        if (null === relationship) {
                            return;
                        }
                        record.relationships.push(relationship);
                    });
                }
            };
            AuditTrailService.prototype.processManyPartRelationship = function (navigationProperty) {
                var logicalKeys, action;
                if (navigationProperty.Added.length) {
                    action = Actions.ADDED;
                    logicalKeys = navigationProperty.Added[0].LogicalKey;
                }
                else {
                    action = Actions.REMOVED;
                    logicalKeys = navigationProperty.Removed[0].LogicalKey;
                }
                var logicalKeyDetails = '';
                logicalKeys.forEach(function (logicalKey) {
                    logicalKeyDetails = logicalKeyDetails + ', ' + logicalKey.Name + ': ' + logicalKey.Value;
                });
                return {
                    entity: this.getShortName(navigationProperty.EntityType),
                    entityFullName: navigationProperty.EntityType,
                    logicalKey: logicalKeyDetails ? '(' + logicalKeyDetails.substr(2) + ')' : '',
                    action: action,
                    type: 'many'
                };
            };
            AuditTrailService.prototype.processOnePartRelationship = function (navigationProperty) {
                var newLogicalKeys, oldLogicalKeys, action;
                var oldId = navigationProperty.OldValue.Id;
                var newId = navigationProperty.NewValue.Id;
                if (oldId === newId) {
                    return null;
                }
                if (null === oldId && null !== newId) {
                    action = Actions.ADDED;
                    oldLogicalKeys = null;
                    newLogicalKeys = navigationProperty.NewValue.LogicalKey;
                }
                else if (null !== oldId && null === newId) {
                    action = Actions.REMOVED;
                    oldLogicalKeys = navigationProperty.OldValue.LogicalKey;
                    newLogicalKeys = null;
                }
                else {
                    action = Actions.MODIFIED;
                    oldLogicalKeys = navigationProperty.OldValue.LogicalKey;
                    newLogicalKeys = navigationProperty.NewValue.LogicalKey;
                }
                var oldLogicalKeyDetails = '', newLogicalKeyDetails = '';
                if (null !== oldLogicalKeys) {
                    oldLogicalKeys.forEach(function (logicalKey) {
                        oldLogicalKeyDetails = oldLogicalKeyDetails + ', ' + logicalKey.Name + ': ' + logicalKey.Value;
                    });
                }
                if (null !== newLogicalKeys) {
                    newLogicalKeys.forEach(function (logicalKey) {
                        newLogicalKeyDetails = newLogicalKeyDetails + ', ' + logicalKey.Name + ': ' + logicalKey.Value;
                    });
                }
                return {
                    entity: this.getShortName(navigationProperty.EntityType),
                    entityFullName: navigationProperty.EntityType,
                    oldLogicalKey: oldLogicalKeyDetails ? '(' + oldLogicalKeyDetails.substr(2) + ')' : '',
                    newLogicalKey: newLogicalKeyDetails ? '(' + newLogicalKeyDetails.substr(2) + ')' : '',
                    propertyName: navigationProperty.Name,
                    action: action,
                    type: 'one'
                };
            };
            AuditTrailService.prototype.getShortName = function (name) {
                if (!name) {
                    return '';
                }
                return name.substring(name.lastIndexOf('.') + 1);
            };
            AuditTrailService.prototype.getDate = function () {
                var date = this.$window.moment();
                date.set({
                    'millisecond': 0,
                    'second': 0,
                    'minute': 0,
                    'hour': 0
                });
                return date;
            };
            AuditTrailService.prototype.processFilter = function (filter) {
                var filterString = 'AssociatedRows ge 1';
                if (!filter) {
                    return filterString;
                }
                var keys = Object.keys(filter);
                var partNo = 2;
                for (var index = 0; index < keys.length; index++) {
                    var key = keys[index];
                    var value = filter[key];
                    if (!value) {
                        continue;
                    }
                    var part = '';
                    switch (key) {
                        case 'EntityId':
                            part = 'RootEntityId eq ' + value + '';
                            break;
                        case 'EntityFullName':
                            part = 'RootEntityType eq \'' + value + '\'';
                            break;
                        case 'UserName':
                            part = 'UserName eq \'' + value + '\'';
                            break;
                        case 'Action':
                            part = 'Action eq \'' + value + '\'';
                            break;
                        case 'RootCommand':
                            part = 'RootCommand eq \'' + value + '\'';
                            break;
                        case 'Timestamp':
                            if (Object.keys(value).length) {
                                var now = this.getDate();
                                var prev = this.getDate().subtract(value);
                                part = '(UpdatedOn ge ' + prev.toISOString() + ' and UpdatedOn lt ' + now.toISOString() + ')';
                            }
                            break;
                        default:
                            break;
                    }
                    if ('' === part) {
                        continue;
                    }
                    filterString = filterString + (1 < partNo ? ' and ' : '') + part;
                    partNo = partNo + 1;
                }
                return filterString;
            };
            AuditTrailService.prototype.getElectronicSignature = function (electronicSignatureId) {
                var _this = this;
                var defer = this.$q.defer();
                var query = {
                    appName: AuditTrailService.APP_NAME,
                    entityName: AuditTrailService.ES_ENTITY_NAME,
                    options: '$select= Signer, Status, TimeStamp,Comment,Reason &$filter=Id eq ' + electronicSignatureId
                };
                this.backendService.findAll(query).then(function (data) {
                    var esDetails = [
                        {
                            Name: 'Signer',
                            Value: data.value[0].Signer.Name
                        },
                        {
                            Name: 'Reason',
                            Value: data.value[0].Reason
                        },
                        {
                            Name: 'TimeStamp',
                            Value: _this.$filter('date')(new Date(data.value[0].TimeStamp), 'MMM d, y h:mm:ss a')
                        },
                        {
                            Name: 'Status',
                            Value: data.value[0].Status
                        },
                        {
                            Name: 'Comment',
                            Value: data.value[0].Comment
                        }
                    ];
                    defer.resolve(esDetails);
                }, function (err) {
                    defer.reject(err);
                });
                return defer.promise;
            };
            AuditTrailService.APP_NAME = 'AuditTrail';
            AuditTrailService.ENTITY_NAME = 'AuditTrailRecord';
            AuditTrailService.ES_ENTITY_NAME = "SignatureInstance";
            AuditTrailService.$inject = [
                '$q',
                '$window',
                '$filter',
                'common.services.runtime.backendService'
            ];
            return AuditTrailService;
        }());
        framework.AuditTrailService = AuditTrailService;
        angular.module('siemens.simaticit.common.widgets.auditTrail').service('common.widgets.auditTrail.service', AuditTrailService);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=audit-trail-svc.js.map
(function () {
    'use strict';
    angular.module('siemens.simaticit.common.widgets.auditTrail').directive('sitAtCompositionDetails', DirectiveDefinition);

    DirectiveDefinition.$inject = [];
    function DirectiveDefinition() {
        return {
            scope: {},
            bindToController: {
                data: '=sitData'
            },
            controller: DirectiveController,
            controllerAs: 'vm',
            templateUrl: 'common/widgets/auditTrail/sit-at-composition-details.html'
        };
    }

    DirectiveController.$inject = ['common.widgets.auditTrail.service'];
    function DirectiveController(auditTrailService) {
        var vm = this;
        activate();

        function activate() {
            vm.ready = false;
            exposeApi();
            loadCompositionDetails();
        }

        function exposeApi() {

        }

        function initCompositionDetails() {
            vm.parts = {};
            vm.currentPart = null;
            vm.currentPartConfig = {};
            vm.accordion = {
                config: {
                    icon: 'fa-plus',
                    openIcon: 'fa-minus',
                    onClickCallback: showPartDetails,
                    loadPartEntities: loadPartEntities,
                    showPartDetails: showPartDetails
                },
                data: []
            };
        }

        function loadCompositionDetails() {
            initCompositionDetails();
            if (1 === vm.data.AssociatedRows && vm.data.isOnlyPartModified) {
                processPartEntities(null, vm.accordion.data, [vm.data]);
                vm.ready = true;
                return;
            }
            auditTrailService.getCompositionPartEntities(vm.data.RootEntityId, vm.data.TransactionId).then(function (parts) {
                processPartEntities(null, vm.accordion.data, parts);
                vm.ready = true;
            }, function (err) {

            });
        }

        function loadPartEntities(accordionItem) {
            var part = accordionItem.data;

            // child parts are loaded and available, triggered only child parts exist
            if (null !== part.parts && 0 < part.parts.length) {
                accordionItem.opened = !accordionItem.opened;
                return;
            }

            // child parts are not loaded. requesting server to load
            auditTrailService.getCompositionPartEntities(part.ChangedEntityId, part.TransactionId).then(function (parts) {
                part.parts = parts;
                if (!parts.length) {
                    return;
                }
                accordionItem.items = [];
                processPartEntities(part, accordionItem.items, part.parts);
                accordionItem.opened = true;
            }, function (err) {

            });
        }

        function showPartDetails(accordionItem) {
            if (!accordionItem.selected) {
                vm.currentPart = null;
                return;
            }
            vm.currentPart = accordionItem.data;
            if (vm.currentPartConfig && vm.currentPartConfig.refresh) {
                vm.currentPartConfig.refresh();
            }
        }

        function processPartEntities(parent, container, parts) {
            parts.forEach(function (part) {
                // This property says, whether child parts status.
                // null: not loaded
                // array with length zero: loaded and empty
                // array with one or more: loaded and exist
                part.parts = null;
                var action = part.Action.replace(/\s+/g, '');
                var accordionItem = {
                    data: part,
                    id: 'part_' + part.Id,
                    label: part.ChangedEntityShortType + ' has been ' + action,
                    opened: false,
                    selected: false,
                    action: action
                };
                container.push(accordionItem);
                vm.parts[accordionItem.id] = accordionItem;
            });
        }
    }
})();

(function () {
    'use strict';
    angular.module('siemens.simaticit.common.widgets.auditTrail').directive('sitAtPartsTree', DirectiveDefinition);

    DirectiveDefinition.$inject = [];
    function DirectiveDefinition() {
        return {
            scope: {},
            bindToController: {
                data: '=sitData',
                config: '=sitConfig'
            },
            controller: DirectiveController,
            controllerAs: 'vm',
            templateUrl: 'common/widgets/auditTrail/sit-at-parts-tree.html'
        };
    }

    DirectiveController.$inject = [];
    function DirectiveController() {
        var vm = this;
        var selectedItem;

        activate();

        function activate() {
            selectedItem = null;
            exposeApi();
        }

        function exposeApi() {
            vm.onSelectedChanged = onSelectedChanged;
        }

        function onSelectedChanged(menuItem) {
            menuItem.selected = !menuItem.selected;
            if (null === selectedItem) {
                selectedItem = menuItem;
                vm.config.showPartDetails(menuItem);
                return;
            }
            selectedItem.selected = false;
            if (menuItem.id === selectedItem.id) {
                selectedItem = null;
                vm.config.showPartDetails(menuItem);
                return;
            }
            selectedItem = menuItem;
            vm.config.showPartDetails(menuItem);
        }
    }
})();

(function () {
    'use strict';
    angular.module('siemens.simaticit.common.widgets.auditTrail').directive('sitAtRecordDetails', DirectiveDefinition);

    DirectiveDefinition.$inject = [];
    function DirectiveDefinition() {
        return {
            scope: {},
            bindToController: {
                record: '=sitData',
                config: '=sitConfig'
            },
            controller: DirectiveController,
            controllerAs: 'vm',
            templateUrl: 'common/widgets/auditTrail/sit-at-record-details.html'
        };
    }

    DirectiveController.$inject = ['common.widgets.auditTrail.service'];
    function DirectiveController(auditTrailService) {
        var vm = this;
        activate();

        function activate() {
            exposeApi();
            loadElectronicSignatureDetails();
            if (vm.config) {
                vm.config.refresh = loadElectronicSignatureDetails;
            }
        }

        function exposeApi() {
        }

        function loadElectronicSignatureDetails() {
            if (vm.record.ElectronicSignatureId && !vm.record.ElectronicSignatureDetails) {
                auditTrailService.getElectronicSignature(vm.record.ElectronicSignatureId).then(function (data) {
                    vm.record.ElectronicSignatureDetails = data;
                }, function (err) {

                });
            }
        }
    }
})();

(function () {
    'use strict';
    angular.module('siemens.simaticit.common.widgets.auditTrail').directive('sitAtViewer', DirectiveDefinition);

    DirectiveDefinition.$inject = [];
    /**
    * @ngdoc directive
    * @name sitAtViewer
    * @module siemens.simaticit.common.widgets.auditTrail
    * @description
    * The AT Record Viewer widget can be used to display audit trail record in a grid.
    *
    * @usage
    * As an element:
    * ```
    *     <sit-at-record-viewer
            sit-filter="vm.filter"
            sit-start-empty="true"
            sit-config="vm.config"></sit-at-record-viewer >
    * ```
    * @restrict E
    *
    * @param {String} [sit-filter=undefined] _(Optional)_ See {@link AtFilterConfig}.
    * @param {Boolean} [sit-start-empty=false] _(Optional)_ If set to true, data will not be loaded immediately when the control is rendered and
    * it must be loaded explicitly via the {@link AtViewerConfig#loadData} method.
    * @param {AtConfig} sit-config See {@link AtViewerConfig}.
    *
    */
    function DirectiveDefinition() {
        return {
            scope: {},
            bindToController: {
                filter: '=sitFilter',
                startEmpty: '=sitStartEmpty',
                config: '=sitConfig'
            },
            controller: DirectiveController,
            controllerAs: 'vm',
            templateUrl: 'common/widgets/auditTrail/sit-at-viewer.html'
        };
    }

    DirectiveController.$inject = [
        '$translate',
        'common.widgets.globalDialog.service',
        'common.widgets.auditTrail.service'
    ];
    function DirectiveController($translate, globalDialogService, auditTrailService) {
        var vm = this;
        var filterString;

        activate();

        function activate() {
            validateInputParams();
            init();
            initTable();
            exposeApi();

            if (vm.startEmpty) {
                return;
            }
            loadData();
            setColumnConfig();
        }

        function init() {
            vm.ready = false;
            filterString = null;
            vm.showColumn = true;
            vm.isEnabled = auditTrailService.isEnabled();
            vm.filterbyGUID = filterbyGUID;
        }

        /**
        * @ngdoc type
        * @name AtFilterConfig
        * @module siemens.simaticit.common.widgets.auditTrail
        * @description An object containing the filter criteria for the {@link sitAtViewer} widget.
        * @property {String} [EntityId=''] The Id of an entity instance.
        * @property {String} [EntityFullName=''] The name of an entity.
        * @property {String} [UserName=''] The username of a user that performed operations under audit trail.
        * @property {String} [Action=''] One of the following action identifiers: **Added**, **Modified**, **Deleted**.
        * @property {String} [RootCommand=''] The full name of a command.
        * @property {String} [timestamp={}] An object containing the following properties:
        *    * **days**: Number of days.
        *    * **months**: Number of months.
        *    * **years**: Number of years.
        *
        * For example, setting this to `{months: 3}` will filter only audit trail records created within the last 3 months.
        *
        */
        /**
        * @ngdoc type
        * @name AtViewerConfig
        * @module siemens.simaticit.common.widgets.auditTrail
        * @description An object containing the configuration settings for the {@link sitAtViewer} widget.
        * @property {Boolean} [enableColumnResizing=true] See {@link TableConfig}.
        * @property {Number} [pageSizeDefault=10] See {@link TableConfig}.
        * @property {Number[]} [pageSizes] See {@link TableConfig}.
        * @property {String|Function} [uniqueId=Id] See {@link TableConfig}.
        * @property {Function} onInit See the **onInitCallback** property of {@link TableConfig}.
        * @property {Function} onPageChange See the **onPageChangeCallback** property of {@link TableConfig}.
        * @property {Function} onSortChange See the **onSortChangeCallback** property of the {@link TableConfig} widget.
        */
        function validateInputParams() {
            vm.filter = vm.filter || {};

            vm.startEmpty = vm.startEmpty || false;
            vm.config = vm.config || {};

            vm.config.uniqueID = vm.config.uniqueID || 'Id';
            vm.config.enableColumnResizing = vm.config.enableColumnResizing || true;
            vm.config.pageSizeDefault = vm.config.pageSizeDefault || 10;
            vm.config.pageSizes = vm.config.pageSizes || [10, 25, 50, 100, 250];

            vm.config.onInit = vm.config.onInit || null;
            vm.config.onPageChange = vm.config.onPageChange || null;
            vm.config.onSortChange = vm.config.onSortChange || null;
        }

        function exposeApi() {
            /**
             * @ngdoc method
             * @module siemens.simaticit.common.widgets.auditTrail
             * @name AtViewerConfig#loadData
             *
             * @description
             * Loads the AT records in the grid. This method must be called if the **sit-start-empty** attribute of the {@link sitAtViewer} widget was set to **true**.
             *
             */
            vm.config.loadData = loadData;
            /**
            * @ngdoc method
            * @module siemens.simaticit.common.widgets.auditTrail
            * @name AtViewerConfig#refreshData
            *
            * @description
            * Refreshes the AT Viewer. This method must be called if data is changed after the grid is rendered.
            *
            */
            vm.config.refreshData = refreshData;

            vm.refreshData = refreshData;
            vm.showMoreDetails = showMoreDetails;
        }

        function initTable() {
            vm.tableConfig = {
                enableColumnResizing: vm.config.enableColumnResizing,
                pageSizes: vm.config.pageSizes,
                pageSizeDefault: vm.config.pageSizeDefault,
                uniqueID: vm.config.uniqueID,
                selectionMode: 'none',
                fields: {
                    RootEntityId: {
                        sorting: true,
                        grouping: true,
                        quicksearch: false,
                        displayName: $translate.instant('auditTrail.viewer.headers.RootEntityId'),
                        filtering: {
                            type: 'guid',
                            default: false,
                            validation: {
                                required: false
                            }
                        }
                    },
                    RootEntityType: {
                        sorting: true,
                        grouping: false,
                        quicksearch: false,
                        displayName: $translate.instant('auditTrail.viewer.headers.RootEntityType'),
                        filtering: {
                            type: 'string',
                            default: false,
                            validation: {
                                required: false
                            },
                         allowedCompareOperators: ['contains','endsWith','isnull','isnotnull']
                        }
                    },
                    Action: {
                        sorting: true,
                        grouping: true,
                        quicksearch: false,
                        displayName: $translate.instant('auditTrail.viewer.headers.Action'),
                        filtering: {
                            type: 'string',
                            default: false,
                            validation: {
                                required: false
                            }
                        }
                    },
                    UserName: {
                        sorting: true,
                        grouping: true,
                        quicksearch: false,
                        displayName: $translate.instant('auditTrail.viewer.headers.UserName'),
                        filtering: {
                            type: 'string',
                            default: false,
                            validation: {
                                required: false
                            }
                        }
                    },
                    UpdatedOn: {
                        sorting: true,
                        grouping: true,
                        quicksearch: false,
                        displayName: $translate.instant('auditTrail.viewer.headers.UpdatedOn'),
                        filtering: {
                            type: 'date',
                            default: false,
                            validation: {
                                required: false
                            },
                            widget: 'sit-date-time-picker'
                        }
                    },
                    RootCommand: {
                        sorting: true,
                        grouping: true,
                        quicksearch: false,
                        displayName: $translate.instant('auditTrail.viewer.headers.RootCommand'),
                        filtering: {
                            type: 'string',
                            default: false,
                            validation: {
                                required: false
                            }
                        }
                    },
                    Environment: {
                        sorting: true,
                        grouping: true,
                        quicksearch: false,
                        displayName: $translate.instant('auditTrail.viewer.headers.Environment')
                    },
                    Domain: {
                        sorting: false,
                        grouping: false,
                        quicksearch: false,
                        displayName: $translate.instant('auditTrail.viewer.headers.Domain')
                    },
                    ExecutionInstance: {
                        sorting: false,
                        grouping: false,
                        quicksearch: false,
                        displayName: $translate.instant('auditTrail.viewer.headers.ExecutionInstance')
                    }
                },
                dataSource: {
                    dataService: { findAll: findAll },
                    dataEntity: 'AuditTrailRecord',
                    appName: 'AuditTrail',
                    optionsString: '$select=Id,EntityType,RootEntityId,RootEntityName,RootEntityType,ChangedEntityId,ChangedEntityName,ChangedEntityType,'
                        + 'RootCommand,Action,UserName,UpdatedOn,Environment,ComputerName,ChangedEntity,CorrelationId,Domain,'
                        + 'Ordering,TransactionId,AssociatedRows,ElectronicSignatureId'
                },
                onInitCallback: onTableInit,
                onPageChangeCallback: onPageChange,
                onSortChangeCallback: onSortChange,
                onSelectionChangeCallback: onSelectionChange
            };
        }

        function onTableInit(config) {
            var tableSettings = config.getSettings();
            tableSettings.sort = {
                predicate: 'UpdatedOn',
                reverse: true
            };
            if (!vm.config.onInit) {
                return;
            }
            vm.config.onInit.call(null, config);
        }

        function onPageChange(page) {
            if (!vm.config.onPageChange) {
                return;
            }
            vm.config.onPageChange.call(null, page);
        }

        function onSortChange(fieldName, reverse) {
            if (!vm.config.onSortChange) {
                return;
            }
            vm.config.onSortChange.call(null, fieldName, reverse);
        }

        function onSelectionChange(selectedItems, itemChanged) {
            if (!vm.config.onSelectionChange) {
                return;
            }
            vm.config.onSelectionChange.call(null, selectedItems, itemChanged);
        }

        function loadData() {
            if (vm.ready) {
                return;
            }
            if (!vm.isEnabled) {
                vm.ready = true;
                return;
            }
            setFilterString();
            setFilterConfiguration();
            vm.ready = true;
        }

        function refreshData() {
            // Still loadData is not called
            if (!vm.ready) {
                return;
            }
            // Table is still rendering
            if (!vm.tableConfig.refreshData) {
                return;
            }
            setFilterString();
            vm.tableConfig.refreshData();
        }

        function showMoreDetails(record) {
            globalDialogService.set({
                title: $translate.instant('auditTrail.composition.title'),
                templatedata: record,
                templateuri: 'sit-at-composition-viewer.html',
                buttons: [{
                    id: 'at_btn_ok',
                    displayName: $translate.instant('common.ok'),
                    onClickCallback: closeDetails
                }]
            });
            globalDialogService.show();
        }

        function closeDetails() {
            globalDialogService.hide();
        }

        function findAll(query) {
            return auditTrailService.getRecords(query, filterString);
        }

        function setFilterString() {
            filterString = auditTrailService.getFilterString(vm.filter);
        }

        function setFilterConfiguration() {
            var keys = Object.keys(vm.filter);
            for (var index = 0; index < keys.length; index++) {
                var key = keys[index];
                var value = vm.filter[key];
                if (!value) {
                    continue;
                }
                var fieldName = null;
                switch (key) {
                    case 'EntityId':
                        fieldName = 'RootEntityId';
                        break;
                    case 'EntityFullName':
                        fieldName = 'RootEntityType';
                        break;
                    case 'UserName':
                        fieldName = 'UserName';
                        break;
                    case 'Action':
                        fieldName = 'Action';
                        break;
                    case 'RootCommand':
                        fieldName = 'RootCommand';
                        break;
                    case 'Timestamp':
                        if (Object.keys(value).length) {
                            fieldName = 'UpdatedOn';
                        }
                        break;
                    default:
                        break;
                }
                if (null === fieldName) {
                    continue;
                }
                vm.tableConfig.fields[fieldName].sorting = false;
                delete vm.tableConfig.fields[fieldName].filtering;
            }
        }

        function setColumnConfig() {
            if (vm.filter.EntityId) {
                vm.showColumn = false;
            }
        }

        function filterbyGUID(id) {
            var filterClause = null;
            var settings = $.extend({}, vm.tableConfig.getSettings());

            // is filter object exist
            if (!settings.hasOwnProperty('filter')) {
                // no filter object exist
                settings.filter = {
                    predicateObject: []
                };
            } else if (!settings.filter.hasOwnProperty('predicateObject')) {
                // no predicateObject exist
                settings.filter.predicateObject = [];
            } else {
                // predicateObject exist
                // is there any filter clause exist with same condition
                filterClause = _.find(settings.filter.predicateObject, function (clause) {
                    return 'RootEntityId' === clause.filterField.field && id === clause.value && '=' === clause.operator;
                });
                // if yes, then return
                if (undefined !== filterClause) {
                    return;
                }
            }

            // No filter clauses exist
            // or One filter clause exist with different value or same value with not equal operator
            // or multiple filter clauses exist
            // then add a new clause
            filterClause = {
                filterField: {
                    type: 'GUID',
                    'default': false,
                    validation: {},
                    field: 'RootEntityId'
                },
                andOr: 'and',
                operator: '=',
                matchCase: false,
                validation: {
                    required: false
                },
                showValueField: false,
                value: id,
                widget: 'sit-text'
            };
            settings.filter.predicateObject.push(filterClause);
            vm.tableConfig.applySettings(settings);
            vm.tableConfig.refreshData();
        }
    }
})();
