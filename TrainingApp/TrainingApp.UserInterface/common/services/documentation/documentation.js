/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';

    /**
     * @ngdoc module
     * @name siemens.simaticit.common.services.documentation
     * @module siemens.simaticit.common
     * @description
     * This module provides services and providers through which it possible to retrieve documentation data.
     */
    angular.module("siemens.simaticit.common.services.documentation", []);

})();

(function () {
    'use strict';

    /**
     * @ngdoc provider
     * @name common.services.documentation.configProvider
     * @module siemens.simaticit.common.services.documentation
     *
     * @description
     * Configures Documentation Service Layer endpoint.
     *
     * @property {string} config.oDataServiceURI The URI of the Documentation Service Layer.
     */
    angular.module("siemens.simaticit.common.services.documentation").provider('common.services.documentation.config', [function () {

        this.config = {
            oDataServiceURI: ''
        };

        /**
     * @ngdoc service
     * @name common.services.documentation.config
     * @module siemens.simaticit.common.services.documentation
     *
     * @description
     * Configures Documentation Service Layer endpoint.
     *
     * @property {string} config.oDataServiceURI The URI of the Documentation Service Layer.
     */
        this.$get = function () {
            return {
                config: this.config
            };
        };
    }]);

    /**
     * @ngdoc service
     * @name common.services.documentation.service
     * @module siemens.simaticit.common.services.documentation
     *
     * @requires $q
     * @requires $resource
     * @requires $http
     * @requires service:ExecutionError
     * @requires common.services.documentation.config
     *
     * @description
     * Exposes methods for retrieving documentation data, such as Documentation Releases, Documens, Pages and Assets.
     *
     *
     * @example
     * In a controller, the **common.services.documentation.service** can be used as follows:
     *
     * ```
     *      // ...
     *      busyIndicatorService.show();
     *      result =null;
     *      businessData.getPages("$select=Id,Title,DocumentId,ReleaseId&$top=5").then(function (data) {
     *          result = data;
     *          busyIndicatorService.hide();
     *      }, function (error) {
     *          busyIndicatorService.hide();
     *          messageOverlayService.setOverlayData({
     *                   buttons: [{
     *                   id: 'ok',
     *                   displayName: 'OK',
     *                   onClickCallback: function () {
     *                      // some logic goes here
     *                      messageOverlayService.hideOverlayModal();
     *                   }
     *              }],
     *              title: "An error occurred retrieving pages",
     *              text: error.data.error.errorCode + ' - ' + error.data.error.errorMessage
     *          });
     *         messageOverlayService.showOverlayModal();
     *      });
     *
     *```
     *
     */
    angular.module("siemens.simaticit.common.services.documentation").service('common.services.documentation.service', DocumentationCenterService);

    DocumentationCenterService.$inject = ['$q', '$resource', '$http', '$translate', 'common', 'CommandResponse', 'ExecutionError', 'common.services.documentation.config'];
    function DocumentationCenterService($q, $resource, $http, $translate, common, CommandResponse, ExecutionError, documentationCenterConfigProvider) {
        var vm = this;
        var oDataPath = documentationCenterConfigProvider.config.oDataServiceURI;

        activate();

        function activate() {
            init();
        }
        function init() {
            vm.getDocument = getDocument;
            vm.getAllDocuments = getAllDocuments;
            vm.getPage = getPage;
            vm.getFirstPageFromDoc = getFirstPageFromDoc;
            vm.pagesRelated = pagesRelated;
            vm.pagesRelatedFromFirstPageDoc = pagesRelatedFromFirstPageDoc;
            vm.getAllPages = getAllPages;
            vm.searchPages = searchPages;
            vm.guessPage = guessPage;
            vm.getDocumentFacets = getDocumentFacets;
            vm.getPageFacets = getPageFacets;
            vm.getDocCenterUrl = getDocCenterUrl;
            vm.getAsset = getAsset;
            vm.getAllAssets = getAllAssets;
            vm.getRelease = getRelease;
            vm.getAllReleases = getAllReleases;
            vm.getExpandedPage = getExpandedPage;
            vm.getTypeAheadInputs = getTypeAheadInputs;
            vm.getPageReleases = getPageReleases;
            vm.getDocumentFirstPageID = getDocumentFirstPageID;
            vm.getDocumentsofLatestRelease = getDocumentsofLatestRelease;
        }

        function transformResObj(data) {
            var res = null;

            if (data) {
                try {
                    var Jsondata = JSON.parse(data);
                    //odata Response Error
                    if (Jsondata['odata.error']) {
                        res = new CommandResponse(false, new ExecutionError(Jsondata['odata.error'].code, Jsondata['odata.error'].message.value));
                        common.logger.logError(Jsondata['odata.error'].code + ' : ' + Jsondata['odata.error'].message.value, '', 'Exchange Data Service');
                    }
                    //odata Response with data
                    if (Jsondata['@odata.context']) {
                        res = new CommandResponse(true, new ExecutionError(0, ''));
                        var v = Jsondata.value;
                        if (typeof (v) === 'undefined') {
                            res.value = Jsondata.Value;
                        }
                        else {
                            res.value = Jsondata.value;
                        }

                    }
                    //http error
                    if (Jsondata.error) {
                        res = new CommandResponse('false', new ExecutionError(Jsondata.error.code, Jsondata.error.message));
                        common.logger.logError(Jsondata.error.code + ' : ' + Jsondata.error.message, '', 'Exchange Data Service');
                    }

                } catch (ex) {
                    res = new CommandResponse(false, new ExecutionError(-1, "Error: " - ex.message));
                    common.logger.logError('-1: Error: ' + ex.message, '', 'Exchange Data Service');
                }

            } else {
                res = new CommandResponse(false, new ExecutionError(-1, 'Generic Error'));
                common.logger.logError('-1: Error: Generic Error', '', 'Exchange Data Service');
            }

            return res;
        }

        /* Remove some metadata tag from json */
        function removeMetafromArrayJSON(data) {
            var multyValuesArray = new Array(["Audience", "Technology", "Functionality", "ProductOptionVersions"]);
            var metaToRemove = new Array(["BookletId", "Author", "BookletSummary", "State", "Revision", "ReleaseId",
                "ProductOptionVersions", "Product", "Version", "MasterProductVersion", "Language"]);
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (multyValuesArray.indexOf(key) > -1) {
                            if (data[i][key] !== null) {
                                var items = data[i][key].split(",");
                                delete data[i][key];

                                var newArray = [];
                                for (var j = 0; j < items.length; j++) {
                                    // Add property to object
                                    newArray.push(items[j].replace(" ", "").replace(".", ""));
                                }
                                data[i][key] = newArray;
                            }
                        }

                        if (metaToRemove.indexOf(key) > -1) {
                            delete data[i][key];
                        }
                    }
                }

            }

            return data;
        }

        /* Function that modifies page json */
        function managePageJSON(data) {
            var j;
            for (var i = 0; i < data.length; i++) {
                var obj = data[i];
                var document_id = null;
                for (var key in obj) {
                    if (key === "DocumentId") {
                        document_id = data[i][key];
                    }
                }

                if (!data[i].Contents) {
                    continue;
                }
                var html = $.parseHTML(data[i].Contents);
                var hrefNodes = $(html).find("[href]");
                for (j = 0; j < hrefNodes.length; j++) {
                    var node = hrefNodes[j];
                    if (!node.attributes["href"]) {
                        continue;
                    }
                    var hrefValue = node.attributes["href"].value;
                    if (hrefValue.toLowerCase().indexOf("http") === -1) {
                        var newStr = '';
                        var splittedArray = '';
                        if (hrefValue.toLowerCase().indexOf("$filter=contains") > -1) {

                            splittedArray = hrefValue.split("'");
                            //    //var pageTitle = null;
                            //    //if (splittedArray[1]) {
                            //    //    pageTitle = splittedArray[1];
                            //    //    pageTitle = pageTitle.replace(/ /g, "_");
                            //    //}

                            //    //var docId = null;
                            //    //if (splittedArray[3]) {
                            //    //    docId = splittedArray[3];
                            //    //}

                            //    //var pageId = docId + "_" + pageTitle;
                            //    //newStr = "#/document/" + docId + "/page/" + pageId;
                            //    //hrefNodes[j].attributes["href"].value = newStr;
                        } else {
                            splittedArray = hrefValue.split("'");
                            var page_id = null;
                            if (splittedArray[1]) {
                                page_id = splittedArray[1];
                            }
                            newStr = "#/document/" + document_id + "/page/" + page_id;

                            hrefNodes[j].attributes["href"].value = newStr;
                        }
                    }
                }

                //Re-assign to data
                var htmlStr = "";
                for (j = 0; j < html.length; j++) {
                    if (html[j].nodeName === "#text") {
                        continue;
                    }
                    if (html[j].nodeName === "META" || html[j].nodeName === "LINK") {
                        continue;
                    }
                    var ss = html[j].outerHTML;
                    htmlStr += ss;
                }
                data[i].Contents = htmlStr;
            }
            return data;
        }

        function getCmd(path) {
            return $resource('', {}, {
                getAll: {
                    method: 'GET',
                    url: path,
                    transformResponse: [transformResObj].concat($http.defaults.transformResponse)
                }
            });
        }

        /* Set highlight directive in json */
        function setHightlightTag(data) {

            var addHighlighterDirective = function () {
                var element = $(this);
                // Trim & remove double-spaces.
                // Note: \s cannot be used because newlines must be preserved.
                element.text(element.text().trim().replace(/ {2}/g, ' '));
                return element.attr('sit-code-highlight', true);
            };
            for (var i = 0; i < data.length; i++) {
                var strHtml = "";
                if (data[i].Contents) {
                    strHtml = data[i].Contents;
                    var selectors = '.codeSnippetContainerCode > pre, code';
                    var objHtml = $('<div>' + strHtml + '</div>');
                    objHtml.find(selectors).replaceWith(addHighlighterDirective);
                    strHtml = objHtml.html();
                }

                //Re-assign to data
                if (strHtml || strHtml !== '') {
                    data[i].Contents = strHtml;
                }

            }
        }

        /* Method that retrieves json by http get call */
        function retrieveJsonHttpGetDoc(path, doRegularPolish, doPagePolish, doHighlightWrap) {
            var deferred = $q.defer();
            return getCmd(path).getAll(function (data) {
                if (data.value) {
                    if (doHighlightWrap) {
                        setHightlightTag(data.value);
                    }
                    if (doRegularPolish) {
                        removeMetafromArrayJSON(data.value);
                    }
                    if (doPagePolish) {
                        managePageJSON(data.value);
                    }
                }
            }, function (err) {
                var exeError = common.setExecutionError(err);
                deferred.reject({ data: new CommandResponse(false, new ExecutionError(-1, exeError)) });
                return deferred.promise;
            }).$promise;
        }



        /**
         * @ngdoc method
         * @name common.services.documentation.service#getAsset
         * @param {string} entityId The ID of the asset to be retrieved.
         * @returns {Promise} A Promise object containing asset data.
         *
         * @description
         * Retrieves a documentation asset by its unique ID.
         *
         */
        function getAsset(id) {
            var deferred = $q.defer();
            var path = oDataPath + "Asset('" + id + "')";

            if (!id || id === '') {

                deferred.reject({
                    data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.documentation.noID')))
                });
                return deferred.promise;
            }

            return retrieveJsonHttpGetDoc(path, false, false, false);
        }

        /**
         * @ngdoc method
         * @name common.services.documentation.service#getAllAssets
         * @param {string} [options] An OData query string.
         * @returns {Promise} A Promise object containing asset data matching the query.
         *
         * @description
         * Retrieves documentation assets.
         *
         */
        function getAllAssets(options) {
            var path = oDataPath + "Asset";

            if (options) {
                path += '?' + options;
            }

            return retrieveJsonHttpGetDoc(path, false, false, false);
        }

        /**
         * @ngdoc method
         * @name common.services.documentation.service#getRelease
         * @param {string} entityId The ID of the release to be retrieved.
         * @returns {Promise} A Promise object containing release data.
         *
         * @description
         * Retrieves a documentation release by its unique ID.
         *
         */
        function getRelease(id) {
            var deferred = $q.defer();
            var path = oDataPath + "Release('" + id + "')";

            if (!id || id === '') {

                deferred.reject({
                    data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.documentation.noID')))
                });
                return deferred.promise;
            }

            return retrieveJsonHttpGetDoc(path, false, false, false);
        }

        /**
         * @ngdoc method
         * @name common.services.documentation.service#getAllReleases
         * @param {string} [options] An OData query string.
         * @returns {Promise} A Promise object containing release data matching the query.
         *
         * @description
         * Retrieves documentation releases.
         *
         */
        function getAllReleases(options) {
            var path = oDataPath + "Release";

            if (options) {
                path += '?' + options;
            }

            return retrieveJsonHttpGetDoc(path, false, false, false);
        }

        /**
         * @ngdoc method
         * @name common.services.documentation.service#getPage
         * @param {string} entityId The ID of the page to be retrieved.
         * @returns {Promise} A Promise object containing page data.
         *
         * @description
         * Retrieves a documentation page by its unique ID.
         *
         */
        function getPage(id) {
            var deferred = $q.defer();
            var path = oDataPath + "Page?$filter=Id eq '" + id + "'";

            if (!id || id === '') {
                deferred.reject({
                    data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.documentation.noID')))
                });
                return deferred.promise;
            }

            return retrieveJsonHttpGetDoc(path, true, true, true);
        }

        /**
         * @ngdoc method
         * @name common.services.documentation.service#getExpandedPage
         * @param {string} entityId The ID of the page to be retrieved.
         * @returns {Promise} A Promise object containing page data.
         *
         * @description
         * Retrieves a documentation page and also its container document.
         *
         */
        function getExpandedPage(id) {
            var deferred = $q.defer();
            var path = oDataPath + "Page('" + id + "')?$expand=Documents";

            if (!id || id === '') {
                deferred.reject({
                    data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.documentation.noID')))
                });
                return deferred.promise;
            }

            return retrieveJsonHttpGetDoc(path, true, true, true);
        }

        /**
         * @ngdoc method
         * @name common.services.documentation.service#getFirstPageFromDoc
         * @param {string} entityId The ID of the document for which the first page must be retrieved.
         * @returns {Promise} A Promise object containing page data.
         *
         * @description
         * Retrieves the first page of the specified document.
         *
         */
        function getFirstPageFromDoc(id) {
            var deferred = $q.defer();
            var path = oDataPath + "Page?$filter=DocumentId eq '" + id + "'&$expand=Documents&$top=1";
            if (!id || id === '') {
                deferred.reject({
                    data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.documentation.noID')))
                });
                return deferred.promise;
            }

            return retrieveJsonHttpGetDoc(path, true, true, true);
        }

        /**
        * @ngdoc method
        * @name common.services.documentation.service#getDocumentFirstPageID
        * @param {string} entityId The ID of the document for which the first page must be retrieved.
        * @returns {Promise} A Promise object containing page data.
        *
        * @description
        * Retrieves the ID and Title of the first page of the specified document.
        *
        */
        function getDocumentFirstPageID(docId) {
            var deferred = $q.defer();
            var path = oDataPath + "Page?$filter=DocumentId eq '" + docId + "'and IsFirstPage eq true&$select=Id,DocumentTitle";
            if (!docId || docId === '') {
                deferred.reject({
                    data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.documentation.noID')))
                });
                return deferred.promise;
            }
            return retrieveJsonHttpGetDoc(path, false, false, false);
        }

        /**
        * @ngdoc method
        * @name common.services.documentation.service#getAllPages
        * @param {string} [options] An OData query string.
        * @returns {Promise} A Promise object containing page data matching the query.
        *
        * @description
        * Retrieves documentation pages.
        *
        */
        function getAllPages(options) {
            var path = oDataPath + "Page";

            if (options) {
                path += '?' + options;
            }

            return retrieveJsonHttpGetDoc(path, true, true, true);
        }

        /**
        * @ngdoc method
        * @name common.services.documentation.service#searchPages
        * @param {string} query The words to search for.
        * @param {string} [options] An OData query string.
        * @param {boolean} isLatest If set to **true**, the search will be performed only on latest contents.
        * @returns {Promise} A Promise object containing page data matching the query.
        *
        * @description
        * Performs a full-text search on documentation pages.
        *
        */
        function searchPages(query, options, isLatest) {
            var deferred = $q.defer();
            var path = oDataPath + "Page?$search='" + query + "'";
            if (isLatest) {
                path = oDataPath + "Page('GetLatest')?$search='" + query + "'";
            }

            if (options) {
                path += '&' + options;
            }

            if (!query || query === '') {

                deferred.reject({
                    data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.documentation.noID')))
                });
                return deferred.promise;
            }

            return retrieveJsonHttpGetDoc(path, false, false, false);
        }

        /**
        * @ngdoc method
        * @name common.services.documentation.service#pagesRelated
        * @param {string} entityId The ID of the page for which the related pages must be retrieved.
        * @param {string} [options] An OData query string.
        * @returns {Promise} A Promise object containing page data matching the query.
        *
        * @description
        * Retrieves pages that contain similar content to the specified page.
        *
        */
        function pagesRelated(id, options) {
            var deferred = $q.defer();
            var path = oDataPath + "Page?$related=Id eq '" + id + "'";

            if (options) {
                path += '&' + options;
            }

            if (!id || id === '') {

                deferred.reject({
                    data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.documentation.noID')))
                });
                return deferred.promise;
            }

            return retrieveJsonHttpGetDoc(path, true, true, false);
        }

        /**
         * @ngdoc method
         * @name common.services.documentation.service#pagesRelatedFromFirstPageDoc
         * @param {string} entityId The ID of the document for which the related pages must be retrieved.
         * @returns {Promise} A Promise object containing page data matching the query.
         * @access internal
         * @description
         * Retrieves pages that contain similar content to the specified document.
         *
         */
        function pagesRelatedFromFirstPageDoc(id, options) {
            var deferred = $q.defer();
            var path = oDataPath + "Page?$related=DocumentId eq '" + id + "'";

            if (options) {
                path += '&' + options;
            }

            if (!id || id === '') {

                deferred.reject({
                    data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.documentation.noID')))
                });
                return deferred.promise;
            }

            return retrieveJsonHttpGetDoc(path, true, true, false);
        }

        /**
        * @ngdoc method
        * @name common.services.documentation.service#guessPage
        * @param {string} query The words to search for.
        * @param {string} [options] An OData query string.
        * @returns {Promise} A Promise object containing page data matching the query.
        *
        * @description
        * Retrieves the first page matching a search query.
        *
        */
        function guessPage(query, options) {
            var deferred = $q.defer();
            var path = oDataPath + "Page?$search='" + query + "'&$top=1";

            if (options) {
                path += '&' + options;
            }

            if (!query || query === '') {

                deferred.reject({
                    data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.documentation.noQuery')))
                });
                return deferred.promise;
            }

            return retrieveJsonHttpGetDoc(path, true, true, true);
        }

        /**
         * @ngdoc method
         * @name common.services.documentation.service#getDocumentFacets
         * @param {string} names The comma-separated document metadata used to retrieve the aggregated document counts.
         * @param {string} [options] An OData query string.
         * @returns {Promise} A Promise object containing the number of documents matching each value of the specified metadata.
         *
         * @description
         * Retrieves the number of documents matching each value of the specified metadata.
         *
         */
        function getDocumentFacets(names, options) {
            var deferred = $q.defer();
            var path;
            if (names === 'Category') {
                path = oDataPath + "Document('GetLatest')?$apply=groupby((" + names + "), aggregate(Documents/$count as Total))";
            }
            else {
                path = oDataPath + "Document?$apply=groupby((" + names + "), aggregate(Documents/$count as Total))";
            }
            if (options) {
                path += '&' + options;
            }

            if (!names || names === '') {

                deferred.reject({
                    data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.documentation.noNames')))
                });
                return deferred.promise;
            }

            return retrieveJsonHttpGetDoc(path, false, false, false);
        }

        /**
         * @ngdoc method
         * @name common.services.documentation.service#getPageFacets
         * @param {string} names The comma-separated page metadata used to retrieve the aggregated page counts.
         * @param {string} [options] An OData query string.
         * @returns {Promise} A Promise object containing the number of pages matching each value of the specified metadata.
         *
         * @description
         * Retrieves the number of documents matching each value of the specified metadata.
         *
         */
        function getPageFacets(names, options) {
            var deferred = $q.defer();
            var path = oDataPath + "Page?$apply=groupby((" + names + "), aggregate(Pages/$count as Total))";

            if (options) {
                path += '&' + options;
            }

            if (!names || names === '') {

                deferred.reject({
                    data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.documentation.noNames')))
                });
                return deferred.promise;
            }

            return retrieveJsonHttpGetDoc(path, false, false, false);
        }

        /**
         * @ngdoc method
         * @name common.services.documentation.service#getDocument
         * @param {string} entityId The ID of the document to be retrieved.
         * @returns {Promise} A Promise object containing document data.
         *
         * @description
         * Retrieves a document by its unique ID.
         *
         */
        function getDocument(id) {
            var deferred = $q.defer();
            var path = oDataPath + "Document?$filter=Id eq '" + id + "'";
            if (!id || id === '') {

                deferred.reject({
                    data: new CommandResponse(false, new ExecutionError(-1, $translate.instant('svcErrors.documentation.noEntityName')))
                });
                return deferred.promise;
            }

            return retrieveJsonHttpGetDoc(path, true, false, false);
        }

        /**
        * @ngdoc method
        * @name common.services.documentation.service#getAllDocuments
        * @param {string} [options] An OData query string.
        * @returns {Promise} A Promise object containing the number of documents matching the query.
        *
        * @description
        * Retrieves document data.
        *
        */
        function getAllDocuments(options, name) {
            var path = oDataPath + "Document";
            if (name === 'Category' && options) {
                path += '(\'GetLatest\')?' + options;
            }
            else if (options) {
                path += '?' + options;
            }

            return retrieveJsonHttpGetDoc(path, true, false, false);
        }

        function getDocCenterUrl() {
            return documentationCenterConfigProvider.config.docCenterUiUrl;
        }

        /**
        * @ngdoc method
        * @name common.services.documentation.service#getTypeAheadInputs
        * @param {string} [options] an OData query string.
        * @returns {Promise} A Promise object containing IDs and Titles of the matching pages.
        * @access internal
        *
        * @description
        * Retrieves all the page IDs and Titles to be displayed in search bar typeahead.
        */
        function getTypeAheadInputs(options) {
            var path = oDataPath + options;
            return retrieveJsonHttpGetDoc(path, false, false, false);
        }


        /**
       * @ngdoc method
       * @name common.services.documentation.service#getPageReleases
       * @param {string} code A release-independent page code.
       * @returns {Promise} A Promise object containing information on all releases in which the specified page is present.
       *
       * @description
       * Retrieves information on all releases containing the specified page.
       */
        function getPageReleases(code) {
            var path = oDataPath + "Page?$filter=Code eq '" + code + "'&$select=ReleaseId, Id, DocumentId";
            return retrieveJsonHttpGetDoc(path, false, false, false);
        }


        function getDocumentsofLatestRelease(id, select) {
            return getReleaseDocuments(id, select);
        }

        /**
         * @ngdoc method
         * @name common.services.documentation.service#getReleaseDocuments
         * @param {string} id The ID of a documentation release.
         * @param {string} [select=Contents,Title,Id,ReleaseId] the document properties to retrieve.
         * @returns {Promise} A Promise object containg information about the specified release and its documents.
         *
         * @description
         * Retrieves the specified release and all its documents.
         */
        function getReleaseDocuments(id, select) {
            var selectFields = select || "Contents,Title,Id,ReleaseId";
            var path = oDataPath + "Release('" + id + "')?$expand=Documents($select=" + selectFields + ")";
            return retrieveJsonHttpGetDoc(path, false, false, false);
        }
    }
})();
