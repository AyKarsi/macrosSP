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
        view.store.loadById(folderId);
        if (title)
            view.title = title;

        view.show();

        var tabPanel = Ext.getCmp('maintabs');
        tabPanel.add(view);
        tabPanel.setActiveTab(view);
        //tabPanel.doLayout();


    }

});

