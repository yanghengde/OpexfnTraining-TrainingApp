/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';
    /**
  * @ngdoc module
  * @name siemens.simaticit.common.widgets.fileUpload
  * @description This module provides functionalities to select files and upload or remove uploaded files.
  */
    angular.module('siemens.simaticit.common.widgets.fileUpload', []);

})();

(function () {
    'use strict';

    /**
    * @ngdoc directive
    * @name sitFileUploader
    * @module siemens.simaticit.common.widgets.fileUpload
    * @description
    * The **File uploader** widget allows the user to select a file, read the contents and store it in an object exposing:
    * * the name of the file
    * * the contents (base64-encoded) of the file
    * * the content type of the file.
    *
    * @usage
    * As an element:
    * ```
    *     <sit-file-uploader sit-value="vm.currentItem"
                       accept="'image/*,video/*,audio/*,application/x-zip-compressed'"
                       sit-min-size="'1KB'"
                       sit-max-size="'10MB'"
                       sit-validation="{required: true}">
            File 1
         </sit-file-uploader>
    * ```
    * @restrict E
    *
    * @param {Object} sit-value Object to which the uploaded file's data will be stored.
    * @param {String} [accept="'image/*,video/*,audio/*,application/x-zip-compressed'"] List of comma separated values representing MIME types.
    * @param {String} sit-min-size Minimum size of the file.
    * @param {Number} sit-max-size Maximum file size allowed. It can support upto 50MB.
    * @param {boolean} sit-read-as-text _(Optional)_ If true specifies, that the file must be read as text.
    * @param {ValidationModel} sit-validation See {@link ValidationModel}.
    * @param {string} [sit-change] _(Optional)_ An expression to evaluate on change of value.
    * @param {string} [ng-disabled] _(Optional)_ If this expression is truthy, the element will be disabled.
    * @param {string} [ng-readonly] _(Optional)_ If this expression is truthy, the element will be set as read-only.
    *
    * @example
	* In a view template, the **sit-file-uploader** directive is used as follows:
	*
	* ```
	*  <sit-file-uploader sit-value="vm.currentItem"
                       accept="'image/*,video/*,audio/*,application/x-zip-compressed'"
                       sit-min-size="'1KB'"
                       sit-max-size="'10MB'"
                       sit-validation="{required: true}">
            File 1
         </sit-file-uploader>
    * ```
    * Note that:
    *
    *   * If the name of the selected file is too long, then the file name is ellipsed and the complete file name is shown in the tooltip.
    *   * However the text length in the tooltip is restricted to around 80 characters, depending upon the browser.
    *
    */
    angular.module('siemens.simaticit.common.widgets.fileUpload').directive('sitFileUploader', ['$rootScope', '$window', '$translate', FileUploader]);
    function FileUploader($rootScope, $window, $translate) {
        return {
            restrict: 'E',
            replace: false,
            scope: {},
            transclude: true,
            controller: FileUploaderController,
            controllerAs: 'uploadCtrl',
            bindToController: {
                readOnly: '=sitReadOnly',
                value: '=sitValue',
                accept: '=?accept',
                minSize: '=?sitMinSize',
                maxSize: '=?sitMaxSize',
                readAsText: '=?sitReadAsText',
                validation: '=sitValidation',
                sitChange: '=?',
                ngDisabled: '=?',
                ngReadonly: '=?'
            },
            templateUrl: 'common/widgets/fileUpload/file-upload.html',
            link: {
                post: function postLink(scope, element, attrs, ctrl) {
                    ctrl.uploadedFile = {};
                    ctrl.reader = new $window.FileReader();
                    var minFileSize = "0KB";
                    var maxFileSize = "50MB";
                    var defaultMaxSizeInBytes = getSizeInBytes(maxFileSize);

                    ctrl.domElement = {
                        inputButton: $('input[data-internal-type="fileInput"]', element)[0],
                        uploadButton: $('a[data-internal-type="uploadButton"]', element)[0],
                        showStatus: $('input[data-internal-type="fileStatus"]', element)[0]
                    };
                    ctrl.domElement.uploadButton.addEventListener("click", onUploadButtonClick);

                    function onUploadButtonClick() {
                        ctrl.domElement.inputButton.click();
                    }

                    function initValidation() {
                        ctrl.isError = false;
                        ctrl.isValidType = false;
                        ctrl.isValidSize = false;
                        ctrl.isFileLoaded = false;
                    }

                    ctrl.domElement.inputButton.onchange = function () {
                        if (ctrl.domElement.inputButton) {
                            ctrl.fileUploadHandler(ctrl.domElement.inputButton.files[0])
                        }
                    }
                    ctrl.fileUploadHandler = function (fileObj) {
                        !ctrl.uploadedFile && (ctrl.uploadedFile = {});
                        if (undefined !== fileObj && null !== fileObj) {
                            initValidation();
                            ctrl.selectedFile = fileObj;
                            if (ctrl.accept) {
                                ctrl.isValidType = isValidFileType();
                            }
                            else {
                                ctrl.isValidType = true;
                            }

                            ctrl.isValidSize = isFileSizeValid();


                            if (ctrl.isValidSize && ctrl.isValidType) {
                                (ctrl.readAsText) ? (ctrl.reader.readAsText(ctrl.selectedFile)) : (ctrl.reader.readAsDataURL(ctrl.selectedFile));
                                ctrl.uploadedFile = { name: fileObj.name };
                                scope.$apply();
                            }
                            else {
                                ctrl.isError = true;
                                if (!ctrl.isValidType) {
                                    ctrl.selectedFile = { name: $translate.instant('fileUploader.error.fileType') };
                                }
                                else if (!ctrl.isValidSize) {
                                    ctrl.selectedFile = { name: $translate.instant('fileUploader.error.fileSize') };
                                }
                                ctrl.uploadedFile = { name: '' };
                                $rootScope.$broadcast(ctrl.broadcastEvents.uploaderError);
                                scope.$apply();
                            }
                        }

                    }

                    function canUploadFile(currentFileType, selectedFileInfo) {
                        var canUpload = false;
                        // checking if there is no restriction on the submedia type ( eg : image/* should allow all image files like .png,.jpg etc)
                        var allSubMediaAllowed = (currentFileType.slice(-1) === '*');
                        if (allSubMediaAllowed) {
                            var currentMediaType = currentFileType.substring(0, currentFileType.lastIndexOf('/'))
                            // Incase of accept='image/*' and the selected file info from browser does not supply 'mediaType', we should ensure user can still upload the file.
                            if (selectedFileInfo.mediaType === currentMediaType || selectedFileInfo.mediaType === "") {
                                canUpload = true;
                            }
                        } else {
                            var subMediaMatched = currentFileType.slice(-selectedFileInfo.subMediaType.length) === selectedFileInfo.subMediaType;
                            var fileExtensionMatched;
                            if (!subMediaMatched) {
                                fileExtensionMatched = currentFileType.slice(-selectedFileInfo.fileNameExtension.length) === selectedFileInfo.fileNameExtension;
                            }
                            if (subMediaMatched || fileExtensionMatched) {
                                canUpload = true;
                            }
                        }
                        return canUpload;
                    }

                    function isValidFileType() {
                        var validFile = false;
                        var allowedMediaTypes = ctrl.accept.replace(/ +/g, "").toLowerCase().split(',');// to remove all white spaces and convert to lower case and split
                        var selectedFileType = ctrl.selectedFile.type;
                        var selectedFileName = ctrl.selectedFile.name;
                        var selectedFileInfo = {
                            subMediaType: selectedFileType.substring(selectedFileType.lastIndexOf("/") + 1),
                            mediaType: selectedFileType.substring(0, selectedFileType.lastIndexOf('/')),
                            fileNameExtension: selectedFileName.substring(selectedFileName.lastIndexOf(".") + 1)
                        }
                        for (var i = 0; i < allowedMediaTypes.length; i++) {
                            var currentFileType = "";
                            currentFileType = allowedMediaTypes[i];
                            validFile = canUploadFile(currentFileType, selectedFileInfo);
                            if (validFile) {
                                break;
                            }
                        }
                        return validFile;
                    }

                    function isFileSizeValid() {
                        if (ctrl.selectedFile.size > defaultMaxSizeInBytes) {
                            return false;
                        }

                        validateSizes();
                        var minSizeInBytes = getSizeInBytes(ctrl.minSize);
                        var maxSizeInBytes = getSizeInBytes(ctrl.maxSize);

                        return ctrl.selectedFile.size >= minSizeInBytes && ctrl.selectedFile.size <= maxSizeInBytes;
                    }

                    function validateSizes() {
                        var pattern = new RegExp("^[0-9]+[KMGT]B");
                        if ((undefined === ctrl.minSize) || (false === pattern.test(ctrl.minSize))) {
                            ctrl.logErrorFn("Minimum size specified is invalid - ", ctrl.minSize);
                            ctrl.minSize = minFileSize;
                        }

                        if (((undefined === ctrl.maxSize) || (false === pattern.test(ctrl.maxSize)))) {
                            ctrl.logErrorFn("Maximum size specified is invalid - ", ctrl.maxSize);
                            ctrl.maxSize = maxFileSize;
                        }
                    }

                    function getSizeInBytes(fileSize) {
                        var size, unit, actualSize;
                        var bytesPerKB = 1024;
                        size = parseInt(fileSize, 10);
                        unit = fileSize.slice(-2);
                        for (var i = 0; i < ctrl.fileSizes.length; i++) {
                            if (unit === ctrl.fileSizes[i]) {
                                actualSize = size * Math.pow(bytesPerKB, i + 1)
                            }
                        }
                        return actualSize;
                    }

                    ctrl.addEvents(ctrl.reader);

                    ctrl.removeFile = function (event) {
                        ctrl.uploadedFile = { name: '' };
                        $(event.target).parents('.uploadSection').find('.File').val('');
                        ctrl.value.name = '';
                        ctrl.value.type = '';
                        ctrl.value.contents = '';
                        ctrl.selectedFile = { name:  $translate.instant('fileUploader.noFile')};
                        ctrl.isFileLoaded = false;
                        ctrl.reader = new $window.FileReader();
                        ctrl.addEvents(ctrl.reader);
                        $(event.target).parents('.uploadSection').find('.showStatus').value = $translate.instant('fileUploader.noFile');
                        $rootScope.$broadcast('sit-file-uploader-file-removed');
                    }

                    scope.$on('$destroy', function () {
                        ctrl.domElement.uploadButton.removeEventListener("click", onUploadButtonClick);
                    });

                }
            }

        }
    }

    FileUploaderController.$inject = ['$rootScope', '$scope', 'common', '$translate'];
    function FileUploaderController($rootScope, scope, common, $translate) {
        var vm = this;
        vm.selectedFile = { name: $translate.instant('fileUploader.noFile') };
        vm.isFileLoaded = false;
        vm.isError = false;
        vm.currentPercentage = '';
        vm.broadcastEvents = {
            uploaderSuccess: 'sit-file-uploader-success',
            uploaderError: 'sit-file-uploader-error'
        };
        vm.fileSizes = ["KB", "MB", "GB"] // Contents of the array must be in the increasing order of their size
        vm.accept = vm.accept ? vm.accept : 'image/*,video/*,audio/*,application/x-zip-compressed';

        if (vm.validation) {
            !vm.validation.hasOwnProperty("required") && angular.extend(vm.validation, { required: false });
        } else {
            vm.validation = { required: false };
        }
        vm.openAction = {
            path: 'common/icons/homeFolderOpen24.svg'
        };
        vm.deleteAction = {
            path: 'common/icons/cmdTrash24.svg'
        };
        vm.addEvents = function (fileReader) {
            fileReader.onload = function () {
                vm.isFileLoaded = true;
                scope.$apply();
            }

            fileReader.onprogress = function (event) {
                if (event.lengthComputable) {
                    vm.currentPercentage = parseInt(((event.loaded * 100) / event.total), 10) + '%';
                    scope.$apply();
                }
            }

            fileReader.onloadend = vm.reader.onabort = function () {
                vm.currentPercentage = '';
                var payload = (vm.readAsText) ? (vm.reader.result) : (vm.reader.result.substr(vm.reader.result.lastIndexOf(',') + 1));
                if (!vm.value) {
                    vm.value = {
                        name: vm.selectedFile.name,
                        type: vm.selectedFile.type,
                        contents: payload
                    };
                } else {
                    vm.value.name = vm.selectedFile.name;
                    vm.value.type = vm.selectedFile.type;
                    vm.value.contents = payload;
                }
                scope.$apply();
                $rootScope.$broadcast(vm.broadcastEvents.uploaderSuccess);

            }

            fileReader.onerror = function () {
                vm.currentPercentage = '';
                vm.isError = true;
                vm.selectedFile = { name: $translate.instant('fileUploader.error.readError') };
                scope.$apply();
                $rootScope.$broadcast(vm.broadcastEvents.uploaderError);
            }
        }

        vm.logErrorFn = function (message, attributes) {
            common.logger.logError(message, attributes, 'siemens.simaticit.common.widgets.fileUpload');
        };
    }
})();
