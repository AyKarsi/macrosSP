Ext.define('Macros.controller.folder', {
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
            'foldertree': {
                itemdblclick: this.editUser
            }
        });
    },
    editUser: function(grid, record) {
        alert("click");
        //var view = Ext.widget('useredit');

        //view.down('form').loadRecord(record);
    }
});

