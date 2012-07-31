Ext.define('Macros.controller.fileController', {
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
    currentFile: null,
    init: function() {
        this.control({
            'filelist': {
                itemdblclick: this.editFile,
                itemclick: function(grid, record){
                    this.currentFile = record;
                    var ribbon = this.application.getController('ribbonController');
                    ribbon.toggle('Ribbon.MacrosFile');
                }
            }
        });
    },
    editFile: function(grid, record) {
        alert("file click");
        //var view = Ext.widget('useredit');

        //view.down('form').loadRecord(record);
    },

    openFile: function(fileId){
        var fileid = this.currentFile.data.fileid;
        //var url = macrosExeServerUrl + "miidoccgi.exe?getfile&dokid="+fileId+"&arbeitsmittel=1";
        var url = macrosExeServerUrl + "ebcheckout.exe?getserverfile&fileid="+fileId+"&readonly=1"
        window.open(url,'Download');
    },
    getFolderFiles:function(folderId, title){

        var idKey= 'dmsfolder'+folderId;
        var tabPanel = Ext.getCmp('maintabs');
        var tabIndex = tabPanel.items.findIndex("key",idKey);
        var view;
        if (tabIndex >-1)
        {
            view = tabPanel.items.items[tabIndex];
        }
        else
        {
            view = Ext.widget('filelist',{key:idKey, title:title});
            tabPanel.add(view);
        }
        tabPanel.setActiveTab(view);
        view.store.loadById(folderId);
        tabPanel.setActiveTab(view);
        tabPanel.doLayout();

        var ribbon = this.application.getController('ribbonController');
        ribbon.toggle('Ribbon.MacrosFolder');
        this.init();
    },
    openFileAttributes:function() {

        var title = this.currentFile.get('title');
        var id = title;
        var tabPanel = Ext.getCmp('maintabs');
        var tabIndex = tabPanel.items.findIndex("key",id);
        var view;
        if (tabIndex >-1)
        {
            view = tabPanel.items.items[tabIndex];
        }
        else
        {
            view = Ext.widget('fileattributes',{title:title, fileid: this.currentFile.data.fileid});

            tabPanel.add(view);
        }

        tabPanel.setActiveTab(view);
        tabPanel.doLayout();
    },
    editFileAttributes : function() {
        var title = this.currentFile.get('title');
        var id = title;
        var tabPanel = Ext.getCmp('maintabs');
        var tabIndex = tabPanel.items.findIndex("key",id);
        var view;
        if (tabIndex >-1)
        {
            view = tabPanel.items.items[tabIndex];
        }
        else
        {
            view = Ext.widget('fileeditattributes',{title:title, fileid: this.currentFile.data.fileid});

            tabPanel.add(view);
        }

        tabPanel.setActiveTab(view);
        tabPanel.doLayout();

    }


});

