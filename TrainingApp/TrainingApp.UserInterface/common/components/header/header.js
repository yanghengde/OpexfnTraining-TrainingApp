/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    angular.module('siemens.simaticit.common.services.layout').component('sitHeader', getComponentDefinition());

    function getComponentDefinition() {
        return {
            bindings: {
                name: '@'
            },
            templateUrl: 'common/components/header/header.html',
            controller: ComponentController,
            controllerAs: 'vm'
        };
    }

    ComponentController.$inject = [
        '$rootScope',
        '$window',
        '$translate',
        '$timeout',
        'CONFIG',
        'APPCONFIG',
        'common.services.authentication',
        'common.widgets.globalDialog.service',
        'common.widgets.busyIndicator.service',
        'common.services.header.service',
        'common.components.documentation.helpWindowService',
        'common.services.documentation.service',
        'common.services.swac.SwacUiModuleManager',
        'common.widgets.messageOverlay.service'
    ];
    function ComponentController($rootScope, $window, $translate, $timeout, CONFIG, APPCONFIG, authentication,
        dialogService, busyIndicatorService, headerService, helpWindowService, documentCenterServices, swacManagerService, globalMsgOverlayManager) {
        var vm = this;
        var helpCode;
        activate();

        function activate() {
            init();
            exposeApi();
            subscribeEvents();
        }

        function init() {
            // Init help window variables
            helpCode = '';
            vm.isHelpAvailable = false;
            vm.isRuntime = false;

            // Load User details and configure logout menu
            var identity = authentication.getUser();
            if (null === identity) {
                authentication.getLoggedUser().then(null, null, function (identity) {
                    vm.userFullName = getUserFullName(identity);
                });
            } else {
                vm.userFullName = getUserFullName(identity);
            }

            vm.userFlymenuOptions = {
                id: 'hdr_menu_user',
                title: vm.userFullName,
                icon: 'fa fa-lg sit sit-user',
                menuItems: [{
                    id: 'logout',
                    title: 'common.header.actions.logout',
                    icon: 'fa fa-sign-out fa-lg',
                    onClick: logoutUser
                }]
            };

            // Load Application logo from CONFIG
            var config = angular.extend({}, APPCONFIG, CONFIG);
            vm.logoImage = null;
            if (config.logo && 'common/images/SiemensLogo.png' !== config.logo) {
                vm.logoImage = config.logo;
            }

            // Configure public flymenu
            vm.primaryFlymenuOptions = {
                id: 'hdr_menu_hamburger',
                title: '',
                icon: 'fa fa-lg fa-bars',
                menuItems: headerService.getFlyMenuItems()
            };

            vm.actionButtons = headerService.getActionButtons();
            headerService.registerCtrl(vm);
        }

        function exposeApi() {
            vm.showAboutDialog = showAboutDialog;
            vm.navigateToHome = navigateToHome;
            vm.showHelpWindow = showHelpWindow;
            vm.showDataSegregationDialog = showDataSegregationDialog;
        }

        function subscribeEvents() {
            $rootScope.keyDown = onKeyDown;
            $rootScope.$on('$stateChangeSuccess', getHelpDataFromState);
        }

        function navigateToHome() {
            $rootScope.$state.go('home', null, { reload: true, inherit: false });
        }

        function logoutUser() {
            authentication.logout();
        }

        function showAboutDialog() {
            $timeout(function () {
                var information = headerService.getAboutInformation();
                if ('' === information) {
                    information = '<div>' + $translate.instant('common.header.about.version') + '</div>' +
                        '<div>' + $translate.instant('common.header.about.copyright') + '</div>';
                }
                dialogService.set({
                    title: $translate.instant('common.header.about.title'),
                    templatedata: {
                        layout: 'Vertical',
                        data: {},
                        information: information,
                        mode: 'view'
                    },
                    buttons: [{
                        id: 'about_btn_ok',
                        displayName: $translate.instant('common.ok'),
                        onClickCallback: closeAboutDialog
                    }]
                });
                dialogService.show();
            });
        }

        function showDataSegregationDialog(configObject) {
            $timeout(function () {
                dialogService.set({
                    title: "Tag Management",
                    templateuri: configObject.templateuri,
                    templatedata: {
                        layout: 'Vertical',
                        data: {},
                        information: '',
                        mode: 'view'
                    },
                    buttons: [
                        {
                            id: 'btn_ok',
                            displayName: $translate.instant('common.ok'),
                            onClickCallback: configObject.saveTags
                        },
                        {
                            id: 'btn_cancel',
                            displayName: $translate.instant('common.cancel'),
                            onClickCallback: closeDatasegregationDialog
                        }
                    ]
                });
                dialogService.show();
            });
        }

        function closeDatasegregationDialog() {
            dialogService.hide();
        }

        function closeAboutDialog() {
            dialogService.hide();
        }

        function showHelpWindow() {
            busyIndicatorService.show();
            if (vm.help !== '' && vm.help !== undefined || vm.helpCode !== '' && vm.helpCode !== undefined) {
                if ($window.innerWidth <= 768) {
                    if (vm.helpCode) {
                        helpWindowService.show({ pageCode: vm.helpCode, isTabbed: true });
                    } else {
                        helpWindowService.show({ pageTitle: vm.help, isTabbed: true });
                    }
                } else {
                    if (vm.helpCode) {
                        helpWindowService.show({ pageCode: vm.helpCode });
                    } else {
                        helpWindowService.show({ pageTitle: vm.help });
                    }
                }
            }
            else {
                busyIndicatorService.hide();
                var overlaySettings = {
                    buttons: [{
                        id: 'ok',
                        displayName: $translate.instant('common.ok'),
                        onClickCallback: hideOverlay
                    }],
                    text: $translate.instant('common.helpWindow.no-help-code')
                };

                globalMsgOverlayManager.set(overlaySettings);
                globalMsgOverlayManager.show();
            }
        }

        function hideOverlay() {
            globalMsgOverlayManager.hide();
        }

        function getHelpDataFromState() {
            var currentState = $rootScope.$state.$current;
            var help = '', helpCode = '';
            var optionString = '';
            if (currentState.self.data !== undefined && (currentState.self.data.help !== undefined || currentState.self.data.helpCode !== undefined)) {
                vm.isHelpAvailable = true;
                help = currentState.self.data.help;
                helpCode = currentState.self.data.helpCode;
            } else {
                help = getHelpDataFromParent(currentState, 'help');
                helpCode = getHelpDataFromParent(currentState, 'helpCode');
            }

            vm.isRuntime = $rootScope.$state.params.stateToReturn === "studioHome.solution";

            if (help !== '' || helpCode !== '') {
                vm.isHelpAvailable = false;
                if (helpCode) {
                    optionString = "$filter=indexof(tolower(Code),tolower('" + helpCode + "')) ne -1";
                } else {
                    optionString = "$filter=indexof(tolower(Title),tolower('" + help + "')) ne -1";
                }
                documentCenterServices.getAllPages(optionString).then(function (dataResponse) {
                    var results = dataResponse;
                    if ('undefined' !== typeof results && null !== results && null !== results.value && results.value.length) {
                        vm.isHelpAvailable = true;
                        if (vm.isHelpAvailable && swacManagerService.enabled) {
                            swacManagerService.contextServicePromise.promise.then(function (service) {
                                service.registerCtx('isHelpWindowIconEnabled', vm.isHelpAvailable);
                                if ('$apply' === $rootScope.$$phase || '$digest' === $rootScope.$$phase) {
                                    return;
                                }
                                $rootScope.$apply();
                            });
                        }
                    } else {
                        vm.isHelpAvailable = false;
                    }

                }, function () {
                    vm.isHelpAvailable = false;
                });
            }
            vm.help = help;
            vm.helpCode = helpCode;
        }

        function getParentState(state) {
            return state.parent;
        }

        function getHelpDataFromParent(state, helpString) {
            var i = true, helpDataFromParent = '';
            var parentState = state;
            while (i) {
                parentState = getParentState(parentState);
                if (parentState === undefined) {
                    vm.isHelpAvailable = false;
                    i = false;
                    break;
                } else if (parentState.self.data !== undefined && (parentState.self.data.help !== undefined || parentState.self.data.helpCode !== undefined)) {
                    if (helpString === 'helpCode') {
                        helpDataFromParent = parentState.self.data.helpCode;
                    } else {
                        helpDataFromParent = parentState.self.data.help;
                    }
                    vm.isHelpAvailable = true;
                    i = false;
                    break;
                }
            }
            return helpDataFromParent;
        }

        function onKeyDown(event) {
            if (event.keyCode === 112) {
                window.onhelp = function () {
                    return false;
                };
                event.preventDefault();
                showHelpWindow();
                return;
            }
            if (event.keyCode === 27) {
                helpWindowService.hide();
            }
        }

        function getUserFullName(identity) {
            if (identity['urn:fullname'] && '' !== identity['urn:fullname'].trim()) {
                return identity['urn:fullname'].trim();
            }
            return identity.unique_name.trim();
        }

        vm.$onDestroy = function () {
            headerService.unRegisterCtrl();
        };
    }
})();

"use strict";
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        /**
         * @ngdoc type
         * @name ActionButtonConfig
         * @module siemens.simaticit.common.services.layout
         * @description Represents an object that is required to configure the header bar action button.
         * @property {String} id A unique identifier for the header bar action button.
         * @property {String} icon A valid font awesome icon name.
         * @property {String} title _(Optional)_ A title for the header bar action button. If specified, it will be displayed to the right of the icon.
         * @property {Function} onClick A callback function to be executed on button click.
         */
        /**
         * @ngdoc type
         * @name DropdownMenuConfig
         * @module siemens.simaticit.common.services.layout
         * @description Represents an object that is required to configure the header bar dropdown.
         * @property {String} id A unique identifier for the header bar dropdown. It must be set to an ID of an existing action button.
         * @property {String} templateuri The path to a template to be rendered within the dropdown.
         * @property {Boolean} sticky If set to true, the header bar dropdown will not be closed unless the **closeDropdownMenu** method is called. Otherwise, the dropdown menu is closed automatically when the user clicks outside it.
         */
        /**
         * @ngdoc service
         * @name common.services.header.service
         * @module siemens.simaticit.common.services.layout
         * @requires common.services.logger.service
         * @description This service can be used to configure the header bar included in all UI Applications.
         */
        var HeaderService = /** @class */ (function () {
            function HeaderService($state, logger) {
                var _this = this;
                this.$state = $state;
                this.logger = logger;
                this.navigateToSettings = function () {
                    _this.$state.go('home.settings');
                };
                this.registerCtrl = function (ctrl) {
                    _this.headerController = ctrl;
                };
                this.unRegisterCtrl = function () {
                    _this.headerController = null;
                };
                this.headerController = null;
                this.aboutInformation = '';
                this.flyMenuItems = [{
                        id: 'Settings',
                        title: 'common.header.actions.settings',
                        icon: 'fa-lg sit sit-system-configuration',
                        onClick: this.navigateToSettings
                    }];
                this.actionButtons = {};
            }
            /**
             * @ngdoc method
             * @name common.services.header.service#getAboutInformation
             * @description Retrieves the About information.
             * @returns {string} A string containing the information to be shown in the About dialog box.
             */
            HeaderService.prototype.getAboutInformation = function () {
                return this.aboutInformation;
            };
            /**
             * @ngdoc method
             * @name common.services.header.service#setAboutInformation
             * @description Sets the About information to be shown.
             * @param {string} content Information to be shown in the About dialog box.
             */
            HeaderService.prototype.setAboutInformation = function (content) {
                this.aboutInformation = content;
            };
            /**
             * @ngdoc method
             * @name common.services.header.service#addButton
             * @description Adds a button to be displayed in the header flyout menu.
             * ```
             * //add button
             * common.services.header.service.addButton(
             * 'Test',
             * 'fa fa-check fa-lg',
             * 'common.header.test',
             * function () {
             *   //code to execute on click
             * });
             * ```
             * @param {string} id The unique identifier for the button to be added.
             * If the ID provided is not unique, an error is logged and **false** is returned.
             * @param {string} icon The icon to be shown for the button.
             * @param {string} text The text to be displayed for the button.
             * @param {function} callbackMethod The function to be executed when the button is clicked.
             */
            HeaderService.prototype.addButton = function (id, icon, text, callbackMethod, svgIcon, cmdIcon) {
                // is there any buttons exist with same id, if yes just return.
                var index = _.findIndex(this.flyMenuItems, function (menuItem) {
                    return menuItem.id === id;
                });
                if (-1 !== index) {
                    this.logger.logError('addButton', 'id must be unique', 'common.services.header.service');
                    return false;
                }
                this.flyMenuItems.push({
                    id: id,
                    title: text,
                    icon: icon
                });
                return true;
            };
            /**
             * @ngdoc method
             * @name common.services.header.service#removeButton
             * @description Removes a button from the header flyout menu.
             * @param {string} id The unique ID for the button to be removed.
             */
            HeaderService.prototype.removeButton = function (id) {
                // is the request to remove standard buttons
                if (id === 'Settings') {
                    this.logger.logError('removeButton', 'can not remove standard buttons', 'common.services.header.service');
                    return false;
                }
                // is there any buttons exist with same id, if not just return.
                var index = _.findIndex(this.flyMenuItems, function (menuItem) {
                    return menuItem.id === id;
                });
                if (-1 === index) {
                    this.logger.logError('removeButton', 'id is not found', 'common.services.header.service');
                    return false;
                }
                this.flyMenuItems.splice(index, 1);
                return true;
            };
            /**
             * @ngdoc method
             * @name common.services.header.service#addActionButton
             * @description Inserts an action button in the header bar.
             * @param {ActionButtonConfig} buttonConfig The configuration object for a header bar action button. See {@link ActionButtonConfig}.
             */
            HeaderService.prototype.addActionButton = function (config) {
                if (!config || !config.id || this.actionButtons.hasOwnProperty(config.id)) {
                    return false;
                }
                config.api = {};
                this.actionButtons[config.id] = config;
                return true;
            };
            /**
             * @ngdoc method
             * @name common.services.header.service#removeActionButton
             * @description Removes button from the header bar.
             * @param {String} id An existing id of the button to be removed.
             */
            HeaderService.prototype.removeActionButton = function (id) {
                if (!id || !this.actionButtons.hasOwnProperty(id)) {
                    return false;
                }
                delete this.actionButtons[id];
                return true;
            };
            /**
             * @ngdoc method
             * @name common.services.header.service#openDropdownMenu
             * @description Configures and displays the header bar dropdown.
             * @param {DropdownMenuConfig} menuConfig The configuration object for a header bar dropdown. See {@link DropdownMenuConfig}
             */
            HeaderService.prototype.openDropdownMenu = function (config) {
                if (!config || !config.id || !this.actionButtons.hasOwnProperty(config.id)) {
                    return false;
                }
                this.actionButtons[config.id].api.openMenu(config);
                return true;
            };
            /**
             * @ngdoc method
             * @name common.services.header.service#closeDropdownMenu
             * @description Hides the visible header bar dropdown.
             * @param {String} id An existing header bar dropdown id.
             */
            HeaderService.prototype.closeDropdownMenu = function (id) {
                if (!id || !this.actionButtons.hasOwnProperty(id)) {
                    return false;
                }
                this.actionButtons[id].api.closeMenu();
                return true;
            };
            HeaderService.prototype.getFlyMenuItems = function () {
                return this.flyMenuItems;
            };
            HeaderService.prototype.getActionButtons = function () {
                return this.actionButtons;
            };
            HeaderService.prototype.openAboutDialog = function () {
                if (this.headerController) {
                    this.headerController.showAboutDialog();
                }
            };
            HeaderService.prototype.openSolutionStudioHelp = function () {
                if (this.headerController) {
                    this.headerController.showHelpWindow();
                }
            };
            HeaderService.prototype.openDataSegregationDialog = function (configObject) {
                if (this.headerController) {
                    this.headerController.showDataSegregationDialog(configObject);
                }
            };
            HeaderService.$inject = [
                '$state',
                'common.services.logger.service'
            ];
            return HeaderService;
        }());
        framework.HeaderService = HeaderService;
        angular.module('siemens.simaticit.common.services.layout').service('common.services.header.service', HeaderService);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
//# sourceMappingURL=header-svc.js.map