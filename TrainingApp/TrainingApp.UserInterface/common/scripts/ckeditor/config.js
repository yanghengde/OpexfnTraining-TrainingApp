/* SIMATIC IT Unified Architecture Foundation V3.1 | Copyright (C) Siemens AG 2019. All Rights Reserved. */

CKEDITOR.editorConfig = function (config) {
    config.format_tags = 'p;h1;h2;h3;h4;h5;h6;div';
    config.dialog_noConfirmCancel = true;
};

CKEDITOR.on('dialogDefinition', function (ev) {
    var dialogName = ev.data.name;
    var dialogDefinition = ev.data.definition;
    dialogDefinition.resizable = CKEDITOR.DIALOG_RESIZE_NONE;

    if (dialogName === 'link') {
        var infoTab = dialogDefinition.getContents('info');
        infoTab.get('linkType').hidden = true;
        infoTab.remove('protocol');
    }

    if (dialogName === 'table') {
        var infoDialogTab = dialogDefinition.getContents('info');
        infoDialogTab.get('txtCellSpace').default = '0';
        infoDialogTab.get('txtCellPad').default = '0';
    }

    if (dialogName === 'placeholder') {
        var input = dialogDefinition.getContents('info').get('name');
        input.type = 'select';
        input.items = ev.editor.data && ev.editor.data.parameters ? ev.editor.data.parameters : [];
        dialogDefinition.contents[0].elements[0].label = "Parameter name";
        ev.editor.widgets.registered.placeholder.draggable = false;

        input.onChange = function (item) {
            if (!item.data.value) {
                $('.cke_dialog_ui_button_ok').addClass('disable-ok-button');
            } else {
                $('.cke_dialog_ui_button_ok').removeClass('disable-ok-button');
            }
        };

        $(document).ready(function () {
            $('.cke_dialog_ui_button_ok').addClass('disable-ok-button');
        });




    }
});
