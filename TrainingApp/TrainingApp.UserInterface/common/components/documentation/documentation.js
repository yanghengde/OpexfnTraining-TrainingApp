/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name siemens.simaticit.common.components.documentation
     *
     * @description
     * This module consists of documentation components that can be used as part of the UI framework.
     *
     * Examples include the documentation help window service <sitHelpWindow>
     */
    angular.module('siemens.simaticit.common.components.documentation', []);
})();

(function () {
    'use strict';

    function documentAnchor($compile, $rootScope, DocumentService, documentationCenterConfigProvider) {
        return {
            restrict: 'E',
            scope: {},
            bindToController: {
            },
            controller: DocumentAnchorController,
            controllerAs: 'dacCtrl',
            link: link
        };

        function link(scope, element, attrs, ctrl) {
            var oDataPath = documentationCenterConfigProvider.config.oDataServiceURI;
            scope.$on("siemens.simaticit.common.page.contentRendered", function (event, eventArgs) {
                if (eventArgs.content.length > 0) {
                    ctrl.anchorTags = $(eventArgs.content).find('a');
                    ctrl.imageTags = $(eventArgs.content).find('img');
                    if (ctrl.anchorTags.length) {
                        modifyAnchorTags(eventArgs.callee);
                    }

                    if (ctrl.imageTags.length) {
                        addPathToImage();
                    }
                }
            });

            // Add path to Image
            // This function will set the src attribute value of an image based on the odata path and the image id.
            function addPathToImage() {
                $(ctrl.imageTags).each(function (index) {
                    if (ctrl.imageTags[index].hasAttribute('id')) {
                        var imageSrc = ctrl.imageTags[index].getAttribute('id');
                        $(ctrl.imageTags[index]).attr('src', oDataPath + "/Asset('" + imageSrc + "')/$value");
                    }
                });
            }

            // Modify the anchor tags.
            // Check if the anchor tag is pointing to an external link --> then DO NOT modify.
            // If the anchor tag is pointing to a link in same page then add a functionality to scroll to that position.
            // If the anchor tag is pointing to another page in same domain, then add a routing functionality with scroll (if any).
            /*jshint -W083 */
            function modifyAnchorTags(caller) {
                var tagParts, currentStateLink, isSamePage, pathHashCount;
                if (caller === "modalPopupCtrl.pageContent" || ctrl.currentLink === undefined) {
                    currentStateLink = [];
                }
                else {
                    currentStateLink = ctrl.currentLink.split('/');
                }
                $(ctrl.anchorTags).each(function (index) {
                    if (ctrl.anchorTags[index].hasAttribute('href')) {
                        var isExternalLink = ctrl.anchorTags[index].getAttribute('href').indexOf('http');
                        if (isExternalLink === -1) {
                            if (ctrl.anchorTags[index].getAttribute('href').indexOf('Page?$filter=contains(Title') !== -1) {
                                $(ctrl.anchorTags[index]).attr('class', 'removed-link');
                                var splittedArray = ctrl.anchorTags[index].getAttribute('href').split("'");
                                var pageTitle = null;
                                if (splittedArray[1]) {
                                    pageTitle = splittedArray[1];
                                }
                                var docId = null;
                                if (splittedArray[3]) {
                                    docId = splittedArray[3];
                                }
                                DocumentService.getAllPages("$filter=contains(tolower(Title),tolower('" + pageTitle + "')) and DocumentCode eq '" + docId + "'")
                                    .then(function (result) {
                                        if (result.value.length > 0) {
                                            var popupData = '';
                                            var currentReleasePage = $.grep(result.value, function (e) { return e.ReleaseId === $rootScope.release; });
                                            if (currentReleasePage.length === 0) {
                                                if (result.value.length > 1) {
                                                    popupData = createPopupData(result.value, index, caller);
                                                    angular.element(ctrl.anchorTags[index]).attr('id', 'linktag' + index);
                                                    angular.element(ctrl.anchorTags[index]).attr('data-toggle', 'dropdown');
                                                    angular.element(ctrl.anchorTags[index]).attr('aria-haspopup', 'true');
                                                    angular.element(ctrl.anchorTags[index]).attr('aria-expanded', 'false');
                                                    $(ctrl.anchorTags[index]).wrap('<div style=\"display:inline-block;\" class=\"dropdown\"></div>');
                                                    var linkText = angular.element(ctrl.anchorTags[index]).html();
                                                    angular.element(ctrl.anchorTags[index]).html(linkText + " <span class=\"caret\"></span> ");
                                                    angular.element(popupData).insertAfter(ctrl.anchorTags[index]);
                                                } else {
                                                    currentReleasePage = result.value[0];
                                                }
                                            } else {
                                                currentReleasePage = currentReleasePage[0];
                                            }
                                            if (caller === "modalPopupCtrl.pageContent") {
                                                if (popupData === '') {
                                                    $(ctrl.anchorTags[index]).on("click", function () {
                                                        $rootScope.reloadPopUpOnLnkClk(currentReleasePage.Id);
                                                    }
                                                    );
                                                    var buttonNewTab = window.document.createElement('a');
                                                    angular.element(buttonNewTab).attr('href', '' + ctrl.docCenterUrl + '#/docHome/document/' + currentReleasePage.DocumentId +
                                                        '/page/' + currentReleasePage.Id + '');
                                                    angular.element(buttonNewTab).attr('target', '_blank');
                                                    var spanNewTab = window.document.createElement('span');
                                                    angular.element(buttonNewTab).append(' ');
                                                    angular.element(buttonNewTab).append(spanNewTab);
                                                    angular.element(buttonNewTab).insertAfter(ctrl.anchorTags[index]);
                                                }
                                            }
                                            else {
                                                $(ctrl.anchorTags[index]).on("click", function () {
                                                    if (popupData === '') {
                                                        ctrl.changeState(currentReleasePage.DocumentId, currentReleasePage.Id, null);
                                                    }
                                                });
                                            }
                                            $(ctrl.anchorTags[index]).removeAttr("class");
                                            $(ctrl.anchorTags[index]).attr('style', 'cursor: pointer;');
                                        }
                                    });
                                $(ctrl.anchorTags[index]).removeAttr('href');
                                return;
                            }
                            tagParts = ctrl.anchorTags[index].getAttribute('href').split('/');
                            isSamePage = ctrl.anchorTags[index].getAttribute('issamepage');
                            pathHashCount = ctrl.anchorTags[index].getAttribute('isPathHavingHash');
                            if (tagParts.length > 0) {
                                ctrl.items = tagParts[tagParts.length - 1].split('#');
                                // Check if the link is in the same page.
                                if (currentStateLink[currentStateLink.length - 1] === ctrl.items[0] || isSamePage === "true") {
                                    if (ctrl.items.length > 1) {
                                        (function (anchorId) {
                                            $(ctrl.anchorTags[index]).on("click", function () {
                                                ctrl.goToHeading(anchorId);
                                            });
                                        }(ctrl.items[1]));
                                    }
                                    $(ctrl.anchorTags[index]).removeAttr('issamepage');

                                } else {
                                    var documentId, pageId, achId;
                                    documentId = tagParts[2];
                                    pageId = ctrl.items[0];
                                    achId = ctrl.items[1];
                                    if (pathHashCount && parseInt(pathHashCount, 10) > 0) {
                                        if (ctrl.items.length > parseInt(pathHashCount, 10) + 1) {
                                            achId = ctrl.items[ctrl.items.length - 1];
                                            var pageIdArray = ctrl.items.slice(0, ctrl.items.length - 1);
                                            pageId = pageIdArray.join('#');
                                        } else {
                                            pageId = ctrl.items.join('#');
                                            achId = null;
                                        }
                                        $(ctrl.anchorTags[index]).removeAttr('isPathHavingHash');
                                    }
                                    $(ctrl.anchorTags[index]).on("click", function () {
                                        ctrl.changeState(documentId, pageId, achId);
                                    });
                                }
                                $(ctrl.anchorTags[index]).attr('style', 'cursor: pointer;');
                                $(ctrl.anchorTags[index]).removeAttr("class");
                                $(ctrl.anchorTags[index]).removeAttr('href');
                            }
                        } else {
                            $(ctrl.anchorTags[index]).attr('target', '_blank');
                        }
                    }
                });
            }

            function makeReleaseOptionsClickHandler(pageInfo, caller) {
                return function () {
                    if (caller === "modalPopupCtrl.pageContent") {
                        $rootScope.reloadPopUpOnLnkClk(pageInfo.Id);
                    } else {
                        ctrl.changeState(pageInfo.DocumentId, pageInfo.Id, null);
                    }
                };
            }

            function createPopupData(data, anchorIndex, caller) {
                var ul = window.document.createElement('ul');
                angular.element(ul).attr('class', 'dropdown-menu');
                angular.element(ul).attr('style', 'padding-left:2px;');
                angular.element(ul).attr('aria-labelledby', 'linktag' + anchorIndex);
                $(ul).append('<li class=\'releaseDropdownHeader\'>Select Page</li>');
                for (var i = 0; i < data.length; i++) {
                    var div = window.document.createElement('a');
                    var release = window.document.createElement('div');
                    angular.element(release).attr('style', 'padding:2px;font-size:10px;');
                    var page = window.document.createElement('div');
                    angular.element(page).attr('style', 'padding:2px;font-size:14px');
                    // Added NOSONAR because in version 2.2 we suppress the vulnerability in according to project architect and the security expert of the product.
                    // In detail the process was tracked by the TFS issue number 22519
                    // In version 2.3 SonarQube all those issues that were marked before reappeared again. Better, for a certain period the issues were listed as resolved and
                    // at the same time, they were listed as new issues.
                    // So a agreed solution with the team issue administrator is to mark them using an in-code approach.
                    // You can find details on the attached email on the TFS issue number 22519
                    var releaseName = window.localStorage.getItem(data[i].ReleaseId); //NOSONAR
                    if (releaseName) {
                        angular.element(release).append(releaseName);
                    } else {
                        angular.element(release).append(data[i].ReleaseId);
                    }
                    angular.element(page).append(data[i].Title);
                    angular.element(div).attr('style', 'cursor: pointer;');
                    angular.element(div).append(page);
                    angular.element(div).append(release);
                    div.addEventListener("click", makeReleaseOptionsClickHandler(data[i], caller));
                    $(div).wrap('<li></li>');
                    $(ul).append($(div).parent());
                }
                return ul;
            }
        }
    }

    DocumentAnchorController.$inject = ['$state', 'common.services.documentation.service'];
    function DocumentAnchorController($state, documentCenterService) {
        var vm = this;

        activate();

        function activate() {
            init();
        }

        function init() {
            vm.currentLink = $state.current.sitBreadcrumbLink;
            vm.docCenterUrl = documentCenterService.getDocCenterUrl();
        }

        // Function to navigate to specified heading within the page.
        vm.goToHeading = function (headerId) {
            var element = $('#' + headerId.trim());
            if (element.length === 0) {
                element = $('[name="' + headerId + '"]');
            }
            var target = element.offset().top;
            var headerHeight = $('.table-row').height();
            var breadcrumbHeight = $('.breadcrumb-div').height();
            $("div.doc-center-page").scrollTop(target - headerHeight - breadcrumbHeight);
        };

        vm.changeState = function (docId, pageId, aId) {
            if (docId) {
                $state.go('docHome.document.page', {
                    documentid: docId, pageid: pageId, anchorId: aId, preventReload: true
                });
            }
        };
    }

    /**
   * @ngdoc directive
   * @access public
   * @name sitDocumentationAnchorReslove
   * @module siemens.simaticit.common.components.documentation
   * @restrict E
   *
   * @description
   * A directive to resolve all document related anchor tags
   *
   *
   * @example
   * As an Element:
   * ```
   *   <sit-documentation-anchor-reslove></sit-documentation-anchor-reslove>
   * ```
   */
    angular.module('siemens.simaticit.common.components.documentation').directive('sitDocumentationAnchorReslove',
        ['$compile', '$rootScope', 'common.services.documentation.service', 'common.services.documentation.config', documentAnchor]);
})();

(function () {
    'use strict';

    function ModalPopupController($sce, $rootScope, $window, pageId, documentId, pageContent,
        query, data, docCenterUrl, releaseId, documentCenterServices, helpWindowService, helpWindowNavigationService) {

        var vm = this;

        activate();

        function init() {
            vm.pageContent = pageContent;
            vm.query = query;
            vm.data = data;
            vm.show = false;
            vm.showNoResult = false;
            vm.pageId = pageId;
            vm.documentId = documentId;
            vm.maxSearchResult = 10;
            vm.docCenterUrl = docCenterUrl;
            vm.releaseId = releaseId;
            vm.searchQuery = '';
            vm.showCloseIcon = false;
            vm.showAllResults = showAllResults;
            vm.isShowAllResults = true;
            vm.allResultsLength = 0;
            vm.setDefaultResults = 10;

            vm.clearQuery = clearQuery;
            vm.searchTextChanged = searchTextChanged;
            vm.closeDocPopup = closeDocPopup;
            vm.openDocCenterTab = openDocCenterTab;
            vm.reloadPopUpOnDocumentLnkClk = reloadPopUpOnDocumentLnkClk;
            vm.doSearchOnPopup = doSearchOnPopup;
            vm.draggable = draggable;
            vm.showPrev = false;
            vm.showNext = false;
            vm.goToPrevState = goToPrevState;
            vm.goToNextState = goToNextState;

            vm.svgIcons = {
                close: {
                    path: 'common/icons/cmdClosePanel24.svg',
                    size: '16px'
                },
                open: {
                    path: 'common/icons/cmdOpen24.svg',
                    size: '16px'
                },
                backward: {
                    path: 'common/icons/miscBackward24.svg',
                    size: '16px'
                },
                search: {
                    path: 'common/icons/cmdSearch24.svg',
                    size: '16px'
                }
            }
        }

        function activate() {
            if ('undefined' !== typeof pageContent && '' !== pageContent) {
                pageContent = hrefParser(pageContent);
            }

            init();

            setNavigationButtonStates(helpWindowNavigationService.savePageHistory({ Type: 'page', Id: pageId }));

            if (0 < data.length) {
                vm.show = false;
            } else {
                vm.show = true;
            }
        }

        function clearQuery() {
            vm.searchQuery = "";
            vm.showCloseIcon = false;
        }

        function searchTextChanged() {
            if (vm.searchQuery !== undefined && vm.searchQuery !== null && vm.searchQuery !== "") {
                vm.showCloseIcon = true;
            } else {
                vm.showCloseIcon = false;
            }
        }

        function closeDocPopup() {
            helpWindowService.hide();
        }

        function setNavigationButtonStates(state) {
            vm.showPrev = false;
            vm.showNext = false;
            if (!state.isFirstPage) {
                vm.showPrev = true;
            }
            if (!state.isLastPage) {
                vm.showNext = true;
            }
        }

        function goToPrevState() {
            goToState(helpWindowNavigationService.getPreviousPage());
        }

        function goToNextState() {
            goToState(helpWindowNavigationService.getNextPage());
        }

        function goToState(state) {
            if (state.Data.Type === 'page') {
                callPage(state.Data.Id, true);
            } else if (state.Data.Type === 'search') {
                doSearch(state.Data.Id, true);
            }
            setNavigationButtonStates(state);
        }

        function openDocCenterTab() {
            var url = '#/release/' + vm.releaseId + '/document/' + vm.documentId + '/page/' + vm.pageId;
            $window.open(vm.docCenterUrl + url, '_blank');
            $window.focus();
        }

        function draggable() {
            angular.element('.modal.doc-popup-modal').draggable({
                handle: ".help-window-toolbar",
                containment: '.modal-open'
            });
            angular.element('.modal.doc-popup-modal').resizable();
        }

        // Get first document page with a click on an internal link
        function reloadPopUpOnDocumentLnkClk(docId) {
            documentCenterServices.getDocument(docId).then(function (dataResponse) {
                var results = dataResponse;
                if ('undefined' !== typeof results && null !== results && null !== results.value && 'undefined' !== typeof results.value[0]) {
                    var docIndex = results.value[0];
                    var firstPage = docIndex.Contents;
                    var htmlObj = $.parseHTML(firstPage);
                    var hrefNodes = angular.element(htmlObj).find('[href]');
                    var pageId = '';
                    if (0 < hrefNodes.length) {
                        if (hrefNodes[0].attributes['href']) {
                            var hrefValue = hrefNodes[0].attributes['href'].value;
                            var splittedArray = hrefValue.split('\'');
                            if (splittedArray[1]) {
                                pageId = splittedArray[1];
                            }
                        }
                    }
                    callPage(pageId);
                }
            });
        }

        // Reload  popup text area within click on search control
        function doSearchOnPopup() {
            var quickSearchPopUpTextBox = vm.searchQuery.replace(/<\/?[^>]+>/gi, ' ');
            doSearch(quickSearchPopUpTextBox);
        }

        function callPage(docPageId, fromNavButton) {
            documentCenterServices.getPage(docPageId).then(function (dataResponse) {
                var results = dataResponse;
                if ('undefined' !== typeof results && null !== results && null !== results.value && 'undefined' !== typeof results.value[0]) {
                    if (!fromNavButton) {
                        setNavigationButtonStates(helpWindowNavigationService.savePageHistory({ Type: 'page', Id: docPageId }));
                    }

                    var html = results.value[0].Contents;
                    vm.pageId = results.value[0].Id;
                    vm.documentId = results.value[0].DocumentId;
                    html = hrefParser(html);
                    vm.data = [];
                    vm.pageContent = html;
                    vm.show = true;
                }
            });
        }

        function doSearch(query, fromNavButton) {
            vm.query = query;
            documentCenterServices.searchPages(query).then(function (dataResponse) {
                if (undefined !== dataResponse && undefined !== dataResponse.value) {
                    var results = dataResponse;
                    if ('undefined' !== typeof results && null != results && null !== results.value && 0 < results.value.length) {
                        vm.showNoResult = false;
                        if (!fromNavButton) {
                            setNavigationButtonStates(helpWindowNavigationService.savePageHistory({ Type: 'search', Id: query }));
                        }

                        vm.pageContent = '';
                        vm.data = [];
                        var data = results.value;
                        vm.allResultsLength = data.length;
                        vm.isShowAllResults = data.length > vm.setDefaultResults ? true : false;
                        vm.maxSearchResult = vm.setDefaultResults;
                        vm.pageContent = '';

                        angular.forEach(data, function (item) {
                            var res = $sce.trustAsHtml(item.HighlightedText);
                            item.HighlightedText = res;
                            vm.data.push(item);
                        });

                        vm.show = false;
                        vm.searchQuery = '';
                        vm.showCloseIcon = false;
                    } else {
                        vm.show = false;
                        vm.showCloseIcon = false;
                        vm.searchQuery = '';
                        vm.showNoResult = true;
                        vm.isShowAllResults = false;
                    }
                }
            });
        }

        function showAllResults(totalResults) {
            vm.maxSearchResult = totalResults > vm.setDefaultResults ? totalResults : vm.setDefaultResults;
            vm.isShowAllResults = false;
        }

        function hrefParser(data) {
            var html = $.parseHTML(data);

            var hrefNodes = angular.element(html).find('[href]');
            for (var j = 0, hrefNodesLength = hrefNodes.length; j < hrefNodesLength; j++) {
                var node = hrefNodes[j];

                var externalLink = '';
                var hrefValue = '';
                if (node.attributes['href']) {

                    hrefValue = node.attributes['href'].value;
                    externalLink = hrefValue;
                }

                //external link
                if (-1 !== hrefValue.toLowerCase().indexOf('http')) {
                    if (node.attributes['class']) {
                        angular.element(hrefNodes[j]).removeAttr('class');
                    }
                    if (node.attributes['target']) {
                        angular.element(hrefNodes[j]).removeAttr('target');
                    }
                    if (node.attributes['href']) {
                        angular.element(hrefNodes[j]).removeAttr('href');
                    }

                    // Add button to open new tab
                    var button = window.document.createElement('a');
                    angular.element(button).attr('href', externalLink);
                    angular.element(button).attr('target', '_blank');
                    var span = window.document.createElement('span');
                    angular.element(button).append(span);
                    angular.element(button).insertAfter(hrefNodes[j]);
                }
                    //internal link
                else if (node.getAttribute("href").indexOf("$filter=contains") === -1) {
                    if (node.attributes['target']) {
                        angular.element(hrefNodes[j]).removeAttr('target');
                    }

                    var pageId = '';
                    var documentId = '';
                    var splittedHref = hrefValue.split('/page/');
                    if (1 < splittedHref.length) {
                        pageId = splittedHref[1];
                        var docSplitted = splittedHref[0].split('/document/');
                        if (1 < docSplitted.length) {
                            documentId = docSplitted[1];
                        }
                    }

                    var pageIdParts = [];
                    pageIdParts = pageId.split('#');
                    if (pageIdParts[0] !== vm.pageId) {

                        angular.element(hrefNodes[j]).attr('href', '#');
                        angular.element(hrefNodes[j]).attr('ng-click', "reloadPopUpOnLnkClk('" + pageIdParts[0] + "')");
                    }
                    else {
                        angular.element(hrefNodes[j]).attr('issamepage', true);
                    }
                }
            }

            //Re-assign to data
            var htmlStr = '';
            for (var k = 0, htmlLength = html.length ; k < htmlLength; k++) {
                if (html[k].nodeName !== '#text') {
                    var ss = html[k].outerHTML;
                    htmlStr += ss;
                }
            }
            data = htmlStr;
            return data;
        }

        // Reload  popup text area within click on an internal link
        $rootScope.reloadPopUpOnLnkClk = function (docPageId) {
            callPage(docPageId);
        };

    }

    ModalPopupController.$inject = ['$sce', '$rootScope', '$window', 'pageId', 'documentId', 'pageContent', 'query', 'data', 'docCenterUrl', 'releaseId',
        'common.services.documentation.service', 'common.components.documentation.helpWindowService', 'common.components.documentation.helpWindowNavigationService'];

    angular.module('siemens.simaticit.common.components.documentation').controller('common.components.documentation.modalPopupController', ModalPopupController);

})();

(function () {
    'use strict';

    function HelpWindowController($scope, $rootScope, $modal, $timeout, $window, $translate, documentCenterServices, busyIndicatorService,
        helpWindowNavigationService, globalMsgOverlayManager) {
        var vm = this;
        activate();

        function init() {
            vm.query = '';
            vm.data = [];
            vm.pageContent = '';
            vm.docCenterUrl = documentCenterServices.getDocCenterUrl();
            vm.modalInstanceTimeout = null;
            vm.openDocPopup = openDocPopup;
            vm.showWindow = showWindow;
            vm.hideWindow = hideWindow;
            vm.closePopup = '';
            vm.isAlreadyOpen = false;
            vm.isClosed = true;
            vm.pageCode = '';
        }

        function activate() {
            init();
        }

        function showWindow() {
            vm.isAlreadyOpen = false;
            if (0 < angular.element('#popupDocCenter').length) {
                vm.isAlreadyOpen = true;
            }
            if (!vm.sitPageId) {
                if (vm.sitPageTitle || vm.pageCode) {
                    //set Page Id by searching from titles
                    var optionString = '';
                    if (vm.sitPageTitle) {
                        optionString = "$filter=indexof(tolower(Title),tolower('" + vm.sitPageTitle + "')) ne -1";
                    } else {
                        optionString = "$filter=indexof(tolower(Code),tolower('" + vm.pageCode + "')) ne -1";
                    }
                    documentCenterServices.getAllPages(optionString).then(function (dataResponse) {
                        var results = dataResponse;
                        vm.query = vm.sitPageTitle;
                        if ('undefined' !== typeof results && null !== results && null !== results.value && results.value.length) {
                            vm.sitPageId = results.value[0].Id;
                            openPopupWindow();
                        } else {
                            if (vm.sitIsTabbed) {
                                openTabbedDocCenter();
                            } else {
                                var unknownPage = $translate.instant('common.helpWindow.unknown-page');
                                vm.pageContent = '<h1>' + unknownPage + '</h1>';
                                openDocPopup();
                            }
                        }
                    }).catch(function (error) {
                        busyIndicatorService.hide();
                        var overlaySettings = {
                            buttons: [{
                                id: 'ok',
                                displayName: $translate.instant('common.ok'),
                                onClickCallback: hideOverlay
                            }],
                            text: [$translate.instant('common.helpWindow.no-documents'),(vm.sitPageTitle || vm.pageCode)].join(' ')
                        };

                        globalMsgOverlayManager.set(overlaySettings);
                        globalMsgOverlayManager.show();
                    });
                }
                else if (vm.sitPageQuery) {
                    //Set Page Id by search
                    documentCenterServices.searchPages(vm.sitPageQuery).then(function (dataResponse) {
                        var results = dataResponse;
                        vm.query = vm.sitPageQuery;
                        if ('undefined' !== typeof results && null !== results && null !== results.value && results.value.length) {
                            vm.sitPageId = results.value[0].Id;
                            openPopupWindow();
                        } else {
                            if (vm.sitIsTabbed) {
                                openTabbedDocCenter();
                            } else {
                                var unknownPage = $translate.instant('common.helpWindow.unknown-page');
                                vm.pageContent = '<h1>' + unknownPage + '</h1>';
                                openDocPopup();
                            }

                        }
                    });
                }
            }
            else {
                openPopupWindow();
            }
        }

        function hideOverlay() {
            globalMsgOverlayManager.hide();
        }

        function openPopupWindow() {
            if (vm.isAlreadyOpen) {
                $rootScope.reloadPopUpOnLnkClk(vm.sitPageId);
                busyIndicatorService.hide();
            } else {
                showPageInformation(vm.sitPageId);
            }
        }

        function hideWindow() {
            helpWindowNavigationService.clearPageHistory();
            vm.closePopup();
            vm.isClosed = true;
        }

        function showPageInformation(pageId) {
            documentCenterServices.getPage(pageId).then(function (dataResponse) {
                var results = dataResponse;
                vm.query = pageId;
                if ('undefined' !== typeof results && null !== results && null !== results.value && results.value.length) {
                    var html = results.value[0].Contents;
                    vm.data = [];
                    vm.pageContent = html;
                    vm.pageId = results.value[0].Id;
                    vm.releaseId = results.value[0].ReleaseId;
                    vm.documentId = results.value[0].DocumentId;
                    if (vm.sitIsTabbed) {
                        openTabbedDocCenter(vm.releaseId, vm.documentId, vm.pageId);
                        return;
                    }
                }
                openDocPopup();
            });
        }

        function openDocPopup() {
            if (vm.isClosed) {
                var modalInstance = $modal.open({
                    templateUrl: 'PopupContent.html',
                    controller: 'common.components.documentation.modalPopupController',
                    controllerAs: 'modalPopupCtrl',
                    backdrop: false,
                    keyboard: false,
                    right: 'auto',
                    animation: true,
                    bottom: 'auto',
                    overflow: 'visible',
                    resolve: {
                        pageId: function () {
                            return vm.pageId;
                        },
                        documentId: function () {
                            return vm.documentId;
                        },
                        pageContent: function () {
                            return vm.pageContent;
                        },
                        query: function () {
                            return vm.query;
                        },
                        data: function () {
                            return vm.data;
                        },
                        docCenterUrl: function () {
                            return vm.docCenterUrl;
                        },
                        releaseId: function () {
                            return vm.releaseId;
                        }
                    }
                });

                vm.isClosed = false;

                vm.closePopup = modalInstance.close;

                // Here we do some DOM manipolation overriding the popup modal css classes using selectors
                // using timeout we can wait till DOM is rendered and so we could apply changes to html elements already loaded.
                modalInstance.opened.then(
                    vm.modalInstanceTimeout = $timeout(function () {
                        angular.element('#popupDocCenter').parent().parent().addClass('doc-popup-dialog');
                        angular.element('#popupDocCenter').parent().addClass('doc-popup-content');
                        angular.element('#popupDocCenter').parent().parent().parent().addClass('doc-popup-modal');
                    })
                );
            }
            busyIndicatorService.hide();
        }

        function openTabbedDocCenter(releaseId, docId, pageId) {
            busyIndicatorService.hide();
            var url = '#/release/' + releaseId + '/document/' + docId + '/page/' + pageId;
            $window.open(vm.docCenterUrl + url, '_blank');
            $window.focus();
            return;
        }

        $scope.$on('$destroy', function () {
            $timeout.cancel(vm.modalInstanceTimeout);
            vm.modalInstanceTimeout = null;
        });
    }

    HelpWindowController.$inject = ['$scope', '$rootScope', '$uibModal', '$timeout', '$window', '$translate', 'common.services.documentation.service',
        'common.widgets.busyIndicator.service', 'common.components.documentation.helpWindowNavigationService', 'common.widgets.messageOverlay.service'];

    function helpWindow(helpWindowService) {
        return {
            restrict: 'E',
            scope: {},
            bindToController: {
                sitPageId: '=?',
                sitPageQuery: '=?',
                sitPageTitle: '=?',
                sitIsTabbed: '=?'
            },
            controller: HelpWindowController,
            controllerAs: 'helpWindowCtrl',
            templateUrl: 'common/components/documentation/helpWindow/help-window.html',
            link: function (scope, element, attrs, ctrl) {
                function show(args) {
                    ctrl.sitPageId = args.pageId;
                    ctrl.sitPageQuery = args.searchQuery;
                    ctrl.sitPageTitle = args.pageTitle;
                    ctrl.sitIsTabbed = args.isTabbed;
                    ctrl.pageCode = args.pageCode;
                    ctrl.showWindow();
                }

                function hide() {
                    ctrl.hideWindow();
                }

                scope.$on('$destroy', function () {
                });

                helpWindowService.registerShowCallback(show);
                helpWindowService.registerHideCallback(hide);
            }
        };
    }

    /**
     * @ngdoc directive
     * @name sitHelpWindow
     * @module siemens.simaticit.common.components.documentation
     * @access internal
     * @restrict E
     *
     * @description
     * A directive used to model a pop-up, which performs a search operation in a page, and allows you to navigation the results.
     * Only one instance of the pop-up is allowed. If a new pop-up is trying to open, its contents will be updated with the new
     * content.
     *
     * @example
     * The following example shows how to configure a help window in a view template. The help window component
     * can use either the page ID , page query or page title as an attribute.
     * ```
     *   <sit-help-window sit-page-id="pageCtrl.id">
     *   </sit-help-window >
     *
     * In the above example the directive uses the ID of the page (page-id).
     * The documentation service retrieves the requested page based on this pageId to construct the help window.
     *
     *                      OR
     *
     *  <sit-help-window  sit-page-query='pageCtrl.query'>
     *  </sit-help-window >
     *
     * In this example the page-query (the documentation service searches the requested page based on the query) is used to
     * create the help window.
     *
     *                      OR
     *
     *  <sit-help-window  sit-page-title='pageCtrl.title'>
     *  </sit-help-window >
     *
     * In this example the page-title (the documentation service searches the requested page based on the query) is used to
     * create the help window.
     * ```
     */
    angular.module('siemens.simaticit.common.components.documentation').directive('sitHelpWindow', ['common.components.documentation.helpWindowService', helpWindow]);

}
)();

"use strict";
/**
 * @ngdoc service
 * @module siemens.simaticit.common.components.documentation
 * @access internal
 * @name common.components.documentation.helpWindowNavigationService
 *
 * @description
 * Contains presentation service to keep the page history
 *
 * @example
 * The following methods are exposed by the service
 * 1.savePageHistory
 * The argument for this method has to be an object with Type and Id as properties
 * Returns the current page object
 * Sample-> savePageHistory({Type:"page/search",Id:"PageId/search string"}
 * 2.getNextPage
 * Returns the next page ( page which was rendered in the help window before the previous button was clicked )
 * 3.getPreviousPage
 * Returns the previous page called within the help window
 * 4.clearPageHistory
 * clears the page history
 */
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var HelpWindowNavigationService = /** @class */ (function () {
            function HelpWindowNavigationService() {
                this.maxHistoryCount = 20;
                this.navigationArray = [];
            }
            HelpWindowNavigationService.prototype.clearPageHistory = function () {
                this.navigationArray = [];
            };
            HelpWindowNavigationService.prototype.getNextPage = function () {
                var result = $.grep(this.navigationArray, function (e) { return e.isCurrentPage === true; });
                var currentIndex = this.navigationArray.indexOf(result[0]);
                this.navigationArray[currentIndex].isCurrentPage = false;
                this.navigationArray[currentIndex + 1].isCurrentPage = true;
                return this.navigationArray[currentIndex + 1];
            };
            HelpWindowNavigationService.prototype.getPreviousPage = function () {
                var result = $.grep(this.navigationArray, function (e) { return e.isCurrentPage === true; });
                var currentIndex = this.navigationArray.indexOf(result[0]);
                this.navigationArray[currentIndex].isCurrentPage = false;
                this.navigationArray[currentIndex - 1].isCurrentPage = true;
                return this.navigationArray[currentIndex - 1];
            };
            HelpWindowNavigationService.prototype.savePageHistory = function (navigationData) {
                var result = $.grep(this.navigationArray, function (e) { return e.isCurrentPage === true; });
                if (result.length === 1 && navigationData.Id === result[0].Data.Id) {
                    return result[0];
                }
                if (result.length === 1) {
                    var currentIndex = this.navigationArray.indexOf(result[0]);
                    this.navigationArray[currentIndex].isCurrentPage = false;
                    this.navigationArray[currentIndex].isLastPage = false;
                    this.navigationArray.splice(currentIndex + 1, (this.navigationArray.length - 1) - currentIndex);
                }
                if (this.navigationArray.length === 0) {
                    this.navigationArray.push({ Data: navigationData, isCurrentPage: true, isFirstPage: true, isLastPage: true });
                }
                else if (this.navigationArray.length < this.maxHistoryCount) {
                    this.navigationArray.push({ Data: navigationData, isCurrentPage: true, isFirstPage: false, isLastPage: true });
                }
                else {
                    this.navigationArray.shift();
                    this.navigationArray[0].isFirstPage = true;
                    this.navigationArray.push({ Data: navigationData, isCurrentPage: true, isFirstPage: false, isLastPage: true });
                }
                return this.navigationArray[this.navigationArray.length - 1];
            };
            return HelpWindowNavigationService;
        }());
        framework.HelpWindowNavigationService = HelpWindowNavigationService;
        angular
            .module('siemens.simaticit.common.components.documentation')
            .service('common.components.documentation.helpWindowNavigationService', HelpWindowNavigationService);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
// jshint ignore: end 
//# sourceMappingURL=sit-help-window-navigation-svc.js.map
"use strict";
/**
 * @ngdoc service
 * @module siemens.simaticit.common.components.documentation
 * @name common.components.documentation.helpWindowService
 *
 * @description
 * This service is used to configure, show, and a hide a help window containing contextual documentation.
 * @example
 * The easiest way to display documentation contextual to a web page consists in simply specifying a **help** property in the **data** object of a state configuration,
 * and set it to the title of a relevant documentation page.
 *
 * In the following example, the **help** property is set to 'Configuring UI Applications'.
    * ```
    * (function () {
    *'use strict';
    * //Application Editor route configuration
    * angular.module('siemens.simaticit.admin.applicationEditor')
    *    .config(['$stateProvider', function ($stateProvider) {
    *
    *         var applicationEditorHome = {
    *            name: 'adminHome.projectHome.applicationEditor',
    *            url: '/application-editor',
    *            views: {
    *                'Canvas@': {
    *                    templateUrl: 'admin/modules/application-editor/app-editor-home/app-editor.html',
    *                    controller: 'admin.applicationEditor.appEditorController',
    *                    controllerAs: 'appEditorCtrl'
    *                },
    *                'property-area-container@': {
    *                    templateUrl: 'admin/modules/application-editor/app-editor-home/create-spa.html',
    *                    controller: 'admin.applicationEditor.createSPAController',
    *                    controllerAs: 'createSPACtrl'
    *                }
    *            },
    *            data: {
    *                title: 'UI Applications',
    *                help: 'Configuring UI Applications'
    *            }
    *        };
    *
    * ```
    * In this case, when the user navigates to this state and clicks the <i class="fa fa-question-circle"></i> help icon in the header bar, the 'Configuring UI Applications' page
    * will be opened within the help window.
    *
    * Alternatively, it is possible to also programmatically show and hide the help window using the **show** and **hide** methods.
    */
/**
* @ngdoc method
* @name common.components.documentation.helpWindowService#show
* @description
* Shows the help window of the specific page. The parameters are considered in order, first **pageId**, then **pageTitle** and finally **searchQuery**.
* @param {String} pageId
* Contains the page Id of the page to be loaded.
* @param {String} pageTitle
* Contains the title of a page that should match.
* @param {String} searchQuery
* Contains the search query text.
*/
/**
* @ngdoc method
* @name common.components.documentation.helpWindowService#hide
* @description
* Closes the help window of the specific page.
*/
// jshint ignore: start
var sit;
(function (sit) {
    var framework;
    (function (framework) {
        var HelpWindowService = /** @class */ (function () {
            function HelpWindowService() {
                this.helpWindowCount = 0;
                this.showCallbacks = [];
                this.hideCallbacks = [];
            }
            HelpWindowService.prototype.show = function (data) {
                this.showCallbacks.forEach(function (fnCallback) {
                    fnCallback(data);
                });
            };
            HelpWindowService.prototype.hide = function () {
                this.hideCallbacks.forEach(function (fnCallback) {
                    fnCallback();
                });
            };
            HelpWindowService.prototype.registerShowCallback = function (fnCallback) {
                if (fnCallback) {
                    this.showCallbacks.push(fnCallback);
                }
            };
            HelpWindowService.prototype.registerHideCallback = function (fnCallback) {
                if (fnCallback) {
                    this.hideCallbacks.push(fnCallback);
                }
            };
            return HelpWindowService;
        }());
        framework.HelpWindowService = HelpWindowService;
        angular
            .module('siemens.simaticit.common.components.documentation')
            .service('common.components.documentation.helpWindowService', HelpWindowService);
    })(framework = sit.framework || (sit.framework = {}));
})(sit || (sit = {}));
// jshint ignore: end
//# sourceMappingURL=sit-help-window-svc.js.map