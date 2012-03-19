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
    list:function(folderId){

        var files = new Macros.store.filesStore();

        files.load();


        var view = Ext.widget('filelist', {Model:files});

        view.show();
        var tabPanel = Ext.getCmp('maintabs');
        tabPanel.add(view).setActive(true);

        tabPanel.doLayout();

    }

});

