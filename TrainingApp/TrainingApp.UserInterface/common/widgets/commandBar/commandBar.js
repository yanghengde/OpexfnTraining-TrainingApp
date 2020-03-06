/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */

(function () {
    'use strict';

    /**
    * @ngdoc module
    * @name siemens.simaticit.common.widgets.commandBar
    *
    * @description
    * This module provides functionalities related to the command-bar.
    */

    angular.module('siemens.simaticit.common.widgets.commandBar', []);

})();

(function () {
    'use strict';
    //#region ng-doc comments
    /**
   *   @ngdoc directive
   *   @name sitCommandBar
   *   @module siemens.simaticit.common.widgets.commandBar
   *   @description
   *   Directive used to model a command bar. A command bar can have multiple buttons and the behavior of each button
   *   must be defined within a function that is executed when the button is clicked.
   *
   *   Only one command bar is used within a screen to trigger the execution of commands related to a set of homogeneous entities.
   *
   *
   *   @restrict E
   *   @param {String} sit-type Type of commands included in the command bar (**Action** or **Tool** commands).
   *   **Note** This parameter is only used when configuring a command bar using markup, as outlined in the example.
   *   @param {String} [sit-label-align=bottom] Specifies the position of label in Tool type command.
   *
   *   It supports the following options:
   *   * **right**: The label will be to the right of the icon.
   *   * **bottom**: The label will be below the icon.
   *
   *   @param {Object} sit-commands
   *   If specified, this parameter is used to configure the entire command bar, and it must be set to an object containing the following properties:
   *   * **barType**: defines the appearance of the command buttons included in the command bar. The **barType** can be set to one of the following strings:
   *     * **Action**: only the command icon is displayed.
   *     * **Tool**: the command icon and label are displayed.
   *     * **bar**: an array that contains the configuration objects necessary to populate the command bar with command buttons, separators, groups of main command buttons,
   *        or groups of command buttons. Each configuration object included in the **bar** array can contain the following properties:
   *
   *     * **label**: displays the label of the command (mandatory if not a separator).
   *     * **name**: complete name of the command with its name space. For a group of commands, the command name is an internal identifier.
   *     * **tooltip**: _(Optional)_ a tooltip to be displayed when the mouse hovers over a command.
   *     * **visibility**: _(Optional)_ determines whether the command button or group is displayed or not (default value is **true**).
   *     * **svgIcon**: SVG icon to be displayed.
   *     * **image**: a valid [FontAwesome](http://fortawesome.github.io/Font-Awesome/icons/) CSS class that determines the command icon to be displayed.[Deprecated]
   *     * **type**: type of object to be displayed. It can be set to either **Command**, **Sep** (for command separators) or **Group**.
   *     * **onClickCallback**: specifies the JavaScript function to be called when a command button is clicked.
   *
   *   @param {String} [sit-layout=horizontal]
   *   This parameter sets the layout for the command bar and it accepts the following values:
   *   * **horizontal**
   *   * **vertical**
   *   * **contextual**.
   *
   *   **Note**: The sequence of commands specified will be visualized in the **reverse** order for the **vertical** layout mode.
   *
   *   @param {Boolean} [sit-vertical-autofixed=true]
   *   This parameter if set to true the **vertical** command bar will be pushed to the right in canvas. If set to false the vertical command bar's position should be set manually.
   *
   *   **Note**: It is recommended to set attribute to false when vertical command bar is used as a component in Mashups.
   *
   *   @example
   *   ### Using markup
   *   ```
   *   <html>
   *   <sit-command-bar sit-vertical-autofixed ="true" sit-type="Tool" sit-label-align="right" sit-layout="vertical">
   *       <sit-command-group sit-label="group1" sit-name="My group name 1" svg-icon="common/icons/cmdOpen24.svg" sit-icon="fa-truck" sit-type="group">
   *            <sit-command ng-click="cbDevCtrl.callback" ng-show="true" sit-icon="fa-truck" sit-label="command2" sit-name="com.siemens.customcommand.command2"
   *                sit-tooltip="command"></sit-command>
   *            <sit-command ng-click="cbDevCtrl.callback" ng-show="true" sit-icon="fa-users" sit-label="command3" sit-name="com.siemens.customcommand.command3"
   *                sit-tooltip="command"></sit-command>
   *       </sit-command-group>
   *       <sit-command-group sit-label="group2" sit-name="Main Command group name 1" sit-icon="fa-truck" sit-type="group">
   *            <sit-command sit-type="main" ng-click="cbDevCtrl.callback" ng-show="true" sit-icon="fa-truck" sit-label="Main Command2"
   *                sit-name="com.siemens.customcommand.command2" sit-tooltip="Main Command"></sit-command>
   *            <sit-command sit-type="main" ng-click="cbDevCtrl.callback" ng-show="true" sit-icon="fa-users" sit-label="Main Command3"
   *                sit-name="com.siemens.customcommand.command3" sit-tooltip="Main Command"></sit-command>
   *       </sit-command-group>
   *       <sit-command ng-click="cbDevCtrl.callback" ng-show="true" sit-icon="fa-beer" sit-label="command1" sit-name="com.siemens.customcommand.command1" sit-tooltip="command">
   *            </sit-command>
   *       <sit-command sit-type="sep"></sit-command>
   *       <sit-command sit-type="main" ng-click="cbDevCtrl.callback" ng-show="true" sit-icon="fa-plus" sit-label="Add new" sit-name="Add" sit-tooltip="command"></sit-command>
   *   </sit-command-bar>
   *   </html>
   *   ```
   *   ### Using a configuration object
   *   In a view template, the **sit-command-bar** directive is used as follows:
   *   ```
   *   <sit-command-bar sit-commands="vm.commandBarData" sit-layout="horizontal"></sit-command-bar>
   *   ```
   *   The following example shows how to include a command, a separator, a group of two commands, and a group of two main commands in the command-bar by defining the
   *   **commandBarData** property in a controller.
   *   ```
   *   // ...
   *   this.commandBarData = {
   *     "barType": "Tool",
   *     "labelAlign": "right",
   *   "bar": [
   *     {
   *       "type":"Command",
   *       "label": "Edit",
   *       "name": "toggleEdit",
   *       "tooltip": "Edit Material",
   *       "visibility": false,
   *       "svgIcon": 'common/icons/indicatorCompleted16.svg',
   *       "image": "fa-edit",
   *       "onClickCallback": editFunction
   *     },
   *     {
   *       "type": "Sep"
   *     },
   *     {
   *       "label": "command2",
   *       "name": "My group name",
   *       "svgIcon": 'common/icons/indicatorCompleted16.svg',
   *       "image": "fa-truck",
   *       "type": "Group",
   *       "group": [
   *         {
   *           "label": "command2",
   *           "name": "com.siemens.customcommand.command2",
   *           "image": "fa-truck",
   *           "type": "Command"
   *         },
   *         {
   *           "label": "command3",
   *           "name": "com.siemens.customcommand.command3",
   *           "image": "fa-users",
   *           "type": "Command"
   *         }
   *       ]
   *     },
   *    {
   *       "label": "Main Command Group",
   *       "name": "Main command group name",
   *       "image": "fa-truck",
   *       "type": "Group",
   *       "group": [
   *         {
   *           "label": "Main Command2",
   *           "name": "com.siemens.customcommand.command2",
   *           "image": "fa-truck",
   *           "type": "MainCommand"
   *         },
   *         {
   *           "label": "Main Command3",
   *           "name": "com.siemens.customcommand.command3",
   *           "image": "fa-users",
   *           "type": "MainCommand"
   *         }
   *       ]
   *     }
   *   ]
   *  };
   * ```
   */
    //#endregion
    CommandBarController.$inject = ['$scope', '$element', 'common', '$translate', '$window', '$timeout', '$compile'];
    function CommandBarController($scope, $element, common, $translate, $window, $timeout, $compile) {
        var vm = this;
        var commandTypeSep = 'Sep';
        var commandTypeGroup = 'Group';
        var commandTypeCommand = 'Command';
        var commandTypeToggle = 'toggle';
        var commandTypeMain = 'MainCommand';
        var commandTypeSearch = 'search';
        var barTypeAction = 'Action';
        var barTypeTool = 'Tool';
        vm.svgIcons = {
            bar: {
                path: "common/icons/cmdMenu24.svg",
                size: "16"
            }
        };
        vm.otherCommandsText = $translate.instant('commandBar.moreCommandsAvailable');
        vm.lessCommandsText = $translate.instant('commandBar.lessCommands');
        vm.logErrorFn = function (message, attributes) {
            common.logger.logError(message, attributes, 'siemens.simaticit.common.widgets.commandBar');
        };

        function activate() {
            if (vm.commands !== null && vm.commands !== undefined) {
                if (!vm.validateAttributes()) {
                    return;
                }
            }
        }
        //#region Model methods

        // validates the attributes
        vm.validateAttributes = function () {
            if (vm.commands.barType === undefined || vm.commands.barType === null) {
                vm.logErrorFn('barType can\'t be null', vm.commands);
                vm.commands = {};
                return false;
            }
            if (vm.commands.bar === undefined || vm.commands.bar === null) {
                vm.logErrorFn('commands can\'t be empty', vm.commands);
                vm.commands = {};
                return false;
            }
            vm.commands.bar = _.filter(vm.commands.bar, function (command) {
                if (command.type === undefined || command.type === null) {
                    vm.logErrorFn('command type is mandatory', command);
                    return false;
                }
                if (command.type !== commandTypeSep && command.type !== commandTypeSearch) {
                    if (command.label === undefined || command.label === null) {
                        // for contextual command bar we are allowing without label also
                        if (vm.layout !== 'contextual') {
                            vm.logErrorFn('command label is mandatory', command);
                            return false;
                        }
                    }
                    if (command.type === commandTypeSearch && vm.layout !== 'contextual') {
                        // Quick search is supporting only for Contextual Widget

                        vm.logErrorFn('Quick search is supported only for contextual command bar', command);
                        return false;
                    }
                    if (command.type !== commandTypeSearch) {
                        if (command.name === undefined || command.name === null) {
                            vm.logErrorFn('command name is mandatory', command);
                            return false;
                        }
                    }

                    if (command.type === commandTypeGroup) {
                        if (command.group === undefined || command.group === null) {
                            vm.logErrorFn('When command type is group, group of commands can\'t be null or undefined', command);
                            return false;
                        }
                        command.group = _.filter(command.group, function (command) {
                            if (command.type === undefined || command.type === null) {
                                vm.logErrorFn('command type is mandatory', command);
                                return false;
                            }
                            if (command.type !== commandTypeSep) {
                                if (command.label === undefined || command.label === null) {
                                    vm.logErrorFn('command label is mandatory', command);
                                    return false;
                                }
                                if (command.name === undefined || command.name === null) {
                                    vm.logErrorFn('command name is mandatory', command);
                                    return false;
                                }
                            }
                            return true;
                        });
                    }
                    else if ((command.image === undefined || command.image === null) && (command.imageTemplate === undefined || command.imageTemplate === null)
                        && (!command.svgIcon && !command.cmdIcon) && command.type !== 'Search') {
                        vm.logErrorFn('command image is mandatory', command);
                        return false;
                    }
                    return true;
                }
                return true;
            });
            return true;
        };

        // calculates the cut-off point of the toolbar.
        vm.calculateCutOff = function () {
            if (vm.layout.toLowerCase() === 'horizontal') {
                vm.__width = vm.barElement.offsetWidth;
                horizontalCutoff();
            }
            if (vm.layout.toLowerCase() === 'vertical') {
                $('.commandBar-container-list-vertical').ready(function () {
                    $timeout(function () {
                        verticalCutoff();
                    }, 500);
                });
            }
        };

        vm.toggleIcon = function () {
            var moreLessText;
            $(".vertical-overlap").toggle();
            $('.arrow-spec').toggleClass('arrow-color');
            if (vm.isVerticalCommandLabelShown) {
                if ($(".arrow-spec p").text() === vm.otherCommandsText) {
                    moreLessText = vm.lessCommandsText;
                } else {
                    moreLessText = vm.otherCommandsText;
                }
            } else {
                moreLessText = '';
            }

            $(".arrow-spec p").text(moreLessText);
            $('.arrow-spec svg').toggleClass('rotate-icon');
        };

        function getItemHeight(WITH_LABEL_HEIGHT, WITHOUT_LABEL_HEIGHT, SHOPFLOOR_LABEL_HEIGHT) {
            if (vm.isVerticalCommandLabelShown) {
                return WITH_LABEL_HEIGHT;
            }
            else {
                var isShopFloorOperation = $(".arrow-spec").parents('.shop-floor.operational');
                if (isShopFloorOperation.length) {
                    $(".arrow-spec").css("cssText", "height:" + SHOPFLOOR_LABEL_HEIGHT + "px !important");
                    return SHOPFLOOR_LABEL_HEIGHT;
                }
                else {
                    $(".arrow-spec").css("cssText", "height:" + WITHOUT_LABEL_HEIGHT + "px !important");
                    return WITHOUT_LABEL_HEIGHT;
                }
            }
        }

        function getBottomHeight(reachedIndex, bottomHeight, itemHeight) {
            if (reachedIndex) {
                bottomHeight += itemHeight;
            }
            return bottomHeight;
        }

        function verticalCutoff() {
            $('li.arrow-spec').remove();
            $('.commandBar-container-list-vertical:visible > li').removeClass('vertical-overlap black-bottom').show().removeAttr("style");

            var verticalCommandsHeight = 0, reachedIndex = 0, bottomHeight = 0, item, itemHeight = 0, diff = 0, prevHeight = 0,
                verticalCommandBarHeight = 0, listLength = 0, WITH_LABEL_HEIGHT = 54, WITHOUT_LABEL_HEIGHT = 48, SHOPFLOOR_LABEL_HEIGHT = 60, template = "",
                list = $('.commandBar-container-list-vertical:visible > li'), commandBarFullHeight = $('.commandbar-container-vertical:visible').height() + 8;

            listLength = list.length;

            if (vm.isVerticalCommandLabelShown) {
                verticalCommandBarHeight = commandBarFullHeight - WITH_LABEL_HEIGHT;
            } else {
                verticalCommandBarHeight = commandBarFullHeight - WITHOUT_LABEL_HEIGHT;
            }

            for (var i = listLength - 1; i >= 0; i--) {
                item = $('sit-command-bar .commandBar-container-list-vertical:visible > li:eq(' + i + ')');

                itemHeight = item.height();
                verticalCommandsHeight += itemHeight;

                if (verticalCommandsHeight > verticalCommandBarHeight) {
                    if (reachedIndex === 0) {
                        reachedIndex = i;
                        if (reachedIndex === 1) {
                            continue;
                        }
                        diff = verticalCommandBarHeight - prevHeight;

                        template = '<li class="arrow-spec" ng-click="commandBarCtrl.toggleIcon()">' +
                            '<span sit-class="moreButton" sit-mom-icon="{path: \'common/icons/miscChevronRight24.svg\',size: \'24\'};" class="show-hide"></span><p></p></li>';
                        item.addClass('black-bottom').after($compile(template)($scope));

                        itemHeight = getItemHeight(WITH_LABEL_HEIGHT, WITHOUT_LABEL_HEIGHT, SHOPFLOOR_LABEL_HEIGHT);

                        bottomHeight += (itemHeight + diff - 8);

                        $(".arrow-spec p").text(vm.isVerticalCommandLabelShown ? vm.otherCommandsText : '');
                    }
                    if (reachedIndex !== 1) {
                        item.css("bottom", bottomHeight).addClass('vertical-overlap');
                        bottomHeight = getBottomHeight(reachedIndex, bottomHeight, itemHeight);
                    }
                }
                prevHeight = verticalCommandsHeight;
            }
        }

        function horizontalCutoff() {
            var ACTION_BUTTON_WIDTH = 42;
            var ACTION_TOGGLE_WIDTH = 44;
            var SEPARATOR_WIDTH = 8;
            var ACTION_DROPDOWN_WIDTH = 70;
            var TOOL_TOGGLE_WIDTH = 76;
            var TOOL_BUTTON_WIDTH = 80;
            var TOOL_DROPDOWN_WIDTH = 80;
            var MAX_WIDTH_OFFSET = 24;
            var ALIGN_VALUE = "right";
            var MAIN_BUTTON_DROPDOWN_WIDTH = 140;

            var displayMenu = false;
            var index = vm.commands.bar.length - 1;
            var indexWithMenu = index;
            var buttonWidth = 0, dropWidth = 0, toggleWidth = 0;
            var maxWidthOffset = MAX_WIDTH_OFFSET;
            if (vm.commands.barType === barTypeAction) {
                buttonWidth = ACTION_BUTTON_WIDTH;
                dropWidth = ACTION_DROPDOWN_WIDTH;
                toggleWidth = ACTION_TOGGLE_WIDTH;
            }
            if (vm.commands.barType === barTypeTool) {
                buttonWidth = TOOL_BUTTON_WIDTH;
                dropWidth = TOOL_DROPDOWN_WIDTH;
                toggleWidth = TOOL_TOGGLE_WIDTH;
            }
            var maxWidth = vm.__width - maxWidthOffset > 0 ? vm.__width - maxWidthOffset : 0; // minus margin
            var maxWidthWithMenu = maxWidth - dropWidth > 0 ? maxWidth - dropWidth : 0;
            var currentWidth = 0;

            // we parse the content of the command bar starting from the right (only the first level), the goal is to calculate how many buttons can be displayed.
            for (var i = vm.commands.bar.length - 1; i >= 0; i--) {
                var command = vm.commands.bar[i];
                switch (command.type) {
                    case commandTypeCommand:
                        if (command.visibility) {
                            if (vm.commands.barType === barTypeTool && vm.labelAlign === ALIGN_VALUE) {
                                currentWidth += getCommandWidth(command);
                            } else {
                                currentWidth += buttonWidth;
                            }
                        }
                        break;
                    case commandTypeToggle:
                        if (command.visibility) {
                            if (vm.commands.barType === barTypeTool && vm.labelAlign === ALIGN_VALUE) {
                                currentWidth += getCommandWidth(command);
                            } else {
                                currentWidth += toggleWidth;
                            }
                        }
                        break;
                    case commandTypeGroup:
                        if (command.visibility) {
                            if (vm.commands.barType === barTypeTool && vm.labelAlign === ALIGN_VALUE) {
                                currentWidth += getCommandWidth(command);
                            } else {
                                if (_.isObject(_.findWhere(command.group, { type: "MainCommand" }))) {
                                    currentWidth += dropWidth + MAIN_BUTTON_DROPDOWN_WIDTH;
                                } else {
                                    currentWidth += dropWidth;
                                }
                            }
                        }
                        break;
                    case commandTypeSep:
                        currentWidth += SEPARATOR_WIDTH;
                        break;
                    case commandTypeMain:
                        if (command.visibility) {
                            if (vm.commands.barType === barTypeTool) {
                                if (vm.labelAlign === ALIGN_VALUE) {
                                    currentWidth += getCommandWidth(command);
                                }
                                else {
                                    currentWidth += buttonWidth;
                                }
                            }
                            else {
                                var commandWidth = $('#ButtonMainCommand' + command.name).children('button').width();
                                if (buttonWidth > commandWidth) {
                                    commandWidth = buttonWidth;
                                }
                                if (command.hasOwnProperty('commandWidth')) {
                                    if (command.commandWidth > commandWidth) {
                                        commandWidth = command.commandWidth;
                                    }
                                }
                                command.commandWidth = commandWidth;
                                currentWidth += commandWidth;
                            }
                        }
                        break;
                    default: break;
                }
                if (currentWidth <= maxWidth) { index--; }
                if (currentWidth <= maxWidthWithMenu) {
                    indexWithMenu--;
                } else {
                    maxWidthWithMenu = 0;
                } // the point in which the collapse menu must be displayed is reached. We no longer change the indexWithMenu variable.
                if (currentWidth > maxWidth) {// the buttons cannot all be displayed, so we must activate the collapse menu and the cutpoint index must be indexWithMenu.
                    index = indexWithMenu;
                    displayMenu = true;
                    break;
                }
            }
            vm.DisplayMenu = displayMenu;
            if (displayMenu)
                $element.find('li[data-internal-type=command-bar-collapse-button]').removeClass('command-hide');
            else
                $element.find('li[data-internal-type=command-bar-collapse-button]').addClass('command-hide');

            vm.MaxIndexNumber = index;
        }

        // on resize, updates the commandBar
        vm.onWindowResizeSize = function () {
            if (vm.barElement && vm.__width !== vm.barElement.offsetWidth) {
                vm.__width = vm.barElement.offsetWidth;
                vm.calculateCutOff();
                if (vm.checkOpenPos) {
                    vm.checkOpenPos();
                }
                $scope.$apply();
            }
        };

        //#endregion

        function getCommandWidth(command) {

            var ele, width;
            var type = command.type;
            var fontSize = '9pt';
            var isMainGroupCommand = _.isObject(_.findWhere(command.group, { type: "MainCommand" }));

            var cssObj = {
                'font-family': '"Segoe UI", "Arial", "sans-serif","serif"',
                'font-size': fontSize
            };

            if (type === "MainCommand" || type === "toggle" || type === "Command") {
                var tempLabel = "";
                switch (type) {
                    case 'toggle':
                        tempLabel = "toggleTool";
                        break;
                    case 'MainCommand':
                        tempLabel = "MainCommandTool";
                        break;
                    case 'Command':
                        tempLabel = "CommandTool";
                        break;

                }
                var temp = '<div data-internal-type="command-bar"  class="commandBarContainerTool tempWidthCalcDiv">' +
                    '<div  data-internal-type="command-menu-command-bar" class="right-align-align" class="commandBarRightAlign">' +
                    '<button  data-internal-type="command-button-command-bar" class="commandBarRightAlign" class="' + tempLabel + 'Button">';

                if (command.image && !command.imageTemplate) {
                    temp += '<span  data-internal-type="image-container"  class="right-align-align fa-lg MainCommandImage">' +
                        '<i class="fa ' + command.image + '"></i>' +
                        '</span>';
                } else if (command.imageTemplate) {
                    temp += '<span data-internal-type="image-container"  class="right-align-align fa-lg MainCommandImage">' + command.imageTemplate + '</span>';
                }

                temp += '<span  data-internal-type="text-container" class="' + tempLabel + 'Label">' + command.label + '</span>' +
                    '</button></div></div>';
                ele = $(temp).css(cssObj);
            } else if (isMainGroupCommand) {
                ele = $('<div class="commandBarContainerTool tempWidthCalcDiv">' +
                    '<div class="right-align-align" class="commandBarRightAlign">' +
                    '<div class="MainCommanBtnGrp">' +
                    '<button  data-internal-type="group-button-command-bar"' +
                    'class="right-align-align dropdown-toggle MainCommandGroupButton " data-toggle="dropdown" title="maingroup">' +
                    '<span data-internal-type="image-container" class="fa-lg MainCommandImage">' +
                    '<i class="fa' + command.image + ' ">' +
                    '</i>' +
                    '</span>' +
                    '<span data-internal-type="text-container" class="right-align-align MainCommandActionLabel">' +
                    command.label +
                    '</span>' +
                    '</button>' +
                    '<button  style="align-items:center;" data-internal-type="group-button-command-bar"' +
                    'class="right-align-align dropdown-toggle MainCmdGrpdropdown" data-toggle="dropdown" title="maingroup">' +
                    '<span class="caret">' +
                    '</span>' +
                    '</button>' +
                    '</div></div></div>').css(cssObj);

            } else {
                ele = $('<div class="commandBarContainerTool tempWidthCalcDiv">' +
                    '<div  class=" btn-group right-align-align" class="commandBarRightAlign">' +
                    '<button  data-internal-type="command-button-command-bar" class="dropdown-toggle CommandToolDropdown">' +
                    '<div class="commandBarRightAlign">' +
                    '<span ng-if="cmdBarGrpBtnCtrl.group.image" class="fa-lg right-align">' +
                    '<i class="fa' + command.image + '">' +
                    '</i>' +
                    '</span>' +
                    '<span class="caret">' +
                    '</span>' +
                    '</div>' +
                    '<div  class="CommandToolDropdownLabel">' +
                    command.label +
                    '</div>' +
                    '</button></div></div>').css(cssObj);
            }

            ele.appendTo($element);

            if (isMainGroupCommand) {
                width = Math.ceil($(ele.find(":button")[0]).outerWidth(true)) + Math.ceil($(ele.find(":button")[1]).outerWidth(true));
            } else {
                width = Math.ceil($(ele.find(":button")[0]).outerWidth(true));
            }
            ele.remove();
            return width;
        }

        activate();
    }

    SitCommandBarDirective.globalCommandBarInstances = 0;
    SitCommandBarDirective.$inject = ['$timeout', '$window', 'common.widgets.commandBar.service'];
    function SitCommandBarDirective($timeout, $window, commandBarService) {
        function preLink(scope, iElem, iAttrs, ctrl) {
            var ACTION_TYPE = 'Action';
            var TOOL_TYPE = 'Tool';
            ctrl.layout = !ctrl.layout ? 'horizontal' : ctrl.layout.toLowerCase();
            ctrl.verticalFixedPosition = typeof ctrl.verticalFixedPosition === 'boolean' ? ctrl.verticalFixedPosition : true;

            //show/hide labels for vertical command bar
            ctrl.showLabel = commandBarService.getLabelVisibilityStatus();
            if (ctrl.commands === null || ctrl.commands === undefined) {
                ctrl.commands = {};
                ctrl.commands.barType = ctrl.type && ctrl.type.toLowerCase() === 'action' ? ACTION_TYPE : TOOL_TYPE;
                ctrl.commands.bar = [];
                ctrl.onCommandAdded = function (eventArgs) {
                    ctrl.commands.bar[eventArgs.index] = eventArgs.command;
                };
                ctrl.onGroupAdded = function (eventArgs) {
                    ctrl.commands.bar[eventArgs.index] = eventArgs.group;
                };
                ctrl.counter = 0;
            }
            else {
                ctrl.labelAlign = ctrl.commands.labelAlign === 'right' ? 'right' : 'bottom';
            }
        }
        function postLink(scope, element, attrs, controller) {
            var listners = [];

            if (controller.layout === 'vertical' && element.parents('div[ui-view=Canvas]').length === 1 && controller.verticalFixedPosition) {
                //Set the global vertical command bar
                commandBarService.show();
                commandBarService.updateCommands(controller.commands);
                SitCommandBarDirective.globalCommandBarInstances++;
            }

            //note about Chrome:
            //      Width is not avalaible from the element itself.
            //      So we get the first DIV of the directive (there is only one div at first level in this directive) and read its offsetwidth.
            //      A link to the first div is stored in the scope in order to avoid searching it each time we need it.
            if (controller.commands.bar === undefined || controller.commands.bar === null) {
                controller.logErrorFn('commands are not defined properly', controller.commands);
                return;
            }
            if (controller.commands.bar.length === 0) {
                controller.logErrorFn('commands are not defined properly', controller.commands);
                return;
            }
            if (controller.counter !== undefined || controller.counter !== null) {
                if (!controller.validateAttributes()) {
                    return;
                }
            }

            function onResizeElement() {
                controller.onWindowResizeSize();
            }

            //checks if the menu must be oppenned on the left or right
            controller.checkOpenPos = function () {
                var winWidth = angular.element($window).width();
                if (winWidth) {
                    var elementLeftPosition = 0;
                    if (controller.collapseButtonElement) {
                        var pos = controller.collapseButtonElement.getBoundingClientRect();
                        if (pos) {
                            if (pos.left) {
                                elementLeftPosition = pos.left;
                            }
                        }
                    }
                    if (elementLeftPosition + $('#sit-commandbar-collapse-menu').width() <= winWidth) {
                        controller.openLeft = true;
                    } else {
                        controller.openLeft = false;
                    }
                } else {
                    controller.openLeft = false;
                }
                return controller.openLeft;
            };

            function truncateLabel() {
                function ellipsisText(e) {
                    //retrieve text from DOM
                    var wordArray = e.innerHTML.split(" ");
                    //height comparision
                    while (e.scrollHeight > e.offsetHeight) {
                        wordArray.pop();
                        //update innerHTML for height comparision
                        e.innerHTML = wordArray.join(" ") + ("...");
                        //update array
                        wordArray[wordArray.length - 1] = wordArray[wordArray.length - 1].trim() + "...";
                    }
                    //width comparision
                    var MAX_LINE_CHARACTERS = 10;
                    if (e.scrollHeight === e.offsetHeight) {
                        wordArray.forEach(function (word, index) {
                            if (word.trim().length > MAX_LINE_CHARACTERS) {
                                wordArray[index] = word.trim().substring(0, 8) + '...';
                            }
                        });
                    }
                    e.innerHTML = wordArray.join(" ");
                }
                [].forEach.call(element.find(".vertical-group-main-command-label, .vertical-group-command-label, .vertical-command-label"), function (elem) {
                    ellipsisText(elem);
                });
            }

            function updateContext() {
                if (scope.$root.$$phase !== '$apply' && scope.$root.$$phase !== '$digest') {
                    scope.$apply();
                }
            }

            controller.barElement = element[0].firstElementChild;
            controller.__width = controller.barElement.offsetWidth;
            onResizeElement();
            controller.collapseButtonElement = element[0].querySelectorAll('#collapse-button-command-bar')[0];
            controller.checkOpenPos();

            //watches on object structure modification
            listners[listners.length] = scope.$watch(function () {
                return controller.commands;
            }, function () {
                controller.calculateCutOff();
                if (controller.layout === 'vertical') {
                    $timeout(truncateLabel, 250);
                    if (element.parents('div[ui-view=Canvas]').length === 1 && controller.verticalFixedPosition) {
                        commandBarService.updateCommands(controller.commands);
                    }
                }
            }, true);

            listners[listners.length] = scope.$on('sit-layout-change', function (event, args) {
                if (args.eventSource === 'layout') {
                    $timeout(onResizeElement, 100);
                    controller.calculateCutOff();
                }
            });

            if (controller.layout === 'vertical') {
                listners[listners.length] = scope.$on('sit-commandbar-toggle-label', function (event, args) {
                    controller.commands.bar.forEach(function (item) {
                        if (item.hasOwnProperty('isVerticalCommandLabelShown')) {
                            item.isVerticalCommandLabelShown = args.isLabelShown;
                            controller.isVerticalCommandLabelShown = item.isVerticalCommandLabelShown;
                        }
                    });
                    updateContext();
                    controller.calculateCutOff();
                });
            }

            scope.$on('$destroy', function () {
                for (var index in listners) {
                    listners[index]();
                }
                if (controller.layout === 'vertical' && element.parents('div[ui-view=Canvas]').length === 1 && --SitCommandBarDirective.globalCommandBarInstances <= 0) {
                    if (element.parents('div[ui-view=Canvas]').siblings('.global-vertical-command-bar').length
                        || element.parents('.canvas-scroll-view').siblings('.global-vertical-command-bar').length) {
                        commandBarService.hide();
                        SitCommandBarDirective.globalCommandBarInstances = 0;
                    }
                }
            });
        }
        return {
            bindToController: {
                commands: '=?sitCommands',
                labelAlign: '@sitLabelAlign',
                type: '@sitType',
                layout: '@sitLayout',
                verticalFixedPosition: '=?sitVerticalAutofixed'
            },
            controller: CommandBarController,
            controllerAs: 'commandBarCtrl',
            link: {
                pre: preLink,
                post: postLink
            },
            restrict: 'E',
            scope: {},
            templateUrl: 'common/widgets/commandBar/command-bar.html',
            transclude: true
        };
    }
    angular.module('siemens.simaticit.common.widgets.commandBar').directive('sitCommandBar', SitCommandBarDirective);
})();

(function () {
    'use strict';
    //#region ng-doc comments
    /**
    *   @ngdoc directive
    *   @name sitCommand
    *   @module siemens.simaticit.common.widgets.commandBar
    *   @description Name of the directive related to a command.
    *
    *   @usage
    *   ```
    *       <sit-command
    *           sit-type="command"
    *           sit-name="commandEdit"
    *           sit-tooltip="Edit Material"
    *           ng-show="false"
    *           sit-icon="fa-edit"
    *           svg-icon="common/icons/cmdEdit24.svg"
    *           sit-unauthorized-behavior="disable"
    *           ng-click="vm.editFunction">edit
    *       </sit-command>
    *   ```
    *
    *   ```
    *       <sit-command
    *           sit-type="toggle"
    *           sit-name="toggleEdit"
    *           sit-tooltip="toggle"
    *           ng-show="true"
    *           sit-selected="false"
    *           sit-icon="fa-toggle-on"
    *           svg-icon="common/icons/cmdEdit24.svg"
    *           ng-click="vm.editFunction">toggle
    *       </sit-command>
    *    ```
    *
    *   @restrict E
    *
    *   @param {string} sit-type Type of commands included in the command bar.
    *
    *   Possible options are:
    *   * **command** - Standard command button.
    *   * **sep** - Command bar separator.
    *   * **main** - The principle command button displayed on the screen.
    *   * **toggle** –  Command button with on/off status.
    *   @param {string} sit-name The complete name of the command (including the namespace).
    *   @param {string} sit-tooltip The tooltip of the command button. The default value is the label of the command.
    *   @param {boolean} [ng-show=true] Determines whether the command button should be shown or hidden.
    *   @param {string} [svg-icon] SVG icon to be displayed for the command button.
    *   @param {string} [cmd-icon] Command svg icon to be displayed for the command button. This is used only if the svg-icon is not provided.
    *   @param {string} [sit-icon=fa-cogs] One or more CSS classes corresponding to the icon to display for the command button. This is used only if both svg-icon and cmd-icon are not specified.
    *   @param {string} [sit-icon-template] For internal use.
    *   @param {boolean} [sit-selected=false] The selection of the command button of type **toggle** puts a border around the command.
    *   @param {string} sit-unauthorized-behavior The behavior to be followed when the user is not authorized to invoke given command.
    *   Possible values are:
	*
	*   * **show** – (default) The command button is always displayed, no checks are performed.
	*   * **hide** – The command button is not displayed if **sit-type** is not set or if it is set to a value different from
    *   **sep** and the current user does not have the rights to execute the command specified in **sit-name** (**sit-name** must
    *   be set to the command FullName)
	*   * **disable** – The command button is displayed but it is disabled if **sit-type** is not set or if it is set to a value
    *   different from **sep** and the current user does not have the rights to execute the command specified in **sit-name**
    *   (**sit-name** must be set to the command FullName)

    *   @param {Function} ng-click The function to be called on clicking the command.
    *   @param {string} value Label to be shown with the command.
    *   @param {Object} badge The notification alert (badge) to be displayed on the top right corner of the command icon.
    *   The object should have the following properties:
    *   * **state** – The type of badge which has to be displayed. Currently widget supports "information" type only.
	*   * **value** – The number that has to be displayed in the badge.
    *
    * **Note** : The badges are supported for Contextual command bar having command buttons that contains only an icon.
    *
    */
    /*
    * NOTE: As discussed with Fabio C., only the "markup" configuration must be documented.
    * The following parameters and example must not appear in the docs.
    *   @param {object} command JSON object that describes the command bar.
    *   @param {string} showas Defines if the group is displayed as a **Button** or a **Menu**.
    *   @param {string} bartype Type of commands included in the command bar (**Action** or **Tool** commands).
    *   @param {function} onClickCallback JavaScript function that is called when a command button is clicked.
    *   ### Using a configuration object
    *   ```
    *   <html>
    *   <script>
    *
    *   var command =
    *           {
    *                  "type": "Command",
    *                  "label": "Edit",
    *                  "name": "toggleEdit",
    *                  "tooltip": "Edit Material",
    *                  "visibility": false,
    *                  "image": "fa-edit",
    *                  "onClickCallback": editFunction
    *           };
    *
    *   </script>
    *
    *           <sit-command sit-command='command' sit-showas='Menu' sit-bartype='Action'></sit-command>
    *
    *   </html>
    *
    *   ```
    *
    */
    //#endregion
    CommandController.$inject = ['$state', 'common'];
    function CommandController($state, common) {
        var vm = this;
        vm.logErrorFn = logErrorFn;

        function logErrorFn(message, attributes) {
            common.logger.logError(message, attributes, 'siemens.simaticit.common.widgets.commandBar command');
        }

        function isFunction(functionToCheck) {
            var getType = {};
            return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        }

        vm.commandClicked = _.debounce(onCommandClick, 200, true);

        function onCommandClick(command, $event) {
            if (!command.disabled) {//execute command callback only if command is not disabled
                if (command.type === 'toggle') {
                    command.selected = !command.selected;
                    if (vm.showas === 'Menu') {
                        $event.stopPropagation();
                    }
                }
                // Check if the property stateTransition exists
                if (command.stateTransition !== null && command.stateTransition !== undefined) {
                    if (typeof command.stateTransition !== 'string') {
                        $state.go(command.stateTransition.to, command.stateTransition.params, command.stateTransition.options);
                    }
                } else if (command.hasOwnProperty('onClickCallback')) {
                    if (isFunction(command['onClickCallback'])) {
                        command['onClickCallback'](command);
                    } else {
                        var msg = 'onClickCallback is not a function on command "' + command.name + '": \n';
                        var data = { command: command };
                        logErrorFn(msg, data);
                    }
                }
            }
        }
    }
    SitCommandDirective.$inject = ['common.services.security.securityService', 'common.services.security.functionRightModel'];
    function SitCommandDirective(securityService, functionRightModel) {
        function preLink(scope, element, attrs, controllers) {
            var sitCommandBarCtrl = controllers[0];
            var sitCommandCtrl = controllers[1];
            var sitCommandGroupCtrl = controllers[2];

            if ((sitCommandCtrl.command === undefined || sitCommandCtrl.command === null) && (sitCommandGroupCtrl === undefined || sitCommandGroupCtrl === null)) {
                sitCommandCtrl.index = sitCommandBarCtrl.counter++;
            }
        }
        function postLink(scope, element, attrs, controllers) {
            var sitCommandBarCtrl = controllers[0];
            var sitCommandCtrl = controllers[1];
            var sitCommandGroupCtrl = controllers[2];
            sitCommandCtrl.layout = sitCommandBarCtrl.layout;
            sitCommandCtrl.toggleImage = {
                path: 'common/icons/cmdCheckmark16.svg'
            };
            if (sitCommandCtrl.command && !sitCommandCtrl.command.displayIcon) {
                sitCommandCtrl.command.displayIcon = null;
                if (!sitCommandCtrl.command.image && sitCommandCtrl.layout !== 'contextual') {
                    sitCommandCtrl.command.image = 'fa-cogs';
                }
                if (sitCommandCtrl.command.svgIcon) {
                    sitCommandCtrl.command.displayIcon = {
                        path: sitCommandCtrl.command.svgIcon,
                        size: '16px'
                    }
                }
                if (!sitCommandCtrl.command.displayIcon && sitCommandCtrl.command.cmdIcon) {
                    sitCommandCtrl.command.displayIcon = { prefix: 'cmd', name: sitCommandCtrl.command.cmdIcon, suffix: '24', size: '16px' };
                }
            }
            if (sitCommandCtrl.command && sitCommandCtrl.command.displayIcon && (sitCommandCtrl.layout === 'vertical' || sitCommandCtrl.layout === 'contextual')) {
                sitCommandCtrl.command.displayIcon.size = '24px';
            }
            var commands = {
                main: 'main',
                mainCommand: 'MainCommand',
                MainCommand: 'MainCommand',
                sep: 'sep',
                Sep: 'Sep',
                command: 'command',
                Command: 'Command',
                toggle: 'toggle'
            };
            var isUserAuthorized = false;

            function getCommandType(type) {
                switch (type) {
                    case 'main':
                    case 'MainCommand':
                        return commands.mainCommand;
                    case 'sep':
                    case 'Sep':
                        return commands.Sep;
                    case 'command':
                    case 'Command':
                        return commands.Command;
                    case 'toggle':
                        return commands.toggle;
                    default:
                        return commands.Command;
                }
            }
            function initializeCommandProperties() {
                sitCommandCtrl.command.displayIcon = null;
                var transcludedElement = element.find('div[ng-transclude]');
                var label = transcludedElement.html();
                if (label.trim() !== "") {//if the directive value is provided, take that as label
                    sitCommandCtrl.command.label = label;
                } else {
                    sitCommandCtrl.command.label = sitCommandCtrl.label;
                }
                if (sitCommandCtrl.svgIcon) {
                    sitCommandCtrl.command.displayIcon = {
                        path: sitCommandCtrl.svgIcon,
                        size: '16px'
                    };
                }
                if (!sitCommandCtrl.command.displayIcon && sitCommandCtrl.cmdIcon) {
                    sitCommandCtrl.command.displayIcon = { prefix: 'cmd', name: sitCommandCtrl.cmdIcon, suffix: '24', size: '16px' };
                }
                if (sitCommandCtrl.command && sitCommandCtrl.command.displayIcon && (sitCommandCtrl.layout === 'vertical' || sitCommandCtrl.layout === 'contextual')) {
                    sitCommandCtrl.command.displayIcon.size = '24px';
                }
                sitCommandCtrl.command.deniedFromAuthorization = false;
                sitCommandCtrl.command.name = sitCommandCtrl.name;
                sitCommandCtrl.command.tooltip = sitCommandCtrl.tooltip;
                sitCommandCtrl.command.visibility = sitCommandCtrl.visibility !== undefined && sitCommandCtrl.visibility !== null ? sitCommandCtrl.visibility : true;

                if (sitCommandCtrl.icon) {
                    sitCommandCtrl.command.image = sitCommandCtrl.icon;
                } else {
                    if (sitCommandCtrl.layout !== 'contextual') {
                        sitCommandCtrl.command.image = "fa-cogs";
                    } else {
                        sitCommandCtrl.command.image = "";
                    }
                }

                sitCommandCtrl.command.imageTemplate = sitCommandCtrl.iconTemplate ? sitCommandCtrl.iconTemplate : null;
                sitCommandCtrl.command.onClickCallback = sitCommandCtrl.method();
                sitCommandCtrl.command.unauthorizedBehavior = sitCommandCtrl.unauthorizedBehavior;
                sitCommandCtrl.command.selected = sitCommandCtrl.selected !== undefined && sitCommandCtrl.selected === true ? sitCommandCtrl.selected : false;
                if (sitCommandCtrl.layout === 'vertical') {
                    sitCommandCtrl.command.isVerticalCommandLabelShown = sitCommandBarCtrl.showLabel;
                }
            }

            if (sitCommandCtrl.command === undefined || sitCommandCtrl.command === null) {
                sitCommandCtrl.command = {};
                sitCommandCtrl.command.type = getCommandType(sitCommandCtrl.type);
                if (sitCommandCtrl.command.type !== commands.Sep) {
                    initializeCommandProperties();
                }
                if (sitCommandGroupCtrl !== undefined && sitCommandGroupCtrl !== null) {
                    sitCommandGroupCtrl.onCommandAddedToGroup(sitCommandCtrl.command);
                } else {
                    sitCommandBarCtrl.onCommandAdded(sitCommandCtrl);
                }
            }

            //sets the default value of visibility of the command
            if (!sitCommandCtrl.command.hasOwnProperty('visibility')) {
                sitCommandCtrl.command.visibility = true;
            }

            if (sitCommandCtrl.layout === 'vertical' && !sitCommandCtrl.command.hasOwnProperty('isVerticalCommandLabelShown')) {
                sitCommandCtrl.command.isVerticalCommandLabelShown = sitCommandBarCtrl.showLabel;
            }

            if (sitCommandBarCtrl.labelAlign) {
                sitCommandCtrl.labelAlign = sitCommandBarCtrl.labelAlign.toLowerCase();
            }

            var badge = sitCommandCtrl.command.badge || sitCommandCtrl.badge || null;
            if (badge) {
                sitCommandCtrl.command.badge = sitCommandCtrl.command.badge || {};
                sitCommandCtrl.command.badge.state = badge.state || 'information';
                sitCommandCtrl.command.badge.value = badge.value || 0;
            }

            //Authorization Integration Enhancements
            sitCommandCtrl.command.disabled = typeof sitCommandCtrl.command.disabled === 'boolean' ? sitCommandCtrl.command.disabled : false;//by default, every command is enabled
            if (!sitCommandCtrl.command.unauthorizedBehavior) {//the default value of unauthorizedBehavior of the command is 'show'
                sitCommandCtrl.command.unauthorizedBehavior = 'show';
            }
            if (sitCommandCtrl.command.type in commands && sitCommandCtrl.command.type !== commands.Sep && sitCommandCtrl.command.unauthorizedBehavior !== 'show') {
                //when unauthorizedBehavior is 'show', there is no need to check for user authorization
                //check if user is authorized
                var functionRight = new functionRightModel("business_command", sitCommandCtrl.command.name, "invoke");
                var funRightListModel = [functionRight];
                securityService.canPerformOp(funRightListModel).then(function (data) {
                    if (data) {
                        if (data.length > 0) {
                            isUserAuthorized = data[0].isAccessible;
                            if (!isUserAuthorized && sitCommandCtrl.command.unauthorizedBehavior === 'disable') {
                                sitCommandCtrl.command.disabled = true;
                            }
                            if (!isUserAuthorized && sitCommandCtrl.command.unauthorizedBehavior === 'hide') {
                                sitCommandCtrl.command.deniedFromAuthorization = true;
                                sitCommandCtrl.command.visibility = false;
                            }
                        }
                    }
                }, function (error) {
                    sitCommandCtrl.logErrorFn('-1: Command Error: user data is not present1', error);
                });
            }

            //watch on visibility in case of command behind a group button. group button must be hidded if there is no more commands behind
            if (typeof scope.$parent.setVisibility === 'function') {
                scope.$watch(function () {
                    return sitCommandCtrl.command.visibility;
                },
                    function () {
                        scope.$parent.setVisibility(sitCommandCtrl.command);
                    });
            }
            scope.$watch(function () {
                return sitCommandCtrl.visibility;
            },
                function () {
                    if (sitCommandCtrl.visibility !== undefined && sitCommandCtrl.visibility !== null) {
                        sitCommandCtrl.command.visibility = sitCommandCtrl.visibility;
                    }
                });

        }
        return {
            bindToController: {
                command: '=?sitCommand',
                showas: '@sitShowas',
                bartype: '@sitBartype',
                method: '&ngClick',
                visibility: '=?ngShow',
                selected: '=?sitSelected',
                type: '@sitType',
                icon: '@sitIcon',
                name: '@sitName',
                label: '@sitLabel',
                tooltip: '@sitTooltip',
                iconTemplate: '@sitIconTemplate',
                unauthorizedBehavior: '@sitUnauthorizedBehavior',
                svgIcon: '@svgIcon',
                cmdIcon: '@cmdIcon',
                badge: '=?sitBadge'
            },
            controller: CommandController,
            controllerAs: 'cmdCtrl',
            link: {
                pre: preLink,
                post: postLink
            },
            restrict: 'E',
            require: ['^sitCommandBar', 'sitCommand', '^?sitCommandGroup'],
            scope: {},
            //templateUrl: 'common/widgets/commandBar/command.html',
            template:
                ['<div ng-transclude class="command-hide"></div>',
                    '<div ng-switch="cmdCtrl.showas" ng-show="cmdCtrl.command.visibility && !cmdCtrl.command.deniedFromAuthorization">',
                    '<div ng-switch-when="Button" id="Button{{cmdCtrl.command.type}}{{cmdCtrl.command.name}}"',
                    'ng-class="{\'vertical-button\': cmdCtrl.layout === \'vertical\',',
                    '\'contextual-button\': cmdCtrl.layout=== \'contextual\'}">',
                    '<button data-internal-type="command-button-command-bar"',
                    'ng-class="{\'{{cmdCtrl.command.type}}ActionButton\': cmdCtrl.bartype === \'Action\' && cmdCtrl.layout === \'horizontal\',',
                    '\'{{cmdCtrl.command.type}}ToolButton\': cmdCtrl.bartype === \'Tool\' && cmdCtrl.layout === \'horizontal\',',
                    '\'toggle\': cmdCtrl.command.type === \'toggle\' && cmdCtrl.command.selected,',
                    '\'vertical-command-button\': cmdCtrl.layout === \'vertical\',',
                    '\'contextual-command-button\': cmdCtrl.layout === \'contextual\'}"',
                    'ng-click="cmdCtrl.commandClicked(cmdCtrl.command, $event)" title="{{cmdCtrl.command.tooltip || cmdCtrl.command.label}}"',
                    'ng-disabled="cmdCtrl.command.disabled">',
                    '<span data-internal-type="image-container" ng-if="(cmdCtrl.command.image || cmdCtrl.command.displayIcon) && !cmdCtrl.command.imageTemplate"',
                    'class="fa-lg MainCommandImage">',
                    '<em class="fa {{cmdCtrl.command.image}}" sit-mom-icon="cmdCtrl.command.displayIcon" sit-class="command-mom-icon"',
                    'ng-class="{momIcon: cmdCtrl.command.displayIcon !== null,',
                    '\'vertical-command-image\': cmdCtrl.layout === \'vertical\' && (cmdCtrl.command.label.length===0 || !cmdCtrl.command.isVerticalCommandLabelShown),',
                    '\'contextual-command-image\': cmdCtrl.layout === \'contextual\' && (cmdCtrl.command.label.length===0),',
                    '\'contextual-command-label-image\': cmdCtrl.layout === \'contextual\' && (cmdCtrl.command.label.length===0 ),',
                    '\'vertical-command-label-image\': cmdCtrl.layout=== \'vertical\' && cmdCtrl.command.label.length!==0 && cmdCtrl.command.isVerticalCommandLabelShown}"></em>',
                    '<span ng-if="cmdCtrl.command.isVerticalCommandLabelShown && cmdCtrl.layout=== \'vertical\' && cmdCtrl.command.label.length>0"',
                    'class="vertical-command-label">',
                    '{{ cmdCtrl.command.label }}',
                    '</span>',
                    '</span>',
                    '<span ng-if="cmdCtrl.layout === \'contextual\' && cmdCtrl.command.label.length > 0 && !cmdCtrl.command.imageTemplate"',
                    'class="contextual-command-label"',
                    'ng-class="{\'margin-fix\': !cmdCtrl.command.image && !cmdCtrl.command.imageTemplate,',
                    '\'margin-top-fix\': cmdCtrl.command.image || cmdCtrl.command.imageTemplate}">',
                    '{{ cmdCtrl.command.label }}',
                    '</span>',
                    '<span data-internal-type="image-container" ng-if="cmdCtrl.command.imageTemplate"',
                    'class= "fa-lg" ng-bind-html="cmdCtrl.command.imageTemplate"',
                    'ng-class="{\'{{cmdCtrl.command.type}}ToolImage\' :cmdCtrl.bartype === \'Tool\' && cmdCtrl.layout === \'horizontal\',',
                    '\'right-align-Tool-image\': cmdCtrl.labelAlign === \'right\' && cmdCtrl.layout === \'horizontal\',',
                    '\'vertical-image-template\': cmdCtrl.layout === \'vertical\' && (cmdCtrl.command.label.length === 0 || !cmdCtrl.command.isVerticalCommandLabelShown),',
                    '\'contextual-image-template\': cmdCtrl.layout === \'contextual\' ,',
                    '\'vertical-image-template-label\': cmdCtrl.layout === \'vertical\' && cmdCtrl.command.label.length !== 0 && cmdCtrl.command.isVerticalCommandLabelShown}">',
                    '</span>',
                    '<span ng-if="cmdCtrl.layout === \'contextual\' && cmdCtrl.command.label.length>0 && cmdCtrl.command.imageTemplate"',
                    'class="contextual-command-label">',
                    '{{ cmdCtrl.command.label }}',
                    '</span>',
                    '<span ng-if="cmdCtrl.layout === \'vertical\' && cmdCtrl.command.label.length>0 &&',
                    'cmdCtrl.command.imageTemplate && cmdCtrl.command.isVerticalCommandLabelShown"',
                    'class="vertical-command-label">',
                    '{{ cmdCtrl.command.label }}',
                    '</span>',
                    '<span data-internal-type="text-container"',
                    'ng-if="(cmdCtrl.bartype==\'Tool\' || cmdCtrl.command.type==\'MainCommand\')&& cmdCtrl.layout === \'horizontal\'"',
                    'class="{{cmdCtrl.command.type}}{{cmdCtrl.bartype}}Label">{{cmdCtrl.command.label}}</span>',
                    '<span ng-if="cmdCtrl.command.badge && !cmdCtrl.command.label" class="notification-alert-badge">{{cmdCtrl.command.badge.value}}</span>',
                    '</button>',
                    '</div>',
                    '<div ng-switch-when="Menu">',
                    ' <div data-internal-type="command-menu-command-bar" type="button"',
                    'ng-class="{\'btnMainMenu btnMenu\': cmdCtrl.command.type===\'MainCommand\',',
                    '\'btnMenu\': cmdCtrl.command.type!==\'MainCommand\', \'toggle-dropdown-selected-background\' : cmdCtrl.command.selected}"',
                    'ng-click="cmdCtrl.commandClicked(cmdCtrl.command, $event)"',
                    'title="{{cmdCtrl.command.tooltip || cmdCtrl.command.label}}" ng-disabled="cmdCtrl.command.disabled">',
                    '<span data-internal-type="image-container" sit-mom-icon="cmdCtrl.command.displayIcon" sit-class="command-menu-mom-icon"',
                    'ng-class="{momIcon: cmdCtrl.command.displayIcon !== null }"',
                    'ng-if="(cmdCtrl.layout === \'horizontal\' || cmdCtrl.layout === \'contextual\' ) && (cmdCtrl.command.image || cmdCtrl.command.displayIcon ) && !cmdCtrl.command.imageTemplate"',
                    'class="fa {{cmdCtrl.command.image}}"></span>',
                    '<span data-internal-type="image-container" sit-mom-icon="cmdCtrl.command.displayIcon" sit-class="command-menu-mom-icon"',
                    'ng-class="{momIcon: cmdCtrl.command.displayIcon !== null }"',
                    'ng-if="(cmdCtrl.layout === \'horizontal\' || cmdCtrl.layout === \'contextual\') && cmdCtrl.command.imageTemplate"',
                    'ng-bind-html="cmdCtrl.command.imageTemplate">TTTT</span>',
                    '<label data-internal-type="text-container" class="menuLabel" onclick="event.preventDefault();"',
                    'ng-class="!cmdCtrl.command.image && cmdCtrl.labelAlign === \'right\' ? \'menu-label-icon-margin\' : \'menu-label-margin\'">',
                    '{{cmdCtrl.command.label}}',
                    '<input type="checkbox" ng-if= "cmdCtrl.layout === \'horizontal\'" style="float:right" ng-show="cmdCtrl.command.type === \'toggle\'"',
                    'ng-click="cmdCtrl.commandClicked(cmdCtrl.command, $event)" ng-checked="cmdCtrl.command.selected" />',
                    '<em ng-if= "cmdCtrl.layout !== \'horizontal\'" class= "toggle-dropdown-image" sit-mom-icon="cmdCtrl.toggleImage" sit-class="svg-icon"',
                    'ng-show="cmdCtrl.command.type === \'toggle\' && cmdCtrl.command.selected"',
                    'ng-click="cmdCtrl.commandClicked(cmdCtrl.command, $event)"/>',
                    '</label>',
                    ' </div>',
                    '</div>',
                    '</div>'].join('\n'),
            transclude: true
        };
    }
    angular.module('siemens.simaticit.common.widgets.commandBar').directive('sitCommand', SitCommandDirective);
})();

(function () {
    'use strict';
    //#region ng-doc comments
    /**
     *   @ngdoc directive
     *   @name sitCommandGroup
     *   @module siemens.simaticit.common.widgets.commandBar
     *   @description _(Internal)_ Name of the directive related to a group of commands.
     *   @example
     *   ```
     * <sit-command-group sit-label="group1" sit-name="My group name 1" sit-tooltip="CommandBar Group" svg-icon="common/icons/cmdOpen24.svg" sit-icon="fa-truck" sit-type="group">
     *      <sit-command ng-click="cbDevCtrl.callback" ng-show="true" sit-icon="fa-truck"
     *      sit-label="command2" sit-name="command2" sit-tooltip="command" sit-type="command "></sit-command>
     *      <sit-command ng-click="cbDevCtrl.callback" ng-show="true" sit-icon="fa-users" sit-label="command3"
     *      sit-name="command3" sit-tooltip="command" sit-type="command "></sit-command>
     *      <sit-command ng-click="cbDevCtrl.callback" sit-icon="fa-users" sit-label="command4"
     *      sit-name="command4" sit-tooltip="command" sit-type="command "></sit-command>
     * </sit-command-group>
     * <sit-command-group sit-label="group2" sit-name="Main group name" sit-tooltip="CommandBar Group" svg-icon="common/icons/cmdDelete24.svg" cmd-icon="Open"
     * sit-type="group" ng-click="cbDevCtrl.callback">
     *      <sit-command sit-type="main" ng-click="cbDevCtrl.callback" ng-show="true" sit-icon="fa-truck"
     *      sit-label="Main command2" sit-name="command2" sit-tooltip="Main command"></sit-command>
     *      <sit-command sit-type="main" ng-click="cbDevCtrl.callback" ng-show="true" sit-icon="fa-users"
     *      sit-label="Main command3" sit-name="command3" sit-tooltip="Main command"></sit-command>
     *      <sit-command sit-type="main" ng-click="cbDevCtrl.callback" sit-icon="fa-users" sit-label="Main command4"
     *      sit-name="command4" sit-tooltip="Main command"></sit-command>
     * </sit-command-group>
     *   ```
     *   @restrict E
     *
     *   @param {string} sit-type Type of commands included in the command bar (**group** commands).
     *   @param {string} sit-label Label to be shown with the group.
     *   @param {string} sit-tooltip The tooltip of the command group button. The default value is the label of the command group button.
     *   @param {string} sit-name The complete name of the group (including name space), used only as an ID for group.
     *   @param {string} svg-icon The SVG icon to be displayed as the group icon.
     *   @param {string} cmd-icon The command icon to be displayed as the group icon. This has the second priority after the svg-icon.
     *   @param {string} sit-icon The group icon to be displayed (via FontAwesome icon set). This has the least priority. It is used if neither svg-icon nor cmd-icon is specified.
     */
    /*
    * NOTE: As discussed with Fabio C., only the "markup" configuration must be documented.
    * The following parameters and example must not appear in the docs.
    *
    *   @param {object} command Set of commands included within the group and displayed using a flyout menu.
    *   @param {string} showas Define if the group is diplayed as a **Button** or a **Menu**.
    *   @param {string} bartype Type of commands included in the command-bar (**Action** or **Tool** commands).
    *
    *   #### Using a configuration object
    *   ```
    *   <html>
    *
    *   <script>
    *
    *   var command =
    *       {
    *              "type": "Group",
    *              "label": "Group 1",
    *              "name": "My group name",
    *              "tooltip": "Command Group"
    *              "image": "fa-truck",
    *              'svgIcon':"common/icons/cmdDelete24.svg",
    *              'cmdIcon':'Open',
    *              "group": [
    *                      {
    *                          "label": "command2",
    *                          "name": "com.siemens.customcommand.command2",
    *                          "image": "fa-truck",
    *                          "visibility": true,
    *                          "type": "Command",
    *                          'onClickCallback': callback
    *                      },
    *                      {
    *                          "label": "command3",
    *                          "name": "com.siemens.customcommand.command3",
    *                          "image": "fa-users",
    *                          "visibility": true,
    *                          "type": "Command",
    *                          'onClickCallback': callback
    *                      },
    *                      {
    *                          "label": "command4",
    *                          "name": "com.siemens.customcommand.command4",
    *                          "image": "fa-users",
    *                          "type": "Command",
    *                          'onClickCallback': callback
    *                       }
    *               ]
    *       };
    *
    *   </script>
    *
    *           <sit-command-group sit-command='command' sit-showas='Menu' sit-bartype='Tool'></sit-command-group>
    *
    *   </html>
    */
    //#endregion
    commandGroupController.$inject = ['$scope', '$window', '$state', 'common'];
    function commandGroupController($scope, $window, $state, common) {
        var win = angular.element($window);
        var vm = this;
        vm.logErrorFn = logErrorFn;

        function logErrorFn(message, attributes) {
            common.logger.logError(message, attributes, 'siemens.simaticit.common.widgets.commandBar command');
        }

        function activate() {
            vm.winWidth = win.width();
            if (vm.group) {
                vm.mainCommandGroup = _.findWhere(vm.group.group, { type: "MainCommand" });
                vm.isMainCommandGroup = _.isObject(vm.mainCommandGroup) ? true : false;
            }
            if (vm.checkOpenPos) {
                vm.checkOpenPos();
            }
            //listener to the resize event to detect resizing
            angular.element($window).bind('resize', windowResize);
        }

        function windowResize() {
            vm.winWidth = win.width();
            if (vm.checkOpenPos) {
                vm.checkOpenPos();
            }
        }
        activate();

        vm.commandClicked = _.debounce(onMainGroupBtnClick, 200, true);
        function onMainGroupBtnClick(group, $event) {
            if (group.stateTransition !== null && group.stateTransition !== undefined) {
                if (typeof group.stateTransition !== 'string') {
                    $state.go(group.stateTransition.to, group.stateTransition.params, group.stateTransition.options);
                }
            } else if (group.hasOwnProperty('onClickCallback')) {
                if ($.isFunction(group['onClickCallback'])) {
                    group['onClickCallback'](group);
                } else {
                    var msg = 'onClickCallback is not a function on command "' + group.name + '": \n';
                    var data = {
                        group: group
                    };
                    logErrorFn(msg, data);
                }
            }
        }


        $scope.$on('$destroy', function () {
            angular.element($window).unbind('resize', windowResize);
        });
    }
    function commandGroup() {
        function preLink(scope, element, attrs, controllers) {
            var sitCommandBarCtrl = controllers[0];
            var sitCommandGroupCtrl = controllers[1];
            sitCommandGroupCtrl.layout = sitCommandBarCtrl.layout;
            if (sitCommandGroupCtrl.group && !sitCommandGroupCtrl.group.displayIcon) {
                sitCommandGroupCtrl.group.displayIcon = null;
                if (!sitCommandGroupCtrl.group.image && sitCommandGroupCtrl.layout !== 'contextual') {
                    sitCommandGroupCtrl.group.image = 'fa-cogs';
                }
                if (sitCommandGroupCtrl.group.svgIcon) {
                    sitCommandGroupCtrl.group.displayIcon = {
                        path: sitCommandGroupCtrl.group.svgIcon,
                        size: '16px'
                    };
                }
                if (!sitCommandGroupCtrl.group.displayIcon && sitCommandGroupCtrl.group.cmdIcon) {
                    sitCommandGroupCtrl.group.displayIcon = { prefix: 'cmd', name: sitCommandGroupCtrl.group.cmdIcon, suffix: '24', size: '16px' };
                }
            }
            if ((sitCommandGroupCtrl.layout === 'vertical' || sitCommandGroupCtrl.layout === 'contextual') && sitCommandGroupCtrl.group && sitCommandGroupCtrl.group.displayIcon) {
                sitCommandGroupCtrl.group.displayIcon.size = '24px'
            }
            if (sitCommandGroupCtrl.group === undefined || sitCommandGroupCtrl.group === null) {
                sitCommandGroupCtrl.group = {};
                sitCommandGroupCtrl.group.displayIcon = null;
                if (sitCommandGroupCtrl.svgIcon) {
                    sitCommandGroupCtrl.group.displayIcon = {
                        path: sitCommandGroupCtrl.svgIcon,
                        size: '16px'
                    };
                }
                if (!sitCommandGroupCtrl.group.displayIcon && sitCommandGroupCtrl.cmdIcon) {
                    sitCommandGroupCtrl.group.displayIcon = { prefix: 'cmd', name: sitCommandGroupCtrl.cmdIcon, suffix: '24', size: '16px' };
                }
                if ((sitCommandGroupCtrl.layout === 'vertical' || sitCommandGroupCtrl.layout === 'contextual') && sitCommandGroupCtrl.group.displayIcon) {
                    sitCommandGroupCtrl.group.displayIcon.size = '24px'
                }

                if (sitCommandGroupCtrl.icon) {
                    sitCommandGroupCtrl.group.image = sitCommandGroupCtrl.icon;
                } else {
                    if (sitCommandGroupCtrl.layout !== 'contextual') {
                        sitCommandGroupCtrl.group.image = "fa-cogs";
                    } else {
                        sitCommandGroupCtrl.group.image = '';
                    }
                }

                sitCommandGroupCtrl.group.imageTemplate = sitCommandGroupCtrl.iconTemplate ? sitCommandGroupCtrl.iconTemplate : null;
                sitCommandGroupCtrl.group.label = sitCommandGroupCtrl.label;
                sitCommandGroupCtrl.group.tooltip = sitCommandGroupCtrl.tooltip;
                sitCommandGroupCtrl.group.name = sitCommandGroupCtrl.name;
                sitCommandGroupCtrl.group.type = 'Group';
                sitCommandGroupCtrl.group.onClickCallback = sitCommandGroupCtrl.method();
                sitCommandGroupCtrl.group.group = [];
                sitCommandGroupCtrl.onCommandAddedToGroup = function (command) {
                    sitCommandGroupCtrl.group.group[sitCommandGroupCtrl.group.group.length] = command;
                    sitCommandGroupCtrl.group.group = _.uniq(sitCommandGroupCtrl.group.group);
                    sitCommandGroupCtrl.sendGroupToCommandBar = true;
                };
                sitCommandGroupCtrl.index = controllers[0].counter++;
            }
        }
        function postLink(scope, element, attrs, controllers) {
            var sitCommandBarCtrl = controllers[0];
            var sitCommandGroupCtrl = controllers[1];
            if (sitCommandGroupCtrl.sendGroupToCommandBar) {
                sitCommandBarCtrl.onGroupAdded(sitCommandGroupCtrl);
            }
            sitCommandGroupCtrl.groupButtonElement = element[0];

            //check if menu must be oppenned at left or right
            sitCommandGroupCtrl.checkOpenPos = function () {
                if (sitCommandGroupCtrl.winWidth) {
                    var elementLeftPosition = 0, dropDownLength = 0;
                    if (sitCommandGroupCtrl.groupButtonElement) {

                        if (sitCommandGroupCtrl.layout === 'contextual' && $(sitCommandGroupCtrl.groupButtonElement).parents('.property-area-container').length > 0) {

                            dropDownLength = $(sitCommandGroupCtrl.groupButtonElement).find('.commandBarDropdownMenu').width();

                            if ($(sitCommandGroupCtrl.groupButtonElement).position().left > dropDownLength) {
                                sitCommandGroupCtrl.openLeft = true;
                            } else {
                                sitCommandGroupCtrl.openLeft = false;
                            }
                        } else {
                            var pos = sitCommandGroupCtrl.groupButtonElement.getBoundingClientRect();
                            if (pos) {
                                if (pos.left) {
                                    elementLeftPosition = pos.left;
                                }
                            }
                            if (elementLeftPosition >= sitCommandGroupCtrl.winWidth / 2) {
                                sitCommandGroupCtrl.openLeft = true;
                            } else {
                                sitCommandGroupCtrl.openLeft = false;
                            }
                        }
                    }
                } else {
                    sitCommandGroupCtrl.openLeft = false;
                }
                return sitCommandGroupCtrl.openLeft;
            };
            sitCommandGroupCtrl.checkOpenPos();
            //hide the group button if there is no more visible commands inside
            scope.setVisibility = function (onCommand) {
                if (onCommand.visibility) {
                    sitCommandGroupCtrl.groupVisibility = true;
                }
                else {
                    var tmp = false;
                    for (var i = 0; i < sitCommandGroupCtrl.group.group.length; i++) {
                        if (sitCommandGroupCtrl.group.group[i].visibility) {
                            tmp = true;
                            break;
                        }
                    }
                    sitCommandGroupCtrl.groupVisibility = tmp;
                }
                // mandatory for change display detection of the command bar.
                sitCommandGroupCtrl.group.visibility = sitCommandGroupCtrl.groupVisibility;
            };


            scope.$watch(sitCommandGroupCtrl.checkOpenPos, function () {
                sitCommandGroupCtrl.checkOpenPos();
            });

            function onClickDropdown(event) {
                if ($(event.target).parents('div[data-internal-type="group-submenu-command-bar"]').length
                    || $(event.target).data('internal-type') === 'group-submenu-command-bar') {
                    event.stopPropagation();
                    event.preventDefault();
                }
            }

            $('.dropdown-menu').on("click.bs.dropdown", onClickDropdown);


            scope.$on('$destroy', function () {
                $('.dropdown-menu').off("click.bs.dropdown", onClickDropdown);
            });
        }
        return {
            bindToController: {
                group: '=?sitGroup',
                showas: '@sitShowas',
                bartype: '@sitBartype',
                labelAlign: '@sitLabelAlign',
                method: '&ngClick',
                icon: '@sitIcon',
                name: '@sitName',
                label: '@sitLabel',
                tooltip: '@sitTooltip',
                iconTemplate: '@sitIconTemplate',
                svgIcon: '@svgIcon',
                cmdIcon: '@cmdIcon'
            },
            controller: commandGroupController,
            controllerAs: 'cmdBarGrpBtnCtrl',
            link: {
                pre: preLink,
                post: postLink
            },
            restrict: 'E',
            require: ['^sitCommandBar', 'sitCommandGroup'],
            scope: {},
            //templateUrl: 'common/widgets/commandBar/command-group.html',
            template: ['<div>',
                '<div ng-switch="cmdBarGrpBtnCtrl.showas" ng-show="cmdBarGrpBtnCtrl.groupVisibility">',
                '<div ng-switch-when="Button" class="btn-group" ng-class="{\'MainCommanBtnGrp\': cmdBarGrpBtnCtrl.isMainCommandGroup}">',
                '<button ng-if="cmdBarGrpBtnCtrl.isMainCommandGroup" data-internal-type="group-button-command-bar"',
                'class="MainCommandGroupButton main-command-group-button" ng-click="cmdBarGrpBtnCtrl.commandClicked(cmdBarGrpBtnCtrl.group, $event)"',
                'title="{{ cmdBarGrpBtnCtrl.group.tooltip || cmdBarGrpBtnCtrl.group.label }}"',
                'ng-class="{\'dropdown-toggle\': cmdBarGrpBtnCtrl.layout === \'vertical\' || cmdBarGrpBtnCtrl.layout === \'contextual\'}"',
                'data-toggle="{{(cmdBarGrpBtnCtrl.layout === \'vertical\' || cmdBarGrpBtnCtrl.layout === \'contextual\')  ? \'dropdown\' : \'\' }}">',
                '<span class ="vertical-group-main-command-arrow" ng-if="cmdBarGrpBtnCtrl.layout === \'vertical\'" sit-class="arrow-mom-icon"',
                'sit-mom-icon=\'{path:"common/icons/miscLeftArrow16.svg"}\'></span>',

                '<span ng-class="{\'img-without-label\': !cmdBarGrpBtnCtrl.group.label || cmdBarGrpBtnCtrl.group.label.length === 0 }" ng-if="cmdBarGrpBtnCtrl.layout === \'contextual\' "',
                'sit-mom-icon=\'{path:"common/icons/miscDownArrow16.svg"}\' sit-class="command-group-icon" class="command-group-icon">',
                '</span>',

                '<span data-internal-type="image-container" class="fa-lg"',
                'ng-class="cmdBarGrpBtnCtrl.layout === \'vertical\' && cmdBarGrpBtnCtrl.group.label.length !== 0? \'vertical-group-main-command-image-label\': \'MainCommandImage\'">',
                '<em class="fa {{cmdBarGrpBtnCtrl.group.image}} " sit-mom-icon="cmdBarGrpBtnCtrl.group.displayIcon" sit-class="command-mom-icon" ',
                'ng-class="{momIcon: cmdBarGrpBtnCtrl.group.displayIcon !== null }">',
                '</em>',
                '<span ng-if="cmdBarGrpBtnCtrl.layout === \'vertical\' && cmdBarGrpBtnCtrl.group.label.length> 0" class="vertical-group-main-command-label">',
                '{{cmdBarGrpBtnCtrl.group.label}}',
                '</span>',
                '</span>',
                '<span ng-if="cmdBarGrpBtnCtrl.layout === \'contextual\' && cmdBarGrpBtnCtrl.group.label.length> 0" class="contextual-group-main-command-label"',
                'ng-class="{\'margin-fix\': !cmdBarGrpBtnCtrl.group.image && !cmdBarGrpBtnCtrl.group.imageTemplate}">',
                '{{cmdBarGrpBtnCtrl.group.label}}',
                '</span>',
                '<span ng-if="cmdBarGrpBtnCtrl.layout === \'horizontal\'" data-internal-type="text-container" class="MainCommandActionLabel">',
                '{{ cmdBarGrpBtnCtrl.group.label }}',
                '</span>',
                '<button ng-if="cmdBarGrpBtnCtrl.isMainCommandGroup && cmdBarGrpBtnCtrl.layout===\'horizontal\'" data-internal-type="group-button-command-bar"',
                'class="dropdown-toggle MainCmdGrpdropdown" data-toggle="dropdown" title="{{ cmdBarGrpBtnCtrl.group.tooltip || cmdBarGrpBtnCtrl.group.label }}">',
                '<span class="caret">',
                '</span>',
                '</button>',
                '</button>',
                '<button ng-if="!cmdBarGrpBtnCtrl.isMainCommandGroup" data-internal-type="group-button-command-bar"',
                'ng-class="{Action:\'dropdown-toggle CommandActionDropdown\',Tool:\'dropdown-toggle CommandToolDropdown\'}[cmdBarGrpBtnCtrl.bartype]"',
                'data-toggle="dropdown" title="{{ cmdBarGrpBtnCtrl.group.tooltip || cmdBarGrpBtnCtrl.group.label }}">',
                '<div style="display:inline"',
                'ng-if="(cmdBarGrpBtnCtrl.layout ===\'vertical\' || cmdBarGrpBtnCtrl.labelAlign !== \'right\') || cmdBarGrpBtnCtrl.layout ===\'contextual\'">',
                '<span class ="vertical-group-main-command-arrow" ng-if="cmdBarGrpBtnCtrl.layout === \'vertical\'"',
                'sit-class="arrow-mom-icon" sit-mom-icon=\'{path:"common/icons/miscLeftArrow16.svg"}\'></span>',

                '<span ng-class="{\'img-without-label\': !cmdBarGrpBtnCtrl.group.label || cmdBarGrpBtnCtrl.group.label.length === 0 }"',
                'ng-if="cmdBarGrpBtnCtrl.layout === \'contextual\' "',
                'sit-mom-icon=\'{path:"common/icons/miscDownArrow16.svg"}\' sit-class="command-group-icon" class="command-group-icon">',
                '</span>',

                '<span style="line-height:1em" ng-if="(cmdBarGrpBtnCtrl.group.image || cmdBarGrpBtnCtrl.group.displayIcon) " class="fa-stack fa-lg"',
                'ng-class="{\'vertical-group-command-image\':cmdBarGrpBtnCtrl.layout === \'vertical\' && cmdBarGrpBtnCtrl.group.label.length === 0,',
                '\'contextual-group-command-image\': cmdBarGrpBtnCtrl.layout === \'contextual\' && cmdBarGrpBtnCtrl.group.label.length === 0,',
                '\'contextual-group-command-image-label\':cmdBarGrpBtnCtrl.layout === \'contextual\' && cmdBarGrpBtnCtrl.group.label.length !== 0,',
                '\'vertical-group-command-image-label\': cmdBarGrpBtnCtrl.layout === \'vertical\'  && cmdBarGrpBtnCtrl.group.label.length !== 0}">',
                '<em class="fa {{cmdBarGrpBtnCtrl.group.image}} fa-stack" sit-mom-icon="cmdBarGrpBtnCtrl.group.displayIcon" sit-class="command-mom-icon"',
                'ng-class="{momIcon: cmdBarGrpBtnCtrl.group.displayIcon !== null }">',
                '</em>',
                '</span>',
                '<span ng-if="(cmdBarGrpBtnCtrl.layout === \'vertical\' || cmdBarGrpBtnCtrl.layout === \'contextual\') && cmdBarGrpBtnCtrl.group.label.length> 0" ',
                'ng-class="{\'vertical-group-command-label\': cmdBarGrpBtnCtrl.layout === \'vertical\',',
                '\'contextual-group-command-label\': cmdBarGrpBtnCtrl.layout=== \'contextual\',',
                '\'contextual-group-margin-top\': cmdBarGrpBtnCtrl.layout=== \'contextual\' && !cmdBarGrpBtnCtrl.group.image && !cmdBarGrpBtnCtrl.group.imageTemplate}">',
                '{{cmdBarGrpBtnCtrl.group.label}}',
                '</span>',
                '<span style="width:24px!important" ng-if="cmdBarGrpBtnCtrl.layout === \'horizontal\'">',
                '<span class="caret">',
                '</span>',
                '</span>',
                '</div>',
                '<div ng-if="cmdBarGrpBtnCtrl.layout === \'horizontal\' && cmdBarGrpBtnCtrl.bartype==\'Tool\' && cmdBarGrpBtnCtrl.labelAlign !== \'right\'"',
                'class="CommandToolDropdownLabel">',
                '{{cmdBarGrpBtnCtrl.group.label}}',
                '</div>',
                '<span ng-if="cmdBarGrpBtnCtrl.layout === \'horizontal\' && cmdBarGrpBtnCtrl.group.image && cmdBarGrpBtnCtrl.labelAlign === \'right\'" class="fa-lg right-align">',
                '<em class="fa {{cmdBarGrpBtnCtrl.group.image}} " sit-mom-icon="cmdBarGrpBtnCtrl.group.displayIcon" sit-class="command-mom-icon"',
                'ng-class="{\'momIcon\': cmdBarGrpBtnCtrl.group.displayIcon !== null }">',
                '</em>',
                '</span>',
                '<span class="caret" ng-if="cmdBarGrpBtnCtrl.layout === \'horizontal\' && cmdBarGrpBtnCtrl.labelAlign === \'right\'">',
                '</span>',
                '<span ng-if="cmdBarGrpBtnCtrl.layout === \'horizontal\' && cmdBarGrpBtnCtrl.bartype==\'Tool\' && cmdBarGrpBtnCtrl.labelAlign === \'right\'"',
                'class="CommandToolDropdownLabel">',
                '{{cmdBarGrpBtnCtrl.group.label}}',
                '</span>',
                '</button>',
                '<ul data-internal-type="menu-command-bar" class="dropdown-menu commandBarDropdownMenu"',
                'ng-class="{\'commandBarDropdownMenuAlignRight\':cmdBarGrpBtnCtrl.openLeft,\'mainCommandDropdownMenu\': cmdBarGrpBtnCtrl.isMainCommandGroup}"',
                'role = "menu" data-toggle="dropdown" > ',
                '<li ng-repeat="subcommand in cmdBarGrpBtnCtrl.group.group" class="commandBarDropdownItem">',
                '<div ng-switch="subcommand.type">',
                '<div data-internal-type="menu-item-command-bar" ng-switch-when="MainCommand" class="btnMainMenu">',
                '<sit-command sit-command="subcommand" sit-showas="Menu" sit-bartype="{{cmdBarGrpBtnCtrl.bartype}}">',
                '</sit-command>',
                '</div>',
                '<div data-internal-type="menu-item-command-bar" ng-switch-when="Command">',
                '<sit-command sit-command="subcommand" sit-showas="Menu" sit-bartype="{{cmdBarGrpBtnCtrl.bartype}}">',
                '</sit-command>',
                '</div>',
                '<div ng-switch-when="Sep">',
                '<div data-internal-type="menu-separator-command-bar" class="divider menuDivider" />',
                '</div>',
                '<div data-internal-type="menu-item-command-bar" ng-switch-when="toggle">',
                '<sit-command sit-command="subcommand" sit-showas="Menu" sit-bartype="{{cmdBarGrpBtnCtrl.bartype}}">',
                '</sit-command>', '</div>',
                '<div ng-switch-default>',
                'Unknown sub command type: Allowed values are "Command" or "Sep"',
                '</div>',
                '</div>',
                '</li>',
                '</ul>',
                '</div>',
                '<div ng-switch-when="Menu" class="dropdown-submenu " ng-class="{\'pull-left\':cmdBarGrpBtnCtrl.openLeft}">',
                '<div data-internal-type="group-submenu-command-bar"',
                'ng-class="{\'btnMainMenu btnMenu\': cmdBarGrpBtnCtrl.isMainCommandGroup,\'btnMenu\': !cmdBarGrpBtnCtrl.isMainCommandGroup}"',
                'style="text-align:left" title="{{cmdBarGrpBtnCtrl.group.tooltip || cmdBarGrpBtnCtrl.group.name}}">',
                '<span ng-if="(cmdBarGrpBtnCtrl.group.image || cmdBarGrpBtnCtrl.group.displayIcon)" class="fa {{cmdBarGrpBtnCtrl.group.image}}"',
                'sit-mom-icon="cmdBarGrpBtnCtrl.group.displayIcon" sit-class="command-mom-icon" ng-class="{momIcon: cmdBarGrpBtnCtrl.group.displayIcon !== null }">',
                '</span>',
                '<label class="menuLabel">',
                '{{cmdBarGrpBtnCtrl.group.label}}',
                '</label>',
                '<span class="fa fa-caret-right">',
                '</span>',
                '</div>',
                '<ul data-internal-type="submenu-command-bar" class="dropdown-menu commandBarDropdownMenu"',
                'ng-class="{\'mainCommandDropdownMenu\': cmdBarGrpBtnCtrl.isMainCommandGroup}" role="menu">',
                '<li class="commandBarDropdownItem" ng-repeat="subcommand in cmdBarGrpBtnCtrl.group.group">',
                '<div ng-switch="subcommand.type">',
                '<div data-internal-type="submenu-item-command-bar" ng-switch-when="Command">',
                '<sit-command sit-command="subcommand" sit-showas="Menu" sit-bartype="{{cmdBarGrpBtnCtrl.bartype}}">',
                '</sit-command>',
                '</div>',
                '<div data-internal-type="menu-item-command-bar" ng-switch-when="MainCommand" class="btnMainMenu">',
                '<sit-command sit-command="subcommand" sit-showas="Menu" sit-bartype="{{cmdBarGrpBtnCtrl.bartype}}">',
                '</sit-command>',
                '</div>',
                '<div data-internal-type="submenu-separator-command-bar" ng-switch-when="Sep">',
                '<div class="divider menuDivider">',
                '</div>',
                '</div>',
                '<div data-internal-type="submenu-item-command-bar" ng-switch-when="toggle">',
                '<sit-command sit-command="subcommand" sit-showas="Menu" sit-bartype="{{cmdBarGrpBtnCtrl.bartype}}">',
                '</sit-command>',
                '</div>',
                '<div ng-switch-default>',
                'Unknown sub command type: Allowed values are "Command" or "Sep"',
                '</div>',
                '</div>',
                '</li>',
                '</ul>',
                '</div>',
                '<ng-transclude ng-show=false>',
                '</ng-transclude>',
                '</div>',
                '</div>'].join('\n'),
            transclude: true
        };
    }
    angular.module('siemens.simaticit.common.widgets.commandBar').directive('sitCommandGroup', commandGroup);
})();

(function () {
    'use strict';
    //#region ng-doc comments
    /**
    *   @ngdoc directive
    *   @name sitSearch
    *   @module siemens.simaticit.common.widgets.commandBar
    *   @access internal
    *   @description
    *       A Directive used to perform Search operation on data.
    *   @usage
    *   As an element:
    *   ```
    *       <sit-search
    *           sit-type="search"
    *           ng-click="clickCallback"
    *           ng-focus="focusCallback"
    *           ng-blur="blurCallback"
    *           sit-change="changeCallback"
    *           sit-placeholder="placeholderString"
    *           sit-visibility="true"
    *           ng-disabled="false"
    *           sit-search-value="searchValueString">
    *       </sit-search>
    *   ```
    *   @restrict E
    *   @param {string} sit-type Type of commands included in the command bar. The value should be **search** always.
    *   @param {string} sit-placeholder The placeholder of the quick search text box.
    *   @param {string} sit-search-value The default value to searched while loading of the search widget.
    *   @param {boolean} [sit-visibility=true] This attribute is to decide the visibility of Search Bar.
    *   @param {boolean} [ng-disabled=false] This attribute is to disable the Search Bar.
    *   @param {Function} ng-click The function to be called on clicking the search icon.
    *   @param {Function} ng-focus The function to be called on focusing the search text box.
    *   @param {Function} sit-change The function to be called on changing the value in the search text box.
    *   @param {Function} ng-blur The function to be called on focusing out from the search text box.
    *
    *   @example
    *   The following example shows to configure a sit-search widget in contextual command bar:
    *   ```
    *   var searchCommand = {
    *                    "type": "search",
    *                    "placeholder": "Enter your search value here...",
    *                    "quickSearchText": "Search",
    *                    "visibility": true,
    *                    "disableSearch" : false,
    *                    'clickCallback': function(searchValue){
    *                                       //code goes here
    *                                     },
    *                    'focusCallback': function(){
    *                                       //code goes here
    *                                     },
    *                    'changeCallback': function(searchValue){
    *                                       //code goes here
    *                                      },
    *                    'blurCallback': function(){
    *                                       //code goes here
    *                                    }
    *           };
    *   ```
    */
    //#endregion

    SearchController.$inject = ['$element'];
    function SearchController($element) {
        var vm = this;
        vm.svgIcons = {
            search: {
                path: "common/icons/cmdSearch24.svg",
                size: "16"
            },
            close: {
                path: "common/icons/cmdClosePanel24.svg",
                size: "16"
            }
        };

        vm.focusInput = function () {
            $element.find(".contextual-quick-search").focus();
        };
    }

    SitSearchDirective.DirectiveInstances = 0;
    function SitSearchDirective() {

        function linkFunction(scope, element, attrs, controllers) {

            var sitCommandBarCtrl = controllers[0];
            var sitSearchCtrl = controllers[1];
            var disableSearchWatch;
            var searchCommandIndex = Number(sitSearchCtrl.index);

            if (!sitSearchCtrl.type) {
                return;
            }

            function initializeCommandProperties() {

                sitSearchCtrl.command.clickCallback = sitSearchCtrl.clickSearch;
                sitSearchCtrl.command.focusCallback = sitSearchCtrl.focusSearch;
                sitSearchCtrl.command.changeCallback = sitSearchCtrl.sitChange;
                sitSearchCtrl.command.blurCallback = sitSearchCtrl.blurSearch;
                sitSearchCtrl.command.quickSearchText = sitSearchCtrl.quickSearchText;
                sitSearchCtrl.command.disableSearch = typeof sitSearchCtrl.disableSearch === "boolean" ? sitSearchCtrl.disableSearch : false;
                sitSearchCtrl.command.placeholder = sitSearchCtrl.placeholder;
                sitSearchCtrl.command.visibility = sitSearchCtrl.visibility === 'false' ? false : true;


                if (sitSearchCtrl.command.quickSearchText) {
                    sitSearchCtrl.command.changeCallback(sitSearchCtrl.quickSearchText);
                }
            }

            function registerWatch() {
                disableSearchWatch = scope.$watch(function () {
                    return sitCommandBarCtrl.commands.bar;
                }, function (newCommands, oldCommands) {
                    if (newCommands !== oldCommands && newCommands.length) {
                        if (newCommands[searchCommandIndex] && newCommands[searchCommandIndex].id === sitSearchCtrl.id) {
                            sitSearchCtrl.disableSearch = newCommands[searchCommandIndex].disableSearch;
                        } else {
                            for (var i = 0; i < newCommands.length; i++) {
                                if (newCommands[i].type === 'search' && newCommands[searchCommandIndex].id === sitSearchCtrl.id) {
                                    searchCommandIndex = i;
                                    sitSearchCtrl.disableSearch = newCommands[i].disableSearch;
                                    break;
                                }

                            }
                        }

                    }
                }, true);
            }

            if ((sitSearchCtrl.command === undefined || sitSearchCtrl.command === null)) {
                sitSearchCtrl.command = {};
                sitSearchCtrl.command.type = 'search';

                sitSearchCtrl.index = sitCommandBarCtrl.counter++;

                initializeCommandProperties();
                sitCommandBarCtrl.onCommandAdded(sitSearchCtrl);
            }
            if (searchCommandIndex) {
                sitSearchCtrl.id = sitCommandBarCtrl.commands.bar[searchCommandIndex].id = SitSearchDirective.DirectiveInstances++;
                registerWatch();
            }

            scope.$on('$destroy', function () {
                if (typeof disableSearchWatch === 'function') {
                    disableSearchWatch();
                }
            });
        }
        return {
            bindToController: {
                command: '=?sitCommand',
                clickSearch: '=?ngClick',
                focusSearch: '=?ngFocus',
                visibility: '@sitVisibility',
                sitChange: '=?',
                blurSearch: '=?ngBlur',
                disableSearch: '=?ngDisabled',
                type: '@sitType',
                placeholder: '@sitPlaceholder',
                quickSearchText: '@sitSearchValue',
                index: '@'
            },
            controller: SearchController,
            controllerAs: 'searchCtrl',
            link: linkFunction,
            restrict: 'E',
            require: ['^sitCommandBar', 'sitSearch'],
            scope: {},
            //templateUrl: 'common/widgets/commandBar/search.html',

            template:
                ['<div ng-transclude class="command-hide"></div>',
                    '<div data-internal-type="quick-search-container" class="contextual-search-container">',
                    '<input data-internal-type="quickSearchTextBox" type="text" ng-change="searchCtrl.sitChange(searchCtrl.quickSearchText)"',
                    'placeholder="{{searchCtrl.placeholder}}" class="form-control contextual-quick-search" ng-model="searchCtrl.quickSearchText"',
                    'ng-focus="searchCtrl.focusSearch()" ng-disabled="searchCtrl.disableSearch" ng-blur="searchCtrl.blurSearch()"/>',
                    '<em data-internal-type="quickSearchIcon"  ng-class="{momIcon: searchCtrl.svgIcons.search }" sit-class="svg-icon" ',
                    ' sit-mom-icon="searchCtrl.svgIcons.search" ',
                    'class="fa fa-search contextual-search-icon" ng-click="searchCtrl.clickSearch(searchCtrl.quickSearchText);searchCtrl.focusInput();"></em>',
                    '<em data-internal-type="quickSearchIcon" ng-if="searchCtrl.quickSearchText.length > 0" ng-class="{momIcon: searchCtrl.svgIcons.close }" sit-class="svg-icon" ',
                    ' sit-mom-icon="searchCtrl.svgIcons.close" ',
                    'class="fa fa-close contextual-close-icon" ng-click="searchCtrl.quickSearchText =\'\';searchCtrl.clickSearch(\'\');searchCtrl.focusInput();"></em>',

                    '</div>'].join('\n'),
            transclude: true
        };
    }
    angular.module('siemens.simaticit.common.widgets.commandBar').directive('sitSearch', SitSearchDirective);
})();
