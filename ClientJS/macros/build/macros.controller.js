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
    getRibbonGroup:function(ribbonGroupName){
        for(var i=0;i<this.ribbons.length;i++){
            var ribbon = this.ribbons[i];
            if (ribbon.id==ribbonGroupName){
               return ribbon;
            }
        }
        return null;
    },
    toggle:function(ribbonGroupName, objectData){



        console.log("toggle ribbon " + ribbonGroupName);

        $("[id='Ribbon.MacrosFolder-title']").hide();
        $("[id='Ribbon.MacrosFile-title']").hide();


        if (ribbonGroupName.indexOf("Ribbon.Macros")< 0){
            console.log("toggling sharepoint ootb ribbon");
            SelectRibbonTab(ribbonGroupName, false);

            this.ensureRibbonBinding();

            //SpRibbonBinding.hideApp();
            Ext.getCmp("macrosPanel").setVisible(false);
            $("#s4-mainarea").show();
            return;
        }


        Ext.getCmp("macrosPanel").setVisible(true);
        //$("#macrosarea").show();
        $("#s4-mainarea").hide();




        if (isInSharePoint){

            //SpRibbonBinding.toggle(ribbonGroupName);
            //return;
        }

        for(var i=0;i<this.ribbons.length;i++){
            var ribbon = this.ribbons[i];
            if (ribbon.spRibbonName==ribbonGroupName){

                if (isInSharePoint){
                    SelectRibbonTab(ribbon.spRibbonName, true);
                }
                else {
                    ribbon.show();
                }

                if (objectData != null)
                    ribbon.objectData = objectData;

                if(ribbonGroupName == "Ribbon.MacrosFile"){
                    var fc = this.application.getController('fileController');
                    if (fc.currentFile != null)
                        ribbon.loadFileRibbonMenu(fc.currentFile.data.fileid);
                }

            }
            else
                ribbon.hide();
            console.log("searching: "+ribbon.spRibbonName+"->bound events "+  $('.ms-cui-tts li').data('events'));
        }
        setTimeout(this.ensureRibbonBinding,1000);

        $("[id='Ribbon.MacrosFolder-title']").hide();
        $("[id='Ribbon.MacrosFile-title']").hide();
        $("[id='"+ribbonGroupName+"-title']").show();

    },
    refs :[{
        selector: '#macrosPanel',
        ref: 'MacrosArea'}
    ],

    ribbons:[],

    ensureRibbonBinding:function() {
        console.log("ensuring ribbon bindings. Ribbons: "+ $('.ms-cui-tts li').length);
        //SpRibbonBinding.ensureRibbonBinding();
        //$('.ms-cui-tts li').unbind("click.macrosRibbon");
        // only bind the click event to non macros ribbon groups
        //$('.ms-cui-tts li:not([id^="Ribbon.Ma"])').bind("click.macrosRibbon",function(a,b,c){
        $('.ms-cui-tts li').unbind("click.macrosRibbon");
        $('.ms-cui-tts li').bind("click.macrosRibbon",Ext.bind(function(event){
            var ribbonId = event.currentTarget.id.replace("-title","");
            var ribController = macrosApp.getController("ribbonController");
            ribController.toggle(ribbonId);
        },this));

        console.log("->bound events "+  $('.ms-cui-tts li').data('events'));

    },


    clickSearch : function(){
        //debugger;
        //this.init();
        Ext.getCmp("macrosPanel").setVisible(true);
        $("#s4-mainarea").hide();
        Ext.getCmp("macrosPanel").doLayout();
    },

    init: function() {
        var renderToDiv = 'ribbon'
        if (isInSharePoint)
        {
            // dont render it in sharepoint
            renderToDiv = null;
        }

        var startRibbon = Ext.widget('ribbonGroup',{renderTo:renderToDiv,
            id:'start',
            spRibbonName : "Ribbon.MacrosMain",
            items:[
                {
                    xtype:'ribbonAction',
                    text: "Suchen",
                    name: 'search',
                    handler: this.clickSearch,
                    spRibbonName : "Ribbon.MacrosMain"

                }
            ]
        });

        this.ribbons.push(startRibbon);
        var folderRibbon = Ext.create('Macros.view.ribbon.folderRibbon',
                {   id:'folder',
                    renderTo:renderToDiv,
                    spRibbonName : "Ribbon.MacrosFolder"
                }
        );
        this.ribbons.push(folderRibbon);

        var docRibbon = Ext.create('Macros.view.ribbon.fileRibbon',
            {   id:'file',
                renderTo:renderToDiv,
                spRibbonName : "Ribbon.MacrosFile"
            }
        );
        this.ribbons.push(docRibbon);

        this.ensureRibbonBinding();


        //this.toggle('Ribbon.MacrosMain');


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
