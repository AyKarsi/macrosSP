Ext.define('Macros.controller.file', {
    extend: 'Ext.app.Controller',

    views: [
        'file.list'
    ],
    stores: [
        'filesStore'
    ],
    models: [
        'fileModel'
    ],
    init: function() {
        this.control({
            'list': {
                itemdblclick: this.editFile
            }
        });
    },
    editFile: function(grid, record) {
        alert("click");
        //var view = Ext.widget('useredit');

        //view.down('form').loadRecord(record);
    },
    list:function(folderId, title){


        var view = Ext.widget('filelist');
        view.store.load();
        if (title)
            view.title = title;

        view.show();

        var tabPanel = Ext.getCmp('maintabs');
        tabPanel.add(view);
        tabPanel.setActiveTab(view);
        //tabPanel.doLayout();


    }

});

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
                itemdblclick: this.editUser,
                itemclick: this.getFolderFiles
            }
        });
    },
    getFolderFiles: function(grid, record) {

        debugger;
        var fc = this.application.getController('file');
        fc.list(1, record.data.text);

        //var view = Ext.widget('useredit');

        //view.down('form').loadRecord(record);
    },
    editUser: function(grid, record) {
        alert("click");
        //var view = Ext.widget('useredit');

        //view.down('form').loadRecord(record);
    }
});

Ext.define('Macros.controller.user', {
    extend: 'Ext.app.Controller',

    views: [
        'user.list',
        'user.edit'
    ],
    stores: [
        'users'

    ],
    models: [
        'user'
    ],
    init: function() {
        this.control({
            'userlist': {
                itemdblclick: this.editUser
            }
        });
    },
    editUser: function(grid, record) {
        var view = Ext.widget('useredit');

        view.down('form').loadRecord(record);
    }
});
