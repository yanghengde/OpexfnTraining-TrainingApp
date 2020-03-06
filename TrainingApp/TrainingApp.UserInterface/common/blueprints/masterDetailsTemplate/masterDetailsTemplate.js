/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    var ctrl = 'common.layout.modelDriven.template.MDCtrl';
    angular.module('siemens.simaticit.common.services.modelDriven')
        /**
          * @ngdoc controller
          * @name common.layout.modelDriven.template.MDCtrl
          * @module siemens.simaticit.common.services.modelDriven
          * @access public
          * @description
          * The controller for the MD master/details template
          *
          */
        .controller(ctrl, ['$state', '$rootScope', '$translate', 'common.base', '$q', '$timeout', 'common.services.modelDriven.service',
            'common.services.modelDriven.runtimeService', '$stateParams', 'common.services.modelDriven.contextService',
            'common.services.swac.SwacUiModuleManager', function ($state, $rootScope, $translate, base, $q, $timeout, md, mdrt, $stateParams,
                mdContextSrv, swacMgr) {
                var self = this, detailName = "", stateId = $state.$current.toString();
                self.isInitComplete = false;
                self.activeContentId = null;
                var isDetailToBeSelected = false;
                var useScreenTitle = false;
                self.isDrillDownState = $stateParams.isDrillDownState;
                var masterSelectedItem = null;
                self.stateInfo = null;
                self.propertiesLoaded = true;
                //reset sidepanel state
                mdContextSrv.setPropertyPanelState(false, null);
                md.loadModule(stateId).then(function (manifest) {
               /* md.getManifest().then(function (manifest) {*/ // Assuming manifest has already been retrieved.
                    var screen = manifest.states.filter(function (s) { return s.id === stateId; })[0], masterName = "";
                    self.groupDetails = md.getCurrentModuleInfo(screen.id).groupDetails || [];
                    self.groupDetails.forEach(function (group) {
                        if (group.heading) {
                            group.name = $translate.instant(group.heading);
                        }
                    });
                    self.mdView = { "params": {} };
                    self.screenTitle = $translate.instant(screen.header) || screen.title;
                    if (swacMgr.enabled) {
                        swacMgr.contextServicePromise.promise.then(function (service) {
                            service.updateCtx('location.titles', { headerTitle: self.screenTitle });
                        });
                    }
                    //Layout standard behaviours:
                    // When a detail tab is activated the command bar is refreshed
                    // When a detail tab is activated the 'activeContent' context is changed to the active
                    self.setActiveTabIndex = function (content) {
                        self.ready = false;
                        if (content) {
                            self.mdViewCtrl.setActiveContent(content);
                            self.mdViewCtrl.commandBars[0].refresh();
                            self.activeContentId = content;

                            //managing sidepanel visibility on tab switch
                            ensureSidepanelVisibility();
                            if (self.mdView.contents[content].multiplicity === "one") {
                                $timeout(function () {
                                    self.ready = true;
                                });
                            }
                        }
                    };
                    function loadProperties() {
                        $timeout(function () {
                            self.propertiesLoaded = true;
                        },50);
                    }
                    function ensureSidepanelVisibility() {
                        var sidepanelState = mdContextSrv.getPropertyPanelState();
                        var isSidepanelToBeShown = evalSidepanelVisibility(sidepanelState);
                        if (sidepanelState.isSidepanelOpen && !isSidepanelToBeShown) {
                            mdContextSrv.setPropertyPanelState(false, null);
                            $state.go('^');
                        }
                    }

                    function evalSidepanelVisibility(sidepanelState) {
                        if (!sidepanelState.show) {
                            return true;
                        }
                        if (sidepanelState.show.expression) {
                            return mdContextSrv.parseWithStateCtx(sidepanelState.show.expression);
                        }
                        else if (sidepanelState.show.body) {
                            var evaluation = mdContextSrv.evalFunctionWithStateCtx(sidepanelState.show.body);
                            if (typeof evaluation === "object" && evaluation !== null && typeof evaluation.then === "function") {
                                evaluation.then(function (outcome) {
                                    return outcome;
                                });
                            }
                            else {
                                return evaluation;
                            }
                        }
                    }

                    self.mdViewCtrl = new mdrt.ModelViewCtrl(screen, self.mdView, $stateParams);
                    //Reoder contents to simplify layout management
                    self.newObj = {
                        details: [], //array with table details only
                        actions: self.mdViewCtrl.commandBars[0], //commandBar conf
                        activeContent: ""
                    };
                    //Create newObj.master, newObj.overview and newObj.details[] objects
                    for (detailName in self.mdView.contents) {
                        if (self.mdView.contents[detailName].master) {
                            if (self.mdView.contents[detailName].multiplicity === "many") {
                                self.newObj.master = self.mdView.contents[detailName];
                            }
                        }
                        else {
                            self.newObj.details.push(self.mdView.contents[detailName]);
                        }
                    }
                    // set first detail content as active
                    self.newObj.details[0].isActive = true;
                    masterName = self.newObj.master.id;

                    function updateParams(params) {
                        if (!params) {
                            return;
                        }
                        $stateParams = angular.copy($stateParams);
                        Object.getOwnPropertyNames(params).forEach(function (name) {
                            $stateParams[name] = params[name];
                        });
                        self.isDrillDownState = $stateParams.isDrillDownState;
                    }

                    function getBreadcrumbField(stateId) {
                        var field = '';
                        var currentScreen = manifest.states.filter(function (s) { return s.id === stateId; })[0];
                        if (!currentScreen) {
                            return field;
                        }
                        if (!currentScreen.contents) {
                            return field;
                        }
                        for (var name in currentScreen.contents) {
                            var content = currentScreen.contents[name];
                            if (content && content.master && content.blueprintSettings) {
                                field = content.blueprintSettings.breadcrumbTitle || '';
                                useScreenTitle = content.blueprintSettings.useScreenTitleInBreadcrumb;
                            }
                        }
                        return field;
                    }

                    //save the state info for drill down
                    self.stateInfo = self.mdViewCtrl.getStateInfo(stateId);
                    //check Recursive behavior
                    self.stateInfo = self.mdViewCtrl.getRecursiveStateInfo(self.stateInfo, stateId);
                    if (self.stateInfo && self.stateInfo.master) {
                        self.mdView.params[masterName] = self.stateInfo.master.id;
                        isDetailToBeSelected = true;
                        updateParams(self.stateInfo.master.params);
                    }

                    function updateRecursiveInfo(breadcrumbItem) {
                        var masterId = breadcrumbItem.masterId;
                        var stateInfo = self.mdViewCtrl.getStateInfo(stateId);
                        if (stateInfo && stateInfo.master && masterId) {
                            stateInfo.master.recursiveId = masterId;
                        }
                        if (breadcrumbItem.itemIndex === 0) {
                            delete stateInfo.master.recursiveId;
                        }
                        self.mdViewCtrl.setStateInfo(stateId, stateInfo.master, stateInfo.detail);
                    }

                    if (self.isDrillDownState) {
                        self.mdViewCtrl.initBreadcrumb();
                        self.breadcrumbOptions = {
                            onClick: function (item) {
                                if (item.name === stateId) {
                                    updateRecursiveInfo(item);
                                }
                                self.mdViewCtrl.updateBreadCrumb(item);
                                var params = self.mdViewCtrl.getParams(item.name);
                                params.isNavigatedFromBreadcrumb = true;
                                $state.go(item.name, params, { reload: true });
                            }
                        }
                    }

                    //Build Master details standard behaviors
                    self.onMasterDataSelection = function () {
                        self.propertiesLoaded = false;
                        var refreshPromise = [];

                        //select the active detail content after drill-down
                        if (self.stateInfo && self.stateInfo.detail && self.stateInfo.detail.content && isDetailToBeSelected) {
                            self.mdView.params[self.stateInfo.detail.content] = self.stateInfo.detail.value;
                        }
                        self.newObj.details.forEach(function (content, index) {
                            if (content.multiplicity === 'many' && content.blueprintSettings && content.blueprintSettings.serverSidePagination) {
                                var dataArtifact = self.mdViewCtrl.getContentDataArtifact(content);
                                self.newObj.details[index].runtimeConf.serverDataOptions = {
                                    dataService: self.mdViewCtrl[content.id],
                                    dataEntity: dataArtifact,
                                    appName: screen.appName
                                };
                                var query = self.mdViewCtrl.interpolateQuery(content.query);
                                self.newObj.details[index].runtimeConf.serverDataOptions.optionsString = query;
                                self.mdViewCtrl[content.id].refresh();
                            }
                            else {
                                refreshPromise.push(self.mdViewCtrl[content.id].refresh());
                            }
                        });
                        return refreshPromise;
                    };
                    self.onMasterDataUnselection = function () {
                        self.propertiesLoaded = false;
                        self.newObj.details.forEach(function (content, index) {
                            if (self.newObj.details[index].runtimeConf.serverDataOptions) {
                                delete self.newObj.details[index].runtimeConf.serverDataOptions;
                            }
                            self.mdViewCtrl[content.id].clear(); //clear is synch and do not provide promises
                        });
                        self.mdView.params = {};
                        masterSelectedItem = null;
                        var eventParams = {
                            'event': 'onMasterUnselection',
                            'data': null
                        }
                        $rootScope.$broadcast('mdui-context-refreshed', eventParams);
                    };
                    //Build master conf context
                    if (self.mdViewCtrl[masterName]) {
                        //master content select/deselect callback
                        self.mdViewCtrl[masterName].onContentSelection = function (items, item) {
                            var refreshPromises = [];
                            if (item && item.selected === true) {
                                if (!isDetailToBeSelected) {
                                    self.mdView.params = {};
                                }
                                masterSelectedItem = item;
                                if (!self.isDrillDownState && isDetailToBeSelected) {
                                    self.mdViewCtrl.setStateInfo(stateId, null, null);
                                }
                                refreshPromises = self.onMasterDataSelection();
                                var eventParams = {
                                    'event': 'onMasterSelection',
                                    'data': item
                                }
                                $rootScope.$broadcast('mdui-context-refreshed', eventParams);
                            } else if (item !== null) {
                                self.onMasterDataUnselection();
                            }
                            self.mdViewCtrl.evalDisableTabs(self.newObj.details, self.mdView);
                            $q.all(refreshPromises).then(function () {// command refresh on contents refresh completed
                                //select the active detail content after drill-down
                                if (self.stateInfo && self.stateInfo.detail && self.stateInfo.detail.content && isDetailToBeSelected) {
                                    selectActiveTab(self.stateInfo.detail.content);
                                    isDetailToBeSelected = false;
                                }
                                self.mdViewCtrl.commandBars[0].refresh();
                                loadProperties();
                            });
                        };
                    }

                    function getContentInfo(item, breadcrumbField, stateParams) {
                        var contentInfo = {};
                        if (!item) {
                            return contentInfo;
                        }
                        contentInfo = {
                            id: item.Id,
                            title: window.$UIF.Object.safeGet(item, breadcrumbField),
                            field: breadcrumbField,
                            useScreenTitle: useScreenTitle,
                            params: stateParams
                        };
                        return contentInfo;
                    }

                    function checkRecursiveBehavior(destScreenId, destScreenMasterInfo) {
                        var isRecursive = false;
                        if (!destScreenId || !destScreenMasterInfo) {
                            return isRecursive;
                        }
                        if (destScreenId !== stateId) {
                            return isRecursive;
                        }
                        var existingMasterInfo = self.mdViewCtrl.getStateInfo(destScreenId);
                        if (!existingMasterInfo) {
                            return isRecursive;
                        }
                        //store the recursive item info to select
                        isRecursive = true;
                        existingMasterInfo.master.recursiveId = destScreenMasterInfo.id;
                        self.mdViewCtrl.setStateInfo(stateId, existingMasterInfo.master, existingMasterInfo.detail);
                        //form the unique state name to store in context
                        var uniqueDestScreen = stateId + '_' + destScreenMasterInfo.id;
                        self.mdViewCtrl.setStateInfo(uniqueDestScreen, destScreenMasterInfo, null);
                        return isRecursive;
                    }

                    function setMasterInfo(destScreen, masterInfo, detailInfo) {
                        var destScreenId = 'home.' + destScreen;
                        var currentScreenId = stateId;
                        var currentStateInfo = self.mdViewCtrl.getStateInfo(stateId);
                        if (!currentStateInfo) {
                            self.mdViewCtrl.setStateInfo(stateId, masterInfo, detailInfo);
                            return;
                        }
                        var breadcrumbChain = self.mdViewCtrl.getBreadcrumbChain();
                        if (destScreenId === stateId && self.stateInfo && self.stateInfo.master && breadcrumbChain.length > 0) {
                            currentScreenId = stateId + '_' + self.stateInfo.master.id;
                        }
                        self.mdViewCtrl.setStateInfo(currentScreenId, masterInfo, detailInfo);
                    }

                    function setBreadCrumbChain(destScreen) {
                        var destScreenId = 'home.' + destScreen;
                        var srcMasterId;
                        var breadcrumbChain = self.mdViewCtrl.getBreadcrumbChain() || [];
                        if (stateId === destScreenId && breadcrumbChain.length > 0) {
                            srcMasterId = self.stateInfo.master.id;
                        }
                        self.mdViewCtrl.setBreadCrumbChain(destScreen, srcMasterId);
                    }

                    self.newObj.details.forEach(function (detail) {
                        //detaisl content select/deselect callback

                        if ('auditTrail' !== detail.multiplicity) {
                            self.mdViewCtrl[detail.id].onContentSelection = function (items, item) {
                                self.mdViewCtrl.commandBars[0].refresh();
                            };
                            self.mdViewCtrl[detail.id].onOpenClick = function (item, destScreen, drillDownParams) {

                                if (item && item.Id) {
                                    if (masterSelectedItem) {
                                        var detailInfo = {
                                            "content": detail.id, "value": item.Id
                                        }
                                        //set current state info
                                        var breadcrumbField = getBreadcrumbField(stateId);
                                        var masterInfo = getContentInfo(masterSelectedItem, breadcrumbField, $stateParams);
                                        setMasterInfo(destScreen, masterInfo, detailInfo);
                                    }
                                    drillDownParams['isDrillDownState'] = true;
                                    //set destination state info
                                    var destScreenId = 'home' + '.' + destScreen;
                                    breadcrumbField = getBreadcrumbField(destScreenId);
                                    var destScreenMasterInfo = getContentInfo(item, breadcrumbField, drillDownParams);
                                    var isRecursive = checkRecursiveBehavior(destScreenId, destScreenMasterInfo);
                                    if (!isRecursive) {
                                        self.mdViewCtrl.setStateInfo(destScreenId, destScreenMasterInfo, null);
                                    }
                                }
                                setBreadCrumbChain(destScreen);
                                $state.go(destScreenId, drillDownParams);
                                self.mdViewCtrl.commandBars[0].refresh();
                            };

                        }
                    });
                    // Initialization function
                    if (self.mdViewCtrl[masterName]) {
                        self.mdViewCtrl.evalDisableTabs(self.newObj.details, self.mdView);
                        self.mdViewCtrl.commandBars[0].refresh();
                        var masterRefreshPromise = self.mdViewCtrl[masterName].refresh(true);
                        $q.all(masterRefreshPromise).then(function () {// command refresh on contents refresh completed
                            self.mdViewCtrl.commandBars[0].refresh();
                        });
                    }

                    function selectActiveTab(content) {
                        self.newObj.details.forEach(function (detail) {
                            if (detail.id === content) {
                                detail.isActive = true;
                                self.setActiveTabIndex(content);
                            }
                        });
                    }

                    $rootScope.$on('mdui-context-updated', function () {
                        self.mdViewCtrl.commandBars[0].refresh();
                    });

                    $timeout(function () {
                        self.isInitComplete = true;
                    }, 50);
                });
            }]);
}());
