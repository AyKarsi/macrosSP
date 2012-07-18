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
                    ribbon.toggle('file');
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
        var url = macrosExeServerUrl + "miidoccgi.exe?getfile&dokid="+fileId+"&arbeitsmittel=1";
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
        ribbon.toggle('folder');
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

Ext.define('Macros.controller.ribbonController', {
    extend: 'Ext.app.Controller',

    toggle:function(ribbonGroupName, objectData){


        if (isInSharePoint){

            SpRibbonBinding.toggle(ribbonGroupName);
            return;
        }

        for(var i=0;i<this.ribbons.length;i++){
            var ribbon = this.ribbons[i];
            if (ribbon.id==ribbonGroupName){
                ribbon.show();
                if (objectData != null)
                    ribbon.objectData = objectData;
            }
            else
                ribbon.hide();
        }
    },
    refs :[{
        selector: '#macrosPanel',
        ref: 'MacrosArea'}
    ],

    ribbons:[],

    clickSearch : function(){
        Ext.getCmp("macrosPanel").setVisible(true);
    },

    openFileAttributes: function() {

        var ctrl = macrosApp.getController("fileController");
        return ctrl.openFileAttributes();
    },
    editFileAttributes : function() {
        var ctrl = macrosApp.getController("fileController");
        return ctrl.editFileAttributes();

    },

    openFile: function() {
        var ctrl = macrosApp.getController("fileController");
        return ctrl.openFile();

    },

    init: function() {


        if (isInSharePoint)
        {
            // ribbon binding is done in sharepoint
            return;
        }

        var startRibbon = Ext.widget('ribbonGroup',{renderTo:'ribbon',
            id:'start',
            items:[
                {
                    xtype:'ribbonAction',
                    text: "Suchen",
                    handler: this.clickSearch
                }
            ]

        });
        this.ribbons.push(startRibbon);

        var folderRibbon = Ext.widget('ribbonGroup',{renderTo:'ribbon',
            id:'folder',
            items:[
                {
                    xtype:'ribbonAction',
                    text: "Anzeigen",
                    handler: function() {
                        alert("click");
                    }
                },
                {
                    xtype:'ribbonAction',
                    text: "Suchen",
                    handler: null
                },
                {
                    xtype:'ribbonAction',
                    text: "Unterordner anlegen",
                    handler: null
                }
            ]

        });
        this.ribbons.push(folderRibbon);
        var fileRibbon = Ext.widget('ribbonGroup',{
            //that: this,
            renderTo:'ribbon',
            id:'file',
            items:[
                {
                    xtype:'ribbonAction',
                    text: "Attribute anzeigen",
                    ribbonGroup:fileRibbon,
                    handler: this.openFileAttributes
                },
                {
                    xtype:'ribbonAction',
                    text: "Document öffnen",
                    ribbonGroup:fileRibbon,
                    handler: this.openFile
                },
                {
                    xtype:'ribbonAction',
                    text: "Reattributen",
                    handler: this.editFileAttributes
                },
                {
                    xtype:'ribbonAction',
                    text: "Weitlerleiten",
                    handler: null
                }
            ]

        });
        this.ribbons.push(fileRibbon);

        this.toggle('start');


     /*   this.control({
            'list': {
                itemdblclick: this.editFile
            }
        });
        */
    }
});


Ext.define('Macros.controller.userController', {
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
