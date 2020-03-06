/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name siemens.simaticit.common.widgets.electronicSignature
     *
     * @description
     * This module provides functionalities related to Electronic Signature Scenario.
     */
    angular.module('siemens.simaticit.common.widgets.electronicSignature', []);

})();

(function () {
    'use strict';
    angular.module('siemens.simaticit.common.widgets.electronicSignature').directive('sitEsBrowseScenarios', DirectiveDefinition);

    DirectiveDefinition.$inject = [];

    function DirectiveDefinition() {
        return {
            scope: {},
            bindToController: {
                filter: '=sitFilter',
                config: '=sitConfig',
                vmpicker: '=sitVmpicker'
            },
            controller: DirectiveController,
            controllerAs: 'vm',
            templateUrl: 'common/widgets/electronicSignature/sit-es-browse-scenarios.html'
        };
    }

    DirectiveController.$inject = ['$translate', 'common.services.electronicSignature.service'];
    function DirectiveController($translate, electronicSignatureService) {
        var vm = this;
        var filterString;

        activate();

        function activate() {
            validateInputParams();
            init();
            initTable();

            loadData();
        }

        function init() {
            vm.ready = false;
            filterString = null;
            vm.refreshData = refreshData;
            vm.refreshTitle = $translate.instant('electronicSignature.refresh');
        }

        function loadData() {
            if (vm.ready) {
                return;
            }
            setFilterString();
            setFilterConfiguration();
            vm.ready = true;
        }

        function refreshData() {

            var data = vm.tableConfig.data;
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
            vm.ready = true;
        }

        function validateInputParams() {
            vm.config = vm.config || {};
            vm.filter = vm.filter || {};

            vm.config.enableColumnResizing = vm.config.enableColumnResizing || true;
            vm.config.pageSizeDefault = vm.config.pageSizeDefault || 10;
            vm.config.pageSizes = vm.config.pageSizes || [10, 25, 50, 100, 250];
            vm.config.SelectedItem = vm.config.SelectedItem || '';

            vm.config.onInit = vm.config.onInit || null;
            vm.config.onPageChange = vm.config.onPageChange || null;
            vm.config.onSelectionChange = vm.config.onSelectionChange || null;
        }

        function initTable() {
            vm.tableConfig = {
                enableColumnResizing: vm.config.enableColumnResizing,
                pageSizes: vm.config.pageSizes,
                pageSizeDefault: vm.config.pageSizeDefault,
                selectionMode: 'single',
                fields: {
                    NId: {
                        sorting: true,
                        grouping: true,
                        quicksearch: true,
                        displayName: 'NId',
                        filtering: {
                            type: 'string',
                            default: true,
                            validation: {
                                required: false
                            }
                        }
                    },
                    Name: {
                        sorting: true,
                        grouping: false,
                        quicksearch: false,
                        displayName: $translate.instant('electronicSignature.scenarioName'),
                        filtering: {
                            type: 'string',
                            default: false,
                            validation: {
                                required: false
                            }
                        }
                    },
                    Description: {
                        sorting: true,
                        grouping: false,
                        quicksearch: false,
                        displayName: $translate.instant('electronicSignature.scenarioDescription'),
                        filtering: {
                            type: 'string',
                            default: false,
                            validation: {
                                required: false
                            }
                        }
                    }
                },
                dataSource: {
                    dataService: { findAll: findAll },
                    dataEntity: 'ScenarioConfiguration',
                    appName: 'AuditTrail',
                    optionsString: '$select=Id,NId,Name,Description,SignatureConfigurations' +
                        '&$expand=SignatureConfigurations($select=Id,Index,Sequence,Signer,Reason,IsCommentMandatory)'
                },
                data:[],
                onInitCallback: onTableInit,
                onPageChangeCallback: onPageChange,
                onSortChangeCallback: onSortChange,
                onSelectionChangeCallback: onSelectionChange
            };
        }

        function onTableInit(config) {
            var tableSettings = config.getSettings();
            tableSettings.sort = {
                predicate: 'NId',
                reverse: false
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

            if (selectedItems.length>0 )
                vm.config.SelectedScenario = selectedItems[0].NId;
            else
                vm.config.SelectedScenario = null;

            if (!vm.config.onSelectionChange && vm.config.SelectedScenario!=='') {
                return;
            }
            vm.config.onSelectionChange.call(null, vm.config.SelectedScenario, itemChanged, vm.vmpicker);
        }

        function findAll(query) {

            // Still loadData is not called
            if (!vm.ready) {
                return;
            }
            // Table is still rendering
            if (!vm.tableConfig.refreshData) {
                return;
            }

            return electronicSignatureService.getScenarios(query, "IsCurrent eq true and SignatureConfigurations/any()");
        }

        function setFilterString() {
            filterString = electronicSignatureService.getFilterString(vm.filter);
        }

        function setFilterConfiguration() {
            var keys = Object.keys(vm.filter);
            for (var index = 0; index < keys.length; index++) {
                var key = keys[index];
                if( vm.filter[key] ) {
                    var fieldName = null;
                    switch (key) {
                        case 'NId':
                            delete vm.tableConfig.fields['NId'].filtering;
                            break;
                        case 'Name':
                            delete vm.tableConfig.fields['Name'].filtering;
                            break;
                        case 'Description':
                            delete vm.tableConfig.fields['Description'].filtering;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    }
})();

(function () {
    'use strict';
    angular.module('siemens.simaticit.common.widgets.electronicSignature').directive('sitEsBrowseSigners', DirectiveDefinition).directive('onFinishRender', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    element.ready(function () {
                        ReStyle();
                    });
                }
            }
        }
    });

    function ReStyle() {

        var els = document.querySelectorAll('.panel');
        for (var i = 0; i < els.length; i++) {
            els[i].classList.remove('panel');
        }

        els = document.querySelectorAll('.panel-heading');
        for (i = 0; i < els.length; i++) {
            els[i].classList.remove('panel-heading');
        }
        return true;
    }

    function DirectiveDefinition() {
        return {
            scope: {},
            bindToController: {
                config: '=sitConfig'
            },
            controller: DirectiveController,
            controllerAs: 'vm',
            templateUrl: 'common/widgets/electronicSignature/es-browse-signers.html'
        };
    }

    DirectiveController.$inject = ['$http', 'common.widgets.busyIndicator.service', 'common.services.globalization.globalizationService',
        'common.services.runtime.commandService', '$rootScope', '$scope', '$translate', 'common.services.runtime.commandModel', 'common.services.electronicSignature.service',
        '$scope', '$compile', 'common.base', 'common.services.component.swacComponentService', 'common.services.component.swacContainerService',
        'common.widgets.notificationTile.globalService'];



    function DirectiveController($http, busyIndicatorService, globalizationService, dataService, $rootScope, $scope, $translate, RuntimeCommandModel,
        electronicSignatureService, bscope, bcompile, base, swacComponentService, swacContainerService, notificationTile) {
        var vm = this;
        var self = this;
        var selecteditem = null;

        var IDP_HOST = location.origin;

        var retrieveService = true;
        var idpAddress = null;
        var rb = null;

        var loginControl = null;
        var authReqDef = null;
        var signReqDef = null;
        var paramAuth = null;
        var lastSession = null;
        var params4login = null;
        var scope = null;
        var compile = null;
        var UMCObj = null;

        var last_used_document = null;
        var last_used_params = null;
        var configUtilService = null;
        var IndexAccordionOpened = -1;
        var heightUMC = 420;
        var language = "";
        scope = bscope;
        compile = bcompile;

        activate();

        function activate() {
            language = globalizationService.getLocale();
            clearall();
            UpdateStatus();
            var closebtt = document.getElementsByClassName("dialog-close-btn")[0];
            closebtt.onclick = onCloseDialogPropagate;
        }

        function extractHostname(url) {
            var hostname;
            //find & remove protocol (http, ftp, etc.) and get hostname
            if (url.indexOf("//") > -1) {
                hostname = url.split('/')[2];
            }
            else {
                hostname = url.split('/')[0];
            }

            //find & remove port number
            hostname = hostname.split(':')[0];
            //find & remove "?"
            hostname = hostname.split('?')[0];

            return hostname;
        }

        function extractProtocol(url) {
            var protocol;
            //find & remove protocol (http, ftp, etc.) and get protocol

            if (url.indexOf("https") !== -1)
                return "https://"
            return "http://";
        }




        var NEWIDP_IP = idpAddress ? idpAddress : location.origin + "/umc-sso";
        if (NEWIDP_IP !== undefined) {
            var idpUrl = document.createElement('a');
            idpUrl.href = NEWIDP_IP;
            if (idpUrl !== undefined && idpUrl.href !== undefined && idpUrl.href.length > 0)
                IDP_HOST = extractProtocol(location.origin) + extractHostname(idpUrl.href);
        }
        var SWACLoginComponent1Info = {
            name: 'umc-comp',
            type: '',
            //source: NEWIDP_IP + '/login-offline/index.html?swaclogin=yes', //UMCIP_IP + '/IPSimatic-logon/account/swaclogin?cancancel=no', //
            source: NEWIDP_IP + '/swaclogin',
            settings: {
                left: '200px',
                top: (50 * 0) + '%',
                width: '85%',
                height: '90%',
                flavor: 'ui'
            }
        };

        var SWACLoginComponent2Info = {
            name: 'umc-sign',
            type: '',
            //source: NEWIDP_IP + '/login-offline/index.html?swaclogin=yes', //UMCIP_IP + '/IPSimatic-logon/account/swaclogin?cancancel=no', //
            source: NEWIDP_IP + '/swaclogin',
            parent: null,
            settings: {
                //left: '0px',
                top: '0px',
                width: '290px',
                height: heightUMC + 'px',
                flavor: 'ui'
            }
        };

        init();

        function init() {


            if (retrieveService) {
                idpAddress = null;
                $http.get(IDP_HOST + "/sit-svc/config").then(function successCallback(response) {
                    var idpURL = response.data.identityProviderUrl;
                    if (idpURL === "/IPSimatic-Logon")
                        idpAddress = IDP_HOST;
                    else
                        idpAddress = extractHostname(idpURL);

                },
                    function errorCallback(response) {
                        notificationTile.warning("Unable to retrieve endpoint!");
                    });
            }
        }


        function clearall() {
            loginControl = null;
            authReqDef = null;
            signReqDef = null;
            paramAuth = null;
            lastSession = null;
            params4login = null;
            UMCObj = null;
            selecteditem = null;
            idpAddress = null;
            rb = null;
            var clone = JSON.parse(JSON.stringify(vm.config.items));
            vm.config.items = null;
            vm.config.items = clone;
            if (window.location.search !== undefined) {
                idpAddress = window.location.search.split("=")[1];
            }

            NEWIDP_IP = idpAddress ? idpAddress : location.origin + "/umc-sso";

            idpUrl = document.createElement('a');
            idpUrl.href = NEWIDP_IP;
            if (idpUrl !== undefined && idpUrl.href !== undefined && idpUrl.href.length > 0)
                IDP_HOST = extractProtocol(location.origin) + extractHostname(idpUrl.href);
        }

        function onCloseDialogPropagate() {
            if (!vm.config.onCloseDialog) {
                return;
            }
            vm.config.onCloseDialog.call(null, null);
        }


        exposeAPI();

        function exposeAPI() {
            self.UMC_Caller = UMC_Caller;
            self.Translate = Translate;
            self.Opened = Opened;
            self.ReStyle = ReStyle;
            self.UpdateStatus = UpdateStatus;
            self.executeCommandFullName = executeCommandFullName;
            self.switchercall = switchercall;
            self.AddSignature = AddSignature;
            self.PrepareSignature = PrepareSignature;
            self.AbortSignature = AbortSignature;
            self.AbortSignatureAndPrepare = AbortSignatureAndPrepare;
            self.OnAuthTokenReceived = OnAuthTokenReceived;
            self.loadUMC = loadUMC;
        }

        accordion();


        function UpdateStatus() {
            vm.config.description = $translate.instant('esSigners.description');

            vm.config.signsleftdescription = (vm.config.signstocollect - vm.config.signscollected) + " " + $translate.instant('esSigners.leftsigns') + ".";

            vm.config.progressvalue = ((vm.config.signscollected / vm.config.signstocollect) * 100);

        }



        function accordion() {

            self.RichRadio1 = {
                value: "A",
                validation: {
                    required: false
                },
                widgetAttributes: {
                    name: "myRichRadio1",
                    options: [
                        { label: Translate("Approve"), value: "A", description: "" },
                        { label: Translate("Reject"), value: "R", description: "" }
                    ]
                }
            };

            vm.config.progressvalue = ((vm.config.signscollected / vm.config.signstocollect) * 100);


        }


        function _btoa(str) {
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
                return String.fromCharCode(parseInt(p1, 16))
            }))
        }

        function _atob(str) {
            return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''))
        }

        function cmpSignature(params) {
            loginControl = SWAC.Container.get({ name: "umc-sign" })


            loginControl.proxy.beginSign(params).then(
                function (data) {
                    if (data.result.toLowerCase() === "success") {

                        if (signReqDef != null) {
                            signReqDef.fulfill(data);
                            signReqDef = null;
                        } else {
                            //ONLY TO TEST
                            //document.getElementById('output').innerHTML = _atob(data.claim);

                            var findgroup = false;
                            var g = JSON.parse(_atob(data.claim)).groups;

                            g.forEach(function (entry) {
                                if (entry.name === selecteditem.group)
                                    findgroup = true;
                            });

                            if (selecteditem.Signer.Name.length === 0 && findgroup === false) {
                                notificationTile.warning("The signer does not belong to the requested group (" + selecteditem.group + ")");
                                document.getElementsById("rbcontrol")[0].click();
                            }
                            else {
                                //RANDOM ERROR --- ONLY FOR TEST PURPOSE!!!!
                                //if (Boolean(Math.round(Math.random())))
                                //
                                //else

                                selecteditem.error = "";

                                $http.post(IDP_HOST + "/sit-auth/OAuth/GetESAuthenticationToken",
                                    {
                                        claim: data.claim,
                                        sig: data.sig
                                    }).then(function successCallback(response) {


                                        vm.OnAuthTokenReceived(data.claim, data.sig, response.data.estoken);

                                    }, function errorCallback(response) {
                                        selecteditem.error = response.error.errorMessage;
                                    });



                            }
                        }

                        //SWAC.Container.beginClose('umc-comp', true, 3000).then(
                        loginControl.beginRemove().then(
                            function () {
                            },
                            function (reason) {
                            });


                    }
                }, function (reason) {
                    if (reason.message === 'aborted') {
                        loginControl.beginRemove();
                    }
                    if (signReqDef != null) {
                        signReqDef.reject(reason);
                        signReqDef = null;
                    }
                });

        }

        function OnAuthTokenReceived(claim, sig, AuthToken) {
            //ES TICKET ---> actual ESTicket is stored in config.ESTicket
            selecteditem.claim = _atob(claim); //TO DECODE: _atob(data.claim);
            selecteditem.encrypted_claim = claim;
            selecteditem.sig = sig;
            selecteditem.AuthToken = AuthToken;

            selecteditem.comment = JSON.parse(selecteditem.claim).comment;
            if (!selecteditem.comment)
                selecteditem.comment = "";




            var decision = "";

            if (self.RichRadio1.value === "A")
                decision = "Approved";

            if (self.RichRadio1.value === "R")
                decision = "Rejected";


            //CALL AddSignature
            if (selecteditem.comment.length >= 255) {
                selecteditem.error = Translate("TooLongComment");
                loadUMC();
            }
            else
                vm.executeCommandFullName("AuditTrail", "AddSignature", {
                    ESTicket: vm.config.ESTicket,
                    AuthenticationToken: selecteditem.AuthToken,
                    Comment: selecteditem.comment,
                    SignatureAction: decision
                });//"Siemens.SimaticIT.SystemData.ES_SD.SDModel.Types.SignatureActionEnum'" + selecteditem.Status + "'" });


        }

        function ShowLoginCmp(params) {

            //SWAC.Container.beginCreate([SWACLoginComponent1Info]).then(
            SWAC.Container.beginCreate([SWACLoginComponent1Info]).then(
                function (value) {
                    //json should be cached
                    $.getJSON("../UIDynamicStyle.json", function (data) {
                        var cmp = SWAC.Container.get({ name: "umc-comp" });
                        cmp.proxy.beginCustomizeUI(data);
                    });

                },
                function (reason) {
                    // Error during Component/s creation.

                }
            );
        }


        function ShowSignatureCmp(params) {


            if (selecteditem.Status !== "Initial") {
                DisplaySignDetails();
            }
            else {
                PrepareSignerInfo();

                vm.config.callback = function (event) {
                    var name = event.data.name, cur = SWAC.Container.get({ name: name });

                    vm.config.subscribed = true;

                    cmpSignature(params);

                    if (cur.hasUI()) {
                        cur.beginShow(true);
                    }
                    SWAC.Container.onReady.unsubscribe(vm.config.callback);


                };


                SWAC.Container.onReady.subscribe(vm.config.callback);

                SWAC.Container.beginCreate([SWACLoginComponent2Info]).then(
                    function (value) {
                        // Component/s successfully created.
                        AddOnlyUMC(params);
                    },
                    function (reason) {
                        // Error during Component/s creation.
                    }
                );
            }
        }

        function addEvent(obj, evType, fn) {
            if (obj.addEventListener) {
                obj.addEventListener(evType, fn, false);
                return true;
            } else if (obj.attachEvent) {
                var r = obj.attachEvent("on" + evType, fn);
                return r;
            } else {
                return null;
            }
        }

        function AddOnlyUMC(params) {
            var z = document.getElementsByClassName("dialog-body-overflow")[0];

            if (z)
                z.setAttribute("style", z.style.cssText + "overflow-x:hidden;");

            var x = document.getElementsByName("umc-sign")[0];
            x.style.position = "relative";
            x.setAttribute("style", "position:relative;border:1px solid #DCDCDC;overflow:hidden;");

            var y = (x.contentWindow || x.contentDocument);
            if (y.document) y = y.document;
            x = y.body.getElementsByClassName("loginButton")[0];


            addEvent(x, "click", function () {
                if (last_used_params.username.length > 0) {
                    setTimeout(function () {
                        SetUserDisabled(last_used_document);
                    }, 1000);
                }
                selecteditem.error = "";
                $scope.$apply();
            });


            x = document.getElementById(selecteditem.Id + "_content");
            x.style.height = heightUMC + "px";
            x.setAttribute("align", "middle");
            x.setAttribute("overflow", "hidden");


            last_used_document = y;
            last_used_params = params;

            SetUserDisabled(last_used_document);

            x = y.body.getElementsByClassName("auth-option-chevron")[0];

            addEvent(x, "click", function () {
                if (last_used_params.username.length > 0) {
                    setTimeout(function () {
                        SetUserDisabled(last_used_document)
                    }, 1);
                }
                selecteditem.error = "";
                $scope.$apply();
            });

            CustomizeSignButton(y);

            y.body.getElementsByClassName("login-content")[0].setAttribute("on-finish-render", ReStyle());

            var child = document.getElementsByTagName("iframe")[0].offsetLeft;
            var parentPos = document.getElementById(selecteditem.Id + "_content").offsetLeft;
            var str = z.style.cssText;
            var start = str.indexOf("width: ");
            str = str.substring(start, str.length);
            var end = str.indexOf("px");
            var widthall = str.substring(str.indexOf(" "), end).trim();

            rb = compile("<center><sit-rich-radio id=\"rbcontrol\" style=\"width:" + widthall +
                "px;left:100px\" sit-value='vm.RichRadio1.value' sit-validation='vm.RichRadio1.validation' sit-options='vm.RichRadio1.widgetAttributes.options'" +
                "templateurl='common/widgets/electronicSignature/es-rich-radio.html'></sit-rich-radio></center>")(scope);
            angular.element(document.getElementById(selecteditem.Id + "_header")).empty().append(rb);
            document.getElementById("rbcontrol").style.zIndex = "1000";
        }


        function ChangeSignText(SignButton, counter) {
            if (counter < 100) {
                setTimeout(function () {
                    if (SignButton.offsetParent) {
                        counter = 100;
                        SignButton.value = Translate("Sign");
                    }
                    ChangeSignText(SignButton, counter++);
                }, 100);
            }
        }

        function CustomizeSignButton(y) {
            var SignButton = null;
            var list = y.body.getElementsByClassName("loginButton");
            for (var i = 0; i < list.length; i++) {
                if (list[i].id === "loginFormSubmit") {
                    SignButton = list[i];
                    SignButton.setAttribute("value", Translate("Sign"));
                }
            }
            ChangeSignText(SignButton, 0);

        }

        function SetUserDisabled(params) {

            var credentials = last_used_document.body.getElementsByClassName("credential-input")[0];
            if (last_used_params.username.length > 0) {
                credentials.value = last_used_params.username;
                credentials.disabled = true;
            }
        }

        function DisplaySignDetails() {
            var rdiv = document.getElementById(selecteditem.Id + "_content");

            if (vm.config.items.Status === "Rejected" && selecteditem.Status === "Initial") {
                selecteditem.error = Translate("ScenarioInRejectStatus");
                rdiv.removeAttribute('style');
            }
            else {


                rdiv.innerHTML = "";
                rdiv.removeAttribute("class");
                rdiv.className = "sit-panel-item sit-panel-cont background-level-common item-space-1";
                rdiv.setAttribute('style', 'width:100%;padding: 5px;');
                rdiv.setAttribute("align", "left");

                var detailstable = document.createElement('table');

                rdiv.appendChild(detailstable);

                detailstable.setAttribute('width', "100%");

                AddRowToSignerDetailsForComment(detailstable, Translate("Meaning") + ":", selecteditem.Reason, null);

                //to REPLACE WITH UserName!!!!  //JSON.parse(selecteditem.claim).user.name, null);
                AddRowToSignerDetails(detailstable, Translate("UserID") + ":", selecteditem.UserIdentity.Name, null);

                if (selecteditem.UserIdentity.FullName === undefined)
                    selecteditem.UserIdentity.FullName = "";

                //to REPLACE WITH FullName!!!! //JSON.parse(selecteditem.claim).user.name, null);
                AddRowToSignerDetails(detailstable, Translate("FullName") + ":", selecteditem.UserIdentity.FullName, null);

                var date = new Date(selecteditem.TimeStamp);//JSON.parse(selecteditem.claim).notbefore);

                AddRowToSignerDetails(detailstable, Translate("DateAndTime") + ":", moment(date.toString()).format('YYYY-MM-DD HH:mm:ss'), null);

                AddRowToSignerDetailsForComment(detailstable, Translate("Comment") + ":", selecteditem.Comment, null);


            }

        }


        function AddRowToSignerDetails(rdiv, title, content, color) {


            var tr = document.createElement('tr');
            rdiv.appendChild(tr);

            //Row User
            var td = document.createElement('td');

            tr.appendChild(td);

            var lbltitle = document.createElement('span');
            lbltitle.type = 'text';
            lbltitle.setAttribute('id', rdiv.id + title);
            lbltitle.setAttribute('class', "signer_info_header");
            lbltitle.setAttribute('width', "100%");
            lbltitle.setAttribute('style', 'width:100%;margin-left:5%;margin-top:10px;');
            lbltitle.innerHTML = title;
            td.appendChild(lbltitle);


            tr = document.createElement('tr');
            rdiv.appendChild(tr);

            //Row User
            td = document.createElement('td');

            tr.appendChild(td);

            var lblcontent = document.createElement('span');
            lblcontent.type = 'text';
            lblcontent.setAttribute('id', rdiv.id + "_content_" + title);
            lblcontent.setAttribute('width', "100%");
            lblcontent.setAttribute('class', "signer_info_text");
            lblcontent.setAttribute('style', 'width:100%;margin-left:5%;margin-bottom: 30px;');
            if (color != null)
                lblcontent.setAttribute('style', "width:100%;padding:5px;margin-bottom: 10px;" + "color:" + color + ";\"");
            lblcontent.innerHTML = content;

            td.appendChild(lblcontent);

        }
        function AddRowToSignerDetailsForComment(rdiv, title, content, color) {

            var tr = document.createElement('tr');
            rdiv.appendChild(tr);

            //Row User
            var td = document.createElement('td');

            tr.appendChild(td);



            //Row User
            var lbltitle = document.createElement('span');
            lbltitle.type = 'text';
            lbltitle.setAttribute('id', rdiv.id + title);
            lbltitle.setAttribute('class', "signer_info_header");
            lbltitle.setAttribute('width', "100%");
            lbltitle.setAttribute('style', 'width:100%;margin-left:5%;');
            lbltitle.innerHTML = title;
            td.appendChild(lbltitle);


            tr = document.createElement('tr');
            rdiv.appendChild(tr);

            //Row User
            td = document.createElement('td');

            tr.appendChild(td);

            var lblcontent = document.createElement('textarea');
            lblcontent.readOnly = true;
            lblcontent.rows = "1";

            lblcontent.setAttribute('id', rdiv.id + "_content_" + title);
            lblcontent.setAttribute('width', "100%");
            lblcontent.setAttribute('style', 'margin-top:-5px;margin-bottom:-5px;margin-left:16px;color: #464646;text-align: left;text-decoration: none;' +
                'font-family: \"Segoe UI\",Arial;font-size: 10.5pt;font-style: normal;font-weight: 400;width:100%;resize: none;background-color:#f0f0f0;border-style: none;' +
                'border-color: Transparent;overflow: auto;outline: none;');
            if (color != null)
                lblcontent.setAttribute('style', "width:100%;padding:5px;margin-bottom: 10px;" + "color:" + color + ";\"");
            lblcontent.innerHTML = content;
            td.appendChild(lblcontent);


        }
        function PrepareSignerInfo() {
            var rdiv = document.getElementById(selecteditem.Id + "_content");

            rdiv.innerHTML = "";
            rdiv.removeAttribute("class");
            rdiv.className = "sit-panel-item sit-panel-cont background-level-common item-space-1";
            rdiv.style.height = SWACLoginComponent2Info.settings.height;
            var outputlabel = document.createElement('label');
            outputlabel.type = 'text';
            outputlabel.setAttribute('id', 'output');







            if (selecteditem.Status !== "Initial") {
                document.getElementById('output').innerHTML = "todo data output-----";
            }

            SWACLoginComponent2Info.parent = rdiv;
        }

        function show_signature_form(username, isCommentMandatory, reason) {

            var params = new Object();
            params.service = location.origin + '/UMC/slwapi/service';
            params.nosession = true;
            params.comment = true;
            params.commentrequired = isCommentMandatory;
            params.language = language;
            params.cancancel = false;
            params.username = username;
            params.sigalg = "PS256";
            params.nonce = JSON.parse(atob(vm.config.ESTicket))["Body"].umcnonce;
            params.description = reason;
            params4login = params;

            ShowSignatureCmp(params);
        }


        function loginCallBack(params, deferLogin) {
            authReqDef = deferLogin;

            paramAuth = params;
            params4login = params;
            ShowLoginCmp(params);
        }

        function signatureCallBack(params, deferSign) {
            signReqDef = deferSign;
            paramAuth = params;
            params4login = params;
            ShowSignatureCmp(params);

        }


        /**
        *   Initializing method, check if there is a session, in case of session redirect to the final service
        *   In case there is no session show the login SWAC component
        */
        function UMC_Caller(username, comment, reason) {
            loginControl = null;

            params4login = new Object();

            params4login.service = IDP_HOST + "/UMC/slwapi/service"; //POC VERSION --> "http://localhost/UMC/slwapi/service";
            params4login.sigalg = "PS256";
            params4login.language = language;
            params4login.nosession = true;
            params4login.nonce = JSON.parse(atob(vm.config.ESTicket))["Body"].umcnonce;
            params4login.description = reason;

            UMCObj = UmcWebSSO(NEWIDP_IP, loginCallBack, signatureCallBack); // eslint-disable-line

            SWAC.Services.register('UMCSSO', UMCObj.service);

            UMCObj.beginSilentLogin(params4login).then(function (data) {
                UMCObj.init(JSON.parse(atob(data.claim)));
                data.ctx = params4login.ctx;                    // neccessary to close redirection to the service in sso login
                //redirectToService(data);

            },
                function () {
                });

            show_signature_form(username, comment, reason);
        }

        function Translate(stringtotranslate) {
            var translated = $translate.instant("esSigners." + stringtotranslate);
            if (translated !== "esSigners." + stringtotranslate)
                return translated;
            else
                return "";
        }

        function loadUMC() {
            self.config.items.SignatureInstances.forEach(function (element) {
                angular.element(document.getElementById(element.Id + "_header")).empty();
                angular.element(document.getElementById(element.Id + "_content")).empty();
            });

            if (selecteditem.Signer.Type === "SpecificUser")
                UMC_Caller(selecteditem.Signer.Name, selecteditem.IsCommentMandatory, selecteditem.Reason);
            else
                UMC_Caller("", selecteditem.IsCommentMandatory, selecteditem.Reason);
        }

        function Opened(StatusOpen, i) {


            IndexAccordionOpened = i;

            selecteditem = self.config.items.SignatureInstances[i];
            selecteditem.error = "";
            if (selecteditem.Status !== "Approved" && selecteditem.Status !== "Rejected" && vm.config.items.Status !== "Approved" &&
                vm.config.items.Status !== "Rejected") {
                if (StatusOpen === false || StatusOpen === undefined) {
                    //GO TO OPEN


                    if (vm.config.ESTicket == null) {
                        vm.executeCommandFullName("AuditTrail", "PrepareSignature", {
                            ScenarioInstanceId: vm.config.ScenarioInstance.ScenarioInstanceId,
                            ScenarioStepId: selecteditem.Index
                        });
                    }
                    else {
                        vm.executeCommandFullName("AuditTrail", "AbortSignature&PrepareSignature", { ESTicket: vm.config.ESTicket });
                        vm.config.ESTicket = null;
                    }
                }
                else {
                    //GO TO CLOSE
                    IndexAccordionOpened = -1;
                    if (vm.config.ESTicket) {
                        vm.executeCommandFullName("AuditTrail", "AbortSignature", { ESTicket: vm.config.ESTicket });
                        vm.config.ESTicket = null;
                    }
                }
            }
            else {
                DisplaySignDetails();
            }





        }

        //-3 -- > "Scenario instance doesn't exists."
        //-5 -- > "The Cannot prepare an ES ticket becouse scenario step id 2 is not valid."
        //-917 --> "The Authentication Token does not reference a UMC user."
        //-913 --> "The Authentication Token of signer is not valid."

        function ManageErrors(commandcalledName, data) {
            selecteditem.error = Translate("Error" + commandcalledName + data.error.errorCode);

            if (selecteditem.error.length === 0) {
                selecteditem.error = data.error.errorMessage; //to translate --> The Cannot prepare an ES ticket becouse scenario step id 2 is not valid.
            }
        }


        function executeCommandFullName(appName, commandName, cmdparams) {
            var res = new Object();
            var runtimeCommandModel = new RuntimeCommandModel();
            runtimeCommandModel.appName = appName;
            runtimeCommandModel.appPrefix = appName;
            runtimeCommandModel.commandName = commandName.split("&")[0];
            runtimeCommandModel.params = cmdparams;
            dataService.invoke(runtimeCommandModel).then(function (data) {
                res.succeeded = true;
                res.data = data;
                vm.switchercall(commandName, res);
            },
                function (error) {
                    vm.switchercall(commandName, error);
                });

            return res;
        }

        function switchercall(command, res) {
            switch (command) {
                case "AddSignature":
                    {
                        vm.AddSignature(res.data);
                        break;
                    }
                case "PrepareSignature":
                    {
                        vm.PrepareSignature(res.data);
                        break;
                    }
                case "AbortSignature":
                    {
                        vm.AbortSignature(res.data);
                        break;
                    }
                case "AbortSignature&PrepareSignature":
                    {
                        vm.AbortSignatureAndPrepare(res.data);
                        break;
                    }
            }
        }

        function PrepareSignature(data) {
            if (data.succeeded) {
                vm.config.ESTicket = data.data.ESTicket;
                self.RichRadio1.value = "A";
                vm.loadUMC();

            }
            else {
                ManageErrors("PrepareSignature", data);
            }

        }

        function AbortSignature(data) {
            if (data.succeeded) {
                vm.config.ESTicket = null;
            }
        }

        function AbortSignatureAndPrepare(data) {
            if (data.succeeded) {
                AbortSignature(data);

            }
            vm.executeCommandFullName("AuditTrail", "PrepareSignature", { ScenarioInstanceId: vm.config.ScenarioInstance.ScenarioInstanceId, ScenarioStepId: selecteditem.Index });
        }

        function AddSignature(data) {
            if (data.succeeded) {
                document.getElementById("rbcontrol").style.display = "none";

                DisplaySignDetails();

                vm.config.items.Status = data.data.StatusScenarioInstance;

                //To Rielaborate
                vm.config.signscollected = data.data.CountSigners;

                UpdateStatus();

                $rootScope.$emit("ReloadOnChangeScenarioStatus", vm.config.items.Status);
            }
            else {
                vm.loadUMC();
                ManageErrors("AddSignature", data);
            }
        }
    }
})();

(function () {
    'use strict';
    angular.module('siemens.simaticit.common.widgets.electronicSignature').directive('sitEsScenarioPicker', DirectiveDefinition);

    DirectiveDefinition.$inject = [];
    /**
    * @ngdoc directive
    * @name sit-es-scenario-picker
    * @module siemens.simaticit.common.widgets.electronicSignature
    * @description
    * The Electronic Signature Scenario widget can be used to select the desired ES Scenario Configuration item.
    *
    * @usage
    * As an element:
    * ```
    *     <sit-es-scenario-picker
            sit-config="vm.configESPicker" sit-filter="vm.filter"></sit-es-scenario-picker >
    * ```
    *
    * Configuration Example:
    *
    * ```
    * vm.configESPicker =
	* {
    *   IsReadOnly: false,
    *   SelectedScenario: 'Test_Scenario',
    *   onSelectionChange: onSelectionChange    //This callback is fired when a new scenario is selected.
	* };
    * ```
    */

    function DirectiveDefinition() {
        return {
            scope: {},
            bindToController: {
                config: '=sitConfig',
                mode: '@sitMode'
            },
            controller: DirectiveController,
            controllerAs: 'vm',
            templateUrl: 'common/widgets/electronicSignature/sit-es-scenario-picker.html'
        };
    }

    DirectiveController.$inject = [
        '$scope',
        'common',
        '$translate',
        'common.widgets.globalDialog.service',
        'common.services.electronicSignature.service'
    ];
    function DirectiveController($scope,
        common,
        $translate,
        globalDialogService,
        electronicSignatureService) {
        var vm = this;
        vm.isEnabled = true;
        vm.displayName = '';
        vm.ready = false;

        activate();

        function activate() {
            vm.isEnabled = electronicSignatureService.isEnabled();
            vm.browsScenarios = browsScenarios;
            vm.setDialogButtons = setDialogButtons;
            validateInputParams();
            init();
        }

        function validateInputParams() {
            vm.config = vm.config || {};
            vm.filter = vm.filter || {};
            vm.mode = vm.mode || 'Horizontal';
            vm.config.pageSizeDefault = vm.config.pageSizeDefault || 10;
            vm.config.pageSizes = vm.config.pageSizes || [10, 25, 50, 100, 250];
            vm.config.enableColumnResizing = vm.config.enableColumnResizing || true;

            vm.config.SelectedScenario = vm.config.SelectedScenario || '';
            vm.config.onSelectionChange = vm.config.onSelectionChange || null;
            vm.config.IsReadOnly = vm.config.IsReadOnly || false;
        }

        function init() {
            vm.scenarioConfigurationTitle = $translate.instant('electronicSignature.scenarioConfiguration');
            vm.scenarioPlaceHolderTitle = $translate.instant('electronicSignature.pickerPlaceHolder');

            if (!vm.isEnabled) {
                return;
            }

            if (vm.config.SelectedScenario !== '') {
                vm.ready = false;
                $.when(electronicSignatureService.getScenario(vm.config.SelectedScenario)).then(
                    function (status) {
                        if (status.value[0]) {
                            vm.displayName = status.value[0].NId;
                            vm.config.SelectedScenario = status.value[0].NId;
                        }
                        else {
                            vm.displayName = '';
                            vm.config.SelectedScenario = '';
                        }
                        vm.ready = true;
                        $scope.$apply();
                    }
                );
            }
            else {
                vm.displayName = '';
                vm.ready = true;
            }
        }

        function browsScenarios(vm) {
            if (vm.config.IsReadOnly) {
                return false;
            }
            vm.dialogConfig = {
                enableColumnResizing: vm.config.enableColumnResizing,
                pageSizeDefault: vm.config.pageSizeDefault,
                pageSizes: vm.config.pageSizes,
                SelectedScenario: vm.config.SelectedScenario,
                onSelectionChange: onSelectionChange
            };

            vm.setDialogButtons(vm);

            vm.dialogData = {
                title: $translate.instant('electronicSignature.selectSignatureScenario'),
                templateuri: 'common/widgets/electronicSignature/browse-scenarios-popup.html',
                buttons: vm.buttonsScenariosDialog,
                templatedata: {
                    config: vm.dialogConfig,
                    filter: vm.filter,
                    vmpicker: vm
                }
            };
            globalDialogService.set(vm.dialogData);
            globalDialogService.show();
        }

        function setDialogButtons(vm) {

            var vmPick = vm;
            vmPick.buttonsScenariosDialog = [{
                id: $scope.$id + "_okButton",
                displayName: $translate.instant('electronicSignature.select'),
                onClickCallback: function () {
                    if (vmPick.config.SelectedScenario !== vmPick.dialogConfig.SelectedScenario) {
                        vmPick.config.SelectedScenario = vmPick.dialogConfig.SelectedScenario;
                        vmPick.displayName = vmPick.dialogConfig.SelectedScenario;

                        globalDialogService.hide();

                        if (vmPick.config.onSelectionChange) {
                            vmPick.config.onSelectionChange.call(null, vmPick.dialogConfig.SelectedScenario);
                        }
                    }
                },
                disabled: vmPick.dialogConfig.SelectedScenario === vmPick.displayName || vmPick.dialogConfig.SelectedScenario === null
            }, {
                id: $scope.$id + "_cancelButton",
                displayName: $translate.instant('electronicSignature.cancel'),
                onClickCallback: function () {
                    globalDialogService.hide();
                },
                disabled: false
            }];
        }

        $scope.$watch('vm.config.SelectedScenario', function () {
            if (vm.config.SelectedScenario !== vm.displayName) {
                vm.displayName = vm.config.SelectedScenario;
            }

        })

        $scope.$watch('vm.displayName', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.length === 0) {
                vm.config.SelectedScenario = "";
                $scope.$emit('sit-es-scenario-picker.input-blanked');
            }
        });

        function onSelectionChange(selectedItem, itemChanged, vmpicker) {
            vmpicker.dialogConfig.SelectedScenario = selectedItem;
            vmpicker.setDialogButtons(vmpicker);
            vmpicker.dialogData.buttons = vmpicker.buttonsScenariosDialog;
            globalDialogService.set(vmpicker.dialogData);
        }
    }
})();

/*jshint -W098 */
(function () {
    'use strict';

    angular.module('siemens.simaticit.common.widgets.electronicSignature').directive('sitRtSignatures', DirectiveDefinition);

    /**
    * @ngdoc directive
    * @name sit-rt-signatures
       * @module siemens.simaticit.common.widgets.electronicSignature
    * @description
    * The Electronic Signature Runtime Scenario widget used to collect Electronic Signatures.
    *
    * @usage
    * As an element:
    * ```
    *     <sit-rt-signatures sit-scenario-istance="vm.ScenarioInstance"></sit-rt-signatures>
    * ```
    *
    * Scenario Instance object example:
    * ```
    * vm.ScenarioInstance =
    * {
    *   ScenarioInstanceId: null, //Contains the Id of the Scenario Instance associated to the custom entity.
    * };
    * ```
    *
    * Example of "OnCloseSignatures" event subcription:
    * ```
    * $rootScope.$on('OnCloseSignatures', vm.ChangeUIStatus);
    *
    * function ChangeUIStatus(event,data)
    * {
    *   vm.Id = data.Id;            //Contains the Id of the Scenario Instance that changed status.
    *   vm.Status = data.Status;    //Contains the Status of the last Scenario Instance that changed status.
    * }
    *
    * ```
    */

    DirectiveDefinition.$inject = [];

    function DirectiveDefinition() {

        return {
            scope:
            {

            },

            restrict: 'E',

            bindToController:
            {
                ScenarioInstance: '=sitScenarioInstance'
            },

            controller: esSignersController,

            controllerAs: 'vm',

            templateUrl: 'common/widgets/electronicSignature/sit-rt-signatures.html'
        };
    }

    esSignersController.$inject = ['$rootScope', 'common.widgets.busyIndicator.service', '$scope', 'common.services.runtime.commandService',
        'common.services.runtime.commandModel', 'common.widgets.globalDialog.service', 'common.services.electronicSignature.service', "$translate", 'common.base'];
    function esSignersController($rootScope, busyIndicatorService, $scope, backendService, RuntimeCommandModel, globalDialogService, electronicSignatureService, $translate, base) {

        var vm = this;
        var alreadysubscribed = false;
        vm.isEnabled = true;


        function init() {
            $scope.actualstatus = "Initial";
            vm.isEnabled = electronicSignatureService.isEnabled();
            vm.buttonEStext = $translate.instant('esSigners.buttontext');
            vm.menuIcon = "fa-pencil";
            vm.description = $translate.instant('esSigners.buttontext');

            vm.dialogData =
                {
                    title: $translate.instant('esSigners.title'),
                    templateuri: 'common/widgets/electronicSignature/sit-rt-signatures-dialog.html',
                    templatedata:
                    {
                        config:
                        {
                            modalid: $scope.id + "popup",
                            ESTicket: null,
                            signstocollect: 0,
                            signscollected: 0,
                            icon: "fa-angle-right",
                            openIcon: "fa-angle-down",
                            closeOthers: true,
                            backgroundColor: "#334455",
                            ScenarioInstance: vm.ScenarioInstance,
                            items: null,
                            subscribed: alreadysubscribed,
                            onStatusChange: onStatusChange,
                            onCloseDialog: onCloseDialog
                        }

                    },
                    buttons: [{
                        id: "CloseButton",
                        displayName: $translate.instant('esSigners.close'),
                        onClickCallback: onCloseDialog
                    }]
                }


            UpdateScenario();

            vm.executeCommandFullName = executeCommandFullName;
            vm.switchercall = switchercall;
            vm.AbortSignature = AbortSignature;
            vm.ChangeScenarioStatus = ChangeScenarioStatus;
            vm.setScenarioInstance = setScenarioInstance;
            vm.EmitOnCloseSignatures = EmitOnCloseSignatures;
            $rootScope.$on('ReloadOnChangeScenarioStatus', vm.ChangeScenarioStatus);
            $scope.$watch('vm.ScenarioInstance.ScenarioInstanceId', function (newValue, oldValue) {
                if (newValue !== oldValue)
                    vm.setScenarioInstance(newValue);
            });
        }

        function ChangeScenarioStatus(event, data) {
            UpdateScenario();
        }

        function onCloseDialog() {
            globalDialogService.hide();
            updatebuttonStatus();

            if (vm.dialogData.templatedata.config.ESTicket != null) {
                vm.executeCommandFullName("AuditTrail", "AbortSignature", { ESTicket: vm.dialogData.templatedata.config.ESTicket });
                vm.dialogData.templatedata.config.ESTicket = null;
            }

            alreadysubscribed = vm.dialogData.templatedata.config.subscribed,

                vm.EmitOnCloseSignatures();
        }

        function EmitOnCloseSignatures() {
            var obj = { Id: vm.dialogData.templatedata.config.ScenarioInstance.ScenarioInstanceId, Status: vm.dialogData.templatedata.config.items.Status };

            $rootScope.$emit("OnCloseSignatures", obj);
        }


        function UpdateScenario() {
            if (vm.dialogData.templatedata.config.ScenarioInstance.ScenarioInstanceId != null) {

                $.when(electronicSignatureService.getScenarioInstanceSigners(vm.dialogData.templatedata.config.ScenarioInstance.ScenarioInstanceId)).then(
                    function (data) {
                        if ((data) && (data.succeeded)) {

                            vm.dialogData.templatedata.config.signscollected = 0;

                            data.value[0].SignatureInstances.forEach(function (signinfo) {
                                if ((signinfo.Status.toLowerCase() === "approved") || (signinfo.Status.toLowerCase() === "rejected")) {
                                    vm.dialogData.templatedata.config.signscollected++;
                                }
                                if (signinfo.Reason.length <= 15) {
                                    signinfo.ShortReason = signinfo.Reason;
                                }
                                else {
                                    signinfo.ShortReason = signinfo.Reason.substr(0, 15) + "...";
                                }
                                //Only To Test TO REMOVE!!!!
                                //signinfo.Signer.UserName = signinfo.Signer.Name;
                                //signinfo.Signer.FullName = signinfo.Signer.Name;

                            });

                            vm.dialogData.templatedata.config.signstocollect = data.value[0].SignatureInstances.length;

                            vm.dialogData.templatedata.config.items = data.value[0];

                            vm.dialogData.templatedata.config.items.SignatureInstances.sort(function (a, b) {
                                return a.Index - b.Index;
                            })

                            //only test
                            //vm.dialogData.templatedata.config.items.ValidationMode = "Approve";

                            $scope.actualstatus = data.value[0].Status;

                            data.value[0].SignatureInstances.forEach(function (item) {
                                item.decision = "";
                            });

                            vm.EmitOnCloseSignatures();

                            updatebuttonStatus();

                            $scope.$apply();



                        } else {
                            //error
                        }
                    },
                    function (status) {
                        vm.displayName = '';

                    },
                    function (status) {
                        vm.displayName = '';

                    }
                );

            }

        }

        function updatebuttonStatus() {
            if (vm.dialogData.templatedata.config.signstocollect === vm.dialogData.templatedata.config.signscollected && vm.dialogData.templatedata.config.signstocollect > 0)
                vm.buttonEStext = $translate.instant('esSigners.buttontext_completed');
            else
                vm.buttonEStext = $translate.instant('esSigners.buttontext');
        }

        function initMethod() {
            vm.OpenDialog = OpenDialog;
            vm.onStatusChange = onStatusChange;
        }

        function setScenarioInstance(ScenarioInstanceId) {

            if (ScenarioInstanceId) {
                vm.dialogData.templatedata.config.ScenarioInstance.ScenarioInstanceId = ScenarioInstanceId;

                vm.dialogData =
                    {
                        title: $translate.instant('esSigners.title'),
                        templateuri: 'common/widgets/electronicSignature/sit-rt-signatures-dialog.html',

                        templatedata:
                        {
                            config:
                            {
                                modalid: $scope.id + "popup",
                                ESTicket: null,
                                signstocollect: 0,
                                signscollected: 0,
                                icon: "fa-angle-right",
                                openIcon: "fa-angle-down",
                                closeOthers: true,
                                backgroundColor: "#334455",
                                ScenarioInstance: vm.ScenarioInstance,
                                items: null,
                                subscribed: alreadysubscribed,
                                onStatusChange: onStatusChange,
                                onCloseDialog: onCloseDialog
                            }

                        },
                        buttons: [{
                            id: "CloseButton",
                            displayName: $translate.instant('esSigners.close'),
                            onClickCallback: onCloseDialog
                        }]
                    }

                UpdateScenario();
                updatebuttonStatus();
            }

        }

        function onStatusChange(config) {
            $scope.$apply;
        }

        function OpenDialog(event) {


            vm.dialogData.templatedata.config.signsleftdescription = (vm.dialogData.templatedata.config.signstocollect - vm.dialogData.templatedata.config.signscollected) +
                " " + $translate.instant('esSigners.leftsigns') + ".";

            vm.dialogData.templatedata.config.progressvalue = ((vm.dialogData.templatedata.config.signscollected / vm.dialogData.templatedata.config.signstocollect) * 100);


            vm.dialogData.templateuri = 'common/widgets/electronicSignature/sit-rt-signatures-dialog.html'

            globalDialogService.set(vm.dialogData);

            globalDialogService.show();
            //TODOODOOOOO


        }


        function executeCommandFullName(appName, commandName, cmdparams) {
            var res = new Object();
            var runtimeCommandModel = new RuntimeCommandModel();
            runtimeCommandModel.appName = appName;
            runtimeCommandModel.appPrefix = appName;
            runtimeCommandModel.commandName = commandName;
            runtimeCommandModel.params = cmdparams;

            backendService.invoke(runtimeCommandModel).then(function (data) {
                res.succeeded = true;
                res.data = data;
                vm.switchercall(commandName, res);
            },
                function (error) {
                    res.succeeded = false;
                    res.data = null;
                });

            return res;
        }

        function switchercall(command, res) {
            if (res.succeeded) {
                switch (command) {
                    case "AbortSignature":
                        {
                            vm.AbortSignature(res.data);
                            break;
                        }
                }
            }
            else {
                //error
            }
        }

        function AbortSignature(data) {

            vm.dialogData.templatedata.config.ESTicket = null;
        }



        function activate() {
            init();
            initMethod();
        }


        activate();
    }

})();
