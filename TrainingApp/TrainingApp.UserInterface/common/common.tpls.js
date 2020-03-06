angular.module("siemens.simaticit.common.templates", ["common/components/buttonBox/buttonbox-dev-tpl.html", "common/components/documentation/helpWindow/help-window.html", "common/components/header/header.html", "common/components/task/detailsComponent.html", "common/layout/component/component.html", "common/layout/home/home.tpl.html", "common/layout/homeCard/home-card.html", "common/layout/homeState/loading.html", "common/layout/homeTile/home-tile.html", "common/layout/settings/settings.tpl.html", "common/layout/shell/shell.tpl.html", "common/layout/swac/swac.html", "common/layout/unauthorized/unauthorized.html", "common/widgets/accordion/sit-accordion-group.html", "common/widgets/accordion/sit-accordion.html", "common/widgets/advancedSelect/multi-selection.html", "common/widgets/advancedSelect/single-selection.html", "common/widgets/advancedSelect/sit-advanced-select.html", "common/widgets/auditTrail/sit-at-composition-details.html", "common/widgets/auditTrail/sit-at-parts-tree.html", "common/widgets/auditTrail/sit-at-record-details.html", "common/widgets/auditTrail/sit-at-viewer.html", "common/widgets/breadcrumb/breadcrumb.html", "common/widgets/breadcrumb/samples/breadcrumb-dev-dsleditor-template.html", "common/widgets/breadcrumb/samples/breadcrumb-dev-home-template.html", "common/widgets/breadcrumb/samples/breadcrumb-dev-mashup-template.html", "common/widgets/breadcrumb/samples/breadcrumb-dev-template.html", "common/widgets/breadcrumb/samples/breadcrumb-dev-viewdetail-template.html", "common/widgets/breadcrumb/samples/breadcrumb-dev-viewlist-template.html", "common/widgets/breadcrumb/samples/breadcrumb-dev.html", "common/widgets/busyIndicator/busy-indicator.html", "common/widgets/carousel/carousel.html", "common/widgets/characteristicRepr/browse-failures-template.html", "common/widgets/characteristicRepr/char-rep-runtime.html", "common/widgets/characteristicRepr/characteristic-repr-dir.html", "common/widgets/characteristicRepr/sit-failures-browser-dir.html", "common/widgets/characteristicRepr/sit-image-grid-dir.html", "common/widgets/checkbox/checkbox.html", "common/widgets/columnConfigurator/columnConfigurator.html", "common/widgets/commandBar/command-bar.html", "common/widgets/commandBar/command-group.html", "common/widgets/commandBar/command.html", "common/widgets/commandBar/samples/command-bar-dev-tpl.html", "common/widgets/commandBar/samples/command-bar-dev.html", "common/widgets/commandBar/samples/commandbar-dev-view.html", "common/widgets/commandBar/search.html", "common/widgets/component/samples/swac/index.html", "common/widgets/component/samples/test.html", "common/widgets/component/samples/ui/chatMessenger.html", "common/widgets/datePicker/date-picker.html", "common/widgets/dateTimePicker/date-time-picker.html", "common/widgets/dialog/dialog.html", "common/widgets/dialog/samples/dialog-dev-popup1-template.html", "common/widgets/dialog/samples/dialog-dev-popup2-template.html", "common/widgets/dialog/samples/dialog-dev-tpl.html", "common/widgets/dialog/samples/dialog-dev.html", "common/widgets/dialogButton/dialogButton.html", "common/widgets/dialogButton/samples/dialog-button-dev.html", "common/widgets/documentViewer/document-carousel.html", "common/widgets/documentViewer/document-viewer.html", "common/widgets/documentViewer/plugins/image/image-viewer.html", "common/widgets/documentViewer/plugins/pdf/pdf-viewer.html", "common/widgets/documentViewer/plugins/pdf/viewer.html", "common/widgets/documentViewer/plugins/text/text-viewer.html", "common/widgets/documentViewer/plugins/vector/vector-viewer.html", "common/widgets/documentViewer/plugins/video/video-viewer.html", "common/widgets/electronicSignature/browse-scenarios-popup.html", "common/widgets/electronicSignature/es-browse-signers.html", "common/widgets/electronicSignature/es-rich-radio.html", "common/widgets/electronicSignature/sit-es-browse-scenarios.html", "common/widgets/electronicSignature/sit-es-scenario-picker.html", "common/widgets/electronicSignature/sit-rt-signatures-dialog.html", "common/widgets/electronicSignature/sit-rt-signatures.html", "common/widgets/email/email.html", "common/widgets/entityPicker/entityPicker.html", "common/widgets/entityPicker/popup-default-template.html", "common/widgets/entityPicker/samples/entity-picker-custom-template.html", "common/widgets/entityPicker/samples/index.html", "common/widgets/entityPicker/typeahead-default-template.html", "common/widgets/fileUpload/file-upload.html", "common/widgets/filter/sit-filter.html", "common/widgets/filterBar/filter-bar.html", "common/widgets/filterPanel/save-filter-panel.html", "common/widgets/filterPanel/sit-filter-panel.html", "common/widgets/flow/directives/toolbar.html", "common/widgets/flow/directives/toolbox.html", "common/widgets/flyout/samples/flyout-dev-tpl.html", "common/widgets/flyout/samples/flyout-dev-view.html", "common/widgets/flyout/samples/flyout-dev.html", "common/widgets/flyout/samples/sit-flyout-template.html", "common/widgets/flyout/samples/sit-flyout-template2.html", "common/widgets/fullscreenDialog/fullscreen-context.html", "common/widgets/fullscreenDialog/fullscreen-dialog.html", "common/widgets/fullscreenDialog/fullscreen-header.html", "common/widgets/fullscreenDialog/fullscreen-title.html", "common/widgets/graph/graph.html", "common/widgets/grid/grid.html", "common/widgets/headerButton/headerButton.html", "common/widgets/homeCard/sit-home-card.html", "common/widgets/homeTile/sit-home-tile.html", "common/widgets/iconPicker/icon-selection-template.html", "common/widgets/iconPicker/iconPicker.html", "common/widgets/iconPreview/iconPreview.html", "common/widgets/itemCollectionViewer/grid-personalization.html", "common/widgets/itemCollectionViewer/grid-tile-personalization.html", "common/widgets/itemCollectionViewer/item-collection-viewer.html", "common/widgets/itemCollectionViewer/tile-personalization.html", "common/widgets/label/label.html", "common/widgets/mduiBreadcrumb/sit-mdui-breadcrumb.html", "common/widgets/multiSelect/sit-advanced-select.html", "common/widgets/multiSelect/sit-multi-select.html", "common/widgets/navigationLink/sit-tab.html", "common/widgets/navigationLink/sit-tabset.html", "common/widgets/navigationLink/tab.html", "common/widgets/navigationLink/tabset.html", "common/widgets/notificationTile/notification-tile.html", "common/widgets/notificationTile/samples/notification-tile-dev.html", "common/widgets/numeric/numeric.html", "common/widgets/overlay/overlay.html", "common/widgets/overlay/samples/overlay-dev-tpl.html", "common/widgets/overlay/samples/overlay-dev.html", "common/widgets/pager/pager.html", "common/widgets/pagination/extended-pagination.html", "common/widgets/pagination/pagination-label.html", "common/widgets/pagination/pagination-left-pages-template.html", "common/widgets/pagination/pagination-page-size.html", "common/widgets/pagination/pagination-right-pages-template.html", "common/widgets/pagination/pagination.html", "common/widgets/pagination/simple-pagination.html", "common/widgets/pagination/standard-pagination.html", "common/widgets/password/password.html", "common/widgets/popUpPanel/pop-up-panel.html", "common/widgets/propertyGrid/property-grid.html", "common/widgets/propertyGrid/property-group.html", "common/widgets/propertyGrid/property.html", "common/widgets/radio/radio.html", "common/widgets/richRadio/rich-radio.html", "common/widgets/select/select.html", "common/widgets/sidePanel/sidepanel.html", "common/widgets/sidebar/scroll.html", "common/widgets/sidebar/sidebar-item.html", "common/widgets/sidebar/sidebar.html", "common/widgets/sortableAccordion/sortable-accordion.html", "common/widgets/status/status.html", "common/widgets/switchButton/switch-button.html", "common/widgets/table/table-button.html", "common/widgets/table/table-filterbar.html", "common/widgets/table/table-personalization.html", "common/widgets/table/table-with-group.html", "common/widgets/taglist/taglist.html", "common/widgets/tagsManager/sit-manage-tags-editor.directive.html", "common/widgets/tagsManager/sit-tag-element.directive.html", "common/widgets/tagsManager/sit-tags-manager.html", "common/widgets/tagsManager/sit-tags-viewer.directive.html", "common/widgets/tagsManager/sit-tags-warning-panel.directive.html", "common/widgets/taskContainer/taskContainer.html", "common/widgets/text/text.html", "common/widgets/textEditor/image-upload-dialog-template.html", "common/widgets/textEditor/text-editor.html", "common/widgets/textarea/textarea.html", "common/widgets/tileConfigurator/tile-configurator.html", "common/widgets/tiles/action-tile.html", "common/widgets/tiles/custom-tile-item.html", "common/widgets/tiles/item-tile.html", "common/widgets/tiles/large-tile-item.html", "common/widgets/tiles/medium-tile-item.html", "common/widgets/tiles/tile-group.html", "common/widgets/tiles/tile-view.html", "common/widgets/tiles/wide-tile-item.html", "common/widgets/timePicker/time-picker.html", "common/widgets/toolbox/toolbox-section.html", "common/widgets/toolbox/toolbox.html", "common/widgets/tristateCheckbox/tristate-checkbox.html", "common/widgets/typeahead/typeahead.html", "common/widgets/viewBar/view-bar.html", "common/widgets/workInstructionInstanceViewer/work-instruction-instance-viewer.html", "common/blueprints/executeCommandTemplate/execute-commandTemplate.html", "common/blueprints/executeCommandTemplate/mdGridCommandTemplate.html", "common/blueprints/masterDetailsTemplate/masterDetailsLayoutTemplate.html", "common/blueprints/overviewTemplate/overviewTemplate.html", "common/blueprints/singleEntityTemplate/singleEntityLayoutTemplate.html"]);

angular.module("common/components/buttonBox/buttonbox-dev-tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/components/buttonBox/buttonbox-dev-tpl.html",
    "<div>\n" +
    "    <button ng-disabled=\"buttonBoxCtr.hidePrevTask\" class=\"btn btn-info\" style=\"width:100%;\" ng-click=\"prevTaskCallback()\"><i class=\"fa fa-caret-up fa-3\"></i>Previous task</button>\n" +
    "    <div>\n" +
    "        <button class=\"btn btn-success\" style=\"width:25%;float:left;\" ng-click=\"okCallback()\">OK</button>\n" +
    "        <button class=\"btn btn-danger\" style=\"width:25%;float:left;\" ng-click=\"notOkCallBack()\">NOK</button>\n" +
    "        <button class=\"btn btn-warning\" style=\"width:25%;float:left;\" ng-click=\"NACallBack()\">N/A</button>\n" +
    "        <button class=\"btn btn-primary\" style=\"width:25%;float:left;\" ng-click=\"detailsCallBack()\">?</button>\n" +
    "        <span class=\"label label-default\">Title</span>\n" +
    "        <input type=\"text\" ng-model=\"buttonBoxCtr.title\"/></div>\n" +
    "    <button ng-disabled=\"buttonBoxCtr.hideNextTask\" class=\"btn btn-info\" style=\"width:100%;\" ng-click=\"nextTaskCallback()\"><i class=\"fa fa-caret-down fa-3\"></i>Next task</button>\n" +
    "</div>");
}]);

angular.module("common/components/documentation/helpWindow/help-window.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/components/documentation/helpWindow/help-window.html",
    "<div class=\"overlay-look\">\n" +
    "    <script type=\"text/ng-template\" id=\"PopupContent.html\">\n" +
    "        <div class=\"doc-popup-modal\" id=\"popupDocCenter\" ng-mouseover=\"modalPopupCtrl.draggable()\">\n" +
    "            <div class=\"modal-header\">\n" +
    "                <div class=\"help-window-toolbar row\">\n" +
    "                    <div class=\"help-window-tb-left\">\n" +
    "                        <div class=\"header-icon\" sit-class=\"svg-icon\" ng-show=\"modalPopupCtrl.showPrev\" sit-mom-icon=\"modalPopupCtrl.svgIcons.backward\" ng-click=\"modalPopupCtrl.goToPrevState()\"></div>\n" +
    "                        <div class=\"header-icon-forward\" ng-show=\"modalPopupCtrl.showNext\" sit-class=\"svg-icon\" sit-mom-icon=\"modalPopupCtrl.svgIcons.backward\" ng-click=\"modalPopupCtrl.goToNextState()\"></div>\n" +
    "                        <div class=\"help-text\">{{'common.helpWindow.title'|translate}}</div>\n" +
    "                    </div>\n" +
    "                    <div class=\"help-window-tb-right\">\n" +
    "                        <div class=\"header-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"modalPopupCtrl.svgIcons.open\" ng-click=\"modalPopupCtrl.openDocCenterTab()\"></div>\n" +
    "                        <div style=\"width:24px; height:24px\" class=\"header-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"modalPopupCtrl.svgIcons.close\" ng-click=\"modalPopupCtrl.closeDocPopup()\"></div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"help-window-search-bar row\">\n" +
    "                    <div class=\"quick-search-container\" ng-show=\"true\">\n" +
    "                        <form ng-submit=\"modalPopupCtrl.doSearchOnPopup()\" class=\"ng-pristine ng-valid\">\n" +
    "                            <div class=\"input-group\">\n" +
    "                                <input type=\"text\"\n" +
    "                                       id=\"quickSearchPopUpTextBox\"\n" +
    "                                       ng-change=\"modalPopupCtrl.searchTextChanged()\"\n" +
    "                                       ng-model=\"modalPopupCtrl.searchQuery\" autocomplete=\"off\"\n" +
    "                                       class=\"form-control filter-quick-search search-input ng-pristine ng-valid ng-touched\"\n" +
    "                                       data-internal-type=\"quickSearchPopUpTextBox\"\n" +
    "                                       placeholder=\"{{'common.helpWindow.search'|translate}}\" />\n" +
    "                                <div class=\"search-icon\" ng-click=\"modalPopupCtrl.doSearchOnPopup()\" data-internal-type=\"quickSearchIcon\" id=\"quickSearchIcon\" sit-mom-icon=\"modalPopupCtrl.svgIcons.search\"></div>\n" +
    "                                <div class=\"close-icon\" ng-if=\"modalPopupCtrl.showCloseIcon\" sit-mom-icon=\"modalPopupCtrl.svgIcons.close\" ng-click=\"modalPopupCtrl.clearQuery()\"></div>\n" +
    "                            </div>\n" +
    "                        </form>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"modal-body\" ng-hide=\"modalPopupCtrl.show\">\n" +
    "                <article>\n" +
    "                    <div class=\"quick-search-title\">\n" +
    "                        <h4 id=\"{{modalPopupCtrl.query}}\" ng-hide=\"modalPopupCtrl.show\"><strong>{{'common.helpWindow.search-info'|translate}}: <em>{{modalPopupCtrl.query}}</em></strong></h4>\n" +
    "                    </div>\n" +
    "                    <div ng-show=\"modalPopupCtrl.showNoResult\">\n" +
    "                        <span>{{'common.helpWindow.no-items-found'|translate}}</span>\n" +
    "                    </div>\n" +
    "                    <section ng-show=\"!modalPopupCtrl.showNoResult\" ng-repeat=\"result in modalPopupCtrl.data | limitTo : modalPopupCtrl.maxSearchResult\">\n" +
    "                        <h4 id=\"{{result.PageId}}\">\n" +
    "                            <a href=\"javascript:void(0);\" ng-click=\"reloadPopUpOnLnkClk(result.Id)\"> {{result.Title}} </a>&nbsp;\n" +
    "                            <a target=\"_blank\" href=\"{{modalPopupCtrl.docCenterUrl}}#/release/{{result.ReleaseId}}/document/{{result.DocumentId}}/page/{{result.Id}}\"><span class=\"fa fa-external-link\"></span></a>\n" +
    "                        </h4>\n" +
    "                        <p ng-bind-html=\"result.HighlightedText\">\n" +
    "                        </p>\n" +
    "                        <p>\n" +
    "                            <span>\n" +
    "                                <strong>{{'common.helpWindow.document'|translate}}:&nbsp;</strong>\n" +
    "                                <a href=\"javascript:void(0);\" ng-click=\"modalPopupCtrl.reloadPopUpOnDocumentLnkClk(result.DocumentId)\"> {{result.DocumentTitle}} </a>&nbsp;\n" +
    "                                <a target=\"_blank\" href=\"{{modalPopupCtrl.docCenterUrl}}#/release/{{result.ReleaseId}}/document/{{result.DocumentId}}/page/\"><span class=\"fa fa-external-link\"></span></a>\n" +
    "                            </span>\n" +
    "                        </p>\n" +
    "                        <br />\n" +
    "                    </section>\n" +
    "                    <div ng-if=\"modalPopupCtrl.isShowAllResults\">\n" +
    "                        <a class=\"show-more-results\" ng-click=\"modalPopupCtrl.showAllResults(modalPopupCtrl.allResultsLength)\">Show more results</a>\n" +
    "                    </div>\n" +
    "                </article>\n" +
    "            </div>\n" +
    "            <div class=\"doc-center-page modal-body\" ng-show=\"modalPopupCtrl.show\">\n" +
    "                <article>\n" +
    "                    <p sit-bind-dynamic-html=\"modalPopupCtrl.pageContent\" class=\"doc-page-layout\"></p>\n" +
    "                    <sit-documentation-anchor-reslove></sit-documentation-anchor-reslove>\n" +
    "                </article>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </script>\n" +
    "</div>");
}]);

angular.module("common/components/header/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/components/header/header.html",
    "<div class=\"container-fluid navbar-header header-fluid header-color\">\n" +
    "    <div id=\"headerNavBar\" class=\"col-xs-20 col-sm-20 col-md-25 col-lg-25 pull-left header-nav-bar\" role=\"navigation\">\n" +
    "\n" +
    "        <div data-internal-type=\"headerBarHamburger\"\n" +
    "             class=\"header-navbar-button header-navbar-item-noborder header-navbar-item-button pull-left\"\n" +
    "             style=\"margin-right: 0;\"\n" +
    "             sit-flymenu=\"vm.primaryFlymenuOptions\"></div>\n" +
    "\n" +
    "        <div class=\"header-navbar-item-noborder header-navbar-item-button pull-left\">\n" +
    "            <em class=\"fa fa-home fa-lg\" ng-click=\"vm.navigateToHome()\"></em>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"header-navbar-item-noborder header-navbar-item-button pull-left\">\n" +
    "            <em class=\"fa fa-info-circle fa-lg\" ng-click=\"vm.showAboutDialog()\"></em>\n" +
    "        </div>\n" +
    "\n" +
    "        <div data-internal-type=\"headerBarHelp\" class=\"header-navbar-item-noborder header-navbar-item-button pull-left\" ng-if=\"vm.isHelpAvailable && !vm.isRuntime\">\n" +
    "            <em class=\"fa fa-question-circle fa-lg help-icon\" ng-click=\"vm.showHelpWindow()\"></em>\n" +
    "        </div>\n" +
    "\n" +
    "        <div data-internal-type=\"headerActionButton\" class=\"header-action-height pull-left\">\n" +
    "            <sit-header-button ng-repeat=\"(id, actionButton) in vm.actionButtons\" \n" +
    "                               sit-id=\"id\"\n" +
    "                               sit-icon=\"actionButton.icon\" \n" +
    "                               sit-title=\"actionButton.title\" \n" +
    "                               sit-on-click=\"actionButton.onClick\" \n" +
    "                               sit-api=\"actionButton.api\"></sit-header-button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div data-internal-type=\"headerBarUser\" \n" +
    "             class=\"header-navbar-item-noborder header-navbar-item-button pull-left\" \n" +
    "             sit-flymenu=\"vm.userFlymenuOptions\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div data-internal-type=\"headerBarLogo\" ng-if=\"vm.logoImage\" class=\"logo-container navbar-brand pull-right\">\n" +
    "        <img alt=\"\" ng-src=\"{{vm.logoImage}}\" />\n" +
    "    </div>\n" +
    "\n" +
    "    <div data-internal-type=\"headerBarLogo\" ng-if=\"!vm.logoImage\" class=\"default-logo-container navbar-brand pull-right\">\n" +
    "        <svg width=\"82\" height=\"16\" viewBox=\"0 0 82 16\">\n" +
    "            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" class=\"icon-logo-color\" fill=\"#009999\" d=\"M2.2,13.8v-2.4C3.6,11.8,4.8,12,5.8,12c1.4,0,2.1-0.4,2.1-1.1 c0-0.3-0.1-0.5-0.3-0.7C7.4,10,6.9,9.7,6,9.4C4.4,8.7,3.4,8.2,2.9,7.7C2.3,7.1,2,6.3,2,5.4c0-1.2,0.5-2.1,1.4-2.7 c0.9-0.6,2-0.9,3.5-0.9c0.8,0,1.9,0.1,3.4,0.4v2.3C9.1,4.1,8.1,3.8,7.2,3.8c-1.3,0-2,0.4-2,1.1c0,0.3,0.1,0.5,0.4,0.7 c0.2,0.1,0.8,0.4,1.9,0.9c1.5,0.6,2.4,1.2,2.9,1.7c0.6,0.6,0.9,1.3,0.9,2.2c0,1.3-0.6,2.3-1.7,3c-0.9,0.6-2.1,0.8-3.5,0.8 C4.7,14.2,3.5,14.1,2.2,13.8\"></path><rect x=\"13.1\" y=\"2\" class=\"icon-logo-color\" fill=\"#009999\" width=\"3.3\" height=\"12\"></rect><polygon fill-rule=\"evenodd\" clip-rule=\"evenodd\" class=\"icon-logo-color\" fill=\"#009999\" points=\"19.5,14 19.5,2 28,2 28,4.2 22.7,4.2 22.7,6.9 27.3,6.9 27.3,8.8 22.7,8.8 22.7,11.7 28.2,11.7 28.2,14 \"></polygon><polygon fill-rule=\"evenodd\" clip-rule=\"evenodd\" class=\"icon-logo-color\" fill=\"#009999\" points=\"30.3,14 30.3,2 34.7,2 37.7,9.6 40.8,2 44.9,2 44.9,14 41.7,14 41.7,5.5 38.2,14.1 36.1,14.1 32.7,5.5 32.7,14 \"></polygon><polygon fill-rule=\"evenodd\" clip-rule=\"evenodd\" class=\"icon-logo-color\" fill=\"#009999\" points=\"47.9,14 47.9,2 56.5,2 56.5,4.2 51.2,4.2 51.2,6.9 55.8,6.9 55.8,8.8 51.2,8.8 51.2,11.7 56.6,11.7 56.6,14 \"></polygon><polygon fill-rule=\"evenodd\" clip-rule=\"evenodd\" class=\"icon-logo-color\" fill=\"#009999\" points=\"58.8,14 58.8,2 62.7,2 66.8,10 66.8,2 69.2,2 69.2,14 65.4,14 61.2,5.9 61.2,14 \"></polygon><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" class=\"icon-logo-color\" fill=\"#009999\" d=\"M71.5,13.8v-2.4c1.3,0.4,2.5,0.6,3.6,0.6c1.4,0,2.1-0.4,2.1-1.1 c0-0.3-0.1-0.5-0.3-0.7c-0.2-0.2-0.8-0.5-1.6-0.8c-1.6-0.6-2.6-1.2-3.1-1.7c-0.6-0.6-0.9-1.4-0.9-2.3c0-1.2,0.4-2.1,1.4-2.7 c0.9-0.6,2-0.9,3.5-0.9c0.8,0,1.8,0.1,3.1,0.4l0.3,0.1v2.3c-1.1-0.4-2.1-0.7-3.1-0.7c-1.3,0-2,0.4-2,1.1c0,0.3,0.1,0.5,0.4,0.7 c0.2,0.1,0.8,0.4,1.9,0.9c1.4,0.6,2.4,1.2,2.9,1.7c0.6,0.6,0.9,1.3,0.9,2.2c0,1.3-0.6,2.3-1.7,3c-0.9,0.6-2.1,0.8-3.6,0.8 C74,14.2,72.8,14.1,71.5,13.8\"></path>\n" +
    "        </svg>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/components/task/detailsComponent.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/components/task/detailsComponent.html",
    "<!--<style type=\"text/css\">\n" +
    "    /*uncomment the below style snippet if you want the component to be displayed above other components*/\n" +
    "\n" +
    "    div[name^=\"{{vm.name}}\"] {\n" +
    "        overflow: hidden !important;\n" +
    "        width: 100%;\n" +
    "        height: 100%;\n" +
    "    }\n" +
    "</style>-->\n" +
    "\n" +
    "    <div class=\"full-height full-width\" style=\"width: calc(100%-25px); height: calc(100%-25px);  min-height: 400px;  min-width: 400px\">\n" +
    "            <!-- side-panel-property-area-body -->\n" +
    "        <div id=\"tabContent\" >\n" +
    "            <sit-tabset class=\" tab-view\" ng-show=\"true\">\n" +
    "                <sit-tab id=\"tabOverview\" heading=\"{{ 'taskContainer.details.properties'|translate}}\" active=\"vm.isDetailTabActive\" select=\"vm.selectDetailTab()\">\n" +
    "                        <!-- class=\"task-sidepanel\" -->\n" +
    "                    <div >\n" +
    "                        <sit-property-grid sit-layout=\"Vertical\" sit-type=\"Fixed\" sit-mode=\"list\" sit-columns=\"1\">\n" +
    "                            <sit-property sit-widget=\"sit-text\"     ng-show=\"vm.isNIdVisible\" sit-value=\"vm.selectedTask.NId\" sit-read-only=\"true\">{{'taskContainer.details.id'|translate}}</sit-property>\n" +
    "                            <sit-property sit-widget=\"sit-textarea\" ng-show=\"vm.isNameVisible\"  sit-value=\"vm.selectedTask.Name\" sit-read-only=\"true\">{{'taskContainer.details.name'|translate}}</sit-property>\n" +
    "                            <sit-property sit-widget=\"sit-textarea\" ng-show=\"vm.isDescriptionVisible\"  sit-value=\"vm.selectedTask.Description\" sit-read-only=\"true\">{{'taskContainer.details.description'|translate}}</sit-property>\n" +
    "                            <sit-property sit-widget=\"sit-textarea\" ng-show=\"vm.isTaskDefinitionNIdVisible\" sit-value=\"vm.selectedTask.TaskDefinitionNId\" sit-read-only=\"true\">{{'taskContainer.details.taskDefinitionNId'|translate}}</sit-property>\n" +
    "                            <sit-property sit-widget=\"sit-textarea\" ng-show=\"vm.isTaskDefinitionRevisionVisible\" sit-value=\"vm.selectedTask.TaskDefinitionRevision\" sit-read-only=\"true\">{{'taskContainer.details.taskDefinitionRevision'|translate}}</sit-property>\n" +
    "                            <sit-property sit-widget=\"sit-textarea\" ng-show=\"vm.isEquipmentNIdVisible\" sit-value=\"vm.selectedTask.EquipmentNId\" sit-read-only=\"true\">{{'taskContainer.details.equipment'|translate}}</sit-property>\n" +
    "                            <sit-property sit-widget=\"sit-textarea\" ng-show=\"vm.isTaskFlowVisible\" sit-value=\"vm.selectedTask.TaskFlow.TaskFlow\" sit-read-only=\"true\">{{'taskContainer.details.taskFlow'|translate}}</sit-property>\n" +
    "                            <sit-property sit-widget=\"sit-textarea\" ng-show=\"vm.isStatusNIdVisible\" sit-value=\"vm.selectedTask.Status.StatusNId\" sit-read-only=\"true\">{{'taskContainer.details.status'|translate}}</sit-property>\n" +
    "                            <!--<sit-property sit-widget=\"sit-textarea\" sit-value=\"vm.selectedTask.NId\" sit-read-only=\"true\">{{'SIT.TSK.common.id'|translate}}</sit-property>\n" +
    "                                <sit-property sit-widget=\"sit-textarea\" sit-value=\"vm.selectedTask.Name\" sit-read-only=\"true\">{{'SIT.TSK.common.name'|translate}}</sit-property>\n" +
    "                                <sit-property sit-widget=\"sit-textarea\" sit-value=\"vm.selectedTask.Description\" sit-read-only=\"true\">{{'SIT.TSK.common.description'|translate}}</sit-property>\n" +
    "                                <sit-property sit-widget=\"sit-textarea\" sit-value=\"vm.selectedTask.TaskDefinitionNId\" sit-read-only=\"true\">{{'task.TaskDefinitionNId'|translate}}</sit-property>\n" +
    "                                <sit-property sit-widget=\"sit-textarea\" sit-value=\"vm.selectedTask.TaskDefinitionRevision\" sit-read-only=\"true\">{{'task.TaskDefinitionRevision'|translate}}</sit-property>\n" +
    "                                <sit-property sit-widget=\"sit-textarea\" sit-value=\"vm.selectedTask.EquipmentNId\" sit-read-only=\"true\">{{'task.Equipment'|translate}}</sit-property>\n" +
    "                                <sit-property sit-widget=\"sit-textarea\" sit-value=\"vm.selectedTask.WorkCenterNId\" sit-read-only=\"true\">{{'task.WorkCenterDeprecated'|translate}}</sit-property>\n" +
    "                                <sit-property sit-widget=\"sit-textarea\" sit-value=\"vm.selectedTask.LocationNId\" sit-read-only=\"true\">{{'task.LocationDeprecated'|translate}}</sit-property>\n" +
    "                                <sit-property sit-widget=\"sit-checkbox\" sit-value=\"vm.isSkippableValue\" sit-read-only=\"true\">{{'task.IsSkippable'|translate}}</sit-property>\n" +
    "                                <sit-property sit-widget=\"sit-checkbox\" sit-value=\"vm.isTaskFlowPartValue\" sit-read-only=\"true\">{{'task.IsPartOfTaskFlow'|translate}}</sit-property>\n" +
    "                                <sit-property sit-widget=\"sit-textarea\" sit-value=\"vm.selectedTask.TaskFlow.TaskFlow\" sit-read-only=\"true\" ng-show=\"vm.isTaskFlowPart\">{{'task.TaskFlow'|translate}}</sit-property>\n" +
    "                                <sit-property sit-widget=\"sit-textarea\" sit-value=\"vm.selectedTask.TaskFlow.Sequence\" sit-read-only=\"true\" ng-show=\"vm.isTaskFlowPart\">{{'task.Sequence'|translate}}</sit-property>\n" +
    "                                <sit-property sit-widget=\"sit-textarea\" sit-value=\"vm.selectedTask.TaskFlow.MaxIterations\" sit-read-only=\"true\" ng-show=\"vm.isTaskFlowPart\">{{'task.MaxIterations'|translate}}</sit-property>\n" +
    "                                <sit-property sit-widget=\"sit-checkbox\" sit-value=\"vm.continueOnSuccessValue\" sit-read-only=\"true\" ng-show=\"vm.isTaskFlowPart\">{{'task.ContinueOnSuccess'|translate}}</sit-property>\n" +
    "                                <sit-property sit-widget=\"sit-checkbox\" sit-value=\"vm.continueOnFailureValue\" sit-read-only=\"true\" ng-show=\"vm.isTaskFlowPart\">{{'task.ContinueOnFailure'|translate}}</sit-property>-->\n" +
    "                        </sit-property-grid>\n" +
    "                    </div>\n" +
    "                </sit-tab>\n" +
    "                <sit-tab heading=\"{{ 'taskContainer.parameters.parameter' | translate}}\" active=\"vm.isParameterTabActive\" select=\"vm.selectParameterTab()\" id=\"taskParameterList\">\n" +
    "                    <div class=\"dataTable\" ng-show=\"vm.taskParameterConfigData.data.length > 0\">\n" +
    "                        <table sit-table=\"overviewTaskParameterTable\" sit-config=\"vm.taskParameterConfigData\" class=\"table table-striped\" sit-col-resize>\n" +
    "                            <thead>\n" +
    "                                <tr>\n" +
    "                                    <th>{{'taskContainer.parameters.id'|translate}}</th>\n" +
    "                                    <th>{{'taskContainer.parameters.type'|translate}}</th>\n" +
    "                                    <th>{{'taskContainer.parameters.value'|translate}}</th>\n" +
    "                                    <th>{{'taskContainer.parameters.uom'|translate}}</th>\n" +
    "                                    <th>{{'taskContainer.parameters.direction'|translate}}</th>\n" +
    "                                    <th>{{'taskContainer.parameters.isReadOnly'|translate}}</th>\n" +
    "                                </tr>\n" +
    "                            </thead>\n" +
    "                            <tbody>\n" +
    "                                <tr ng-repeat=\"item in vm.taskParameterConfigData.data\">\n" +
    "                                    <td>{{item.NId}}</td>\n" +
    "                                    <td>{{item.ParameterType}}</td>\n" +
    "                                    <td>{{item.ParameterValue}}</td>\n" +
    "                                    <td>{{item.ParameterUoMNId}}</td>\n" +
    "                                    <td>{{item.Direction}}</td>\n" +
    "                                    <td>\n" +
    "                                        <input type='checkbox' disabled ng-checked='item.IsReadOnly'>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "                            </tbody>\n" +
    "                        </table>\n" +
    "                    </div>\n" +
    "                    <div ng-show=\"!(vm.taskParameterConfigData.data.length > 0)\" class=\"taskParameter-nodata\">\n" +
    "                        {{'taskContainer.parameters.noData' | translate}}\n" +
    "                    </div>\n" +
    "                </sit-tab>\n" +
    "                <sit-tab heading=\"{{ 'taskContainer.context.context' | translate}}\" active=\"vm.isContextTabActive\" select=\"vm.selectContextTab()\" id=\"contextList\">\n" +
    "                    <div class=\"context-table-view\">\n" +
    "                        <div ng-repeat=\"context in vm.taskContextConfigData\">\n" +
    "                            <div ng-if=\"!context.isUserFieldAvailable\" class=\"table table-striped no-context-container\">\n" +
    "                                <div class=\"overview-context-header\">\n" +
    "                                    {{context.Context}}\n" +
    "                                </div>\n" +
    "                                <div class=\"no-context-message\">\n" +
    "                                    {{'taskContainer.context.noUserFieldAvailable'|translate}}\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div ng-if=\"context.isUserFieldAvailable\">\n" +
    "                                <table sit-table=\"overviewTaskContextTable\" sit-config=\"context.config\" class=\"table table-striped\" sit-col-resize>\n" +
    "                                    <thead>\n" +
    "                                        <tr>\n" +
    "                                            <th>\n" +
    "                                                {{context.Context}}\n" +
    "                                            </th>\n" +
    "                                        </tr>\n" +
    "                                        <tr>\n" +
    "                                            <th>{{'taskContainer.context.id'|translate}}</th>\n" +
    "                                            <th>{{'taskContainer.context.type'|translate}}</th>\n" +
    "                                            <th>{{'taskContainer.context.value'|translate}}</th>\n" +
    "                                        </tr>\n" +
    "                                    </thead>\n" +
    "                                    <tbody>\n" +
    "                                        <tr ng-repeat=\"item in context.config.data\">\n" +
    "                                            <td>{{item.NId}}</td>\n" +
    "                                            <td>{{item.UserFieldType}}</td>\n" +
    "                                            <td>{{item.UserFieldValue}}</td>\n" +
    "                                        </tr>\n" +
    "                                    </tbody>\n" +
    "                                </table>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div ng-show=\"!(vm.taskContextConfigData.length > 0)\" class=\"process-nodata\">\n" +
    "                            {{'taskContainer.context.noData' | translate}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </sit-tab>\n" +
    "            </sit-tabset>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "");
}]);

angular.module("common/layout/component/component.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/layout/component/component.html",
    "<sit-container sit-isswac=\"false\" sit-group-name=\"internal\">\n" +
    "    <sit-component sit-name=\"{{componentCtr.name}}\" sit-componentname=\"{{componentCtr.name}}\" sit-type=\"ui\" sit-source=\"{{componentCtr.source}}\" \n" +
    "                   sit-left=\"0\" sit-top=\"0\" sit-cols=\"12\" sit-rows=\"12\" sit-flavor=\"ui\" sit-contracts=\"componentCtr.contracts\"></sit-component>\n" +
    "</sit-container>");
}]);

angular.module("common/layout/home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/layout/home/home.tpl.html",
    "<style>\n" +
    "    .centering {\n" +
    "        float:none;\n" +
    "         margin:5px 5px 0 0;\n" +
    "    }\n" +
    "    .row-fluid {\n" +
    "        margin:5px 5px 0 0;\n" +
    "        vertical-align: middle;\n" +
    "    }\n" +
    "    .header {\n" +
    "        font-size: 20px;\n" +
    "        font-weight:bold;\n" +
    "    }\n" +
    "\n" +
    "</style>\n" +
    "<div style=\"padding-left: 8px; padding-top: 16px\" ng-controller=\"homeController as lc\">\n" +
    "    <div>\n" +
    "        <div>\n" +
    "            <div class=\"header\">Main</div><sit-item-tile sit-tile-content=\"area\" id=\"homeSettings\" ng-repeat=\"area in lc.areas\"></sit-item-tile>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <div class=\"header\"></div><sit-item-tile sit-tile-content=\"doc\" id=\"homeDocuments\" ng-repeat=\"doc in lc.documents\"></sit-item-tile>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/layout/homeCard/home-card.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/layout/homeCard/home-card.html",
    "<div class=\"home-card-screen-container\">\n" +
    "    <div class=\"unauth-message\" ng-if=\"homeCardCtrl.cards.length === 0\">\n" +
    "        <h1>{{'common.unauthorize.title'| translate}}</h1>\n" +
    "        <h6>{{'common.unauthorize.message'| translate}}</h6>\n" +
    "    </div>\n" +
    "    <div class=\"home-card\" ng-if=\"homeCardCtrl.cards.length > 0\" ng-repeat=\"card in homeCardCtrl.cards\">\n" +
    "        <sit-home-card options=\"card\">\n" +
    "        </sit-home-card>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/layout/homeState/loading.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/layout/homeState/loading.html",
    "<div class=\"mom-modal-overlay mom-modal-overlay-displayed\">\n" +
    "    <div class=\"mom-modal-overlay-spinner\"></div>\n" +
    "</div>");
}]);

angular.module("common/layout/homeTile/home-tile.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/layout/homeTile/home-tile.html",
    "<div ng-repeat=\"config in homeTileCtrl.tileConfig\" class=\"home-tile-screen\">\n" +
    "    <div>\n" +
    "        <span class=\"home-tile-heading\">{{config.title}}</span>\n" +
    "    </div>\n" +
    "    <div class=\"home-tile-screen-container\">\n" +
    "        <div class=\"home-tile\" ng-repeat=\"tile in config.tiles\">\n" +
    "            <sit-home-tile options=\"tile\"></sit-home-tile>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/layout/settings/settings.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/layout/settings/settings.tpl.html",
    "<div ng-controller=\"settingsCtrl as sc\" class=\"user-preference-settings\">\n" +
    "    <div class=\"vertical-cmdbar\">\n" +
    "        <sit-command-bar sit-vertical-autofixed =\"true\" sit-type=\"tool\" sit-label-align=\"right\" sit-layout=\"vertical\">\n" +
    "            <sit-command sit-name=\"settings.reset\" ng-click=\"sc.restoreSettings\"\n" +
    "                         cmd-icon=\"Import\" sit-tooltip=\"{{'settings.btnReset'|translate}}\"\n" +
    "                         sit-label=\"{{'settings.btnReset'|translate}}\">\n" +
    "            </sit-command>\n" +
    "            <sit-command sit-name=\"settings.save\" ng-click=\"sc.saveSettings\"\n" +
    "                         cmd-icon=\"Save\" sit-tooltip=\"{{'settings.btnSave'|translate}}\"\n" +
    "                         sit-label=\"{{'settings.btnSave'|translate}}\">\n" +
    "            </sit-command>\n" +
    "        </sit-command-bar>\n" +
    "    </div>\n" +
    "    <div class=\"container-fluid\">\n" +
    "        <!-- left column: language  & log -->\n" +
    "        <div class=\"settings-log-info\">\n" +
    "            <h3>{{ 'settings.log' | translate }}</h3>\n" +
    "            <div data-internal-type=\"settingsLogLevels\">\n" +
    "                <sit-item-tile ng-model=\"sc.loglevel\" ng-repeat=\"item in sc.loglevel\" sit-tile-content=\"item\"></sit-item-tile>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <!-- right column: themes -->\n" +
    "    <div class=\"col-lg-20 col-md-20 col-sm-40 col-xs-40\">\n" +
    "        <div class=\"settings-theme-div\">\n" +
    "            <h3>{{ 'settings.theme' | translate }}</h3>\n" +
    "            <table>\n" +
    "                <tr>\n" +
    "                    <td>\n" +
    "                        <div data-internal-type=\"tileThemeLight\" class=\"tile tile-theme-light\" ng-click=\"sc.themeSelected(0)\">\n" +
    "                            <div class=\"select-border\" ng-show=\"sc.isCurrentTheme(0)\"></div>\n" +
    "                            <div ng-show=\"sc.isCurrentTheme(0)\" class=\"top-right-corner-triangle\"></div>\n" +
    "                            <span ng-show=\"sc.isCurrentTheme(0)\" class=\"top-right-select-img fa fa-check fa-inverse fa-lg\"></span>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </td>\n" +
    "                    <td class=\"theme-eye-selector\">\n" +
    "                        <span class=\"fa fa-eye fa-lg\" ng-click=\"sc.openModal(0)\"></span>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "\n" +
    "                <tr>\n" +
    "                    <td>\n" +
    "                        <div data-internal-type=\"tileThemeDark\" class=\"tile tile-theme-dark\" ng-click=\"sc.themeSelected(1)\">\n" +
    "                            <div class=\"select-border\" ng-show=\"sc.isCurrentTheme(1)\"></div>\n" +
    "                            <div ng-show=\"sc.isCurrentTheme(1)\" class=\"top-right-corner-triangle\"></div>\n" +
    "                            <span ng-show=\"sc.isCurrentTheme(1)\" class=\"top-right-select-img fa fa-check fa-inverse fa-lg\"></span>\n" +
    "                        </div>\n" +
    "                    </td>\n" +
    "                    <td class=\"theme-eye-selector\">\n" +
    "                        <span class=\"fa fa-eye fa-lg\" ng-click=\"sc.openModal(1)\"></span>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div sit-notification-tile\n" +
    "         sit-tile-title=\"sc.notificationTile.title\"\n" +
    "         sit-tile-content=\"sc.notificationTile.content\"\n" +
    "         sit-tile-type=\"sc.notificationTile.type\"\n" +
    "         sit-tile-counter=sc.notificationTile.counter\n" +
    "         sit-tile-callback=\"sc.notificationTile.clickCallback\"\n" +
    "         sit-tile-position=\"sc.notificationTile.position\"\n" +
    "         sit-tile-popup=\"sc.notificationTile.popup\"\n" +
    "         id=\"{{sc.notificationTile.id}}\"></div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("common/layout/shell/shell.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/layout/shell/shell.tpl.html",
    "<div class=\"canvas\" ng-controller=\"layoutController as lc\">\n" +
    "    <div data-internal-type=\"property-area-container-modal\" ng-class=\"lc.typeClass + 'Modal'\" ng-style=\"lc.swacEnabled===true && {'top':'0px',left:'0px'}\"\n" +
    "         ng-show=\"lc.currentPAreaType === lc.propertyAreaTypes.edit\" ng-click=\"lc.closeSidepanel()\"></div>\n" +
    "    <div class=\"global-vertical-command-bar\" ng-if=\"lc.isGlobalCommandBarShown\">\n" +
    "        <sit-command-bar sit-commands=\"lc.globalCommandBarData\" sit-layout=\"vertical\"></sit-command-bar>\n" +
    "    </div>\n" +
    "    <div ng-hide=\"lc.hide\" class=\"property-are-parent\">\n" +
    "        <div data-internal-type=\"property-area-container\" class=\"side-panel-{{lc.layoutSize}}-layout\" ng-class=\"[lc.typeClass , {'property-area-container-margin-right' : lc.isVerticalCommandBarPresent }]\" ng-style=\"lc.swacEnabled===true && {'top':'0px'}\">\n" +
    "            <div class=\"title\" ng-if=\"lc.title\">\n" +
    "                {{lc.title}}\n" +
    "            </div>\n" +
    "            <div ui-view=\"property-area-container\" class=\"content\">\n" +
    "\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div ng-if=\"lc.swacEnabled!==true\" class=\"breadcrumb-div canvas-ui-view\" ng-show=\"lc.isBreadcrumbShown\">\n" +
    "        <div ng-if=\"lc.isGridsterEnabled !== true\">\n" +
    "            <sit-breadcrumb></sit-breadcrumb>\n" +
    "        </div>\n" +
    "        <div ng-if=\"lc.isGridsterEnabled !==false\" ng-style=\"{'width': lc.isLargeScreen ? 'calc(100% - 200px)' : '100%' }\" style=\"float:left\">\n" +
    "            <sit-breadcrumb></sit-breadcrumb>\n" +
    "        </div>\n" +
    "        <div ng-if=\"(lc.isGridsterEnabled && lc.isLargeScreen)\">\n" +
    "            <div style=\"width:190px; float:right; margin-right: 10px;\">\n" +
    "                <sit-command-bar sit-commands=\"lc.commandBarData\"></sit-command-bar>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div style=\"clear:both\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div ui-view=\"Canvas\" class=\"canvas-ui-view\" h-adapter=\".breadcrumb-div\" ng-class=\"{'canvas-transparent' : $root.$state.current.data.afxBackground, 'canvas-background' : !$root.$state.current.data.afxBackground}\"></div>\n" +
    "</div>");
}]);

angular.module("common/layout/swac/swac.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/layout/swac/swac.html",
    "<div class=\"swac-ui-module\">\n" +
    "    <div ng-if=\"swacUIMCtrl.isCreationFailed===true\">\n" +
    "        <div class=\"creationFailedDiv\">\n" +
    "            <i class=\"fa fa-exclamation-circle fa-3x creationFailedIcon\" aria-hidden=\"true\"></i>\n" +
    "            <h2 class=\"creationFailedTitle\">{{swacUIMCtrl.title}}</h2>\n" +
    "            <div style=\"clear:both\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div style=\"padding-left:60px;\">{{swacUIMCtrl.message}}</div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/layout/unauthorized/unauthorized.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/layout/unauthorized/unauthorized.html",
    "<div class=\"unauthorizedDiv\">\n" +
    "    <i class=\"fa fa-exclamation-circle fa-3x unauthIcon\" aria-hidden=\"true\"></i>\n" +
    "    <h2 class=\"unauthTitle\">{{unauthCtrl.title}}</h2>\n" +
    "    <div style=\"clear:both\"></div>\n" +
    "</div>\n" +
    "\n" +
    "<div style=\"padding-left:60px;\">{{unauthCtrl.message}}</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("common/widgets/accordion/sit-accordion-group.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/accordion/sit-accordion-group.html",
    "<div class=\"sit-panel-default\" ng-style=\"paddingStyle\">\n" +
    "    <div ng-click=\"accGrpCtrl.itemClicked($event)\" id={{accGrpCtrl.menuItemId}} data-internal-type=\"{{accGrpCtrl.internalType}}\" class=\"sit-panel-heading sit-panel-cont {{accGrpCtrl.itemSpaceClass}}\" ng-class=\"{'highlight-selected-menu': (accGrpCtrl.isSelected === 'true')}\">\n" +
    "        <div class=\"{{accGrpCtrl.imgLevelClass}} sit-panel-fa fa\" ng-class=\"accGrpCtrl.isOpen ? accGrpCtrl.faOpenIcon: accGrpCtrl.faIcon\" ng-click=\"accGrpCtrl.toggleOpen($event)\" ng-style=\"accGrpCtrl.displayIcon!==null?{'font-size':'0px'}:''\">\n" +
    "            <img alt=\"\" ng-if=\"accGrpCtrl.displayIcon!==null\" ng-src=\"{{accGrpCtrl.displayIcon}}\" height=\"16px\" width=\"16px\" />\n" +
    "        </div>\n" +
    "        <div class=\"sit-panel-title\" ng-class=\"accGrpCtrl.txtLevelClass\">\n" +
    "            <h2 class=\"panel-title sit-title\">\n" +
    "               \n" +
    "                <a tabindex=\"0\" class=\"accordion-toggle\"  sit-accordion-transclude=\"heading\">\n" +
    "                    <span ng-class=\"{'text-muted': accGrpCtrl.isDisabled}\"></span>\n" +
    "                </a>\n" +
    "            </h2>\n" +
    "        </div>\n" +
    "      \n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"panel-collapse\" ng-class=\"{'collapse' : !accGrpCtrl.isOpen}\">\n" +
    "        <div class=\"sit-panel-body\" ng-transclude></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("common/widgets/accordion/sit-accordion.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/accordion/sit-accordion.html",
    "<div class=\"sit-panel-group\" ng-transclude></div>");
}]);

angular.module("common/widgets/advancedSelect/multi-selection.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/advancedSelect/multi-selection.html",
    "<div class=\"label label-property-grid-control-readonly property-value-ellipsis selection-read-only\" ng-if=\"ctrl.readOnly || ctrl.ngReadonly\">\n" +
    "    {{ ctrl.sitSelectedString || ctrl.sitPlaceholder }}\n" +
    "</div>\n" +
    "<ng-form ng-if=\"!(ctrl.readOnly || ctrl.ngReadonly)\" name='multiselectForm'\n" +
    "         ng-class=\"{'isrequired' : (ctrl.validation.required) && ! ((ctrl.sitOptions | filter:{selected:true}).length > 0)}\">\n" +
    "    <div class=\"dropdown multi-select-dropdown multi-selection\">\n" +
    "        <button class=\"btn btn-default\" type=\"button\" id=\"dropdownMenu1\" aria-expanded=\"true\" data-toggle=\"dropdown\"\n" +
    "                ng-class=\"{'validator-control-invalid':((multiselectForm.$invalid && multiselectForm.$dirty) || (multiselectForm.$invalid && multiselectForm.$visited)),\n" +
    "               'validator-control':!((multiselectForm.$invalid && multiselectForm.$dirty) || (multiselectForm.$invalid && multiselectForm.$visited)),\n" +
    "               'ng-dirty':multiselectForm.$dirty}\"\n" +
    "                ng-blur=\"ctrl.ngBlur()\" ng-disabled=\"ctrl.ngDisabled\" ng-focus=\"ctrl.ngFocus()\">\n" +
    "            <span class=\"dropdownButtonLabel\">{{ctrl.getSelectedText()}}</span>\n" +
    "                  <span class=\"multi-selection-dropdown-icon\" sit-class=\"multi-selection-dropdown-icon\" sit-mom-icon='{path: \"common/icons/miscDownArrow16.svg\", size:\"16px\"}'> </span> \n" +
    "        </button>\n" +
    "        <input type=\"hidden\" ng-model=\"ctrl.sitSelectedString\" ng-required=\"ctrl.validation.required\" sit-change=\"ctrl.sitChange\" sit-form-input-validator />\n" +
    "\n" +
    "        <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dropdownMenu1\">\n" +
    "            <li ng-repeat=\"selectable in ctrl.sitOptions | filter: ctrl.sitSplitList ? {selected:true} : {}\" role=\"presentation\" ng-click=\"ctrl.toggleSelected($event, selectable)\" class=\"dropdown-item\">\n" +
    "                <input type=\"checkbox\" ng-model=\"selectable.value\" ng-checked=\"selectable.selected\" class=\"view-text\" />\n" +
    "                <a role=\"menuitem\" tabindex=\"-1\">{{selectable.name}}</a>\n" +
    "                <!--<i class=\"fa\" ng-class=\"selectable.direction==='desc' ? 'fa-sort-alpha-desc' : 'fa-sort-alpha-asc'\" ng-click=\"ctrl.toggleDirection($event, selectable)\"></i>-->\n" +
    "            </li>\n" +
    "            <!--This is VERY inefficient-->\n" +
    "            <li role=\"presentation\" class=\"divider\" ng-if=\"ctrl.sitSplitList && (ctrl.sitOptions | filter:ctrl.isFalsy).length > 0 && (ctrl.sitOptions | filter:{selected:true}).length > 0\"></li>\n" +
    "            <li ng-if=\"ctrl.sitSplitList\" ng-repeat=\"selectable in ctrl.sitOptions | filter:ctrl.isFalsy\" role=\"presentation\" ng-click=\"ctrl.toggleSelected($event, selectable)\" class=\"dropdown-item\">\n" +
    "                <input type=\"checkbox\" ng-checked=\"selectable.selected\" class=\"view-text\" />\n" +
    "                <a role=\"menuitem\" tabindex=\"-1\">{{selectable.name}}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</ng-form>");
}]);

angular.module("common/widgets/advancedSelect/single-selection.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/advancedSelect/single-selection.html",
    "<div class=\"label label-property-grid-control-readonly property-value-ellipsis selection-read-only\" ng-if=\"ctrl.readOnly || ctrl.ngReadonly\">\n" +
    "    {{ ctrl.sitSelectedStringName || ctrl.sitPlaceholder }}\n" +
    "</div>\n" +
    "<ng-form ng-if=\"!(ctrl.readOnly || ctrl.ngReadonly)\" name='singleselectForm'\n" +
    "         ng-class=\"{'isrequired' : ctrl.validation.required}\">\n" +
    "    <div class=\"dropdown multi-select-dropdown single-selection\">\n" +
    "        <button class=\"btn btn-default dropdown-menu-advanced\" type=\"button\" id=\"dropdownMenuAdvanced\" aria-expanded=\"true\" data-toggle=\"dropdown\"\n" +
    "                ng-class=\"{'validator-control-invalid':((singleselectForm.$invalid && singleselectForm.$dirty) || (singleselectForm.$invalid && singleselectForm.$visited)),\n" +
    "               'validator-control':!((singleselectForm.$invalid && singleselectForm.$dirty) || (singleselectForm.$invalid && singleselectForm.$visited)),\n" +
    "               'ng-dirty':singleselectForm.$dirty}\"\n" +
    "                ng-blur=\"ctrl.ngBlur()\" ng-disabled=\"ctrl.ngDisabled\" ng-focus=\"ctrl.ngFocus()\">\n" +
    "            <span class=\"dropdownButtonLabel\">{{ctrl.sitSelectedStringName}}</span>\n" +
    "            <span class=\"single-selection-dropdown-icon\" sit-class=\"single-selection-dropdown-icon\" sit-mom-icon='{path: \"common/icons/miscDownArrow16.svg\", size:\"16px\"}'> </span>\n" +
    "\n" +
    "        </button>\n" +
    "        <input type=\"hidden\" ng-model=\"ctrl.sitSelectedString\" ng-required=\"ctrl.validation.required\" sit-change=\"ctrl.sitChange\" sit-form-input-validator />\n" +
    "\n" +
    "        <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dropdownMenuAdvanced\" tabindex=\"0\">\n" +
    "            <li ng-if=\"ctrl.sitToGroup\" ng-repeat=\"(groupName,options) in (ctrl.sitOptions | groupBy:'groupby')\">\n" +
    "                {{groupName}} {{ctrl.sitToGroup}}\n" +
    "                <ul>\n" +
    "                    <li ng-repeat=\"selectable in options | filter: ctrl.sitSplitList ? {selected:true} : {}\"\n" +
    "                        data-internal-type=\"{{selectable.id}}\" ng-class=\"{selected: selectable.selected}\" role=\"presentation\"\n" +
    "                        ng-click=\"ctrl.toggleSelected($event, selectable)\" class=\"dropdown-item\">\n" +
    "                        <a role=\"menuitem\" tabindex=\"-1\">{{selectable.name}}</a>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </li>\n" +
    "            <li ng-repeat=\"selectable in ctrl.sitOptions | filter: ctrl.sitSplitList ? {selected:true} : {}\"\n" +
    "                data-internal-type=\"{{selectable.id}}\" ng-class=\"{selected: selectable.selected}\" role=\"presentation\"\n" +
    "                ng-click=\"ctrl.toggleSelected($event, selectable)\" class=\"dropdown-item\"\n" +
    "                ng-if=\"!ctrl.sitToGroup\">\n" +
    "                <a role=\"menuitem\" tabindex=\"-1\">{{selectable.name}}</a>\n" +
    "                <!--<i class=\"fa\" ng-class=\"selectable.direction==='desc' ? 'fa-sort-alpha-desc' : 'fa-sort-alpha-asc'\" ng-click=\"ctrl.toggleDirection($event, selectable)\"></i>-->\n" +
    "            </li>\n" +
    "            <!--This is VERY inefficient-->\n" +
    "            <li role=\"presentation\" class=\"divider\" ng-if=\"ctrl.sitSplitList && (ctrl.sitOptions | filter:ctrl.isFalsy).length > 0 && (ctrl.sitOptions | filter:{selected:true}).length > 0\"></li>\n" +
    "            <li ng-if=\"ctrl.sitSplitList\" ng-class=\"{selected: selectable.selected}\" ng-repeat=\"selectable in ctrl.sitOptions | filter:ctrl.isFalsy\" role=\"presentation\" ng-click=\"ctrl.toggleSelected($event, selectable)\" class=\"dropdown-item\">\n" +
    "                <input type=\"checkbox\" ng-checked=\"selectable.selected\" class=\"view-text\" />\n" +
    "                <a role=\"menuitem\" tabindex=\"-1\">{{selectable.name}}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</ng-form>");
}]);

angular.module("common/widgets/advancedSelect/sit-advanced-select.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/advancedSelect/sit-advanced-select.html",
    "<div ng-include=\"ctrl.getTemplate()\" class=\"multi-advanced-selection\">\n" +
    "\n" +
    "</div>");
}]);

angular.module("common/widgets/auditTrail/sit-at-composition-details.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/auditTrail/sit-at-composition-details.html",
    "<div class=\"composition-details-container\" ng-show=\"vm.ready\">\n" +
    "    <div class=\"summary\">\n" +
    "        <div class=\"message\">\n" +
    "            {{'auditTrail.summary.message' | translate: vm.data.summary }}\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"composition-details\">\n" +
    "        <div class=\"list\">\n" +
    "            <div class=\"container\">\n" +
    "                <sit-at-parts-tree sit-data=\"vm.accordion.data\" sit-config=\"vm.accordion.config\"></sit-at-parts-tree>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"details\" ng-if=\"vm.currentPart\">\n" +
    "            <sit-at-record-details sit-data=\"vm.currentPart\" sit-config=\"vm.currentPartConfig\"></sit-at-record-details>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/auditTrail/sit-at-parts-tree.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/auditTrail/sit-at-parts-tree.html",
    "<ul class=\"at-menu-items\">\n" +
    "    <li class=\"menu-item-li\" ng-repeat=\"menuItem in vm.data\">\n" +
    "        <div class=\"menu-item\" ng-class=\"menuItem.selected ? 'highlight-selected-menu' : '' \" ng-click=\"vm.onSelectedChanged(menuItem);\">\n" +
    "            <div class=\"content\">\n" +
    "                <span>{{\"auditTrail.composition.partTitle\" | translate: {entityName: menuItem.data.ChangedEntityShortType, action: menuItem.action} }}</span>\n" +
    "                <ul>\n" +
    "                    <li ng-repeat=\"logicalKey in menuItem.data.ChangedEntityName\">{{logicalKey.Name}}:&nbsp; {{logicalKey.Value}}</li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"menu-item-children\" ng-if=\"menuItem.opened\">\n" +
    "            <sit-cutom-tree sit-data=\"menuItem.items\" sit-config=\"vm.config\"></sit-cutom-tree>\n" +
    "        </div>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("common/widgets/auditTrail/sit-at-record-details.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/auditTrail/sit-at-record-details.html",
    "<div class=\"at-record-details\">\n" +
    "    <div class=\"scalar-properties\" ng-if=\"vm.record.ChangedEntity.ChangedScalarProperties.length\">\n" +
    "        <div class=\"title\">\n" +
    "            {{'auditTrail.properties.title' | translate}}:\n" +
    "        </div>\n" +
    "        <ul class=\"list\">\n" +
    "            <li class=\"item\" ng-repeat=\"property in vm.record.ChangedEntity.ChangedScalarProperties track by $index\">\n" +
    "                <div ng-if=\"true === property.hasOwnProperty('OldValue') && true === property.hasOwnProperty('NewValue')\">\n" +
    "                    <span class=\"name\">{{property.Name}}:</span>&nbsp;\n" +
    "                    <span class=\"oldvalue\">\n" +
    "                        {{'auditTrail.properties.old' | translate}}:\n" +
    "                        <span class=\"valid\" ng-if=\"null !== property.OldValue\">{{property.OldValue}};</span>\n" +
    "                        <span class=\"null\" ng-if=\"null === property.OldValue\">null;</span>\n" +
    "                    </span>&nbsp;\n" +
    "                    <span class=\"newvalue\">\n" +
    "                        {{'auditTrail.properties.new' | translate}}:\n" +
    "                        <span ng-if=\"null !== property.NewValue\">{{property.NewValue}};</span>\n" +
    "                        <span class=\"null\" ng-if=\"null === property.NewValue\">null;</span>\n" +
    "                    </span>&nbsp;\n" +
    "                </div>\n" +
    "                <div ng-if=\"false === property.hasOwnProperty('OldValue') && false === property.hasOwnProperty('NewValue')\">\n" +
    "                    <span class=\"name\">{{property.Name}}:</span>&nbsp;\n" +
    "                    <span>{{'auditTrail.properties.bigdata' | translate}}</span>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"complex-properties\" ng-if=\"vm.record.ChangedEntity.ChangedComplexProperties.length\">\n" +
    "        <div class=\"title\">\n" +
    "            {{'auditTrail.complex.title' | translate}}:\n" +
    "        </div>\n" +
    "        <ul class=\"list\">\n" +
    "            <li class=\"item\" ng-repeat=\"complexProperty in vm.record.ChangedEntity.ChangedComplexProperties track by $index\">\n" +
    "                <span class=\"property-name\">{{'auditTrail.complex.propName' | translate}}:&nbsp;{{complexProperty.Name}}</span>\n" +
    "                <ul class=\"list\">\n" +
    "                    <li class=\"item\" ng-repeat=\"property in complexProperty.ChangedScalarProperties track by $index\">\n" +
    "                        <div ng-if=\"true === property.hasOwnProperty('OldValue') && true === property.hasOwnProperty('NewValue')\">\n" +
    "                            <span class=\"name\">{{property.Name}}:</span>&nbsp;\n" +
    "                            <span class=\"oldvalue\">\n" +
    "                                {{'auditTrail.properties.old' | translate}}:\n" +
    "                                <span class=\"valid\" ng-if=\"null !== property.OldValue\">{{property.OldValue}};</span>\n" +
    "                                <span class=\"null\" ng-if=\"null === property.OldValue\">null;</span>\n" +
    "                            </span>&nbsp;\n" +
    "                            <span class=\"newvalue\">\n" +
    "                                {{'auditTrail.properties.new' | translate}}:\n" +
    "                                <span ng-if=\"null !== property.NewValue\">{{property.NewValue}};</span>\n" +
    "                                <span class=\"null\" ng-if=\"null === property.NewValue\">null;</span>\n" +
    "                            </span>&nbsp;\n" +
    "                        </div>\n" +
    "                        <div ng-if=\"false === property.hasOwnProperty('OldValue') && false === property.hasOwnProperty('NewValue')\">\n" +
    "                            <span class=\"name\">{{property.Name}}:</span>&nbsp;\n" +
    "                            <span>{{'auditTrail.properties.bigdata' | translate}}</span>\n" +
    "                        </div>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <div class=\"relationships\" ng-if=\"vm.record.isRootEntity && vm.record.relationships.length\">\n" +
    "        <div class=\"title\">\n" +
    "            {{'auditTrail.relationships.title' | translate}}:\n" +
    "        </div>\n" +
    "        <ul class=\"list\">\n" +
    "            <li class=\"item\" ng-repeat=\"relationship in vm.record.relationships track by $index\">\n" +
    "                <span ng-if=\"'many' === relationship.type\">\n" +
    "                    {{'auditTrail.relationships.backwardNavigation' | translate: relationship}}\n" +
    "                </span>\n" +
    "                <span ng-if=\"'one' === relationship.type && 'Added' === relationship.action\">\n" +
    "                    {{'auditTrail.relationships.forwardNavigation.Added' | translate: relationship}}\n" +
    "                </span>\n" +
    "                <span ng-if=\"'one' === relationship.type && 'Removed' === relationship.action\">\n" +
    "                    {{'auditTrail.relationships.forwardNavigation.Removed' | translate: relationship}}\n" +
    "                </span>\n" +
    "                <span ng-if=\"'one' === relationship.type && 'Modified' === relationship.action\">\n" +
    "                    {{'auditTrail.relationships.forwardNavigation.Modified' | translate: relationship}}\n" +
    "                </span>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"vm.record.ElectronicSignatureId && vm.record.ElectronicSignatureDetails.length\">\n" +
    "        <div class=\"title\">\n" +
    "            {{'auditTrail.electronicSignature.title' | translate}}:\n" +
    "        </div>\n" +
    "        <ul class=\"list\">\n" +
    "            <li class=\"item\" ng-repeat=\"property in vm.record.ElectronicSignatureDetails track by $index\">\n" +
    "                <span class=\"name\">{{property.Name}}:</span>&nbsp;\n" +
    "                <span class=\"valid\">{{property.Value}};</span>&nbsp;\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/auditTrail/sit-at-viewer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/auditTrail/sit-at-viewer.html",
    "<div class=\"at-viewer-container\" ng-if=\"vm.ready\">\n" +
    "    <div class=\"msg msg-warning\" ng-if=\"!vm.isEnabled\">\n" +
    "        <span>{{'auditTrail.messages.notEnabled' | translate }}</span>\n" +
    "    </div>\n" +
    "    <table sit-table=\"atViewer\" sit-config=\"vm.tableConfig\" class=\"table\" ng-if=\"vm.isEnabled\">\n" +
    "        <thead>\n" +
    "            <tr>\n" +
    "                <th style=\"display:block\">\n" +
    "                    <div class=\"tool-bar\">\n" +
    "                        <span sit-table-filterbar></span>\n" +
    "                        <span sit-table-button\n" +
    "                              sit-icon=\"fa-refresh\"\n" +
    "                              ng-click=\"vm.refreshData()\"\n" +
    "                              sit-label=\"{{'auditTrail.viewer.commands.refresh' | translate }}\"></span>\n" +
    "                    </div>\n" +
    "                </th>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <th style=\"width:25px\"></th>\n" +
    "                <th ng-show=\"vm.showColumn\">{{vm.tableConfig.fields.RootEntityId.displayName}}</th>\n" +
    "                <th>{{vm.tableConfig.fields.UpdatedOn.displayName}}</th>\n" +
    "                <th>{{vm.tableConfig.fields.UserName.displayName}}</th>\n" +
    "                <th>{{vm.tableConfig.fields.Action.displayName}}</th>\n" +
    "                <th>{{vm.tableConfig.fields.RootEntityType.displayName}}</th>\n" +
    "                <th>{{vm.tableConfig.fields.RootCommand.displayName}}</th>\n" +
    "                <th>{{vm.tableConfig.fields.Environment.displayName}}</th>\n" +
    "            </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "            <tr ng-repeat-start=\"row in vm.tableConfig.data\" ng-style=\"row.expanded ? {'border-bottom':'none'}:{'border-bottom':'1px solid #dcdcdc'}\">\n" +
    "                <td style=\"width:25px\" ng-if=\"row.expanded\" ng-click=\"row.expanded= false\"><em class=\"fa fa-angle-down\"></em></td>\n" +
    "                <td style=\"width:25px\" ng-if=\"!row.expanded\" ng-click=\"row.expanded= true\"><em class=\"fa fa-angle-right\"></em></td>\n" +
    "                <td ng-show=\"vm.showColumn\"><em class=\"fa fa-filter\" ng-click=\"vm.filterbyGUID(row.RootEntityId)\"></em> {{row.RootEntityId}}</td>\n" +
    "                <td>{{row.UpdatedOn | date:'medium'}}</td>\n" +
    "                <td>{{row.UserName}}</td>\n" +
    "                <td>{{row.Action}}</td>\n" +
    "                <td title=\"{{row.RootEntityType}}\">{{row.RootEntityShortType}}</td>\n" +
    "                <td title=\"{{row.RootCommand}}\">{{row.RootCommandShortName}}</td>\n" +
    "                <td>{{row.Environment}}</td>\n" +
    "            </tr>\n" +
    "            <tr sit-freez ng-show=\"false\"></tr>\n" +
    "            <tr sit-freez ng-repeat-end ng-show=\"row.expanded\">\n" +
    "                <td colspan=\"8\">\n" +
    "                    <div class=\"record-details-container\" ng-if=\"row.expanded\">\n" +
    "                        <div class=\"summary\">\n" +
    "                            <div class=\"message\">\n" +
    "                                {{'auditTrail.summary.message' | translate: row.summary }}\n" +
    "                            </div>\n" +
    "                            <div class=\"action\" ng-if=\"row.isMoreDetailsAvailable\" ng-click=\"vm.showMoreDetails(row);\">\n" +
    "                                {{'auditTrail.summary.viewMore' | translate}}\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <sit-at-record-details sit-data=\"row\" ng-if=\"!row.isOnlyPartModified\"></sit-at-record-details>\n" +
    "                    </div>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </tbody>\n" +
    "        <tfoot>\n" +
    "            <tr sit-table-pager></tr>\n" +
    "        </tfoot>\n" +
    "    </table>\n" +
    "</div>\n" +
    "\n" +
    "<script type=\"text/ng-template\" id=\"sit-at-composition-viewer.html\">\n" +
    "    <sit-at-composition-details sit-data=\"Dialog.templatedata\"></sit-at-composition-details>\n" +
    "</script>\n" +
    "");
}]);

angular.module("common/widgets/breadcrumb/breadcrumb.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/breadcrumb/breadcrumb.html",
    "<div data-internal-type=\"breadcrumbContainerDiv\">\n" +
    "    <ol class=\"breadcrumb\">\n" +
    "        <li ng-if=\"ctrl.breadcrumbType=='Complete'\" ng-repeat=\"current in ctrl.trails\" ng-switch=\"$last\">\n" +
    "            <a ng-switch-when=\"false\" href=\"{{current.sitBreadcrumbLink}}\" data-internal-type=\"breadcrumb-item-{{$index+1}}\">{{current.title}} </a>\n" +
    "            <span class=\"lastItem\" ng-switch-when=\"true\" data-internal-type=\"breadcrumb-item-{{$index+1}}\">{{current.title}} </span>\n" +
    "        </li>\n" +
    "        <li ng-if=\"ctrl.breadcrumbType=='HideMiddle'\" ng-repeat=\"shown in ctrl.tobeShown\">\n" +
    "            <span ng-if=\"$middle\" class=\"breadcrumbEllipsis\" ng-class=\"{'breadcrumbEllipsisHighLight':ctrl.showFlyout==true}\" data-internal-type=\"breadcrumb-ellipsis\">{{shown.title}}</span>\n" +
    "            <a ng-if=\"$first\" href=\"{{shown.sitBreadcrumbLink}}\" data-internal-type=\"breadcrumb-first-item\">{{shown.title}}</a>\n" +
    "            <span ng-if=\"$last\" class=\"lastItem\" data-internal-type=\"breadcrumb-last-item\">{{shown.title}}</span>\n" +
    "        </li>\n" +
    "        <li ng-if=\"ctrl.breadcrumbType=='ShowOnlyLast'\" ng-repeat=\"shown in ctrl.tobeShown\">\n" +
    "            <span ng-if=\"$first\" class=\"breadcrumbEllipsis\" ng-class=\"{'breadcrumbEllipsisHighLight':ctrl.showFlyout==true}\" data-internal-type=\"breadcrumb-ellipsis\">{{shown.title}}</span>\n" +
    "            <span ng-if=\"$last\" class=\"lastItem\" title=\"{{ctrl.toolTipforLastItem}}\" data-internal-type=\"breadcrumb-last-item\">{{shown.title}}</span>\n" +
    "        </li>\n" +
    "    </ol>\n" +
    "    <div class=\"divBreadcrumbFlyout\" ng-show=\"ctrl.showFlyout\" ng-style=\"{'top':ctrl.flyoutTop, 'left':ctrl.flyoutLeft, 'margin-left':ctrl.flyoutMarginLeft}\">\n" +
    "        <div class=\"divDropDownBreadcrumbExpander\" ng-if=\"ctrl.showAsDropDown\">\n" +
    "            <a ng-repeat=\"hidden in ctrl.tobeHidden\" class=\"dropdownItems\" href=\"{{hidden.sitBreadcrumbLink}}\" title=\"{{hidden.toolTip}}\" data-internal-type=\"breadcrumb-flyout-menu-item-{{$index+1}}\">{{hidden.title}}</a>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <ol class=\"breadcrumb\" ng-if=\"!ctrl.showAsDropDown\">\n" +
    "                <li ng-repeat=\"hidden in ctrl.tobeHidden\">\n" +
    "                    <a href=\"{{hidden.sitBreadcrumbLink}}\" data-internal-type=\"breadcrumb-flyout-item-{{$index+1}}\">{{hidden.title}}</a>\n" +
    "                </li>\n" +
    "            </ol>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/breadcrumb/samples/breadcrumb-dev-dsleditor-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/breadcrumb/samples/breadcrumb-dev-dsleditor-template.html",
    "<h2>DSL Editor</h2>");
}]);

angular.module("common/widgets/breadcrumb/samples/breadcrumb-dev-home-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/breadcrumb/samples/breadcrumb-dev-home-template.html",
    "<h2>Home Page</h2>\n" +
    "<div class=\"well\">\n" +
    "    This is to the breadcrumb widget developed for the unity UI applications.\n" +
    "    <p></p>\n" +
    "    <p> <a ui-sref=\"mashupEditor\">Go To Mashup Editor</a> </p>\n" +
    "    <p> <a ui-sref=\"dslEditor\">Go to DSL Editor</a></p>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("common/widgets/breadcrumb/samples/breadcrumb-dev-mashup-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/breadcrumb/samples/breadcrumb-dev-mashup-template.html",
    "<h2>Mashup Editor</h2>\n" +
    "<div class=\"well\">\n" +
    "\n" +
    "    <p>List of Views</p>\n" +
    "    <p> <a ui-sref=\"mashupEditor.views\">Go to the View List </a> </p>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/breadcrumb/samples/breadcrumb-dev-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/breadcrumb/samples/breadcrumb-dev-template.html",
    "<div class=\"container\">\n" +
    "<!--<div>-->\n" +
    "    <div class=\"row\">\n" +
    "        <sit-breadcrumb></sit-breadcrumb>\n" +
    "        <div ui-view></div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/breadcrumb/samples/breadcrumb-dev-viewdetail-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/breadcrumb/samples/breadcrumb-dev-viewdetail-template.html",
    "<h2>View Detail</h2>\n" +
    "<div class=\"well\">\n" +
    "    <p></p>\n" +
    "    <p> Details about view : <label>{{ViewName}}</label>  </p>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/breadcrumb/samples/breadcrumb-dev-viewlist-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/breadcrumb/samples/breadcrumb-dev-viewlist-template.html",
    "<h2>Views</h2>\n" +
    "<div class=\"well\">\n" +
    "    The list of views already created\n" +
    "    <p></p>\n" +
    "    <p> <a ui-sref=\"mashupEditor.views.detail({ViewName: 'ViewA'})\">View A</a> </p>\n" +
    "    <p> <a ui-sref=\"mashupEditor.views.detail({ViewName: 'ViewB'})\">View B</a></p>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/breadcrumb/samples/breadcrumb-dev.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/breadcrumb/samples/breadcrumb-dev.html",
    "<!doctype html>\n" +
    "<html lang=\"en\" ng-app=\"siemens.simaticit.common.widgets.breadcrumbDemo\">\n" +
    "<head>\n" +
    "    <title data-ng-bind=\"title\">Breadcrumb Development</title>\n" +
    "    <meta charset=\"utf-8\">\n" +
    "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge, chrome=1\" />\n" +
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no\" />\n" +
    "\n" +
    "    <link href=\"/common/styles/common-dark.css\" rel=\"stylesheet\" />\n" +
    "\n" +
    "</head>\n" +
    "<body>\n" +
    "    <ng-include src=\"'breadcrumb-dev-template.html'\" />\n" +
    "\n" +
    "    <!-- Vendor scripts-->\n" +
    "\n" +
    "    <script src=\"/common/scripts/angular/angular.min.js\"></script>\n" +
    "    <script src=\"/common/scripts/jquery-2.1.1.min.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-ui-router.min.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-ui/ui-bootstrap-tpls.min.js\"></script>\n" +
    "\n" +
    "    <!-- BREADCRUMB Widget SCRIPTS-->\n" +
    "    <script src=\"/common/widgets/breadcrumb/sit-breadcrumb-mod.js\"></script>\n" +
    "    <script src=\"/common/widgets/breadcrumb/sit-breadcrumb-svc.js\"></script>\n" +
    "    <script src=\"/common/widgets/breadcrumb/sit-breadcrumb-dir.js\"></script>\n" +
    "\n" +
    "    <!-- application scripts-->\n" +
    "    <script src=\"/common/widgets/breadcrumb/samples/breadcrumb-dev-app.js\"></script>\n" +
    "    <script src=\"/common/widgets/breadcrumb/samples/breadcrumb-dev-config.route.js\"></script>\n" +
    "    <script src=\"/common/widgets/breadcrumb/samples/breadcrumd-dev-viewcontroller.js\"></script>\n" +
    "</body>\n" +
    "</html>\n" +
    "");
}]);

angular.module("common/widgets/busyIndicator/busy-indicator.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/busyIndicator/busy-indicator.html",
    "<div class=\"modal sit-busy-indicator\" data-backdrop=\"static\" data-internal-type=\"busy-indicator-div\">\n" +
    "    <div class=\"busy-indicator-msg\">\n" +
    "        <div class=\"container-msg\">\n" +
    "            <span data-internal-type=\"busy-indicator-message\">{{busyCtrl.message}}</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"container-icon\">\n" +
    "        <div class=\"horizontal inner-container\">\n" +
    "            <div class=\"vertical\">\n" +
    "                <div class=\"mom-modal-overlay-widget\">\n" +
    "                    <div ng-if=\"busyCtrl.displayIcon !== null\" ng-style=\"{'background-image': 'url(' + busyCtrl.displayIcon + ')'}\" class=\"mom-modal-overlay-spinner-widget\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/carousel/carousel.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/carousel/carousel.html",
    "<div class=\"carousel-inner\">\n" +
    "    <div class=\"carousel-chevron\" ng-click=\"carouselCtrl.prev()\" ng-class=\"carouselCtrl.firstImage !== 1 ? '':'hide-icons'\">\n" +
    "        <a ng-show=\"carouselCtrl.sitItems.length > 1\">\n" +
    "            <em class=\"rotate\" sit-class=\"command-mom-icon\" sit-mom-icon=\"{path: 'common/icons/miscChevronRight16.svg', size : '16px'}\"></em>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div class=\"inner\">\n" +
    "        <ul>\n" +
    "            <li ng-repeat=\"slide in carouselCtrl.sitItems\">\n" +
    "                <img ng-class=\"carouselCtrl.sitValue === slide.id ? 'home-card-selected' : ''\" ng-click=\"carouselCtrl.selectHomeCard(slide)\" ng-src=\"{{slide.image}}\" alt=\"Left Arrow\" />\n" +
    "                <p ng-show=\"slide.title\">{{slide.title}}</p>              \n" +
    "                <p ng-show=\"!slide.title\">&nbsp;</p>              \n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <div class=\"carousel-chevron\" ng-click=\"carouselCtrl.next()\" ng-class=\"carouselCtrl.lastImage !== carouselCtrl.sitItems.length ? '' : 'hide-icons'\">\n" +
    "        <a ng-if=\"carouselCtrl.sitItems.length > 1\">\n" +
    "            <em sit-class=\"command-mom-icon\" sit-mom-icon=\"{path: 'common/icons/miscChevronRight16.svg', size : '16px'}\"></em>\n" +
    "        </a>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/characteristicRepr/browse-failures-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/characteristicRepr/browse-failures-template.html",
    "<style>\n" +
    "    .doc-viewer-default-btn{\n" +
    "        visibility:hidden;\n" +
    "    }\n" +
    "\n" +
    "</style>\n" +
    "\n" +
    "<div style=\"width:{{Dialog.templatedata.dialogWidth}}; height:{{Dialog.templatedata.dialogHeight}}\">\n" +
    "    <sit-failures-browser display-mode=\"Dialog.templatedata.showMode\"\n" +
    "                          already-assigned=\"Dialog.templatedata.alreadyAssigned\"\n" +
    "                          selected-item=\"Dialog.templatedata.selectedItem\"\n" +
    "                          has-selection=\"Dialog.templatedata.hasSelection\">\n" +
    "    </sit-failures-browser>\n" +
    "</div>");
}]);

angular.module("common/widgets/characteristicRepr/char-rep-runtime.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/characteristicRepr/char-rep-runtime.html",
    "<!--to be removed -->");
}]);

angular.module("common/widgets/characteristicRepr/characteristic-repr-dir.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/characteristicRepr/characteristic-repr-dir.html",
    "<div class=\"characteristic-repr\" style=\"height: 100%\">\n" +
    "    <div id=\"tmpImagePlaceholder\" />\n" +
    "    <div ng-show=\"!vm.isenabled\" style=\"width:100%\">\n" +
    "        <h4>This directive requires Workinstrucion App installed and running</h4>\n" +
    "    </div>\n" +
    "    <div id=\"repritemlist\" ng-if=\"vm.isloaded\" style=\"min-width: 290px; height: 100%; float:left\">\n" +
    "        <sit-item-collection-viewer sit-data=\"vm.viewerData\" sit-options=\"vm.viewerOptions\"></sit-item-collection-viewer>\n" +
    "    </div>\n" +
    "\n" +
    "    <div  style=\"height: 100%; overflow-x: hidden; overflow-y: visible;\">\n" +
    "        <div class=\"row\">\n" +
    "            <div class=\"col-md-30 col-sm-30 col-lg-30\" style=\"min-width:660px\">\n" +
    "                <div ng-show=\"vm.IsVariable\" class=\"column-container\">\n" +
    "                    <p class=\"medium-title-display\">{{vm.Label}}</p>\n" +
    "                    <div class=\"column-form-content\">\n" +
    "                        <label class=\"property-label\" for=\"quantitysample\">Quantity</label>\n" +
    "                        <div style=\"position: relative; float: left; width: 100%; white-space:nowrap;\">\n" +
    "                            <input type=\"number\" id=\"quantitysample\"\n" +
    "                                   ng-model=\"vm.Quantity\" step=\"0.01\"\n" +
    "                                   ng-blur=\"vm.SaveSample()\"\n" +
    "                                   ng-change=\"vm.ValueChanged()\"\n" +
    "                                   class=\"ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required ng-valid-pattern ng-valid-minlength ng-valid-maxlength validator-control\"\n" +
    "                                   style=\"display: inline-block; width:192px !important; vertical-align: middle;\" />\n" +
    "                            <img alt=\"{{vm.changesIcon.path}}\" class=\"svg-icon\" ng-src=\"vm.changesIcon.path\" height=\"16\" width=\"16\" src=\"{{vm.changesIcon.path}}\" ng-show=\"vm.DisplayInfoBadge\" style=\"margin-left:8px; margin-right: 8px;\">\n" +
    "                            <button type=\"button\" class=\"pl-button-square\" ng-click=\"vm.onButtonClick(1)\" style=\"display:inline-block; vertical-align:middle;\" ng-show=\"vm.DisplayInfoBadge && !vm.HasFailure\">\n" +
    "                                <span class=\"svg-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"vm.addIcon\"></span>\n" +
    "                            </button>\n" +
    "                            <button type=\"button\" ng-show=\"vm.HasFailure\" class=\"pl-button-square\" ng-click=\"vm.removeFailure()\" style=\"display:inline-block\">\n" +
    "                                <span class=\"svg-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"vm.deleteIcon\"></span>\n" +
    "                            </button>\n" +
    "                            <div class=\"tile tags-disabled\" style=\"overflow: hidden;  border-width: 4px;position: relative;top: 0;left: 0;height: 50px;text-align: center;color: #1e1e1e;background-color: #f0f0f0;padding-top: 16px; padding-left: 8px; padding-right: 8px; padding-bottom: 16px;\" ng-if=\"vm.HasFailure\">\n" +
    "                                <div class=\"medium-item-text medium-title-display\" style=\"text-overflow: ellipsis; overflow: hidden; white-space: nowrap; display: inline-block; width: 200px;\">\n" +
    "                                    {{vm.FailureNId}}\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div ng-show=\"vm.IsAttributive\" class=\"column-container\">\n" +
    "                    <p class=\"medium-title-display\">{{vm.Label}}</p>\n" +
    "                    <div class=\"column-form-content\">\n" +
    "                        <table style=\"width: 640px;\">\n" +
    "                            <tr>\n" +
    "                                <td rowspan=\"3\" style=\"width:32px\">\n" +
    "                                    <img alt=\"{{vm.changesIcon.path}}\" class=\"svg-icon\" ng-src=\"vm.changesIcon.path\" height=\"16\" width=\"16\" src=\"{{vm.changesIcon.path}}\" ng-style=\"{'display': (vm.HasAttribute == null)? 'block' : 'none'}\">\n" +
    "                                </td>\n" +
    "                                <td>\n" +
    "\n" +
    "                                    <label class=\"radio-container\">\n" +
    "                                        <input type=\"radio\" id=\"okdescriptionid\" ng-model=\"vm.HasAttribute\" ng-value=\"true\" ng-click=\"vm.SaveSample()\" />\n" +
    "                                        <span class=\"checkmark\"></span>\n" +
    "                                    </label>\n" +
    "                                  </td>\n" +
    "                                <td>\n" +
    "                                    <p class=\"light-title-display\">{{vm.Specification.CharacteristicSpecification.OKDescription}}</p>\n" +
    "                                </td>\n" +
    "                                <td>\n" +
    "\n" +
    "                                    <label class=\"radio-container\">\n" +
    "                                        <input type=\"radio\" id=\"notokdescriptionid\" ng-model=\"vm.HasAttribute\" ng-value=\"false\" ng-click=\"vm.SaveSample()\" />\n" +
    "                                        <span class=\"checkmark\"></span>\n" +
    "                                    </label>\n" +
    "                                </td>\n" +
    "                                <td>\n" +
    "                                    <p class=\"light-title-display\" >{{vm.Specification.CharacteristicSpecification.NOKDescription}}</p>\n" +
    "                                </td>\n" +
    "                                <td>\n" +
    "                                    <button type=\"button\" class=\"pl-button-square\" ng-click=\"vm.onButtonClick(1)\" style=\"display:inline-block; vertical-align:middle;\" ng-show=\"vm.HasAttribute === false && !vm.HasFailure\">\n" +
    "                                        <span class=\"svg-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"vm.addIcon\"></span>\n" +
    "                                    </button>\n" +
    "                                    <button type=\"button\" ng-show=\"vm.HasFailure\" class=\"pl-button-square\" ng-click=\"vm.removeFailure()\" style=\"display:inline-block\">\n" +
    "                                        <span class=\"svg-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"vm.deleteIcon\"></span>\n" +
    "                                    </button>\n" +
    "                                </td>\n" +
    "                                <td  style=\"position: relative; width:200px;\">\n" +
    "                           \n" +
    "                                        <div class=\"tile tags-disabled\" style=\"overflow: hidden;  border-width: 4px;position: absolute;top: 0;left: 0;height: 50px;text-align: center;color: #1e1e1e;background-color: #f0f0f0;padding-top: 16px; padding-left: 8px; padding-right: 8px; padding-bottom: 16px;\" ng-if=\"vm.HasFailure\">\n" +
    "                                            <div class=\"medium-item-text medium-title-display\" style=\"text-overflow: ellipsis; overflow: hidden; white-space: nowrap; display: inline-block; width:200px\">\n" +
    "                                                {{vm.FailureNId}}\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "      \n" +
    "                                </td>\n" +
    "                            </tr>\n" +
    "                        </table>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div ng-show=\"vm.IsVisual\" class=\"column-container\">\n" +
    "                    <p class=\"medium-title-display\" style=\"display:inline-block\">{{'characteristicRepr.Defect'|translate}} : </p>\n" +
    "                    <p class=\"medium-title-display\" style=\"display:inline-block\">{{vm.Label}}</p>\n" +
    "                    <button type=\"button\" class=\"pl-button-square\" ng-click=\"vm.onButtonClick(0)\" style=\"display:inline-block; float:right;\" ng-show=\"!vm.HasImage\">\n" +
    "                        <span class=\"svg-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"vm.addIcon\"></span>\n" +
    "                    </button>\n" +
    "                    <div class=\"column-form-content\">\n" +
    "                        <div ng-repeat=\"failureReference in vm.Specification.CharacteristicSpecification.FailureReferences\" style=\"margin-bottom: 8px; position: relative\" ng-if=\"!vm.HasImage\">\n" +
    "                            <div>\n" +
    "                                <label class=\"property-label\" for=\"failure_{{failureReference.Failure.NId}}\" style=\"max-width: 45%; margin-bottom: 16px; float:unset !important\">{{failureReference.Failure.Name?failureReference.Failure.Name:failureReference.Failure.NId}}</label>\n" +
    "                                <span ng-if=\"failureReference.Failure.Description\" class=\"fa fa-question-circle-o icon-tooltip\" ng-mouseover=\"vm.SetTooltipPosition()\"></span>\n" +
    "                                <div class=\"icon-container\">\n" +
    "                                    <p class=\"icon-text\">{{failureReference.Failure.Description}}</p>\n" +
    "                                    <div class=\"icon-arrow\"></div>\n" +
    "                                </div>\n" +
    "                                <sup ng-if=\"failure.Description\" class=\"icon-star\">*</sup>\n" +
    "                            </div>\n" +
    "                            <div>\n" +
    "                                <input class=\"ng-pristine ng-untouched ng-empty ng-invalid ng-invalid-required ng-valid-pattern ng-valid-minlength ng-valid-maxlength validator-control\"\n" +
    "                                       type=\"number\"\n" +
    "                                       id=\"failure_{{failureReference.Failure.NId | removeSpaces}}\"\n" +
    "                                       ng-blur=\"vm.SaveVisualSample()\"\n" +
    "                                       style=\"display:inline-block; width:192px !important; margin-right:16px; margin-top:-8px;\" />\n" +
    "                                <button type=\"button\" class=\"pl-button-square\" ng-click=\"vm.onButtonClick(2, failureReference.Failure.NId)\"\n" +
    "                                        style=\"display:inline-block; margin: unset;\"\n" +
    "                                        ng-if=\"failureReference.Failure.Attachments.length > 0\">\n" +
    "                                    <span class=\"svg-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"vm.attachmentIcon\"></span>\n" +
    "                                </button>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div ng-if=\"vm.HasImage\">\n" +
    "                            <div style=\"width:100%\">\n" +
    "                                <div style=\" float:left; width:80%\">\n" +
    "                                    <sit-property-grid sit-id=\"failures_form\"\n" +
    "                                                       sit-layout=\"Horizontal\"\n" +
    "                                                       sit-type=\"Fixed\"\n" +
    "                                                       sit-mode=\"edit\"\n" +
    "                                                       sit-columns=\"1\">\n" +
    "                                        <sit-property sit-widget=\"sit-select\"\n" +
    "                                                      sit-value=\"vm.chosenFailure\"\n" +
    "                                                      sit-widget-attributes=\"vm.FailuresOptions\"\n" +
    "                                                      sit-change=\"vm.selectFailure\">{{'characteristicRepr.PotentialFailures'|translate}}</sit-property>\n" +
    "                                    </sit-property-grid>\n" +
    "                                </div>\n" +
    "                                <button type=\"button\" class=\"pl-button-square\" ng-click=\"vm.onButtonClick(2, vm.chosenFailure.label)\"\n" +
    "                                        style=\"margin-top: unset !important; margin-left: 8px !important; float:left;\" ng-if=\"vm.chosenFailure.hasAttachments\">\n" +
    "                                    <span class=\"svg-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"vm.attachmentIcon\"></span>\n" +
    "                                </button>\n" +
    "                                <button type=\"button\" class=\"pl-button-square\" ng-click=\"vm.onButtonClick(0)\"\n" +
    "                                        style=\"margin-top: unset !important; margin-left: 8px !important; float:left;\">\n" +
    "                                    <span class=\"svg-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"vm.addIcon\"></span>\n" +
    "                                </button>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <sit-image-grid gheight=\"vm.canvasHeight\" gwidth=\"vm.canvasWidth\" on-register-api=\"vm.onImageUploadRegisterApi(api)\" imageid=\"{{vm.ImageId}}\" pointscolor=\"vm.defaultColor\" editable=\"vm.editable\"></sit-image-grid>\n" +
    "                            <sit-failures-legenda options=\"vm.FailuresLegenda\"></sit-failures-legenda>\n" +
    "\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-md-10 col-sm-10 col-lg-10\" ng-show=\"vm.IsAttributive || vm.IsVariable || vm.IsVisual\">\n" +
    "                <div class=\"column-container\">\n" +
    "                    <fieldset ng-show=\"(vm.IsVariable||vm.IsAttributive)&&vm.notifyViolations\" id=\"legend\" style=\"background-color: unset; border: 0px; margin-top: 4px; padding: 0px; width: 310px;\">\n" +
    "                        <legend style=\"border: 0px; background: none; border-bottom: 0px; font-weight: bold; padding: 0px; margin-bottom: 16px\">Legenda</legend>\n" +
    "                        <img alt=\"{{vm.changesIcon.path}}\" class=\"svg-icon\" ng-src=\"vm.changesIcon.path\" height=\"16\" width=\"16\" src=\"{{vm.changesIcon.path}}\">\n" +
    "                        <span style=\"font-size: 12px; margin-left: 3px;\">{{vm.IsVariable?('characteristicRepr.LegendaMessage'|translate):('characteristicRepr.LegendaMessage2'|translate)}}</span>\n" +
    "                    </fieldset>\n" +
    "                    <p class=\"medium-title-display\" style=\"margin-top: 16px\">{{vm.Details}}</p>\n" +
    "                    <div class=\"column-form-content\">\n" +
    "                        <sit-property-grid id=\"propertyGridForm\"\n" +
    "                                           sit-data=\"vm.propertyGridData\"\n" +
    "                                           sit-layout=\"Vertical\"\n" +
    "                                           sit-type=\"Fixed\"\n" +
    "                                           sit-mode=\"list\">\n" +
    "                        </sit-property-grid>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "");
}]);

angular.module("common/widgets/characteristicRepr/sit-failures-browser-dir.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/characteristicRepr/sit-failures-browser-dir.html",
    "<div style=\"width: 100%; height: 100%\" class=\"row\">\n" +
    "    <div class=\"col-md-40 col-sm-40\" ng-show=\"vm.displayMode == 0 || vm.displayMode == 1\">\n" +
    "        <button type=\"button\" class=\"pl-button-square\" ng-click=\"vm.onButtonClick()\" style=\"display:inline-block;\" ng-show=\"vm.displayMode == 0\">\n" +
    "            <span class=\"svg-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"vm.homeIcon\"></span>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"pl-button-square\" ng-click=\"vm.onGoBackClick()\" style=\"display:inline-block;\" ng-show=\"vm.NavigatingHierarchy\">\n" +
    "            <span class=\"svg-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"vm.backIcon\"></span>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"pl-button-square\" ng-click=\"vm.onButtonClick()\" style=\"display:inline-block;\" ng-show=\"vm.displayMode == 1\">\n" +
    "            <span class=\"svg-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"vm.browseIcon\"></span>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-20 col-sm-20\" style=\"padding-left: 10px; height: 90%;\" ng-if=\"!vm.attachmentsOnly\">\n" +
    "        <div id=\"div_{{vm.name}}\" ng-if=\"vm.ready\" style=\"height: 100%; width:100%\">\n" +
    "            <sit-item-collection-viewer sit-data=\"vm.viewerData\" sit-options=\"vm.viewerOptions\"></sit-item-collection-viewer>\n" +
    "        </div>\n" +
    "        <div ng-if=\"!vm.ready\"><i class=\"fa fa fa-spinner fa-2x fa-spin fa-3x\"></i></div>\n" +
    "    </div>\n" +
    "    <div ng-class=\"{'col-md-40 col-sm-40': vm.attachmentsOnly, 'col-sm-20 col-md-20': !vm.attachmentsOnly}\" style=\"padding-left: 10px; height: 90%;\">\n" +
    "        <sit-document-viewer ng-if=\"vm.hasAttachments\"\n" +
    "                             sit-data=\"vm.attachmentData\"\n" +
    "                             sit-categories=\"vm.categories\"\n" +
    "                             sit-actions=\"vm.actions\"\n" +
    "                             sit-config=\"vm.config\">\n" +
    "        </sit-document-viewer>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/characteristicRepr/sit-image-grid-dir.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/characteristicRepr/sit-image-grid-dir.html",
    "<canvas ng-style=\"vm.editable && {'cursor': 'crosshair'}\" id=\"{{vm.gid}}\" width=\"{{vm.canvasWidth}}\" height=\"{{vm.canvasHeight}}\" style=\"padding-top: 4px\"></canvas>");
}]);

angular.module("common/widgets/checkbox/checkbox.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/checkbox/checkbox.html",
    "<div class=\"sit-checkbox\">\n" +
    "    <div class=\"label label-property-grid-control-readonly checkbox-noborder\" ng-if=\"checkboxCtrl.readOnly || checkboxCtrl.ngReadonly || checkboxCtrl.ngDisabled\">\n" +
    "        <ng-form name=\"checkboxForm\" ng-class=\"{'isrequired' : (checkboxCtrl.validation.required) && (checkboxForm.$error.required.length===checkboxCtrl.value.length) }\">\n" +
    "            <div class=\"property-grid-span-group-block\">\n" +
    "                <div class=\"group-control property-grid-no-border-items\"\n" +
    "                     ng-repeat=\"item in checkboxCtrl.value\"\n" +
    "                     ng-class=\"checkboxCtrl.layout === 'horizontal' ? 'horizontal-layout':'vertical-layout'\">\n" +
    "                    <div class=\"check-box\" ng-class=\"!(checkboxCtrl.readOnly || checkboxCtrl.ngReadonly || checkboxCtrl.ngDisabled) ? 'checkbox-enabled' : 'checkbox-disabled'\">\n" +
    "                        <label>\n" +
    "                            <input type='checkbox'\n" +
    "                                   name='{{item.label}}'\n" +
    "                                   ng-model='item.checked'\n" +
    "                                   ng-blur=\"checkboxCtrl.ngBlur()\"\n" +
    "                                   ng-checked=\"item.checked\"\n" +
    "                                   sit-change=\"checkboxCtrl.sitChange\"\n" +
    "                                   ng-disabled=\"true\"\n" +
    "                                   ng-focus=\"checkboxCtrl.ngFocus()\"\n" +
    "                                   ng-required=\"checkboxCtrl.validation.required\"\n" +
    "                                   sit-form-input-validator />\n" +
    "                            <span class=\"property-label-ellipsis\">\n" +
    "                                <span class=\"check\"></span>\n" +
    "                                {{item.label}}\n" +
    "                            </span>\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </ng-form>\n" +
    "    </div>\n" +
    "\n" +
    "    <ng-form ng-if=\"!(checkboxCtrl.readOnly || checkboxCtrl.ngReadonly || checkboxCtrl.ngDisabled)\"\n" +
    "             name=\"checkboxForm\" ng-class=\"{'isrequired' : (checkboxCtrl.validation.required) && (checkboxForm.$error.required.length===checkboxCtrl.value.length) }\">\n" +
    "        <div class=\"property-grid-span-group-block validator-control checkbox-noborder\">\n" +
    "            <div class=\"group-control\" ng-repeat=\"item in checkboxCtrl.value\" ng-class=\"checkboxCtrl.layout === 'horizontal' ? 'horizontal-layout' : 'vertical-layout'\">\n" +
    "                <div class=\"check-box\" ng-class=\"!checkboxCtrl.ngDisabled ? 'checkbox-enabled' : 'checkbox-disabled'\">\n" +
    "                    <label>\n" +
    "                        <input type='checkbox'\n" +
    "                               name='{{item.label}}'\n" +
    "                               ng-model='item.checked'\n" +
    "                               ng-blur=\"checkboxCtrl.ngBlur()\"\n" +
    "                               ng-checked=\"item.checked\"\n" +
    "                               sit-change=\"checkboxCtrl.sitChange\"\n" +
    "                               ng-disabled=\"checkboxCtrl.ngDisabled\"\n" +
    "                               ng-focus=\"checkboxCtrl.ngFocus()\"\n" +
    "                               ng-required=\"checkboxCtrl.validation.required\"\n" +
    "                               sit-form-input-validator />\n" +
    "                        <span class=\"property-label-ellipsis\">\n" +
    "                            <span class=\"check\"></span>\n" +
    "                            {{item.label}}\n" +
    "                        </span>\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </ng-form>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "");
}]);

angular.module("common/widgets/columnConfigurator/columnConfigurator.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/columnConfigurator/columnConfigurator.html",
    "<div class=\"table-column-configuration\">\n" +
    "    <div class=\"columns\">\n" +
    "        <div class=\"header\">\n" +
    "            <h2 class=\"sit-h2\">\n" +
    "                {{ columnConfiguratorCtrl.sitConfig.availableSectionHeader || 'userPrefrences.columnConfigurator.availableSectionHeader'|translate }}\n" +
    "            </h2>\n" +
    "        </div>\n" +
    "        <div class=\"frame\">\n" +
    "            <ul id=\"availableColsList\" class=\"sit-list\">\n" +
    "                <li ng-repeat=\"column in columnConfiguratorCtrl.columnDefs  | orderBy:'index':false track by $index \"\n" +
    "                    ng-click=\"columnConfiguratorCtrl.onItemSelection(column, true)\"\n" +
    "                    ng-class=\"{'selected':column.selected}\" ng-hide=\"column.visible\">\n" +
    "                    <div title=\"{{column.displayName || column.field}}\" style=\"width:100% !important\">\n" +
    "                        {{column.displayName || column.field}}\n" +
    "                    </div>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"command-buttons\">\n" +
    "        <button type=\"button\" class=\"sit-command-icon-button\" ng-click=\"columnConfiguratorCtrl.add()\"\n" +
    "                ng-disabled=\"columnConfiguratorCtrl.isAvailableSelected()\" title=\"{{columnConfiguratorCtrl.sitConfig.addButtonLabel || 'userPrefrences.columnConfigurator.addButtonLabel'|translate}}\">\n" +
    "            <em sit-class=\"svg-icon pl-icon-flip-horizontal\" sit-mom-icon=\"columnConfiguratorCtrl.svgIcons.forward\"></em>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"sit-command-icon-button\" ng-click=\"columnConfiguratorCtrl.remove()\"\n" +
    "                ng-disabled=\"columnConfiguratorCtrl.isSelected()\" title=\"{{columnConfiguratorCtrl.sitConfig.removeButtonLabel || 'userPrefrences.columnConfigurator.removeButtonLabel'|translate}}\">\n" +
    "            <em sit-class=\"svg-icon\" sit-mom-icon=\"columnConfiguratorCtrl.svgIcons.backward\"></em>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"sit-command-icon-button\" ng-click=\"columnConfiguratorCtrl.addAll()\"\n" +
    "                title=\"{{columnConfiguratorCtrl.sitConfig.addAllButtonLabel || 'userPrefrences.columnConfigurator.addAllButtonLabel'|translate}}\">\n" +
    "            <em sit-class=\"svg-icon pl-icon-flip-horizontal\" class=\"invert-icon\" sit-mom-icon=\"columnConfiguratorCtrl.svgIcons.left\"></em>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"sit-command-icon-button\" ng-click=\"columnConfiguratorCtrl.removeAll()\"\n" +
    "                title=\"{{columnConfiguratorCtrl.sitConfig.removeAllButtonLabel || 'userPrefrences.columnConfigurator.removeAllButtonLabel'|translate}}\">\n" +
    "            <em sit-class=\"svg-icon\" sit-mom-icon=\"columnConfiguratorCtrl.svgIcons.right\"></em>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"sit-command-icon-button\" ng-click=\"columnConfiguratorCtrl.reset()\"\n" +
    "                title=\"{{columnConfiguratorCtrl.sitConfig.resetButtonLabel || 'userPrefrences.columnConfigurator.resetButtonLabel'|translate}}\">\n" +
    "            <em sit-class=\"svg-icon\" sit-mom-icon=\"columnConfiguratorCtrl.svgIcons.reset\"></em>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "    <div class=\"columns\">\n" +
    "        <div class=\"header\">\n" +
    "            <h2 class=\"sit-h2\">\n" +
    "                {{ columnConfiguratorCtrl.sitConfig.selectedSectionHeader || 'userPrefrences.columnConfigurator.selectedSectionHeader'|translate }}\n" +
    "            </h2>\n" +
    "        </div>\n" +
    "        <div class=\"frame\">\n" +
    "            <ul id=\"selectedColsList\" class=\"sit-list\">\n" +
    "                <li ng-repeat=\"column in columnConfiguratorCtrl.columnDefs | orderBy:'index':false  track by $index\"\n" +
    "                    ng-click=\"columnConfiguratorCtrl.onItemSelection(column, false)\"\n" +
    "                    ng-class=\"{'selected':column.selected}\" ng-hide=\"!column.visible\">\n" +
    "                    <div title=\"{{column.displayName || column.field}}\" style=\"width:100% !important\">\n" +
    "                        {{column.displayName || column.field}}\n" +
    "                    </div>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"command-buttons last\">\n" +
    "        <button type=\"button\" class=\"sit-command-icon-button\"\n" +
    "            title=\"{{columnConfiguratorCtrl.sitConfig.moveUpButtonLabel || 'userPrefrences.columnConfigurator.moveUpButtonLabel'|translate}}\"\n" +
    "            ng-click=\"columnConfiguratorCtrl.moveUp()\">\n" +
    "            <em sit-class=\"svg-icon\" sit-mom-icon=\"columnConfiguratorCtrl.svgIcons.up\"></em>\n" +
    "        </button>\n" +
    "        <button type=\"button\" class=\"sit-command-icon-button\"\n" +
    "                 title=\"{{columnConfiguratorCtrl.sitConfig.moveDownButtonLabel || 'userPrefrences.columnConfigurator.moveDownButtonLabel'|translate}}\"\n" +
    "                 ng-click=\"columnConfiguratorCtrl.moveDown()\">\n" +
    "            <em sit-class=\"svg-icon\" sit-mom-icon=\"columnConfiguratorCtrl.svgIcons.down\"></em>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/commandBar/command-bar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/commandBar/command-bar.html",
    "<div data-internal-type=\"command-bar\" class=\"sit-command-bar\"\n" +
    "     ng-class=\"{'commandBarContainerAction':commandBarCtrl.commands.barType === 'Action' && commandBarCtrl.layout === 'horizontal',\n" +
    "     'commandBarContainerTool': commandBarCtrl.commands.barType === 'Tool' && commandBarCtrl.layout === 'horizontal',\n" +
    "     'commandbar-container-vertical': commandBarCtrl.layout === 'vertical',\n" +
    "     'commandbar-container-contextual': commandBarCtrl.layout === 'contextual'}\">\n" +
    "\n" +
    "    <div data-internal-type=\"command-menu-command-bar\" ng-class=\"{right: 'right-align-align'}[commandBarCtrl.labelAlign]\">\n" +
    "\n" +
    "        <div class=\"container-fluid\">\n" +
    "            <ul data-internal-type=\"command-bar-collapse-1\"\n" +
    "                ng-class=\"{'commandBarContainerList': commandBarCtrl.layout === 'horizontal',\n" +
    "                'commandBar-container-list-vertical': commandBarCtrl.layout === 'vertical',\n" +
    "                'commandBar-container-list-contextual' : commandBarCtrl.layout === 'contextual'}\">\n" +
    "                <li data-internal-type=\"command-bar-collapse-button\" class=\"btn-group command-hide\">\n" +
    "                    <!-- Collapse button -->\n" +
    "\n" +
    "                    <button data-internal-type=\"collapse-button-command-bar\" id=\"collapse-button-command-bar\" ng-class=\"{Action:'dropdown-toggle CommandActionDropdown',Tool:'dropdown-toggle CommandToolDropdown'}[commandBarCtrl.commands.barType]\" data-toggle=\"dropdown\" title=\"Other commands\">\n" +
    "                        <div style=\"display:inline\">\n" +
    "                            <div class=\"more-button\">\n" +
    "                                <span sit-mom-icon=\"commandBarCtrl.svgIcons.bar\"> </span>\n" +
    "                            </div>\n" +
    "                            <div class=\"caret\"></div>\n" +
    "                        </div>\n" +
    "                        <div ng-if=\"commandBarCtrl.commands.barType=='Tool'\" class=\"CommandToolDropdownLabel\">{{commandBarCtrl.otherCommandsText}}</div>\n" +
    "                    </button>\n" +
    "\n" +
    "                    <ul data-internal-type=\"collapse-menu-command-bar\" id=\"sit-commandbar-collapse-menu\" class=\"dropdown-menu commandBarDropdownMenu\" ng-class=\"{'commandBarDropdownMenuAlignRight':!commandBarCtrl.openLeft}\" role=\"menu\" data-toggle=\"dropdown\">\n" +
    "                        <li ng-repeat=\"command in commandBarCtrl.commands.bar\" class=\"commandBarDropdownItem\" ng-show=\"$index<=commandBarCtrl.MaxIndexNumber\">\n" +
    "\n" +
    "                            <div ng-switch=\"command.type\">\n" +
    "\n" +
    "\n" +
    "                                <div ng-switch-when=\"Command\" data-internal-type=\"collapse-menu-item-command-bar\">\n" +
    "                                    <!-- Action button -->\n" +
    "                                    <sit-command sit-showas=\"Menu\" sit-command=\"command\" sit-bartype=\"{{commandBarCtrl.commands.barType}}\"></sit-command>\n" +
    "                                </div>\n" +
    "\n" +
    "                                <div ng-switch-when=\"toggle\" data-internal-type=\"collapse-menu-item-command-bar\">\n" +
    "                                    <!-- Toggle button -->\n" +
    "                                    <sit-command sit-showas=\"Menu\" sit-command=\"command\" sit-bartype=\"{{commandBarCtrl.commands.barType}}\"></sit-command>\n" +
    "                                </div>\n" +
    "\n" +
    "                                <div ng-switch-when=\"Sep\">\n" +
    "                                    <!-- Separator button -->\n" +
    "                                    <div data-internal-type=\"collapse-menu-separator-command-bar\" class=\"divider menuDivider\"></div>\n" +
    "                                </div>\n" +
    "\n" +
    "                                <div ng-switch-when=\"Group\" data-internal-type=\"collapse-submenu-command-bar\">\n" +
    "                                    <!-- Group Button button -->\n" +
    "                                    <sit-command-group sit-showas=\"Menu\" sit-group=\"command\" sit-bartype=\"{{commandBarCtrl.commands.barType}}\"></sit-command-group>\n" +
    "\n" +
    "                                </div>\n" +
    "\n" +
    "                                <div ng-switch-when=\"MainCommand\">\n" +
    "                                    <sit-command sit-showas=\"Menu\" sit-command=\"command\" sit-type=\"main\" sit-bartype=\"{{commandBarCtrl.commands.barType}}\"></sit-command>\n" +
    "                                </div>\n" +
    "\n" +
    "\n" +
    "                                <div ng-switch-when=\"search\" ng-if=\"commandBarCtrl.layout === 'contextual' && command.visibility\">\n" +
    "\n" +
    "                                    <sit-search sit-command=\"command\" \n" +
    "                                                sit-type=\"search\"\n" +
    "                                                ng-click=\"command.clickCallback\"\n" +
    "                                                ng-focus=\"command.focusCallback\"\n" +
    "                                                sit-change=\"command.changeCallback\"\n" +
    "                                                ng-blur=\"command.blurCallback\"\n" +
    "                                                ng-disabled=\"command.disableSearch\"\n" +
    "                                                sit-search-value=\"{{command.quickSearchText}}\"\n" +
    "                                                sit-placeholder=\"{{command.placeholder}}\">\n" +
    "                                    </sit-search>\n" +
    "                                </div>\n" +
    "                                <div ng-switch-default>\n" +
    "                                   {{'commandBar.unknownCommandSep' | translate}}\n" +
    "                                </div>\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                        </li>\n" +
    "                    </ul>\n" +
    "                </li>                \n" +
    "                <li ng-repeat=\"command in commandBarCtrl.commands.bar\">\n" +
    "\n" +
    "                    <div ng-switch=\"command.type\" ng-show=\"!commandBarCtrl.DisplayMenu || ($index>commandBarCtrl.MaxIndexNumber)\">\n" +
    "\n" +
    "                        <div ng-switch-when=\"Command\">\n" +
    "                            <!-- Action button -->\n" +
    "                            <sit-command sit-command=\"command\" sit-showas=\"Button\" sit-bartype=\"{{commandBarCtrl.commands.barType}}\"></sit-command>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div ng-switch-when=\"toggle\">\n" +
    "                            <!-- Toggle button -->\n" +
    "                            <sit-command sit-command=\"command\" sit-showas=\"Button\" sit-bartype=\"{{commandBarCtrl.commands.barType}}\"></sit-command>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div ng-switch-when=\"Sep\">\n" +
    "                            <!-- Separator button -->\n" +
    "                            <div data-internal-type=\"separator-command-bar\" ng-class=\"{Tool:'commandBarDividerTool',Action:'commandBarDivider'}[commandBarCtrl.commands.barType]\">\n" +
    "                                <div class=\"commandBarDividerIcon\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div ng-switch-when=\"Group\">\n" +
    "                            <!-- Group Button button -->\n" +
    "                            <sit-command-group sit-label-align=\"{{commandBarCtrl.labelAlign}}\" sit-group=\"command\" sit-showas=\"Button\" sit-bartype=\"{{commandBarCtrl.commands.barType}}\"></sit-command-group>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div ng-switch-when=\"MainCommand\">\n" +
    "                            <sit-command sit-command=\"command\" sit-showas=\"Button\" sit-bartype=\"{{commandBarCtrl.commands.barType}}\"></sit-command>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div ng-switch-when=\"search\" ng-if=\"commandBarCtrl.layout === 'contextual' && command.visibility\">\n" +
    "\n" +
    "                            <sit-search index=\"{{$index}}\"\n" +
    "                                        sit-command=\"command\" \n" +
    "                                        sit-type=\"search\"\n" +
    "                                        ng-click=\"command.clickCallback\"\n" +
    "                                        ng-focus=\"command.focusCallback\"\n" +
    "                                        sit-change=\"command.changeCallback\"\n" +
    "                                        ng-disabled=\"command.disableSearch\"\n" +
    "                                        ng-blur=\"command.blurCallback\"\n" +
    "                                        sit-search-value=\"{{command.quickSearchText}}\"\n" +
    "                                        sit-placeholder=\"{{command.placeholder}}\">\n" +
    "                            </sit-search>\n" +
    "                        </div>\n" +
    "                        <div ng-switch-default>\n" +
    "                            {{'commandBar.unknownCommand' | translate}}\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div>\n" +
    "                </li>\n" +
    "                <ng-transclude ng-show=false></ng-transclude>\n" +
    "                <div ng-show=\"(commandBarCtrl.commands.barType === 'Tool' || commandBarCtrl.commands.barType === 'Action') && commandBarCtrl.layout !== 'contextual'\" class=\"commandBarRightMarginForActionButton\"></div>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/commandBar/command-group.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/commandBar/command-group.html",
    "<div>\n" +
    "    <div ng-switch=\"cmdBarGrpBtnCtrl.showas\" ng-show=\"cmdBarGrpBtnCtrl.groupVisibility\">\n" +
    "        <div ng-switch-when=\"Button\" class=\"btn-group\" ng-class=\"{'MainCommanBtnGrp': cmdBarGrpBtnCtrl.isMainCommandGroup}\">\n" +
    "            <button ng-if=\"cmdBarGrpBtnCtrl.isMainCommandGroup\" data-internal-type=\"group-button-command-bar\" class=\"MainCommandGroupButton\" ng-click=\"cmdBarGrpBtnCtrl.commandClicked(cmdBarGrpBtnCtrl.group, $event)\" title=\"{{ cmdBarGrpBtnCtrl.group.tooltip || cmdBarGrpBtnCtrl.group.label }}\" ng-class=\"{'dropdown-toggle': cmdBarGrpBtnCtrl.layout === 'vertical'}\" data-toggle=\"{{cmdBarGrpBtnCtrl.layout === 'vertical' ? 'dropdown' : '' }}\">\n" +
    "                <img alt=\"\" ng-if=\"cmdBarGrpBtnCtrl.layout === 'vertical'\" src=\"common/icons/miscLeftArrow16.svg\" height=\"16\" width=\"16\">\n" +
    "                <span data-internal-type=\"image-container\" class=\"fa-lg\" ng-class=\"cmdBarGrpBtnCtrl.layout === 'vertical' && cmdBarGrpBtnCtrl.group.label.length !== 0? 'vertical-group-main-command-image-label': 'MainCommandImage'\">\n" +
    "                    <em class=\"fa {{cmdBarGrpBtnCtrl.group.image}} \" sit-mom-icon=\"cmdBarGrpBtnCtrl.group.displayIcon\" ng-class=\"{momIcon: cmdBarGrpBtnCtrl.group.displayIcon !== null }\">\n" +
    "                    </em>\n" +
    "                    <span ng-if=\"cmdBarGrpBtnCtrl.layout === 'vertical' && cmdBarGrpBtnCtrl.group.label.length> 0\" class=\"vertical-group-main-command-label\">\n" +
    "                        {{cmdBarGrpBtnCtrl.group.label}}\n" +
    "                    </span>\n" +
    "                </span>\n" +
    "                <span ng-if=\"cmdBarGrpBtnCtrl.layout === 'horizontal'\"  data-internal-type=\"text-container\" class=\"MainCommandActionLabel\">\n" +
    "                    {{cmdBarGrpBtnCtrl.group.label}}                    \n" +
    "                </span>\n" +
    "                <button ng-if=\"cmdBarGrpBtnCtrl.isMainCommandGroup && cmdBarGrpBtnCtrl.layout ==='horizontal'\" data-internal-type=\"group-button-command-bar\" class=\"dropdown-toggle MainCmdGrpdropdown\" data-toggle=\"dropdown\" title=\"{{ cmdBarGrpBtnCtrl.group.tooltip || cmdBarGrpBtnCtrl.group.label }}\">\n" +
    "                    <span class=\"caret\">\n" +
    "                    </span>\n" +
    "                </button>\n" +
    "            </button>\n" +
    "            <button ng-if=\"!cmdBarGrpBtnCtrl.isMainCommandGroup\" data-internal-type=\"group-button-command-bar\" ng-class=\"{Action:'dropdown-toggle CommandActionDropdown',Tool:'dropdown-toggle CommandToolDropdown'}[cmdBarGrpBtnCtrl.bartype]\" data-toggle=\"dropdown\" title=\"{{ cmdBarGrpBtnCtrl.group.tooltip || cmdBarGrpBtnCtrl.group.label }}\">\n" +
    "                <div ng-if=\"cmdBarGrpBtnCtrl.layout ==='vertical' || cmdBarGrpBtnCtrl.labelAlign !== 'right'\">\n" +
    "                   <img alt=\"\" ng-if=\"cmdBarGrpBtnCtrl.layout === 'vertical'\" src=\"common/icons/miscLeftArrow16.svg\" height=\"16\" width=\"16\">\n" +
    "                    <span style=\"line-height:1em\" ng-if=\"cmdBarGrpBtnCtrl.group.image\" class=\"fa-stack fa-lg\" ng-class=\"{'vertical-group-command-image':cmdBarGrpBtnCtrl.layout === 'vertical' && cmdBarGrpBtnCtrl.group.label.length === 0,\n" +
    "                      'vertical-group-command-image-label': cmdBarGrpBtnCtrl.layout === 'vertical'\n" +
    "                      && cmdBarGrpBtnCtrl.group.label.length !== 0}\">\n" +
    "                        <em class=\"fa {{cmdBarGrpBtnCtrl.group.image}} fa-stack\" sit-mom-icon=\"cmdBarGrpBtnCtrl.group.displayIcon\" ng-class=\"{momIcon: cmdBarGrpBtnCtrl.group.displayIcon !== null }\">\n" +
    "                        </em>\n" +
    "                    </span>\n" +
    "                    <span ng-if=\"cmdBarGrpBtnCtrl.layout === 'vertical' && cmdBarGrpBtnCtrl.group.label.length> 0\" class=\"vertical-group-command-label\">\n" +
    "                        {{cmdBarGrpBtnCtrl.group.label}}\n" +
    "                    </span>\n" +
    "                    <span style=\"width:24px!important\" ng-if=\"cmdBarGrpBtnCtrl.layout ==='horizontal'\">\n" +
    "                        <span class=\"caret\">\n" +
    "                        </span>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "                <div ng-if=\"cmdBarGrpBtnCtrl.layout === 'horizontal' && cmdBarGrpBtnCtrl.bartype=='Tool' && cmdBarGrpBtnCtrl.labelAlign !== 'right'\" class=\"CommandToolDropdownLabel\">\n" +
    "                    {{cmdBarGrpBtnCtrl.group.label}}\n" +
    "                </div>\n" +
    "                <span ng-if=\"cmdBarGrpBtnCtrl.layout === 'horizontal' && cmdBarGrpBtnCtrl.group.image && cmdBarGrpBtnCtrl.labelAlign === 'right'\" class=\"fa-lg right-align\">\n" +
    "                    <em class=\"fa {{cmdBarGrpBtnCtrl.group.image}} \" sit-mom-icon=\"cmdBarGrpBtnCtrl.group.displayIcon\" ng-class=\"{momIcon: cmdBarGrpBtnCtrl.group.displayIcon !== null }\">\n" +
    "                    </em>\n" +
    "                </span>\n" +
    "                <span class=\"caret\" ng-if=\"cmdBarGrpBtnCtrl.layout === 'horizontal' && cmdBarGrpBtnCtrl.labelAlign === 'right'\">\n" +
    "                </span>\n" +
    "                <span ng-if=\"cmdBarGrpBtnCtrl.layout === 'horizontal' && cmdBarGrpBtnCtrl.bartype=='Tool' && cmdBarGrpBtnCtrl.labelAlign === 'right' \" class=\"CommandToolDropdownLabel\">\n" +
    "                    {{cmdBarGrpBtnCtrl.group.label}}\n" +
    "                </span>\n" +
    "            </button>\n" +
    "\n" +
    "            <ul data-internal-type=\"menu-command-bar\" class=\"dropdown-menu commandBarDropdownMenu \" ng-class=\"{'commandBarDropdownMenuAlignRight':cmdBarGrpBtnCtrl.openLeft,'mainCommandDropdownMenu': cmdBarGrpBtnCtrl.isMainCommandGroup}\" role=\"menu\" data-toggle=\"dropdown\">\n" +
    "                <li ng-repeat=\"subcommand in cmdBarGrpBtnCtrl.group.group\" class=\"commandBarDropdownItem\">\n" +
    "                    <div ng-switch=\"subcommand.type\">\n" +
    "                        <div data-internal-type=\"menu-item-command-bar\" ng-switch-when=\"MainCommand\" class=\"btnMainMenu\">\n" +
    "                            <sit-command sit-command=\"subcommand\" sit-showas=\"Menu\" sit-bartype=\"{{cmdBarGrpBtnCtrl.bartype}}\">\n" +
    "                            </sit-command>\n" +
    "                        </div>\n" +
    "                        <div data-internal-type=\"menu-item-command-bar\" ng-switch-when=\"Command\">\n" +
    "                            <sit-command sit-command=\"subcommand\" sit-showas=\"Menu\" sit-bartype=\"{{cmdBarGrpBtnCtrl.bartype}}\">\n" +
    "                            </sit-command>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div ng-switch-when=\"Sep\">\n" +
    "                            <div data-internal-type=\"menu-separator-command-bar\" class=\"divider menuDivider\" />\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div data-internal-type=\"menu-item-command-bar\" ng-switch-when=\"toggle\">\n" +
    "                            <sit-command sit-command=\"subcommand\" sit-showas=\"Menu\" sit-bartype=\"{{cmdBarGrpBtnCtrl.bartype}}\">\n" +
    "                            </sit-command>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div ng-switch-default>\n" +
    "                            {{'commandBar.unknownCommandSep' | translate}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "        <div ng-switch-when=\"Menu\" class=\"dropdown-submenu \" ng-class=\"{'pull-left':cmdBarGrpBtnCtrl.openLeft}\">\n" +
    "            <div data-internal-type=\"group-submenu-command-bar\" ng-class=\"{'btnMainMenu btnMenu': cmdBarGrpBtnCtrl.isMainCommandGroup,'btnMenu': !cmdBarGrpBtnCtrl.isMainCommandGroup}\" style=\"text-align:left\" title=\"{{cmdBarGrpBtnCtrl.group.tooltip || cmdBarGrpBtnCtrl.group.name}}\">\n" +
    "\n" +
    "                <span ng-if=\"cmdBarGrpBtnCtrl.group.image\" class=\"fa {{cmdBarGrpBtnCtrl.group.image}}  \" sit-mom-icon=\"cmdBarGrpBtnCtrl.group.displayIcon\" ng-class=\"{momIcon: cmdBarGrpBtnCtrl.group.displayIcon !== null }\">\n" +
    "                </span>\n" +
    "                <label class=\"menuLabel\">\n" +
    "\n" +
    "                    {{cmdBarGrpBtnCtrl.group.label}}\n" +
    "                </label>\n" +
    "                <span class=\"fa fa-caret-right\">\n" +
    "                </span>\n" +
    "            </div>\n" +
    "\n" +
    "            <ul data-internal-type=\"submenu-command-bar\" class=\"dropdown-menu commandBarDropdownMenu\" ng-class=\"{'mainCommandDropdownMenu': cmdBarGrpBtnCtrl.isMainCommandGroup}\" role=\"menu\">\n" +
    "                <li class=\"commandBarDropdownItem\" ng-repeat=\"subcommand in cmdBarGrpBtnCtrl.group.group\">\n" +
    "                    <div ng-switch=\"subcommand.type\">\n" +
    "                        <div data-internal-type=\"submenu-item-command-bar\" ng-switch-when=\"Command\">\n" +
    "                            <sit-command sit-command=\"subcommand\" sit-showas=\"Menu\" sit-bartype=\"{{cmdBarGrpBtnCtrl.bartype}}\">\n" +
    "                            </sit-command>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div data-internal-type=\"menu-item-command-bar\" ng-switch-when=\"MainCommand\" class=\"btnMainMenu\">\n" +
    "                            <sit-command sit-command=\"subcommand\" sit-showas=\"Menu\" sit-bartype=\"{{cmdBarGrpBtnCtrl.bartype}}\">\n" +
    "                            </sit-command>\n" +
    "                        </div>\n" +
    "                        <div data-internal-type=\"submenu-separator-command-bar\" ng-switch-when=\"Sep\">\n" +
    "                            <div class=\"divider menuDivider\">\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div data-internal-type=\"submenu-item-command-bar\" ng-switch-when=\"toggle\">\n" +
    "                            <sit-command sit-command=\"subcommand\" sit-showas=\"Menu\" sit-bartype=\"{{cmdBarGrpBtnCtrl.bartype}}\">\n" +
    "\n" +
    "                            </sit-command>\n" +
    "                        </div>\n" +
    "                        <div ng-switch-default>\n" +
    "                            {{'commandBar.unknownCommandSep' | translate}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "        <ng-transclude ng-show=false>\n" +
    "        </ng-transclude>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/commandBar/command.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/commandBar/command.html",
    "<div ng-transclude class=\"command-hide\"></div>\n" +
    "<div ng-switch=\"cmdCtrl.showas\" ng-show=\"cmdCtrl.command.visibility && !cmdCtrl.command.deniedFromAuthorization\">\n" +
    "    <div ng-switch-when=\"Button\" id=\"Button{{cmdCtrl.command.type}}{{cmdCtrl.command.name}}\" class=\"vertical-button\">\n" +
    "        <button data-internal-type=\"command-button-command-bar\"\n" +
    "                ng-class=\"{'{{cmdCtrl.command.type}}ActionButton': cmdCtrl.bartype === 'Action' && cmdCtrl.layout === 'horizontal',\n" +
    "                '{{cmdCtrl.command.type}}ToolButton': cmdCtrl.bartype === 'Tool' && cmdCtrl.layout === 'horizontal',\n" +
    "                'toggle': cmdCtrl.command.type === 'toggle' && cmdCtrl.command.selected,\n" +
    "                'vertical-command-button': cmdCtrl.layout === 'vertical'}\"\n" +
    "                ng-click=\"cmdCtrl.commandClicked(cmdCtrl.command, $event)\" title=\"{{cmdCtrl.command.tooltip || cmdCtrl.command.label}}\" ng-disabled=\"cmdCtrl.command.disabled\">\n" +
    "            <span data-internal-type=\"image-container\" ng-if=\"cmdCtrl.command.image && !cmdCtrl.command.imageTemplate\" class=\"fa-lg MainCommandImage\">\n" +
    "                <em class=\"fa {{cmdCtrl.command.image}}\" sit-mom-icon=\"cmdCtrl.command.displayIcon\"\n" +
    "                    ng-class=\"{'momIcon': cmdCtrl.command.displayIcon !== null,\n" +
    "                   'vertical-command-image': cmdCtrl.layout === 'vertical' && (cmdCtrl.command.label.length===0 || !cmdCtrl.command.isVerticalCommandLabelShown),\n" +
    "                   'vertical-command-label-image': cmdCtrl.layout=== 'vertical' && cmdCtrl.command.label.length!==0 && cmdCtrl.command.isVerticalCommandLabelShown }\"></em>\n" +
    "                <span ng-if=\"cmdCtrl.layout=== 'vertical' && cmdCtrl.command.label.length>0 && cmdCtrl.command.isVerticalCommandLabelShown\" class=\"vertical-command-label\">\n" +
    "                    {{cmdCtrl.command.label}}\n" +
    "                </span>\n" +
    "            </span>\n" +
    "            <span data-internal-type=\"image-container\"\n" +
    "                  ng-if=\"cmdCtrl.command.imageTemplate\"\n" +
    "                  class=\"fa-lg\" ng-bind-html=\"cmdCtrl.command.imageTemplate\"\n" +
    "                  ng-class=\"{'{{cmdCtrl.command.type}}ToolImage' :cmdCtrl.bartype === 'Tool' && cmdCtrl.layout === 'horizontal',\n" +
    "                  'right-align-Tool-image': cmdCtrl.labelAlign === 'right' && cmdCtrl.layout === 'horizontal',\n" +
    "                  'vertical-image-template':cmdCtrl.layout === 'vertical' && (cmdCtrl.command.label.length === 0 || !cmdCtrl.command.isVerticalCommandLabelShown),\n" +
    "                  'vertical-image-template-label':cmdCtrl.layout === 'vertical' && cmdCtrl.command.label.length !== 0 && cmdCtrl.command.isVerticalCommandLabelShown}\"></span>\n" +
    "            <span ng-if=\"cmdCtrl.command.imageTemplate && cmdCtrl.layout === 'vertical' && cmdCtrl.command.label.length>0 &&  cmdCtrl.command.isVerticalCommandLabelShown\" class=\"vertical-command-label\">\n" +
    "                {{cmdCtrl.command.label}}\n" +
    "            </span>\n" +
    "            <span data-internal-type=\"text-container\" ng-if=\"(cmdCtrl.bartype=='Tool' || cmdCtrl.command.type=='MainCommand')&& cmdCtrl.layout === 'horizontal'\" class=\"{{cmdCtrl.command.type}}{{cmdCtrl.bartype}}Label\">{{cmdCtrl.command.label}}</span>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "    <div ng-switch-when=\"Menu\">\n" +
    "        <div data-internal-type=\"command-menu-command-bar\" type=\"button\" ng-class=\"{'btnMainMenu btnMenu': cmdCtrl.command.type==='MainCommand','btnMenu': cmdCtrl.command.type!=='MainCommand'}\" ng-click=\"cmdCtrl.commandClicked(cmdCtrl.command, $event)\" title=\"{{cmdCtrl.command.tooltip || cmdCtrl.command.label}}\" ng-disabled=\"cmdCtrl.command.disabled\">\n" +
    "            <span data-internal-type=\"image-container\" sit-mom-icon=\"cmdCtrl.command.displayIcon\" ng-class=\"{momIcon: cmdCtrl.command.displayIcon !== null }\" ng-if=\"cmdCtrl.layout === 'horizontal' && cmdCtrl.command.image && !cmdCtrl.command.imageTemplate\" class=\"fa {{cmdCtrl.command.image}}\"></span>\n" +
    "            <span data-internal-type=\"image-container\" sit-mom-icon=\"cmdCtrl.command.displayIcon\" ng-class=\"{momIcon: cmdCtrl.command.displayIcon !== null }\" ng-if=\"cmdCtrl.layout === 'horizontal' && cmdCtrl.command.imageTemplate\" ng-bind-html=\"cmdCtrl.command.imageTemplate\">TTTT</span>\n" +
    "            <label data-internal-type=\"text-container\" class=\"menuLabel\" onclick=\"event.preventDefault();\" ng-class=\"!cmdCtrl.command.image && cmdCtrl.labelAlign === 'right' ? 'menu-label-icon-margin' : 'menu-label-margin'\">\n" +
    "                {{cmdCtrl.command.label}}\n" +
    "                <input type=\"checkbox\" style=\"float:right\" ng-show=\"cmdCtrl.command.type === 'toggle'\" ng-click=\"cmdCtrl.commandClicked(cmdCtrl.command, $event)\" ng-checked=\"cmdCtrl.command.selected\" />\n" +
    "                <input type=\"checkbox\" style=\"float:right\" ng-show=\"cmdCtrl.command.type === 'toggle'\" ng-click=\"cmdCtrl.commandClicked(cmdCtrl.command, $event)\" ng-checked=\"cmdCtrl.command.selected\" />\n" +
    "            </label>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/commandBar/samples/command-bar-dev-tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/commandBar/samples/command-bar-dev-tpl.html",
    "<!--<div ng-controller=\"CommandBarDevController as cbDevCtrl\">\n" +
    "    <div class=\"container\" >-->\n" +
    "\n" +
    "<div ng-controller=\"CommandBarDevController as cbDevCtrl\" style=\"display:table; width:100%; border:1px solid blue;\">\n" +
    "    <div  style=\"width:auto\" ng-style=\"redStyle\">\n" +
    "        <!--<div class=\"col-md-20 col-xs-20 col-lg-20 col-sm-20\"></div>-->\n" +
    "        <div class=\"col-md-20 col-md-offset-20 col-xs-offset-20 col-lg-offset-20  col-sm-offset-20 col-xs-20 col-lg-20 col-sm-20\" ng-style=\"yellowStyle\">\n" +
    "            <sit-command-bar sit-commands=\"cbDevCtrl.commandBarData\" on-click=\"cbDevCtrl.commandBarClick(clickedCommand)\"></sit-command-bar>\n" +
    "        </div>\n" +
    "            </div>\n" +
    "    <div class=\"\">\n" +
    "        <input type=\"checkbox\" ng-model=\"useColors\" ng-change=\"changeColors()\" /> Use Colors\n" +
    "\n" +
    "    </div>\n" +
    "    <!--<div class=\"row\">\n" +
    "        TEST\n" +
    "    </div>-->\n" +
    "    <!--<br />-->\n" +
    "\n" +
    "    <div style=\"width:auto; height: 150px; overflow:auto; background:#879baa\">\n" +
    "        <strong>Notifications</strong><br />\n" +
    "        <ul>\n" +
    "            <li ng-repeat=\"event in events\">{{event}}</li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <br />\n" +
    "    <span>\n" +
    "        <button ng-click=\"cbDevCtrl.switchMode(cbDevCtrl.commandBarData)\"> Switch mode</button>\n" +
    "        <span> mode : {{cbDevCtrl.commandBarData.barType}}</span>\n" +
    "\n" +
    "\n" +
    "    </span>\n" +
    "    <br />\n" +
    "    <br />\n" +
    "    <span>\n" +
    "        <button ng-click=\"cbDevCtrl.addButton()\"> Add Button</button>\n" +
    "\n" +
    "\n" +
    "    </span>\n" +
    "    <br />\n" +
    "    <br />\n" +
    "    <span>Toggle Visibility:</span>\n" +
    "    <div ng-repeat=\"command in cbDevCtrl.commandBarData.bar\">\n" +
    "\n" +
    "        <div ng-switch=\"command.type\">\n" +
    "\n" +
    "            <div ng-switch-when=\"Command\">\n" +
    "                <button ng-click=\"command.visibility = !command.visibility\"> {{command.name}}: {{command.visibility}}</button>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-switch-when=\"Sep\">\n" +
    "                <!-- Separator button -->\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-switch-when=\"Group\">\n" +
    "                <!-- Group Button button -->\n" +
    "                <div ng-repeat=\"subcommand in command.group\">\n" +
    "\n" +
    "                    <div ng-switch=\"subcommand.type\">\n" +
    "\n" +
    "                        <div ng-switch-when=\"Command\">\n" +
    "                            <button ng-click=\"subcommand.visibility = !subcommand.visibility\">{{command.name}}/{{subcommand.name}}: {{subcommand.visibility}}</button>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div ng-switch-when=\"Sep\">\n" +
    "                            <!-- Separator button -->\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div ng-switch-default>\n" +
    "                            Unknown sub command type: Allowed values are \"Command\" or \"Sep\"\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-switch-default>\n" +
    "                Unknown sub command type: Allowed values are \"Command\", \"Group\" or \"Sep\"\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!--</div>\n" +
    "    </div>-->\n" +
    "</div>");
}]);

angular.module("common/widgets/commandBar/samples/command-bar-dev.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/commandBar/samples/command-bar-dev.html",
    "<!DOCTYPE html>\n" +
    "<html data-ng-app=\"siemens.simaticit.app\">\n" +
    "<head>\n" +
    "    <title data-ng-bind=\"title\">Command Bar Development</title>\n" +
    "    <meta charset=\"utf-8\" />\n" +
    "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge, chrome=1\" />\n" +
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no\" />\n" +
    "\n" +
    "    <link href=\"/common/styles/common-dark.css\" rel=\"stylesheet\" />\n" +
    "\n" +
    "    <style>\n" +
    "        html, body {\n" +
    "            width: '100%';\n" +
    "            height: '100%';\n" +
    "        }\n" +
    "\n" +
    "        #test-container {\n" +
    "            border: 2px solid black;\n" +
    "            padding: 4px;\n" +
    "            margin: 4px;\n" +
    "        }\n" +
    "    </style>\n" +
    "</head>\n" +
    "\n" +
    "<body ng-controller=\"CommandBarDevController as cbDevCtrl\">\n" +
    "\n" +
    "    <div class=\"container\">\n" +
    "        <div class=\"row\">\n" +
    "            <input type=\"checkbox\" ng-model=\"useColors\" ng-change=\"changeColors()\" /> Use Colors\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row\" ng-style=\"redStyle\">\n" +
    "            <div class=\"col-md-20 col-xs-20 col-lg-20 col-sm-20\"></div>\n" +
    "            <div class=\"col-md-20 col-xs-20 col-lg-20 col-sm-20\" ng-style=\"yellowStyle\">\n" +
    "                <sit-command-bar sit-commands=\"cbDevCtrl.commandBarData\" on-click=\"cbDevCtrl.commandBarClick(clickedCommand)\"></sit-command-bar>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row\">\n" +
    "            TEST\n" +
    "        </div>\n" +
    "\n" +
    "        <br />\n" +
    "\n" +
    "        <div style=\"width:100%; height: 150px; overflow:auto;\">\n" +
    "            <strong>Notifications</strong><br />\n" +
    "            <ul>\n" +
    "                <li ng-repeat=\"event in events\">{{event}}</li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <br />\n" +
    "        <span>\n" +
    "            <button ng-click=\"cbDevCtrl.switchMode(cbDevCtrl.commandBarData)\"> Switch mode</button>\n" +
    "            <span> mode : {{cbDevCtrl.commandBarData.barType}}</span>\n" +
    "\n" +
    "\n" +
    "        </span>\n" +
    "        <br />\n" +
    "        <br />\n" +
    "        <span>\n" +
    "            <button ng-click=\"cbDevCtrl.addButton()\"> Add Button</button>\n" +
    "\n" +
    "\n" +
    "        </span>\n" +
    "        <br />\n" +
    "        <br />\n" +
    "        <span>Toggle Visibility:</span>\n" +
    "        <div ng-repeat=\"command in cbDevCtrl.commandBarData.bar\">\n" +
    "\n" +
    "            <div ng-switch=\"command.type\">\n" +
    "\n" +
    "                <div ng-switch-when=\"Command\">\n" +
    "                    <button ng-click=\"command.visibility = !command.visibility\"> {{command.name}}: {{command.visibility}}</button>\n" +
    "                </div>\n" +
    "\n" +
    "                <div ng-switch-when=\"Sep\">\n" +
    "                    <!-- Separator button -->\n" +
    "                </div>\n" +
    "\n" +
    "                <div ng-switch-when=\"Group\">\n" +
    "                    <!-- Group Button button -->\n" +
    "                    <div ng-repeat=\"subcommand in command.group\">\n" +
    "\n" +
    "                        <div ng-switch=\"subcommand.type\">\n" +
    "\n" +
    "                            <div ng-switch-when=\"Command\">\n" +
    "                                <button ng-click=\"subcommand.visibility = !subcommand.visibility\">{{command.name}}/{{subcommand.name}}: {{subcommand.visibility}}</button>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div ng-switch-when=\"Sep\">\n" +
    "                                <!-- Separator button -->\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div ng-switch-default>\n" +
    "                                Unknown sub command type: Allowed values are \"Command\" or \"Sep\"\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div ng-switch-default>\n" +
    "                    Unknown sub command type: Allowed values are \"Command\", \"Group\" or \"Sep\"\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <!-- Vendor Scripts -->\n" +
    "    <script src=\"/common/scripts/jquery-2.1.1.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular/angular.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular/angular-animate.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular/angular-route.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular/angular-sanitize.js\"></script>\n" +
    "    <script src=\"/common/scripts/bootstrap.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-ui/ui-bootstrap-tpls.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-ui-router.js\"></script>\n" +
    "\n" +
    "    <!-- Bootstrapping -->\n" +
    "    <script src=\"/common/widgets/commandBar/samples/command-bar-dev-app.js\"></script>\n" +
    "\n" +
    "    <!-- Test Data -->\n" +
    "    <script src=\"/common/widgets/commandBar/samples/command-bar-test-data.js\"></script>\n" +
    "\n" +
    "    <!-- command bar Widget scripts -->\n" +
    "    <script src=\"/common/widgets/commandBar/sit-command-bar-mod.js\"></script>\n" +
    "    <script src=\"/common/widgets/commandBar/sit-command-bar-dir.js\"></script>\n" +
    "    <script src=\"/common/widgets/commandBar/sit-command-dir.js\"></script>\n" +
    "    <script src=\"/common/widgets/commandBar/sit-command-group-dir.js\"></script>\n" +
    "\n" +
    "</body>\n" +
    "\n" +
    "</html>");
}]);

angular.module("common/widgets/commandBar/samples/commandbar-dev-view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/commandBar/samples/commandbar-dev-view.html",
    "<div  \n" +
    "     style=\"margin-left:50px; text-align: left;  vertical-align: top; \">\n" +
    "    <ng-include src=\"'/app/common/widgets/commandBar/docs/command-bar-dev-tpl.html'\" />\n" +
    "</div>");
}]);

angular.module("common/widgets/commandBar/search.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/commandBar/search.html",
    "<div ng-transclude class=\"command-hide\"></div>\n" +
    "<div data-internal-type=\"quick-search-container\" class=\"contextual-search-container\">\n" +
    "\n" +
    "    <input data-internal-type=\"quickSearchTextBox\" type=\"text\" ng-change=\"searchCtrl.changeSearch(searchCtrl.quickSearchText)\"\n" +
    "           placeholder=\"{{searchCtrl.placeholder}}\" class=\"form-control contextual-quick-search\" ng-model=\"searchCtrl.quickSearchText\"\n" +
    "           ng-focus=\"searchCtrl.focusSearch()\" ng-blur=\"searchCtrl.blurSearch()\" />\n" +
    "    <em id=\"ContextualSearchIcon\" data-internal-type=\"quickSearchIcon\" ng-class=\"{momIcon: searchCtrl.svgIcons.search }\" sit-class=\"svg-icon\"\n" +
    "        sit-mom-icon=\"searchCtrl.svgIcons.search\"\n" +
    "        class=\"fa fa-search contextual-search-icon\" ng-click=\"searchCtrl.clickSearch(searchCtrl.quickSearchText)\"></em>\n" +
    "    <em id=\"ContextualSearchIcon\" data-internal-type=\"quickSearchIcon\" ng-if=\"searchCtrl.quickSearchText.length > 0\" ng-class=\"{momIcon: searchCtrl.svgIcons.close }\" sit-class=\"svg-icon\"\n" +
    "        sit-mom-icon=\"searchCtrl.svgIcons.close\"\n" +
    "        class=\"fa fa-close contextual-close-icon\" ng-click=\"searchCtrl.quickSearchText ='';searchCtrl.clickSearch('');\"></em>\n" +
    "\n" +
    "    \n" +
    "</div>");
}]);

angular.module("common/widgets/component/samples/swac/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/component/samples/swac/index.html",
    "<!DOCTYPE html>\n" +
    "<html xmlns=\"http://www.w3.org/1999/xhtml\">\n" +
    "<head>\n" +
    "    <title>SWAC Chat Messenger</title>\n" +
    "           \n" +
    "    <script src=\"../../../../scripts/jquery-2.1.1.min.js\"></script>\n" +
    "    \n" +
    "    <script src=\"../../../../scripts/angular/angular.min.js\"></script>    \n" +
    "    <script src=\"../../../../scripts/swac/swac-base.js\"></script>    \n" +
    "    <script src=\"../../../../scripts/swac/swac-boot.js\"></script>\n" +
    "\n" +
    "    <script src=\"swac-dev-app.js\"></script>\n" +
    "    <script src=\"Directives/swac-dev-scroll-down-directive.js\"></script>\n" +
    "    <script src=\"Services/swac-dev-swac-component-service.js\"></script>\n" +
    "    <script src=\"Services/swac-dev-chat-messenger-service.js\"></script>\n" +
    "    <script src=\"Controllers/swac-dev-chat-messenger-controller.js\"></script>\n" +
    "\n" +
    "</head>\n" +
    "<body style=\"background-color: lightgray\">\n" +
    "    <div id=\"appDivContainer\" ng-app=\"chatApp\" ng-controller=\"chatMessengerCtrl\">\n" +
    "            <div>\n" +
    "                Messenger Name:\n" +
    "                <input type=\"text\" ng-model=\"messengerName\" placeholder=\"Enter Name\"/>\n" +
    "            </div>\n" +
    "            <div scroll-down style=\"overflow:auto; height:300px; width:400px;background-color:white; border:1px solid; line-height:25px;\">\n" +
    "                <div ng-repeat=\"chat in chatRecieved\">\n" +
    "                    {{chat.sender}}: {{chat.message}}\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                Message: <input type=\"text\" ng-model=\"chatToSend\" ng-keypress=\"onKeyPress($event)\" size=\"32\" />\n" +
    "                <button ng-click=\"sendChat()\">Send</button>\n" +
    "            </div>\n" +
    "    </div>\n" +
    "</body>\n" +
    "</html>\n" +
    "");
}]);

angular.module("common/widgets/component/samples/test.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/component/samples/test.html",
    "<!DOCTYPE html>\n" +
    "<html xmlns=\"http://www.w3.org/1999/xhtml\">\n" +
    "<head>\n" +
    "    <title>Mashup Runtime</title>\n" +
    "    <script src=\"../../../scripts/jquery-2.1.1.js\"></script>\n" +
    "    <script src=\"../../../scripts/angular/angular.min.js\"></script>\n" +
    "    <script src=\"../../../scripts/swac/swac-base.js\"></script>\n" +
    "    <script src=\"../../../scripts/swac/swac-container.js\"></script>\n" +
    "\n" +
    "    <script src=\"app.js\"></script>\n" +
    "    <script src=\"../uy-swac-module.js\"></script>\n" +
    "    <script src=\"../sit-container-dir.js\"></script>\n" +
    "    <script src=\"../uy-element-directive.js\"></script>\n" +
    "    <script src=\"../sit-wire-dir.js\"></script>\n" +
    "    <script src=\"../../../services/swac/sit-swac-component-svc.js\"></script>\n" +
    "    <script src=\"../../../services/swac/sit-swac-container-svc.js\"></script>\n" +
    "    <script src=\"../../../services/swac/sit-ui-component-svc.js\"></script>\n" +
    "    <script src=\"ui/scroll-down.js\"></script>\n" +
    "    <script src=\"ui/chatMessenger.js\"></script>\n" +
    "    <script src=\"ui/chatMessengerCtrl.js\"></script>\n" +
    "    <script src=\"mashupWireController.js\"></script>\n" +
    "</head>\n" +
    "<body>\n" +
    "    <div ng-app=\"myApp\" style=\"position:relative;width:100%;height:900px;\">\n" +
    "        <uy-container create=\"20000\" internal=\"20000\" functions=\"20000\" events=\"20000\" ng-controller=\"mashupWireController as mashup\" isswac=\"true\">\n" +
    "            <uy-element name=\"SWAC_Messenger1\" type=\"swac\" source=\"swac/index.html\" left=\"0\" top=\"1\" width=\"3\" height=\"6\" flavor=\"ui\"></uy-element>\n" +
    "            <uy-element name=\"messenger2\" type=\"ui\" source=\"chat-messenger\" componenttype=\"ui\" left=\"4\" top=\"3\" width=\"3\" height=\"6\" flavor=\"ui\"></uy-element>\n" +
    "            <uy-element name=\"messenger3\" type=\"ui\" source=\"chat-messenger\" componenttype=\"ui\" left=\"8\" top=\"2\" width=\"3\" height=\"6\" flavor=\"ui\"></uy-element>\n" +
    "\n" +
    "            <uy-wire name=\"wire1\" inputcomponents=\"messenger3\" inputevents=\"newMessageTyped\" outputcomponents=\"messenger2\" outputapis=\"getChatMessage\" converters=\"mashup.Wire1Converters\" inputtypes=\"ui\" outputtypes=\"ui\"></uy-wire>\n" +
    "            <uy-wire name=\"wire3\" inputcomponents=\"SWAC_Messenger1\" inputevents=\"newMessageTyped\" outputcomponents=\"messenger2,messenger3\" outputapis=\"getChatMessage,getChatMessage\" converters=\"mashup.Wire3Converters\" inputtypes=\"swac\" outputtypes=\"ui,ui\"></uy-wire>\n" +
    "        </uy-container>\n" +
    "    </div>\n" +
    "</body>\n" +
    "</html>\n" +
    "");
}]);

angular.module("common/widgets/component/samples/ui/chatMessenger.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/component/samples/ui/chatMessenger.html",
    "<div>\n" +
    "    Messenger Name:\n" +
    "    <input type=\"text\" ng-model=\"messengerName\" placeholder=\"Enter Name\"/>\n" +
    "</div>\n" +
    "<div scroll-down style=\"overflow:auto; height:300px; width:400px;background-color:white; border:1px solid; line-height:25px;\">\n" +
    "    <div ng-repeat=\"chat in chatRecieved\">\n" +
    "        {{chat.sender}}: {{chat.message}}\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div>\n" +
    "    Message: <input type=\"text\" ng-model=\"chatToSend\" ng-keypress=\"onKeyPress($event)\" size=\"32\" />\n" +
    "    <button ng-click=\"sendChat()\">Send</button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/datePicker/date-picker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/datePicker/date-picker.html",
    "<div class=\"property-grid-input-group\">\n" +
    "    <div ng-if=\"datepickerCtrl.readOnly || datepickerCtrl.ngReadonly\" class=\"label-property-grid-control-readonly property-value-ellipsis\"> {{datepickerCtrl.value | date: 'shortDate'}} </div>\n" +
    "</div>\n" +
    "\n" +
    "<ng-form ng-if=\"!(datepickerCtrl.readOnly || datepickerCtrl.ngReadonly)\" \n" +
    "         name='datepickerForm' \n" +
    "         ng-class=\"{'isrequired' : (datepickerCtrl.validation.required) && (datepickerCtrl.value===undefined) }\">\n" +
    "    <div class=\"property-grid-input-group\" style=\"border:0;\">\n" +
    "        <input type=\"text\"\n" +
    "               class=\"property-grid-control validator-control\"\n" +
    "               ng-click=\"datepickerCtrl.open($event)\"\n" +
    "               ng-class=\"{'validator-control-invalid':((datepickerForm.$invalid && datepickerForm.$dirty) || (datepickerForm.$invalid && datepickerForm.$visited)),\n" +
    "               'validator-control':!((datepickerForm.$invalid && datepickerForm.$dirty) || (datepickerForm.$invalid && datepickerForm.$visited)),\n" +
    "               'ng-dirty':datepickerForm.$dirty}\"\n" +
    "               uib-datepicker-popup=\"{{datepickerCtrl.format}}\"\n" +
    "               ng-model=\"datepickerCtrl.value\"\n" +
    "               is-open=\"datepickerCtrl.opened\"\n" +
    "               close-text=\"{{'dateTimePicker.close' | translate}}\"\n" +
    "               clear-text=\"{{'dateTimePicker.clear' | translate}}\"\n" +
    "               current-text=\"{{'dateTimePicker.today' | translate}}\"\n" +
    "               datepicker-options=\"datepickerCtrl.dateOptions\"\n" +
    "               ng-required=\"datepickerCtrl.validation.required\"\n" +
    "               show-button-bar=\"datepickerCtrl.showButtonBar\"\n" +
    "               style=\"cursor:pointer;\"\n" +
    "               datepicker-append-to-body=\"datepickerCtrl.appendToBody\"\n" +
    "               ng-blur=\"datepickerCtrl.ngBlur()\"\n" +
    "               sit-change=\"datepickerCtrl.sitChange\"\n" +
    "               ng-disabled=\"datepickerCtrl.ngDisabled\"\n" +
    "               ng-focus=\"datepickerCtrl.ngFocus()\"\n" +
    "               sit-form-input-validator readonly=\"readonly\" />\n" +
    "        <div class=\"btn property-grid-addon-icon\" ng-click=\"datepickerCtrl.open($event)\" ng-disabled=\"datepickerCtrl.ngDisabled\">\n" +
    "            <em class=\"fa fa-calendar\" ng-disabled=\"datepickerCtrl.ngDisabled\"></em>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</ng-form>\n" +
    "");
}]);

angular.module("common/widgets/dateTimePicker/date-time-picker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/dateTimePicker/date-time-picker.html",
    "<div class=\"property-grid-input-group\">\n" +
    "    <div class=\"label label-property-grid-control-readonly property-value-ellipsis\" ng-if=\"dateTimePickerCtrl.readOnly || dateTimePickerCtrl.ngReadonly\">\n" +
    "        {{dateTimePickerCtrl.value | date: 'medium'}}\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<ng-form name='dateTimePickerForm' class=\"sit-date-time-picker\" ng-if=\"!(dateTimePickerCtrl.readOnly || dateTimePickerCtrl.ngReadonly)\"\n" +
    "         ng-class=\"{'isrequired' : (dateTimePickerCtrl.validation.required) && (dateTimePickerCtrl.value===undefined)}\">\n" +
    "    <div class=\"property-grid-input-group\">\n" +
    "        <div class=\"property-grid-input-group\">\n" +
    "            <input type=\"text\"\n" +
    "                   class=\"property-grid-control validator-control date-time-input-hover\"\n" +
    "                   ng-model=\"dateTimePickerCtrl.value\"\n" +
    "                   uib-datepicker-popup=\"{{dateTimePickerCtrl.format}}\"\n" +
    "                   ng-class=\"{'validator-control-invalid':((dateTimePickerForm.$invalid && dateTimePickerForm.$dirty) || (dateTimePickerForm.$invalid && dateTimePickerForm.$visited)),\n" +
    "               'validator-control':!((dateTimePickerForm.$invalid && dateTimePickerForm.$dirty) || (dateTimePickerForm.$invalid && dateTimePickerForm.$visited)),\n" +
    "               'ng-dirty':dateTimePickerForm.$dirty}\"\n" +
    "                   ng-click=\"dateTimePickerCtrl.clicked()\"\n" +
    "                   ng-keydown=\"dateTimePickerCtrl.keydownPressed($event)\"\n" +
    "                   ng-disabled=\"dateTimePickerCtrl.ngDisabled\"\n" +
    "                   ng-required=\"dateTimePickerCtrl.validation.required\"\n" +
    "                   sit-change=\"dateTimePickerCtrl.sitChange\"\n" +
    "                   sit-form-input-validator\n" +
    "                   readonly=\"readonly\" />\n" +
    "            <div class=\"btn property-grid-addon-icon\" ng-click=\"dateTimePickerCtrl.ngDisabled || dateTimePickerCtrl.clicked()\" ng-disabled=\"dateTimePickerCtrl.ngDisabled\">\n" +
    "                <em class=\"date-time-picker-calendar-icon\" sit-mom-icon=\"{path: 'common/icons/cmdCalendar16.svg'}\"></em>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"dropdown-menu\" ng-style=\"{display: (dateTimePickerCtrl.isOpen && 'block') || 'none'}\">\n" +
    "\n" +
    "            <div class=\"datetime-panel-group\" >\n" +
    "                <div class=\"panel\">\n" +
    "                    <div class=\"datetime-accordion-button\"  ng-click=\"dateTimePickerCtrl.disableAccordion('date')\" ng-class=\"dateTimePickerCtrl.isDateShown ? 'date-time-selected-background' : 'date-time-default-background'\">\n" +
    "                        <span sit-mom-icon=\"{path: 'common/icons/miscRightArrow16.svg'}\" sit-class=\"rotate-right-arrow-icon\" ng-show=\"dateTimePickerCtrl.isDateShown\"></span>\n" +
    "                        <span sit-mom-icon=\"{path: 'common/icons/miscRightArrow16.svg'}\" sit-class=\"right-arrow-icon\" ng-show=\"!dateTimePickerCtrl.isDateShown\"></span>\n" +
    "                        <span class=\"datetime-accordion-label\">Date: {{dateTimePickerCtrl.datevalue}}</span>\n" +
    "                        <span class=\"date-time-current-icon\" sit-class=\"today-icon\" sit-mom-icon=\"{path: 'common/icons/cmdCalendar16.svg'}\" ng-click=\"dateTimePickerCtrl.today('date')\" title=\"Set Date as Today\"></span>\n" +
    "                    </div>\n" +
    "                    <div id=\"datepicker\" ng-if=\"dateTimePickerCtrl.isDateShown\">\n" +
    "                        <div uib-datepicker ng-model=\"dateTimePickerCtrl.value\" datepicker-options=\"dateTimePickerCtrl.dateOptions\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"panel timepicker-bottom\">\n" +
    "                    <div class=\"datetime-accordion-button\" ng-click=\"dateTimePickerCtrl.disableAccordion('time')\" ng-class=\"!dateTimePickerCtrl.isDateShown ? 'date-time-selected-background' : 'date-time-default-background'\">\n" +
    "                        <span sit-mom-icon=\"{path: 'common/icons/miscRightArrow16.svg'}\" sit-class=\"right-arrow-icon\" ng-show=\"dateTimePickerCtrl.isDateShown\"></span>\n" +
    "                        <span sit-mom-icon=\"{path: 'common/icons/miscRightArrow16.svg'}\" sit-class=\"rotate-right-arrow-icon\" ng-show=\"!dateTimePickerCtrl.isDateShown\"></span>\n" +
    "                        <span class=\"datetime-accordion-label\">Time: {{dateTimePickerCtrl.timevalue}}</span>\n" +
    "                        <span class=\"date-time-current-icon\" sit-class=\"now-icon\" sit-mom-icon=\"{path: 'common/icons/cmdTime24.svg'}\" ng-click=\"dateTimePickerCtrl.today('time')\" title=\"Set Time as Now\"></span>\n" +
    "                    </div>\n" +
    "                    <div id=\"timepicker\" ng-if=\"!dateTimePickerCtrl.isDateShown\">\n" +
    "                        <div uib-timepicker ng-model=\"dateTimePickerCtrl.value\" show-seconds=\"dateTimePickerCtrl.showSeconds\" show-meridian=\"dateTimePickerCtrl.showMeridian\" class=\"time-picker-centered\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <button type=\"button\" class=\"btn btn-primary btn-sm pull-right\" ng-click=\"dateTimePickerCtrl.close()\">{{dateTimePickerCtrl.okLabel}}</button>\n" +
    "            <button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"dateTimePickerCtrl.clear()\">{{dateTimePickerCtrl.clearLabel}}</button>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</ng-form>\n" +
    "");
}]);

angular.module("common/widgets/dialog/dialog.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/dialog/dialog.html",
    "<div class=\"sit-dialog\">\n" +
    "        <div class=\"modal dialog-modal\" id={{Dialog.modalid}} tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" data-backdrop=\"static\">\n" +
    "            <!--[Fix]Bug - 8894. The duplicate template code is the fix for slow dialog rendering in IE.-->\n" +
    "            <div class=\"modal-dialog dialog-dialog dialog-dialog-centered\" ng-if=\"Dialog.positioning == 'centered'\">\n" +
    "                <div data-internal-type=\"input-dialog-border\" class=\"dialog-dialogborder\">\n" +
    "                    <div data-internal-type=\"input-dialog-content\" class=\"dialog-content\">\n" +
    "\n" +
    "                        <div data-internal-type=\"input-dialog-header\" class=\"dialog-header\">\n" +
    "                            <div class=\"dialog-header-text\">{{Dialog.dialogTitle}}</div>\n" +
    "                            <div class=\"dialog-close-btn\" ng-if=\"Dialog.isCloseButtonShown\" ng-click=\"Dialog.closeDialog()\" title=\"{{Dialog.closeButtonTooltip}}\">\n" +
    "                                <span class=\"dialog-button\" style=\"display:none\" sit-class=\"dialog-button\" sit-mom-icon=\"Dialog.closeIcon\" aria-hidden=\"true\"></span>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div data-internal-type=\"input-dialog-body\" class=\"dialog-body\">\n" +
    "                            <div class=\"row\">\n" +
    "                                <div class=\"dialog-body-overflow\">\n" +
    "                                    <ng-include id=\"{{Dialog.modalid}}-includeTemplate\" ng-if=\"Dialog.dialogTemplate\" src=\"Dialog.dialogTemplate\"> </ng-include>\n" +
    "                                    <div ng-if=\"!Dialog.dialogTemplate\">\n" +
    "                                        <div class=\"dialog-information-{{Dialog.templatedata.layout}}\" ng-if=\"Dialog.templatedata.information\">\n" +
    "                                            <div ng-bind-html=\"Dialog.templatedata.information\"></div>\n" +
    "                                        </div>\n" +
    "                                        <div>\n" +
    "                                            <sit-property-grid sit-id=\"{{Dialog.modalid}}_dialog_property_grid\"\n" +
    "                                                               sit-data=\"Dialog.templatedata.data\"\n" +
    "                                                               sit-layout=\"{{Dialog.templatedata.layout}}\"\n" +
    "                                                               sit-type=\"Fixed\"\n" +
    "                                                               sit-mode=\"{{Dialog.templatedata.mode ? Dialog.templatedata.mode : 'edit'}}\"\n" +
    "                                                               sit-columns=\"1\">\n" +
    "                                            </sit-property-grid>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div class=\"dialog-alert-container-{{Dialog.templatedata.layout}}\" ng-hide=\"Dialog.isValid.value\">\n" +
    "                                    <div class=\"alert alert-warning dialog-alert\">\n" +
    "                                        <em class=\"fa fa-warning \"></em>\n" +
    "                                        <span class=\"alert-title\">{{'dialog.validator.warningTitle'|translate}} </span>\n" +
    "                                        {{'dialog.validator.warningMessage'|translate}}\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div data-internal-type=\"input-dialog-footer\" class=\"dialog-footer\">\n" +
    "                            <div class=\"dialog-div-button\" ng-if=\"button.displayName\" ng-repeat=\"button in Dialog.buttons.slice().reverse()\" ng-class=\"{'last-dialog-button':($last && Dialog.buttons.length)}\">\n" +
    "                                <sit-dialog-button sit-button=\"button\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div><!-- /.modal-content -->\n" +
    "                </div><!-- /.modal-dialog -->\n" +
    "            </div>\n" +
    "            <div class=\"modal-dialog dialog-dialog dialog-dialog-notcentered\" ng-if=\"Dialog.positioning == 'notcentered'\">\n" +
    "                <div data-internal-type=\"input-dialog-border\" class=\"dialog-dialogborder\">\n" +
    "                    <div data-internal-type=\"input-dialog-content\" class=\"dialog-content\">\n" +
    "                        <div data-internal-type=\"input-dialog-header\" class=\"dialog-header\">\n" +
    "                            <div class=\"dialog-header-text\">{{Dialog.dialogTitle}}</div>\n" +
    "                            <div class=\"dialog-close-btn\" ng-if=\"Dialog.isCloseButtonShown\" ng-click=\"Dialog.closeDialog()\" title=\"{{Dialog.closeButtonTooltip}}\">\n" +
    "                                <span class=\"dialog-button\" style=\"display:none\" sit-class=\"dialog-button\" sit-mom-icon=\"Dialog.closeIcon\" aria-hidden=\"true\"></span>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div data-internal-type=\"input-dialog-body\" class=\"dialog-body\">\n" +
    "                            <div class=\"row\">\n" +
    "                                <div class=\"dialog-body-overflow\">\n" +
    "                                    <ng-include id=\"{{Dialog.modalid}}-includeTemplate\" ng-if=\"Dialog.dialogTemplate\" src=\"Dialog.dialogTemplate\"> </ng-include>\n" +
    "                                    <div ng-if=\"!Dialog.dialogTemplate\">\n" +
    "                                        <div class=\"dialog-information-{{Dialog.templatedata.layout}}\" ng-if=\"Dialog.templatedata.information\">\n" +
    "                                            <div ng-bind-html=\"Dialog.templatedata.information\"></div>\n" +
    "                                        </div>\n" +
    "                                        <div>\n" +
    "                                            <sit-property-grid sit-id=\"{{Dialog.modalid}}_dialog_property_grid\"\n" +
    "                                                               sit-data=\"Dialog.templatedata.data\"\n" +
    "                                                               sit-layout=\"{{Dialog.templatedata.layout}}\"\n" +
    "                                                               sit-type=\"Fixed\"\n" +
    "                                                               sit-mode=\"{{Dialog.templatedata.mode ? Dialog.templatedata.mode : 'edit'}}\"\n" +
    "                                                               sit-columns=\"1\">\n" +
    "                                            </sit-property-grid>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div class=\"dialog-alert-container-{{Dialog.templatedata.layout}}\" ng-hide=\"Dialog.isValid.value\">\n" +
    "                                    <div class=\"alert alert-warning dialog-alert\">\n" +
    "                                        <em class=\"fa fa-warning \"></em>\n" +
    "                                        <span class=\"alert-title\">{{'dialog.validator.warningTitle'|translate}} </span>\n" +
    "                                        {{'dialog.validator.warningMessage'|translate}}\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div data-internal-type=\"input-dialog-footer\" class=\"dialog-footer\">\n" +
    "                            <div class=\"dialog-div-button\" ng-if=\"button.displayName\" ng-repeat=\"button in Dialog.buttons.slice().reverse()\" ng-class=\"{'last-dialog-button':($last && Dialog.buttons.length)}\">\n" +
    "                                <sit-dialog-button sit-button=\"button\" />\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div><!-- /.modal-content -->\n" +
    "                </div><!-- /.modal-dialog -->\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "");
}]);

angular.module("common/widgets/dialog/samples/dialog-dev-popup1-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/dialog/samples/dialog-dev-popup1-template.html",
    "<div class=\"row\" style=\"width:500px\">\n" +
    "   \n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div id=\"test-container\">\n" +
    "            <sit-property-grid sit-id=\"MyID\"\n" +
    "                               sit-data=\"templatedata\"\n" +
    "                               sit-layout=\"'Vertical'\"\n" +
    "                               sit-mode=\"edit\"></sit-property-grid>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/dialog/samples/dialog-dev-popup2-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/dialog/samples/dialog-dev-popup2-template.html",
    "<div class=\"row\" style=\"width:auto\">\n" +
    "\n" +
    "\n" +
    "    <div class=\"row\">\n" +
    "        <div id=\"test-container\">\n" +
    "\n" +
    "            <sit-property-grid sit-id=\"dialogPopup2\"\n" +
    "                               sit-data=\"Dialog.templatedata\"\n" +
    "                               sit-layout=\"'Horizontal'\"\n" +
    "                               sit-type=\"'Fixed'\"\n" +
    "                               sit-mode=\"edit\"\n" +
    "                               sit-columns=\"'1'\">\n" +
    "\n" +
    "            </sit-property-grid>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/dialog/samples/dialog-dev-tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/dialog/samples/dialog-dev-tpl.html",
    "<div ng-controller=\"DialogDevController as dDevCtrl\">\n" +
    "\n" +
    "    <div class=\"container\">\n" +
    "        <div>\n" +
    "            Vertical : <input type=\"checkbox\" ng-model=\"dialoglayout\" ng-init=\"dialoglayout=true\" />\n" +
    "            \n" +
    "        </div>\n" +
    "        <div class=\"row\"></div>\n" +
    "        <button id=\"buttonTest\" class=\"btn btn-primary btn-lg\" ng-click=\"dDevCtrl.showPopup1()\" >\n" +
    "            Launch modal 1\n" +
    "        </button>\n" +
    "        <div class=\"row\"></div>\n" +
    "        <div class=\"row\"></div>\n" +
    "        <button id=\"buttonTestCenter\" class=\"btn btn-primary btn-lg\" ng-click=\"dDevCtrl.showPopup1Center()\" >\n" +
    "            Launch modal 1 centered\n" +
    "        </button>\n" +
    "        <button id=\"buttonTest2\" class=\"btn btn-primary btn-lg\" ng-click=\"dDevCtrl.showPopup2()\" >\n" +
    "            Launch modal 2\n" +
    "        </button>\n" +
    "        <div class=\"row\"></div>\n" +
    "        <div class=\"row\"></div>\n" +
    "        <button id=\"buttonTestCenter2\" class=\"btn btn-primary btn-lg\" ng-click=\"dDevCtrl.showPopup2Center()\" >\n" +
    "            Launch modal 2 centered\n" +
    "        </button>\n" +
    "        <div class=\"row\"></div>\n" +
    "        <div class=\"row\"></div>\n" +
    "        <sit-dialog sit-title=\"dDevCtrl.dialogVerticalDataTitle\"\n" +
    "                    sit-templatedata='dDevCtrl.dialogVerticalData'\n" +
    "                    sit-modalid=\"popup1\"\n" +
    "                    sit-buttons='dDevCtrl.buttonsList'>\n" +
    "\n" +
    "        </sit-dialog>\n" +
    "        <sit-dialog sit-title=\"dDevCtrl.dialogHorizontalDataTitle\"\n" +
    "                    sit-templatedata='dDevCtrl.dialogHorizontalData'\n" +
    "                    sit-modalid=\"popup3\"\n" +
    "                    sit-buttons='dDevCtrl.buttonsList'>\n" +
    "\n" +
    "        </sit-dialog>\n" +
    "        <sit-dialog sit-title=\"dDevCtrl.dialogDataTitle\"\n" +
    "                    sit-templatedata='dDevCtrl.dialogData'\n" +
    "                    sit-templateuri=\"dDevCtrl.dialogDataTemplateUri\"\n" +
    "                    sit-modalid=\"popup2\"\n" +
    "                    sit-buttons='dDevCtrl.buttonsList'>\n" +
    "\n" +
    "        </sit-dialog>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/dialog/samples/dialog-dev.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/dialog/samples/dialog-dev.html",
    "<!DOCTYPE html>\n" +
    "<html data-ng-app=\"siemens.simaticit.app\">\n" +
    "<head>\n" +
    "    <title data-ng-bind=\"title\">Dialog popup Development</title>\n" +
    "    <meta charset=\"utf-8\" />\n" +
    "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge, chrome=1\" />\n" +
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no\" />\n" +
    "\n" +
    "    <link href=\"/common/styles/common-dark.css\" rel=\"stylesheet\" />\n" +
    "\n" +
    "    <style>\n" +
    "        html, body {\n" +
    "            width: '100%';\n" +
    "            height: '100%';\n" +
    "        }\n" +
    "    </style>\n" +
    "</head>\n" +
    "\n" +
    "<body ng-controller=\"DialogDevController as dDevCtrl\">\n" +
    "\n" +
    "    <div class=\"container\">\n" +
    "        <div>\n" +
    "            Vertical : <input type=\"checkbox\" ng-model=\"dialoglayout\" ng-init=\"dialoglayout=true\" />\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"row\"></div>\n" +
    "        <button id=\"buttonTest\" class=\"btn btn-primary btn-lg\" ng-click=\"dDevCtrl.showPopup1()\">\n" +
    "            Launch modal 1\n" +
    "        </button>\n" +
    "        <div class=\"row\"></div>\n" +
    "        <div class=\"row\"></div>\n" +
    "        <button id=\"buttonTestCenter\" class=\"btn btn-primary btn-lg\" ng-click=\"dDevCtrl.showPopup1Center()\">\n" +
    "            Launch modal 1 centered\n" +
    "        </button>\n" +
    "        <button id=\"buttonTest2\" class=\"btn btn-primary btn-lg\" ng-click=\"dDevCtrl.showPopup2()\">\n" +
    "            Launch modal 2\n" +
    "        </button>\n" +
    "        <div class=\"row\"></div>\n" +
    "        <div class=\"row\"></div>\n" +
    "        <button id=\"buttonTestCenter2\" class=\"btn btn-primary btn-lg\" ng-click=\"dDevCtrl.showPopup2Center()\">\n" +
    "            Launch modal 2 centered\n" +
    "        </button>\n" +
    "        <div class=\"row\"></div>\n" +
    "        <div class=\"row\"></div>\n" +
    "        <sit-dialog sit-title=\"dDevCtrl.dialogVerticalDataTitle\"\n" +
    "                    sit-templatedata='dDevCtrl.dialogVerticalData'\n" +
    "                    sit-modalid=\"popup1\"\n" +
    "                    sit-buttons='dDevCtrl.buttonsList'>\n" +
    "\n" +
    "        </sit-dialog>\n" +
    "        <sit-dialog sit-title=\"dDevCtrl.dialogHorizontalDataTitle\"\n" +
    "                    sit-templatedata='dDevCtrl.dialogHorizontalData'\n" +
    "                    sit-modalid=\"popup3\"\n" +
    "                    sit-buttons='dDevCtrl.buttonsList'>\n" +
    "\n" +
    "        </sit-dialog>\n" +
    "        <sit-dialog sit-title=\"dDevCtrl.dialogDataTitle\"\n" +
    "                    sit-templatedata='dDevCtrl.dialogData'\n" +
    "                    sit-templateuri=\"dialog-dev-popup2-template.html\"\n" +
    "                    sit-modalid=\"popup2\"\n" +
    "                    sit-buttons='dDevCtrl.buttonsList'>\n" +
    "\n" +
    "        </sit-dialog>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Vendor Scripts -->\n" +
    "    <script src=\"/common/scripts/jquery-2.1.1.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular/angular.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular/angular-animate.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular/angular-route.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular/angular-sanitize.js\"></script>\n" +
    "    <script src=\"/common/scripts/bootstrap.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-ui/ui-bootstrap-tpls.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-ui-router.js\"></script>\n" +
    "\n" +
    "\n" +
    "    <script src=\"/common/scripts/angular-translate/translate.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-translate/service/default-interpolation.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-translate/service/handler-log.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-translate/service/loader-static-files.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-translate/service/loader-partial.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-translate/service/storage-key.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-translate/service/storage-local.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-translate/service/storage-cookie.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-translate/service/translate.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-translate/directive/translate-cloak.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-translate/directive/translate.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-translate/filter/translate.js\"></script>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <!-- Property Grid Widget scripts -->\n" +
    "    <script src=\"/common/widgets/propertyGrid/sit-property-grid-module.js\"></script>\n" +
    "    <script src=\"/common/widgets/propertyGrid/sit-property-grid-service.js\"></script>\n" +
    "    <script src=\"/common/widgets/propertyGrid/sit-property-grid-directive.js\"></script>\n" +
    "    <script src=\"/common/widgets/propertyGrid/sit-property-grid-fixed-directive.js\"></script>\n" +
    "    <script src=\"/common/widgets/propertyGrid/sit-property-grid-fluid-directive.js\"></script>\n" +
    "    <script src=\"/common/widgets/propertyGrid/sit-property-grid-vertical-directive.js\"></script>\n" +
    "\n" +
    "\n" +
    "    <!-- dialog button Widget scripts -->\n" +
    "    <script src=\"/common/widgets/dialogButton/sit-dialog-button-mod.js\"></script>\n" +
    "    <script src=\"/common/widgets/dialogButton/sit-dialog-button-dir.js\"></script>\n" +
    "\n" +
    "    <!-- Bootstrapping -->\n" +
    "    <script src=\"/common/widgets/dialog/samples/dialog-dev-app.js\"></script>\n" +
    "\n" +
    "    <!-- Test Data -->\n" +
    "    <script src=\"/common/widgets/dialog/samples/dialog-test-data.js\"></script>\n" +
    "\n" +
    "    <!-- Dialog Widget scripts -->\n" +
    "    <script src=\"/common/widgets/dialog/sit-dialog-mod.js\"></script>\n" +
    "    <script src=\"/common/widgets/dialog/sit-dialog-svc.js\"></script>\n" +
    "    <script src=\"/common/widgets/dialog/sit-dialog-dir.js\"></script>\n" +
    "\n" +
    "</body>\n" +
    "\n" +
    "</html>");
}]);

angular.module("common/widgets/dialogButton/dialogButton.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/dialogButton/dialogButton.html",
    "<button id={{dialogButtonCtrl.button.id}} class=\"btn btn-default pl-button-dialog\" ng-click=\"dialogButtonCtrl.button.onClickCallback()\" ng-disabled=\"dialogButtonCtrl.button.disabled\">\n" +
    "    {{dialogButtonCtrl.button.displayName}}\n" +
    "</button>\n" +
    "");
}]);

angular.module("common/widgets/dialogButton/samples/dialog-button-dev.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/dialogButton/samples/dialog-button-dev.html",
    "<!DOCTYPE html>\n" +
    "<html data-ng-app=\"app\">\n" +
    "<head>\n" +
    "    <title data-ng-bind=\"title\">Dialog Button Development</title>\n" +
    "    <meta charset=\"utf-8\" />\n" +
    "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge, chrome=1\" />\n" +
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no\" />\n" +
    "\n" +
    "\n" +
    "    <link href=\"/common/styles/common-dark.css\" rel=\"stylesheet\" />\n" +
    "\n" +
    "    <style>\n" +
    "        html, body {\n" +
    "            overflow: auto !important;\n" +
    "        }\n" +
    "    </style>\n" +
    "</head>\n" +
    "\n" +
    "<body ng-controller=\"dialogButtonDevController\">\n" +
    "\n" +
    "    <!-- UI-ROUTER EXAMPLE -->\n" +
    "    <div>\n" +
    "        <p>Test Dialog Button 2</p>\n" +
    "        <sit-dialog-button sit-button=\"myButton\" />\n" +
    "\n" +
    "    </div>\n" +
    "    <!-- END UI-ROUTER EXAMPLE -->\n" +
    "    <!-- Vendor Scripts -->\n" +
    "    <script src=\"/scripts/jquery-2.1.1.js\"></script>\n" +
    "    <script src=\"/scripts/angular/angular.js\"></script>\n" +
    "    <script src=\"/scripts/angular/angular-animate.js\"></script>\n" +
    "    <script src=\"/scripts/angular/angular-route.js\"></script>\n" +
    "    <script src=\"/scripts/angular/angular-sanitize.js\"></script>\n" +
    "    <script src=\"/scripts/bootstrap.js\"></script>\n" +
    "    <script src=\"/scripts/angular-ui/ui-bootstrap-tpls.js\"></script>\n" +
    "    <script src=\"/scripts/angular-ui-router.js\"></script>\n" +
    "\n" +
    "    <!-- Bootstrapping -->\n" +
    "    <script src=\"dialog-button-dev-app.js\"></script>\n" +
    "\n" +
    "    <!-- Test Data -->\n" +
    "    <!-- Flyout Widget scripts -->\n" +
    "    <script src=\"../sit-dialog-button-mod.js\"></script>\n" +
    "    <script src=\"../sit-dialog-button-dir.js\"></script>\n" +
    "\n" +
    "</body>\n" +
    "\n" +
    "</html>");
}]);

angular.module("common/widgets/documentViewer/document-carousel.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/documentViewer/document-carousel.html",
    "<div class=\"carousel-container\">\n" +
    "    <div class=\"carousel-arrow-left\" ng-click=\"$ctrl.prevItems()\" ng-if=\"$ctrl.page>1\">\n" +
    "        <div class=\"carousel-arrow\">\n" +
    "            <em sit-mom-icon=\"{'path': 'common/icons/miscChevronRight16.svg'}\" title={{'documentViewer.previousPage'|translate}}></em>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"doc-group\">\n" +
    "        <div ng-repeat=\"documentData in $ctrl.carouselData\">\n" +
    "            <div class=\"doc-icon\" ng-class=\"{active:documentData.name === $ctrl.parent.document.name}\" ng-click=\"$ctrl.onThumbnailClick(documentData)\">\n" +
    "                <img class=\"img-view\" ng-if=\"documentData.thumbnail && documentData.thumbnail!==undefined\" \n" +
    "                     ng-src=\"{{documentData.thumbnail}}\" ng-attr-title=\"{{documentData.name}}\" alt=\"thumbnail\"/>\n" +
    "                <div ng-if=\"!documentData.thumbnail || documentData.thumbnail===undefined\" ng-switch=\"documentData.format\">\n" +
    "                    <em ng-switch-when=\"image\" class=\"fa fa-file-image-o\" ng-attr-title=\"{{documentData.name}}\"></em>\n" +
    "                    <em ng-switch-when=\"pdf\" sit-mom-icon=\"{path: 'common/icons/typePdf48.svg'}\" ng-attr-title=\"{{documentData.name}}\"></em>\n" +
    "                    <em ng-switch-when=\"video\" class=\"fa fa-file-video-o\" ng-attr-title=\"{{documentData.name}}\"></em>\n" +
    "                    <em ng-switch-when=\"text\" sit-mom-icon=\"{path: 'common/icons/typeTxt48.svg'}\" ng-attr-title=\"{{documentData.name}}\"></em>\n" +
    "                    <em ng-switch-default class=\"fa fa-file\" ng-attr-title=\"{{documentData.name}}\"></em>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <p ng-if=\"$ctrl.carouselData.length===0\">{{'documentViewer.documentCarousel.noData'|translate}}</p>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"carousel-arrow-right\" ng-click=\"$ctrl.nextItems()\" ng-if=\"$ctrl.page!==$ctrl.last && $ctrl.carouselData.length!==0\">\n" +
    "        <div class=\"carousel-arrow\">\n" +
    "            <em sit-mom-icon=\"{'path': 'common/icons/miscChevronRight16.svg'}\" title={{'documentViewer.nextPage'|translate}}></em>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/documentViewer/document-viewer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/documentViewer/document-viewer.html",
    "<div class=\"sit-document-viewer\">\n" +
    "    <div class=\"doc-header\">\n" +
    "        <div class=\"doc-title\" title=\"{{$ctrl.title}}\">{{$ctrl.title}}</div>\n" +
    "        <div class=\"doc-header-icons\" ng-if=\"($ctrl.data.length > 0) ? true : false\">\n" +
    "            <div class=\"doc-viewer-default-btn\" ng-if=\"!$ctrl.docContent\">\n" +
    "                <div ng-if=\"$ctrl.fullScreenMode==='toolbar'\" class=\"header-icons\">\n" +
    "                    <em sit-mom-icon=\"{'path': 'common/icons/cmdFitToWindow24.svg'}\" title={{'documentViewer.maximizeDocument'|translate}} aria-hidden=\"true\"\n" +
    "                        ng-click=\"$ctrl.maximizeClicked($ctrl.document)\"></em>\n" +
    "                </div>\n" +
    "                <div class=\"header-icons max-doc-detail\" title={{'documentViewer.maximizeDetails'|translate}}>\n" +
    "                    <em sit-mom-icon=\"{'path': 'common/icons/cmdFullSizeVertical24.svg'}\" ng-click=\"$ctrl.toggleViewer()\"></em>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"doc-viewer-custom-btn\" ng-if=\"!$ctrl.docContent\">\n" +
    "                <div class=\"header-icons\" ng-repeat=\"action in $ctrl.actions\">\n" +
    "                    <em ng-class=\"{momIcon:action.displayIcon!==null}\"sit-mom-icon=\"action.displayIcon\" title=\"{{action.label}}\"\n" +
    "                        ng-click=\"action.action()\"></em>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"doc-viewer-minimize-btn\" ng-if=\"$ctrl.docContent\">\n" +
    "                <div class=\"header-icons min-doc-detail\" title={{'documentViewer.minimizeDetails'|translate}}>\n" +
    "                    <em sit-mom-icon=\"{'path': 'common/icons/cmdExitFullSizeVertical24.svg'}\" ng-click=\"$ctrl.toggleViewer()\"></em>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"doc-content\" ng-if=\"!$ctrl.docContent\" sit-document-plugin sit-plugins=\"$ctrl.config.plugins\">\n" +
    "    </div>\n" +
    "    <div ng-class=\"{'doc-list':$ctrl.docContent === false , 'doc-details': $ctrl.docContent === true}\">\n" +
    "        <sit-tabset>\n" +
    "            <sit-tab ng-repeat=\"tab in $ctrl.categories track by tab.id\" heading=\"{{tab.label}}\"\n" +
    "                     select=\"$ctrl.enableTabs(tab.id)\" active=\"tab.tabActive\">\n" +
    "                <sit-document-carousel sit-data=\"$ctrl.items\" sit-config=\"$ctrl.config\" ng-show=\"!$ctrl.docContent\"></sit-document-carousel>\n" +
    "                <sit-tile-view sit-tiles=\"$ctrl.tabContent\" sit-options=\"$ctrl.options\" ng-if=\"$ctrl.tabContent\" \n" +
    "                               ng-show=\"$ctrl.docContent\"></sit-tile-view>\n" +
    "            </sit-tab>\n" +
    "        </sit-tabset>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/documentViewer/plugins/image/image-viewer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/documentViewer/plugins/image/image-viewer.html",
    "<div class=\"image-canvas\" ng-click=\"$ctrl.showFullScreen()\">\n" +
    "    <img alt=\"\" ng-src=\"{{$ctrl.source}}\" />\n" +
    "</div>\n" +
    "\n" +
    "<div id=\"document-viewer-full-screen-image\" ng-if=\"$ctrl.isImageFullScreenMode\" ng-click=\"$ctrl.closeFullScreen()\">\n" +
    "    <div style=\"background: rgba(51, 51, 51, .5); top: 0px; left: 0px; z-index: 9999999; right: 0; bottom: 0; position: absolute; width: 100%; \n" +
    "    height: 100%; display: flex; align-items: center; justify-content: center;\">\n" +
    "        <img alt=\"\" ng-src=\"{{$ctrl.source}}\" style=\"margin-left: auto; margin-right: auto; max-height: 100%; max-width: 100%;\" />\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/documentViewer/plugins/pdf/pdf-viewer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/documentViewer/plugins/pdf/pdf-viewer.html",
    "<div class=\"pdf-canvas\" ng-click=\"$ctrl.showFullScreen()\">\n" +
    "    <div class=\"pdf-viewer\"></div>\n" +
    "</div>\n" +
    "\n" +
    "<div id=\"document-viewer-full-screen-pdf\" ng-if=\"$ctrl.isFullScreenMode\">\n" +
    "    <div id=\"pdf-full-screen\" ng-include=\"'common/widgets/documentViewer/plugins/pdf/viewer.html'\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/documentViewer/plugins/pdf/viewer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/documentViewer/plugins/pdf/viewer.html",
    "<div tabindex=\"-1\" id=\"pdf-full-screen-viewer\" class=\"customViewer loadingInProgress\">\n" +
    "        <div id=\"outerContainer\">\n" +
    "            <div id=\"sidebarContainer\">\n" +
    "                <div id=\"toolbarSidebar\">\n" +
    "                    <div class=\"splitToolbarButton toggled\">\n" +
    "                        <button id=\"viewThumbnail\" class=\"toolbarButton toggled\" title=\"Show Thumbnails\" tabindex=\"2\" data-l10n-id=\"thumbs\">\n" +
    "                            <span data-l10n-id=\"thumbs_label\">Thumbnails</span>\n" +
    "                        </button>\n" +
    "                        <button id=\"viewAttachments\" class=\"toolbarButton\" title=\"Show Attachments\" tabindex=\"4\" data-l10n-id=\"attachments\">\n" +
    "                            <span data-l10n-id=\"attachments_label\">Attachments</span>\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div id=\"sidebarContent\">\n" +
    "                    <div id=\"thumbnailView\">\n" +
    "                    </div>\n" +
    "                    <div id=\"outlineView\" class=\"hidden\">\n" +
    "                    </div>\n" +
    "                    <div id=\"attachmentsView\" class=\"hidden\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>  <!-- sidebarContainer -->\n" +
    "\n" +
    "            <div id=\"mainContainer\">\n" +
    "                <div class=\"findbar hidden doorHanger\" id=\"findbar\">\n" +
    "                    <div id=\"findbarInputContainer\">\n" +
    "                        <input id=\"findInput\" class=\"toolbarField\" title=\"Find\" placeholder=\"Find in document…\" tabindex=\"91\" data-l10n-id=\"find_input\">\n" +
    "                        <div class=\"splitToolbarButton\">\n" +
    "                            <button id=\"findPrevious\" class=\"toolbarButton findPrevious\" title=\"Find the previous occurrence of the phrase\" tabindex=\"92\" data-l10n-id=\"find_previous\">\n" +
    "                                <span data-l10n-id=\"find_previous_label\">Previous</span>\n" +
    "                            </button>\n" +
    "                            <div class=\"splitToolbarButtonSeparator\"></div>\n" +
    "                            <button id=\"findNext\" class=\"toolbarButton findNext\" title=\"Find the next occurrence of the phrase\" tabindex=\"93\" data-l10n-id=\"find_next\">\n" +
    "                                <span data-l10n-id=\"find_next_label\">Next</span>\n" +
    "                            </button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div id=\"findbarOptionsContainer\">\n" +
    "                        <input type=\"checkbox\" id=\"findHighlightAll\" class=\"toolbarField\" tabindex=\"94\">\n" +
    "                        <label for=\"findHighlightAll\" class=\"toolbarLabel\" data-l10n-id=\"find_highlight\">Highlight all</label>\n" +
    "                        <input type=\"checkbox\" id=\"findMatchCase\" class=\"toolbarField\" tabindex=\"95\">\n" +
    "                        <label for=\"findMatchCase\" class=\"toolbarLabel\" data-l10n-id=\"find_match_case_label\">Match case</label>\n" +
    "                        <span id=\"findResultsCount\" class=\"toolbarLabel hidden\"></span>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div id=\"findbarMessageContainer\">\n" +
    "                        <span id=\"findMsg\" class=\"toolbarLabel\"></span>\n" +
    "                    </div>\n" +
    "                </div>  <!-- findbar -->\n" +
    "\n" +
    "                <div id=\"secondaryToolbar\" class=\"secondaryToolbar hidden doorHangerRight\">\n" +
    "                    <div id=\"secondaryToolbarButtonContainer\">\n" +
    "                        <button id=\"secondaryPresentationMode\" class=\"secondaryToolbarButton presentationMode visibleLargeView\" title=\"Switch to Presentation Mode\" tabindex=\"51\" data-l10n-id=\"presentation_mode\">\n" +
    "                            <span data-l10n-id=\"presentation_mode_label\">Presentation Mode</span>\n" +
    "                        </button>\n" +
    "\n" +
    "                        <button id=\"secondaryPrint\" class=\"secondaryToolbarButton print visibleMediumView\" title=\"Print\" tabindex=\"53\" data-l10n-id=\"print\">\n" +
    "                            <span data-l10n-id=\"print_label\">Print</span>\n" +
    "                        </button>\n" +
    "\n" +
    "                        <button id=\"secondaryDownload\" class=\"secondaryToolbarButton download visibleMediumView\" title=\"Download\" tabindex=\"54\" data-l10n-id=\"download\">\n" +
    "                            <span data-l10n-id=\"download_label\">Download</span>\n" +
    "                        </button>\n" +
    "\n" +
    "                        <button id=\"secondaryClose\" class=\"secondaryToolbarButton close visibleMediumView\" title=\"Close\" tabindex=\"55\" data-l10n-id=\"close\">\n" +
    "                            <span data-l10n-id=\"close_label\">Close</span>\n" +
    "                        </button>\n" +
    "\n" +
    "                        <a href=\"#\" id=\"secondaryViewBookmark\" class=\"secondaryToolbarButton bookmark visibleSmallView\" title=\"Current view (copy or open in new window)\" tabindex=\"55\" data-l10n-id=\"bookmark\">\n" +
    "                            <span data-l10n-id=\"bookmark_label\">Current View</span>\n" +
    "                        </a>\n" +
    "\n" +
    "                        <div class=\"horizontalToolbarSeparator visibleLargeView\"></div>\n" +
    "\n" +
    "                        <button id=\"firstPage\" class=\"secondaryToolbarButton firstPage\" title=\"Go to First Page\" tabindex=\"56\" data-l10n-id=\"first_page\">\n" +
    "                            <span data-l10n-id=\"first_page_label\">Go to First Page</span>\n" +
    "                        </button>\n" +
    "                        <button id=\"lastPage\" class=\"secondaryToolbarButton lastPage\" title=\"Go to Last Page\" tabindex=\"57\" data-l10n-id=\"last_page\">\n" +
    "                            <span data-l10n-id=\"last_page_label\">Go to Last Page</span>\n" +
    "                        </button>\n" +
    "\n" +
    "                        <div class=\"horizontalToolbarSeparator\"></div>\n" +
    "\n" +
    "                        <button id=\"pageRotateCw\" class=\"secondaryToolbarButton rotateCw\" title=\"Rotate Clockwise\" tabindex=\"58\" data-l10n-id=\"page_rotate_cw\">\n" +
    "                            <span data-l10n-id=\"page_rotate_cw_label\">Rotate Clockwise</span>\n" +
    "                        </button>\n" +
    "                        <button id=\"pageRotateCcw\" class=\"secondaryToolbarButton rotateCcw\" title=\"Rotate Counterclockwise\" tabindex=\"59\" data-l10n-id=\"page_rotate_ccw\">\n" +
    "                            <span data-l10n-id=\"page_rotate_ccw_label\">Rotate Counterclockwise</span>\n" +
    "                        </button>\n" +
    "\n" +
    "                        <div class=\"horizontalToolbarSeparator\"></div>\n" +
    "\n" +
    "                        <button id=\"cursorSelectTool\" class=\"secondaryToolbarButton selectTool toggled\" title=\"Enable Text Selection Tool\" tabindex=\"60\" data-l10n-id=\"cursor_text_select_tool\">\n" +
    "                            <span data-l10n-id=\"cursor_text_select_tool_label\">Text Selection Tool</span>\n" +
    "                        </button>\n" +
    "                        <button id=\"cursorHandTool\" class=\"secondaryToolbarButton handTool\" title=\"Enable Hand Tool\" tabindex=\"61\" data-l10n-id=\"cursor_hand_tool\">\n" +
    "                            <span data-l10n-id=\"cursor_hand_tool_label\">Hand Tool</span>\n" +
    "                        </button>\n" +
    "\n" +
    "                        <div class=\"horizontalToolbarSeparator\"></div>\n" +
    "\n" +
    "                        <button id=\"documentProperties\" class=\"secondaryToolbarButton documentProperties\" title=\"Document Properties…\" tabindex=\"62\" data-l10n-id=\"document_properties\">\n" +
    "                            <span data-l10n-id=\"document_properties_label\">Document Properties…</span>\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "                </div>  <!-- secondaryToolbar -->\n" +
    "\n" +
    "                <div class=\"toolbar\">\n" +
    "                    <div id=\"toolbarContainer\">\n" +
    "                        <div id=\"toolbarViewer\">\n" +
    "                            <div id=\"toolbarViewerLeft\">\n" +
    "                                <button id=\"sidebarToggle\" class=\"toolbarButton\" title=\"Toggle Sidebar\" tabindex=\"11\" data-l10n-id=\"toggle_sidebar\">\n" +
    "                                    <span data-l10n-id=\"toggle_sidebar_label\">Toggle Sidebar</span>\n" +
    "                                </button>\n" +
    "                                <div class=\"toolbarButtonSpacer\"></div>\n" +
    "                                <button id=\"viewFind\" class=\"toolbarButton\" title=\"Find in Document\" tabindex=\"12\" data-l10n-id=\"findbar\">\n" +
    "                                    <span data-l10n-id=\"findbar_label\">Find</span>\n" +
    "                                </button>\n" +
    "                                <div class=\"splitToolbarButton hiddenSmallView\">\n" +
    "                                    <button class=\"toolbarButton pageUp\" title=\"Previous Page\" id=\"previous\" tabindex=\"13\" data-l10n-id=\"previous\">\n" +
    "                                        <span data-l10n-id=\"previous_label\">Previous</span>\n" +
    "                                    </button>\n" +
    "                                    <div class=\"splitToolbarButtonSeparator\"></div>\n" +
    "                                    <button class=\"toolbarButton pageDown\" title=\"Next Page\" id=\"next\" tabindex=\"14\" data-l10n-id=\"next\">\n" +
    "                                        <span data-l10n-id=\"next_label\">Next</span>\n" +
    "                                    </button>\n" +
    "                                </div>\n" +
    "                                <input type=\"number\" id=\"pageNumber\" class=\"toolbarField pageNumber\" title=\"Page\" value=\"1\" size=\"4\" min=\"1\" tabindex=\"15\" data-l10n-id=\"page\">\n" +
    "                                <span id=\"numPages\" class=\"toolbarLabel\"></span>\n" +
    "                            </div>\n" +
    "                            <div id=\"toolbarViewerRight\">\n" +
    "                                <button id=\"presentationMode\" class=\"toolbarButton presentationMode hiddenLargeView\" title=\"Switch to Presentation Mode\" tabindex=\"31\" data-l10n-id=\"presentation_mode\">\n" +
    "                                    <span data-l10n-id=\"presentation_mode_label\">Presentation Mode</span>\n" +
    "                                </button>\n" +
    "\n" +
    "                                <button id=\"print\" class=\"toolbarButton print hiddenMediumView\" title=\"Print\" tabindex=\"33\" data-l10n-id=\"print\">\n" +
    "                                    <span data-l10n-id=\"print_label\">Print</span>\n" +
    "                                </button>\n" +
    "\n" +
    "                                <button id=\"download\" class=\"toolbarButton download hiddenMediumView\" title=\"Download\" tabindex=\"34\" data-l10n-id=\"download\">\n" +
    "                                    <span data-l10n-id=\"download_label\">Download</span>\n" +
    "                                </button>\n" +
    "                                <button id=\"close\" class=\"toolbarButton close hiddenMediumView\" title=\"Close\" tabindex=\"35\" data-l10n-id=\"close\">\n" +
    "                                    <span data-l10n-id=\"close_label\">Close</span>\n" +
    "                                </button>\n" +
    "                                <a href=\"#\" id=\"viewBookmark\" class=\"toolbarButton bookmark hiddenSmallView\" title=\"Current view (copy or open in new window)\" tabindex=\"35\" data-l10n-id=\"bookmark\">\n" +
    "                                    <span data-l10n-id=\"bookmark_label\">Current View</span>\n" +
    "                                </a>\n" +
    "\n" +
    "                                <div class=\"verticalToolbarSeparator hiddenSmallView\"></div>\n" +
    "\n" +
    "                                <button id=\"secondaryToolbarToggle\" class=\"toolbarButton\" title=\"Tools\" tabindex=\"36\" data-l10n-id=\"tools\">\n" +
    "                                    <span data-l10n-id=\"tools_label\">Tools</span>\n" +
    "                                </button>\n" +
    "                            </div>\n" +
    "                            <div id=\"toolbarViewerMiddle\">\n" +
    "                                <div class=\"splitToolbarButton\">\n" +
    "                                    <button id=\"zoomOut\" class=\"toolbarButton zoomOut\" title=\"Zoom Out\" tabindex=\"21\" data-l10n-id=\"zoom_out\">\n" +
    "                                        <span data-l10n-id=\"zoom_out_label\">Zoom Out</span>\n" +
    "                                    </button>\n" +
    "                                    <div class=\"splitToolbarButtonSeparator\"></div>\n" +
    "                                    <button id=\"zoomIn\" class=\"toolbarButton zoomIn\" title=\"Zoom In\" tabindex=\"22\" data-l10n-id=\"zoom_in\">\n" +
    "                                        <span data-l10n-id=\"zoom_in_label\">Zoom In</span>\n" +
    "                                    </button>\n" +
    "                                </div>\n" +
    "                                <span id=\"scaleSelectContainer\" class=\"dropdownToolbarButton\">\n" +
    "                                    <select id=\"scaleSelect\" title=\"Zoom\" tabindex=\"23\" data-l10n-id=\"zoom\">\n" +
    "                                        <option id=\"pageAutoOption\" title=\"\" value=\"auto\" selected=\"selected\" data-l10n-id=\"page_scale_auto\">Automatic Zoom</option>\n" +
    "                                        <option id=\"pageActualOption\" title=\"\" value=\"page-actual\" data-l10n-id=\"page_scale_actual\">Actual Size</option>\n" +
    "                                        <option id=\"pageFitOption\" title=\"\" value=\"page-fit\" data-l10n-id=\"page_scale_fit\">Page Fit</option>\n" +
    "                                        <option id=\"pageWidthOption\" title=\"\" value=\"page-width\" data-l10n-id=\"page_scale_width\">Page Width</option>\n" +
    "                                        <option id=\"customScaleOption\" title=\"\" value=\"custom\" disabled=\"disabled\" hidden=\"true\"></option>\n" +
    "                                        <option title=\"\" value=\"0.5\" data-l10n-id=\"page_scale_percent\" data-l10n-args='{ \"scale\": 50 }'>50%</option>\n" +
    "                                        <option title=\"\" value=\"0.75\" data-l10n-id=\"page_scale_percent\" data-l10n-args='{ \"scale\": 75 }'>75%</option>\n" +
    "                                        <option title=\"\" value=\"1\" data-l10n-id=\"page_scale_percent\" data-l10n-args='{ \"scale\": 100 }'>100%</option>\n" +
    "                                        <option title=\"\" value=\"1.25\" data-l10n-id=\"page_scale_percent\" data-l10n-args='{ \"scale\": 125 }'>125%</option>\n" +
    "                                        <option title=\"\" value=\"1.5\" data-l10n-id=\"page_scale_percent\" data-l10n-args='{ \"scale\": 150 }'>150%</option>\n" +
    "                                        <option title=\"\" value=\"2\" data-l10n-id=\"page_scale_percent\" data-l10n-args='{ \"scale\": 200 }'>200%</option>\n" +
    "                                        <option title=\"\" value=\"3\" data-l10n-id=\"page_scale_percent\" data-l10n-args='{ \"scale\": 300 }'>300%</option>\n" +
    "                                        <option title=\"\" value=\"4\" data-l10n-id=\"page_scale_percent\" data-l10n-args='{ \"scale\": 400 }'>400%</option>\n" +
    "                                    </select>\n" +
    "                                </span>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div id=\"loadingBar\">\n" +
    "                            <div class=\"progress\">\n" +
    "                                <div class=\"glimmer\">\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <menu type=\"context\" id=\"viewerContextMenu\">\n" +
    "                    <menuitem id=\"contextFirstPage\" label=\"First Page\"\n" +
    "                              data-l10n-id=\"first_page\"></menuitem>\n" +
    "                    <menuitem id=\"contextLastPage\" label=\"Last Page\"\n" +
    "                              data-l10n-id=\"last_page\"></menuitem>\n" +
    "                    <menuitem id=\"contextPageRotateCw\" label=\"Rotate Clockwise\"\n" +
    "                              data-l10n-id=\"page_rotate_cw\"></menuitem>\n" +
    "                    <menuitem id=\"contextPageRotateCcw\" label=\"Rotate Counter-Clockwise\"\n" +
    "                              data-l10n-id=\"page_rotate_ccw\"></menuitem>\n" +
    "                </menu>\n" +
    "\n" +
    "                <div id=\"viewerContainer\" tabindex=\"0\">\n" +
    "                    <div id=\"viewer\" class=\"pdfViewer\"></div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div id=\"errorWrapper\" hidden='true'>\n" +
    "                    <div id=\"errorMessageLeft\">\n" +
    "                        <span id=\"errorMessage\"></span>\n" +
    "                        <button id=\"errorShowMore\" data-l10n-id=\"error_more_info\">\n" +
    "                            More Information\n" +
    "                        </button>\n" +
    "                        <button id=\"errorShowLess\" data-l10n-id=\"error_less_info\" hidden='true'>\n" +
    "                            Less Information\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "                    <div id=\"errorMessageRight\">\n" +
    "                        <button id=\"errorClose\" data-l10n-id=\"error_close\">\n" +
    "                            Close\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "                    <div class=\"clearBoth\"></div>\n" +
    "                    <textarea id=\"errorMoreInfo\" hidden='true' readonly=\"readonly\"></textarea>\n" +
    "                </div>\n" +
    "            </div> <!-- mainContainer -->\n" +
    "\n" +
    "            <div id=\"overlayContainer\" class=\"hidden\">\n" +
    "                <div id=\"passwordOverlay\" class=\"container hidden\">\n" +
    "                    <div class=\"dialog\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <p id=\"passwordText\" data-l10n-id=\"password_label\">Enter the password to open this PDF file:</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <input type=\"password\" id=\"password\" class=\"toolbarField\">\n" +
    "                        </div>\n" +
    "                        <div class=\"buttonRow\">\n" +
    "                            <button id=\"passwordCancel\" class=\"overlayButton\"><span data-l10n-id=\"password_cancel\">Cancel</span></button>\n" +
    "                            <button id=\"passwordSubmit\" class=\"overlayButton\"><span data-l10n-id=\"password_ok\">OK</span></button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div id=\"documentPropertiesOverlay\" class=\"container hidden\">\n" +
    "                    <div class=\"dialog\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_file_name\">File name:</span> <p id=\"fileNameField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_file_size\">File size:</span> <p id=\"fileSizeField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"separator\"></div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_title\">Title:</span> <p id=\"titleField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_author\">Author:</span> <p id=\"authorField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_subject\">Subject:</span> <p id=\"subjectField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_keywords\">Keywords:</span> <p id=\"keywordsField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_creation_date\">Creation Date:</span> <p id=\"creationDateField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_modification_date\">Modification Date:</span> <p id=\"modificationDateField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_creator\">Creator:</span> <p id=\"creatorField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"separator\"></div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_producer\">PDF Producer:</span> <p id=\"producerField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_version\">PDF Version:</span> <p id=\"versionField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"document_properties_page_count\">Page Count:</span> <p id=\"pageCountField\">-</p>\n" +
    "                        </div>\n" +
    "                        <div class=\"buttonRow\">\n" +
    "                            <button id=\"documentPropertiesClose\" class=\"overlayButton\"><span data-l10n-id=\"document_properties_close\">Close</span></button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div id=\"printServiceOverlay\" class=\"container hidden\">\n" +
    "                    <div class=\"dialog\">\n" +
    "                        <div class=\"row\">\n" +
    "                            <span data-l10n-id=\"print_progress_message\">Preparing document for printing…</span>\n" +
    "                        </div>\n" +
    "                        <div class=\"row\">\n" +
    "                            <progress value=\"0\" max=\"100\"></progress>\n" +
    "                            <span data-l10n-id=\"print_progress_percent\" data-l10n-args='{ \"progress\": 0 }' class=\"relative-progress\">0%</span>\n" +
    "                        </div>\n" +
    "                        <div class=\"buttonRow\">\n" +
    "                            <button id=\"printCancel\" class=\"overlayButton\"><span data-l10n-id=\"print_progress_close\">Cancel</span></button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>  <!-- overlayContainer -->\n" +
    "\n" +
    "        </div> <!-- outerContainer -->\n" +
    "        <div id=\"printContainer\"></div>\n" +
    "    </div>\n" +
    "");
}]);

angular.module("common/widgets/documentViewer/plugins/text/text-viewer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/documentViewer/plugins/text/text-viewer.html",
    "<div class=\"text-canvas\" ng-click=\"$ctrl.showFullScreen()\">\n" +
    "    <p ng-bind-html=\"$ctrl.textData | textLineBreak\"></p>\n" +
    "</div>\n" +
    "\n" +
    "<div id=\"document-viewer-full-screen-text\" ng-if=\"$ctrl.istextFullScreenMode\" ng-click=\"$ctrl.closeFullScreen()\">\n" +
    "    <div id=\"full-screen-text\" style=\"background: #f0f0f0; z-index: 9999999; top: 0; position: absolute; width: 100%; \n" +
    "    height: 100%; display: flex; overflow-y: auto;left: 0; right: 0; bottom: 0;\">\n" +
    "        <p class=\"full-screen-text\" style=\"margin-left: auto; margin-right: auto;\" ng-bind-html=\"$ctrl.textData | textLineBreak\"></p>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/documentViewer/plugins/vector/vector-viewer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/documentViewer/plugins/vector/vector-viewer.html",
    "<div class=\"vector-canvas\">\n" +
    "    <div ng-bind-html=\"$ctrl.finalSVG\" class=\"vector-view\"></div>\n" +
    "</div>\n" +
    "\n" +
    "<div id=\"document-viewer-full-screen-svg\" ng-if=\"$ctrl.isVectorFullScreenMode\">\n" +
    "    <div style=\"background: #f0f0f0; z-index: 9999999; top: 0; position: absolute; width: 100%; height: 100%; overflow: auto;\">\n" +
    "        <div style=\"cursor: pointer; float: right; font-size: 25px; margin: 10px;\">\n" +
    "            <em class=\"fa fa-times\" aria-hidden=\"true\" title=\"Close\" ng-click=\"$ctrl.closeFullScreen()\"></em>\n" +
    "        </div>\n" +
    "        <div ng-bind-html=\"$ctrl.finalSVG\" style=\"height: 100%; display: flex; align-items: center; justify-content: center;\"></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/documentViewer/plugins/video/video-viewer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/documentViewer/plugins/video/video-viewer.html",
    "<div class=\"video-canvas\" ng-click=\"$ctrl.showFullScreen()\">\n" +
    "    <video id=\"video-element\" controls ng-src=\"{{$ctrl.source}}\"></video>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/electronicSignature/browse-scenarios-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/electronicSignature/browse-scenarios-popup.html",
    "<div class=\"entity-picker-popup\">\n" +
    "    <sit-es-browse-scenarios sit-config=\"Dialog.templatedata.config\" sit-filter=\"Dialog.templatedata.filter\" sit-vmpicker=\"Dialog.templatedata.vmpicker\" style=\"width:100%; height:100%;\"></sit-es-browse-scenarios>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/electronicSignature/es-browse-signers.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/electronicSignature/es-browse-signers.html",
    "<script src=\"common/scripts/moment.js\"></script>\n" +
    "<script src=\"common/scripts/moment-with-locales.js\"></script>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "<script>\n" +
    "\n" +
    "    //Make the DIV element draggable:\n" +
    "    var outerdivclassname = \"dialog-modal\";\n" +
    "    var headerdivclassname = \"input-dialog-header\";\n" +
    "    //var headerdivclassname = \"dialog-header-text\";\n" +
    "    dragElement(document.getElementsByClassName(outerdivclassname)[0]);\n" +
    "\n" +
    "    function dragElement(elmnt) {\n" +
    "        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;\n" +
    "        if (document.getElementsByClassName(headerdivclassname)[0]) {\n" +
    "\n" +
    "            document.getElementsByClassName(headerdivclassname)[0].onmousedown = dragMouseDown;\n" +
    "        } else {\n" +
    "\n" +
    "            elmnt.onmousedown = dragMouseDown;\n" +
    "        }\n" +
    "\n" +
    "        function dragMouseDown(e) {\n" +
    "            e = e || window.event;\n" +
    "            e.preventDefault();\n" +
    "            // get the mouse cursor position at startup:\n" +
    "            pos3 = e.clientX;\n" +
    "            pos4 = e.clientY;\n" +
    "            document.onmouseup = closeDragElement;\n" +
    "            // call a function whenever the cursor moves:\n" +
    "            document.onmousemove = elementDrag;\n" +
    "        }\n" +
    "\n" +
    "        function elementDrag(e) {\n" +
    "            e = e || window.event;\n" +
    "            e.preventDefault();\n" +
    "            // calculate the new cursor position:\n" +
    "            pos1 = pos3 - e.clientX;\n" +
    "            pos2 = pos4 - e.clientY;\n" +
    "            pos3 = e.clientX;\n" +
    "            pos4 = e.clientY;\n" +
    "            // set the element's new position:\n" +
    "            elmnt.style.top = (elmnt.offsetTop - pos2) + \"px\";\n" +
    "            elmnt.style.left = (elmnt.offsetLeft - pos1) + \"px\";\n" +
    "        }\n" +
    "\n" +
    "        function closeDragElement() {\n" +
    "\n" +
    "            document.onmouseup = null;\n" +
    "            document.onmousemove = null;\n" +
    "        }\n" +
    "    }\n" +
    "</script>\n" +
    "\n" +
    "\n" +
    "<style>\n" +
    "\n" +
    "    #es-browse-signers \n" +
    "    {\n" +
    "        max-width:100%;\n" +
    "    }\n" +
    "    #signs_accordion\n" +
    "    {\n" +
    "        max-width:100%;\n" +
    "    }\n" +
    "    #es-browse-signers .error_rectangle {\n" +
    "        color: #DC0000;\n" +
    "        text-align: left;\n" +
    "        text-decoration: none;\n" +
    "        font-family: 'Segoe UI',Arial;\n" +
    "        font-size: 10.0pt;\n" +
    "        font-style: normal;\n" +
    "        font-weight: 400;\n" +
    "        line-height: 0px;\n" +
    "        background-attachment: scroll;\n" +
    "        background-color: rgb(251, 238, 237);\n" +
    "        background-size: auto;\n" +
    "        border-bottom-color: rgb(239, 187, 185);\n" +
    "        border-bottom-style: solid;\n" +
    "        border-bottom-width: 1px;\n" +
    "        border-collapse: separate;\n" +
    "        border-left-color: rgb(239, 187, 185);\n" +
    "        border-left-style: solid;\n" +
    "        border-left-width: 1px;\n" +
    "        border-right-color: rgb(239, 187, 185);\n" +
    "        border-right-style: solid;\n" +
    "        border-right-width: 1px;\n" +
    "        border-top-color: rgb(239, 187, 185);\n" +
    "        border-top-style: solid;\n" +
    "        border-top-width: 1px;\n" +
    "        box-shadow: none;\n" +
    "        display: block;\n" +
    "        font-family: \"Segoe UI\", Arial;\n" +
    "        font-size: 13.3333px;\n" +
    "        height: 46px;\n" +
    "        line-height: 18px;\n" +
    "        pointer-events: auto;\n" +
    "        width:100%;\n" +
    "        -webkit-border-horizontal-spacing: 0px;\n" +
    "        -webkit-border-vertical-spacing: 0px;\n" +
    "        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n" +
    "    }\n" +
    "\n" +
    "    #es-browse-signers .accordion_header {\n" +
    "        background-color: #ffffff;\n" +
    "        text-decoration: none !important;\n" +
    "        border: none;\n" +
    "        border-width: 0;\n" +
    "        border-style: none;\n" +
    "    }\n" +
    "\n" +
    "    #es-browse-signers .accordionGroup {\n" +
    "        background-color: #ffffff;\n" +
    "        text-decoration: none !important;\n" +
    "        border: none;\n" +
    "        border-width: 0;\n" +
    "        border-style: none;\n" +
    "    }\n" +
    "\n" +
    "    #es-browse-signers .isOpened {\n" +
    "        transform: rotate(0deg);\n" +
    "    }\n" +
    "\n" +
    "    #es-browse-signers .isClosed {\n" +
    "        transform: rotate(270deg);\n" +
    "    }\n" +
    "\n" +
    "    #es-browse-signers .panel-group .panel {\n" +
    "        border: none !important;\n" +
    "        border-width: 0;\n" +
    "        border-style: none;\n" +
    "        background-color: #ffffff;\n" +
    "        overflow:auto;\n" +
    "    }\n" +
    "\n" +
    "    #es-browse-signers .panel-body {\n" +
    "        background-color: #f0f0f0;\n" +
    "        border: none !important;\n" +
    "        border-width: 0;\n" +
    "        border-style: none;\n" +
    "    }\n" +
    "\n" +
    "    #es-browse-signers .panel {\n" +
    "        border: none !important;\n" +
    "        ;\n" +
    "        border-width: 0;\n" +
    "        border-style: none;\n" +
    "        background-color: #ffffff;\n" +
    "    }\n" +
    "\n" +
    "    #es-browse-signers .panel-open {\n" +
    "        border: none;\n" +
    "        border-width: 0;\n" +
    "        border-style: none;\n" +
    "    }\n" +
    "\n" +
    "    #es-browse-signers .box {\n" +
    "        height: 100%;\n" +
    "        float: left;\n" +
    "        display: block;\n" +
    "    }\n" +
    "\n" +
    "    #es-browse-signers a:hover {\n" +
    "        text-decoration: none !important;\n" +
    "    }\n" +
    "\n" +
    "    #es-browse-signers a {\n" +
    "        text-decoration: none !important;\n" +
    "    }\n" +
    "\n" +
    "    #es-browse-signers a:hover span {\n" +
    "            text-decoration: none;\n" +
    "        }\n" +
    "\n" +
    "    #es-browse-signers .Signature_text_style {\n" +
    "        color: #464646;\n" +
    "        text-align: left;\n" +
    "        text-decoration: none;\n" +
    "        font-family: 'Segoe UI',Arial;\n" +
    "        font-size: 9.0pt;\n" +
    "        font-style: normal;\n" +
    "        font-weight: 400;\n" +
    "        line-height: 0px;\n" +
    "    }\n" +
    "\n" +
    "    #es-browse-signers .Paragraph {\n" +
    "        color: #464646;\n" +
    "        text-align: left;\n" +
    "        text-decoration: none;\n" +
    "        font-family: 'Segoe UI',Arial;\n" +
    "        font-size: 12.5pt;\n" +
    "        font-style: normal;\n" +
    "        font-weight: 400;\n" +
    "        line-height: 0px;\n" +
    "    }\n" +
    "\n" +
    "    #es-browse-signers .headersDIV {\n" +
    "        margin-top: 10px;\n" +
    "        margin-bottom: 10px;\n" +
    "    }\n" +
    "\n" +
    "    #es-browse-signers .progressheaderDIV {\n" +
    "        height: 20px;\n" +
    "        border: 1px solid #aaaaaa;\n" +
    "        max-width:100%;\n" +
    "    }\n" +
    "\n" +
    "    #es-browse-signers .signer_info_header {\n" +
    "        color: #5A5A5A;\n" +
    "        text-align: left;\n" +
    "        text-decoration: none;\n" +
    "        font-family: 'Segoe UI',Arial;\n" +
    "        font-size: 9.0pt;\n" +
    "        font-style: normal;\n" +
    "        font-weight: 700;\n" +
    "        line-height: 0px;\n" +
    "    }\n" +
    "\n" +
    "    #es-browse-signers .signer_info_text {\n" +
    "        color: #464646;\n" +
    "        text-align: left;\n" +
    "        text-decoration: none;\n" +
    "        font-family: 'Segoe UI',Arial;\n" +
    "        font-size: 10.5pt;\n" +
    "        font-style: normal;\n" +
    "        font-weight: 400;\n" +
    "        line-height: 0px;\n" +
    "        max-width:100%;\n" +
    "    }\n" +
    "\n" +
    "    #globalDialogId {\n" +
    "        position: absolute;\n" +
    "        z-index: 9;\n" +
    "    }\n" +
    "\n" +
    "    #es-browse-signers .dialog-header-text {\n" +
    "        z-index: 10;\n" +
    "    }\n" +
    "    #es-browse-signers .collapsing {\n" +
    "    -webkit-transition: none;\n" +
    "    transition: none;\n" +
    "    display: none;\n" +
    "}\n" +
    "\n" +
    "</style>\n" +
    "<div id=\"es-browse-signers\">\n" +
    "    <div>\n" +
    "        <div>\n" +
    "            <div class=\"headersDIV\">\n" +
    "                <span class=\"Paragraph\">{{vm.config.description}}</span>\n" +
    "            </div>\n" +
    "            <div class=\"progressheaderDIV\" style=\"\">\n" +
    "                <div class=\"progress-bar\" role=\"progressbar\" style=\"background-color: #55A0B9 !important; width: {{vm.config.progressvalue}}%;\" aria-valuenow=\"{{vm.config.progressvalue}}\" aria-valuemin=\"0\" aria-valuemax=\"{{vm.config.signstocollect}}\"></div>\n" +
    "            </div>\n" +
    "            <div class=\"headersDIV\">\n" +
    "                <span class=\"Signature_text_style\">{{vm.config.signsleftdescription}}</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"signs_accordion\" uib-accordion class=\"sortHead without_widgets_group\" close-others=\"true\">\n" +
    "        <div uib-accordion-group ng-repeat=\"xxx in vm.config.items.SignatureInstances\" is-open=\"isOpen\" on-finish-render=\"ReStyle()\" class=\"accordionGroup\">\n" +
    "            <div uib-accordion-heading class=\"accordion_header\">\n" +
    "                <table id=\"tablerowaccordionheader{{xxx.Id}}\" style=\"width:100%\" class=\"accordionGroup\" ng-click=\"vm.Opened(isOpen, $index)\">\n" +
    "                    <tr>\n" +
    "                        <td style=\"width:5%;padding:5px;\">\n" +
    "                            <div id=\"{{xxx.Id}}_imginfotable\">\n" +
    "                                <svg preserveAspectRatio=\"none\" ng-class=\"{isOpened: isOpen, isClosed:!isOpen}\" x=\"0px\" y=\"0px\" width=\"16px\" height=\"16px\" viewBox=\"0 0 16 16\" xml:space=\"preserve\">                 \n" +
    "                                <polygon class=\"aw-theme-iconOutline\" fill=\"#464646\" points=\"4,6 8,10 12,6 \"></polygon>\n" +
    "                        </svg>\n" +
    "                            </div>\n" +
    "                        </td>\n" +
    "                        <td style=\"width:50%;padding:10px;\">\n" +
    "                            <div id=\"{{xxx.Id}}_maxleftinfotable\" style=\"text-decoration: none;\">\n" +
    "                                <div id=\"{{xxx.Id}}_upper_infomaxleftinfotable\" style=\"text-decoration: none !important;\">\n" +
    "                                    <span style=\"color: #5A5A5A;text-align: left;text-decoration: none !important;font-family: 'Segoe UI',Arial;font-size: 9.0pt;font-style: normal;font-weight: 700;line-height: 0px;\">{{vm.Translate(xxx.Signer.Type)}}</span>\n" +
    "\n" +
    "                                </div>\n" +
    "                                <div id=\"{{xxx.Id}}_upperinner_infomaxleftinfotable\" style=\"text-decoration: none !important;\">\n" +
    "                                    <span style=\"color: #464646;text-align: left;text-decoration: none !important;font-family: 'Segoe UI',Arial;font-size: 10.5pt;font-style: normal;font-weight: 400;line-height: 0px;\">{{xxx.Signer.Name}}</span>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </td>\n" +
    "                        <td style=\"width:40%;padding:10px;\">\n" +
    "                            <div id=\"{{xxx.Id}}_maxleftinfotable\" style=\"text-decoration: none;\">\n" +
    "                                <div id=\"{{xxx.Id}}_upper_infomaxleftinfotable\" style=\"text-decoration: none !important;\">\n" +
    "                                    <span style=\"color: #5A5A5A;text-align: left;text-decoration: none !important;font-family: 'Segoe UI',Arial;font-size: 9.0pt;font-style: normal;font-weight: 700;line-height: 0px;\">{{vm.Translate('Meaning')}}</span>\n" +
    "\n" +
    "                                </div>\n" +
    "                                <div id=\"{{xxx.Id}}_upperinner_infomaxleftinfotable\" style=\"text-decoration: none !important;\">\n" +
    "                                    <span style=\"color: #464646;text-align: left;text-decoration: none !important;font-family: 'Segoe UI',Arial;font-size: 10.5pt;font-style: normal;font-weight: 400;line-height: 0px;\">{{xxx.ShortReason}}</span>\n" +
    "                                </div>\n" +
    "\n" +
    "                            </div>\n" +
    "                        </td>\n" +
    "                        <td style=\"width:5%;padding:5px;\">\n" +
    "                            <div id=\"{{xxx.Id}}_Initial_State\" class=\"pie image firer ie-background commentable\" alt=\"image\" overlay=\"#464646\" ng-hide=\"xxx.Status!='Initial'\">\n" +
    "                                <svg preserveAspectRatio=\"none\" width=\"24\" height=\"24\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1024 544v448q0 14-9 23t-23 9h-320q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h224v-352q0-14 9-23t23-9h64q14 0 23 9t9 23zm416 352q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z\" style=\"fill:#464646 !important;\"></path></svg>\n" +
    "                            </div>\n" +
    "                            <div id=\"{{xxx.Id}}_Accepted_State\" class=\"pie image firer ie-background commentable\" alt=\"image\" overlay=\"#464646\" ng-hide=\"xxx.Status!='Approved'\">\n" +
    "                                <svg preserveAspectRatio=\"none\" width=\"24\" height=\"24\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z\" style=\"fill:#464646 !important;\"></path></svg>\n" +
    "                            </div>\n" +
    "                            <div id=\"{{xxx.Id}}_Warning_State\" class=\"pie image firer ie-background commentable\" alt=\"image\" overlay=\"#464646\" ng-hide=\"xxx.Status!='Warning'\">\n" +
    "                                <svg preserveAspectRatio=\"none\" width=\"24\" height=\"24\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z\" style=\"fill:#464646 !important;\"></path></svg>\n" +
    "                            </div>\n" +
    "                            <div id=\"{{xxx.Id}}_Error_State\" class=\"pie image firer ie-background commentable\" alt=\"image\" overlay=\"#464646\" ng-hide=\"xxx.Status!='Rejected'\">\n" +
    "                                <svg preserveAspectRatio=\"none\" width=\"24\" height=\"24\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z\" style=\"fill:#464646 !important;\"></path></svg>\n" +
    "                            </div>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                </table>\n" +
    "            </div>\n" +
    "            <div class=\"panel-collapse collapse\" uib-collapse=\"!isOpen\">\n" +
    "                <div id=\"{{xxx.Id}}_error\" class=\"error_rectangle\" ng-show=\"xxx.error.length>0\">\n" +
    "                    <span>{{xxx.error}}</span>\n" +
    "                </div>\n" +
    "                <div id=\"{{xxx.Id}}_header\" ng-hide=\"vm.config.items.ValidationMode=='Approve'\"></div>\n" +
    "                <center>\n" +
    "                    <div id=\"{{xxx.Id}}_content\"></div>\n" +
    "                </center>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/electronicSignature/es-rich-radio.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/electronicSignature/es-rich-radio.html",
    "<style>\n" +
    "\n" +
    "    #custom-radio .AppRejLabel \n" +
    "    {\n" +
    "        color: #464646;text-align: left;text-decoration: none !important;font-family: 'Segoe UI',Arial;font-size: 10.5pt;font-style: normal;font-weight: 400;line-height: 0px;\n" +
    "        display:inline-block;\n" +
    "        vertical-align:middle;\n" +
    "    }\n" +
    "\n" +
    "    #custom-radio input[type=\"radio\"] {\n" +
    "        visibility: hidden;\n" +
    "        text-align:center !important;\n" +
    "        vertical-align:middle;\n" +
    "    }\n" +
    "\n" +
    "    #custom-radio label input[type=\"radio\"] ~ em.fa.radio-off {\n" +
    "        /*color: #c8c8c8;*/\n" +
    "        display:inline-block;\n" +
    "        text-align:center !important;\n" +
    "        vertical-align:middle;\n" +
    "    }\n" +
    "\n" +
    "    #custom-radio label input[type=\"radio\"] ~ em.fa.radio-on {\n" +
    "        display: none;\n" +
    "        text-align:center !important;\n" +
    "        vertical-align:middle;\n" +
    "    }\n" +
    "\n" +
    "    #custom-radio  label input[type=\"radio\"]:checked ~ em.fa.radio-off {\n" +
    "        display: none;\n" +
    "    }\n" +
    "\n" +
    "    #custom-radio label input[type=\"radio\"]:checked ~ em.fa.radio-on {\n" +
    "        color: #197695;\n" +
    "        text-align:center !important;\n" +
    "        display:inline-block;\n" +
    "        vertical-align:middle;\n" +
    "    }\n" +
    "\n" +
    "    #custom-radio label:hover input[type=\"radio\"] ~ em.fa {\n" +
    "        color: #197695;\n" +
    "        text-align:center !important;\n" +
    "        vertical-align:middle;\n" +
    "    }\n" +
    "\n" +
    "\n" +
    "</style>\n" +
    "<div id=\"custom-radio\">\n" +
    "    <div class=\"label label-property-grid-control-readonly property-value-ellipsis\" ng-if=\"richRadioCtrl.readOnly || richRadioCtrl.ngReadonly\">\n" +
    "        {{richRadioCtrl.value}}\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"sit-radio\">\n" +
    "        <ng-form ng-if=\"!(richRadioCtrl.readOnly || richRadioCtrl.ngReadonly)\" name=\"radioForm\" ng-class=\"{'isrequired' :(richRadioCtrl.validation.required) && richRadioCtrl.value===undefined}\">\n" +
    "            <table style=\"width:60%;\">\n" +
    "                <tr>\n" +
    "                    <td ng-repeat=\"val in richRadioCtrl.options\">\n" +
    "                        <label class=\"AppRejLabel\">\n" +
    "                            <input type='radio'\n" +
    "                                   name='{{richRadioCtrl.name}}'\n" +
    "                                   ng-model='richRadioCtrl.value'\n" +
    "                                   ng-required=\"richRadioCtrl.validation.required\"\n" +
    "                                   ng-value='val.value'\n" +
    "                                   ng-blur=\"richRadioCtrl.ngBlur()\"\n" +
    "                                   sit-change=\"richRadioCtrl.sitChange\"\n" +
    "                                   ng-disabled=\"richRadioCtrl.ngDisabled\"\n" +
    "                                   ng-focus=\"richRadioCtrl.ngFocus()\"\n" +
    "                                   ng-readonly=\"richRadioCtrl.ngReadOnly\"\n" +
    "                                   shared-model=\"true\"\n" +
    "                                   sit-form-input-validator\n" +
    "                                   style=\"vertical-align:top;z-index:10000;\" />\n" +
    "                            <em class=\"fa radio-off\">\n" +
    "                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24px\" height=\"24px\" viewBox=\"0 0 48 48\">\n" +
    "                                    <path d=\"M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z\" />\n" +
    "                                    <path d=\"M0 0h48v48H0z\" fill=\"none\" />\n" +
    "                                </svg>\n" +
    "                            </em>\n" +
    "                            <em class=\"fa radio-on\">\n" +
    "                                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24px\" height=\"24px\" viewBox=\"0 0 48 48\">\n" +
    "                                    <path d=\"M24 14c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0-10C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z\" style=\"fill:#197695 !important;\" />\n" +
    "                                    <path d=\"M0 0h48v48H0z\" fill=\"none\" />\n" +
    "                                </svg>\n" +
    "                            </em>\n" +
    "                            <span>{{val.label}}</span>\n" +
    "                        </label>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </table>\n" +
    "        </ng-form>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("common/widgets/electronicSignature/sit-es-browse-scenarios.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/electronicSignature/sit-es-browse-scenarios.html",
    "<div style=\"width:100%; height:100%;\">\n" +
    "    <table sit-table=\"esViewer\" class=\"table\" sit-config=\"vm.tableConfig\">\n" +
    "        <thead>\n" +
    "            <tr>\n" +
    "                <th>\n" +
    "                    <div class=\"tool-bar\">\n" +
    "                        <span sit-table-filterbar></span>\n" +
    "                        <span sit-table-button\n" +
    "                              sit-cmd-icon=\"Refresh\"\n" +
    "                              ng-click=\"vm.refreshData()\"\n" +
    "                              sit-label={{vm.refreshTitle}}></span>\n" +
    "                    </div>\n" +
    "                </th>\n" +
    "            </tr>\n" +
    "            <tr>\n" +
    "                <th style=\"width:26px\"></th>\n" +
    "                <th>{{vm.tableConfig.fields.NId.displayName}}</th>\n" +
    "                <th>{{vm.tableConfig.fields.Name.displayName}}</th>\n" +
    "                <th>{{vm.tableConfig.fields.Description.displayName}}</th>\n" +
    "            </tr>\n" +
    "        </thead>\n" +
    "\n" +
    "        <tbody>\n" +
    "            <tr ng-repeat-start=\"row in vm.tableConfig.data\" ng-class=\"{'st-selected':row.NId === vm.config.SelectedScenario}\">\n" +
    "                <td style=\"width:26px\" ng-if=\"row.expanded\" ng-click=\"row.expanded=false\"><em sit-mom-icon=\"{path:'common/icons/miscDownArrow16.svg', size: '16px'}\"></em></td>\n" +
    "                <td style=\"width:26px\" ng-if=\"!row.expanded\" ng-click=\"row.expanded=true\"><em sit-mom-icon=\"{path:'common/icons/miscRightArrow16.svg', size: '16px'}\"></em></td>\n" +
    "                <td>{{row.NId}}</td>\n" +
    "                <td>{{row.Name}}</td>\n" +
    "                <td>{{row.Description}}</td>\n" +
    "            </tr>\n" +
    "            <tr sit-freez ng-show=\"false\"></tr>\n" +
    "            <tr sit-freez ng-repeat-end ng-show=\"row.expanded\">\n" +
    "                <td colspan=\"8\">\n" +
    "\n" +
    "                    <div class=\"scenario-details-container\" ng-if=\"row.expanded\">\n" +
    "\n" +
    "                        <div ng-repeat=\"sig in row.SignatureConfigurations\" style=\"margin-left: 15px; height:36px; cursor: default;\">\n" +
    "\n" +
    "                            <div style=\"display:inline-table;\">\n" +
    "                                <em class=\"fa es-signer-badge\"  sit-mom-icon=\"{path:'common/icons/cmdUser24.svg', size: '16px'}\" ng-if=\"sig.Signer.Type=='SpecificUser'\"></em>\n" +
    "                                <em class=\"fa es-signer-badge\"  sit-mom-icon=\"{path:'common/icons/cmdCardId24.svg', size: '16px'}\" ng-if=\"sig.Signer.Type=='Role'\">\n" +
    "                                </em>\n" +
    "                                    <div style=\"display:inline-block; margin-top: -5px; margin-left: 5px;\">\n" +
    "                                        <div ng-if=\"sig.Signer.Type=='SpecificUser'\">\n" +
    "                                            <em class=\"es-record-detail-header\">{{'electronicSignature.user' | translate}}: </em> <em class=\"es-record-detail-label\">{{sig.Signer.Name}}</em>\n" +
    "                                        </div>\n" +
    "                                        <div ng-if=\"sig.Signer.Type=='Role'\">\n" +
    "                                            <em class=\"es-record-detail-header\">{{'electronicSignature.role' | translate}}: </em> <em class=\"es-record-detail-label\">{{sig.Signer.Name}}</em>\n" +
    "                                        </div>\n" +
    "                                        <div style=\"margin-top: -5px;\">\n" +
    "                                            <em class=\"es-record-detail-header\">{{'electronicSignature.reason' | translate}}: </em> <em class=\"es-record-detail-label\">{{sig.Reason}}</em>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </tbody>\n" +
    "\n" +
    "        <tfoot>\n" +
    "            <tr sit-table-pager></tr>\n" +
    "        </tfoot>\n" +
    "    </table>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/electronicSignature/sit-es-scenario-picker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/electronicSignature/sit-es-scenario-picker.html",
    "<div class=\"entity-picker-container\" ng-if=\"vm.isEnabled\">\n" +
    "    <div class=\"container-fluid\" style=\"width: 100%; height: 100%;\">\n" +
    "        <div data-internal-type=\"entity-picker-container\" id=\"entity-picker-container\" class=\"property-grid-input-group entity-picker-container\">\n" +
    "            <div ng-if =\"vm.mode === 'Horizontal'\" style=\"display: flex; width: 100%; height: 32px;\">\n" +
    "                <label class=\"es-scenario-label-horizontal\">{{'electronicSignature.scenarioConfiguration' | translate}}</label>\n" +
    "                <div style=\"display: flex; width: 100%; height: 32px;\">\n" +
    "                    <input type=\"text\"\n" +
    "                           class=\"es-scenario-picker-input validator-control\"\n" +
    "                           placeholder=\"{{'electronicSignature.pickerPlaceHolder' | translate}}\"\n" +
    "                           ng-model=\"vm.displayName\" \n" +
    "                           ng-readonly=\"vm.config.IsReadOnly===true\"\n" +
    "                           ng-class=\"{'readonly-bg-color': (vm.config.IsReadOnly===true)}\" />\n" +
    "                    <div class=\"btn property-grid-addon-icon\" style=\"position: relative !IMPORTANT; border: 1px solid #969696;\" ng-click=\"vm.browsScenarios(vm)\" \n" +
    "                         ng-disabled=\"vm.config.IsReadOnly===true || vm.ready===false\">\n" +
    "                        <em sit-mom-icon=\"{path: 'common/icons/cmdMore16.svg', size: '16px'}\"></em>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div ng-if=\"vm.mode === 'Vertical'\" style=\"width: 100%; height: 32px;\">\n" +
    "                <label class=\"es-scenario-label-vertical\">{{'electronicSignature.scenarioConfiguration' | translate}}</label>\n" +
    "                <div style=\"display: flex; width: 100%; height: 32px;\">\n" +
    "                    <input type=\"text\"\n" +
    "                           class=\"es-scenario-picker-input validator-control\"\n" +
    "                           placeholder=\"{{'electronicSignature.pickerPlaceHolder' | translate}}\"\n" +
    "                           ng-model=\"vm.displayName\" \n" +
    "                           ng-readonly=\"vm.config.IsReadOnly===true\"\n" +
    "                           ng-class=\"{'readonly-bg-color': (vm.config.IsReadOnly===true)}\" />\n" +
    "                    <div class=\"btn property-grid-addon-icon\" style=\"position: relative !IMPORTANT; border: 1px solid #969696;\" ng-click=\"vm.browsScenarios(vm)\" ng-disabled=\"vm.config.IsReadOnly===true || vm.ready===false\">\n" +
    "                        <em sit-mom-icon=\"{path: 'common/icons/cmdMore16.svg', size: '16px'}\"></em>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/electronicSignature/sit-rt-signatures-dialog.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/electronicSignature/sit-rt-signatures-dialog.html",
    "<div class=\"es-dialog-popup\">\n" +
    "    <sit-es-browse-signers sit-config=\"Dialog.templatedata.config\" ></sit-es-browse-signers>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/electronicSignature/sit-rt-signatures.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/electronicSignature/sit-rt-signatures.html",
    "<style>\n" +
    "    .sign-icon {\n" +
    "        width: 24px;\n" +
    "        height: 24px;\n" +
    "        left: -3px;\n" +
    "        top: 8px;\n" +
    "        position: relative;\n" +
    "    }\n" +
    "    .sign-status {\n" +
    "        width: 16px;\n" +
    "        height: 16px;\n" +
    "        left: 5px;\n" +
    "        top: -2px;\n" +
    "        position: relative;\n" +
    "    }\n" +
    "    .table-width {\n" +
    "        width: 100%\n" +
    "    }\n" +
    "</style>\n" +
    "\n" +
    "<div class=\"container-fluid\" ng-if=\"vm.isEnabled\">\n" +
    "    <button class=\"btn-default\" ng-click=\"vm.OpenDialog($event)\">\n" +
    "        <table id=\"ES_Instance_{{xxx.Id}}\" class=\"table-width\" ng-click=\"vm.Opened(isOpen, $index)\">\n" +
    "            <tr>\n" +
    "                <td width=\"45%\">\n" +
    "                    <div id=\"Sigico\" class=\"sign-icon pie image firer ie-background commentable\" alt=\"image\" systemname=\"./images/9daf15f8-46d9-4968-9a9d-cf9e2177ca3e.svg\" overlay=\"#464646\" ng-show=\"vm.dialogData.templatedata.config.items.Status==undefined || vm.dialogData.templatedata.config.items.Status=='Initial' || vm.dialogData.templatedata.config.items.Status=='InProgress'\">\n" +
    "                        <svg preserveAspectRatio=\"none\" width=\"20\" height=\"20\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
    "                            <path d=\"M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z\" style=\"fill:#464646 !important;\"></path>\n" +
    "                        </svg>\n" +
    "                    </div>\n" +
    "                    <div id=\"Status_{{xxx.Id}}\" class=\"sign-status pie image firer ie-background commentable\" alt=\"image\" systemname=\"./images/9daf15f8-46d9-4968-9a9d-cf9e2177ca3e.svg\" overlay=\"#464646\" ng-hide=\"vm.dialogData.templatedata.config.items.Status!='Rejected'\">\n" +
    "                        <svg preserveAspectRatio=\"none\" width=\"16\" height=\"16\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
    "                            <path d=\"M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z\" style=\"fill:#DC0000 !important;\"></path>\n" +
    "                        </svg>\n" +
    "                    </div>\n" +
    "                    <div id=\"Status_{{xxx.Id}}\" class=\"sign-status pie image firer ie-background commentable\" alt=\"image\" systemname=\"./images/9daf15f8-46d9-4968-9a9d-cf9e2177ca3e.svg\" overlay=\"#464646\" ng-hide=\"vm.dialogData.templatedata.config.items.Status!='Approved'\">\n" +
    "                        <svg preserveAspectRatio=\"none\" width=\"16\" height=\"16\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
    "                            <path d=\"M1671 566q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z\" style=\"fill:#0A9B00 !important;\"></path>\n" +
    "                        </svg>\n" +
    "                    </div>\n" +
    "                    <div id=\"Status_{{xxx.Id}}\" class=\"sign-status pie image firer ie-background commentable\" alt=\"image\" systemname=\"./images/9daf15f8-46d9-4968-9a9d-cf9e2177ca3e.svg\" overlay=\"#464646\" ng-hide=\"vm.dialogData.templatedata.config.items.Status!='Aborted'\">\n" +
    "                        <svg preserveAspectRatio=\"none\" width=\"16\" height=\"16\" viewBox=\"0 0 1792 1792\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
    "                            <path d=\"M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z\" style=\"fill:#EB780A !important;\"></path>\n" +
    "                        </svg>\n" +
    "                    </div>\n" +
    "                </td>\n" +
    "                <td width=\"50%\">\n" +
    "                    <span data-internal-type=\"text-container\" class=\"MainCommandActionLabel\">{{vm.buttonEStext}}</span>\n" +
    "\n" +
    "                </td>\n" +
    "                <td width=\"5%\">\n" +
    "                    <span data-internal-type=\"text-container\" class=\"badge\"> {{vm.dialogData.templatedata.config.signscollected}}/{{vm.dialogData.templatedata.config.signstocollect}}</span>\n" +
    "                </td>\n" +
    "            </tr>\n" +
    "        </table>\n" +
    "    </button>\n" +
    "\n" +
    "</div>");
}]);

angular.module("common/widgets/email/email.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/email/email.html",
    "<div ng-if=\"emailCtrl.readOnly || emailCtrl.ngReadonly\" class=\"label label-property-grid-control-readonly property-value-ellipsis\"> {{emailCtrl.value}} </div>\n" +
    "\n" +
    "<ng-form ng-if=\"!(emailCtrl.readOnly || emailCtrl.ngReadonly)\" name='emailForm' ng-class=\"{'isrequired' : (emailCtrl.validation.required) && emailCtrl.value===undefined}\">\n" +
    "    <div class='property-grid-input-group'>\n" +
    "        <input type='email'\n" +
    "               name='{{emailCtrl.value}}'\n" +
    "               ng-class=\"{'validator-control-invalid':((emailForm.$invalid && emailForm.$dirty) || (emailForm.$invalid && emailForm.$visited)),\n" +
    "               'validator-control':!((emailForm.$invalid && emailForm.$dirty) || (emailForm.$invalid && emailForm.$visited)),\n" +
    "               'ng-dirty':emailForm.$dirty}\"\n" +
    "               ng-model='emailCtrl.value'\n" +
    "               ng-required='emailCtrl.validation.required'\n" +
    "               ng-minlength='emailCtrl.validation.minlength'\n" +
    "               ng-maxlength='emailCtrl.validation.maxlength'\n" +
    "               ng-pattern='emailCtrl.validation.pattern'\n" +
    "               sit-form-input-validator\n" +
    "               ng-blur=\"emailCtrl.ngBlur()\"\n" +
    "               sit-change=\"emailCtrl.sitChange\"\n" +
    "               ng-disabled=\"emailCtrl.ngDisabled\"\n" +
    "               ng-focus=\"emailCtrl.ngFocus()\" />\n" +
    "    </div>\n" +
    "</ng-form>");
}]);

angular.module("common/widgets/entityPicker/entityPicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/entityPicker/entityPicker.html",
    "<div ng-if=\"entityPickerCtrl.readOnly || entityPickerCtrl.ngReadonly\" class=\"label-property-grid-control-readonly property-value-ellipsis\">\n" +
    "    {{entityPickerCtrl.readOnlyValue | entityPickrerFilter}}\n" +
    "</div>\n" +
    "<ng-form name=\"entityPickerForm\" ng-if=\"!(entityPickerCtrl.readOnly || entityPickerCtrl.ngReadonly)\" ng-class=\"{'isrequired' : (entityPickerCtrl.validation.required) && entityPickerCtrl.value===undefined}\">\n" +
    "    <div data-internal-type=\"entity-picker-container\" id=\"entity-picker-container\" class=\"property-grid-input-group property-grid-list entity-picker-container\">\n" +
    "        <div id=\"entity-picker-value\" ng-if=\"entityPickerCtrl.isLocalDatasource\">\n" +
    "            <input ng-required=\"entityPickerCtrl.required\"\n" +
    "                   ng-attr-id=\"{{entityPickerCtrl.id ? entityPickerCtrl.id + '.typeahead' : undefined}}\"\n" +
    "                   type=\"text\" ng-model=\"entityPickerCtrl.value\"\n" +
    "                   placeholder={{entityPickerCtrl.placeholder}}\n" +
    "                   class=\"entityPicker-control\"\n" +
    "                   uib-typeahead=\"entity as entity[entityPickerCtrl.selectedAttributeToDisplay] for entity in entityPickerCtrl.datasource | entityPickrerSearchFilter: $viewValue:entityPickerCtrl.attributeToSearch | limitTo:entityPickerCtrl.limit\"\n" +
    "                   typeahead-template-url={{entityPickerCtrl.templateUrl}}\n" +
    "                   typeahead-editable=entityPickerCtrl.editable\n" +
    "                   sit-form-input-validator=\"{{entityPickerCtrl.label}}\"\n" +
    "                   typeahead-on-select='entityPickerCtrl.onSelect($item, $model, $label)'\n" +
    "                   typeahead-wait-ms=\"entityPickerCtrl.waitTime\"\n" +
    "                   ng-class=\"{'validator-control-options': entityPickerCtrl.sitoption && ((entityPickerForm.$invalid && entityPickerForm.$dirty) || (entityPickerForm.$invalid && entityPickerForm.$visited)),\n" +
    "                    'validator-control-invalid':((entityPickerForm.$invalid && entityPickerForm.$dirty) || (entityPickerForm.$invalid && entityPickerForm.$visited)),\n" +
    "                    'validator-control':!((entityPickerForm.$invalid && entityPickerForm.$dirty) || (entityPickerForm.$invalid && entityPickerForm.$visited)),\n" +
    "                    'ng-dirty':entityPickerForm.$dirty}\"\n" +
    "                   ng-blur=\"entityPickerCtrl.ngBlur()\"\n" +
    "                   sit-change=\"entityPickerCtrl.sitChange\"\n" +
    "                   ng-disabled=\"entityPickerCtrl.ngDisabled\"\n" +
    "                   ng-focus=\"entityPickerCtrl.ngFocus()\"\n" +
    "                   autocomplete=\"off\"\n" +
    "                   ng-change=\"entityPickerCtrl.setDropDownHeight()\" />\n" +
    "        </div>\n" +
    "\n" +
    "        <div id=\"entity-picker-value\" ng-if=\"!entityPickerCtrl.isLocalDatasource\">\n" +
    "            <input ng-required=\"entityPickerCtrl.required\"\n" +
    "                   ng-attr-id=\"{{entityPickerCtrl.id ? entityPickerCtrl.id + '.typeahead' : undefined}}\"\n" +
    "                   type=\"text\" ng-model=\"entityPickerCtrl.value\"\n" +
    "                   placeholder={{entityPickerCtrl.placeholder}}\n" +
    "                   class=\"entityPicker-control\"\n" +
    "                   uib-typeahead=\"entity as entity[entityPickerCtrl.selectedAttributeToDisplay] for entity in entityPickerCtrl.datasource($viewValue)  | limitTo:entityPickerCtrl.limit\"\n" +
    "                   typeahead-template-url={{entityPickerCtrl.templateUrl}}\n" +
    "                   typeahead-editable=entityPickerCtrl.editable\n" +
    "                   sit-form-input-validator=\"{{entityPickerCtrl.label}}\"\n" +
    "                   typeahead-on-select='entityPickerCtrl.onSelect($item, $model, $label)'\n" +
    "                   typeahead-wait-ms=\"entityPickerCtrl.waitTime\"\n" +
    "                   ng-class=\"{'validator-control-options': entityPickerCtrl.sitoption && ((entityPickerForm.$invalid && entityPickerForm.$dirty) || (entityPickerForm.$invalid && entityPickerForm.$visited)),\n" +
    "                    'validator-control-invalid':((entityPickerForm.$invalid && entityPickerForm.$dirty) || (entityPickerForm.$invalid && entityPickerForm.$visited)),\n" +
    "                    'validator-control':!((entityPickerForm.$invalid && entityPickerForm.$dirty) || (entityPickerForm.$invalid && entityPickerForm.$visited)),\n" +
    "                    'ng-dirty':entityPickerForm.$dirty}\"\n" +
    "                   ng-blur=\"entityPickerCtrl.ngBlur()\"\n" +
    "                   sit-change=\"entityPickerCtrl.sitChange\"\n" +
    "                   ng-disabled=\"entityPickerCtrl.ngDisabled\"\n" +
    "                   ng-focus=\"entityPickerCtrl.ngFocus()\"\n" +
    "                   autocomplete=\"off\"\n" +
    "                   ng-change=\"entityPickerCtrl.setDropDownHeight()\" />\n" +
    "        </div>\n" +
    "        <div class=\"btn property-grid-addon-icon entity-dialog-btn\" ng-click=\"entityPickerCtrl.ngDisabled || entityPickerCtrl.showPopup()\" ng-hide=\"!entityPickerCtrl.sitoption\" ng-disabled=\"entityPickerCtrl.ngDisabled\">\n" +
    "            <em sit-mom-icon=\"entityPickerCtrl.cmdIcon\" ng-hide=\"!entityPickerCtrl.sitoption\" ng-disabled=\"entityPickerCtrl.ngDisabled\"></em>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</ng-form>\n" +
    "");
}]);

angular.module("common/widgets/entityPicker/popup-default-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/entityPicker/popup-default-template.html",
    "<div class=\"entity-picker-popup\">\n" +
    "    <sit-item-collection-viewer id=\"{{Dialog.modalid}}-item-colletion-viewer\" sit-data=\"Dialog.templatedata.data\" sit-options=\"Dialog.templatedata.options\"></sit-item-collection-viewer>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/entityPicker/samples/entity-picker-custom-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/entityPicker/samples/entity-picker-custom-template.html",
    "<a class=\"aClass\">\n" +
    "    <div class=\"mainContainer\">\n" +
    "        <div class=\"leftContainer\">\n" +
    "            <span class=\"highlighted\" bind-html-unsafe=\"match.model.name | typeaheadHighlight:query\"></span>\n" +
    "        </div>\n" +
    "        <div class=\"rightContainer\">\n" +
    "            <div class=\"rightRowContainer normalText\">\n" +
    "                <label> version: </label>\n" +
    "                <label bind-html-unsafe=\"match.model.version | typeaheadHighlight:query\"></label>\n" +
    "            </div>\n" +
    "            <div class=\"rightRowContainer normalText\">\n" +
    "                <label> product: </label>\n" +
    "                <label bind-html-unsafe=\"match.model.product | typeaheadHighlight:query\"></label>\n" +
    "            </div>\n" +
    "            <div class=\"rightRowContainer normalText\">\n" +
    "                <label> status: </label>\n" +
    "                <label bind-html-unsafe=\"match.model.status | typeaheadHighlight:query\"></label>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</a>");
}]);

angular.module("common/widgets/entityPicker/samples/index.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/entityPicker/samples/index.html",
    "<!doctype html>\n" +
    "<html ng-app=\"app\">\n" +
    "<head>\n" +
    "    <title data-ng-bind=\"title\">entityPicker Development</title>\n" +
    "    <link href=\"/common/styles/common-light.css\" rel=\"stylesheet\" />\n" +
    "</head>\n" +
    "<body>\n" +
    "    <style>\n" +
    "        .mainContainer {\n" +
    "            display: table;\n" +
    "            background-color: #eeeeee;\n" +
    "            width: 400px;\n" +
    "            height: 100px;\n" +
    "        }\n" +
    "\n" +
    "            .mainContainer:hover {\n" +
    "                border: solid;\n" +
    "                border-color: #2882a0;\n" +
    "                border-width: thin;\n" +
    "            }\n" +
    "\n" +
    "        .group {\n" +
    "            display: table-cell;\n" +
    "            text-align: center;\n" +
    "            border-style: solid;\n" +
    "            border-color: #808080;\n" +
    "            border-width: thin;\n" +
    "            width: 33%;\n" +
    "            height: 100px;\n" +
    "        }\n" +
    "\n" +
    "        .generalInfo {\n" +
    "            display: table-cell;\n" +
    "            text-align: center;\n" +
    "            vertical-align: middle;\n" +
    "            border-style: solid;\n" +
    "            border-color: #808080;\n" +
    "            border-width: thin;\n" +
    "            height: 100px;\n" +
    "        }\n" +
    "\n" +
    "        .leftContainer {\n" +
    "            display: table-cell;\n" +
    "            text-align: center;\n" +
    "            vertical-align: middle;\n" +
    "            height: 100px;\n" +
    "        }\n" +
    "\n" +
    "        .rightContainer {\n" +
    "            display: table-cell;\n" +
    "            height: 100px;\n" +
    "            padding-left: 60px;\n" +
    "        }\n" +
    "\n" +
    "        .topRightContainer {\n" +
    "            display: table-row;\n" +
    "            text-align: right;\n" +
    "            padding-bottom: 70px;\n" +
    "            table-layout: auto;\n" +
    "        }\n" +
    "\n" +
    "        .bottomRightContainer {\n" +
    "            display: table-row;\n" +
    "            text-align: right;\n" +
    "            vertical-align: bottom;\n" +
    "            height: 50%;\n" +
    "            table-layout: auto;\n" +
    "        }\n" +
    "\n" +
    "        .highlighted {\n" +
    "            font-family: 'Segoe UI';\n" +
    "            font-size: 16pt;\n" +
    "            font-weight: bold;\n" +
    "            color: #808080;\n" +
    "        }\n" +
    "\n" +
    "        .normalText {\n" +
    "            font-family: 'Segoe UI';\n" +
    "            font-size: 12pt;\n" +
    "            color: #808080;\n" +
    "        }\n" +
    "        ul {\n" +
    "            list-style-type: none;\n" +
    "            margin: 0;\n" +
    "            padding: 0;\n" +
    "        }\n" +
    "    </style>\n" +
    "    <script type=\"text/ng-template\" id=\"customTemplate.html\">\n" +
    "        <div class=\"mainContainer\">\n" +
    "            <div class=\"group\">\n" +
    "                <label class=\"normalText\">\n" +
    "                    {{match.model.product}}\n" +
    "                </label>\n" +
    "            </div>\n" +
    "            <div class=\"generalInfo\">\n" +
    "                <div class=\"leftContainer\">\n" +
    "                    <label class=\"highlighted\">\n" +
    "                        {{match.model.name}}\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "                <div class=\"rightContainer\">\n" +
    "                    <div class=\"topRightContainer\">\n" +
    "                        <label class=\"normalText\">\n" +
    "                            version: {{match.model.version}}\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                    <div>\n" +
    "                        <label class=\"normalText\">\n" +
    "                            status: {{match.model.status}}\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "    </script>\n" +
    "    <div class='container-fluid' ng-controller=\"entityPickerController\">\n" +
    "        <!--<input type=\"text\" ng-model=\"customSelected\" placeholder=\"Custom template\" typeahead=\"state for state in toto | filter:$viewValue | limitTo:8\" typeahead-template-url=\"customTemplate.html\" class=\"form-control\" typeahead-editable=\"false\">-->\n" +
    "        <sit-entity-picker sit-datasource=\"datasource\"\n" +
    "                           sit-template-url=\"'customTemplate.html'\"\n" +
    "                           sit-selected-attribute-to-display=\"selectedAttributeToDisplay\"\n" +
    "                           sit-selected-object=\"selectedObject\"\n" +
    "                           sit-limit=\"limit\"\n" +
    "                           sit-editable=\"editable\"\n" +
    "                           sit-required=\"required\"\n" +
    "                           sit-placeholder=\"placeholder\"\n" +
    "                           sit-id=\"'ep01'\" />\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <!-- Vendor Scripts -->\n" +
    "    <script src=\"/common/scripts/jquery-2.1.1.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular/angular.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular/angular-animate.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular/angular-route.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular/angular-sanitize.js\"></script>\n" +
    "    <script src=\"/common/scripts/bootstrap.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-ui/ui-bootstrap-tpls.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-ui-router.js\"></script>\n" +
    "    \n" +
    "    <script src=\"/common/scripts/angular-translate/translate.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-translate/service/default-interpolation.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-translate/service/handler-log.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-translate/service/loader-static-files.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-translate/service/loader-partial.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-translate/service/storage-key.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-translate/service/storage-local.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-translate/service/storage-cookie.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-translate/service/translate.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-translate/directive/translate-cloak.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-translate/directive/translate.js\"></script>\n" +
    "    <script src=\"/common/scripts/angular-translate/filter/translate.js\"></script>\n" +
    "    \n" +
    "\n" +
    "    <script src=\"/common/widgets/validator/sit-validator-mod.js\"></script>\n" +
    "    <script src=\"/common/widgets/validator/sit-validator-dir.js\"></script>\n" +
    "\n" +
    "    <!-- Bootstrapping -->\n" +
    "    <script src=\"/common/widgets/entityPicker/samples/app.js\"></script>\n" +
    "\n" +
    "    <!-- Property Grid Widget scripts -->\n" +
    "    <script src=\"/common/widgets/entityPicker/sit-entityPicker-mod.js\"></script>\n" +
    "    <script src=\"/common/widgets/entityPicker/sit-entityPicker-dir.js\"></script>\n" +
    "\n" +
    "</body>\n" +
    "\n" +
    "</html>\n" +
    "");
}]);

angular.module("common/widgets/entityPicker/typeahead-default-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/entityPicker/typeahead-default-template.html",
    "<a class=\"aClass\" style=\"width:auto !important\">\n" +
    "    <div>\n" +
    "        <span class=\"highlighted\" ng-bind-html=\"match.label | uibTypeaheadHighlight:query\">\n" +
    "        </span>\n" +
    "    </div>\n" +
    "</a>");
}]);

angular.module("common/widgets/fileUpload/file-upload.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/fileUpload/file-upload.html",
    "<div ng-show=\"uploadCtrl.readOnly || uploadCtrl.ngReadonly\" class=\"label-property-grid-control-readonly property-value-ellipsis\"> {{uploadCtrl.selectedFile.name}} </div>\n" +
    "<ng-form name=\"fileForm\" ng-hide=\"uploadCtrl.readOnly || uploadCtrl.ngReadonly\">\n" +
    "    <div>\n" +
    "        <span ng-transclude></span>\n" +
    "        <div class=\"textboxHolder\">            \n" +
    "            <span ng-show=\"uploadCtrl.currentPercentage!=='' && uploadCtrl.currentPercentage!=='100%'\"\n" +
    "                  class=\"btn btn-primary progressBar\" ng-style=\"{'width': uploadCtrl.currentPercentage}\">{{uploadCtrl.currentPercentage}}</span>\n" +
    "            <div class=\"form-control uploadSection\" tabindex=\"1\" ng-class=\"{'form-control-invalid':((fileForm.$invalid && fileForm.$dirty) || (fileForm.$invalid && fileForm.$visited))}\">\n" +
    "                <input type=\"text\" \n" +
    "                       class=\"showStatus\" \n" +
    "                       data-internal-type=\"fileStatus\" \n" +
    "                       title={{uploadCtrl.selectedFile.name}} \n" +
    "                       ng-model=\"uploadCtrl.uploadedFile.name\" \n" +
    "                       placeholder=\"{{uploadCtrl.selectedFile.name}}\" \n" +
    "                       ng-required=\"uploadCtrl.validation.required\"\n" +
    "                       sit-change=\"uploadCtrl.sitChange\" \n" +
    "                       ng-class=\"{'ng-dirty':fileForm.$dirty}\" \n" +
    "                       sit-form-input-validator readonly />\n" +
    "                <a class=\"upload-delete-button\" data-internal-type=\"deleteButton\" ng-show=\"uploadCtrl.isFileLoaded\" ng-click=\"uploadCtrl.removeFile($event)\" role=\"button\" title=\"{{'fileUploader.tooltip.remove'| translate}}\">\n" +
    "                    <em sit-mom-icon=\"uploadCtrl.deleteAction\" sit-class=\"upload-delete-fill\"></em>\n" +
    "                </a>\n" +
    "                <input type=\"file\" data-internal-type=\"fileInput\"\n" +
    "                       class=\"btn actionButton File\" style=\"display:none\" ng-model=\"uploadCtrl.selectedFile\" accept=\"{{uploadCtrl.accept}}\" ng-disabled=\"uploadCtrl.ngDisabled\">\n" +
    "                <a class=\"upload-button\" data-internal-type=\"uploadButton\" role=\"button\" title=\"{{'fileUploader.tooltip.browse'| translate}}\" ng-class=\"{disable:uploadCtrl.isFileLoaded}\" ng-disabled=\"uploadCtrl.ngDisabled\">\n" +
    "                    <em sit-mom-icon=\"uploadCtrl.openAction\" sit-class=\"upload-fill\" ng-class=\"{disable:uploadCtrl.isFileLoaded ||uploadCtrl.ngDisabled}\"></em>\n" +
    "                </a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</ng-form>");
}]);

angular.module("common/widgets/filter/sit-filter.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/filter/sit-filter.html",
    "<div class=\"filter-container\">\n" +
    "    <ng-form name=\"filterForm\">\n" +
    "        <div ng-if=\"FilterCtrl.userPrefId\">\n" +
    "            <div class=\"filter-commands-buttons\">\n" +
    "                <sit-command-bar sit-commands=\"FilterCtrl.commandButtons\" sit-layout=\"contextual\"></sit-command-bar>\n" +
    "            </div>\n" +
    "            <div>\n" +
    "                <label>{{'filterPanel.filterName' | translate}} :</label> {{FilterCtrl.filterData.filterName}}\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <table class=\"sit-filter-table\">\n" +
    "            <thead>\n" +
    "                <tr>\n" +
    "                    <td class=\"add-remove\"></td>\n" +
    "                    <td class=\"add-remove\"></td>\n" +
    "                    <td class=\"filter-group\" ng-if=\"FilterCtrl.allowGrouping\" ng-class=\"FilterCtrl.isGroupingEnabled === true ? 'enabled' : 'disabled'\" ng-click=\"FilterCtrl.group()\">\n" +
    "                        <span title=\"{{'common.group' | translate}}\">\n" +
    "                            <em sit-class=\"pl-svg-icon\" sit-mom-icon=\"FilterCtrl.linkIcon\" class=\"link-unlink-icon\"></em>\n" +
    "                        </span>\n" +
    "                    </td>\n" +
    "                    <td ng-if=\"FilterCtrl.lastGrpId !== -1\" class=\"grp\"> </td>\n" +
    "                    <td class=\"logical-operator\">{{'common.and-or' | translate}}</td>\n" +
    "                    <td class=\"field\">{{'common.field' | translate}}</td>\n" +
    "                    <td class=\"operator\">{{'common.operator' | translate}}</td>\n" +
    "                    <td>{{'common.value' | translate}}</td>\n" +
    "                    <td></td>\n" +
    "                </tr>\n" +
    "            </thead>\n" +
    "            <tbody>\n" +
    "                <tr ng-repeat=\"clause in FilterCtrl.clauses\">\n" +
    "                    <td class=\"add-remove\" ng-click=\"FilterCtrl.addClause(clause)\"><em sit-class=\"pl-svg-icon\" sit-mom-icon=\"FilterCtrl.addBtn\"></em></td>\n" +
    "                    <td class=\"add-remove\" ng-click=\"FilterCtrl.removeClause(clause)\"><em sit-class=\"pl-svg-icon\" sit-mom-icon=\"FilterCtrl.minusBtn\"></em></td>\n" +
    "                    <td class=\"filter-group\" ng-if=\"FilterCtrl.allowGrouping\" ng-init=\"clause.index = $index\">\n" +
    "                        <div class=\"custom-checkbox\">\n" +
    "                            <input type=\"checkbox\" ng-model=\"clause.selected\" ng-change=\"FilterCtrl.clauseSelectionChange()\" />\n" +
    "                            <span class=\"checkbox-match\"></span>\n" +
    "                        </div>\n" +
    "                    </td>\n" +
    "                    <td ng-if=\"FilterCtrl.lastGrpId !== -1\" class=\"{{clause.grpClass}}\">\n" +
    "                        <span ng-if=\"clause.grpClass && clause.grpClass.indexOf('grp-start') !== -1\" ng-click=\"FilterCtrl.unGroup(clause.grpId)\" title=\"{{'common.ungroup' | translate}}\" class=\"ungrp\">\n" +
    "                            <em sit-class=\"pl-svg-icon\" sit-mom-icon=\"FilterCtrl.unLinkIcon\" class=\"link-unlink-icon\"></em>\n" +
    "                        </span>\n" +
    "                    </td>\n" +
    "                    <td class=\"logical-operator\">\n" +
    "                        <select ng-model=\"clause.andOr\" ng-hide=\"$index===0\">\n" +
    "                            <option ng-repeat=\"option in FilterCtrl.operatorOptions\" value=\"{{option.id}}\">{{option.value}}</option>\n" +
    "                        </select>\n" +
    "                    </td>\n" +
    "\n" +
    "                    <td class=\"field\">\n" +
    "                        <select ng-model=\"clause.filterField\"\n" +
    "                                ng-options=\"filterField.displayName || filterField.field for filterField in FilterCtrl.sitFilterFields\"\n" +
    "                                ng-change=\"FilterCtrl.fieldChanged('{{clause.filterField.type}}', clause)\"></select>\n" +
    "                    </td>\n" +
    "                    <td class=\"operator\">\n" +
    "                        <select ng-model=\"clause.operator\"\n" +
    "                                ng-change=\"FilterCtrl.operatorChanged(clause)\"\n" +
    "                                ng-options=\"operator.id as operator.display for operator in FilterCtrl.getOperators(clause)\"></select>\n" +
    "                    </td>\n" +
    "\n" +
    "                    <td class=\"value-field\" ng-switch=\"clause.widget\" ng-if=\"!(clause.operator==='isnull' || clause.operator==='isnotnull' || clause.operator==='any' || clause.operator==='notany') && !clause.showValueField\">\n" +
    "                        <sit-numeric ng-switch-when=\"sit-numeric\"\n" +
    "                                     ng-readonly=\"false\"\n" +
    "                                     data-sit-value=\"clause.value\"\n" +
    "                                     data-sit-validation=\"clause.validation\"></sit-numeric>\n" +
    "                        <sit-text ng-switch-when=\"sit-text\"\n" +
    "                                  ng-readonly=\"false\"\n" +
    "                                  data-sit-value=\"clause.value\"\n" +
    "                                  data-sit-validation=\"clause.validation\"></sit-text>\n" +
    "                        <sit-select ng-switch-when=\"sit-select\"\n" +
    "                                    ng-readonly=\"false\"\n" +
    "                                    data-sit-value=\"clause.selectValue\"\n" +
    "                                    data-sit-options=\"clause.filterField.selectValues\"\n" +
    "                                    data-sit-to-keep=\"'id'\"\n" +
    "                                    data-sit-to-display=\"'name'\"\n" +
    "                                    data-sit-validation=\"clause.validation\"></sit-select>\n" +
    "                        <sit-entity-picker ng-switch-when=\"sit-entity-picker\"\n" +
    "                                           ng-readonly=\"false\"\n" +
    "                                           data-sit-selected-object=\"clause.selectValue\"\n" +
    "                                           data-sit-datasource=\"clause.filterField.selectValues\"\n" +
    "                                           data-sit-validation=\"clause.validation\"\n" +
    "                                           data-sit-placeholder=\"clause.placeHolder\">\n" +
    "                        </sit-entity-picker>\n" +
    "                        <sit-multi-select ng-switch-when=\"sit-multi-select\"\n" +
    "                                          data-sit-options=\"clause.filterField.selectValues\"\n" +
    "                                          data-sit-selected-string=\"clause.value\"\n" +
    "                                          data-sit-split-list=\"true\"\n" +
    "                                          data-sit-placeholder=\"FilterCtrl.multiSelectPlaceHolder\"\n" +
    "                                          data-sit-validation=\"clause.validation\"></sit-multi-select>\n" +
    "                        <sit-checkbox ng-switch-when=\"sit-checkbox\"\n" +
    "                                      ng-readonly=\"false\"\n" +
    "                                      data-sit-value=\"clause.checkValue\"\n" +
    "                                      data-sit-validation=\"clause.validation\"></sit-checkbox>\n" +
    "                        <sit-datepicker ng-switch-when=\"sit-datepicker\"\n" +
    "                                        ng-readonly=\"false\"\n" +
    "                                        data-sit-value=\"clause.value\"\n" +
    "                                        data-sit-append-to-body=\"true\"\n" +
    "                                        data-sit-format=\"FilterCtrl.dateFormat\"\n" +
    "                                        data-sit-validation=\"clause.validation\"></sit-datepicker>\n" +
    "                        <sit-date-time-picker ng-switch-when=\"sit-date-time-picker\"\n" +
    "                                              ng-readonly=\"false\"\n" +
    "                                              sit-value=\"clause.value\"\n" +
    "                                              sit-format=\"FilterCtrl.dateTimeOptions.format\"\n" +
    "                                              sit-show-seconds=\"FilterCtrl.dateTimeOptions.showSeconds\"\n" +
    "                                              sit-validation=\"clause.validation\"></sit-date-time-picker>\n" +
    "                    </td>\n" +
    "\n" +
    "\n" +
    "                    <td class=\"value-field\" ng-if=\"!(clause.operator==='isnull' || clause.operator==='isnotnull' || clause.operator==='any' || clause.operator==='notany') && clause.showValueField \">\n" +
    "\n" +
    "                        <sit-select ng-readonly=\"false\"\n" +
    "                                    data-sit-value=\"clause.selectValueColumn\"\n" +
    "                                    data-sit-options=\"clause.filterField.selectValueColumns\"\n" +
    "                                    data-sit-to-keep=\"'id'\"\n" +
    "                                    data-sit-to-display=\"'name'\"\n" +
    "                                    data-sit-validation=\"clause.validation\"></sit-select>\n" +
    "\n" +
    "                    </td>\n" +
    "\n" +
    "                    <td class=\"match-case\" ng-if=\"FilterCtrl.isMatchCaseShown\">\n" +
    "                        <div class=\"custom-checkbox\" ng-if=\"!(clause.operator==='isnull' || clause.operator==='isnotnull' || clause.operator==='any' || clause.operator==='notany') && clause.filterField.type==='string' && clause.filterField.showMatchCase!== false && !FilterCtrl.sitFilterServerSide && FilterCtrl.isMatchCaseShown\">\n" +
    "                            <input type=\"checkbox\" ng-model=\"clause.matchCase\" />\n" +
    "                            <span class=\"checkbox-match\">{{'common.match-case' | translate}}</span>\n" +
    "                        </div>\n" +
    "                    </td>\n" +
    "                    <td class=\"value-icon\" ng-if=\"!(clause.operator==='isnull' || clause.operator==='isnotnull' || clause.operator==='any' || clause.operator==='notany') && clause.filterField.selectValueColumns.length > 0\" ng-click=\"FilterCtrl.canShowValueField(clause)\">\n" +
    "                        <em sit-class=\"pl-svg-icon\" sit-mom-icon=\"FilterCtrl.constBtn\" ng-class=\"!clause.showValueField === true ? 'switch-button switch-button-select' : 'switch-button'\" title=\"{{'filter.constant' | translate}}\"></em>\n" +
    "                    </td>\n" +
    "                    <td class=\"value-icon\" ng-if=\"!(clause.operator==='isnull' || clause.operator==='isnotnull' || clause.operator==='any' || clause.operator==='notany') && clause.filterField.selectValueColumns.length > 0\" ng-click=\"FilterCtrl.canShowValueColumnField(clause)\">\n" +
    "                        <em sit-class=\"pl-svg-icon\" sit-mom-icon=\"FilterCtrl.listBtn\" ng-class=\"clause.showValueField === true ? 'switch-button switch-button-select' : 'switch-button'\" title=\"{{'filter.field' | translate}}\"></em>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </tbody>\n" +
    "        </table>\n" +
    "       \n" +
    "            <div class=\"pl-icon-link filter-add\" ng-click=\"FilterCtrl.addClause();\">\n" +
    "                <div class=\"pl-icon-link-container\" sit-class=\"pl-icon-link-svg\" sit-mom-icon=\"FilterCtrl.addBtn\"></div>\n" +
    "                <div><a href=\"\" class=\"pl-simple-link\"> {{'filter.add-new-clause' | translate}}</a></div>\n" +
    "            </div>       \n" +
    "\n" +
    "        <br />\n" +
    "        <button ng-if=\"!FilterCtrl.sitHideApplyReset\" ng-click=\"FilterCtrl.reset();\" class=\"sit-filter-button-reset\">{{'common.reset' | translate}}</button>\n" +
    "        <button ng-if=\"!FilterCtrl.sitHideApplyReset\" ng-click=\"FilterCtrl.apply();\" ng-disabled=\"filterForm.$invalid\" class=\"sit-filter-button-apply\">{{'common.apply' | translate}}</button>\n" +
    "    </ng-form>\n" +
    "</div>");
}]);

angular.module("common/widgets/filterBar/filter-bar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/filterBar/filter-bar.html",
    "<div id=\"filterBarContainer\" data-internal-type=\"filterbarcontainer\" class=\"filter-bar-holder\" ng-if=\"filterBarCtrl.showFilterBar\">\n" +
    "    <sit-command-bar sit-commands=\"filterBarCtrl.commandBarData\" sit-layout=\"contextual\">\n" +
    "    </sit-command-bar>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/filterPanel/save-filter-panel.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/filterPanel/save-filter-panel.html",
    "<div class=\"sit-filter-panel-container\">\n" +
    "    <sit-property-grid sit-id=\"filterPanelSaveForm\"\n" +
    "                       sit-layout=\"Vertical\"\n" +
    "                       sit-type=\"Fixed\"\n" +
    "                       sit-mode=\"edit\"\n" +
    "                       sit-state-change=\"Dialog.templatedata.onValidityChangeCallback\"\n" +
    "                       sit-columns=\"1\">\n" +
    "\n" +
    "        <sit-property sit-widget=\"sit-text\" sit-value=\"Dialog.templatedata.name.value\" sit-placeholder=\"Dialog.templatedata.name.placeholder\"\n" +
    "                      sit-validation=\"Dialog.templatedata.name.validation\">{{'filterPanel.name'| translate}}:\n" +
    "        </sit-property>\n" +
    "\n" +
    "        <sit-property sit-widget=\"sit-textarea\" sit-value=\"Dialog.templatedata.description.value\"\n" +
    "                      sit-placeholder=\"Dialog.templatedata.description.placeholder\">{{'filterPanel.description'| translate}}:\n" +
    "        </sit-property>\n" +
    "    </sit-property-grid>\n" +
    "</div>");
}]);

angular.module("common/widgets/filterPanel/sit-filter-panel.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/filterPanel/sit-filter-panel.html",
    "<div id=\"filter-panel\" class=\"simple-filter-panel\">\n" +
    "    <div class=\"header\">\n" +
    "        <div class=\"header-text\">\n" +
    "            {{'filterPanel.title' | translate}}\n" +
    "        </div>\n" +
    "        <div class=\"filter-panel-close-btn\">\n" +
    "            <div class=\"filter-panel-close-img filter-close-button\"\n" +
    "                 sit-class=\"filter-close-button\"\n" +
    "                 sit-mom-icon=\"filterPanelCtrl.closeIcon\"\n" +
    "                 ng-click=\"filterPanelCtrl.close()\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"filters\" class=\"simple-filter-clauses\">\n" +
    "        <div class=\"filter-commands-buttons\" ng-if=\"filterPanelCtrl.userPrefId && filterPanelCtrl.userPrefId !== '' && filterPanelCtrl.userPrefId !== undefined\">\n" +
    "            <sit-command-bar sit-commands=\"filterPanelCtrl.commandButtons\" sit-layout=\"contextual\"></sit-command-bar>\n" +
    "        </div>\n" +
    "\n" +
    "        <sit-property-grid sit-id=\"simple-filter-name\" sit-layout=\"Vertical\" sit-type=\"\" sit-mode=\"view\">\n" +
    "            <sit-property sit-id=\"filterName\" sit-widget=\"sit-text\" sit-value=\"filterPanelCtrl.filterData.filterName\">{{'filterPanel.filterName' | translate}}:</sit-property>\n" +
    "        </sit-property-grid>\n" +
    "\n" +
    "        <sit-property-grid sit-id=\"simple-filters\" sit-layout=\"Vertical\" sit-type=\"\" sit-mode=\"edit\">\n" +
    "            <sit-property ng-repeat=\"filter in filterPanelCtrl.filterData.filterClauses\" sit-id=\"{{filter.id}}\" ng-if=\"filter.widget\"\n" +
    "                          sit-widget=\"{{filter.widget}}\"\n" +
    "                          sit-value=\"filter.value\"\n" +
    "                          sit-options=\"filter.options\"\n" +
    "                          sit-to-display=\"filter.toDisplay\"\n" +
    "                          sit-to-keep=\"filter.toKeep\"\n" +
    "                          sit-change=\"filter.onChange\"\n" +
    "                          sit-widget-attributes=\"filter.widgetAttributes\"\n" +
    "                          sit-selected-string=\"filter.value\">{{filter.displayName}}:</sit-property>\n" +
    "        </sit-property-grid>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"action-button-footer\">\n" +
    "        <div class=\"action-buttons\">\n" +
    "            <button class=\"bottom-action-button\" title=\"{{'filterPanel.reset' | translate}}\" ng-click=\"filterPanelCtrl.reset()\">\n" +
    "                <span data-internal-type=\"text-container\">{{'filterPanel.reset' | translate}}</span>\n" +
    "            </button>\n" +
    "            <button class=\"bottom-action-button last-action-button\" title=\"{{'filterPanel.apply' | translate}}\" ng-click=\"filterPanelCtrl.apply(filterPanelCtrl.filterData.filterClauses)\">\n" +
    "                <span data-internal-type=\"text-container\">{{'filterPanel.apply' | translate}}</span>\n" +
    "            </button>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/flow/directives/toolbar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/flow/directives/toolbar.html",
    "<div class='sit-flow-toolbar-container'>\n" +
    "\n" +
    "    <div class='sit-flow-toolbar'>\n" +
    "        <span id=\"btnRefresh\" class='fa fa-refresh sit-flow-clickable sit-flow-toolbar-element' ng-click='refresh()' title='Refresh' ng-show='sitShowRefresh'></span>\n" +
    "        <span id=\"btnAutoGenerationAll\" class='vm vm-generate-big-block-phase sit-flow-clickable sit-flow-toolbar-element' ng-click='autoGenerate()' title='Auto-generate' ng-show='sitShowAutogenerate'></span>\n" +
    "        <span id=\"btnUndo\" class='fa fa-reply sit-flow-clickable sit-flow-toolbar-element' ng-click='undo()' data-ng-show='canUndo' title='Undo'></span>\n" +
    "        <span id=\"btnRedo\" class='fa fa-share sit-flow-clickable sit-flow-toolbar-element' ng-click='redo()' data-ng-show='canRedo' title='Redo'></span>\n" +
    "        <span id=\"btnEditElement\" class='fa fa-pencil sit-flow-clickable sit-flow-toolbar-element' ng-click='edit()' data-ng-show='canEdit' title='Edit'></span>\n" +
    "        <span id=\"btnRemoveElement\" class='fa fa-trash sit-flow-clickable sit-flow-toolbar-element' ng-click='remove()' data-ng-show='canRemove' title='Remove'></span>\n" +
    "        <span id=\"btnBringToFront\" class='vm vm-bring-to-front sit-flow-clickable sit-flow-toolbar-element' ng-click='bringToFront()' title='Bring To Front' ng-show='canBringToFront'></span>\n" +
    "        <span id=\"btnSendToBack\" class='vm vm-send-to-back sit-flow-clickable sit-flow-toolbar-element' ng-click='sendToBack()' title='Send To Back' ng-show='canSendToBack'></span>\n" +
    "        <span id=\"btnPan\" class='fa fa-arrows sit-flow-clickable sit-flow-toolbar-element' ng-class='{\"sit-flow-toolbar-toggle-down\": panChecked, \"sit-flow-toolbar-toggle-up\": !panChecked}' ng-click='togglePan()' title='Pan' ng-show='sitShowPan'></span>\n" +
    "        <span id=\"btnZoomIn\" class='fa fa-search-plus sit-flow-clickable sit-flow-toolbar-element' ng-click='zoomin()' title='Zoom In' ng-show='sitShowZoom'></span>\n" +
    "        <span id=\"btnZoomOut\" class='fa fa-search-minus sit-flow-clickable sit-flow-toolbar-element' ng-click='zoomout()' title='Zoom Out' ng-show='sitShowZoom'></span>\n" +
    "        <span id=\"btnZoomToFit\" class='vm vm-shrink-to-fit sit-flow-clickable sit-flow-toolbar-element' ng-click='zoomfit()' title='Zoom To Fit' ng-show='sitShowZoom'></span>\n" +
    "        <span id=\"btnSaveBB\" class='fa fa-save sit-flow-clickable sit-flow-toolbar-element' ng-click='save()' title='Save' ng-show='sitShowSave'></span>\n" +
    "        <span id=\"btnRenameBB\" class='fa fa-pencil sit-flow-clickable sit-flow-toolbar-element' ng-click='rename()' title='Rename' ng-show='sitShowRename'></span>\n" +
    "        <span id=\"btnSettings\" class='fa fa-cog sit-flow-clickable sit-flow-toolbar-element' ng-click='editSettings()' title='Settings' ng-show='sitShowSettings'></span>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/flow/directives/toolbox.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/flow/directives/toolbox.html",
    "<div id=\"toolbox\" class='toolbox'>\n" +
    "    <div class='sit-flow-toolbox-content'>\n" +
    "        <div data-ng-repeat='block in blocks' class='sit-flow-toolbox-group-background'>\n" +
    "            <div data-ng-click='block.Collapsed= !block.Collapsed' ng-show='block[0].Group!= \"\"' class='sit-flow-toolbox-group-header'>\n" +
    "                <img ng-if=\"!block.Collapsed\" data-ng-src=\"common/icons/miscDownArrow16.svg\" width=\"16\" height=\"16\" alt=\"Down Arrow\">\n" +
    "                <img ng-if=\"block.Collapsed\" data-ng-src=\"common/icons/miscRightArrow16.svg\" width=\"16\" height=\"16\" alt=\"Down Right\">\n" +
    "                <span name='lnk_{{block[0].Group}}' class='sit-flow-toolbox-group-label'>{{block[0].Group}}</span>\n" +
    "            </div>\n" +
    "            <div data-ng-hide='block.Collapsed' class='sit-flow-toolbox-group-content'>\n" +
    "                <div id='{{item.Type}}' sit-flow-toolbox-drag-on-click sit-flow-toolbox-draggable ng-repeat='item in block' class='sit-flow-toolbox-item' ng-class='{\"sit-flow-toolbox-item-list\" : sitMode == \"list\", \"sit-flow-toolbox-item-tiles\" : sitMode == \"tiles\"}'>\n" +
    "                    <div sit-flow-toolbox-icon title=''> </div>\n" +
    "                    <div class='sit-flow-toolbox-item-label' ng-show='sitMode == \"list\"'>{{item.Label}}</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/flyout/samples/flyout-dev-tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/flyout/samples/flyout-dev-tpl.html",
    "<div class=\"container\" ng-controller=\"DialogDevController as dDevCtrl\">\n" +
    "\n" +
    "    <button id=\"showDialogCenteredModal\" class=\"btn btn-primary btn-lg\" ng-click=\"dDevCtrl.showPopup1Center()\">\n" +
    "        Show Dialog Centered Modal\n" +
    "    </button>\n" +
    "\n" +
    "    <button id=\"showDialogCenteredModal2\" class=\"btn btn-primary btn-lg\" ng-click=\"dDevCtrl.showPopup2Center()\">\n" +
    "        Show Dialog Centered Modal 2\n" +
    "    </button>\n" +
    "\n" +
    "    <button id=\"bottomFlyout\" class=\"btn btn-lg btn-info\" data-sit-flyout data-sit-templateuri=\"common/widgets/flyout/samples/sit-flyout-template.html\" data-sit-placement=\"bottom\">Bottom Template</button>\n" +
    "    <button class=\"btn btn-lg btn-info\" data-sit-flyout data-sit-templateuri=\"common/widgets/flyout/samples/sit-flyout-template.html\" data-sit-placement=\"right\">Right Template</button>\n" +
    "    <button class=\"btn btn-lg btn-info\" data-sit-flyout data-sit-templateuri=\"common/widgets/flyout/samples/sit-flyout-template.html\" data-sit-placement=\"left\">Left Template</button>\n" +
    "    <button class=\"btn btn-lg btn-info\" data-sit-flyout data-sit-templateuri=\"common/widgets/flyout/samples/sit-flyout-template.html\" data-sit-placement=\"top\">Top Template</button>\n" +
    "    <button class=\"btn btn-lg btn-info\" data-sit-flyout data-sit-templateuri=\"common/widgets/flyout/samples/sit-flyout-template.html\" data-sit-placement=\"auto\">Auto Template</button>\n" +
    "\n" +
    "\n" +
    "    <button class=\"btn btn-lg btn-info\" data-sit-flyout data-sit-templateuri=\"QA/1559/sit-flyout-template2.html\" data-sit-templatedata=\"currentUser\" data-sit-placement=\"right\">Template</button>\n" +
    "\n" +
    "\n" +
    "    <sit-dialog sit-title=\"dDevCtrl.dialogTitle\"\n" +
    "                sit-templatedata='currentUser'\n" +
    "                sit-templateuri=\"dDevCtrl.dialogTemplateUri\"\n" +
    "                sit-modalid=\"popup1\"\n" +
    "                sit-buttons='dDevCtrl.buttonsList'>\n" +
    "    </sit-dialog>\n" +
    "    <sit-dialog sit-title=\"dDevCtrl.dialogTitleModify\"\n" +
    "                sit-templatedata='dDevCtrl.dialogData2'\n" +
    "                sit-templateuri=\"dDevCtrl.dialogTemplateUriModify\"\n" +
    "                sit-modalid=\"popup2\"\n" +
    "                sit-buttons='dDevCtrl.buttonsList2'>\n" +
    "    </sit-dialog>\n" +
    "\n" +
    "    <button class=\"btn btn-lg btn-info\" data-sit-flyout data-sit-templateuri=\"common/widgets/flyout/samples/sit-flyout-template.html\" data-sit-placement=\"auto\">Auto Template</button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/flyout/samples/flyout-dev-view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/flyout/samples/flyout-dev-view.html",
    "<div style=\"margin-left:50px; text-align: left;  vertical-align: top; \">\n" +
    "    <ng-include src=\"'/common/widgets/flyout/samples/flyout-dev-tpl.html'\" />\n" +
    "</div>");
}]);

angular.module("common/widgets/flyout/samples/flyout-dev.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/flyout/samples/flyout-dev.html",
    "<!DOCTYPE html>\n" +
    "<html data-ng-app=\"app\">\n" +
    "<head>\n" +
    "    <title data-ng-bind=\"title\">Flyout Development</title>\n" +
    "    <meta charset=\"utf-8\" />\n" +
    "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge, chrome=1\" />\n" +
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no\" />\n" +
    "\n" +
    "    <link href=\"../../../styles/common-dark.css\" rel=\"stylesheet\" />\n" +
    "\n" +
    "    <style>\n" +
    "        html, body {\n" +
    "            overflow: auto !important;\n" +
    "        }\n" +
    "    </style>\n" +
    "</head>\n" +
    "\n" +
    "<body ng-controller=\"flyoutDevController\">\n" +
    "\n" +
    "    <!-- UI-ROUTER EXAMPLE -->\n" +
    "    <div>\n" +
    "        <div style=\"height:350px\"></div>\n" +
    "        <p>Current User: {{currentUser}}</p>\n" +
    "        <a href=\"#\" class=\"btn btn-lg btn-info\" data-sit-flyout data-templateuri=\"sit-flyout-template.html\" data-placement=\"bottom\">Bottom placement Template 1</a>\n" +
    "        <button class=\"btn btn-lg btn-info\" data-sit-flyout data-templateuri=\"sit-flyout-template2.html\" data-templatedata=\"currentUser\" data-placement=\"auto\">Auto placement Template 2</button>\n" +
    "\n" +
    "    </div>\n" +
    "    <!-- END UI-ROUTER EXAMPLE -->\n" +
    "    <!-- Vendor Scripts -->\n" +
    "    <script src=\"../../../scripts/jquery-2.1.1.js\"></script>\n" +
    "    <script src=\"../../../scripts/angular/angular.js\"></script>\n" +
    "    <script src=\"../../../scripts/angular/angular-animate.js\"></script>\n" +
    "    <script src=\"../../../scripts/angular/angular-route.js\"></script>\n" +
    "    <script src=\"../../../scripts/angular/angular-sanitize.js\"></script>\n" +
    "    <script src=\"../../../scripts/bootstrap.js\"></script>\n" +
    "    <script src=\"../../../scripts/angular-ui/ui-bootstrap-tpls.js\"></script>\n" +
    "    <script src=\"../../../scripts/angular-ui-router.js\"></script>\n" +
    "\n" +
    "    <!-- Bootstrapping -->\n" +
    "    <script src=\"./flyout-dev-app.js\"></script>\n" +
    "\n" +
    "    <!-- Test Data -->\n" +
    "    <!-- Flyout Widget scripts -->\n" +
    "    <script src=\"../sit-flyout-mod.js\"></script>\n" +
    "    <script src=\"../sit-flyout-svc.js\"></script>\n" +
    "    <script src=\"../sit-flyout-dir.js\"></script>\n" +
    "\n" +
    "</body>\n" +
    "\n" +
    "</html>");
}]);

angular.module("common/widgets/flyout/samples/sit-flyout-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/flyout/samples/sit-flyout-template.html",
    "<p>This is a flyout with a really really really really really long text</p>\n" +
    "");
}]);

angular.module("common/widgets/flyout/samples/sit-flyout-template2.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/flyout/samples/sit-flyout-template2.html",
    "<p>This is an other template with binding</p>\n" +
    "Current User <input type=\"text\" ng-model=\"templatedata\" />\n" +
    "");
}]);

angular.module("common/widgets/fullscreenDialog/fullscreen-context.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/fullscreenDialog/fullscreen-context.html",
    "<div class=\"context-container\">\n" +
    "    <button data-internal-type=\"menuButton\" class=\"context-dropdown\" ng-click=\"contextCtrl.toggleContextMenu($event)\"  title=\"{{contextCtrl.tooltip}}\">\n" +
    "        <span>\n" +
    "            <em class=\"fa {{contextCtrl.menuIcon}} fa-lg\" sit-mom-icon=\"contextCtrl.svgIcon\" ng-class= \"{momIcon: contextCtrl.svgIcon}\"></em>\n" +
    "            <em class=\"caret\"></em>\n" +
    "        </span>\n" +
    "    </button>\n" +
    "    <div data-internal-type=\"contextMenu\" class=\"context-menu-container context-menu-hide\">\n" +
    "        <div data-internal-type=\"menuDropdownIcon\" class=\"context-menu-icon\">\n" +
    "            <em class=\"fa fa-caret-up fa-2x\"></em>\n" +
    "        </div>\n" +
    "        <div data-internal-type=\"contextMenuPopup\" class=\"context-menu drop-shadow\">\n" +
    "            <ul>\n" +
    "                <li ng-repeat=\"context in contextCtrl.contextConfig.contexts\">\n" +
    "                    <div class=\"context-menu-item\">\n" +
    "                        <div class=\"context-menu-item-icon\">\n" +
    "                        <em class=\"fa {{context.icon}}\" sit-mom-icon =\"{path: context.svgIcon, size: '16px' }\" ng-class= \"{momIcon: context.svgIcon}\"></em>\n" +
    "                        </div>\n" +
    "                        <div class=\"context-menu-item-text\" title=\"{{context.tooltip}}\">{{context.label}}{{context.separator}} {{context.value}}</div>\n" +
    "                    </div>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/fullscreenDialog/fullscreen-dialog.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/fullscreenDialog/fullscreen-dialog.html",
    "<div class=\"background-container\"></div>\n" +
    "<div class=\"sit-fullscreen-header-container\">\n" +
    "    <div class=\"fullscreen-transclude-container\" style=\"width:100%;height:100%;\" ng-transclude></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/fullscreenDialog/fullscreen-header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/fullscreenDialog/fullscreen-header.html",
    "<div class=\"header-container\">\n" +
    "    <div class=\"transclude-container\" ng-transclude>\n" +
    "    </div>\n" +
    "    <div ng-click=\"headerCtrl.sitCloseCallback()\" title=\"{{'dialog.close'|translate}}\" class=\"close-button-container\">\n" +
    "        <span class=\"fa fa-times fa-lg\" aria-hidden=\"true\"></span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/fullscreenDialog/fullscreen-title.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/fullscreenDialog/fullscreen-title.html",
    "<ng-transclude></ng-transclude>");
}]);

angular.module("common/widgets/graph/graph.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/graph/graph.html",
    "<div class=\"graphbackground\" ng-show=\"GraphCtrl.isGraphValid\">\n" +
    "    <div>\n" +
    "        <div ng-show=\"GraphCtrl.sitOptions.zooming\" class=\"graphZoomControl\">\n" +
    "            <div class=\"zoom\"><label>Zoom: &nbsp;</label></div>\n" +
    "            <input class=\"graphZoomControlInput\" type=\"range\" min=\"1\" max=\"8\" ng-model=\"zoomLevel\" step=\".1\" />\n" +
    "            <button class=\"btn btn-info graphAutoFit\"> {{'Graph.autoFit'| translate}} </button>\n" +
    "            <button class=\"btn btn-info panAndZoom\"> {{'Graph.panAndZoom'| translate}} </button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div data-internal-type=\"graphwrapper\" class=\"graphWrapperMain\">\n" +
    "        <svg data-internal-type=\"graphsvg\" width=\"500\" height=\"500\"></svg>\n" +
    "    </div>\n" +
    "    <div ng-show=\"GraphCtrl.sitOptions.zooming\" class=\"panZoom\" ng-class=\"GraphCtrl.showPan==1?'pan':'panHidden'\">\n" +
    "        <svg data-internal-type=\"panWindow\">\n" +
    "            <g></g>\n" +
    "        </svg>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<label ng-show=\"!GraphCtrl.isGraphValid\">{{graphError}}</label>\n" +
    "");
}]);

angular.module("common/widgets/grid/grid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/grid/grid.html",
    "<div id=\"gridContainerDiv\"\n" +
    "     ng-class=\"gridCtrl.sitGridOptions.gridContainerClass\"\n" +
    "     data-internal-type=\"gridContainerDiv\"\n" +
    "     class=\"grid\" ng-style=\"gridCtrl.gridHeight\">\n" +
    "    <div ng-if=\"gridCtrl.showGrid\" id=\"showHideGrid\">\n" +
    "        <div class=\"gridStyle\" ng-style=\"gridCtrl.gridHeight\" ng-grid=\"gridCtrl.gridOptions\"></div>\n" +
    "        <div ng-if=\"!gridCtrl.grouping && gridCtrl.sitGridOptions.enablePaging && gridCtrl.totalDataItems\">\n" +
    "            <sit-pagination sit-options=\"gridCtrl.paginationOptions\"></sit-pagination>\n" +
    "        </div>\n" +
    "        <div class=\"sit-icv-footer-infinite-scroll\" ng-if=\"!gridCtrl.sitGridOptions.enablePaging\">\n" +
    "            <span class=\"sit-icv-footer-infinite-scroll-label\">{{'pagination.selected-items'|translate}}: {{gridCtrl.paginationOptions.selectedItemsCount}}</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/headerButton/headerButton.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/headerButton/headerButton.html",
    "<div class=\"dropdown dropdown-toggle header-container\" id=\"hdrbtn_{{vm.id}}\" ng-click=\"vm.onButtonClick()\" data-internal-type=\"headerButtonContainer\">\n" +
    "    <span data-toggle=\"dropdown\" class=\"header-button\" data-internal-type=\"headerButton\">\n" +
    "        <em class=\"fa fa-lg {{vm.icon}}\" sit-mom-icon=\"vm.displayIcon\" ng-class=\"{momIcon: vm.displayIcon !== null }\"></em><span ng-if=\"vm.title.length > 0\"  class=\"header-button-text\">\n" +
    "            {{vm.title}}\n" +
    "        </span>\n" +
    "    </span>\n" +
    "    <div class=\"dropdown-menu header-dropdown\" ng-if=\"vm.showDropdown\">\n" +
    "        <div ng-include=\"vm.templateuri\"></div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/homeCard/sit-home-card.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/homeCard/sit-home-card.html",
    "<section class=\"sit-home-card\" ng-class=\"{'action-card': homeCardCtrl.options.callback}\" ng-click=\"homeCardCtrl.options.callback(homeCardCtrl.options)\">\n" +
    "    <div class=\"image\">\n" +
    "        <img ng-src=\"{{homeCardCtrl.options.image}}\" alt=\"{{homeCardCtrl.options.title}}\" />\n" +
    "    </div>\n" +
    "    <div class=\"content\">\n" +
    "        <div class=\"title\">{{homeCardCtrl.options.title}}</div>\n" +
    "        <div class=\"description\">{{ homeCardCtrl.options.description }}</div>\n" +
    "        <div class=\"actions\" ng-if=\"homeCardCtrl.options.action\">\n" +
    "            <div class=\"action-button\" sit-class=\"svg-icon\" title=\"{{homeCardCtrl.options.action.title}}\"\n" +
    "                  sit-mom-icon=\"homeCardCtrl.options.action.icon\"\n" +
    "                  ng-click=\"homeCardCtrl.options.action.callback(homeCardCtrl.options)\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</section>\n" +
    "");
}]);

angular.module("common/widgets/homeTile/sit-home-tile.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/homeTile/sit-home-tile.html",
    "<section class=\"sit-home-tile\" \n" +
    "         title=\"{{homeTileCtrl.options.title}}\" \n" +
    "         ng-click=\"homeTileCtrl.options.callback(homeTileCtrl.options)\">\n" +
    "    <div class=\"icon\">\n" +
    "        <em ng-if=\"!homeTileCtrl.isSvgIcon\" class=\"fa\" ng-class=\"homeTileCtrl.options.icon\"></em>\n" +
    "        <div ng-if=\"homeTileCtrl.isSvgIcon\" sit-mom-icon=\"homeTileCtrl.options.icon\"></div>\n" +
    "    </div>\n" +
    "    <div class=\"title\">\n" +
    "        {{homeTileCtrl.options.title}}\n" +
    "    </div>\n" +
    "</section>\n" +
    "");
}]);

angular.module("common/widgets/iconPicker/icon-selection-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/iconPicker/icon-selection-template.html",
    "<a class=\"icon-picker-dropdown\">\n" +
    "    <div class=\"icon-details\">\n" +
    "        <div ng-if=\"match.model.text.startsWith('svg ') == false\" class=\"icon-container\">\n" +
    "            <em class=\"fa {{match.model.icon}} fa-lg\"></em>\n" +
    "        </div>\n" +
    "        <div ng-if=\"match.model.text.startsWith('svg ') == true\" class=\"icon-container\">\n" +
    "            <img alt=\"{{match.model.icon}}\" class=\"svg-icon\" ng-src=\"{{match.model.icon}}\" height=\"24\" width=\"24\" />\n" +
    "        </div>\n" +
    "        <div class=\"icon-name-container\">\n" +
    "            <div class=\"name-container icon-text\">\n" +
    "                <label class=\"image-name\" ng-bind-html=\"match.model.text\"></label>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</a>");
}]);

angular.module("common/widgets/iconPicker/iconPicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/iconPicker/iconPicker.html",
    "<div data-internal-type=\"icon-picker-container\" id=\"icon-picker-container\" class=\"icon-picker-container\">\n" +
    "    <div class=\"icon-selector\">\n" +
    "        <sit-entity-picker sit-id=\"iconPickerCtrl.id\"\n" +
    "                           sit-value=\"iconPickerCtrl.value\"\n" +
    "                           sit-change=\"iconPickerCtrl.valueChanged\"\n" +
    "                           sit-datasource=\"iconPickerCtrl.datasource\"\n" +
    "                           sit-limit=\"iconPickerCtrl.limit\"\n" +
    "                           sit-placeholder=\"iconPickerCtrl.placeholder\"\n" +
    "                           sit-selected-attribute-to-display=\"iconPickerCtrl.selectedAttributeToDisplay\"\n" +
    "                           sit-editable=\"iconPickerCtrl.editable\"\n" +
    "                           sit-required=\"iconPickerCtrl.required\"\n" +
    "                           sit-template-url=\"iconPickerCtrl.templateUrl\"\n" +
    "                           sit-read-only=\"iconPickerCtrl.readOnly\"\n" +
    "                           sit-validation=\"iconPickerCtrl.validation\"\n" +
    "                           sit-selected-object=\"iconPickerCtrl.selectedObject\"\n" +
    "                           ng-blur=\"iconPickerCtrl.ngBlur\"\n" +
    "                           ng-disabled=\"iconPickerCtrl.ngDisabled\"\n" +
    "                           ng-focus=\"iconPickerCtrl.ngFocus\"\n" +
    "                           ng-readonly=\"iconPickerCtrl.ngReadonly\"\n" +
    "                           class=\"property-grid-input-group\" />\n" +
    "    </div>\n" +
    "    <div class=\"icon-view\">\n" +
    "        <span>\n" +
    "            <em ng-if=\"iconPickerCtrl.selectedObject.text.startsWith('svg ') == false\" class=\"fa {{iconPickerCtrl.selectedObject.icon}} fa-lg\"></em>\n" +
    "            <img alt=\"{{iconPickerCtrl.selectedObject.icon}}\" style=\"margin-left:5px\" ng-if=\"iconPickerCtrl.selectedObject.text.startsWith('svg ') == true\" class=\"svg-icon\" ng-src=\"{{iconPickerCtrl.selectedObject.icon}}\" height=\"24\" width=\"24\" />\n" +
    "        </span>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/iconPreview/iconPreview.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/iconPreview/iconPreview.html",
    "<span ng-if=\"iconpreviewCtrl.readOnly || iconpreviewCtrl.ngReadonly\" class=\"label-property-grid-control-readonly property-value-ellipsis\">\n" +
    "    <em class=\"fa {{iconpreviewCtrl.value}} fa-lg\"></em>\n" +
    "</span>\n" +
    "<ng-form name='iconpreviewForm' ng-if=\"!(iconpreviewCtrl.readOnly || iconpreviewCtrl.ngReadonly)\" ng-class=\"{'isrequired' :(iconpreviewCtrl.validation.required) && iconpreviewCtrl.value===undefined}\">\n" +
    "    <span style=\"display: inline-block; width:95%\" class='property-grid-input-group'>\n" +
    "        <input type=\"text\"\n" +
    "               name='{{iconpreviewCtrl.value}}'\n" +
    "               ng-class='((iconpreviewForm.$invalid && iconpreviewForm.$dirty) || (iconpreviewForm.$invalid && iconpreviewForm.$visited)) ? \"validator-control-invalid\" : \"validator-control\"'\n" +
    "               ng-model='iconpreviewCtrl.value'\n" +
    "               ng-required='iconpreviewCtrl.validation.required'\n" +
    "               ng-minlength='iconpreviewCtrl.validation.minlength'\n" +
    "               ng-maxlength='iconpreviewCtrl.validation.maxlength'\n" +
    "               ng-pattern='iconpreviewCtrl.validation.pattern'\n" +
    "               ng-blur=\"iconpreviewCtrl.ngBlur()\"\n" +
    "               sit-change=\"iconpreviewCtrl.sitChange\"\n" +
    "               ng-disabled=\"iconpreviewCtrl.ngDisabled\"\n" +
    "               ng-readonly=\"iconpreviewCtrl.ngReadOnly\"\n" +
    "               ng-focus=\"iconpreviewCtrl.ngFocus()\"\n" +
    "               sit-form-input-validator='{{iconpreviewCtrl.value}}' />\n" +
    "    </span>\n" +
    "    <span>\n" +
    "        <em class=\"fa {{iconpreviewCtrl.value}} fa-lg\"></em>\n" +
    "    </span>\n" +
    "</ng-form>");
}]);

angular.module("common/widgets/itemCollectionViewer/grid-personalization.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/itemCollectionViewer/grid-personalization.html",
    "<sit-column-configurator sit-config=\"Dialog.templatedata\"></sit-column-configurator>");
}]);

angular.module("common/widgets/itemCollectionViewer/grid-tile-personalization.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/itemCollectionViewer/grid-tile-personalization.html",
    "<div class=\"grid-tile-personalization\">\n" +
    "    <div class=\"radio-buttons\">\n" +
    "        <sit-property-grid sit-id=\"propertyGrid_verticalNew\" sit-layout=\"Horizontal\" sit-type=\"Fixed\" sit-mode=\"Edit\"\n" +
    "                           sit-columns=\"1\">\n" +
    "            <sit-property sit-widget=\"sit-radio\" sit-value=\"Dialog.templatedata.radio.value\" sit-options=\"Dialog.templatedata.radio.options\"\n" +
    "                          sit-change=\"Dialog.templatedata.radio.onChange\">{{'userPrefrences.defaultViewModeHeading'|translate}}:</sit-property>\n" +
    "        </sit-property-grid>\n" +
    "    </div>\n" +
    "    <div style=\"clear:both\"></div>\n" +
    "    <div>\n" +
    "        <sit-tabset>\n" +
    "            <sit-tab heading=\"{{'userPrefrences.columnConfigurator.heading'|translate}}\" active=\"Dialog.templatedata.grid.isGridActive\"\n" +
    "                     select=\"Dialog.templatedata.selectTab(Dialog.templatedata, 'grid')\">\n" +
    "                <sit-column-configurator sit-config=\"Dialog.templatedata.grid\"></sit-column-configurator>\n" +
    "            </sit-tab>\n" +
    "            <sit-tab heading=\"{{'userPrefrences.tileConfigurator.heading'|translate}}\" active=\"Dialog.templatedata.tile.isTileActve\"\n" +
    "                     select=\"Dialog.templatedata.selectTab(Dialog.templatedata, 'tile')\">\n" +
    "                <sit-tile-configurator sit-config=\"Dialog.templatedata.tile\"></sit-tile-configurator>\n" +
    "            </sit-tab>\n" +
    "        </sit-tabset>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/itemCollectionViewer/item-collection-viewer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/itemCollectionViewer/item-collection-viewer.html",
    "<div id=\"itemCollectionViewerContainer\" class=\"sit-item-collection-viewer\" data-internal-type=\"itemCollectionViewerContainer\" ng-style=\"ICVController.compactStyle\" mode=\"{{ICVController.viewMode}}\">\n" +
    "    <div ng-if=\"ICVController.resetView\">\n" +
    "        <div id=\"topCommandBars\" data-internal-type=\"topCommandBars\" class=\"top-command-bars\">\n" +
    "            <div id=\"filterBar\" data-internal-type=\"filterBar\" class=\"filterBar-container\">\n" +
    "                <sit-filter-bar sit-filter-options=\"ICVController.filterOptions\"></sit-filter-bar>\n" +
    "            </div>\n" +
    "\n" +
    "            <div id=\"filter\" class=\"filter-container\" ng-class=\"ICVController.showFilter && ICVController.sitOptions.filterFields.type !== 'filterPanel' ? 'open' : 'closed'\" data-internal-type=\"filter\">\n" +
    "                <sit-filter-panel ng-if=\"ICVController.sitOptions.filterFields.type === 'filterPanel' && ICVController.showFilter\" sit-data=\"ICVController.sitOptions.filterFields\" sit-user-preference=\"ICVController.sitOptions.userPrefId\"></sit-filter-panel>\n" +
    "                <sit-filter ng-if=\"!ICVController.sitOptions.filterFields.type\" sit-filter-fields=\"ICVController.sitOptions.filterFields\" sit-filter-server-side=\"ICVController.sitOptions.serverDataOptions\" sit-user-preference=\"ICVController.sitOptions.userPrefId\" sit-filter-options=\"ICVController.sitFilterOptions\" sit-apply-callback=\"ICVController.applyFilter(clauses)\" sit-reset-callback=\"ICVController.resetFilter()\" sit-allow-grouping=\"ICVController.sitFilterOptions.groupEnabled\"></sit-filter>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div id=\"itemCollectionCanvas\" data-internal-type=\"itemCollectionCanvas\" ng-style=\"ICVController.collectionStyle\">\n" +
    "            <div id=\"noDataDiv\" data-internal-type=\"noDataDiv\" ng-style=\"ICVController.collectionStyle\" \n" +
    "                 ng-if=\"ICVController.noData && !ICVController.pageManager.isServerData()\" \n" +
    "                 style=\"font-size: 10.5pt;font-weight: 600; padding-left: 10px;\">{{ICVController.noDataMessage}}</div>\n" +
    "            <div id=\"gridViewDiv\" data-internal-type=\"gridViewDiv\" ng-style=\"ICVController.collectionStyle\" \n" +
    "                 ng-if=\"(!ICVController.noData || ICVController.pageManager.isServerData()) && ICVController.viewMode == 'grid'\">\n" +
    "                <sit-grid data-sit-grid-data=\"ICVController.sitData\" data-sit-grid-options=\"ICVController.gridOptions\"></sit-grid>\n" +
    "            </div>\n" +
    "            <div id=\"tileViewDiv\" data-internal-type=\"tileViewDiv\" ng-style=\"ICVController.collectionStyle\" \n" +
    "                 ng-if=\"(!ICVController.noData || ICVController.pageManager.isServerData()) && ICVController.viewMode != 'grid'\">\n" +
    "                <sit-tile-view data-sit-tiles=\"ICVController.sitData\" data-sit-options=\"ICVController.tileViewOptions\"></sit-tile-view>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/itemCollectionViewer/tile-personalization.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/itemCollectionViewer/tile-personalization.html",
    "<sit-tile-configurator sit-config=\"Dialog.templatedata\"></sit-tile-configurator>");
}]);

angular.module("common/widgets/label/label.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/label/label.html",
    "<div class='label-property-grid-control-readonly property-grid-label property-value-ellipsis' title=\"{{labelCtrl.value}}\">{{labelCtrl.value}}</div>");
}]);

angular.module("common/widgets/mduiBreadcrumb/sit-mdui-breadcrumb.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/mduiBreadcrumb/sit-mdui-breadcrumb.html",
    "<div data-internal-type=\"mduiBreadcrumbContainerDiv\">\n" +
    "    <ol class=\"breadcrumb\">\n" +
    "        <li ng-if=\"ctrl.breadcrumbType=='Complete'\" ng-repeat=\"current in ctrl.trails track by $index\" ng-switch=\"$last\">\n" +
    "            <a ng-switch-when=\"false\" ng-click=\"ctrl.onClick(current)\" href=\"\" data-internal-type=\"mdui-breadcrumb-item-{{$index+1}}\">{{current.title}} </a>\n" +
    "            <span class=\"lastItem\" ng-switch-when=\"true\" data-internal-type=\"mdui-breadcrumb-item-{{$index+1}}\">{{current.title}} </span>\n" +
    "        </li>\n" +
    "        <li ng-if=\"ctrl.breadcrumbType=='HideMiddle'\" ng-repeat=\"shown in ctrl.tobeShown track by $index\">\n" +
    "            <span ng-if=\"$middle\" class=\"mdui-breadcrumb-ellipsis\" ng-class=\"{'breadcrumbEllipsisHighLight':ctrl.showFlyout==true}\" data-internal-type=\"mdui-breadcrumb-ellipsis\">{{shown.title}}</span>\n" +
    "            <a ng-if=\"$first\" href=\"\" ng-click=\"ctrl.onClick(shown)\" data-internal-type=\"mdui-breadcrumb-first-item\">{{shown.title}}</a>\n" +
    "            <span ng-if=\"$last\" class=\"lastItem\" data-internal-type=\"mdui-breadcrumb-last-item\">{{shown.title}}</span>\n" +
    "        </li>\n" +
    "        <li ng-if=\"ctrl.breadcrumbType=='ShowOnlyLast'\" ng-repeat=\"shown in ctrl.tobeShown track by $index\">\n" +
    "            <span ng-if=\"$first\" class=\"mdui-breadcrumb-ellipsis\" ng-class=\"{'breadcrumbEllipsisHighLight':ctrl.showFlyout==true}\" data-internal-type=\"mdui-breadcrumb-ellipsis\">{{shown.title}}</span>\n" +
    "            <span ng-if=\"$last\" class=\"lastItem\" title=\"{{ctrl.toolTipforLastItem}}\" data-internal-type=\"mdui-breadcrumb-last-item\">{{shown.title}}</span>\n" +
    "        </li>\n" +
    "    </ol>\n" +
    "    <div class=\"divBreadcrumbFlyout\" ng-show=\"ctrl.showFlyout\" ng-style=\"{'top':ctrl.flyoutTop, 'left':ctrl.flyoutLeft, 'margin-left':ctrl.flyoutMarginLeft}\">\n" +
    "        <div class=\"divDropDownBreadcrumbExpander\" ng-if=\"ctrl.showAsDropDown\">\n" +
    "            <a ng-repeat=\"hidden in ctrl.tobeHidden track by $index\" class=\"dropdownItems\" href=\"\" ng-click=\"ctrl.onClick(hidden)\" title=\"{{hidden.toolTip}}\" data-internal-type=\"mdui-breadcrumb-flyout-menu-item-{{$index+1}}\">{{hidden.title}}</a>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "            <ol class=\"breadcrumb\" ng-if=\"!ctrl.showAsDropDown\">\n" +
    "                <li ng-repeat=\"hidden in ctrl.tobeHidden track by $index\">\n" +
    "                    <a href=\"\" ng-click=\"ctrl.onClick(hidden)\" data-internal-type=\"mdui-breadcrumb-flyout-item-{{$index+1}}\">{{hidden.title}}</a>\n" +
    "                </li>\n" +
    "            </ol>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("common/widgets/multiSelect/sit-advanced-select.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/multiSelect/sit-advanced-select.html",
    "<div class=\"label label-property-grid-control-readonly property-value-ellipsis\" ng-if=\"ctrl.readOnly || ctrl.ngReadonly\">\n" +
    "    {{ ctrl.sitSelectedString || ctrl.sitPlaceholder }}\n" +
    "</div>\n" +
    "<ng-form ng-if=\"!(ctrl.readOnly || ctrl.ngReadonly)\" name='multiselectForm'\n" +
    "         ng-class=\"{'isrequired' : (ctrl.validation.required) && ! ((ctrl.sitOptions | filter:{selected:true}).length > 0)}\">\n" +
    "    <div class=\"dropdown multi-select-dropdown single-selection\">\n" +
    "        <button class=\"btn btn-default\" type=\"button\" id=\"dropdownMenuAdvanced\" aria-expanded=\"true\" data-toggle=\"dropdown\"\n" +
    "                ng-class=\"{'validator-control-invalid':((multiselectForm.$invalid && multiselectForm.$dirty) || (multiselectForm.$invalid && multiselectForm.$visited)),\n" +
    "               'validator-control':!((multiselectForm.$invalid && multiselectForm.$dirty) || (multiselectForm.$invalid && multiselectForm.$visited)),\n" +
    "               'ng-dirty':multiselectForm.$dirty}\"\n" +
    "                ng-blur=\"ctrl.ngBlur()\" ng-disabled=\"ctrl.ngDisabled\" ng-focus=\"ctrl.ngFocus()\">\n" +
    "            <span class=\"dropdownButtonLabel\">{{ctrl.getSelectedText()}}</span>\n" +
    "            <i class=\"fa fa-chevron-down\"></i>\n" +
    "        </button>\n" +
    "        <input type=\"hidden\" ng-model=\"ctrl.sitSelectedString\" ng-required=\"ctrl.validation.required\" sit-change=\"ctrl.sitChange\" sit-form-input-validator />\n" +
    "\n" +
    "        <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"dropdownMenuAdvanced\">\n" +
    "            <li ng-repeat=\"selectable in ctrl.sitOptions | filter: ctrl.sitSplitList ? {selected:true} : {}\"\n" +
    "                ng-class=\"{selected: selectable.selected}\" role=\"presentation\" ng-click=\"ctrl.toggleSelected($event, selectable)\" class=\"dropdown-item\">\n" +
    "                <a role=\"menuitem\" tabindex=\"-1\">{{selectable.name}}</a>\n" +
    "                <!--TODO - make this configurable\n" +
    "                <i class=\"fa\" ng-class=\"selectable.direction==='desc' ? 'fa-sort-alpha-desc' : 'fa-sort-alpha-asc'\" ng-click=\"ctrl.toggleDirection($event, selectable)\"></i>-->\n" +
    "            </li>\n" +
    "            <!--This is VERY inefficient-->\n" +
    "            <li role=\"presentation\" class=\"divider\" ng-if=\"ctrl.sitSplitList && (ctrl.sitOptions | filter:ctrl.isFalsy).length > 0 && (ctrl.sitOptions | filter:{selected:true}).length > 0\"></li>\n" +
    "            <li ng-if=\"ctrl.sitSplitList\" ng-class=\"{selected: selectable.selected}\" ng-repeat=\"selectable in ctrl.sitOptions | filter:ctrl.isFalsy\" role=\"presentation\" ng-click=\"ctrl.toggleSelected($event, selectable)\" class=\"dropdown-item\">\n" +
    "                <input type=\"checkbox\" ng-checked=\"selectable.selected\" class=\"view-text\" />\n" +
    "                <a role=\"menuitem\" tabindex=\"-1\">{{selectable.name}}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</ng-form>");
}]);

angular.module("common/widgets/multiSelect/sit-multi-select.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/multiSelect/sit-multi-select.html",
    "<sit-advanced-select sit-options=\"ctrl.sitOptions\"\n" +
    "                     sit-selected-string=\"ctrl.sitSelectedString\"\n" +
    "                     sit-split-list=\"ctrl.sitSplitList\"\n" +
    "                     sit-placeholder=\"ctrl.sitPlaceholder\"\n" +
    "                     sit-done-callback=\"ctrl.sitDoneCallback\"\n" +
    "                     ng-blur=\"ctrl.ngBlur\" sit-change=\"ctrl.sitChange\" ng-disabled=\"ctrl.ngDisabled\" ng-focus=\"ctrl.ngFocus\" ng-readonly=\"ctrl.ngReadonly\" sit-read-only=\"ctrl.readOnly\" sit-validation=\"ctrl.validation\" sit-multi-select=\"ctrl.multiselection\">\n" +
    "</sit-advanced-select>");
}]);

angular.module("common/widgets/navigationLink/sit-tab.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/navigationLink/sit-tab.html",
    "<div sit-tab-heading-transclude></div>");
}]);

angular.module("common/widgets/navigationLink/sit-tabset.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/navigationLink/sit-tabset.html",
    "<div class=\"sit-navigation-tabs\" data-internal-type=\"sit-navigation-tabs\">\n" +
    "    <ng-transclude ng-show=\"false\"></ng-transclude>\n" +
    "    <ul class=\"nav navbar-nav tabset\" data-internal-type=\"sit-navigation-tabs-navbar\" sit-navigation-slide=\"true\">\n" +
    "        <li class=\"navbar-nav-tab\" data-internal-type=\"sit-navigation-tabs-navbar-tab-item\" ng-repeat=\"tab in tabs\" \n" +
    "            ng-class=\"{active: tab.active, disabled: tab.disabled, warning: tab.warning, new: tab.new}\" \n" +
    "            ng-if=\"$index<=tabsetCtrl.visibleTabs - 1\" ng-style=\"{'max-width' : tabsetCtrl.maxTabWidth}\"\n" +
    "            uib-tooltip-html=\"tab.heading\" tooltip-palacement=\"top\" tooltip-enable=\"tabsetCtrl.isTabEllipsis(tab)\">\n" +
    "            <a ng-click=\"tab.select()\">\n" +
    "                <div>\n" +
    "                    <div class=\"sit-nav-tab-i\" ng-if=\"tab.warning || tab.new\">\n" +
    "                        <em class=\"fa fa-warning\" ng-if=\"tab.warning\"></em>\n" +
    "                        <em class=\"fa fa-asterisk\" ng-if=\"tab.new\"></em>\n" +
    "                    </div>\n" +
    "                    <div class=\"sit-nav-tab-label\" data-ellipsis-id=\"sit-nav-tab-span-{{tab.$id}}\" ng-bind-html=\"tab.heading\"></div>\n" +
    "                </div>\n" +
    "            </a>\n" +
    "        </li>\n" +
    "        <li class=\"navbar-nav-dropdown\" data-internal-type=\"sit-navigation-tabs-navbar-dropdown\" ng-show=\"tabsetCtrl.displayDropdown\">\n" +
    "            <button data-toggle=\"dropdown\" title=\"Other commands\" class=\"dropdown-toggle\" ng-click=\"tabsetCtrl.setDropdownHeight()\">\n" +
    "                <div style=\"display:inline-block\">\n" +
    "                    <div class=\"tab-dropdown-label\">{{tabsetCtrl.otherTabs}}</div>\n" +
    "                </div>\n" +
    "            </button>\n" +
    "\n" +
    "            <ul class=\"dropdown-menu dropdown-menu-right\"  data-internal-type=\"sit-navigation-tabs-navbar-dropdown-ul\" role=\"menu\" data-toggle=\"dropdown\">\n" +
    "                <li class=\"sit-tab-dropdown-menu-items\"  data-internal-type=\"sit-navigation-tabs-navbar-dropdown-ul-li\" ng-repeat=\"tab in tabs\" ng-class=\"{active: tab.active, disabled: tab.disabled, warning: tab.warning, new: tab.new}\" ng-show=\"$index>tabsetCtrl.visibleTabs - 1\">\n" +
    "                    <a ng-click=\"tab.select()\">\n" +
    "                        <span>\n" +
    "                            <em class=\"fa fa-warning\" ng-show=\"tab.warning\"></em>\n" +
    "                            <em class=\"fa fa-asterisk\" ng-show=\"tab.new\"></em>\n" +
    "                            <span ng-bind-html=\"tab.heading\"></span>\n" +
    "                        </span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "    <hr ng-if=\"tabsetCtrl.visibleTabs > 0\" data-internal-type=\"slidingLine\" class=\"slider\" />\n" +
    "    <div class=\"sit-tab-clear-div\"></div>\n" +
    "    <div class=\"tab-content\">\n" +
    "        <div class=\"tab-pane\" ng-repeat=\"tab in tabs\" ng-class=\"{active: tab.active}\" sit-tab-content-transclude=\"tab\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/navigationLink/tab.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/navigationLink/tab.html",
    "<div tab-heading-transclude>\n" +
    "</div>");
}]);

angular.module("common/widgets/navigationLink/tabset.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/navigationLink/tabset.html",
    "<div class=\"sit-navigation-tabs\" data-internal-type=\"sit-navigation-tabs\" >\n" +
    "    <ng-transclude ng-show=\"false\"></ng-transclude>\n" +
    "    <ul class=\"nav navbar-nav tabset\" data-internal-type=\"sit-navigation-tabs-navbar\" sit-navigation-slide=\"true\">\n" +
    "        <li class=\"navbar-nav-tab\" data-internal-type=\"sit-navigation-tabs-navbar-tab-item\" ng-repeat=\"tab in tabs\" \n" +
    "            ng-class=\"{active: tab.active, disabled: tab.disabled, warning: tab.warning, new: tab.new}\" \n" +
    "            ng-if=\"$index<=tabsetCtrl.visibleTabs - 1\" ng-style=\"{'max-width' : tabsetCtrl.maxTabWidth}\" \n" +
    "            uib-tooltip-html=\"tab.heading\" tooltip-enable=\"tabsetCtrl.isTabEllipsis(tab)\">\n" +
    "            <a ng-click=\"tab.select()\">\n" +
    "                <div>\n" +
    "                    <div class=\"sit-nav-tab-i\" ng-if=\"tab.warning || tab.new\">\n" +
    "                        <em class=\"fa fa-warning\" ng-if=\"tab.warning\"></em>\n" +
    "                        <em class=\"fa fa-asterisk\" ng-if=\"tab.new\"></em>\n" +
    "                    </div>\n" +
    "                    <div class=\"sit-nav-tab-label\" data-ellipsis-id=\"sit-nav-tab-span-{{tab.$id}}\" ng-bind-html=\"tab.heading\"></div>\n" +
    "                </div>\n" +
    "            </a>\n" +
    "        </li>\n" +
    "        <li class=\"navbar-nav-dropdown\" data-internal-type=\"sit-navigation-tabs-navbar-dropdown\" ng-show=\"tabsetCtrl.displayDropdown\">\n" +
    "            <button data-toggle=\"dropdown\" title=\"Other commands\" class=\"dropdown-toggle\" ng-click=\"tabsetCtrl.setDropdownHeight()\">\n" +
    "                <div style=\"display:inline-block\">\n" +
    "                    <div class=\"tab-dropdown-label\">{{tabsetCtrl.otherTabs}}</div>\n" +
    "                </div>\n" +
    "            </button>\n" +
    "\n" +
    "            <ul class=\"dropdown-menu dropdown-menu-right\"  data-internal-type=\"sit-navigation-tabs-navbar-dropdown-ul\" role=\"menu\" data-toggle=\"dropdown\">\n" +
    "                <li class=\"sit-tab-dropdown-menu-items\"  data-internal-type=\"sit-navigation-tabs-navbar-dropdown-ul-li\" ng-repeat=\"tab in tabs\" ng-class=\"{disabled: tab.disabled, warning: tab.warning, new: tab.new}\" ng-show=\"$index>tabsetCtrl.visibleTabs - 1\">\n" +
    "                    <a ng-click=\"tab.select()\">\n" +
    "                        <span>\n" +
    "                            <em class=\"fa fa-warning\" ng-show=\"tab.warning\"></em>\n" +
    "                            <em class=\"fa fa-asterisk\" ng-show=\"tab.new\"></em>\n" +
    "                            <span ng-bind-html=\"tab.heading\"></span>\n" +
    "                        </span>\n" +
    "                    </a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "    <hr ng-if=\"tabsetCtrl.visibleTabs > 0\" data-internal-type=\"slidingLine\" class=\"slider\" />\n" +
    "    <div class=\"sit-tab-clear-div\"></div>\n" +
    "    <div class=\"tab-content\">\n" +
    "        <div class=\"tab-pane\" ng-repeat=\"tab in tabs\" ng-class=\"{active: tab.active}\" tab-content-transclude=\"tab\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/notificationTile/notification-tile.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/notificationTile/notification-tile.html",
    "<div class=\"notification-tile\"\n" +
    "     ng-click=\"notificationCtrl.thisTileClick()\"\n" +
    "     ng-show=\"notificationCtrl.tileIsVisible\"\n" +
    "     ng-class=\"{'notification-tile-popup': notificationCtrl.tilePopup,\n" +
    "                'notification-tile-color-info': notificationCtrl.tileType=='info',\n" +
    "                'notification-tile-color-warning':  notificationCtrl.tileType=='warning',\n" +
    "                'normalTile':notificationCtrl.format!=='wide',\n" +
    "                'wideTile':notificationCtrl.format=='wide',\n" +
    "                'topCenterPositioning':notificationCtrl.position=='topCenter',\n" +
    "                'normalPositioning':notificationCtrl.position=='topRight',\n" +
    "                'bottomRightPositioning':notificationCtrl.position=='bottomRight',\n" +
    "                'topLeftPositioning':notificationCtrl.position=='topLeft',\n" +
    "                'dropShadow':notificationCtrl.shadow!==false}\"\n" +
    "     ng-mouseenter=\"notificationCtrl.stpoInterval()\"\n" +
    "     ng-mouseleave=\"notificationCtrl.startInterval()\">\n" +
    "\n" +
    "    <div class=\"notification-tile-container\">\n" +
    "        <div class=\"notification-tile-title\" data-internal-type=\"title\">{{notificationCtrl.cropedTitle}}</div>\n" +
    "        <div class=\"notification-tile-description\" data-internal-type=\"content\">{{notificationCtrl.cropedContent}}</div>\n" +
    "        <div class=\"notification-tile-icon\" data-internal-type=\"icon\">\n" +
    "            <em class=\"fa\" ng-class=\"{'fa-info': notificationCtrl.tileType=='info',\n" +
    "                                     'fa-warning': notificationCtrl.tileType=='warning'}\">\n" +
    "            </em>\n" +
    "        </div>\n" +
    "        <div class=\"notification-tile-counter\" data-internal-type=\"counter\"> <span>{{notificationCtrl.tileCounter}}</span> </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/notificationTile/samples/notification-tile-dev.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/notificationTile/samples/notification-tile-dev.html",
    "<!DOCTYPE html>\n" +
    "<html data-ng-app=\"app\">\n" +
    "<head>\n" +
    "    <title data-ng-bind=\"title\">Notification Tile Development</title>\n" +
    "    <meta charset=\"utf-8\" />\n" +
    "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge, chrome=1\" />\n" +
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no\" />\n" +
    "\n" +
    "    <link href=\"/common/styles/font-awesome/font-awesome.css\" rel=\"stylesheet\" />\n" +
    "    <link href=\"../../../styles/common-dark.css\" rel=\"stylesheet\" />\n" +
    "\n" +
    "    <style type=\"text/css\">\n" +
    "        body {\n" +
    "            overflow: auto;\n" +
    "        }\n" +
    "    </style>\n" +
    "\n" +
    "</head>\n" +
    "\n" +
    "<body ng-controller=\"notificationTileDevController\">\n" +
    "\n" +
    "\n" +
    "    <div>\n" +
    "        <div class=\"row\">\n" +
    "            <div style=\"width:1000px; padding:20px; border:1px solid #3366AA; position:relative; margin:50px;\">\n" +
    "\n" +
    "                <div data-sit-notification-tile\n" +
    "                     data-sit-tile-title=\"'Success'\"\n" +
    "                     data-sit-tile-content=\"'Form has been saved!'\"\n" +
    "                     data-sit-tile-type=\"'info'\"\n" +
    "                     data-sit-tile-counter=\"1\"\n" +
    "                     data-sit-tile-click=\"hasClicked('Tile info was clicked!')\"\n" +
    "                     data-sit-tile-popup=\"true\"\n" +
    "                     id=\"infoTile\"></div>\n" +
    "\n" +
    "                <div data-sit-notification-tile\n" +
    "                     data-sit-tile-title=\"'warning'\"\n" +
    "                     data-sit-tile-content=\"'Error saving form'\"\n" +
    "                     data-sit-tile-type=\"'warning'\"\n" +
    "                     data-sit-tile-counter=\"1\"\n" +
    "                     data-sit-tile-click=\"hasClicked('Tile warning was clicked!')\"\n" +
    "                     data-sit-tile-popup=\"true\"\n" +
    "                     id=\"warningForm\"></div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <h3 style=\"color:#3366AA;\">Notification Tile Development</h3>\n" +
    "                <div style=\"width:500px;  padding:20px; border:1px solid #3366AA; position:relative; margin:50px;\">\n" +
    "                    <h3 style=\"color:#3366AA;\">Form</h3>\n" +
    "                    <form role=\"form\">\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label for=\"txtName\">Login:</label>\n" +
    "                            <input type=\"text\" class=\"form-control\" id=\"txtLogin\">\n" +
    "\n" +
    "                            <div style=\"position:absolute; top:14px; left:482px;\">\n" +
    "                                <div data-sit-notification-tile\n" +
    "                                     data-sit-tile-title=\"'Warning Message'\"\n" +
    "                                     data-sit-tile-content=\"'This field is required'\"\n" +
    "                                     data-sit-tile-type=\"'warning'\"\n" +
    "                                     data-sit-tile-counter=\"1\"\n" +
    "                                     id=\"warningTile\"></div>\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!--<div class=\"form-group\">\n" +
    "                            <label for=\"txtPwd\">Password:</label>\n" +
    "                            <input type=\"password\" class=\"form-control\" id=\"txtPwd\">\n" +
    "                        </div>-->\n" +
    "                        <!--<button type=\"submit\" id=\"btnSubmit\" class=\"btn btn-default\">Submit</button>-->\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <button type=\"button\" id=\"btnInput\" class=\"btn btn-default\" ng-click=\"hasClicked('Show info notification');\">Show info notification</button>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <button type=\"button\" id=\"btnInputHide\" class=\"btn btn-default\" ng-click=\"hasClicked('Hide info notification');\">Hide info notification</button>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <button type=\"button\" id=\"btnInputToggle\" class=\"btn btn-default\" ng-click=\"hasClicked('Toggle info notification');\">Toggle info notification</button>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <button type=\"button\" id=\"btnContainerSuccess\" class=\"btn btn-default\" ng-click=\"hasClicked('Show popup info notification')\">Show popup info notification</button>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <button type=\"button\" id=\"btnContainerWarning\" class=\"btn btn-default\" ng-click=\"hasClicked('Show popup Warning notification');\">Show popup Warning notification</button>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </form>\n" +
    "                    <br />\n" +
    "                    <div>\n" +
    "                        <strong>Notifications</strong><br />\n" +
    "                        <ul>\n" +
    "                            <li ng-repeat=\"event in events\">{{event}}</li>\n" +
    "                        </ul>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "\n" +
    "                <!--<button type=\"button\" class=\"btn btn-default\" onclick=\"$('#infoTile').data('notificationTileToggle')()\">Info</button>\n" +
    "                <button type=\"button\" class=\"btn btn-default\" onclick=\"$('#warningTile').data('notificationTileToggle')()\">Warning</button>-->\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Vendor Scripts -->\n" +
    "        <script src=\"../../../scripts/jquery-2.1.1.js\"></script>\n" +
    "        <script src=\"../../../scripts/angular/angular.js\"></script>\n" +
    "        <script src=\"../../../scripts/angular/angular-animate.js\"></script>\n" +
    "        <script src=\"../../../scripts/angular/angular-route.js\"></script>\n" +
    "        <script src=\"../../../scripts/angular/angular-sanitize.js\"></script>\n" +
    "        <script src=\"../../../scripts/bootstrap.js\"></script>\n" +
    "        <script src=\"../../../scripts/angular-ui/ui-bootstrap-tpls.js\"></script>\n" +
    "        <script src=\"../../../scripts/angular-ui-router.js\"></script>\n" +
    "\n" +
    "        <!-- Bootstrapping -->\n" +
    "        <script src=\"./notification-tile-dev-app.js\"></script>\n" +
    "\n" +
    "        <!-- Test Data -->\n" +
    "        <!-- NotificationTile Widget scripts -->\n" +
    "        <script src=\"../sit-notification-tile-mod.js\"></script>\n" +
    "        <script src=\"../sit-notification-tile-svc.js\"></script>\n" +
    "        <script src=\"../sit-notification-tile-dir.js\"></script>\n" +
    "\n" +
    "\n" +
    "        <!--<script type=\"text/javascript\">\n" +
    "            $(document).ready(function () {\n" +
    "                $(\"#txtLogin\").blur(function () {\n" +
    "                    if ($(this).val() == \"\") {\n" +
    "                        $('#warningTile').data('notificationTileShow')();\n" +
    "                    } else {\n" +
    "                        $('#warningTile').data('notificationTileHide')();\n" +
    "                    }\n" +
    "                });\n" +
    "\n" +
    "                $(\"#btnSubmit\").click(function () {\n" +
    "                    if ($(\"#txtLogin\").val() == \"\" || $(\"#txtPwd\").val() == \"\") {\n" +
    "                        $('#warningForm').data('notificationTileShow')();\n" +
    "                    } else {\n" +
    "                        $('#infoTile').data('notificationTileShow')();\n" +
    "                    }\n" +
    "\n" +
    "                });\n" +
    "            });\n" +
    "\n" +
    "        </script>-->\n" +
    "\n" +
    "        <script type=\"text/javascript\">\n" +
    "            $(document).ready(function () {\n" +
    "                $(\"#btnInput\").click(function () {\n" +
    "                    $('#warningTile').data('notificationTileShow')();\n" +
    "                });\n" +
    "\n" +
    "                $(\"#btnInputToggle\").click(function () {\n" +
    "                    $('#warningTile').data('notificationTileToggle')();\n" +
    "                });\n" +
    "\n" +
    "                $(\"#btnInputHide\").click(function () {\n" +
    "                    $('#warningTile').data('notificationTileHide')();\n" +
    "                });\n" +
    "\n" +
    "                $(\"#btnContainerSuccess\").click(function () {\n" +
    "                    $('#infoTile').data('notificationTileShow')();\n" +
    "                });\n" +
    "\n" +
    "                $(\"#btnContainerWarning\").click(function () {\n" +
    "                    $('#warningForm').data('notificationTileShow')();\n" +
    "                });\n" +
    "            });\n" +
    "\n" +
    "        </script>\n" +
    "\n" +
    "\n" +
    "\n" +
    "</body>\n" +
    "\n" +
    "</html>");
}]);

angular.module("common/widgets/numeric/numeric.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/numeric/numeric.html",
    "<div ng-if=\"numericCtrl.readOnly || numericCtrl.ngReadonly\" class=\"label-property-grid-control-readonly property-value-ellipsis\"> {{numericCtrl.value}} </div>\n" +
    "\n" +
    "<ng-form ng-if=\"!(numericCtrl.readOnly || numericCtrl.ngReadonly)\" name='numericForm' ng-class=\"{'isrequired' : (numericCtrl.validation.required) && numericCtrl.value===undefined}\">\n" +
    "    <div class='property-grid-input-group'>\n" +
    "        <input type='number'\n" +
    "               step=\"any\"\n" +
    "               name='{{numericCtrl.value}}'\n" +
    "                ng-class=\"{'validator-control-invalid':((numericForm.$invalid && numericForm.$dirty) || (numericForm.$invalid && numericForm.$visited)),\n" +
    "               'validator-control':!((numericForm.$invalid && numericForm.$dirty) || (numericForm.$invalid && numericForm.$visited)),\n" +
    "               'ng-dirty':numericForm.$dirty}\"\n" +
    "               ng-model='numericCtrl.value'\n" +
    "               ng-required='numericCtrl.validation.required'\n" +
    "               ng-minlength='numericCtrl.validation.minlength'\n" +
    "               ng-maxlength='numericCtrl.validation.maxlength'\n" +
    "               ng-pattern='numericCtrl.validation.pattern'\n" +
    "               ng-min='numericCtrl.validation.min'\n" +
    "               ng-max='numericCtrl.validation.max'\n" +
    "               ng-blur=\"numericCtrl.ngBlur()\"\n" +
    "               sit-change=\"numericCtrl.sitChange\"\n" +
    "               ng-disabled=\"numericCtrl.ngDisabled\"\n" +
    "               ng-focus=\"numericCtrl.ngFocus()\"\n" +
    "               sit-form-input-validator />\n" +
    "    </div>\n" +
    "</ng-form>");
}]);

angular.module("common/widgets/overlay/overlay.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/overlay/overlay.html",
    "<div class=\"modal fade overlay-modal\" id={{overlayCtrl.modalid}} tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\" data-backdrop=\"static\">\n" +
    "    <div class=\"overlay-dialog\">\n" +
    "        <div class=\"overlay-content\">\n" +
    "            <div class=\"overlay-header\">\n" +
    "                <span data-internal-type=\"overlay-header-content\" class=\"overlay-title\">{{overlayCtrl.title}}</span>\n" +
    "            </div>\n" +
    "                <div data-internal-type=\"overlay-text-content\" class=\"overlay-body\" style=\"white-space:pre-wrap\">{{overlayCtrl.modaltext}}</div>\n" +
    "            <div class=\"overlay-footer\">\n" +
    "                <div data-internal-type=\"overlay-buttons-content\" class=\"overlay-div-button\" ng-repeat=\"button in overlayCtrl.buttons\">\n" +
    "                    <sit-dialog-button sit-button=\"button\" />\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("common/widgets/overlay/samples/overlay-dev-tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/overlay/samples/overlay-dev-tpl.html",
    "<div ng-controller=\"OverlayController as overlayDevCtrl\">\n" +
    "\n" +
    "    <div class=\"container\"><br />\n" +
    "        <div>\n" +
    "            Title:\n" +
    "            <input value=\"Main instruction\" ng-model=\"title\">\n" +
    "\n" +
    "        </div><br />\n" +
    "        <div>\n" +
    "            Text:\n" +
    "            <textarea ng-model=\"modaltext\" cols=\"50\" rows=\"5\">\n" +
    "                uifhufhurhfurh\n" +
    "                </textarea>\n" +
    "        </div><br />\n" +
    "        <div style=\"display:inline\">\n" +
    "            <button class=\"btn btn-primary btn-lg\" ng-click=\"overlayDevCtrl.addApplyButton(true)\">\n" +
    "                Add apply button\n" +
    "            </button>\n" +
    "            <button class=\"btn btn-primary btn-lg\" ng-click=\"overlayDevCtrl.addApplyButton(false)\">\n" +
    "                Delete apply button\n" +
    "            </button>\n" +
    "        </div><br /><br />\n" +
    "        <button class=\"btn btn-primary btn-lg\" ng-click=\"overlayDevCtrl.showOverlay('TestOverlay')\">\n" +
    "            Launch modal\n" +
    "        </button>\n" +
    "        <sit-overlay sit-modalid=\"TestOverlay\" sit-modaltext=\"modaltext\" sit-title=\"title\" sit-buttons=\"overlayDevCtrl.buttons\"></sit-overlay>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("common/widgets/overlay/samples/overlay-dev.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/overlay/samples/overlay-dev.html",
    "<!DOCTYPE html>\n" +
    "<html data-ng-app=\"app\">\n" +
    "<head>\n" +
    "    <title data-ng-bind=\"title\">Overlay Development</title>\n" +
    "    <meta charset=\"utf-8\" />\n" +
    "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge, chrome=1\" />\n" +
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no\" />\n" +
    "\n" +
    "    <link href=\"/common/styles/common-dark.css\" rel=\"stylesheet\" />\n" +
    "\n" +
    "    <style>\n" +
    "        html, body {\n" +
    "            width: '100%';\n" +
    "            height: '100%';\n" +
    "        }\n" +
    "\n" +
    "        #test-container {\n" +
    "            border: 2px solid black;\n" +
    "            padding: 4px;\n" +
    "            margin: 4px;\n" +
    "        }\n" +
    "    </style>\n" +
    "</head>\n" +
    "\n" +
    "<body ng-controller=\"OverlayController as overlayDevCtrl\">\n" +
    "\n" +
    "    <div class=\"container\"><br />\n" +
    "        <div>\n" +
    "            Title:\n" +
    "            <input value=\"Main instruction\" ng-model=\"title\">\n" +
    "\n" +
    "        </div><br />\n" +
    "        <div>\n" +
    "            Text:\n" +
    "            <textarea ng-model=\"modaltext\" cols=\"50\" rows=\"5\">\n" +
    "                uifhufhurhfurh\n" +
    "                </textarea>\n" +
    "        </div><br />\n" +
    "        <div style=\"display:inline\">\n" +
    "            <button class=\"btn btn-primary btn-lg\" ng-click=\"overlayDevCtrl.addApplyButton(true)\">\n" +
    "                Add apply button\n" +
    "            </button>\n" +
    "            <button class=\"btn btn-primary btn-lg\" ng-click=\"overlayDevCtrl.addApplyButton(false)\">\n" +
    "                Delete apply button\n" +
    "            </button>\n" +
    "        </div><br /><br />\n" +
    "        <button class=\"btn btn-primary btn-lg\" ng-click=\"overlayDevCtrl.showOverlay('TestOverlay')\">\n" +
    "            Launch modal\n" +
    "        </button>\n" +
    "        <sit-overlay sit-modalid=\"TestOverlay\" sit-modaltext=\"modaltext\" sit-title=\"title\" sit-buttons=\"overlayDevCtrl.buttons\"></sit-overlay>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Vendor Scripts -->\n" +
    "    <script src=\"/scripts/jquery-2.1.1.js\"></script>\n" +
    "    <script src=\"/scripts/angular/angular.js\"></script>\n" +
    "    <script src=\"/scripts/angular/angular-animate.js\"></script>\n" +
    "    <script src=\"/scripts/angular/angular-route.js\"></script>\n" +
    "    <script src=\"/scripts/angular/angular-sanitize.js\"></script>\n" +
    "    <script src=\"/scripts/bootstrap.js\"></script>\n" +
    "    <script src=\"/scripts/angular-ui/ui-bootstrap-tpls.js\"></script>\n" +
    "    <script src=\"/scripts/angular-ui-router.js\"></script>\n" +
    "\n" +
    "    <!-- Bootstrapping -->\n" +
    "    <script src=\"/app/common/widgets/overlay/docs/overlay-app.js\"></script>\n" +
    "\n" +
    "    <!-- Property Grid Widget scripts -->\n" +
    "\n" +
    "    <script src=\"/app/common/widgets/dialogButton/sit-dialog-button-mod.js\"></script>\n" +
    "    <script src=\"/app/common/widgets/dialogButton/sit-dialog-button-dir.js\"></script>\n" +
    "    <script src=\"/app/common/widgets/overlay/sit-overlay-mod.js\"></script>\n" +
    "    <script src=\"/app/common/widgets/overlay/sit-overlay-svc.js\"></script>\n" +
    "    <script src=\"/app/common/widgets/overlay/sit-overlay-dir.js\"></script>\n" +
    "   \n" +
    "\n" +
    "</body>\n" +
    "\n" +
    "</html>");
}]);

angular.module("common/widgets/pager/pager.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/pager/pager.html",
    "<div id=\"pagerContainer\" data-internal-type=\"pagerContainer\" class=\"ngGrid ngFooterPanel\" ng-class=\"{'ui-widget-content': jqueryuitheme, 'ui-corner-bottom': jqueryuitheme}\" ng-style=\"pagerCtrl.footerStyle()\">\n" +
    "    <div class=\"ngTotalSelectContainer\">\n" +
    "        <div class=\"ngFooterTotalItems\" ng-class=\"{ngNoMultiSelect: !multiselect}\">\n" +
    "            <span class=\"ngLabel\" ng-show=\"pagerCtrl.pagingOptions.showTotalItems\">{{'pager.total-items' | translate}}: {{pagerCtrl.pagingOptions.totalItems}}</span>\n" +
    "            <span class=\"ngLabel\" ng-show=\"pagerCtrl.pagingOptions.showFilterItems\">({{'pager.filtered-items' | translate}}: {{pagerCtrl.pagingOptions.filterItems}})</span>\n" +
    "        </div>\n" +
    "        <div class=\"ngFooterSelectedItems\" ng-show=\"pagerCtrl.pagingOptions.showSelectedItems\">\n" +
    "            <span class=\"ngLabel\">{{'pager.selected-items' | translate}}: {{pagerCtrl.pagingOptions.selectedItems}}</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"ngPagerContainer\" style=\"float: right; margin-top: 10px;\">\n" +
    "        <div style=\"float:left; margin-right: 10px;\" class=\"ngRowCountPicker\">\n" +
    "            <span style=\"float: left; margin-top: 5px; margin-right:5px\" class=\"ngLabel\">{{'pager.page-size' | translate}}:</span>\n" +
    "            <select style=\"float: left; height: 27px; width: 100px\" ng-model=\"pagerCtrl.pagingOptions.pageSize\" class=\"uyRowCountSelect\" ng-options=\"pageSize for pageSize in pagerCtrl.pagingOptions.pageSizes\">\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <div style=\"float:left; margin-right: 10px; min-width: 135px;\" class=\"ngPagerControl\">\n" +
    "            <button type=\"button\" class=\"ngPagerButton\" ng-click=\"pagerCtrl.pageToFirst()\" ng-disabled=\"pagerCtrl.cantPageBackward()\" title=\"{{'pager.page-first' | translate}}\"><div class=\"ngPagerFirstTriangle\"><div class=\"ngPagerFirstBar\"></div></div></button>\n" +
    "            <button type=\"button\" class=\"ngPagerButton\" ng-click=\"pagerCtrl.pageBackward()\" ng-disabled=\"pagerCtrl.cantPageBackward()\" title=\"{{'pager.page-prev' | translate}}\"><div class=\"ngPagerFirstTriangle ngpagerprevtriangle\"></div></button>\n" +
    "            <div style=\"display:inline-block; vertical-align:top;\">\n" +
    "                <input ng-show=\"pagerCtrl.currentPage\" class=\"ngPagerCurrent\" min=\"1\" max=\"{{pagerCtrl.maxPage}}\" type=\"number\" style=\"width:50px; padding: 0 4px 0 4px; height:25px; min-height: 25px; font-size: 12px;\" ng-model=\"pagerCtrl.currentPage\" />\n" +
    "                <span class=\"ngGridMaxPagesNumber\" ng-show=\"pagerCtrl.maxPage > 0\">/ {{pagerCtrl.maxPage}}</span>\n" +
    "            </div>\n" +
    "            <button type=\"button\" class=\"ngPagerButton\" ng-click=\"pagerCtrl.pageForward()\" ng-disabled=\"pagerCtrl.cantPageForward()\" title=\"{{'pager.page-next' | translate}}\"><div class=\"ngPagerLastTriangle ngpagernexttriangle\"></div></button>\n" +
    "            <button type=\"button\" class=\"ngPagerButton\" ng-click=\"pagerCtrl.pageToLast()\" ng-disabled=\"pagerCtrl.cantPageToLast()\" title=\"{{'pager.page-last' | translate}}\"><div class=\"ngPagerLastTriangle\"><div class=\"ngPagerLastBar\"></div></div></button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/pagination/extended-pagination.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/pagination/extended-pagination.html",
    "<div class=\"pl-buttons-square-group\">\n" +
    "\n" +
    "    <button type=\"button\" id=\"prev\" class=\"pl-button-square\" ng-class=\"{'small' : extendedPagerCtrl.options.size === 'small'}\" ng-click=\"extendedPagerCtrl.goToPage(extendedPagerCtrl.options.currentPage-1)\"  ng-if=\"extendedPagerCtrl.totalPages >0\" ng-disabled=\"extendedPagerCtrl.options.currentPage === 1 || extendedPagerCtrl.totalPages === 1 \">\n" +
    "        <span class=\"svg-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"{ path: 'common/icons/miscChevronLeft24.svg', size: '16'}\"></span>\n" +
    "    </button>\n" +
    "\n" +
    "    <button type=\"button\" id=\"goToFirst\" class=\"pl-button-square\"  ng-if=\"extendedPagerCtrl.totalPages >0\" ng-click=\"extendedPagerCtrl.goToPage(1)\" ng-class=\"{'selected':extendedPagerCtrl.options.currentPage===1,'small' : extendedPagerCtrl.options.size === 'small'}\">1</button>\n" +
    "\n" +
    "\n" +
    "    <button type=\"button\" class=\"pl-button-square\" \n" +
    "            ng-class=\"{'small' : extendedPagerCtrl.options.size === 'small'}\" \n" +
    "            data-sit-options=\"extendedPagerCtrl.flyoutOptions.left\" \n" +
    "            ng-if=\"extendedPagerCtrl.isLeftMoreBtnVisible\" data-sit-pagination-flyout>\n" +
    "        ...\n" +
    "    </button>\n" +
    "    <button ng-repeat=\"pageButton in extendedPagerCtrl.pageNumbers\" \n" +
    "            class=\"pl-button-square\" \n" +
    "            ng-class=\"{'selected':pageButton === extendedPagerCtrl.options.currentPage, 'small' : extendedPagerCtrl.options.size === 'small'}\"\n" +
    "            ng-click=\"extendedPagerCtrl.goToPage(pageButton)\">{{pageButton}}</button>\n" +
    "\n" +
    "\n" +
    "    <button type=\"button\" class=\"pl-button-square\" \n" +
    "            ng-class=\"{'small' : extendedPagerCtrl.options.size === 'small'}\" \n" +
    "            data-sit-options=\"extendedPagerCtrl.flyoutOptions.right\" \n" +
    "            ng-if=\"extendedPagerCtrl.isRightMoreBtnVisible\"  data-sit-pagination-flyout>\n" +
    "        ...\n" +
    "    </button>\n" +
    "\n" +
    "    <button type=\"button\" id=\"goToLast\" ng-if=\"extendedPagerCtrl.totalPages >1 \"class=\"pl-button-square\" ng-click=\"extendedPagerCtrl.goToPage(extendedPagerCtrl.totalPages)\" ng-class=\"{'selected':extendedPagerCtrl.options.currentPage===extendedPagerCtrl.totalPages,'small' : extendedPagerCtrl.options.size === 'small'}\">\n" +
    "        {{extendedPagerCtrl.totalPages}}\n" +
    "    </button>\n" +
    "\n" +
    "    <button type=\"button\" id=\"next\" ng-class=\"{'small' : extendedPagerCtrl.options.size === 'small'}\"  ng-if=\"extendedPagerCtrl.totalPages >0\" class=\"pl-button-square\" ng-click=\"extendedPagerCtrl.goToPage(extendedPagerCtrl.options.currentPage+1)\" ng-disabled=\"extendedPagerCtrl.options.currentPage === extendedPagerCtrl.totalPages || extendedPagerCtrl.totalPages === 1 \">\n" +
    "        <span class=\"svg-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"{ path: 'common/icons/miscChevronRight16.svg'}\"></span>\n" +
    "    </button>\n" +
    "\n" +
    "\n" +
    "</div>");
}]);

angular.module("common/widgets/pagination/pagination-label.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/pagination/pagination-label.html",
    "<div class=\"sit-pagination-label-layout sit-pagination-label\">\n" +
    "    <div ng-if=\"pgLabelCtrl.options.selectedItemsCount !== undefined\">\n" +
    "        {{'pagination.selected-items'|translate}}: {{pgLabelCtrl.options.selectedItemsCount}}\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        <span ng-show=\"(pgLabelCtrl.options.format !== pgLabelCtrl.FORMAT.SHORT)\">{{'pagination.showing'|translate}}</span>\n" +
    "        {{pgLabelCtrl.startValue}} {{'pagination.to'|translate}} {{pgLabelCtrl.endValue}} {{'pagination.of'|translate}}\n" +
    "        {{pgLabelCtrl.options.totalDataCount}}\n" +
    "        <span ng-show=\"(pgLabelCtrl.options.format !== pgLabelCtrl.FORMAT.SHORT)\">{{'pagination.entries'|translate}}</span>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/pagination/pagination-left-pages-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/pagination/pagination-left-pages-template.html",
    "<button ng-click=\"FlyoutCtrl.closeFlyout($event)\" ng-class=\"{'small' : FlyoutCtrl.options.size === 'small'}\" class=\"pl-button-square\" ng-repeat=\"button in FlyoutCtrl.options.templatedata\"> {{button}} </button>");
}]);

angular.module("common/widgets/pagination/pagination-page-size.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/pagination/pagination-page-size.html",
    "<div class=\"sit-pagination-page-size\">\n" +
    "    <span class=\"page-size-label\">{{'pager.page-size' | translate}}</span>\n" +
    "    <sit-select sit-value=\"paginationPageSizeCtrl.options.selectedPageSize\"\n" +
    "                sit-options=\"paginationPageSizeCtrl.options.pages\" sit-change=\"paginationPageSizeCtrl.pageSizeChange\"\n" +
    "                sit-to-display=\"'size'\" sit-to-keep=\"'size'\" class=\"page-size-dropdown\">\n" +
    "    </sit-select>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/pagination/pagination-right-pages-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/pagination/pagination-right-pages-template.html",
    "<button ng-click=\"FlyoutCtrl.closeFlyout($event)\" ng-class=\"{'small' : FlyoutCtrl.options.size === 'small'}\" class=\"pl-button-square\" ng-repeat=\"button in FlyoutCtrl.options.templatedata\"> {{button}} </button>");
}]);

angular.module("common/widgets/pagination/pagination.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/pagination/pagination.html",
    "<div class=\"sit-pagination\" ng-if=\"pgCtrl.pagerOptions.totalDataCount\">\n" +
    "    <div class=\"first-row\" ng-if=\"pgCtrl.options.display === 'multiline'\">\n" +
    "        <div class=\"label\">\n" +
    "            <sit-pagination-label sit-options=\"pgCtrl.labelOptions\"></sit-pagination-label>\n" +
    "        </div>\n" +
    "        <div class=\"page-size\">\n" +
    "            <sit-pagination-page-size sit-options=\"pgCtrl.pageSizeOptions\"></sit-pagination-page-size>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"second-row\">\n" +
    "        <div class=\"label\" ng-if=\"pgCtrl.options.display === 'inline'\">\n" +
    "            <sit-pagination-label sit-options=\"pgCtrl.labelOptions\"></sit-pagination-label>\n" +
    "        </div>\n" +
    "        <div class=\"page-navigation-section\">\n" +
    "            <div class=\"pager-section\" ng-if=\"pgCtrl.pagerOptions.totalDataCount > pgCtrl.pagerOptions.pageSize \">\n" +
    "                <sit-standard-pager ng-if=\"pgCtrl.pagerOptions.type === 'standard'\" sit-options=\"pgCtrl.pagerOptions\"></sit-standard-pager>\n" +
    "                <sit-simple-pager ng-if=\"pgCtrl.pagerOptions.type === 'simple'\" sit-options=\"pgCtrl.pagerOptions\"></sit-simple-pager>\n" +
    "                <sit-extended-pager ng-if=\"pgCtrl.pagerOptions.type === 'extended'\" sit-options=\"pgCtrl.pagerOptions\"></sit-extended-pager>\n" +
    "            </div>\n" +
    "            <div class=\"page-size\" ng-if=\"pgCtrl.options.display === 'inline'\">\n" +
    "                <sit-pagination-page-size sit-options=\"pgCtrl.pageSizeOptions\"></sit-pagination-page-size>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div> ");
}]);

angular.module("common/widgets/pagination/simple-pagination.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/pagination/simple-pagination.html",
    "<div class=\"sit-simple-paginaton pl-buttons-square-group\">\n" +
    "    <button type=\"button\" class=\"pl-button-square\" ng-disabled=\"SimplePagerCtrl.options.currentPage === 1\" ng-click=\"SimplePagerCtrl.changePage(SimplePagerCtrl.options.currentPage = 1)\" ng-class=\"{'small' : standardPagerCtrl.options.size === 'small'}\">\n" +
    "        <span class=\"svg-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"{path: 'common/icons/miscGoToFirst16.svg'}\"></span>\n" +
    "    </button>\n" +
    "\n" +
    "    <button type=\"button\" class=\"pl-button-square\" ng-disabled=\"SimplePagerCtrl.options.currentPage === 1\" ng-click=\"SimplePagerCtrl.changePage(SimplePagerCtrl.options.currentPage = SimplePagerCtrl.options.currentPage - 1)\" ng-class=\"{'small' : standardPagerCtrl.options.size === 'small'}\">\n" +
    "        <span class=\"svg-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"{path: 'common/icons/miscChevronLeft24.svg', size: '16'}\"></span>\n" +
    "    </button>\n" +
    "\n" +
    "    <div class=\"sit-pagination-page-number\">\n" +
    "        <span class=\"page-size-label\">{{'pager.page' | translate}}</span>\n" +
    "        <sit-select sit-value=\"SimplePagerCtrl.pagingOptions.currentPageNumber\"\n" +
    "                    sit-options=\"SimplePagerCtrl.pagingOptions.options\"\n" +
    "                    sit-change=\"SimplePagerCtrl.selectPage\"\n" +
    "                    sit-to-display=\"'page'\" sit-to-keep=\"'page'\">\n" +
    "        </sit-select>\n" +
    "    </div>\n" +
    "\n" +
    "    <button type=\"button\" class=\"pl-button-square\" ng-disabled=\"SimplePagerCtrl.options.currentPage === SimplePagerCtrl.totalPageCount\" ng-click=\"SimplePagerCtrl.changePage(SimplePagerCtrl.options.currentPage =  SimplePagerCtrl.options.currentPage + 1)\" ng-class=\"{'small' : standardPagerCtrl.options.size === 'small'}\">\n" +
    "        <span class=\"svg-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"{path: 'common/icons/miscChevronRight16.svg'}\"></span>\n" +
    "    </button>\n" +
    "\n" +
    "\n" +
    "    <button type=\"button\" class=\"pl-button-square\" ng-disabled=\"SimplePagerCtrl.options.currentPage === SimplePagerCtrl.totalPageCount\" ng-click=\"SimplePagerCtrl.changePage(SimplePagerCtrl.options.currentPage = SimplePagerCtrl.totalPageCount)\" ng-class=\"{'small' : standardPagerCtrl.options.size === 'small'}\">\n" +
    "        <span class=\"svg-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"{path: 'common/icons/miscGoToLast16.svg'}\"></span>\n" +
    "    </button>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/pagination/standard-pagination.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/pagination/standard-pagination.html",
    "<div class=\"pl-buttons-square-group\">\n" +
    "    <button type=\"button\" id=\"goToFirst\" class=\"pl-button-square\" ng-click=\"standardPagerCtrl.goToFirst()\"\n" +
    "            ng-disabled=\"standardPagerCtrl.options.currentPage === 1\">\n" +
    "        <span class=\"svg-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"{ path: 'common/icons/miscGoToFirst16.svg'}\"></span>\n" +
    "    </button>\n" +
    "\n" +
    "    <button type=\"button\" id=\"prev\" class=\"pl-button-square\" ng-click=\"standardPagerCtrl.stepBackward()\"\n" +
    "            ng-disabled=\"standardPagerCtrl.options.currentPage === 1\">\n" +
    "        <span class=\"svg-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"{ path: 'common/icons/miscChevronLeft24.svg', size: '16'}\"></span>\n" +
    "    </button>\n" +
    "\n" +
    "    <button ng-repeat=\"pageButton in standardPagerCtrl.pageNumbers\" ng-class=\"{'selected': pageButton === standardPagerCtrl.options.currentPage}\"\n" +
    "            class=\"pl-button-square\" ng-click=\"standardPagerCtrl.onPageChanged(pageButton,$index)\">\n" +
    "        {{pageButton}}\n" +
    "    </button>\n" +
    "\n" +
    "    <button type=\"button\" id=\"next\" class=\"pl-button-square\" ng-click=\"standardPagerCtrl.stepForward()\"\n" +
    "            ng-disabled=\"standardPagerCtrl.options.currentPage === standardPagerCtrl.totalPages\">\n" +
    "        <span class=\"svg-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"{ path: 'common/icons/miscChevronRight16.svg'}\"></span>\n" +
    "    </button>\n" +
    "\n" +
    "    <button type=\"button\" id=\"goToLast\" class=\"pl-button-square\"\n" +
    "            ng-click=\"standardPagerCtrl.goToLast()\"\n" +
    "            ng-disabled=\"standardPagerCtrl.options.currentPage === standardPagerCtrl.totalPages\">\n" +
    "        <span class=\"svg-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"{ path: 'common/icons/miscGoToLast16.svg'}\"></span>\n" +
    "    </button>\n" +
    "</div>");
}]);

angular.module("common/widgets/password/password.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/password/password.html",
    "<div ng-if=\"passwordCtrl.readOnly || passwordCtrl.ngReadonly\" class=\"label-property-grid-control-readonly property-value-ellipsis\"> {{passwordCtrl.value}} </div>\n" +
    "\n" +
    "<ng-form name='textForm' ng-if=\"!(passwordCtrl.readOnly || passwordCtrl.ngReadonly)\" ng-class=\"{'isrequired' : (passwordCtrl.validation.required) && passwordCtrl.value===undefined}\">\n" +
    "    <div class='property-grid-input-group'>\n" +
    "        <input type='password'\n" +
    "               name='{{passwordCtrl.name}}'\n" +
    "               ng-class='{\"validator-control-invalid\":((textForm.$invalid && textForm.$dirty) || (textForm.$invalid && textForm.$visited)),\n" +
    "                \"validator-control\":!((textForm.$invalid && textForm.$dirty) || (textForm.$invalid && textForm.$visited)) ,\n" +
    "                \"ng-dirty\":textForm.$dirty}'\n" +
    "               ng-model='passwordCtrl.value'\n" +
    "               ng-required='passwordCtrl.validation.required'\n" +
    "               ng-minlength='passwordCtrl.validation.minlength'\n" +
    "               ng-maxlength='passwordCtrl.validation.maxlength'\n" +
    "               ng-pattern='passwordCtrl.validation.pattern'\n" +
    "               ng-blur=\"passwordCtrl.ngBlur()\"\n" +
    "               sit-change=\"passwordCtrl.sitChange\"\n" +
    "               ng-disabled=\"passwordCtrl.ngDisabled\"\n" +
    "               ng-focus=\"passwordCtrl.ngFocus()\"\n" +
    "               sit-form-input-validator='Password'\n" +
    "               ng-readonly=\"passwordCtrl.ngReadonly\" />\n" +
    "    </div>\n" +
    "</ng-form>");
}]);

angular.module("common/widgets/popUpPanel/pop-up-panel.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/popUpPanel/pop-up-panel.html",
    "<div class=\"pop-up-panel-container\" ng-show=\"popUpPanel.sitPopUpContent.showContent\">\n" +
    "    <div class=\"pop-up-panel-header\">\n" +
    "        <div class=\"pop-up-panel-header-text\">{{popUpPanel.sitPopUpContent.title}}</div>\n" +
    "        <div class=\"pop-up-panel-close-button\">\n" +
    "            <button type=\"button\" class=\"pop-up-panel-close-btn\" ng-click=\"popUpPanel.closePopUpPanel()\" title=\"{{'sidePanel.close'|translate}}\">\n" +
    "                <span class=\"fa fa-times pop-up-panel-close-img\" sit-class=\"pop-up-panel-mom-button\" sit-mom-icon=\"popUpPanel.closePanel\" aria-hidden=\"true\"\n" +
    "                      ng-class=\"{momIcon: popUpPanel.closePanel !== null }\"></span>\n" +
    "            </button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"pop-up-panel-content\" ng-transclude>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/propertyGrid/property-grid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/propertyGrid/property-grid.html",
    "<!--Old Configuration-->\n" +
    "<div class=\"property-grid-container\" ng-if=\"!propertyGridCtrl.transclusionIsSet\">\n" +
    "    <sit-property-grid-layout ng-if=\"propertyGridCtrl.layout === 'Vertical' || (propertyGridCtrl.mode !== 'list' && propertyGridCtrl.showGroups) \"\n" +
    "                              sit-id=\"{{propertyGridCtrl.id}}\"\n" +
    "                              sit-mode=\"{{propertyGridCtrl.mode}}\"\n" +
    "                              sit-data=\"propertyGridCtrl.data\"\n" +
    "                              class=\"property-grid-vertical-layout\" ng-class=\"{'pl-property-grid-list':(propertyGridCtrl.mode == 'list' && propertyGridCtrl.showGroups !== true) ,\n" +
    "                                  'pl-property-grid-list pl-property-grid-group':  (propertyGridCtrl.mode == 'list' && propertyGridCtrl.showGroups === true)}\"\n" +
    "                              ng-transclude>\n" +
    "    </sit-property-grid-layout>\n" +
    "    <sit-property-grid-layout ng-if=\"propertyGridCtrl.layout === 'Horizontal' && propertyGridCtrl.type === 'Fixed' && !propertyGridCtrl.showGroups\"\n" +
    "                              sit-id=\"{{propertyGridCtrl.id}}\"\n" +
    "                              sit-mode=\"{{propertyGridCtrl.mode}}\"\n" +
    "                              sit-data=\"propertyGridCtrl.data\"\n" +
    "                              ng-attr-class=\"{{propertyGridCtrl.columns !== 0 ? 'property-grid-horizontal-fixed-layout x' + propertyGridCtrl.columns : 'property-grid-horizontal-fixed-layout'}}\"\n" +
    "                              ng-class=\"{'pl-property-grid-list': propertyGridCtrl.mode == 'list',\n" +
    "                              'pl-property-grid-group-list': (propertyGridCtrl.mode == 'list' && propertyGridCtrl.columns && propertyGridCtrl.columns !== 0)}\">\n" +
    "    </sit-property-grid-layout>\n" +
    "\n" +
    "    <sit-property-grid-layout ng-if=\"propertyGridCtrl.layout === 'Horizontal'  && (propertyGridCtrl.type === 'Fixed' || propertyGridCtrl.type === 'Fluid') && propertyGridCtrl.showGroups && propertyGridCtrl.mode === 'list'\"\n" +
    "                              sit-id=\"{{propertyGridCtrl.id}}\"\n" +
    "                              sit-mode=\"{{propertyGridCtrl.mode}}\"\n" +
    "                              sit-data=\"propertyGridCtrl.data\"\n" +
    "                              ng-class=\"{'pl-property-grid-list': propertyGridCtrl.mode == 'list' }\">\n" +
    "    </sit-property-grid-layout>\n" +
    "    <sit-property-grid-layout ng-if=\"propertyGridCtrl.layout === 'Horizontal' && propertyGridCtrl.type === 'Fluid' && !propertyGridCtrl.showGroups\"\n" +
    "                              sit-id=\"{{propertyGridCtrl.id}}\"\n" +
    "                              sit-mode=\"{{propertyGridCtrl.mode}}\"\n" +
    "                              sit-data=\"propertyGridCtrl.data\"\n" +
    "                              class=\"property-grid-horizontal-fluid-layout\" ng-class=\"{'pl-property-grid-list': propertyGridCtrl.mode == 'list' }\">\n" +
    "    </sit-property-grid-layout>\n" +
    "\n" +
    "    <div ng-if=\"propertyGridCtrl.layout === 'Horizontal' && (propertyGridCtrl.type !== 'Fixed' && propertyGridCtrl.type !== 'Fluid')\">\n" +
    "        {{'propertyGrid.invalidLayout'|translate}}\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<!--New Configuration-->\n" +
    "\n" +
    "<div class=\"property-grid-container\" ng-if=\"propertyGridCtrl.transclusionIsSet\">\n" +
    "    <form name=\"{{'Form'+propertyGridCtrl.id}}\">\n" +
    "        <sit-property-grid-layout ng-if=\"propertyGridCtrl.layout === 'Vertical' || (propertyGridCtrl.mode !== 'list' && propertyGridCtrl.showGroups) \"\n" +
    "                                  sit-id=\"{{propertyGridCtrl.id}}\"\n" +
    "                                  sit-mode=\"{{propertyGridCtrl.mode}}\"\n" +
    "                                  class=\"property-grid-vertical-layout\"\n" +
    "                                  ng-class=\"{'pl-property-grid-list':(propertyGridCtrl.mode == 'list' && propertyGridCtrl.showGroups !== true) ,\n" +
    "                                  'pl-property-grid-list pl-property-grid-group':  (propertyGridCtrl.mode == 'list' && propertyGridCtrl.showGroups === true)}\"\n" +
    "                                  ng-transclude>\n" +
    "        </sit-property-grid-layout>\n" +
    "        <sit-property-grid-layout ng-if=\"propertyGridCtrl.layout === 'Horizontal' && propertyGridCtrl.type === 'Fixed' && !propertyGridCtrl.showGroups\"\n" +
    "                                  sit-id=\"{{propertyGridCtrl.id}}\"\n" +
    "                                  sit-mode=\"{{propertyGridCtrl.mode}}\"\n" +
    "                                  ng-attr-class=\"{{propertyGridCtrl.columns !== 0 ? 'property-grid-horizontal-fixed-layout x' + propertyGridCtrl.columns : 'property-grid-horizontal-fixed-layout'}}\"\n" +
    "                                  ng-class=\"{'pl-property-grid-list': propertyGridCtrl.mode == 'list' }\" ng-transclude>\n" +
    "        </sit-property-grid-layout>\n" +
    "        <sit-property-grid-layout ng-if=\"propertyGridCtrl.layout === 'Horizontal' && propertyGridCtrl.type === 'Fluid' && !propertyGridCtrl.showGroups\"\n" +
    "                                  sit-id=\"{{propertyGridCtrl.id}}\"\n" +
    "                                  sit-mode=\"{{propertyGridCtrl.mode}}\"\n" +
    "                                  class=\"property-grid-horizontal-fluid-layout\" ng-class=\"{'pl-property-grid-list': propertyGridCtrl.mode == 'list' }\" ng-transclude>\n" +
    "        </sit-property-grid-layout>\n" +
    "        <div ng-if=\"propertyGridCtrl.layout === 'Horizontal' && (propertyGridCtrl.type !== 'Fixed' && propertyGridCtrl.type !== 'Fluid')\">\n" +
    "            {{'propertyGrid.invalidLayout'|translate}}\n" +
    "        </div>\n" +
    "    </form>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("common/widgets/propertyGrid/property-group.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/propertyGrid/property-group.html",
    "<div class=\"property-grid-group\" ng-if=\"propertyGroupCtrl.accordion\">\n" +
    "    <div ng-if=\"propertyGroupCtrl.isCollapsible\" class=\"group-header\" ng-click=\"propertyGroupCtrl.toggle()\">\n" +
    "        <div class=\"group-toggle collapsed\" ng-class=\"{collapsed: propertyGroupCtrl.singleSelection && propertyGroupCtrl.isCollapsed}\" aria-controls=\"#{{propertyGroupCtrl.sitId}}AccordionBody\" data-toggle=\"collapse\" data-target=\"#{{propertyGroupCtrl.sitId}}AccordionBody\"\n" +
    "             aria-expanded=\"false\" data-parent=\"#accordionExample\">\n" +
    "            <span class=\"group-header-arrow-button\" sit-mom-icon=\"propertyGroupCtrl.svgIcon\" sit-class=\"svg-icon\"></span>\n" +
    "            <span class=\"group-header-label\"> {{propertyGroupCtrl.name}}</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div ng-if=\"!propertyGroupCtrl.isCollapsible\" class=\"group-header\">\n" +
    "        <div>{{propertyGroupCtrl.name}}</div>\n" +
    "    </div>\n" +
    "    <div id=\"{{propertyGroupCtrl.sitId}}AccordionBody\" class=\"group-body collapse\" ng-class=\"{'show': !propertyGroupCtrl.isCollapsible, 'in' : propertyGroupCtrl.singleSelection && !propertyGroupCtrl.isCollapsed }\">\n" +
    "        <div class=\"cf\">\n" +
    "            <div ng-if=\"propertyGroupCtrl.parentScope.layout === 'Vertical'\"\n" +
    "                 class=\"property-grid-vertical-layout\" ng-transclude>\n" +
    "            </div>\n" +
    "            <div ng-if=\"propertyGroupCtrl.parentScope.layout === 'Horizontal' && propertyGroupCtrl.parentScope.type === 'Fixed'\"\n" +
    "                 ng-attr-class=\"{{propertyGroupCtrl.parentScope.columns !== 0 ? 'property-grid-horizontal-fixed-layout x' + propertyGroupCtrl.parentScope.columns : 'property-grid-horizontal-fixed-layout'}}\"\n" +
    "                 ng-class=\"{'pl-property-grid-group-list': (propertyGroupCtrl.parentScope.mode == 'list' && propertyGroupCtrl.parentScope.columns)}\"\n" +
    "                 ng-transclude>\n" +
    "            </div>\n" +
    "            <div ng-if=\"propertyGroupCtrl.parentScope.layout === 'Horizontal' && propertyGroupCtrl.parentScope.type === 'Fluid'\"\n" +
    "                 class=\"property-grid-horizontal-fluid-layout\" ng-transclude>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div ng-if=\"propertyGroupCtrl.parentScope.layout == 'Vertical' && !propertyGroupCtrl.accordion\" class=\"property-grid-vertical-list-layout\">\n" +
    "    <div ng-transclude></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/propertyGrid/property.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/propertyGrid/property.html",
    "<div class=\"property\" ng-if=\"propertyCtrl.parentScope.mode !== 'list'\" data-mode=\"{{propertyCtrl.parentScope.mode}}\">\n" +
    "    <div ng-class=\"[{ asterisk_req:propertyCtrl.sitRequired || (propertyCtrl.validation && propertyCtrl.validation.required)},\n" +
    "         { VERTICAL: 'vertical-property-grid-control-label',\n" +
    "           HORIZONTAL: { FLUID: ['property-grid-col-label-fluid',{true: 'property-group-col-width', false: 'property-grid-col-label-width'}[propertyCtrl.isWithinGroup]],\n" +
    "                         FIXED: ['property-grid-col-label-fixed',{true: 'property-group-col-width', false: 'property-grid-col-label-width'}[propertyCtrl.isWithinGroup]]\n" +
    "                        }[propertyCtrl.parentScope.type]\n" +
    "        }[propertyCtrl.parentScope.layout]]\"><span ng-class=\"propertyCtrl.ngDisabled? 'property-label-disabled' : 'property-label'\" ng-transclude></span><sup ng-if=\"propertyCtrl.sitRequired || (propertyCtrl.validation && propertyCtrl.validation.required)\">*</sup></div>\n" +
    "    <div ng-if=\"propertyCtrl.isMultiValueWidget && propertyCtrl.value.length === 0 && !(propertyCtrl.readOnly || propertyCtrl.ngReadonly)\">\n" +
    "        <a class=\"btn btn-link\" ng-click=\"propertyCtrl.addWidgetInstance(0)\">{{'propertyGrid.property.addItem'|translate}}</a>\n" +
    "    </div>\n" +
    "    <div ng-if=\"propertyCtrl.isMultiValueWidget\"\n" +
    "         ng-class=\"[{HORIZONTAL:\n" +
    "                        { FLUID: ['property-grid-col-value-fluid',{ true: 'property-group-col-width', false: 'property-grid-col-value-width'}[propertyCtrl.isWithinGroup]],\n" +
    "                          FIXED: ['property-grid-col-value-fixed',{ true: 'property-group-col-width', false: 'property-grid-col-value-width'}[propertyCtrl.isWithinGroup]]\n" +
    "                        }[propertyCtrl.parentScope.type]}[propertyCtrl.parentScope.layout]]\">\n" +
    "        <div ng-repeat=\"item in propertyCtrl.value track by $index\" ng-class=\"{'property-grid-control-div': !(propertyCtrl.ngReadonly || propertyCtrl.readOnly)}\">\n" +
    "            <div ng-hide=\"propertyCtrl.ngReadonly || propertyCtrl.readOnly\" class=\"property-grid-icons-div\">\n" +
    "                <span title=\"{{propertyCtrl.addBtnTitle}}\" class=\"property-grid-icon-add\" ng-click=\"propertyCtrl.addWidgetInstance($index)\" ng-disabled=\"propertyCtrl.value.length === propertyCtrl.maxItems\"><em class=\"fa fa-plus\"></em></span>\n" +
    "                <span title=\"{{propertyCtrl.removeBtnTitle}}\" class=\"property-grid-icon-remove\" ng-click=\"propertyCtrl.removeWidgetInstance($index)\" ng-disabled=\"propertyCtrl.value.length <= propertyCtrl.minItems\"><em class=\"fa fa-times\"></em></span>\n" +
    "            </div>\n" +
    "            <div ng-class=\"{ 'property-grid-item-div': !(propertyCtrl.ngReadonly || propertyCtrl.readOnly), 'property-grid-item-div-readonly': (propertyCtrl.ngReadonly || propertyCtrl.readOnly) }\">\n" +
    "                <sit-property-item sit-widget=\"{{propertyCtrl.sitWidget}}\" sit-id=\"{{propertyCtrl.sitId}}\"\n" +
    "                                   sit-name=\"{{propertyCtrl.name+$index}}\"\n" +
    "                                   sit-value=\"propertyCtrl.value[$index]\"\n" +
    "                                   sit-validation=\"propertyCtrl.validation\"\n" +
    "                                   sit-read-only=\"propertyCtrl.readOnly\"\n" +
    "                                   sit-placeholder=\"propertyCtrl.placeholder\"\n" +
    "                                   sit-limit=\"propertyCtrl.limit\"\n" +
    "                                   sit-template-url=\"propertyCtrl.templateUrl\"\n" +
    "                                   sit-selected-attribute-to-display=\"propertyCtrl.selectedAttributeToDisplay\"\n" +
    "                                   sit-attribute-to-search=\"propertyCtrl.attributeToSearch\"\n" +
    "                                   sit-options=\"propertyCtrl.options\"\n" +
    "                                   sit-to-display=\"propertyCtrl.toDisplay\"\n" +
    "                                   sit-to-keep=\"propertyCtrl.toKeep\"\n" +
    "                                   sit-datasource=\"propertyCtrl.sitDatasource\"\n" +
    "                                   sit-selected-object=\"propertyCtrl.sitSelectedObject\"\n" +
    "                                   sit-editable=\"propertyCtrl.sitEditable\"\n" +
    "                                   accept=\"propertyCtrl.accept\"\n" +
    "                                   sit-min-size=\"propertyCtrl.sitMinSize\"\n" +
    "                                   sit-max-size=\"propertyCtrl.sitMaxSize\"\n" +
    "                                   sit-selected-string=\"propertyCtrl.sitSelectedString\"\n" +
    "                                   sit-split-list=\"propertyCtrl.sitSplitList\"\n" +
    "                                   sit-done-callback=\"propertyCtrl.sitDoneCallback\"\n" +
    "                                   sit-format=\"propertyCtrl.format\"\n" +
    "                                   sit-append-to-body=\"propertyCtrl.appendToBody\"\n" +
    "                                   sit-show-button-bar=\"propertyCtrl.showButtonBar\"\n" +
    "                                   sit-show-weeks=\"propertyCtrl.showWeeks\"\n" +
    "                                   sit-show-meridian=\"propertyCtrl.showMeridian\"\n" +
    "                                   sit-widget-attributes=\"propertyCtrl.widgetAttributes\"\n" +
    "                                   ng-blur=\"propertyCtrl.ngBlur()\"\n" +
    "                                   sit-change=\"propertyCtrl.sitChange\"\n" +
    "                                   ng-disabled=\"propertyCtrl.ngDisabled\"\n" +
    "                                   ng-focus=\"propertyCtrl.ngFocus()\"\n" +
    "                                   ng-readonly=\"propertyCtrl.ngReadonly\"\n" +
    "                                   ng-model=\"propertyCtrl.value[$index]\"\n" +
    "                                   sit-required=\"propertyCtrl.sitRequired\"\n" +
    "                                   class=\"property-grid-input-group\"\n" +
    "                                   sit-allow-reset=\"propertyCtrl.sitAllowReset\">\n" +
    "                </sit-property-item>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div ng-if=\"!propertyCtrl.isMultiValueWidget\"\n" +
    "         ng-class=\"[{HORIZONTAL: { FLUID: ['property-grid-col-value-fluid',{ true: 'property-group-col-width', false: 'property-grid-col-value-width'}[propertyCtrl.isWithinGroup]],\n" +
    "                                   FIXED: ['property-grid-col-value-fixed',{ true: 'property-group-col-width', false: 'property-grid-col-value-width'}[propertyCtrl.isWithinGroup]]\n" +
    "                                 }[propertyCtrl.parentScope.type]}[propertyCtrl.parentScope.layout]]\">\n" +
    "        <sit-property-item ng-if=\"propertyCtrl.parentScope.mode !== 'list'\" sit-widget=\"{{propertyCtrl.sitWidget}}\" sit-id=\"{{propertyCtrl.sitId}}\"\n" +
    "                           sit-name=\"{{propertyCtrl.name}}\"\n" +
    "                           sit-value=\"propertyCtrl.value\"\n" +
    "                           sit-validation=\"propertyCtrl.validation\"\n" +
    "                           sit-read-only=\"propertyCtrl.readOnly\"\n" +
    "                           sit-placeholder=\"propertyCtrl.placeholder\"\n" +
    "                           sit-limit=\"propertyCtrl.limit\"\n" +
    "                           sit-template-url=\"propertyCtrl.templateUrl\"\n" +
    "                           sit-selected-attribute-to-display=\"propertyCtrl.selectedAttributeToDisplay\"\n" +
    "                           sit-attribute-to-search=\"propertyCtrl.attributeToSearch\"\n" +
    "                           sit-options=\"propertyCtrl.options\"\n" +
    "                           sit-to-display=\"propertyCtrl.toDisplay\"\n" +
    "                           sit-to-keep=\"propertyCtrl.toKeep\"\n" +
    "                           sit-datasource=\"propertyCtrl.sitDatasource\"\n" +
    "                           sit-selected-object=\"propertyCtrl.sitSelectedObject\"\n" +
    "                           sit-editable=\"propertyCtrl.sitEditable\"\n" +
    "                           accept=\"propertyCtrl.accept\"\n" +
    "                           sit-min-size=\"propertyCtrl.sitMinSize\"\n" +
    "                           sit-max-size=\"propertyCtrl.sitMaxSize\"\n" +
    "                           sit-selected-string=\"propertyCtrl.sitSelectedString\"\n" +
    "                           sit-split-list=\"propertyCtrl.sitSplitList\"\n" +
    "                           sit-done-callback=\"propertyCtrl.sitDoneCallback\"\n" +
    "                           sit-format=\"propertyCtrl.format\"\n" +
    "                           sit-append-to-body=\"propertyCtrl.appendToBody\"\n" +
    "                           sit-show-button-bar=\"propertyCtrl.showButtonBar\"\n" +
    "                           sit-show-weeks=\"propertyCtrl.showWeeks\"\n" +
    "                           sit-show-meridian=\"propertyCtrl.showMeridian\"\n" +
    "                           sit-widget-attributes=\"propertyCtrl.widgetAttributes\"\n" +
    "                           ng-blur=\"propertyCtrl.ngBlur()\"\n" +
    "                           sit-change=\"propertyCtrl.sitChange\"\n" +
    "                           ng-disabled=\"propertyCtrl.ngDisabled\"\n" +
    "                           ng-focus=\"propertyCtrl.ngFocus()\"\n" +
    "                           ng-readonly=\"propertyCtrl.ngReadonly\"\n" +
    "                           ng-model=\"propertyCtrl.value\"\n" +
    "                           sit-required=\"propertyCtrl.sitRequired\"\n" +
    "                           class=\"property-grid-input-group\"\n" +
    "                           sit-allow-reset=\"propertyCtrl.sitAllowReset\">\n" +
    "        </sit-property-item>\n" +
    "        <span class=\"pl-value\" ng-if=\"propertyCtrl.parentScope.mode === 'list'\" style=\"padding-left:16px; display: table-cell\">{{propertyCtrl.parseValue(propertyCtrl)}}</span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"pl-label\" ng-if=\"propertyCtrl.parentScope.mode === 'list'\" style=\"display: table-cell\"><span ng-transclude></span></div>\n" +
    "<span class=\"pl-value\" ng-if=\"propertyCtrl.parentScope.mode === 'list'\" style=\"display: table-cell\">{{propertyCtrl.listValue(propertyCtrl)}}</span>");
}]);

angular.module("common/widgets/radio/radio.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/radio/radio.html",
    "<div class=\"sit-radio\">\n" +
    "    <div class=\"label label-property-grid-control-readonly\" ng-if=\"radioCtrl.readOnly || radioCtrl.ngReadonly || radioCtrl.ngDisabled\">\n" +
    "        <ng-form name=\"radioForm\" ng-class=\"{'isrequired' :(radioCtrl.validation.required) && radioCtrl.value===undefined}\">\n" +
    "            <div class=\"property-grid-span-group-block\" ng-model=\"radioCtrl.value\">\n" +
    "                <div class=\"radiogroup group-control\" ng-repeat=\"val in radioCtrl.options\" ng-checked=\"radioCtrl.value === val.value\" ng-class=\"radioCtrl.layout === 'horizontal' ? 'horizontal-layout':'vertical-layout'\">\n" +
    "                    <div class=\"group-control-data radio-button\" ng-class=\"!(radioCtrl.readOnly || radioCtrl.ngReadonly || radioCtrl.ngDisabled) ? 'radio-enabled' : 'radio-disabled'\">\n" +
    "                        <input type='radio'\n" +
    "                               name='{{radioCtrl.name}}'\n" +
    "                               ng-model='radioCtrl.value'\n" +
    "                               ng-required=\"radioCtrl.validation.required\"\n" +
    "                               ng-value='val.value'\n" +
    "                               sit-change=\"radioCtrl.sitChange\"\n" +
    "                               ng-disabled=\"radioCtrl.ngDisabled\"\n" +
    "                               ng-readonly=\"radioCtrl.ngReadOnly\"\n" +
    "                               shared-model=\"true\"\n" +
    "                               sit-form-input-validator />\n" +
    "                        <span class=\"radio-text\">{{val.label}}</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </ng-form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <ng-form ng-if=\"!(radioCtrl.readOnly || radioCtrl.ngReadonly || radioCtrl.ngDisabled)\" name=\"radioForm\" ng-class=\"{'isrequired' :(radioCtrl.validation.required) && radioCtrl.value===undefined}\">\n" +
    "        <div class=\"property-grid-span-group-block validator-control\" ng-model=\"radioCtrl.value\">\n" +
    "            <div class=\"radiogroup group-control\" ng-repeat=\"val in radioCtrl.options\" ng-checked=\"radioCtrl.value === val.value\" ng-class=\"radioCtrl.layout === 'horizontal' ? 'horizontal-layout':'vertical-layout'\">\n" +
    "                <div class=\"group-control-data radio-button\" ng-class=\"!radioCtrl.ngDisabled ? 'radio-enabled' : 'radio-disabled'\">\n" +
    "                    <input type='radio'\n" +
    "                           name='{{radioCtrl.name}}'\n" +
    "                           ng-model='radioCtrl.value'\n" +
    "                           ng-required=\"radioCtrl.validation.required\"\n" +
    "                           ng-value='val.value'\n" +
    "                           sit-change=\"radioCtrl.sitChange\"\n" +
    "                           ng-disabled=\"radioCtrl.ngDisabled\"\n" +
    "                           ng-readonly=\"radioCtrl.ngReadOnly\"\n" +
    "                           shared-model=\"true\"\n" +
    "                           sit-form-input-validator />\n" +
    "                    <span class=\"radio-text\">{{val.label}}</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </ng-form>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/richRadio/rich-radio.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/richRadio/rich-radio.html",
    "<div class=\"label label-property-grid-control-readonly property-value-ellipsis\" ng-if=\"richRadioCtrl.readOnly || richRadioCtrl.ngReadonly\">\n" +
    "    <div class=\"sit-radio\">\n" +
    "        <ng-form ng-if=\"(richRadioCtrl.readOnly || richRadioCtrl.ngReadonly || richRadioCtrl.ngDisabled)\" name=\"radioForm\" ng-class=\"{'isrequired' :(richRadioCtrl.validation.required) && richRadioCtrl.value===undefined}\">\n" +
    "            <div class=\"property-grid-span-group-block \" ng-model=\"richRadioCtrl.value\">\n" +
    "                <div class=\"radiogroup group-control\" ng-repeat=\"val in richRadioCtrl.options\" ng-checked=\"richRadioCtrl.value === val.value\">\n" +
    "                    <div class=\"group-control-data radio-button\" ng-class=\"!richRadioCtrl.ngDisabled && !richRadioCtrl.readOnly && !richRadioCtrl.ngReadonly ? 'radio-enabled' : 'radio-disabled'\">\n" +
    "                        <input type='radio'\n" +
    "                               name='{{richRadioCtrl.name}}'\n" +
    "                               ng-model='richRadioCtrl.value'\n" +
    "                               ng-required=\"richRadioCtrl.validation.required\"\n" +
    "                               ng-value='val.value'\n" +
    "                               ng-blur=\"richRadioCtrl.ngBlur()\"\n" +
    "                               sit-change=\"richRadioCtrl.sitChange\"\n" +
    "                               ng-disabled=\"richRadioCtrl.ngDisabled\"\n" +
    "                               ng-focus=\"richRadioCtrl.ngFocus()\"\n" +
    "                               ng-readonly=\"richRadioCtrl.ngReadOnly\"\n" +
    "                               shared-model=\"true\"\n" +
    "                               sit-form-input-validator\n" +
    "                               style=\"vertical-align:top\" />\n" +
    "                        <span class=\"radio-text radio-title\">{{val.label}}<br /><span ng-if=\"val.description\" class=\"radio-description\">{{val.description}}</span></span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </ng-form>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"sit-radio\">\n" +
    "    <ng-form ng-if=\"!(richRadioCtrl.readOnly || richRadioCtrl.ngReadonly || richRadioCtrl.ngDisabled)\" name=\"radioForm\" ng-class=\"{'isrequired' :(richRadioCtrl.validation.required) && richRadioCtrl.value===undefined}\">\n" +
    "        <div class=\"property-grid-span-group-block validator-control\" ng-model=\"richRadioCtrl.value\">\n" +
    "            <div class=\"radiogroup group-control\" ng-repeat=\"val in richRadioCtrl.options\" ng-checked=\"richRadioCtrl.value === val.value\">\n" +
    "                <div class=\"group-control-data radio-button\" ng-class=\"!richRadioCtrl.ngDisabled ? 'radio-enabled' : 'radio-disabled'\">\n" +
    "                    <input type='radio'\n" +
    "                           name='{{richRadioCtrl.name}}'\n" +
    "                           ng-model='richRadioCtrl.value'\n" +
    "                           ng-required=\"richRadioCtrl.validation.required\"\n" +
    "                           ng-value='val.value'\n" +
    "                           ng-blur=\"richRadioCtrl.ngBlur()\"\n" +
    "                           sit-change=\"richRadioCtrl.sitChange\"\n" +
    "                           ng-disabled=\"richRadioCtrl.ngDisabled\"\n" +
    "                           ng-focus=\"richRadioCtrl.ngFocus()\"\n" +
    "                           ng-readonly=\"richRadioCtrl.ngReadOnly\"\n" +
    "                           shared-model=\"true\"\n" +
    "                           sit-form-input-validator\n" +
    "                           style=\"vertical-align:top\" />\n" +
    "                    <span class=\"radio-text radio-title\">{{val.label}}<br /><span ng-if=\"val.description\" class=\"radio-description\">{{val.description}}</span></span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </ng-form>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("common/widgets/select/select.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/select/select.html",
    "<sit-advanced-select sit-read-only='selectCtrl.readOnly'\n" +
    "                     sit-selected-string='selectCtrl.sitSelectedString'\n" +
    "                     sit-split-list='selectCtrl.splitListVisibility'\n" +
    "                     sit-placeholder='selectCtrl.placeholder'\n" +
    "                     sit-done-callback='selectCtrl.doneCallback'\n" +
    "                     sit-validation='selectCtrl.selectValidation'\n" +
    "                     sit-options='selectCtrl.sitOptions'\n" +
    "                     ng-blur='selectCtrl.ngBlur()'\n" +
    "                     sit-change='selectCtrl.selectionChanged'\n" +
    "                     ng-disabled='selectCtrl.ngDisabled'\n" +
    "                     ng-focus='selectCtrl.ngFocus()'\n" +
    "                     ng-selected='selectCtrl.ngSelected'\n" +
    "                     ng-readonly='selectCtrl.ngReadonly'\n" +
    "                     ng-required='selectCtrl.validation.required'>\n" +
    "</sit-advanced-select>\n" +
    "\n" +
    "");
}]);

angular.module("common/widgets/sidePanel/sidepanel.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/sidePanel/sidepanel.html",
    "<div class=\"side-panel-container sit-side-panel\">\n" +
    "    <div class=\"side-panel-top\">\n" +
    "        <div class=\"side-panel-header\">\n" +
    "            <div class=\"side-panel-header-text\">{{sidepanelCtrl.title}}</div>\n" +
    "            <div style=\"display:flex; align-items:center\">\n" +
    "                <button type=\"button\" class=\"side-panel-button-resize\" ng-if=\"!sidepanelCtrl.isMinimizeDisabled && sidepanelCtrl.iscollapseButtonShown && sidepanelCtrl.isContentMinimizable\" ng-click=\"sidepanelCtrl.toggleSidePanelContent()\"\n" +
    "                        title=\"{{sidepanelCtrl.collapseButtonTooltip}}\">\n" +
    "                    <span ng-show=\"!sidepanelCtrl.isMaximized\" sit-class=\"svg-icon\" sit-mom-icon=\"sidepanelCtrl.maximizePanel\" aria-hidden=\"true\" ng-class=\"{momIcon: sidepanelCtrl.maximizePanel !== null }\"></span>\n" +
    "                    <span ng-show=\"sidepanelCtrl.isMaximized\" sit-class=\"svg-icon\" sit-mom-icon=\"sidepanelCtrl.minimizePanel\" aria-hidden=\"true\" ng-class=\"{momIcon: sidepanelCtrl.minimizePanel !== null }\"></span>\n" +
    "                </button>\n" +
    "                <button type=\"button\" class=\"side-panel-button-close\" ng-show=\"sidepanelCtrl.isCloseButtonShown\" ng-click=\"sidepanelCtrl.closeSidepanel()\" title=\"{{sidepanelCtrl.closeButtonTooltip}}\">\n" +
    "                    <span class=\"fa fa-times side-panel-close-img\" sit-class=\"svg-icon\" sit-mom-icon=\"sidepanelCtrl.closePanel\" aria-hidden=\"true\" ng-class=\"{momIcon: sidepanelCtrl.closePanel !== null }\"></span>\n" +
    "                </button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"side-panel-commandbar-section\" ng-class=\"{'sidepanel-contextual-command':(sidepanelCtrl.commandButtons && sidepanelCtrl.commandButtons.length === 0)}\" \n" +
    "             ng-if=\"(sidepanelCtrl.commandButtons && sidepanelCtrl.commandButtons.length !== 0)\">\n" +
    "            <sit-command-bar sit-commands=\"sidepanelCtrl.ContextualCommandButtons\" sit-layout=\"contextual\"></sit-command-bar>\n" +
    "        </div>\n" +
    "       \n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"side-panel-content\" ng-class=\"{contentHeight:'content-height',contentCommandHeight:'content-command-height',contentActionHeight:'content-action-height',contentButtonHeight:'content-button-height'}[sidepanelCtrl.contentClassType]\">\n" +
    "        <div class=\"side-panel-notification-area\" ng-repeat=\"message in sidepanelCtrl.messages | filter : { text : '!!' }\" ng-if=\"message.text.length !== 0\">\n" +
    "            <p class=\"side-panel-message\" ng-class=\"{\n" +
    "                   'admonition admonition-warning':message.type=='warning',\n" +
    "                   'admonition admonition-info':message.type=='info'}\">\n" +
    "                <span>{{message.text}}</span>\n" +
    "            </p>\n" +
    "        </div>\n" +
    "        <div class=\"side-panel-custom\" ng-transclude></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"side-panel-bottom\" ng-if=\"(sidepanelCtrl.actionButtons && sidepanelCtrl.actionButtons.length !== 0)\">\n" +
    "        <ul class=\"side-panel-actions\">\n" +
    "            <li class=\"btn-group dropdown-action-menu\" ng-if=\"sidepanelCtrl.displayDropdownActions\">\n" +
    "                <button data-toggle=\"dropdown\" title=\"Other commands\" class=\"dropdown-toggle dropdown-action-button\" ng-click=\"sidepanelCtrl.calcActionMenuOffset()\">\n" +
    "                        <span sit-class=\"svg-icon\" sit-mom-icon=\"sidepanelCtrl.dropdownMenu\" aria-hidden=\"true\"></span>\n" +
    "                        <span sit-class=\"svg-icon\" sit-mom-icon=\"sidepanelCtrl.dropdownArrow\" aria-hidden=\"true\"></span>\n" +
    "                </button>\n" +
    "\n" +
    "                <ul class=\"dropdown-menu\" role=\"menu\" data-toggle=\"dropdown\">\n" +
    "                    <li ng-repeat=\"action in sidepanelCtrl.actionButtons.slice().reverse()\" ng-if=\"$index<=sidepanelCtrl.maxIndexNumberActions\">\n" +
    "                        <div ng-if=\"action.visible\">\n" +
    "                            <button data-internal-type=\"command-button-command-bar\" ng-class=\"{'last-action-button':($last && sidepanelCtrl.actionButtons.length>1)}\"\n" +
    "                                    class=\"menu-action-button\"\n" +
    "                                    ng-click=\"action.onClick()\" title=\"{{action.tooltip || action.label}}\" ng-disabled=\"!action.enabled\">\n" +
    "                                <span data-internal-type=\"text-container\">{{action.label}}</span>\n" +
    "                            </button>\n" +
    "                        </div>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </li>\n" +
    "            <li ng-repeat=\"action in sidepanelCtrl.getActiveActionButtons()\">\n" +
    "                <div ng-if=\"(!sidepanelCtrl.displayDropdownActions || ($index > sidepanelCtrl.maxIndexNumberActions)) && action.visible \">\n" +
    "                    <button data-internal-type=\"command-button-command-bar\" ng-class=\"{'last-action-button primary-dialog-button':($last && sidepanelCtrl.actionButtons.length>1)}\"\n" +
    "                            class=\"bottom-action-button pl-button-dialog\"\n" +
    "                            ng-click=\"action.onClick()\" title=\"{{action.tooltip || action.label}}\" ng-disabled=\"!action.enabled\">\n" +
    "                        <span data-internal-type=\"text-container\">{{action.label}}</span>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/sidebar/scroll.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/sidebar/scroll.html",
    "<div class=\"sitscroll up\" ng-show=\"scrollCtrl.isEnabled && scrollCtrl.display\">\n" +
    "    <em class=\"fa fa-stack-1x fa-sort-up\"></em>\n" +
    "</div>\n" +
    "<div class=\"sitscroll body\" ng-transclude></div>\n" +
    "<div class=\"sitscroll down\" ng-show=\"scrollCtrl.isEnabled && scrollCtrl.display\">\n" +
    "    <em class=\"fa fa-stack-1x fa-sort-down\"></em>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/sidebar/sidebar-item.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/sidebar/sidebar-item.html",
    "<sit-scroll sit-enable=\"{{itemCtrl.type == 'static'}}\" sit-on-reload=\"common.sidebar.sitSidebar.initilize\">\n" +
    "    <div class=\"sidebar-items\" ng-if=\"itemCtrl.source && itemCtrl.source.length\">\n" +
    "        <div ng-class=\"itemCtrl.type\">\n" +
    "            <ul class=\"nav nav-sidebar\">\n" +
    "                <li ng-repeat=\"item in itemCtrl.source track by $index\"\n" +
    "                    ng-click=\"itemCtrl.click(itemCtrl,item)\"\n" +
    "                    data-toggle=\"sidebar\" ng-hide=\"item.display==false\"\n" +
    "                    title=\"{{item.translatedTitle}}\"\n" +
    "                    class=\"sidebar-item-{{item.id}}\"\n" +
    "                    ng-class=\"{select: item.id===itemCtrl.selected || itemCtrl.isChildrenSelected(item, itemCtrl.selected), parent: item.contents && item.contents.length}\">\n" +
    "                    <a ng-class=\"{'svg-icon-action': item.svgIcon}\">\n" +
    "                        <em class=\"fa\" ng-class=\"item.icon\" sit-class=\"svg-icon\" sit-mom-icon=\"item.svgIcon\"></em>\n" +
    "                        <span class=\"text\" ng-bind=\"item.translatedTitle\" ng-if=\"item.title\"></span>\n" +
    "                        <span class=\"right-caret\" ng-if=\"item.contents && item.contents.length\"></span>\n" +
    "                    </a>\n" +
    "                    <div ng-if=\"item.contents && item.contents.length\"\n" +
    "                         ng-class=\"{'children':item.contents && item.contents.length}\" style=\"top:25px\">\n" +
    "                        <h3 ng-bind=\"item.translatedTitle\"></h3>\n" +
    "                        <sit-sidebar-item sit-source=\"item.contents\" sit-selected=\"itemCtrl.selected\" sit-environment=\"itemCtrl.environment\">\n" +
    "                        </sit-sidebar-item>\n" +
    "                    </div>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</sit-scroll>\n" +
    "");
}]);

angular.module("common/widgets/sidebar/sidebar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/sidebar/sidebar.html",
    "<div class=\"sidebar\" style=\"display:none\" ng-class=\"{'open':sidebar.options.isExpanded}\" ng-transclude></div>\n" +
    "");
}]);

angular.module("common/widgets/sortableAccordion/sortable-accordion.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/sortableAccordion/sortable-accordion.html",
    "<!-- item.templateUrl (e.g. group-template.html) is the intended template url to be loaded inside accordion -->\n" +
    "<!-- userTemplate.html is the html that holds the item.templateUrl as the content and rendered inside homeTemplate.html.\n" +
    "    It acts like a wrapper for item.templateUrl -->\n" +
    "\n" +
    "<uib-accordion class=\"sortHead\" close-others=\"sortAccCtrl.closeOthers\">\n" +
    "    <ul class=\"nestingAccordionCustom\" ui-sortable=\"sortAccCtrl.sortableOptions\" ng-model=\"sortAccCtrl.items\">\n" +
    "        <li ng-repeat=\"item in sortAccCtrl.items\">\n" +
    "            <script type=\"text/ng-template\" id=\"userTemplate.html\" ng-bind=\"item.templateUrl\">\n" +
    "                <div ng-include=\"item.templateUrl\" /> <!-- Passing the html template corresponding to heading -->\n" +
    "            </script>\n" +
    "            <div uib-accordion-group class=\"accordion_content\" is-disabled=\"sortAccCtrl.status.isFirstDisabled\">\n" +
    "                <uib-accordion-heading>\n" +
    "                    <span class=\"panel_header_text\">{{item.headerName}}<em class=\"accordion_warning fa {{item.warning.icon}}\" ng-if=\"item.warning.show\"></em></span>\n" +
    "                    <span class=\"accordion_buttons\" ng-repeat=\"btn in item.buttons\">\n" +
    "                        <em ng-class=\"['fa ', btn.icon, {'disable-button' : sortAccCtrl.readOnly}]\" ng-click=\"btn.callBackMethod(sortAccCtrl.items, btn.callBackParam)\" title=\"{{btn.name}}\" />\n" +
    "                    </span>\n" +
    "                </uib-accordion-heading>\n" +
    "                <div ng-include=\"'userTemplate.html'\" init=\"{{readOnly=sortAccCtrl.readOnly}}\"></div>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</uib-accordion>\n" +
    "<style>\n" +
    "    span[uib-accordion-header] {\n" +
    "        height: 24px;\n" +
    "        line-height: 24px;\n" +
    "    }\n" +
    "\n" +
    "    .nestingAccordionCustom {\n" +
    "        list-style: none;\n" +
    "        margin-left: -20px;\n" +
    "        margin-bottom: -15px;\n" +
    "    }\n" +
    "\n" +
    "    nestingAccordionCustom li {\n" +
    "        padding-top: 5px;\n" +
    "    }\n" +
    "\n" +
    "    .accordion_buttons {\n" +
    "        float: right;\n" +
    "    }\n" +
    "\n" +
    "        .accordion_buttons i {\n" +
    "            margin: 0 10px;\n" +
    "        }\n" +
    "\n" +
    "    .accordion_content {\n" +
    "        margin-left: -20px;\n" +
    "        margin-top: 4px !important;\n" +
    "        border-color: #ddd;\n" +
    "    }\n" +
    "\n" +
    "    .accordion_icons {\n" +
    "        margin: 0 10px;\n" +
    "        font-size: 18px;\n" +
    "    }\n" +
    "\n" +
    "    .accordion_warning {\n" +
    "        color: orange;\n" +
    "        padding-left: 5px;\n" +
    "    }\n" +
    "\n" +
    "    .disable-button {\n" +
    "        pointer-events: none;\n" +
    "        opacity: 0.2;\n" +
    "    }\n" +
    "</style>\n" +
    "");
}]);

angular.module("common/widgets/status/status.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/status/status.html",
    "<div class=\"status\">\n" +
    "   <h3> {{statusCtrl.title}} </h3> \n" +
    "<div class=\"subdesc\">\n" +
    "    <div class=\"admonition admonition-info\">{{statusCtrl.desc}}</div>\n" +
    "    <div class=\"body\">\n" +
    "        <div class=\"chart-container\" ng-if=\"statusCtrl.chart == 'true'\">\n" +
    "            <div class=\"pie-wrapper\" ng-class=\"statusCtrl.progressCSSClass\">\n" +
    "                <span class=\"label\">{{statusCtrl.progressValue}}<span class=\"smaller\">%</span><span class=\"total\">{{'status.total'|translate}}</span></span>\n" +
    "                <div class=\"pie\">\n" +
    "                    <div class=\"left-side half-circle\"></div>\n" +
    "                    <div class=\"right-side half-circle\"></div>\n" +
    "                </div>\n" +
    "                <div class=\"shadow\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"properties\">\n" +
    "            <ul>\n" +
    "                <li ng-repeat=\"prop in statusCtrl.properties track by $index\"> {{prop.name}} <span class=\"badge\">{{prop.value}}</span></li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/switchButton/switch-button.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/switchButton/switch-button.html",
    "<div ng-repeat=\"button in switchButtonCtrl.buttons\"\n" +
    "     ng-class=\"'switch-button' + (button.selected ? ' switch-button-select' : '') + switchButtonCtrl.getMarginClass($index)\"\n" +
    "     ng-click=\"switchButtonCtrl.buttonClicked($index)\"\n" +
    "     title=\"{{button.tooltip}}\">\n" +
    "    <em ng-class=\"{momIcon: button.icon }\" class=\"fa {{button.faIcon}}\" sit-class=\"svg-icon\" sit-mom-icon=\"button.icon\" style=\"vertical-align:top\"></em>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/table/table-button.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/table/table-button.html",
    "<div tablebuttonclick=\"tableBtnCtrl.buttonClicked(tableBtnCtrl);\" title=\"{{tableBtnCtrl.label}}\" \n" +
    "     ng-class=\"[{'toggle': tableBtnCtrl.type === 'toggle' && tableBtnCtrl.selected}]\" >\n" +
    "        <em class=\"fa {{tableBtnCtrl.icon}}\" sit-mom-icon=\"tableBtnCtrl.displayIcon\" ng-class=\"{momIcon:tableBtnCtrl.displayIcon!==null}\" sit-class=\"table-mom-icon\"></em>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/table/table-filterbar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/table/table-filterbar.html",
    "<div class=\"sit-table-filterbar\">\n" +
    "    <div id=\"filterBar\" data-internal-type=\"filterBar\" class=\"filterBar-container\">\n" +
    "        <sit-filter-bar sit-filter-options=\"sitTableFilterbarCtrl.filterOptions\"></sit-filter-bar>\n" +
    "    </div>\n" +
    "    <div id=\"filter\" class=\"filter-container\" ng-class=\"sitTableFilterbarCtrl.showFilter && !sitTableFilterbarCtrl.isFilterPanel? 'open' : 'closed'\" data-internal-type=\"filter\">\n" +
    "        <sit-filter ng-if=\"!sitTableFilterbarCtrl.isFilterPanel && sitTableFilterbarCtrl.filterOptions.filterFields.length > 0\"\n" +
    "                    sit-clauses=\"sitTableFilterbarCtrl.filterClauses\"\n" +
    "                    sit-filter-server-side=\"sitTableFilterbarCtrl.serverData\"\n" +
    "                    sit-filter-fields=\"sitTableFilterbarCtrl.filterOptions.filterFields\"\n" +
    "                    sit-user-preference=\"sitTableFilterbarCtrl.tableCtrl.sitConfig.userPrefId\"\n" +
    "                    sit-filter-options=\"sitTableFilterbarCtrl.filterSearchOptions\"\n" +
    "                    sit-apply-callback=\"sitTableFilterbarCtrl.applyFilter(clauses)\"\n" +
    "                    sit-reset-callback=\"sitTableFilterbarCtrl.resetFilter()\"></sit-filter>\n" +
    "\n" +
    "        <sit-filter-panel ng-if=\"sitTableFilterbarCtrl.isFilterPanel && sitTableFilterbarCtrl.showFilter\"\n" +
    "                          sit-data=\"sitTableFilterbarCtrl.filterPanelData\"\n" +
    "                          sit-user-preference=\"sitTableFilterbarCtrl.tableCtrl.sitConfig.userPrefId\">\n" +
    "        </sit-filter-panel>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/table/table-personalization.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/table/table-personalization.html",
    "<sit-column-configurator sit-config=\"Dialog.templatedata\"></sit-column-configurator>\n" +
    "");
}]);

angular.module("common/widgets/table/table-with-group.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/table/table-with-group.html",
    "<tbody>\n" +
    "    <tr ng-repeat-start=\"row in rowCollection\" sit-freez>\n" +
    "        <td ng-click=\"show = !show\">\n" +
    "            > {{row.key}} ({{row.items.length}})\n" +
    "        </td>\n" +
    "    </tr>\n" +
    "    <tr ng-if=\"show\" sit-select-row=\"row\"></tr>\n" +
    "    <tr ng-repeat-end=\"\" ng-if=\"false\"></tr>\n" +
    "</tbody>");
}]);

angular.module("common/widgets/taglist/taglist.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/taglist/taglist.html",
    "<div class=\"taglist-container\">\n" +
    "    <ul class=\"tags-list\">\n" +
    "        <li class=\"tag-list-item\" ng-repeat=\"tag in taglistCtrl.tags track by $index\" ng-show=\"$index<=taglistCtrl.visibleTags - 1 && tag && tag.Name.length!== 0\">\n" +
    "            <div ng-style=\"tag.style\" class=\"tagbullet\"></div>\n" +
    "            <span class=\"taglabel\" title=\"{{tag.Name}}\">\n" +
    "                {{tag.ShortName}}\n" +
    "            </span>\n" +
    "        </li>\n" +
    "        <li class=\"btn-group tag-list-menu\" ng-if=\"taglistCtrl.displayDropdownTags\">\n" +
    "\n" +
    "            <button class=\"dropdown-toggle tag-list-button\" type=\"button\" data-toggle=\"dropdown\" ng-click=\"taglistCtrl.dropDownFixPosition($event)\">\n" +
    "                <span class=\"fa fa-ellipsis-v\"></span>\n" +
    "            </button>\n" +
    "\n" +
    "            <ul class=\"dropdown-menu tag-menu\" role=\"menu\" data-toggle=\"dropdown\">\n" +
    "                <li class=\"dropdown-item tag-list-item\" ng-repeat=\"tag in taglistCtrl.tags track by $index\" ng-show=\"$index>taglistCtrl.visibleTags - 1  && tag && tag.Name.length!== 0\">\n" +
    "                    <div ng-style=\"tag.style\" class=\"tagbullet\"></div>\n" +
    "                    <span class=\"taglabel\" title=\"{{tag.Name}}\">\n" +
    "                        {{tag.ShortName}}\n" +
    "                    </span>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/tagsManager/sit-manage-tags-editor.directive.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/tagsManager/sit-manage-tags-editor.directive.html",
    "<sit-tags-warning-panel visible=\"vm.warningMessageVisible\" message=\"vm.warningMessage\"></sit-tags-warning-panel>\n" +
    "<div class=\"tagEditorPanel\">\n" +
    "    <div id=\"assignedTagsContainer\" ng-if=\"vm.assignedTags.length > 0\">\n" +
    "        <div class=\"sidePanelLabel\" ng-if=\"vm.assignedTags.length > 0\">{{ 'tagsManager.assignedTags' | translate }}</div>\n" +
    "        <sit-tags-viewer tags=\"vm.assignedTags\" mode=\"vm.assignedTagViewerMode\" \n" +
    "                        on-register-api=\"vm.onAssignedTagsViewerRegisterApi(api)\" \n" +
    "                        on-remove=\"vm.tagViewerRemoveAssignedTag(tag)\"\n" +
    "                        ng-if=\"vm.assignedTags.length > 0\"></sit-tags-viewer>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"availableTagsContainer\" ng-if=\"vm.availableTags.length > 0\">\n" +
    "        <div class=\"sidePanelLabel\" ng-if=\"vm.availableTags.length > 0\">{{ 'tagsManager.availableTags' | translate }}</div>\n" +
    "        <sit-tags-viewer tags=\"vm.availableTags\" mode=\"vm.availableTagViewerMode\" \n" +
    "                        on-register-api=\"vm.onAvailableTagsViewerRegisterApi(api)\" \n" +
    "                        on-add=\"vm.tagViewerAddAvailableTag(tag)\" ng-if=\"vm.availableTags.length > 0\"></sit-tags-viewer>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/tagsManager/sit-tag-element.directive.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/tagsManager/sit-tag-element.directive.html",
    "<div class=\"tagelement\" ng-style=\"vm.style\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"{{vm.tag.Name}}\" ng-if=\"vm.mode === 'select'\">\n" +
    "    <input type=\"checkbox\" class=\"tagelement\" name=\"tagElementSelected\" ng-if=\"vm.mode === 'select'\" ng-model=\"vm.tag.selected\" ng-change=\"vm.selectionChanged()\" ng-disabled=\"vm.tag.disabled\" />\n" +
    "    <span class=\"tagelementinside\" ng-class=\"{tagelementinsidewide: vm.mode === 'select'}\">{{vm.tag.ShortName}}</span>\n" +
    "    <i data-internal-type=\"TagElementAdd\" class=\"fa fa-plus tagelementinside\" aria-hidden=\"true\" ng-if=\"vm.mode === 'add'\" ng-click=\"vm.add();\" ng-style=\"vm.style\" style=\"cursor:pointer\"></i>\n" +
    "    <i data-internal-type=\"TagElementRemove\" class=\"fa fa-times tagelementinside\" aria-hidden=\"true\" ng-if=\"vm.mode === 'remove'\" ng-click=\"vm.remove();\" ng-style=\"vm.style\" style=\"cursor:pointer\"></i>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"tagelement\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"{{vm.tag.Name}}\" ng-if=\"vm.mode !== 'select'\">\n" +
    "    <div ng-style=\"vm.style\" class=\"tagbullet\"></div>\n" +
    "    <span class=\"tagelementinside\">{{vm.tag.ShortName}}</span>\n" +
    "    <span class=\"svg-icon-container\" sit-class=\"svg-icon\" sit-mom-icon=\"vm.addIcon\" aria-hidden=\"true\" data-internal-type=\"TagElementAdd\"  ng-if=\"vm.mode === 'add'\" ng-click=\"vm.add()\"></span>\n" +
    "    <span class=\"svg-icon-container\" sit-class=\"svg-icon\" sit-mom-icon=\"vm.removeIcon\" aria-hidden=\"true\" data-internal-type=\"TagElementRemove\"  ng-if=\"vm.mode === 'remove'\" ng-click=\"vm.remove()\"></span>\n" +
    "</div> ");
}]);

angular.module("common/widgets/tagsManager/sit-tags-manager.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/tagsManager/sit-tags-manager.html",
    "<sit-side-panel sit-title=\"{{vm.title}}\" sit-actions=\"vm.actionButtons\" sit-close=\"vm.closeButton\">\n" +
    "    <sit-manage-tags-editor assigned-tags=\"vm.originalAssignedTags\"\n" +
    "                           available-tags=\"vm.availableTags\"\n" +
    "                           on-validity-changed=\"vm.validityChanged(validity)\"\n" +
    "                           on-register-api=\"vm.onManageTagsEditorRegisterApi(api)\" \n" +
    "                           warning-message-visible=\"vm.warningMessageVisible\"\n" +
    "                           warning-message=\"vm.warningMessage\">\n" +
    "    </sit-manage-tags-editor>\n" +
    "</sit-side-panel> ");
}]);

angular.module("common/widgets/tagsManager/sit-tags-viewer.directive.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/tagsManager/sit-tags-viewer.directive.html",
    "<div id=\"tagsViewerFilter\" class=\"tag-viwer-filter\">\n" +
    "    <div id=\"quickSearchContainer\" class=\"quick-search-container\">\n" +
    "        <input id=\"quickSearchTextBox\" type=\"text\" ng-focus=\"vm.focus()\" ng-blur=\"vm.blur()\" ng-change=\"vm.filterChanged()\" placeholder=\"{{vm.quickSearchText}}\" class=\"form-control filter-quick-search\" ng-model=\"vm.filterValue\">\n" +
    "        <span class=\"filter-close-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"vm.svgIcons.close\" ng-show=\"vm.showIcon\" ng-click=\"vm.clearFilter()\"></span>\n" +
    "        <span id=\"quickSearchIcon\" class=\"filter-search-icon\" sit-class=\"svg-icon\" sit-mom-icon=\"vm.svgIcons.search\"></span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"tagcontainer\">\n" +
    "    <sit-tag-element ng-repeat=\"tag in vm.currentPageTags\" class=\"animate-repeat\" tag=\"tag\" mode=\"vm.mode\" on-add=\"vm.onTagAdd(tag)\" on-remove=\"vm.onTagRemove(tag)\" on-selection-changed=\"vm.onTagSelectionChanged(tag)\"></sit-tag-element>\n" +
    "</div>\n" +
    "<div id=\"tagsViewerPager\" ng-show=\"vm.pagerNumberTotalItems > vm.pageSize\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-40 col-sm-40 col-md-40 col-lg-40 totalItemsLabel\">\n" +
    "            {{ 'tagsManager.totalItems' | translate }}: {{vm.pagerNumberTotalItems}}\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-xs-40 col-sm-40 col-md-40 col-lg-40\">\n" +
    "            <ul uib-pagination total-items=\"vm.pagerNumberTotalItems\" ng-model=\"vm.currentPage\" ng-change=\"vm.pageChanged()\"></ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/tagsManager/sit-tags-warning-panel.directive.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/tagsManager/sit-tags-warning-panel.directive.html",
    "<div class=\"alert alert-warning dialog-alert sit-tags-warning-panel\" ng-if=\"vm.visible\">\n" +
    "    <em class=\"fa fa-warning\"></em>\n" +
    "    <span class=\"alert-title\">{{ 'tagsManager.warning' | translate }}:  </span>{{ vm.message }}\n" +
    "</div>");
}]);

angular.module("common/widgets/taskContainer/taskContainer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/taskContainer/taskContainer.html",
    "<div style=\"height:100%; width:100%\">\n" +
    "    <div id=\"itemlist\" ng-if=\"vm.isTaskUiListVisible\" class=\"content-area content-area-relative\" style=\"float:left;  height:100%\">\n" +
    "        <sit-item-collection-viewer sit-data=\"vm.viewerData\" sit-options=\"vm.viewerOptions\"></sit-item-collection-viewer>\n" +
    "    </div>\n" +
    "\n" +
    "    <div id=\"itemContent\" ng-class=\"{largeWidth: vm.isTaskUiListVisible == false, smallWidth: vm.isTaskUiListVisible != false}\"\n" +
    "         style=\"height: 100%; top: 4px!important;  display:block; padding-top: 16px; padding-left: 16px;\" ng-style=\"{ 'width': vm.widthStyle }\">\n" +
    "        <sit-command-bar sit-type=\"action\" class=\"commandbar-horizontal\" ng-if=\"vm.taskIdSelected && vm.showCommandBar\" sit-layout=\"contextual\">\n" +
    "            <!--<sit-command sit-icon=\"sit sit-update-existing-instances\" sit-name=\"migrate\" ng-click=\"vm.migrateTask\"\n" +
    "        sit-label={{'SIT.TSK.commandBar.migrateLabel'|translate}} sit-tooltip={{'SIT.TSK.commandBar.migrateTaskTooltip'|translate}}\n" +
    "        ng-show=\"vm.isMigrateVisible\"></sit-command>-->\n" +
    "            <!--sit-label=\"{{ 'task.activate' | translate }}\"-->\n" +
    "            <sit-command sit-name=\"activate\" ng-click=\"vm.activateTask\" cmd-icon=\"TaskActivate\"\n" +
    "                         sit-tooltip=\"{{ 'task.activate' | translate }}\"\n" +
    "                         ng-show=\"vm.isActivateVisible\"></sit-command>\n" +
    "            <!--sit-label=\"{{ 'task.suspend' | translate }}\"-->\n" +
    "            <sit-command sit-name=\"suspend\" ng-click=\"vm.suspend\" cmd-icon=\"Time\"\n" +
    "                         sit-tooltip=\"{{ 'task.suspend' | translate }}\"\n" +
    "                         ng-show=\"vm.isSuspendVisible\"></sit-command>\n" +
    "            <!--sit-label=\"{{ 'task.start' | translate }}\"-->\n" +
    "            <sit-command sit-name=\"start\" ng-click=\"vm.start\" cmd-icon=\"Start\"\n" +
    "                         sit-tooltip=\"{{ 'task.start' | translate }}\"\n" +
    "                         ng-show=\"vm.isStartVisible\"></sit-command>\n" +
    "            <!--sit-label=\"{{ 'task.pause' | translate }}\"-->\n" +
    "            <sit-command sit-name=\"pause\" ng-click=\"vm.pause\" cmd-icon=\"Pause\"\n" +
    "                         sit-tooltip=\"{{ 'task.pause' | translate }}\"\n" +
    "                         ng-show=\"vm.isPauseCompleteVisible\"></sit-command>\n" +
    "            <!--sit-label=\"{{ 'task.resume' | translate }}\"-->\n" +
    "            <sit-command sit-name=\"resume\" ng-click=\"vm.resume\" cmd-icon=\"Forwards\"\n" +
    "                         sit-tooltip=\"{{ 'task.resume' | translate }}\"\n" +
    "                         ng-show=\"vm.isResumeVisible\"></sit-command>\n" +
    "            <!--<sit-command sit-name=\"repeat\" ng-click=\"vm.repeat\" cmd-icon=\"TaskRepeat\"\n" +
    "        sit-tooltip=\"{{ 'task.repeat' | translate }}\" sit-label=\"{{ 'task.repeat' | translate }}\"\n" +
    "        ng-show=\"vm.isRepeatVisible\"></sit-command>-->\n" +
    "            <!--sit-label=\"{{ 'task.complete' | translate }}\"-->\n" +
    "            <sit-command cmd-icon=\"Validate\" sit-name=\"complete\" ng-click=\"vm.complete\"\n" +
    "                         sit-tooltip=\"{{ 'task.complete' | translate }}\"\n" +
    "                         ng-show=\"vm.isPauseCompleteVisible\"></sit-command>\n" +
    "            <!--sit-label=\"{{ 'task.skip' | translate }}\"-->\n" +
    "            <sit-command sit-name=\"skip\" ng-click=\"vm.skip\" svg-icon=\"common/icons/miscGoToLast24.svg\"\n" +
    "                         sit-tooltip=\"{{ 'task.skip' | translate }}\"\n" +
    "                         ng-show=\"vm.isSkipVisible\"></sit-command>\n" +
    "            <!--sit-label=\"{{ 'task.cancel' | translate }}\"-->\n" +
    "            <sit-command sit-name=\"cancel\" ng-click=\"vm.cancel\" cmd-icon=\"ClosePanel\"\n" +
    "                         sit-tooltip=\"{{ 'task.cancel' | translate }}\"\n" +
    "                         ng-show=\"vm.isCancelVisible\"></sit-command>\n" +
    "            <!--sit-label=\"{{ 'task.recover' | translate }}\"-->\n" +
    "            <sit-command sit-name=\"recover\" ng-click=\"vm.recover\" cmd-icon=\"TaskRecover\"\n" +
    "                         sit-tooltip=\"{{ 'task.recover' | translate }}\"\n" +
    "                         ng-show=\"vm.isFailRecoverVisible\"></sit-command>\n" +
    "            <!--sit-label=\"{{ 'task.fail' | translate }}\"-->\n" +
    "            <sit-command sit-name=\"fail\" ng-click=\"vm.fail\" svg-icon=\"common/icons/indicatorRedCircle16.svg\"\n" +
    "                         sit-tooltip=\"{{ 'task.fail' | translate }}\"\n" +
    "                         ng-show=\"vm.isFailRecoverVisible\"></sit-command>\n" +
    "            <!--sit-label=\"{{ 'task.abort' | translate }}\"-->\n" +
    "            <sit-command sit-name=\"abort\" ng-click=\"vm.abort\" cmd-icon=\"Cancel\"\n" +
    "                         sit-tooltip=\"{{ 'task.abort' | translate }}\"\n" +
    "                         ng-show=\"vm.isAbortVisible\"></sit-command>\n" +
    "            <!--<sit-command sit-icon=\"sit sit-freeze\" sit-name=\"freeze\" ng-click=\"vm.freeze\"\n" +
    "                     sit-tooltip=\"{{ 'SIT.TSK.common.freeze' | translate }}\" sit-label=\"{{ 'SIT.TSK.common.freeze' | translate }}\"\n" +
    "                     ng-show=\"vm.isTaskCommandsVisible && !vm.isFrozenTask\"></sit-command>\n" +
    "        <sit-command sit-icon=\"sit sit-unfreeze\" sit-name=\"unfreeze\" ng-click=\"vm.unfreeze\"\n" +
    "                     sit-tooltip=\"{{ 'SIT.TSK.common.unfreeze' | translate }}\" sit-label=\"{{ 'SIT.TSK.common.unfreeze' | translate }}\"\n" +
    "                     ng-show=\"vm.isTaskCommandsVisible && vm.isFrozenTask\"></sit-command>-->\n" +
    "            <!--<sit-command sit-name=\"delete\" ng-click=\"vm.deleteTask\" cmd-icon=\"Trash\"\n" +
    "        sit-label={{'SIT.TSK.commandBar.deleteLabel'|translate}} sit-tooltip={{'SIT.TSK.commandBar.deleteTaskTooltip'|translate}}\n" +
    "        ng-show=\"vm.isDeleteVisible\"></sit-command>-->\n" +
    "\n" +
    "        </sit-command-bar>\n" +
    "        <!--ng-if=\"vm.taskIdSelected\"  select=\"vm.getContent($index)\" class=\"tab-animation\" heading=\"{{component.componentName}}\"-->\n" +
    "        <div style=\"height: 100%; width:100%\" ng-show=\"vm.viewerData.length > 0\">\n" +
    "            <tabset style=\"width:calc(100% - 2px); height: 100%; margin-top:-8px;\" id=\"taskContainerCanvas\">\n" +
    "                <tab ng-repeat=\"component in vm.componentInstances\" active=\"component.componentVisible\">\n" +
    "                    <!--<div ng-hide=\"vm.isLoaded\" style=\"height:700px;width:100%; float:left; background-color:gray\"><h3>No Task UI Available</h3></div>-->\n" +
    "                    <!--ng-hide=\"!vm.isLoaded\"-->\n" +
    "                <div ng-show=\"component.componentVisible\" style=\"height:100%; width:calc(100% - 2px);\" ng-style=\"{ 'margin-top': vm.margintop }\">\n" +
    "                        <sit-container sit-isswac=\"false\">\n" +
    "                            <sit-component sit-id=\"{{component.componentName}}\"\n" +
    "                                           sit-name=\"{{component.componentName}}\"\n" +
    "                                           sit-componentname=\"{{component.componentName}}\"\n" +
    "                                           sit-type=\"ui\"\n" +
    "                                           sit-source=\"{{component.componentSource}}\"\n" +
    "                                           size-x=\"4\"\n" +
    "                                           size-y=\"4\"\n" +
    "                                           sit-left=\"0\"\n" +
    "                                           sit-top=\"0\"\n" +
    "                                           sit-cols=\"12\"\n" +
    "                                           sit-rows=\"12\"\n" +
    "                                           sit-flavor=\"ui\"\n" +
    "                                           sit-dpc=\"vm.dpc\">\n" +
    "                            </sit-component>\n" +
    "                        </sit-container>\n" +
    "                    </div>\n" +
    "                </tab>\n" +
    "            </tabset>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/text/text.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/text/text.html",
    "<div ng-if=\"textCtrl.readOnly || textCtrl.ngReadonly\" class=\"label-property-grid-control-readonly property-value-ellipsis\"> {{textCtrl.value}} </div>\n" +
    "\n" +
    "<ng-form name='textForm' ng-if=\"!(textCtrl.readOnly || textCtrl.ngReadonly)\" ng-class=\"{'isrequired' :(textCtrl.validation.required) && textCtrl.value!==undefined}\">\n" +
    "    <div class='property-grid-input-group'>\n" +
    "        <input type='text'\n" +
    "               ng-class=\"{'validator-control-invalid':((textForm.$invalid && textForm.$dirty) || (textForm.$invalid && textForm.$visited)),\n" +
    "               'validator-control':!((textForm.$invalid && textForm.$dirty) || (textForm.$invalid && textForm.$visited)),\n" +
    "               'ng-dirty':textForm.$dirty}\"\n" +
    "               ng-model='textCtrl.value'\n" +
    "               ng-required='textCtrl.validation.required'\n" +
    "               ng-minlength='textCtrl.validation.minlength'\n" +
    "               ng-maxlength='textCtrl.validation.maxlength'\n" +
    "               ng-pattern='textCtrl.validation.pattern'\n" +
    "               ng-blur=\"textCtrl.ngBlur()\"\n" +
    "               sit-change=\"textCtrl.sitChange\"\n" +
    "               ng-disabled=\"textCtrl.ngDisabled\"\n" +
    "               ng-focus=\"textCtrl.ngFocus()\"\n" +
    "               placeholder={{textCtrl.placeholder}}\n" +
    "               sit-form-input-validator />\n" +
    "    </div>\n" +
    "</ng-form>");
}]);

angular.module("common/widgets/textEditor/image-upload-dialog-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/textEditor/image-upload-dialog-template.html",
    "<div id=\"image-tab-container\" class=\"image-upload-tab\">\n" +
    "    <sit-tabset>\n" +
    "        <sit-tab heading=\"{{Dialog.templatedata[0].tabHeadingtext}}\">\n" +
    "            <sit-property-grid sit-id=\"dialogPopup\" sit-layout=\"Vertical\" sit-type=\"Fixed\" sit-mode=\"edit\" sit-columns=\"1\">\n" +
    "                <sit-property sit-id=\"imageUpload\" sit-widget=\"sit-file-uploader\" sit-value=\"Dialog.templatedata[0].value\" sit-autofocus=true\n" +
    "                              sit-widget-attributes=\"Dialog.templatedata[0].widgetAttributes\">{{Dialog.templatedata[0].browseText}}</sit-property>\n" +
    "            </sit-property-grid>\n" +
    "        </sit-tab>\n" +
    "    </sit-tabset>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/textEditor/text-editor.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/textEditor/text-editor.html",
    "<div class=\"sit-text-editor\">\n" +
    "    <textarea id=\"{{textEditorCtrl.id}}\"></textarea>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/textarea/textarea.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/textarea/textarea.html",
    "<div class=\"label-property-grid-control-readonly textarea-control-readonly\" ng-if=\"textareaCtrl.readOnly || textareaCtrl.ngReadonly\"> {{textareaCtrl.value}} </div>\n" +
    "\n" +
    "<ng-form name='textForm' ng-if=\"!(textareaCtrl.readOnly || textareaCtrl.ngReadonly)\" ng-class=\"{'isrequired' :(textareaCtrl.validation.required) && textareaCtrl.value===undefined}\">\n" +
    "    <div class='property-grid-input-group'>\n" +
    "        <textarea name='{{textareaCtrl.value}}'\n" +
    "                  ng-class=\"{'validator-control-invalid':((textForm.$invalid && textForm.$dirty) || (textForm.$invalid && textForm.$visited)),\n" +
    "               'validator-control':!((textForm.$invalid && textForm.$dirty) || (textForm.$invalid && textForm.$visited)),\n" +
    "               'ng-dirty':textForm.$dirty}\"\n" +
    "                  ng-model='textareaCtrl.value'\n" +
    "                  ng-required='textareaCtrl.validation.required'\n" +
    "                  ng-minlength='textareaCtrl.validation.minlength'\n" +
    "                  ng-maxlength='textareaCtrl.validation.maxlength'\n" +
    "                  ng-pattern='textareaCtrl.validation.pattern'\n" +
    "                  ng-blur=\"textareaCtrl.ngBlur()\"\n" +
    "                  sit-change=\"textareaCtrl.sitChange\"\n" +
    "                  ng-disabled=\"textareaCtrl.ngDisabled\"\n" +
    "                  ng-focus=\"textareaCtrl.ngFocus()\"\n" +
    "                  placeholder={{textareaCtrl.placeholder}}\n" +
    "                  sit-form-input-validator></textarea>\n" +
    "    </div>\n" +
    "</ng-form>");
}]);

angular.module("common/widgets/tileConfigurator/tile-configurator.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/tileConfigurator/tile-configurator.html",
    "<div class=\"table-column-configuration\">\n" +
    "    <div class=\"columns\">\n" +
    "        <div class=\"header\">\n" +
    "            <h2 class=\"sit-h2\">\n" +
    "                {{ tileConfiguratorCtrl.sitConfig.data.inputFieldsHeader || 'userPrefrences.tileConfigurator.inputFieldsHeader'|translate }}\n" +
    "            </h2>\n" +
    "        </div>\n" +
    "        <div class=\"no-border frame\">\n" +
    "            <sit-property-grid sit-id=\"propertyGrid_verticalNew\" sit-data=\"\" sit-layout=\"Vertical\" sit-type=\"\" sit-mode=\"Edit\"\n" +
    "                               sit-columns=\"\">\n" +
    "                <sit-property sit-widget=\"sit-select\" sit-value=\"tileConfiguratorCtrl.titleField\" sit-options=\"tileConfiguratorCtrl.titleDescriptionValues\"\n" +
    "                              sit-to-display=\"tileConfiguratorCtrl.select.toDisplay\" sit-change=\"tileConfiguratorCtrl.updateUserTitle\"\n" +
    "                              sit-to-keep=\"tileConfiguratorCtrl.select.toKeep\">{{'userPrefrences.tileConfigurator.title'|translate}}:</sit-property>\n" +
    "                <sit-property sit-widget=\"sit-select\" sit-value=\"tileConfiguratorCtrl.descriptionField\" sit-options=\"tileConfiguratorCtrl.titleDescriptionValues\"\n" +
    "                              sit-to-display=\"tileConfiguratorCtrl.select.toDisplay\" sit-change=\"tileConfiguratorCtrl.updateUserDesc\"\n" +
    "                              sit-to-keep=\"tileConfiguratorCtrl.select.toKeep\">{{'userPrefrences.tileConfigurator.description'|translate}}:</sit-property>\n" +
    "                <sit-property sit-widget=\"sit-select\" sit-value=\"tileConfiguratorCtrl.sitConfig.data.userPreferences.propertyFields[0]\"\n" +
    "                              sit-options=\"tileConfiguratorCtrl.initialTileFields\" sit-to-display=\"tileConfiguratorCtrl.select.toDisplay\"\n" +
    "                              sit-change=\"tileConfiguratorCtrl.updateUserPropone\" sit-to-keep=\"tileConfiguratorCtrl.select.toKeep\">{{'userPrefrences.tileConfigurator.property1'|translate}}:</sit-property>\n" +
    "                <sit-property sit-widget=\"sit-select\" sit-value=\"tileConfiguratorCtrl.sitConfig.data.userPreferences.propertyFields[1]\"\n" +
    "                              sit-options=\"tileConfiguratorCtrl.initialTileFields\" sit-to-display=\"tileConfiguratorCtrl.select.toDisplay\"\n" +
    "                              sit-change=\"tileConfiguratorCtrl.updateUserProptwo\"\n" +
    "                              sit-to-keep=\"tileConfiguratorCtrl.select.toKeep\">{{'userPrefrences.tileConfigurator.property2'|translate}}:</sit-property>\n" +
    "                <sit-property sit-widget=\"sit-select\" sit-value=\"tileConfiguratorCtrl.sitConfig.data.userPreferences.propertyFields[2]\"\n" +
    "                              sit-options=\"tileConfiguratorCtrl.initialTileFields\" sit-to-display=\"tileConfiguratorCtrl.select.toDisplay\"\n" +
    "                              sit-change=\"tileConfiguratorCtrl.updateUserPropthree\"\n" +
    "                              sit-to-keep=\"tileConfiguratorCtrl.select.toKeep\">{{'userPrefrences.tileConfigurator.property3'|translate}}:</sit-property>\n" +
    "                <sit-property sit-widget=\"sit-select\" sit-value=\"tileConfiguratorCtrl.sitConfig.data.userPreferences.propertyFields[3]\"\n" +
    "                              sit-options=\"tileConfiguratorCtrl.initialTileFields\" sit-change=\"tileConfiguratorCtrl.updateUserPropfour\"\n" +
    "                              sit-to-display=\"tileConfiguratorCtrl.select.toDisplay\" sit-to-keep=\"tileConfiguratorCtrl.select.toKeep\">{{'userPrefrences.tileConfigurator.property4'|translate}}:</sit-property>\n" +
    "\n" +
    "            </sit-property-grid>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"command-buttons\">\n" +
    "        <button type=\"button\" class=\"sit-command-icon-button\" ng-click=\"tileConfiguratorCtrl.resetColumns()\" title=\"{{tileConfiguratorCtrl.sitConfig.data.resetButtonLabel || 'userPrefrences.tileConfigurator.resetButtonLabel'|translate}}\">\n" +
    "            <em sit-class=\"svg-icon\" sit-mom-icon=\"tileConfiguratorCtrl.svgIcons.reset\"></em>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "    <div class=\"columns\">\n" +
    "        <div class=\"header\">\n" +
    "            <h2 class=\"sit-h2\">\n" +
    "                {{ tileConfiguratorCtrl.sitConfig.data.liveTilePreviewHeader || 'userPrefrences.tileConfigurator.liveTilePreviewHeader'|translate }}\n" +
    "            </h2>\n" +
    "        </div>\n" +
    "        <div class=\"frame-two no-border\">\n" +
    "            <div id=\"tile-container\">\n" +
    "                <div class=\"tile-view\">\n" +
    "                    <sit-tile-view sit-tiles=\"tileConfiguratorCtrl.tiles\" sit-options=\"tileConfiguratorCtrl.options\"></sit-tile-view>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/tiles/action-tile.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/tiles/action-tile.html",
    "<div class=\"tile\" ng-switch on=\"actnTileCtrl.tileContent.size\" ng-click=\"actnTileCtrl.tileClicked()\">\n" +
    "    <div data-internal-type=\"wideActionTile\" class='wide wide-action' ng-switch-when='wide' ng-style=\"{color: actnTileCtrl.color, 'background-color': actnTileCtrl.bgColor}\">\n" +
    "        <div class=\"image-container-96x96\" data-internal-type=\"image-container\">\n" +
    "            <div class=\"image-vcenter-96x96\" data-internal-type=\"image-vcenter\" ng-class=\"actnTileCtrl.tileContent.svgIcon || actnTileCtrl.tileContent.typeIcon ? 'remove-font-awesome':''\">\n" +
    "                <em ng-if=\"actnTileCtrl.tileContent.image || actnTileCtrl.tileContent.svgIcon || actnTileCtrl.tileContent.typeIcon\" class=\"fa {{actnTileCtrl.tileContent.image}}\" sit-mom-icon=\"actnTileCtrl.tileContent.svgIcon || actnTileCtrl.tileContent.typeIcon\"></em>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <span class=\"wide-action-text\" data-internal-type=\"title\">{{actnTileCtrl.getDisplayText()}}</span>\n" +
    "        <span class=\"wide-action-counter\" data-internal-type=\"counter\">{{actnTileCtrl.tileContent.count | limitTo:4}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div data-internal-type=\"squareActionTile\" class='square' ng-switch-when='square' ng-style=\"{color: actnTileCtrl.color, 'background-color': actnTileCtrl.bgColor}\">\n" +
    "        <div class=\"image-container-96x96\" data-internal-type=\"image-container\">\n" +
    "            <div class=\"image-vcenter-96x96\" data-internal-type=\"image-vcenter\" ng-class=\"actnTileCtrl.tileContent.svgIcon || actnTileCtrl.tileContent.typeIcon ? 'remove-font-awesome':''\">\n" +
    "                <em ng-if=\"actnTileCtrl.tileContent.image || actnTileCtrl.tileContent.svgIcon || actnTileCtrl.tileContent.typeIcon\" class=\"fa {{actnTileCtrl.tileContent.image}}\" sit-mom-icon=\"actnTileCtrl.tileContent.svgIcon || actnTileCtrl.tileContent.typeIcon\" ></em>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"square-text\" data-internal-type=\"title\">{{actnTileCtrl.getDisplayText()}}</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div data-internal-type=\"squareShortcutActionTile\" class='square-shortcut' ng-switch-when='square-shortcut' ng-style=\"{color: actnTileCtrl.color, 'background-color': actnTileCtrl.bgColor}\">\n" +
    "        <div class=\"square-text square-shortcut-text\" data-internal-type=\"title\">{{actnTileCtrl.getDisplayText()}}</div>\n" +
    "        <div class=\"shortcut-image-container\" data-internal-type=\"image-container\">\n" +
    "            <em sit-mom-icon=\"actnTileCtrl.tileContent.shortCutImage\"></em>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div data-internal-type=\"squareSummaryActionTile\" class='square-summary' ng-switch-when='square-summary' ng-style=\"{color: actnTileCtrl.color, 'background-color': actnTileCtrl.bgColor}\">\n" +
    "        <div class=\"summary-text\" data-internal-type=\"counter\">{{actnTileCtrl.getSummaryCountText()}}</div>\n" +
    "        <div class=\"category-text\" data-internal-type=\"title\">{{actnTileCtrl.getDisplayText()}}</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div data-internal-type=\"smallActionTile\" class='small small-action' ng-switch-when=\"small\" ng-style=\"{color: actnTileCtrl.color, 'background-color': actnTileCtrl.bgColor}\">\n" +
    "        <div class=\"image-container-48x48\" data-internal-type=\"image-container\">\n" +
    "            <div class=\"image-vcenter-48x48\" data-internal-type=\"image-vcenter\" ng-class=\"actnTileCtrl.tileContent.svgIcon || actnTileCtrl.tileContent.typeIcon ? 'remove-font-awesome':''\">\n" +
    "                <em ng-if=\"actnTileCtrl.tileContent.image || actnTileCtrl.tileContent.svgIcon || actnTileCtrl.tileContent.typeIcon\" class=\"fa {{actnTileCtrl.tileContent.image}} fa-3x\" sit-mom-icon=\"actnTileCtrl.tileContent.svgIcon || actnTileCtrl.tileContent.typeIcon\"></em>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/tiles/custom-tile-item.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/tiles/custom-tile-item.html",
    "<div ng-attr-data-internal-type=\"{{itemTileCtrl.template == 'large'? 'largeItemTile' : itemTileCtrl.template == 'wide'? 'wideItemTile' : 'mediumItemTile'}}\" class=\"tile\" ng-click=\"itemTileCtrl.tileClicked()\">\n" +
    "    <div data-internal-type='custom-template-container' ng-class=\"{'large large-item' : itemTileCtrl.template == 'large','wide wide-item' : itemTileCtrl.template == 'wide','medium medium-item' : itemTileCtrl.template == 'medium' }\" class='{{itemTileCtrl.selectClass}}' ng-style=\"{'color': itemTileCtrl.color, 'background-color': itemTileCtrl.bgColor}\">\n" +
    "        <div ng-class=\"{'large-select' : itemTileCtrl.template == 'large','wide-select' : itemTileCtrl.template == 'wide','medium-select' : itemTileCtrl.template == 'medium' }\" ng-show=\"itemTileCtrl.showSelectCheck()\"></div>\n" +
    "        <div ng-show=\"itemTileCtrl.showSelectCheck()\" class=\"top-right-corner-triangle\" data-internal-type=\"selection-triangle\"></div>\n" +
    "        <span ng-show=\"itemTileCtrl.showSelectCheck()\" class=\"top-right-select-img fa fa-check fa-lg fa-inverse\" data-internal-type=\"selection-check\"></span>\n" +
    "        <div class=\"item-tile-tag\" ng-if=\"itemTileCtrl.isTagShown\" ng-class=\"{'wide-item-tag-expand':itemTileCtrl.isTagContainerExpanded && itemTileCtrl.template === 'wide', 'wide-item-tag':!itemTileCtrl.isTagContainerExpanded && itemTileCtrl.template === 'wide', 'large-item-tag-expand':itemTileCtrl.isTagContainerExpanded && itemTileCtrl.template === 'large', 'large-item-tag':!itemTileCtrl.isTagContainerExpanded && itemTileCtrl.template === 'large'}\" ng-click=\"$event.stopPropagation()\">\n" +
    "            <div class=\"tag-icon\" ng-click=\"itemTileCtrl.toggleTagContainer()\" ng-show=\"itemTileCtrl.showTagExpandIcon\">\n" +
    "                <em ng-if=\"itemTileCtrl.isTagContainerExpanded\" sit-mom-icon=\"itemTileCtrl.svgIcons.svgDown\"></em>\n" +
    "                <em ng-if=\"!itemTileCtrl.isTagContainerExpanded\" sit-mom-icon=\"itemTileCtrl.svgIcons.svgUp\"></em>\n" +
    "            </div>\n" +
    "            <div class=\"tag-text-container\" data-internal-type=\"tag-text-container\">\n" +
    "                <span ng-repeat=\"tag in itemTileCtrl.tileContent[itemTileCtrl.tag] track by $index\" class=\"tag-text\" ng-show=\"tag.Name.length >0\" title=\"{{tag.Name}}\">\n" +
    "                    <div ng-style=\"tag.style\" class=\"tagbullet\"></div>\n" +
    "                    {{tag.ShortName}}\n" +
    "                </span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/tiles/item-tile.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/tiles/item-tile.html",
    "<div class='item-tile-wrapper' ng-include=\"'common/widgets/tiles/'+ itemTileCtrl.tempalteUrl\" onload=\"itemTileCtrl.templateLoaded()\" />\n" +
    "\n" +
    "");
}]);

angular.module("common/widgets/tiles/large-tile-item.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/tiles/large-tile-item.html",
    "<div data-internal-type=\"largeItemTile\" class=\"tile\" ng-click=\"itemTileCtrl.tileClicked()\" title=\"{{itemTileCtrl.displayTooltip}}\" ng-class=\"itemTileCtrl.isTagShown ? (itemTileCtrl.isTagContainerExpanded ? 'tags-enabled show-box-shadow' : 'tags-enabled hide-box-shadow') :'tags-disabled'\">\n" +
    "    <div class='large large-item {{itemTileCtrl.selectClass}}' ng-style=\"{'color': itemTileCtrl.color, 'background-color': itemTileCtrl.bgColor}\">\n" +
    "        <div class=\"large-select\" ng-show=\"itemTileCtrl.showSelectCheck()\"></div>\n" +
    "        <div ng-show=\"itemTileCtrl.showSelectCheck()\" class=\"top-right-corner-triangle\" data-internal-type=\"selection-triangle\"></div>\n" +
    "        <span ng-show=\"itemTileCtrl.showSelectCheck()\" class=\"top-right-select-img fa fa-check fa-lg fa-inverse\" data-internal-type=\"selection-check\"></span>\n" +
    "        <div class=\"large-item-image-container-86x86\" data-internal-type=\"image-container\">\n" +
    "            <div class=\"large-item-image-vcenter-62x62\" data-internal-type=\"image-vcenter\" ng-class=\"itemTileCtrl.tileContent.svgIcon || itemTileCtrl.tileContent.typeIcon ? 'remove-font-awesome':''\">\n" +
    "                <div ng-if=\"(itemTileCtrl.tileContent.image || itemTileCtrl.tileContent.svgIcon || itemTileCtrl.tileContent.typeIcon) && !itemTileCtrl.tileContent.imageTemplate\" class=\"fa fa-4x {{itemTileCtrl.tileContent.image}}\" sit-mom-icon=\"itemTileCtrl.tileContent.svgIcon || itemTileCtrl.tileContent.typeIcon\"></div>\n" +
    "                <div ng-if=\"itemTileCtrl.tileContent.imageTemplate\" class=\"fa fa-4x\" ng-bind-html=\"itemTileCtrl.tileContent.imageTemplate\"></div>\n" +
    "            </div>\n" +
    "            <div class=\"content-status-icon\">\n" +
    "                <span ng-if=\"itemTileCtrl.tileContent.contentStatus ==='editing'\" class=\"bottom-left-status-img\" sit-mom-icon=\"itemTileCtrl.svgIcons.certificate\" />\n" +
    "                <span ng-if=\"itemTileCtrl.tileContent.contentStatus ==='warning'\" class=\"bottom-left-status-img\" sit-mom-icon=\"itemTileCtrl.svgIcons.warning\" />\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"large-item-title-container\">\n" +
    "            <div title=\"{{itemTileCtrl.displayTooltip}}\" class=\"item-title-vcenter\" data-internal-type=\"title\">{{itemTileCtrl.displayTitle}}</div>\n" +
    "        </div>\n" +
    "        <div class=\"large-item-text-container\" data-internal-type=\"text-container\">\n" +
    "            <div title=\"{{itemTileCtrl.descriptionTooltip}}\" class=\"large-item-description\" data-internal-type=\"description\">{{itemTileCtrl.displayDescription}}</div>\n" +
    "            <div class=\"large-item-properties\" ng-class=\"itemTileCtrl.getPropertiesDivHeight();\" data-internal-type=\"properties\">\n" +
    "                <div title=\"{{property.sanitizedVal}}\" ng-repeat=\"property in itemTileCtrl.displayProperties track by $index\" ng-if=\"property\" class=\"large-item-property\"><span>{{property.name}}</span><span>{{property.sanitizedVal}}</span></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div ng-if=\"itemTileCtrl.isTagShown\" class=\"item-tile-tag-container\">\n" +
    "            <div class=\"item-tile-tag\" ng-class=\"itemTileCtrl.isTagContainerExpanded ? 'large-item-tag-expand' : 'large-item-tag'\" ng-click=\"$event.stopPropagation()\">\n" +
    "                <div class=\"tag-icon\" ng-click=\"itemTileCtrl.toggleTagContainer()\" ng-show=\"itemTileCtrl.showTagExpandIcon\">\n" +
    "                    <em ng-if=\"itemTileCtrl.isTagContainerExpanded\" sit-mom-icon=\"itemTileCtrl.svgIcons.svgUp\"></em>\n" +
    "                    <em ng-if=\"!itemTileCtrl.isTagContainerExpanded\" sit-mom-icon=\"itemTileCtrl.svgIcons.svgDown\"></em>\n" +
    "                </div>\n" +
    "                <div class=\"tag-text-container\" data-internal-type=\"tag-text-container\">\n" +
    "                    <span ng-repeat=\"tag in itemTileCtrl.tileContent[itemTileCtrl.tag] track by $index\" class=\"tag-text\" ng-show=\"tag.Name.length >0\" title=\"{{tag.Name}}\">\n" +
    "                        <div ng-style=\"tag.style\" class=\"tagbullet\"></div>\n" +
    "                        {{tag.ShortName}}\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/tiles/medium-tile-item.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/tiles/medium-tile-item.html",
    "<div data-internal-type=\"mediumItemTile\" class=\"tile\" ng-click=\"itemTileCtrl.tileClicked()\" sit-tile-height=\"true\" ng-class=\"itemTileCtrl.isTagShown ? (itemTileCtrl.isTagContainerExpanded ? 'tags-enabled show-box-shadow' : 'tags-enabled hide-box-shadow') :'tags-disabled'\">\n" +
    "    <div class='medium-wide medium-item {{itemTileCtrl.selectClass}} ' ng-style=\"{'color': itemTileCtrl.color, 'background-color': itemTileCtrl.bgColor}\">\n" +
    "        <div class=\"medium-select\" ng-show=\"itemTileCtrl.showSelectCheck()\"></div>\n" +
    "        <div ng-show=\"itemTileCtrl.showSelectCheck()\" class=\"top-right-corner-triangle-med\" data-internal-type=\"selection-triangle\"></div>\n" +
    "        <span ng-show=\"itemTileCtrl.showSelectCheck()\" class=\"top-right-select-img-med fa fa-check fa-inverse\" data-internal-type=\"selection-check\"></span>\n" +
    "        <div class=\"medium-item-image-container\" data-internal-type=\"image-container\">\n" +
    "            <div class=\"medium-item-image\" data-internal-type=\"medium-image\" ng-class=\"itemTileCtrl.tileContent.svgIcon || itemTileCtrl.tileContent.typeIcon ? 'remove-font-awesome':''\">\n" +
    "                <div ng-if=\"(itemTileCtrl.tileContent.image || itemTileCtrl.tileContent.svgIcon || itemTileCtrl.tileContent.typeIcon) && !itemTileCtrl.tileContent.imageTemplate\" class=\"fa fa-2x {{itemTileCtrl.tileContent.image}} \" sit-mom-icon=\"itemTileCtrl.tileContent.svgIcon || itemTileCtrl.tileContent.typeIcon\"></div>\n" +
    "                <div ng-if=\"itemTileCtrl.tileContent.imageTemplate\" class=\"fa fa-2x\" ng-bind-html=\"itemTileCtrl.tileContent.imageTemplate\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"medium-item-text-container\" data-internal-type=\"text-container\" ng-class=\"itemTileCtrl._commands.length > 0 ? 'medium-item-text-short' : 'medium-item-text-long'\">\n" +
    "            <div title=\"{{itemTileCtrl.displayTooltip}}\" class=\"medium-item-text medium-title-display\" data-internal-type=\"title\">{{itemTileCtrl.displayTitle}}</div>\n" +
    "            <div title=\"{{itemTileCtrl.descriptionTooltip}}\" class=\"{{itemTileCtrl.descriptionClass}} medium-description-display\" data-internal-type=\"description\">{{itemTileCtrl.displayDescription}}</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"action-buttons\" ng-if=\"itemTileCtrl.isCell && itemTileCtrl._commands.length > 0\">\n" +
    "            <div ng-repeat=\"command in itemTileCtrl._commands\" class=\"action-button-item\" ng-if=\"$index <= 1 && command.isVisible\">\n" +
    "                <div title=\"{{command.tooltip}}\" ng-class=\"command.cmdIcon ? 'remove-font-awesome':'action-button-icon'\">\n" +
    "                    <em class=\"fa {{command.img}}\" sit-mom-icon=\"command.cmdIcon\" ng-click=\"itemTileCtrl.commandCallback($event, command)\"></em>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"medium-item-properties\" ng-class=\"itemTileCtrl.getPropertiesDivHeight(); itemTileCtrl._commands.length > 1 ? 'medium-item-properties-short' : 'medium-item-properties-long'\" data-internal-type=\"properties\">\n" +
    "            <div title=\"{{property.sanitizedVal}}\" ng-repeat=\"property in itemTileCtrl.displayProperties track by $index\" ng-if=\"property\" class=\"medium-item-property\"><span class=\"displayProperty\">{{property.name}}</span><span>{{property.sanitizedVal}}</span></div>\n" +
    "        </div>\n" +
    "        <div class=\"medium-item-indicators\" ng-if=\"itemTileCtrl.isCell\">\n" +
    "            <div ng-repeat=\"indicator in itemTileCtrl._indicators track by $index\" ng-if=\"$index <= 9 && indicator.isVisible\" class=\"fa fa-2x {{indicator.image}} indicator-icons\" sit-mom-icon=\"indicator.svgIcon\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div ng-if=\"itemTileCtrl.isTagShown && itemTileCtrl.isCell\" class=\"item-tile-tag-container\">\n" +
    "            <div class=\"item-tile-tag\" ng-if=\"itemTileCtrl.isTagShown\" ng-class=\"itemTileCtrl.isTagContainerExpanded ? 'wide-item-tag-expand' : 'wide-item-tag'\" ng-click=\"$event.stopPropagation()\">\n" +
    "                <div class=\"tag-icon\" ng-click=\"itemTileCtrl.toggleTagContainer()\" ng-show=\"itemTileCtrl.showTagExpandIcon\">\n" +
    "                    <em ng-if=\"itemTileCtrl.isTagContainerExpanded\" sit-mom-icon=\"itemTileCtrl.svgIcons.svgUp\"></em>\n" +
    "                    <em ng-if=\"!itemTileCtrl.isTagContainerExpanded\" sit-mom-icon=\"itemTileCtrl.svgIcons.svgDown\"></em>\n" +
    "                </div>\n" +
    "                <div class=\"tag-text-container\" data-internal-type=\"tag-text-container\">\n" +
    "                    <span ng-repeat=\"tag in itemTileCtrl.tileContent[itemTileCtrl.tag] track by $index\" class=\"tag-text\" ng-show=\"tag.Name.length >0\" title=\"{{tag.Name}}\">\n" +
    "                        <div ng-style=\"tag.style\" class=\"tagbullet\"></div>\n" +
    "                        {{tag.ShortName}}\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/tiles/tile-group.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/tiles/tile-group.html",
    "<!-- header -->\n" +
    "<div ng-if=\"!tileGrpCtrl.group.isDummy\" ng-style=\"rowStyle(row)\" style=\"overflow:hidden;\" class=\"tile-group-header\">\n" +
    "    <div style=\"display:inline-block; float:left;\" ng-click=\"tileGrpCtrl.toggleGroup(tileGrpCtrl.group)\">\n" +
    "        <div class=\"{{tileGrpCtrl.group.arrowClass()}}\" ng-style=\"{height: tileGrpCtrl.group.rowheight}\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-style=\"{height: tileGrpCtrl.group.rowheight}\" class=\"tile-group-text\" ng-click=\"tileGrpCtrl.toggleGroup(tileGrpCtrl.group)\">\n" +
    "        <div style=\"display:table-cell; vertical-align:middle; height:inherit;\">{{tileGrpCtrl.group.name}} ({{tileGrpCtrl.group.childCount()}})</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-style=\"{height: tileGrpCtrl.group.rowheight}\" class=\"tile-group-select\" ng-show=\"tileGrpCtrl.selectionMode === 'multi' && tileGrpCtrl.multiSelect\">\n" +
    "        <div style=\"display:table-cell; vertical-align:middle; height:inherit;\">\n" +
    "            <input type=\"checkbox\" style=\"margin-left:10px; cursor: pointer\" ng-model=\"tileGrpCtrl.groupSelected\" ng-checked=\"tileGrpCtrl.groupSelected\" ng-click=\"tileGrpCtrl.selectGroup()\" />\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"tile-group-line-container\" ng-style=\"{height: tileGrpCtrl.group.rowheight}\">\n" +
    "        <div class=\"tile-group-line\"></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- tiles container -->\n" +
    "<!-- Do not change whitespace here.  Needed to remove space between multiple inline-block elements -->\n" +
    "<div data-internal-type=\"itemTileContainer\" ng-if=\"tileGrpCtrl.group.expanded || (tileGrpCtrl.groupsLength <= 1 && tileGrpCtrl.group.isDummy)\" class=\"tile-group-block\">\n" +
    "    <!--\n" +
    "    -->\n" +
    "    <sit-item-tile sit-format=\"tileGrpCtrl.sitFormat\" ng-repeat=\"tile in tileGrpCtrl.group.tiles\" sit-tile-content=\"tile\" sit-tile-options=\"tileGrpCtrl.tileOptions\" sit-tile-template=\"tileGrpCtrl.tileOptions.tileTemplate\" sit-last-tile></sit-item-tile>\n" +
    "    <!--\n" +
    "    -->\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/tiles/tile-view.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/tiles/tile-view.html",
    "<div data-internal-type=\"tileViewContainerDiv\">\n" +
    "    <div data-internal-type=\"tileContainerDiv\" ng-class=\"tileViewCtrl.options.tileContainerClass\" class=\"tile-container\">\n" +
    "        <div data-internal-type=\"showHideView\" ng-switch=\"tileViewCtrl.options.tileType\" ng-if=\"tileViewCtrl.showView\">\n" +
    "            <div ng-switch-when=\"action\">\n" +
    "                <sit-action-tile ng-repeat=\"tile in tileViewCtrl.tiles\" sit-tile-content=\"tile\">\n" +
    "                </sit-action-tile>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-switch-when=\"item\">\n" +
    "                <sit-tile-group sit-format=\"tileViewCtrl.sitFormat\" ng-if=\"tileViewCtrl.groups.length > 0\"\n" +
    "                                ng-repeat=\"group in tileViewCtrl.groups\"\n" +
    "                                data-sit-group=\"group\"\n" +
    "                                data-sit-groups-length=\"{{tileViewCtrl.groups.length}}\"\n" +
    "                                sit-group-expanding=\"tileViewCtrl.groupExpanding(groupCount)\"\n" +
    "                                sit-tile-options=\"tileViewCtrl.tileOptions\"\n" +
    "                                sit-multi-select=\"tileViewCtrl.options.multiSelect\"\n" +
    "                                sit-selection-mode=\"tileViewCtrl.options.selectionMode\">\n" +
    "                </sit-tile-group>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-switch-when=\"notification\">\n" +
    "                {{'tiles.notificationTiles'|translate}}\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-switch-default>\n" +
    "                {{'tiles.unknownTileType'|translate}}: {{tileViewCtrl.options.tileType}}.\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div data-internal-type=\"showHideMessage\" ng-if=\"tileViewCtrl.showMessage\" class=\"no-data-content\">\n" +
    "            {{tileViewCtrl.messageText}}\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div data-internal-type=\"loading-container-xxx\" ng-if=\"tileViewCtrl.loadingMany\" style=\"position:absolute;left:50%;top:50%; width:300px; height:100px; margin:-50px auto auto -150px; overflow:hidden; text-align:center; background-color:white;\">\n" +
    "        <span style=\"line-height:100px;\"></span>\n" +
    "        <div style=\"display:inline-block; font-size:xx-large;\">{{tileViewCtrl.loadingMessage}}</div>\n" +
    "    </div>\n" +
    "    <div ng-if=\"tileViewCtrl.options.enablePaging && tileViewCtrl.totalDataItems && !tileViewCtrl.grouping\">\n" +
    "        <sit-pagination ng-show=\"tileViewCtrl.options.enablePaging\" sit-options=\"tileViewCtrl.paginationOptions\"></sit-pagination>\n" +
    "    </div>\n" +
    "    <div class=\"sit-icv-footer-infinite-scroll\" ng-if=\"!tileViewCtrl.options.enablePaging && tileViewCtrl.options.tileViewMode !== 'c'\">\n" +
    "        <span class=\"sit-icv-footer-infinite-scroll-label\">{{'pagination.selected-items'|translate}} {{tileViewCtrl.paginationOptions.selectedItemsCount}}</span>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("common/widgets/tiles/wide-tile-item.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/tiles/wide-tile-item.html",
    "<div data-internal-type=\"wideItemTile\" class=\"tile\" ng-click=\"itemTileCtrl.tileClicked()\" sit-tile-height=\"true\" ng-class=\"itemTileCtrl.isTagShown ? (itemTileCtrl.isTagContainerExpanded ? 'tags-enabled show-box-shadow' : 'tags-enabled hide-box-shadow') :'tags-disabled'\">\n" +
    "    <div class=\"medium-wide wide-item {{itemTileCtrl.selectClass}} \" ng-style=\"{'color': itemTileCtrl.color, 'background-color': itemTileCtrl.bgColor}\">\n" +
    "        <div class=\"wide-select\" ng-show=\"itemTileCtrl.showSelectCheck()\"></div>\n" +
    "        <div ng-show=\"itemTileCtrl.showSelectCheck()\" class=\"top-right-corner-triangle\" data-internal-type=\"selection-triangle\"></div>\n" +
    "        <span ng-show=\"itemTileCtrl.showSelectCheck()\" class=\"top-right-select-img fa fa-check fa-inverse fa-lg\" data-internal-type=\"selection-check\"></span>\n" +
    "        <div class=\"wide-item-left-col\" data-internal-type=\"left-column\">\n" +
    "            <div class=\"image-container-40x40\" data-internal-type=\"image-container\">\n" +
    "                <div class=\"image-vcenter-32x32\" data-internal-type=\"image-vcenter\" ng-class=\"itemTileCtrl.tileContent.svgIcon || itemTileCtrl.tileContent.typeIcon ? 'remove-font-awesome':''\">\n" +
    "                    <div ng-if=\"(itemTileCtrl.tileContent.image || itemTileCtrl.tileContent.svgIcon || itemTileCtrl.tileContent.typeIcon) && !itemTileCtrl.tileContent.imageTemplate\" class=\"fa fa-2x {{itemTileCtrl.tileContent.image}} \" sit-mom-icon=\"itemTileCtrl.tileContent.svgIcon || itemTileCtrl.tileContent.typeIcon\"></div>\n" +
    "                    <div ng-if=\"itemTileCtrl.tileContent.imageTemplate\" class=\"fa fa-2x\" ng-bind-html=\"itemTileCtrl.tileContent.imageTemplate\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"wide-item-text\" data-internal-type=\"text-container\" ng-class=\"itemTileCtrl._commands.length > 0 ? 'wide-item-text-short' : 'wide-item-text-long'\">\n" +
    "            <div class=\"wide-item-title\" data-internal-type=\"title\" title=\"{{itemTileCtrl.displayTooltip}}\"><strong>{{itemTileCtrl.displayTitle}}</strong></div>\n" +
    "            <div class=\"{{itemTileCtrl.descriptionClass}}\" title=\"{{itemTileCtrl.descriptionTooltip}}\" data-internal-type=\"description\">{{itemTileCtrl.displayDescription}}</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"action-buttons\" ng-if=\"itemTileCtrl.isCell && itemTileCtrl._commands.length > 0\">\n" +
    "\n" +
    "            <div ng-repeat=\"command in itemTileCtrl._commands track by $index\" class=\"action-button-item\" ng-if=\"$index <= 1 && command.isVisible\">\n" +
    "                <div title=\"{{command.tooltip}}\" ng-class=\"command.cmdIcon ? 'remove-font-awesome':'action-button-icon'\">\n" +
    "                    <em class=\"fa {{command.img}}\" sit-mom-icon=\"command.cmdIcon\" ng-click=\"itemTileCtrl.commandCallback($event, command)\"></em>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"wide-item-properties\" ng-class=\"itemTileCtrl.getPropertiesDivHeight(); itemTileCtrl._commands.length > 1 ? 'wide-item-properties-short' : 'wide-item-properties-long'\" data-internal-type=\"properties\">\n" +
    "            <div title=\"{{property.sanitizedVal}}\" ng-repeat=\"property in itemTileCtrl.displayProperties track by $index\" ng-if=\"property\" class=\"wide-item-property\">\n" +
    "                <span class=\"displayProperty\">{{property.name}}</span><span>{{property.sanitizedVal}}</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"wide-item-indicators\" ng-if=\"itemTileCtrl.isCell\">\n" +
    "            <span ng-if=\"itemTileCtrl.tileContent.contentStatus ==='editing'\" class=\"bottom-left-status-img\" sit-mom-icon=\"itemTileCtrl.svgIcons.certificate\" />\n" +
    "            <span ng-if=\"itemTileCtrl.tileContent.contentStatus ==='warning'\" class=\"bottom-left-status-img\" sit-mom-icon=\"itemTileCtrl.svgIcons.warning\" />\n" +
    "            <div ng-repeat=\"indicator in itemTileCtrl._indicators track by $index\" ng-if=\"$index <= 9 && indicator.isVisible\" class=\"fa fa-2x {{indicator.image}} indicator-icons\" sit-mom-icon=\"indicator.svgIcon\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div ng-if=\"itemTileCtrl.isTagShown\" class=\"item-tile-tag-container\">\n" +
    "            <div class=\"item-tile-tag\" ng-if=\"itemTileCtrl.isTagShown\" ng-class=\"itemTileCtrl.isTagContainerExpanded ? 'wide-item-tag-expand' : 'wide-item-tag'\" ng-click=\"$event.stopPropagation()\">\n" +
    "\n" +
    "                <div class=\"tag-icon\" ng-click=\"itemTileCtrl.toggleTagContainer()\" ng-show=\"itemTileCtrl.showTagExpandIcon\">\n" +
    "                    <em ng-if=\"itemTileCtrl.isTagContainerExpanded\" sit-mom-icon=\"itemTileCtrl.svgIcons.svgUp\"></em>\n" +
    "                    <em ng-if=\"!itemTileCtrl.isTagContainerExpanded\" sit-mom-icon=\"itemTileCtrl.svgIcons.svgDown\"></em>\n" +
    "                </div>\n" +
    "                <div class=\"tag-text-container\" data-internal-type=\"tag-text-container\">\n" +
    "                    <span ng-repeat=\"tag in itemTileCtrl.tileContent[itemTileCtrl.tag] track by $index\" class=\"tag-text\" ng-show=\"tag.Name.length >0\" title=\"{{tag.Name}}\">\n" +
    "                        <div ng-style=\"tag.style\" class=\"tagbullet\"></div>\n" +
    "                        {{tag.ShortName}}\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/timePicker/time-picker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/timePicker/time-picker.html",
    "<div class=\"label label-property-grid-control-readonly property-value-ellipsis\" ng-if=\"timePickerCtrl.readOnly || timePickerCtrl.ngReadonly\">\n" +
    "    {{timePickerCtrl.value | date: 'shortTime'}}\n" +
    "</div>\n" +
    "\n" +
    "<ng-form name='timePickerForm' ng-if=\"!(timePickerCtrl.readOnly || timePickerCtrl.ngReadonly)\" ng-class=\"{'isrequired' : (timePickerCtrl.validation.required) && (timePickerCtrl.value===undefined)}\">\n" +
    "    <div class=\"sitTimePicker\" style=\"border:none;\">\n" +
    "        <div class=\"property-grid-input-group\">\n" +
    "            <input style=\"cursor:pointer;\" class=\"property-grid-control validator-control\" type=\"text\" readonly=\"readonly\" ng-model=\"timePickerCtrl.value\" value=\"{{timePickerCtrl.value | date: timePickerCtrl.format}}\"\n" +
    "                   ng-class=\"{'validator-control-invalid':((timePickerForm.$invalid && timePickerForm.$dirty) || (timePickerForm.$invalid && timePickerForm.$visited)),\n" +
    "               'validator-control':!((timePickerForm.$invalid && timePickerForm.$dirty) || (timePickerForm.$invalid && timePickerForm.$visited)),\n" +
    "               'ng-dirty':timePickerForm.$dirty}\"\n" +
    "                   ng-click=\"timePickerCtrl.ngDisabled || timePickerCtrl.clicked($event)\" ng-required=\"timePickerCtrl.validation.required\" sit-form-input-validator\n" +
    "                   sit-change=\"timePickerCtrl.sitChange\" ng-disabled=\"timePickerCtrl.ngDisabled\" ng-blur=\"timePickerCtrl.ngBlur()\" ng-focus=\"timePickerCtrl.ngFocus()\" />\n" +
    "            <div class=\"btn property-grid-addon-icon\" ng-click=\"timePickerCtrl.ngDisabled || timePickerCtrl.clicked($event)\" ng-disabled=\"timePickerCtrl.ngDisabled\">\n" +
    "                <em class=\"time-picker-icon\" sit-mom-icon=\"{path: 'common/icons/cmdTime24.svg' , size: '16px'}\"></em>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"dropdown-menu property-grid-time-picker-popup\" ng-style=\"{display: (timePickerCtrl.isOpen && 'block') || 'none'}\" ng-disabled=\"timePickerCtrl.ngDisabled\">\n" +
    "            <div uib-timepicker ng-if=\"timePickerCtrl.format==='mediumTime'\" ng-model=\"timePickerCtrl.popupValue\" show-seconds=true show-meridian=\"timePickerCtrl.showMeridian\"></div>\n" +
    "            <div uib-timepicker ng-if=\"!(timePickerCtrl.format==='mediumTime')\" ng-model=\"timePickerCtrl.popupValue\" show-meridian=\"timePickerCtrl.showMeridian\"></div>\n" +
    "            <button type=\"button\" class=\"btn btn-primary btn-sm pull-left\" ng-click=\"timePickerCtrl.ngDisabled || timePickerCtrl.setClicked($event)\">{{'timePicker.set' | translate}}</button>\n" +
    "            <button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"timePickerCtrl.ngDisabled || timePickerCtrl.clearTime($event)\">{{'timePicker.clear' | translate}}</button>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</ng-form>");
}]);

angular.module("common/widgets/toolbox/toolbox-section.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/toolbox/toolbox-section.html",
    "<div class=\"toolbox-section\">\n" +
    "    <div ng-class=\"toolboxSecCtrl.isExpanded ? 'toolbox-section-header-open' : 'toolbox-section-header'\" >\n" +
    "        <em class=\"{{toolboxSecCtrl.sitIcon}}\" sit-mom-icon=\"toolboxSecCtrl.displayIcon\" ng-class=\"{momIcon: toolboxSecCtrl.displayIcon !== null}\"></em>\n" +
    "        <span class=\"toolbox-section-title\"> {{toolboxSecCtrl.sitTitle}}</span>\n" +
    "        <div  ng-click=\"toolboxSecCtrl.toggleSection()\" class=\"toolbox-section-toggle\" ng-hide=\"toolboxSecCtrl.isDisabled\">\n" +
    "            <span ng-class=\"toolboxSecCtrl.isExpanded ? 'fa fa-angle-down' : 'fa fa-angle-left'\"></span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"toolbox-section-content\" ng-class=\"toolboxSecCtrl.isExpanded ? 'toolbox-section-content-show' : 'toolbox-section-content-hide'\" ng-transclude></div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("common/widgets/toolbox/toolbox.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/toolbox/toolbox.html",
    "<div class=\"toolbox-main-container\" style=\"width:100%\">\n" +
    "\n" +
    "    <div ng-show=\"toolboxCtrl.isCollapsible\">\n" +
    "        <div class=\"toolbox-collapsible-icon\" ng-if=\"toolboxCtrl.align==='left'\"\n" +
    "             ng-class=\"toolboxCtrl.isCollapsed ? 'fa fa-angle-right toolbox-collapsible-icon-left-align ' :\n" +
    "             {'fa fa-angle-left': (!toolboxCtrl.isCollapsed),\n" +
    "              'toolbox-collapsible-icon-left-sm': (toolboxCtrl.size === 'sm'),\n" +
    "              'toolbox-collapsible-icon-left-md': (toolboxCtrl.size === 'md'),\n" +
    "              'toolbox-collapsible-icon-left-lg': (toolboxCtrl.size === 'lg')}\"\n" +
    "             ng-style=\"toolboxCtrl.isCollapsed ? {} : {'float':'left','position':'absolute','min-height':(toolboxCtrl.isTitleShown ? '40px':'34px')}\"\n" +
    "             ng-click=\"toolboxCtrl.toggleSection()\">\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"toolbox-collapsible-icon\" ng-if=\"toolboxCtrl.align==='right'\"\n" +
    "             ng-class=\"toolboxCtrl.isCollapsed ? 'fa fa-angle-left toolbox-collapsible-icon-right-align ' :\n" +
    "             {'fa fa-angle-right': (!toolboxCtrl.isCollapsed),\n" +
    "              'toolbox-collapsible-icon-right-sm': (toolboxCtrl.size === 'sm'),\n" +
    "              'toolbox-collapsible-icon-right-md': (toolboxCtrl.size === 'md'),\n" +
    "              'toolbox-collapsible-icon-right-lg': (toolboxCtrl.size === 'lg')}\"\n" +
    "             ng-style=\"toolboxCtrl.isCollapsed ? {} : {'float':'right','position':'absolute','min-height':(toolboxCtrl.isTitleShown ? '40px':'34px')} \"\n" +
    "             ng-click=\"toolboxCtrl.toggleSection()\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"toolbox-container\" ng-class=\"{'toolBox-right-align':(toolboxCtrl.align === 'right'),'toolBox-left-align':!(toolboxCtrl.align === 'right'),\n" +
    "    'toolbox-width-sm':(toolboxCtrl.size === 'sm'), 'toolbox-width-md':(toolboxCtrl.size === 'md'), 'toolbox-width-lg':(toolboxCtrl.size === 'lg')}\" \n" +
    "         ng-hide=\"toolboxCtrl.isCollapsed\">\n" +
    "        <div class=\"toolbox-header\" ng-if=\"toolboxCtrl.isTitleShown\">\n" +
    "            <label>{{toolboxCtrl.config.title}}</label>\n" +
    "        </div>\n" +
    "        <div class=\"toolbox-section-container\" ng-class=\"{'toolbox-section-container-scroll':!toolboxCtrl.closeOthers}\" ng-transclude> </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/tristateCheckbox/tristate-checkbox.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/tristateCheckbox/tristate-checkbox.html",
    "<div class=\"sit-tristate-checkbox\">\n" +
    "    <div class=\"label label-property-grid-control-readonly checkbox-noborder\" ng-if=\"checkboxCtrl.readOnly || checkboxCtrl.ngReadonly || checkboxCtrl.ngDisabled\">\n" +
    "        <ng-form name=\"checkboxForm\" ng-class=\"{'isrequired' : (checkboxCtrl.validation.required) && (checkboxForm.$error.required.length===checkboxCtrl.value.length) }\">\n" +
    "            <div class=\"property-grid-span-group-block\">\n" +
    "                <div class=\"group-control property-grid-no-border-items\" ng-repeat=\"item in checkboxCtrl.value\" ng-class=\"checkboxCtrl.layout === 'horizontal' ? 'horizontal-layout':'vertical-layout'\">\n" +
    "                    <div class=\"check-box\" ng-class=\"!(checkboxCtrl.readOnly || checkboxCtrl.ngReadonly || checkboxCtrl.ngDisabled) ? 'checkbox-enabled' : 'checkbox-disabled'\">\n" +
    "                        <label>\n" +
    "                            <input type='button'\n" +
    "                                   name='{{item.label}}'\n" +
    "                                   ng-class=\"{'un-checked': item.checked === false || item.checked === undefined, 'checked': item.checked == true, 'indeterminate': item.checked === 'null'}\"\n" +
    "                                   ng-model='item.checked'\n" +
    "                                   ng-blur=\"checkboxCtrl.ngBlur()\"\n" +
    "                                   sit-change=\"checkboxCtrl.sitChange\"\n" +
    "                                   ng-disabled=\"true\"\n" +
    "                                   ng-focus=\"checkboxCtrl.ngFocus()\"\n" +
    "                                   ng-required=\"checkboxCtrl.validation.required\"\n" +
    "                                   sit-form-input-validator />\n" +
    "                            <span class=\"tri-state property-label-ellipsis\">\n" +
    "                                <span class=\"check\"></span>\n" +
    "                                {{item.label}}\n" +
    "                            </span>\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </ng-form>\n" +
    "    </div>\n" +
    "    <ng-form ng-if=\"!(checkboxCtrl.readOnly || checkboxCtrl.ngReadonly || checkboxCtrl.ngDisabled)\"\n" +
    "             name=\"checkboxForm\" ng-class=\"{'isrequired' : (checkboxCtrl.validation.required) && (checkboxForm.$error.required.length===checkboxCtrl.value.length) }\">\n" +
    "        <div class=\"property-grid-span-group-block validator-control checkbox-noborder\" ng-model=\"checkboxCtrl.value\">\n" +
    "            <div class=\"group-control\" ng-repeat=\"item in checkboxCtrl.value\" ng-class=\"checkboxCtrl.layout === 'horizontal' ? 'horizontal-layout':'vertical-layout'\">\n" +
    "                <div class=\"check-box\" ng-class=\"!checkboxCtrl.ngDisabled ? 'checkbox-enabled' : 'checkbox-disabled'\">\n" +
    "                    <label>\n" +
    "                        <input type='button'\n" +
    "                               name='{{item.label}}'\n" +
    "                               ng-click=\"checkboxCtrl.updateState($index, item.checked)\"\n" +
    "                               ng-class=\"{'un-checked': item.checked === false || item.checked === undefined, 'checked': item.checked == true, 'indeterminate': item.checked === 'null'}\"\n" +
    "                               ng-model='item.checked'\n" +
    "                               ng-blur=\"checkboxCtrl.ngBlur()\"\n" +
    "                               sit-change=\"checkboxCtrl.sitChange\"\n" +
    "                               ng-disabled=\"checkboxCtrl.ngDisabled\"\n" +
    "                               ng-focus=\"checkboxCtrl.ngFocus()\"\n" +
    "                               ng-required=\"checkboxCtrl.validation.required\"\n" +
    "                               sit-form-input-validator />\n" +
    "                        <span class=\"tri-state property-label-ellipsis\">\n" +
    "                            <span class=\"check\"></span>\n" +
    "                            {{item.label}}\n" +
    "                        </span>\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </ng-form>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/widgets/typeahead/typeahead.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/typeahead/typeahead.html",
    "<div ng-if=\"typeaheadCtrl.readOnly || typeaheadCtrl.ngReadonly\" class='label-property-grid-control-readonly property-value-ellipsis'>{{typeaheadCtrl.value}}</div>\n" +
    "\n" +
    "<ng-form ng-if=\"!(typeaheadCtrl.readOnly || typeaheadCtrl.ngReadonly)\" name='typeaheadForm' ng-class=\"{'isrequired' : (typeaheadCtrl.validation.required) && typeaheadCtrl.value===undefined}\">\n" +
    "    <div class='property-grid-input-group property-grid-list' ng-if=\"typeaheadCtrl.toDisplay != null\">\n" +
    "        <input type='text'\n" +
    "               name='{{typeaheadCtrl.value}}'\n" +
    "               ng-class=\"{'validator-control-invalid':((typeaheadForm.$invalid && typeaheadForm.$dirty) || (typeaheadForm.$invalid && typeaheadForm.$visited)),\n" +
    "               'validator-control':!((typeaheadForm.$invalid && typeaheadForm.$dirty) || (typeaheadForm.$invalid && typeaheadForm.$visited)),\n" +
    "               'ng-dirty':typeaheadForm.$dirty}\"\n" +
    "               ng-model='typeaheadCtrl.value'\n" +
    "               ng-required='typeaheadCtrl.validation.required'\n" +
    "               ng-pattern='typeaheadCtrl.validation.pattern'\n" +
    "               uib-typeahead='option as option[typeaheadCtrl.toDisplay] for option in typeaheadCtrl.options | filter:$viewValue'\n" +
    "               ng-blur=\"typeaheadCtrl.ngBlur()\"\n" +
    "               sit-change=\"typeaheadCtrl.sitChange\"\n" +
    "               ng-disabled=\"typeaheadCtrl.ngDisabled\"\n" +
    "               ng-focus=\"typeaheadCtrl.ngFocus()\"\n" +
    "               sit-form-input-validator />\n" +
    "    </div>\n" +
    "\n" +
    "    <div class='property-grid-input-group property-grid-list' ng-if=\"typeaheadCtrl.toDisplay == null\">\n" +
    "        <input type='text'\n" +
    "               name='{{typeaheadCtrl.value}}'\n" +
    "               ng-class=\"{'validator-control-invalid':((typeaheadForm.$invalid && typeaheadForm.$dirty) || (typeaheadForm.$invalid && typeaheadForm.$visited)),\n" +
    "               'validator-control':!((typeaheadForm.$invalid && typeaheadForm.$dirty) || (typeaheadForm.$invalid && typeaheadForm.$visited)),\n" +
    "               'ng-dirty':typeaheadForm.$dirty}\"\n" +
    "               ng-model='typeaheadCtrl.value'\n" +
    "               ng-required='typeaheadCtrl.validation.required'\n" +
    "               ng-pattern='typeaheadCtrl.validation.pattern'\n" +
    "               uib-typeahead='val for val in typeaheadCtrl.options | filter:$viewValue'\n" +
    "               ng-blur=\"typeaheadCtrl.ngBlur()\"\n" +
    "               sit-change=\"typeaheadCtrl.sitChange\"\n" +
    "               ng-disabled=\"typeaheadCtrl.ngDisabled\"\n" +
    "               ng-focus=\"typeaheadCtrl.ngFocus()\"\n" +
    "               sit-form-input-validator />\n" +
    "    </div>\n" +
    "</ng-form>");
}]);

angular.module("common/widgets/viewBar/view-bar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/viewBar/view-bar.html",
    "<div id=\"viewBarContainer\" data-internal-type=\"viewBarContainer\">\n" +
    "    <style>\n" +
    "        .view-text {\n" +
    "            margin-left: 5px;\n" +
    "        }\n" +
    "    </style>\n" +
    "    <div class=\"dropdown btn-group group-dropdown\" style=\"display:inline-block;\" ng-if=\"viewBarCtrl.viewButtons.length > 1\">\n" +
    "        <em class=\"dropdown-toggle switch-button switch-button-dropdown fa ng-class:viewBarCtrl.selectedButton.faIcon\" data-toggle=\"dropdown\"><span class=\"caret\"></span></em>\n" +
    "        <ul class=\"dropdown-menu sit-dropdown-menu\" role=\"menu\">\n" +
    "            <li ng-repeat=\"viewButton in viewBarCtrl.viewButtons\" role=\"presentation\" ng-click=\"viewBarCtrl.selectView($event, viewButton)\">\n" +
    "                <a role=\"menuitem\" tabindex=\"-1\">\n" +
    "                    <span class=\"view-text\">\n" +
    "                        <em class=\"fa ng-class:viewButton.faIcon\"></em>\n" +
    "                        {{viewButton.text}}\n" +
    "                    </span>\n" +
    "                    <em class=\"fa fa-check\" ng-show=\"viewButton.selected\"></em>\n" +
    "                    <br style=\"clear:both\"/>\n" +
    "                </a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "    <sit-switch-button ng-if=\"viewBarCtrl.selectButton.length > 0\" sit-buttons=\"viewBarCtrl.selectButton\"></sit-switch-button>\n" +
    "    <sit-switch-button ng-if=\"viewBarCtrl.detailsButton.length > 0\" sit-buttons=\"viewBarCtrl.detailsButton\"></sit-switch-button>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("common/widgets/workInstructionInstanceViewer/work-instruction-instance-viewer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/widgets/workInstructionInstanceViewer/work-instruction-instance-viewer.html",
    "<div class=\"instance-viewer-content panel-group\">\n" +
    "    <div class=\"wi-header\" ng-show=\"instanceViewerCtr.sections.length>1\">\n" +
    "        <em ng-class=\"(instanceViewerCtr.isAllExpanded) ? 'fa fa-2x fa-angle-double-up' : 'fa fa-2x fa-angle-double-down'\" class=\"keep-right\" ng-click=\"instanceViewerCtr.toggleExpand();\"></em>\n" +
    "    </div>\n" +
    "    <ul class=\"custom-accordion sections\">\n" +
    "        <li ng-repeat=\"section in instanceViewerCtr.sections\" class=\"panel accordion-content\" ng-class=\"{'closed-section':!section.isOpen, 'single-section':instanceViewerCtr.sections.length === 1 && section.isOpen, 'double-section':instanceViewerCtr.sections.length === 2 && section.isOpen, 'multiple-section':instanceViewerCtr.sections.length > 2  && section.isOpen}\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                <h4 class=\"panel-title\" ng-click=\"instanceViewerCtr.toggleOpen(section)\">\n" +
    "                    <span class=\"panel-header-text\"><label class=\"display-name\" title=\"{{section.displayName}}\" ng-class=\"section.IsCompleted ? 'ellipsis-width' : 'full-width'\">{{section.displayName}}</label></span>\n" +
    "                    <span ng-if=\"section.IsCompleted\" class=\"keep-right\">\n" +
    "                        <em sit-mom-icon=\"{'path':'common/icons/cmdCheckmark16.svg','size':'16px'}\"></em>\n" +
    "                    </span>\n" +
    "                </h4>\n" +
    "            </div>\n" +
    "            <div class=\"panel-body\" ng-class=\"section.isOpen ? 'step-content-show' : 'step-content-hide'\">\n" +
    "                <ul class=\"custom-accordion\" ng-class=\"section.noOfSteps>1 ? 'with-pager' : 'without-pager'\">\n" +
    "                    <li ng-repeat=\"step in section.Steps | limitTo : 1 : (section.currentPage - 1) * 1\">\n" +
    "                        <span class=\"step-header\"><label class=\"display-name full-width\">{{step.displayName}}</label></span>\n" +
    "                        <div class=\"step-body\">\n" +
    "                            <div class=\"instructions-box\">\n" +
    "                                <div ng-bind-html=\"step.stepInstruction\" html-render-complete></div>\n" +
    "                                <div class=\"clearfix\"></div>\n" +
    "                            </div>\n" +
    "                            <div ng-if=\"step.Type === 'DataCollection'\">\n" +
    "                                <sit-property-grid sit-id=\"content_fields_form_{{section.NId}}_{{step.NId}}\"\n" +
    "                                                   sit-layout=\"Vertical\"\n" +
    "                                                   sit-type=\"Fluid\"\n" +
    "                                                   sit-mode=\"edit\">\n" +
    "                                    <div ng-repeat=\"item in step.DataCollectionItems\">\n" +
    "                                        <div class=\"data-collection-item-caption property-label-ellipsis\">\n" +
    "                                            <span class=\"data-collection-item-bold\" title=\"{{item.formData.Caption}}\">{{item.formData.Caption}}</span>\n" +
    "                                        </div>\n" +
    "                                        <div ng-switch=\"item.UIControl\" ng-class=\"(item.AcquisitionBehavior === instanceViewerCtr.semiAuto) ? 'acquisition-behavior-field' : ''\">\n" +
    "                                            <div ng-switch-when=\"Text\" class=\"data-collection-item\">\n" +
    "                                                <sit-property sit-widget=\"sit-text\"\n" +
    "                                                              sit-value=\"item.formData.value\"\n" +
    "                                                              sit-validation=\"item.formData.Validation\"\n" +
    "                                                              sit-placeholder=\"item.formData.Placeholder\"\n" +
    "                                                              ng-disabled=\"step.isDisabled || item.IsReadOnly || step.IsCompleted || step.IsSignaturePending\"\n" +
    "                                                              ng-blur=\"instanceViewerCtr.saveStepItem(item)\">{{item.formData.Label}}:</sit-property>\n" +
    "                                            </div>\n" +
    "                                            <div ng-switch-when=\"Number\" class=\"data-collection-item\">\n" +
    "                                                <div ng-class=\"item.formData.Uom ? 'number-box-row-flex' : 'number-box-column-flex'\">\n" +
    "                                                    <div ng-class=\"item.formData.Uom ? 'number-box-width':'number-box-full-width'\">\n" +
    "                                                        <sit-property sit-widget=\"sit-numeric\"\n" +
    "                                                                      sit-value=\"item.formData.value\"\n" +
    "                                                                      sit-validation=\"item.formData.Validation\"\n" +
    "                                                                      ng-disabled=\"step.isDisabled || item.IsReadOnly || step.IsCompleted || step.IsSignaturePending\"\n" +
    "                                                                      ng-blur=\"instanceViewerCtr.saveStepItem(item)\">{{item.formData.Label}}:</sit-property>\n" +
    "                                                    </div>\n" +
    "                                                    <div ng-if=\"item.formData.Uom !== ''\" class=\"data-collection-item-uom\">\n" +
    "                                                        <span>{{item.formData.Uom}}</span>\n" +
    "                                                    </div>\n" +
    "                                                </div>\n" +
    "                                                <div class=\"number-box-row-flex\">\n" +
    "                                                    <div ng-if=\"item.formData.IsLowLimitVisible\">\n" +
    "                                                        {{'instanceViewer.dataCollection.lowLimit' | translate}}: {{item.formData.lowLimit}}\n" +
    "                                                    </div>\n" +
    "\n" +
    "                                                    <div ng-class=\"{'space-limit':item.formData.IsLowLimitVisible}\" ng-if=\"item.formData.IsHighLimitVisible\">\n" +
    "                                                        {{'instanceViewer.dataCollection.highLimit' | translate}}: {{item.formData.highLimit}}\n" +
    "                                                    </div>\n" +
    "                                                    <div ng-class=\"{'space-limit':item.formData.IsLowLimitVisible || item.formData.IsHighLimitVisible}\" ng-if=\"item.formData.IsTargetVisible\">\n" +
    "                                                        {{'instanceViewer.dataCollection.target' | translate}}: {{item.formData.Target}}\n" +
    "                                                    </div>\n" +
    "                                                </div>\n" +
    "                                                <div ng-if=\"item.formData.validationMessage\">\n" +
    "                                                    <em class=\"fa fa-warning number-warning-message\"></em>\n" +
    "                                                    <span>{{item.formData.validationMessage}}</span>\n" +
    "                                                </div>\n" +
    "                                            </div>\n" +
    "                                            <div ng-switch-when=\"Multiline\" class=\"data-collection-item text-area-no-resize\" ng-class=\"{'text-area-large':item.formData.Size === 'large','text-area-medium' :item.formData.Size === 'medium'}\">\n" +
    "                                                <sit-property sit-widget=\"sit-textarea\"\n" +
    "                                                              sit-value=\"item.formData.value\"\n" +
    "                                                              sit-placeholder=\"item.formData.Placeholder\"\n" +
    "                                                              sit-validation=\"item.formData.Validation\"\n" +
    "                                                              ng-disabled=\"step.isDisabled || item.IsReadOnly || step.IsCompleted || step.IsSignaturePending\"\n" +
    "                                                              ng-blur=\"instanceViewerCtr.saveStepItem(item)\">{{item.formData.Label}}:</sit-property>\n" +
    "                                            </div>\n" +
    "                                            <div ng-switch-when=\"Checkbox\" class=\"data-collection-item\">\n" +
    "                                                <sit-property sit-widget=\"sit-tristate-checkbox\"\n" +
    "                                                              sit-value=\"item.formData.value\"\n" +
    "                                                              sit-validation=\"item.formData.Validation\"\n" +
    "                                                              ng-disabled=\"step.isDisabled || item.IsReadOnly || step.IsCompleted || step.IsSignaturePending\"\n" +
    "                                                              ng-blur=\"instanceViewerCtr.saveStepItem(item)\">{{item.formData.Label}}:</sit-property>\n" +
    "                                                <div ng-if=\"item.formData.IsTargetVisible\">\n" +
    "                                                    {{'instanceViewer.dataCollection.target' | translate}}: {{item.formData.Target}}\n" +
    "                                                </div>\n" +
    "                                                <div ng-if=\"item.formData.validationMessage\">\n" +
    "                                                    <em class=\"fa fa-warning number-warning-message\"></em>\n" +
    "                                                    <span>{{item.formData.validationMessage}}</span>\n" +
    "                                                </div>\n" +
    "                                            </div>\n" +
    "                                            <div ng-switch-when=\"Dropdown\" class=\"data-collection-item\">\n" +
    "                                                <sit-property sit-widget=\"sit-select\"\n" +
    "                                                              sit-value=\"item.formData.value\"\n" +
    "                                                              sit-validation=\"{required:item.IsRequired}\"\n" +
    "                                                              ng-disabled=\"step.isDisabled || item.IsReadOnly || step.IsCompleted || step.IsSignaturePending\"\n" +
    "                                                              sit-options=\"item.formData.options\"\n" +
    "                                                              sit-to-display=\"'label'\"\n" +
    "                                                              sit-to-keep=\"'value'\"\n" +
    "                                                              ng-blur=\"instanceViewerCtr.saveStepItem(item)\">{{item.formData.Label}}:</sit-property>\n" +
    "                                            </div>\n" +
    "                                            <div ng-switch-when=\"MultipleChoice\" class=\"data-collection-item\">\n" +
    "                                                <sit-property sit-widget=\"sit-radio\"\n" +
    "                                                              sit-value=\"item.formData.value\"\n" +
    "                                                              sit-validation=\"item.formData.Validation\"\n" +
    "                                                              ng-disabled=\"step.isDisabled || item.IsReadOnly || step.IsCompleted || step.IsSignaturePending\"\n" +
    "                                                              sit-options=\"item.formData.options\"\n" +
    "                                                              ng-blur=\"instanceViewerCtr.saveStepItem(item)\">{{item.formData.Label}}:</sit-property>\n" +
    "                                                <div ng-if=\"item.formData.IsTargetVisible\">\n" +
    "                                                    {{'instanceViewer.dataCollection.target' | translate}}: {{item.formData.Target}}\n" +
    "                                                </div>\n" +
    "                                                <div ng-if=\"item.formData.validationMessage\">\n" +
    "                                                    <em class=\"fa fa-warning number-warning-message\"></em>\n" +
    "                                                    <span>{{item.formData.validationMessage}}</span>\n" +
    "                                                </div>\n" +
    "                                            </div>\n" +
    "                                            <div ng-switch-when=\"Datetime\" class=\"data-collection-item\">\n" +
    "                                                <sit-property sit-widget=\"sit-date-time-picker\"\n" +
    "                                                              sit-value=\"item.formData.value\"\n" +
    "                                                              sit-format=\"'MMM dd,yyyy hh:mm:ss a'\"\n" +
    "                                                              ng-disabled=\"step.isDisabled || item.IsReadOnly || step.IsCompleted || step.IsSignaturePending\"\n" +
    "                                                              sit-validation=\"item.formData.Validation\"\n" +
    "                                                              ng-blur=\"instanceViewerCtr.saveStepItem(item)\">{{item.formData.Label}}:</sit-property>\n" +
    "                                                <div class=\"number-box-row-flex\">\n" +
    "                                                    <div ng-if=\"item.formData.IsLowLimitVisible\">\n" +
    "                                                        {{'instanceViewer.dataCollection.lowLimit' | translate}}: {{item.formData.lowLimit| date:'MMM dd,yyyy hh:mm:ss a'}}\n" +
    "                                                    </div>\n" +
    "\n" +
    "                                                    <div ng-class=\"{'space-limit':item.formData.IsLowLimitVisible}\" ng-if=\"item.formData.IsHighLimitVisible\">\n" +
    "                                                        {{'instanceViewer.dataCollection.highLimit' | translate}}: {{item.formData.highLimit| date:'MMM dd,yyyy hh:mm:ss a'}}\n" +
    "                                                    </div>\n" +
    "                                                    <div ng-class=\"{'space-limit':item.formData.IsLowLimitVisible || item.formData.IsHighLimitVisible}\" ng-if=\"item.formData.IsTargetVisible\">\n" +
    "                                                        {{'instanceViewer.dataCollection.target' | translate}}: {{item.formData.Target| date:'MMM dd,yyyy hh:mm:ss a'}}\n" +
    "                                                    </div>\n" +
    "                                                </div>\n" +
    "                                                <div ng-if=\"item.formData.validationMessage\">\n" +
    "                                                    <em class=\"fa fa-warning number-warning-message\"></em>\n" +
    "                                                    <span>{{item.formData.validationMessage}}</span>\n" +
    "                                                </div>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </sit-property-grid>\n" +
    "                            </div>\n" +
    "                            <div class=\"confirm-button-container\">\n" +
    "                                <button ng-if=\"step.IsCompleted && instanceViewerCtr.isReEditEnabled\" class=\"acknowledge-button float-left\" ng-click=\"instanceViewerCtr.reEditStep(step.Id)\">{{'instanceViewer.reEdit.button' | translate}}</button>\n" +
    "                                <div ng-if=\"step.IsSignButtonVisible\" \n" +
    "                                     ng-class=\"((!step.isDisabled || step.IsCompleted) && (step.IsSignaturePending || (step.ScenarioInstanceId != null)))  ? 'button-enable' : 'button-disable'\" class=\"rt-sign-button-container float-left wi-es-sign-button\">\n" +
    "                                    <sit-rt-signatures sit-scenario-instance=\"step.ScenarioInstance\"></sit-rt-signatures>\n" +
    "                                </div>\n" +
    "                                <div class=\"confirm-button-type\" ng-if=\"step.Type === 'Acknowledge'\">\n" +
    "                                    <label ng-if=\"step.IsCompleted || step.IsSignaturePending\">{{'instanceViewer.acknowledge.text' | translate: { CompletedBy:step.CompletedBy, AcknowledgeOn: (step.AcknowledgeOn | date:'medium') } }}</label>\n" +
    "                                    <button ng-if=\"!(step.IsCompleted || step.IsSignaturePending)\" class=\"acknowledge-button\" ng-disabled=\"step.isDisabled\" ng-click=\"instanceViewerCtr.acknowledge(step)\">{{'instanceViewer.acknowledge.button' | translate}}</button>\n" +
    "                                </div>\n" +
    "                                <div class=\"confirm-button-type\" ng-if=\"step.Type === 'DataCollection'\">\n" +
    "                                    <label ng-if=\"step.IsCompleted || step.IsSignaturePending\">{{'instanceViewer.dataCollection.text' | translate: { CompletedBy:step.CompletedBy, AcknowledgeOn: (step.AcknowledgeOn | date:'medium') } }} <label ng-if=\"(step.IsCompleted || step.IsSignaturePending) && step.IsOutOfSpecValues\"> {{'instanceViewer.dataCollection.outOfSpecMessage'|translate}}</label></label>\n" +
    "                                    <button ng-if=\"!(step.IsCompleted || step.IsSignaturePending)\" class=\"acknowledge-button\" ng-disabled=\"step.isDisabled || !step.validInputs\" ng-click=\"instanceViewerCtr.confirmDataCollectionStep(step)\">{{'instanceViewer.dataCollection.button' | translate}}</button>\n" +
    "                                </div>\n" +
    "                                <div class=\"confirm-button-type\" ng-if=\"instanceViewerCtr.hasAcquireStep(step)\">\n" +
    "                                    <button ng-if=\"!(step.IsCompleted || step.IsSignaturePending)\" class=\"pl-button-dialog defaultBtnBorder\"\n" +
    "                                            ng-disabled=\"step.isDisabled || !step.validInputs\" ng-click=\"instanceViewerCtr.acquireDataCollectionStep(step)\">\n" +
    "                                        {{'instanceViewer.acquire.button' | translate}}\n" +
    "                                    </button>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                <ul uib-pagination items-per-page=\"1\" total-items=\"section.noOfSteps\" ng-model=\"section.currentPage\" boundary-links=\"true\" max-size=\"10\" ng-if=\"section.noOfSteps>1\" class=\"pager\"></ul>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>");
}]);

angular.module("common/blueprints/executeCommandTemplate/execute-commandTemplate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/blueprints/executeCommandTemplate/execute-commandTemplate.html",
    "<sit-side-panel sit-title=\"{{vm.sidepanelConfig.title}}\"\n" +
    "                sit-messages=\"vm.sidepanelConfig.messages\"\n" +
    "                sit-actions=\"vm.sidepanelConfig.actionButtons\"\n" +
    "                sit-close=\"vm.sidepanelConfig.closeButton\">\n" +
    "\n" +
    "    <div style=\"width:100%;height:100%\" ng-if=\"vm.renderComplete\">\n" +
    "\n" +
    "        <sit-property-grid sit-id=\"itemPropertyGrid\"\n" +
    "                           sit-layout=\"Vertical\"\n" +
    "                           sit-type=\"Fluid\"\n" +
    "                           sit-columns=\"1\"\n" +
    "                           sit-mode=\"edit\"\n" +
    "                           sit-form=\"vm.forms\">\n" +
    "            <div ng-repeat=\"obj in vm.displayData\">\n" +
    "                <sit-property-group ng-if=\"obj.container === 'g'\"\n" +
    "                                    sit-id=\"{{obj.groupDetails.id}}\"\n" +
    "                                    sit-name=\"obj.groupDetails.heading\"\n" +
    "                                    sit-collapsible=\"obj.groupDetails.collapsible\">\n" +
    "                    <sit-property ng-repeat=\"prop in obj.fields track by prop.id\"\n" +
    "                                  sit-id=\"{{prop.name}}\"\n" +
    "                                  sit-widget=\"{{prop.widget}}\"\n" +
    "                                  sit-change=\"vm.DigestEval\"\n" +
    "                                  ng-disabled=\"prop.readOnly || vm.ngDisableItem[prop.name].value\"\n" +
    "                                  sit-widget-attributes=\"prop.widgetAttributes\"\n" +
    "                                  sit-value=\"vm.currentItem[prop.name]\"\n" +
    "                                  sit-validation=\"vm.allValidations[prop.name]\">\n" +
    "                        {{prop.label}}:\n" +
    "                    </sit-property>\n" +
    "                </sit-property-group>\n" +
    "                <sit-property ng-if=\"obj.container === 'f'\"\n" +
    "                              sit-id=\"{{obj.name}}\"\n" +
    "                              sit-widget=\"{{obj.widget}}\"\n" +
    "                              sit-change=\"vm.DigestEval\"\n" +
    "                              ng-disabled=\"obj.readOnly || vm.ngDisableItem[obj.name].value\"\n" +
    "                              sit-widget-attributes=\"obj.widgetAttributes\"\n" +
    "                              sit-value=\"vm.currentItem[obj.name]\"\n" +
    "                              sit-validation=\"vm.allValidations[obj.name]\">\n" +
    "                    {{obj.label}}:\n" +
    "                </sit-property>\n" +
    "            </div>\n" +
    "        </sit-property-grid>\n" +
    "    </div>\n" +
    "</sit-side-panel>");
}]);

angular.module("common/blueprints/executeCommandTemplate/mdGridCommandTemplate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/blueprints/executeCommandTemplate/mdGridCommandTemplate.html",
    "<div id=\"data-cell-container\" class=\"ngCellText md-command-column-cell\">\n" +
    "    <div ng-class=\"'md-command-column-text'\">{{vm.row.getProperty(vm.fieldName)}}</div>\n" +
    "    <img alt=\"Command\" title=\"{{vm.tooltip}}\" ng-if=\"vm.isVisible && vm.isSvg\" ng-src=\"{{vm.svgIcon}}\" class=\"md-command-column-icon\" ng-click=\"vm.onCommandClick()\" />\n" +
    "    <em  title=\"{{vm.tooltip}}\" ng-if=\"vm.isVisible && !vm.isSvg\" class=\"fa {{vm.faIcon}} md-command-column-fa-icon\" ng-click=\"vm.onCommandClick()\" />\n" +
    "</div>");
}]);

angular.module("common/blueprints/masterDetailsTemplate/masterDetailsLayoutTemplate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/blueprints/masterDetailsTemplate/masterDetailsLayoutTemplate.html",
    "<div class=\"content-area content-area-relative\" style=\"height:100% !important\" id=\"masterDetailsLayout\" ng-if=\"vm.isInitComplete\">\n" +
    "    <h2>{{vm.screenTitle}}</h2>\n" +
    "    <div id=\"masterList\" style=\"height:100%\">\n" +
    "            <sit-command-bar sit-vertical-autofixed =\"true\" sit-commands=\"vm.newObj.actions\" sit-layout=\"vertical\"></sit-command-bar>\n" +
    "        <div style=\"display:inline-block;vertical-align:top; height:99%\">\n" +
    "            <sit-item-collection-viewer sit-data=\"vm.newObj.master.runtimeData\" sit-options=\"vm.newObj.master.runtimeConf\"></sit-item-collection-viewer>\n" +
    "        </div>\n" +
    "        <div class=\"mdui-details\"\n" +
    "             ng-class=\"{noDrillDownPadding:!vm.isDrillDownState}\">\n" +
    "            <div class=\"mdui-breadcrumb\" ng-if=\"vm.isDrillDownState\"> <sit-mdui-breadcrumb sit-options=\"vm.breadcrumbOptions\"></sit-mdui-breadcrumb></div>\n" +
    "            <tabset ng-class=\"{'drill-down-tab':vm.isDrillDownState === true }\">\n" +
    "                <tab ng-repeat=\"detail in vm.newObj.details\" index=\"{{$index}}\" heading=\"{{detail.title || detail.id | translate}}\" select=\"vm.setActiveTabIndex(detail.id)\" active=\"detail.isActive\" disabled=\"detail.isDisabled\">\n" +
    "                    <div id=\"detailList\" ng-if=\"detail.multiplicity === 'many' && detail.id === vm.activeContentId\" style=\"height:100%\">\n" +
    "                        <sit-item-collection-viewer sit-data=\"detail.runtimeData\" sit-options=\"detail.runtimeConf\"></sit-item-collection-viewer>\n" +
    "                    </div>\n" +
    "                    <div style=\"overflow-x:auto;overflow-y:auto;height:100%\" ng-if=\"detail.multiplicity === 'one' && vm.ready && vm.propertiesLoaded\">\n" +
    "                        <sit-property-grid sit-id=\"itemPropertyGrid1\"\n" +
    "                                           sit-layout=\"Horizontal\"\n" +
    "                                           sit-type=\"{{detail.runtimeConf.type}}\"\n" +
    "                                           sit-columns=\"detail.runtimeConf.columns\"\n" +
    "                                           sit-mode=\"{{detail.runtimeConf.mode}}\"\n" +
    "                                           sit-data=\"detail.runtimeConf.data\"\n" +
    "                                           sit-groups=\"vm.groupDetails\"\n" +
    "                                           sit-show-groups=\"detail.runtimeConf.showGroups\">\n" +
    "                        </sit-property-grid>\n" +
    "                    </div>\n" +
    "                    <div style=\"height:100%\" ng-if=\"detail.multiplicity === 'auditTrail' && detail.runtimeConf.filter.EntityId !==''\">\n" +
    "                        <sit-at-viewer sit-filter=\"detail.runtimeConf.filter\"\n" +
    "                                       sit-start-empty=\"detail.runtimeConf.startEmpty\"\n" +
    "                                       sit-config=\"detail.runtimeConf.config\">\n" +
    "                        </sit-at-viewer>\n" +
    "                    </div>\n" +
    "                    <div style=\"overflow-x:auto;overflow-y:auto;height:100%\" ng-if=\"detail.multiplicity === 'custom'\">\n" +
    "                        <div init=\"{{activeContent = vm.activeContentId}}\" ng-include=\"detail.templatePath\"></div>\n" +
    "                    </div>\n" +
    "                </tab>\n" +
    "            </tabset>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("common/blueprints/overviewTemplate/overviewTemplate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/blueprints/overviewTemplate/overviewTemplate.html",
    "<sit-side-panel sit-title=\"{{vm.sidepanelConfig.title}}\"\n" +
    "                sit-messages=\"vm.sidepanelConfig.messages\"\n" +
    "                sit-actions=\"vm.sidepanelConfig.actionButtons\"\n" +
    "                sit-close=\"vm.sidepanelConfig.closeButton\">\n" +
    "\n" +
    "    <sit-property-grid sit-id=\"itemPropertyGrid\"\n" +
    "                       sit-layout=\"Vertical\"\n" +
    "                       sit-type=\"Fluid\"\n" +
    "                       sit-columns=\"1\"\n" +
    "                       sit-mode=\"list\">\n" +
    "        <div ng-repeat=\"obj in vm.displayData\">\n" +
    "            <sit-property-group ng-if=\"obj.container === 'g'\"\n" +
    "                                sit-id=\"{{obj.groupDetails.id}}\"\n" +
    "                                sit-name=\"obj.groupDetails.heading\"\n" +
    "                                sit-collapsible=\"obj.groupDetails.collapsible\">\n" +
    "                <sit-property ng-repeat=\"prop in obj.fields\"\n" +
    "                              sit-id=\"{{prop.name}}\"\n" +
    "                              sit-widget=\"{{prop.widget}}\"\n" +
    "                              ng-disabled=\"true\"\n" +
    "                              sit-widget-attributes=\"prop.widgetAttributes\"\n" +
    "                              sit-value=\"vm.currentItem[prop.name]\">\n" +
    "                    {{prop.label}}:\n" +
    "                </sit-property>\n" +
    "            </sit-property-group>\n" +
    "            <sit-property-group ng-if=\"obj.container === 'f'\"\n" +
    "                                 sit-show-accordion=\"false\">\n" +
    "                <sit-property ng-repeat=\"prop in obj.fields\"\n" +
    "                              sit-id=\"{{prop.name}}\"\n" +
    "                              sit-widget=\"{{prop.widget}}\"\n" +
    "                              ng-disabled=\"true\"\n" +
    "                              sit-widget-attributes=\"prop.widgetAttributes\"\n" +
    "                              sit-value=\"vm.currentItem[prop.name]\">\n" +
    "                    {{prop.label}}:\n" +
    "                </sit-property>\n" +
    "        </div>\n" +
    "\n" +
    "    </sit-property-grid>\n" +
    "</sit-side-panel>");
}]);

angular.module("common/blueprints/singleEntityTemplate/singleEntityLayoutTemplate.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("common/blueprints/singleEntityTemplate/singleEntityLayoutTemplate.html",
    "<div class=\"content-area content-area-relative\" style=\"height:100% !important\" id=\"singleEntityLayout\" ng-if=\"vm.isInitComplete\">\n" +
    "    <h2>{{vm.screenTitle}}</h2>\n" +
    "    <div ng-if=\"vm.isDrillDownState\" class=\"mdui-breadcrumb mduiBreadcrumbPadding\"> <sit-mdui-breadcrumb sit-options=\"vm.breadcrumbOptions\"></sit-mdui-breadcrumb></div>\n" +
    "        <sit-command-bar sit-vertical-autofixed =\"true\" sit-commands=\"vm.newObj.actions\" sit-layout=\"vertical\"></sit-command-bar>\n" +
    "    <div id=\"masterList\" class=\"mduiSingleEntity\"\n" +
    "         ng-style=\"{'height': (vm.isDrillDownState != true) ? 'calc(100% - 16px)': 'calc(100% - 61px)'}\">\n" +
    "        <sit-item-collection-viewer sit-data=\"vm.newObj.master.runtimeData\" sit-options=\"vm.newObj.master.runtimeConf\"></sit-item-collection-viewer>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
