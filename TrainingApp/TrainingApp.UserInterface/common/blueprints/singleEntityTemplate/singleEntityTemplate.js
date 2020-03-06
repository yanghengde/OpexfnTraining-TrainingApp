/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    var ctrl = "common.layout.modelDriven.template.SECtrl";
    angular.module('siemens.simaticit.common.services.modelDriven')
        /**
          * @ngdoc controller
          * @name common.layout.modelDriven.template.SECtrl
          * @module siemens.simaticit.common.services.modelDriven
          * @access public
          * @description
          * The controller for the MD single entity template
          *
          */
        .controller(ctrl, ['$state', '$rootScope', '$translate', '$timeout','common.base', 'common.services.modelDriven.service', 'common.services.modelDriven.runtimeService',
            '$stateParams', 'common.services.modelDriven.contextService', 'common.services.swac.SwacUiModuleManager',
            function ($state, $rootScope, $translate,$timeout, base, md, mdrt, $stateParams, mdContextSrv, swacMgr) {
                var self = this, detailName = "", stateId = $state.$current.toString(), masterName = "";
                self.isInitComplete = false;
                self.isDrillDownState = $stateParams.isDrillDownState;
                var useScreenTitleInBreadcrumb = false;
                //reset sidepanel state
                mdContextSrv.setPropertyPanelState(false, null);
                md.loadModule(stateId).then(function (manifest) {
              /*  md.getManifest().then(function (manifest) {*/ // Assuming manifest has already been retrieved.
                    var screen = manifest.states.filter(function (s) { return s.id === stateId; })[0];

                    self.mdView = { "params": {} };
                    self.screenTitle = $translate.instant(screen.header) || screen.title;
                    if (swacMgr.enabled) {
                        swacMgr.contextServicePromise.promise.then(function (service) {
                            service.updateCtx('location.titles', { headerTitle: self.screenTitle });
                        });
                    }
                    self.mdViewCtrl = new mdrt.ModelViewCtrl(screen, self.mdView, $stateParams);

                    //Reoder contents to simplify layout management
                    self.newObj = {
                        actions: self.mdViewCtrl.commandBars[0]
                    };
                    //Create newObj.master for html template bind
                    for (detailName in self.mdView.contents) {
                        if (self.mdView.contents[detailName].master) {
                            if (self.mdView.contents[detailName].multiplicity === "many") {
                                self.newObj.master = self.mdView.contents[detailName];
                                self.mdViewCtrl.setActiveContent(detailName);
                                break;
                            }
                        }
                    }
                    if (!self.newObj.master) { //master not specified
                        for (detailName in self.mdView.contents) { //use first valid content
                            if (self.mdView.contents[detailName].multiplicity === "many") {
                                self.newObj.master = self.mdView.contents[detailName];
                                self.mdViewCtrl.setActiveContent(detailName);
                                break;
                            }
                        }
                    }

                    function showBreadcrumb() {
                        self.isDrillDownState = true;
                        self.mdViewCtrl.initBreadcrumb();
                        self.breadcrumbOptions = {
                            onClick: function (item) {
                                self.mdViewCtrl.updateBreadCrumb(item);
                                var params = self.mdViewCtrl.getParams(item.name);
                                params.isNavigatedFromBreadcrumb = true;
                                $state.go(item.name, params, { reload: true });
                            }
                        }
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
                                useScreenTitleInBreadcrumb = content.blueprintSettings.useScreenTitleInBreadcrumb;
                            }
                        }
                        return field;
                    }

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

                    function getContentInfo(item, breadcrumbField, stateParams) {
                        var contentInfo = {};
                        if (!item) {
                            return contentInfo;
                        }
                        contentInfo = {
                            id: item.Id,
                            title: window.$UIF.Object.safeGet(item, breadcrumbField),
                            field: breadcrumbField,
                            useScreenTitle: useScreenTitleInBreadcrumb,
                            params: stateParams
                        };
                        return contentInfo;
                    }

                    if (self.newObj.master) {
                        masterName = self.newObj.master.id;
                        var stateInfo = self.mdViewCtrl.getStateInfo(stateId);
                        if (stateInfo && stateInfo.master) {
                            self.mdView.params[masterName] = stateInfo.master.id;
                            updateParams(stateInfo.master.params);
                        }
                        if (self.isDrillDownState) {
                            showBreadcrumb();
                        }
                        if (self.mdViewCtrl[masterName]) {
                            self.mdViewCtrl[masterName].onContentSelection = function () {  //content selection
                                if (!self.isDrillDownState) {
                                    self.mdViewCtrl.setStateInfo(stateId, null, null);
                                }
                                self.mdViewCtrl.commandBars[0].refresh(); //reevaluate command expression
                            };
                            self.mdViewCtrl[masterName].onOpenClick = function (item, destScreen, drillDownParams) {
                                drillDownParams['isDrillDownState'] = true;
                                //set the state info for current screen
                                var breadcrumbField = getBreadcrumbField(stateId);
                                var masterInfo = getContentInfo(item, breadcrumbField, drillDownParams);
                                self.mdViewCtrl.setStateInfo(stateId, masterInfo, null);
                                //set the state info for destination screen
                                var destScreenId = 'home' + '.' + destScreen;
                                breadcrumbField = getBreadcrumbField(destScreenId);
                                masterInfo = getContentInfo(item, breadcrumbField, drillDownParams);
                                self.mdViewCtrl.setStateInfo(destScreenId, masterInfo, null);
                                self.mdViewCtrl.setBreadCrumbChain(destScreen);
                                $state.go(destScreenId, drillDownParams);
                            };
                        }
                        // Initialization function
                        var init = function () {
                            self.mdViewCtrl.commandBars[0].refresh();
                            self.mdViewCtrl[masterName].refresh(true);
                        };
                        init();
                    }
                    $timeout(function () {
                        self.isInitComplete = true;
                    }, 50);
                });
            }]);
}());
