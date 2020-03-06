/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.sidepanel
    *
    * @description
    * This module provides functionalities related to displaying the side-panel.
    */
    angular.module('siemens.simaticit.common.widgets.sidepanel', []);

})();

(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.sidepanel').directive('sitSidePanel', SidepanelDirective);
    /**
    * @ngdoc directive
    * @name sitSidePanel
    * @module siemens.simaticit.common.widgets.sidepanel
    * @description
    * A directive which defines the standard structure for a side-panel.
    * To maintain consistency across all the side-panels used in the App, it is highly recommended to use this directive instead of providing a custom template for the side-panel.
    * Since buttons, titles and messages are part of the side-panel directive, in order to migrate from a custom template to the side-panel directive
    * you should remove the html for those elements from the custom templates and configure them in the directive.
    * In order to do that you should use the following side-panel directive attributes:
	* * Action, command and close buttons (sit-actions, sit-commands, sit-close).
	* * Error and info messages (sit-messages).
	* * Title (sit-title).
    * The remaining html content of the custom template should be wrapped between the opening and closing tag of the side-panel directive.
    *
    * It requires mode to be specified in the configuration. Mode can be of the form of both string and object. In case the size of the side panel is not specified, it uses the default size configuration. 
    * It has two properties: 
    * * type, representing the type of the side panel. There are two types: 'p' and 'e'.
    * * size (Optional), representing the size of the side panel. The defult size for 'p' is 'small' and for 'e' is 'large'. Mode 'p' can have only 'small' size.
    * There are three different sizes which can be configured for 'e' mode:
    *   * small, representing small layout of side panel having a width of 360px.
    *   * large, representing large layout of side panel having a width of 480px.
    *   * wide, representing wide layout of side panel having a width of 704px. See {@link common.services.sidePanel.service#openClose}
    * @usage
    * Mode, used as a string:
    * ```
    *    common.sidePanelManager.open('p');
    * ```
    * Mode, used as an object:
    * ```
    *   common.sidePanelManager.open({
    *       mode: 'p',
    *       size:'small'
    *   });
     * ```
    * Sidepanel, as an element:
    * ```
    * <sit-side-panel
                sit-title="Sidepanel Title"
                sit-messages="messagesArray"
                sit-actions="actionButtonsArray"
                sit-commands="commandButtonsArray"
                sit-collapse= "collpaseButton"
                sit-disable-minimize= "disableMinimize"
                sit-close="closeButtonObj">
    *           **custom contents goes here**
    * </sit-side-panel>
    * ```
    * @restrict E
    *
    * @param {String} sit-title Title of the side-panel.
    * @param {Array<Message>} sit-messages _(Optional)_ Displays info/warning messages at the bottom of the side-panel content.
    * To configure the message object see {@link Message}.
    * @param {Array<ActionButton>} sit-actions _(Optional)_ Action buttons are displayed at the bottom of the side-panel on the right-hand side,
    * below the side-panel title. To configure action buttons see {@link ActionButton}.
    * @param {Array<CommandButton>} sit-commands _(Optional)_ Command buttons are displayed on the left-hand side, below the side-panel title.
    * To configure command buttons see {@link CommandButton}.
    * @param {Object<CloseButton>} sit-close _(Optional)_ A close button is displayed on the right-hand side, after the side-panel title.
    * To configure close buttons see {@link CloseButton}.
    * @param {Boolean} [sit-collapse= true] _(Optional)_ A collapse button is displayed in the header section to minimize and maximize the panel height.
    * @param {Boolean} [sit-disable-minimize= false] _(Optional)_ This will disable minimize/maximize functionality of the side panel.
    *
    * @example
    * The following example shows how to configure a side-panel widget:
    *
    * In Controller:
    * ```
    *    (function () {
    *        SidepanelDemoController.$inject = ['common']
    *        function SidepanelDemoController(common) {
    *            var self = this;
    *            self.createNewImage =  '<span class="sit-stack">' +
    *                                   '<i class="sit sit-user-group"></i>' +
    *                                   '<i class="fa fa-plus-circle sit-bottom-right sit-bkg-circle"></i>' +
    *                                   '</span>';
    *            self.sidepanelConfig = {
    *                messages: [{
    *                    type: 'info',
    *                    text: 'This is an info text'
    *                }, {
    *                    type: 'warning',
    *                    text: 'This is a warning text'
    *                }],
    *                actionButtons: [{
    *                    label: 'Save and Config',
    *                    tooltip: 'Save and Config',
    *                    onClick: function () {
    *                        //content goes here
    *                    },
    *                    enabled: false,
    *                    visible: true
    *                }, {
    *                    label: 'Save',
    *                    tooltip: 'Save',
    *                    onClick: function () {
    *                        //content goes here
    *                    },
    *                    enabled: false,
    *                    visible: true
    *                }, {
    *                    label: 'Close',
    *                    tooltip: 'Close',
    *                    onClick: function () {
    *                        //content goes here
    *                    },
    *                    enabled: true,
    *                    visible: true
    *                }],
    *                commandButtons: [{
    *                    img: 'fa-undo',
    *                    svgIcon:'common/icons/cmdOpen24.svg',
    *                    tooltip: 'Reset the configuration',
    *                    onClick: function () {
    *                        //content goes here
    *                    },
    *                    enabled: true,
    *                    visible: true
    *                }, {
    *                    imageTemplate: self.createNewImage,
    *                    tooltip: 'Create new folder',
    *                    onClick: function () {
    *                        //content goes here
    *                    },
    *                    enabled: true,
    *                    visible: true
    *                }, {
    *                    img: 'fa-trash',
    *                    tooltip: 'Delete folder',
    *                    onClick: function () {
    *                        //content goes here
    *                    },
    *                    enabled: true,
    *                    visible: false
    *                }],
    *                collapse: false,
    *                closeButton: {
    *                   showClose : true,
    *                   tooltip: 'Close Sidepanel',
    *                   onClick: function () {
    *                       //content goes here
    *                       common.sidePanelManager.close();
    *                   }
    *                }
    *            }
    *        }
    *    })();
    * ```
    *
    * In Template:
    *```
    *   <sit-side-panel sit-title="Sidepanel Title"
    *                   sit-actions="ctrl.sidepanelConfig.actionButtons"
    *                   sit-messages="ctrl.sidepanelConfig.messages"
    *                   sit-commands="ctrl.sidepanelConfig.commandButtons"
    *                   sit-close="ctrl.sidepanelConfig.closeButton"
    *                   sit-collapse= "ctrl.sidepanelConfig.collapse"
    *       <!--Custom Content-->
    *   </sit-side-panel>
    *```
    *
    */
    /**
    * @ngdoc type
    * @module siemens.simaticit.common.widgets.sidepanel
    * @name Message
    * @description
    * Object to specify the type and text of the message to be displayed in the side-panel.
    *
    * @property {String} type Defines the type of message to be displayed. The 'type' property accepts two values and are as follows:
    *   * **info**: Displays an info message.
    *   * **warning**: Displays a warning message.
    * @property {String} text The message text.
    * @example
    * The following example shows how to configure the Message object:
    * ```
    *  {
    *     type: 'info',
    *     text: 'This is an info message'
    *  }
    * ```
    */
    /**
    * @ngdoc type
    * @module siemens.simaticit.common.widgets.sidepanel
    * @name ActionButton
    * @description
    * An object which defines the action buttons.
    *
    * @property {String} label The label to be displayed on the button.
    * @property {String} tooltip _(Optional)_ The tooltip to be displayed when the mouse hovers over the button. If not defined, the **label** property value is used.
    * @property {Function} onClick _(Optional)_ A function to be called when the button is clicked.
    * @property {Boolean} [enabled= true] _(Optional)_ If set to false, the action button is disabled.
    * @property {Boolean} [visible= true] _(Optional)_ If set to false, the action button is hidden.
    * @example
    * The action button object can be configured as follows:
    * `````````````````
    *  {
    *     img: 'fa-cogs',
    *     label: 'Action Button',
    *     tooltip: 'Button Tooltip',
    *     onClick: 'callbackFuntion',
    *     enabled: true,
    *     visible: true
    *  }
    * `````````````````
    */
    /**
    * @ngdoc type
    * @module siemens.simaticit.common.widgets.sidepanel
    * @name CommandButton
    * @description
    * An object which defines the command buttons.
    *
    * @property {String} [img= 'fa-cogs'] The image of the button. Valid [FontAwesome](http://fortawesome.github.io/Font-Awesome/icons/) icons are accepted. [Deprecated]
    * @property {String} svgIcon SVG icon to be displayed on the command button. Ex: 'common/icons/cmdOpen24.svg'
    * @property {String} imageTemplate The imageTemplate is displayed as a stacked image of the button.
    * @property {String} tooltip The tooltip to be displayed when the mouse hovers over the button.
    * @property {Function} onClick _(Optional)_ A function to be called when the button is clicked.
    * @property {Boolean} [enabled= true] _(Optional)_ If set to false, the command button is disabled.
    * @property {Boolean} [visible= true] _(Optional)_ If set to false, the command button is hidden.
    * @example
    * The action button object can be configured as follows:
    * `````````````````
    *  {
    *     img: 'fa-cogs',
    *     imageTemplate: '<span class="sit-stack">' +
    *                                 '<i class="sit sit-user-group"></i>' +
    *                                 '<i class="fa fa-plus-circle sit-bottom-right sit-bkg-circle"></i>' +
    *                    '</span>'
    *     tooltip: 'Button Tooltip',
    *     onClick: 'callbackFuntion',
    *     enabled: true,
    *     visible: true
    *  }
    * `````````````````
    */
    /**
    * @ngdoc type
    * @module siemens.simaticit.common.widgets.sidepanel
    * @name CloseButton
    * @description
    * An object which defines the sidepanel close button properties.
    *
    * @property {Boolean} [showClose = true] _(Optional)_ A boolean value which specifies whether or not to show the close button.
    * @property {String} [tooltip = 'Close'] _(Optional)_ The tooltip to be displayed when the mouse hovers over the close button.
    * @property {Function} onClick _(Optional)_ The callback function to be called on clicking the close button.
    * If the callback function is defined, the default side-panel close functionality is disabled,
    * consequently the side-panel close functionality must be implemented in the callback function.
    * @example
    * The close button object can be configured as follows:
    * `````````````````
    *  {
    *     showClose: true,
    *     tooltip: 'Close Tooltip',
    *     onClick: 'callbackFuntion'
    *  }
    * `````````````````
    */
    SidepanelDirective.$inject = ['$window', '$timeout','$rootScope'];
    function SidepanelDirective($window, $timeout, $rootScope) {
        return {
            transclude: true,
            scope: {},
            bindToController: {
                'title': '@sitTitle',
                'messages': '=?sitMessages',
                'actionButtons': '=?sitActions',
                'commandButtons': '=?sitCommands',
                'closeButton': '=?sitClose',
                'collapseButton': '=?sitCollapse',
                'disableMinimize': '=?sitDisableMinimize'
            },
            restrict: 'E',
            controller: SidepanelController,
            controllerAs: 'sidepanelCtrl',
            templateUrl: 'common/widgets/sidePanel/sidepanel.html',
            link: function (scope, element, attr, ctrl) {
                var sidePanelPadding = 16;
                var sidePanelZeroPadding = 0;
                var sidePanelTitle = element.find('div.side-panel-container div.side-panel-top div.side-panel-header-text');
                var sidePanelScroll = element.find('div.side-panel-container');
                sidePanelTitle.on('mouseenter', setTitleText);


                function setTitleText() {
                    var titleElement = this;
                    var tooltipText = titleElement.innerHTML;
                    if (titleElement.offsetWidth < titleElement.scrollWidth) {
                        titleElement.setAttribute('title', tooltipText);
                    } else {
                        titleElement.removeAttribute('title');
                    }
                }
                function calcVisibleButtons() {
                    ctrl.calculateVisibleButtons(element[0].parentElement.clientWidth);
                }

                var classListner = scope.$watch(function () {
                    return element.parents('.property-area-container').attr('class');
                }, function (newValue) {
                    $timeout(function () {
                        if (newValue && (newValue.split(' ').indexOf('property-area-hide') === -1)) {
                            element.parents('.property-area-container').css('padding', sidePanelZeroPadding);
                            calcVisibleButtons();
                            classListner();
                        }
                        else {
                            element.parents('.property-area-container').css('padding', sidePanelPadding);
                        }
                        ctrl.isContentMinimizable = ctrl.checkContentHeight();
                        element.find('.side-panel-container .side-panel-content').addClass('add-flex-max');
                        if (ctrl.isMinimizeDisabled) {
                            element.find('.side-panel-container .side-panel-content .side-panel-custom').addClass('add-flex-max');
                        }
                    }, 10);
                }, true);

                var commandListner = scope.$watch(function () {
                    return ctrl.commandButtons;
                }, function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        ctrl.setSidePanelButtons(ctrl.commandButtons, 'Command');
                        ctrl.setContextualCommandBar(ctrl.commandButtons);
                        calcVisibleButtons();
                        ctrl.contentClassType = ctrl.getContentcontentClassType();
                    }
                }, true);

                var actionListner = scope.$watch(function () {
                    return ctrl.actionButtons;
                }, function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        ctrl.setSidePanelButtons(ctrl.actionButtons, 'Action');
                        calcVisibleButtons();
                        ctrl.contentClassType = ctrl.getContentcontentClassType();
                    }
                }, true);

                function registerOnResize() {
                    var sidePanelElement = element.find('.side-panel-container .side-panel-content .side-panel-custom');
                    ctrl.isContentMinimizable = (sidePanelElement[0].scrollHeight > sidePanelElement[0].clientHeight) ? false : true;
                    if (!ctrl.isMaximized && (document.body.clientHeight <= ctrl.fixedContentHeight)) {
                        ctrl.isContentMinimizable = false;
                        element.parents('.property-area-container').removeClass('content-resize-height');
                    }

                    else if (!ctrl.isMaximized) {
                        ctrl.isContentMinimizable = true;
                        element.find('.side-panel-container .side-panel-content').removeClass('add-flex-max');
                        element.parents('.property-area-container').addClass('content-resize-height');

                    }
                    calcVisibleButtons();
                }

                angular.element($window).bind('resize', registerOnResize);
                $('.side-panel-custom').on("scroll", setSidePanelScrollColor);
                $('.side-panel-custom>*').on("scroll", setSidePanelScrollColor);
                var unbindClosePanelEvent = $rootScope.$on('close-side-panel', ctrl.closeSidepanel);

                function setSidePanelScrollColor() {
                    if (this.scrollTop > 0) {
                        sidePanelScroll.children('.side-panel-bottom').addClass('shadow');
                    } else {
                        sidePanelScroll.children('.side-panel-bottom').removeClass('shadow');
                    }
                }

                scope.$on("$destroy", function () {
                    angular.element($window).unbind('resize', registerOnResize);
                    $('.side-panel-custom').off("scroll", setSidePanelScrollColor);
                    $('.side-panel-custom>*').off("scroll", setSidePanelScrollColor);
                    sidePanelTitle.off("mouseenter", setTitleText);
                    element.parents('.property-area-container').css('padding', sidePanelPadding);
                    element.parents('.property-area-container').removeClass('content-resize-height vertical-bar-property-area');
                    element.find('.side-panel-container .side-panel-content').addClass('add-flex-max');
                    unbindClosePanelEvent();
                    actionListner();
                    commandListner();
                    classListner();
                });

            }
        }
    }

    SidepanelController.$inject = ['common', '$translate', '$element', '$timeout'];
    function SidepanelController(common, $translate, $element, $timeout) {
        var vm = this;
        var DROPDOWN_BUTTON_WIDTH = 96;
        var COMMAND_MIN_WIDTH = 32;
        var ACTION_PADDING_WIDTH = 32;
        var ACTION_MARGIN = 8;
        var MIN_SIDEPANEL_WIDTH = 360;
        vm.isContentMinimizable = true;
        vm.isMaximized = true;
        vm.fixeContentHeight;

        vm.closePanel = {
            path: 'common/icons/cmdClosePanel24.svg',
            size: '16px'
        };

        vm.maximizePanel = {
            path: 'common/icons/cmdMaximiseVertically24.svg',
            size: '16px'
        };

        vm.minimizePanel = {
            path: 'common/icons/cmdRevertMaximiseVertically24.svg',
            size: '16px'
        };

        vm.dropdownMenu = {
            path: 'common/icons/cmdMenu24.svg',
            size: '16px'
        };

        vm.dropdownArrow = {
            path: 'common/icons/miscUpArrow16.svg',
            size: '16px'
        };

        vm.ContextualCommandButtons = {
            "barType": "Action",
            "bar": []
        };

        function activate() {
            init();
            setSidePanelButtons(vm.actionButtons, 'Action');
            setSidePanelButtons(vm.commandButtons, 'Command');
            setContextualCommandBar(vm.commandButtons);
            common.sidePanelManager.setTitle('');
            $timeout(alignVerticalCommandbar);
        }

        function init() {
            vm.closeButtonTooltip = vm.closeButton && vm.closeButton.tooltip ? vm.closeButton.tooltip : $translate.instant('sidePanel.close');
            vm.isCloseButtonShown = vm.closeButton && typeof vm.closeButton.showClose === 'boolean' ? vm.closeButton.showClose : true;
            vm.closeSidepanel = closeSidepanel;
            vm.setSidePanelButtons = setSidePanelButtons;
            vm.setContextualCommandBar = setContextualCommandBar;
            vm.calculateVisibleButtons = calculateVisibleButtons;
            vm.getContentcontentClassType = getContentcontentClassType;
            vm.contentClassType = vm.getContentcontentClassType();
            vm.checkContentHeight = checkContentHeight;
            vm.toggleSidePanelContent = toggleSidePanelContent;
            vm.iscollapseButtonShown = typeof vm.collapseButton === 'boolean' ? vm.collapseButton : true;
            vm.isMinimizeDisabled = typeof vm.disableMinimize === 'boolean' ? vm.disableMinimize : false;
            vm.collapseButtonTooltip = vm.iscollapseButtonShown && vm.isMaximized ? $translate.instant('sidePanel.minimize') : $translate.instant('sidePanel.maximize');
            vm.calcActionMenuOffset = calcActionMenuOffset;
            vm.getActiveActionButtons = getActiveActionButtons;
        }

        function calcActionMenuOffset() {
            var toggleMenuWidth;
            if (!$element.find('.side-panel-bottom .side-panel-actions li .bottom-action-button').length) {
                toggleMenuWidth = $element.find('.side-panel-bottom .side-panel-actions ul.dropdown-menu').width();
                $element.find('.side-panel-bottom .side-panel-actions ul.dropdown-menu').css('left', 'calc(100% - ' +toggleMenuWidth+'px )');
            }
        }

        function getActiveActionButtons() {
            return _.filter(vm.actionButtons.slice().reverse(), function (item) { return item.visible});
        }

        function calculateVisibleButtons(containerWidth) {
            vm.displayDropdownActions = false;
            vm.displayDropdownCommands = false;
            vm.visibleCommands = 0; vm.visibleActions = 0;
            vm.maxIndexNumberActions = 0; vm.maxIndexNumberCommands = 0;
            if (containerWidth >= MIN_SIDEPANEL_WIDTH) {
                vm.visibleActions = getVisibleButtons(containerWidth, 'Action');
                vm.visibleCommands = getVisibleButtons(containerWidth, 'Command');
                if (vm.actionButtons && vm.actionButtons.length !== 0) {
                    if (vm.visibleActions < vm.actionButtons.length) {
                        vm.displayDropdownActions = true;
                        vm.maxIndexNumberActions = vm.actionButtons.length - vm.visibleActions;
                    }
                }
                if (vm.commandButtons && vm.commandButtons.length !== 0) {
                    if (vm.visibleCommands < vm.commandButtons.length) {
                        vm.displayDropdownCommands = true;
                        vm.maxIndexNumberCommands = vm.commandButtons.length - vm.visibleCommands;
                    }
                }
            }
        }

        function getContentcontentClassType() {
            vm.contentClassType = '';
            if (vm.commandButtons && vm.actionButtons) {
                return (vm.commandButtons.length === 0 && vm.actionButtons.length === 0) ? 'contentHeight' : ((vm.commandButtons.length === 0 && vm.actionButtons.length !== 0) ? 'contentActionHeight' : ((vm.commandButtons.length !== 0 && vm.actionButtons.length === 0) ? 'contentCommandHeight' : 'contentButtonHeight'));

            } else {
                if (vm.commandButtons && vm.commandButtons.length !== 0) {
                    return 'contentCommandHeight';
                }
                if (vm.actionButtons && vm.actionButtons.length !== 0) {
                    return 'contentActionHeight';
                } else {
                    return 'contentHeight';
                }
            }
        }
        function getActionButtonWidth(action) {
            var ele, width;
            var fontSize =  $element.parents().find('.shop-floor.operational').length ? '24px' : '12px';
            var cssObj = {
                'font-family': '"Segoe UI", "Arial", "sans-serif","serif"',
                'font-size': fontSize
            };
            if (action.label) {
                var temp = '<button  data-internal-type="command-button-command-bar" class="menu-action-button">';
                temp += '<span  data-internal-type="text-container">' + action.label + '</span>' +
                '</button></div></div>';
                ele = $(temp).css(cssObj);
                ele.appendTo($element);
                width = Math.ceil(ele.outerWidth(true)) < 88 ? 88 : Math.ceil(ele.outerWidth(true));
                ele.remove();
                return width;
            } else {
                return 0;
            }

        }

        function getVisibleButtons(containerWidth, type) {
            var maxWidth = Math.floor(containerWidth - ACTION_PADDING_WIDTH);
            var maxWidthMenu = Math.floor(containerWidth - DROPDOWN_BUTTON_WIDTH - ACTION_PADDING_WIDTH);
            if (type === 'Action' && vm.actionButtons) {
                var currentWidth = 0, actions = 0, actionsWithMenu = 0;
                for (var i = 0; i < vm.actionButtons.length; i++) {
                    currentWidth += ACTION_MARGIN + getActionButtonWidth(vm.actionButtons[i]);
                    if (currentWidth < maxWidth) {
                        actions++;
                    }
                    else {
                        return actions;
                    }
                }
                return actions;
            }
            if (type === 'Command') {
                var commands = maxWidthMenu / COMMAND_MIN_WIDTH;
                return commands;
            }
        }

        function setSidePanelButtons(buttons, type) {
            if (buttons && type === 'Action') {
                var labelErrorMsg = $translate.instant('sidePanel.labelErrorMsg');
                buttons.forEach(function (button) {
                    if (!button.label) {
                        logError(labelErrorMsg, button);
                    } else {
                        button.tooltip = button.tooltip || button.label;
                        button.visible = typeof (button.visible) === "boolean" ? button.visible : true;
                        button.enabled = typeof (button.enabled) === "boolean" ? button.enabled : true;
                    }
                });

            }
            if (buttons && type === 'Command') {
                var tooltipErrorMsg = $translate.instant('sidePanel.tooltipErrorMsg');
                buttons.forEach(function (button) {
                    if (!button.tooltip) {
                        logError(tooltipErrorMsg, button);
                    }
                    else {
                        button.visible = typeof (button.visible) === 'boolean' ? button.visible : true;
                        button.enabled = typeof (button.enabled) === 'boolean' ? button.enabled : true;
                    }

                    button.displayIcon = null;
                    if (button.svgIcon) {
                        button.displayIcon = {
                            path: button.svgIcon,
                            size: '16px'
                        };
                    } else if (button.cmdIcon) {
                        button.displayIcon = {
                            prefix: "cmd",
                            name: button.cmdIcon,
                            suffix: "24",
                            size: '16px'
                        };
                    }

                });
            }

        }

        function setContextualCommandBar(commands) {
            if (commands && commands.length === 0) {
                return;
            }
            vm.ContextualCommandButtons.bar = [];
            var index = 0;
            angular.forEach(commands, function (command, key) {
                vm.ContextualCommandButtons.bar[index] = {
                    "type": "Command",
                    "name": command.tooltip,
                    "visibility": command.visible,
                    "image": command.img,
                    "svgIcon": command.svgIcon,
                    "tooltip": command.tooltip,
                    "onClickCallback": command.onClick
                }
                index++;
            });
        }

        function logError(errorMessage, attribute) {
            common.logger.logError(errorMessage, attribute, 'siemens.simaticit.common.widgets.sidepanel');
        }

        function closeSidepanel() {
            if (vm.closeButton && vm.closeButton.onClick && typeof vm.closeButton.onClick === 'function') {
                vm.closeButton.onClick();
            } else {
                common.sidePanelManager.close();
            }
        }

        function checkContentHeight() {
            var sidePanelBodyDivHeight = $element.find('.side-panel-container .side-panel-content').outerHeight(true);
            var sidePanelBodyContentHeight = $element.find('.side-panel-container .side-panel-content .side-panel-custom')[0].scrollHeight;
            return (sidePanelBodyContentHeight < sidePanelBodyDivHeight) ? true : false;
        }


        function toggleSidePanelContent() {
            if (!vm.isMaximized && vm.isContentMinimizable) {
                $element.find('.side-panel-container .side-panel-content').addClass('add-flex-max');
                $element.parents('.property-area-container').removeClass('content-resize-height');
                vm.isMaximized = true;
            } else if (vm.isMaximized && vm.isContentMinimizable) {
                vm.isContentMinimizable = checkContentHeight();
                if (vm.isContentMinimizable) {
                    $element.find('.side-panel-container .side-panel-content').removeClass('add-flex-max');
                    $element.parents('.property-area-container').addClass('content-resize-height');
                    vm.fixedContentHeight = $element.find('.side-panel-container')[0].clientHeight;
                }
                vm.isMaximized = false;
            }
            vm.collapseButtonTooltip = vm.iscollapseButtonShown && vm.isMaximized ? $translate.instant('sidePanel.minimize') : $translate.instant('sidePanel.maximize');
        }

        function alignVerticalCommandbar() {
            //sidepanel styles are modified when a vertical command bar is configured inside.
            var verticalCommandBar = $element.find('sit-command-bar[sit-layout=vertical]:visible');
            if (!verticalCommandBar.length) {
                return;
            }
            $element.parents('.property-area-container').addClass('vertical-bar-property-area');
        }

        activate();
    }
})();
