Ext.define('Macros.controller.folderController', {
    extend: 'Ext.app.Controller',

    views: [
        'folder.tree'
    ],
    stores: [
        'foldertreeStore'
    ],
    models: [
        'foldertreeModel'
    ],
    init: function() {

        this.control({
            'foldertree':
            {
                itemclick: this.getFolderFiles
            }
        });
    },
    getFolderFiles: function(grid, record) {


        var fc = this.application.getController('fileController');
        fc.getFolderFiles(record.data.id, record.data.text);

    }
});

