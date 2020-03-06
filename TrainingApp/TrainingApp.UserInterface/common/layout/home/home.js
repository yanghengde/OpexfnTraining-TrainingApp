/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */
(function () {
    'use strict';

    var myapp = angular.module('siemens.simaticit.common.services.layout');
    /*Layout Controller*/
    var layoutCtrlName = 'homeController';

    myapp.controller(layoutCtrlName, ['$scope', '$state', 'CONFIG', 'APPCONFIG', layoutController]);

    function layoutController($scope, $state, CONFIG, APPCONFIG) {
        var lc = this;

        var config = angular.extend({}, APPCONFIG, CONFIG);
        //this is the key used to retrieve the document tile selected
        var docTileSelected = null;

        //example of "enum" to map tile types used inside the control
        var tileType = {
            document: 0,
            route: 1
        };


        var areas = getAreas();

        //----------------------------------------------------------------------------------------------------------
        // Example of layout management, these objects can be placed in a layout service
        var docLayout = {
            color: 'black',
            bgColor: '#FFD9E1',
            colorSelected: '#647887',
            bgColorSelected: 'blue',
            size: 'auto',
            imageTemplate: '<span class="sit-stack">' +
                                '<i class="sit sit-doc-center"></i>' +
                                '<i class="fa fa-question-circle sit-bottom-right sit-bkg-circle"></i>' +
                            '</span>'
        };
        var actionLayout = {
            color: 'black',
            bgColor: '#FFD9E1',
            colorSelected: '#647887',
            bgColorSelected: 'blue',
            size: 'auto',
            imageTemplate: '<span class="sit-stack">' +
                                '<i class="sit sit-application"></i>'+
                                '<i class="fa fa-info-circle sit-bottom-right sit-bkg-circle"></i>'+
                            '</span>'
        };
        //----------------------------------------------------------------------------------------------------------

        lc.areas = [];
        for (var i = 0; i < areas.length; i++) {
            lc.areas.push(angular.extend({}, areas[i], actionLayout, { tileType: tileType.route }));
        }

        lc.documents = [];
        if (config && config.documentationCenterUrl) {
            var documents = getDocuments(config);
            for (var j = 0; j < documents.length; j++) {
                lc.documents.push(angular.extend({}, documents[j], docLayout, { tileType: tileType.document }));
            }
        }

        $scope.$on('sit-tile.clicked', function (event, tileContent) {
            switch (tileContent.tileType) {
                case tileType.document: {
                    window.open(tileContent.link, '_blank');
                    //if you want that the tile mantains selection use this code
                    if (docTileSelected === tileContent) {
                        docTileSelected.selected = false;
                        docTileSelected = null;
                        return;
                    }

                    if (docTileSelected !== null) {
                        docTileSelected.selected = false;
                    }
                    docTileSelected = tileContent;
                    docTileSelected.selected = true;

                    break;
                }

                case tileType.route: {
                    //nothing to do at the moment
                    $state.go('home.settings');
                    break;
                }
                default: break;
            }
        });
    }
})();



//--------------------------------------------------------------------------------------------------

// Examples of data

function getDocuments(config) {
    'use strict';
    return [{
        title: 'Documentation Center',
        description: 'Click here to go to the documentation center',
        properties: [{ name: 'Property one', value: 'This is the first property' }, { name: 'Property two', value: 'This is the second property' }],
        link: config.documentationCenterUrl
    }];
}

function getAreas() {
    'use strict';
    return [{
        title: 'Examples',
        image: 'fa-cogs'
        //stateTransition: { to: 'home.settings' }
        //properties: [{ name: 'one', value: 'one' }, { name: 'two', value: 'two' }],
    }
    ];
}

//--------------------------------------------------------------------------------------------------