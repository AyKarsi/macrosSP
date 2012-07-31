Ext.define('Macros.view.file.attributes' ,{
    extend: 'Ext.ux.SimpleIFrame',
    alias : 'widget.fileattributes',
    title : 'File Attributes',
    fileid: '',
    closable:true,


    initComponent: function() {

        //var fileId = 'f522f5d02-6f71-11e1-86e6-f0c99bbca093';
        var url = proxyUrl+'?entity=getfileattr&id='+ this.fileid;
        this.src = url;

        this.callParent(arguments);
        this.reload();
    },

    load:function()
    {
        var self = this;
 }
});Ext.define('Macros.view.file.editattributes' ,{
    extend: 'Ext.ux.SimpleIFrame',
    alias : 'widget.fileeditattributes',
    title : 'Edit File Attributes',
    closable:true,
    fileid:'',


    initComponent: function() {

        var fileId = 'f522f5d02-6f71-11e1-86e6-f0c99bbca093';
        var url = proxyUrl+'?entity=editfileattr&id='+ this.fileid;
        //this.src = url;
        this.src = macrosExeServerUrl + "eb.exe?cfgs=../cfgs/docops.cfg&p=form&MaskName=freattr&fileid={0}&adddata=&docclass=1&attrclass=3";
        this.src = this.src.replace("{0}", this.fileid);

        this.callParent(arguments);
        this.reload();


    },

    load:function()
    {
        var self = this;


    }
});Ext.define('Macros.view.file.list' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.filelist',
    title : 'Files',
    store: 'filesStore',
    model: 'fileModel',
    closable:true,

    initComponent: function() {

        this.columns = [
            {header: 'Titel',  dataIndex: 'title',  flex: 1},
            {header: 'Geändert am', dataIndex: 'lastmodifiedat', flex: 1},
            {header: 'Erstellt am am', dataIndex: 'createdat', flex: 1},
            {header: 'Autor', dataIndex: 'author', flex: 1},
            {header: 'fileid', dataIndex: 'fileid', flex: 1}
        ];
        this.callParent(arguments);
    }
});Ext.define('Macros.view.folder.tree' ,{
    extend: 'Ext.tree.Panel',
    alias : 'widget.foldertree',
    title : 'All Users',
    model: 'Macros.model.foldertreeModel',
    store: 'foldertreeStore',
    clearOnLoad:false,
    style: {
                "background-color": "green",
                "color": "green"
    },
    cls: 'macrosFoldertree',
    initComponent: function() {
       this.callParent(arguments);
        this.on("load",function(treeStore, records, successful, operation) {


            Ext.each(successful,function(item){
                console.log(item.nodeId);
                item.cls="subitem";
            });

            //var id = 8; // This is the ID of the node that somehow you know in advance
            //var node = treeStore.getNodeById(id);

            ///treePanel.expandPath(node.getPath());
        });

    },

   itemclick:function(node,opts){
       this.store.load({
           node:opts.data

           ,callback:function(a,b,c){
               debugger;
               console.log("callback");
           }
       })
    }
});Ext.define('Macros.view.folder.tree' ,{
    extend: 'Ext.tree.Panel',
    alias : 'widget.foldertree',
    title : 'All Users',
    model: 'Macros.model.foldertreeModel',
    store: 'foldertreeStore',
    clearOnLoad:false,
    style: {
                "background-color": "green",
                "color": "green"
    },
    cls: 'macrosFoldertree',
    initComponent: function() {
       this.callParent(arguments);
        this.on("load",function(treeStore, records, successful, operation) {


            Ext.each(successful,function(item){
                console.log(item.nodeId);
                item.cls="subitem";
            });

            //var id = 8; // This is the ID of the node that somehow you know in advance
            //var node = treeStore.getNodeById(id);

            ///treePanel.expandPath(node.getPath());
        });

    },

   itemclick:function(node,opts){
       this.store.load({
           node:opts.data

           ,callback:function(a,b,c){
               debugger;
               console.log("callback");
           }
       })
    }
});Ext.define('Macros.view.main.tabPanel' ,{
    extend: 'Ext.tab.Panel',
    alias : 'widget.tabs'


});Ext.define('Macros.view.ribbon.fileRibbon', {
    extend: 'Ext.Container',
    layout:'hbox',
    objectData: null,
    initComponent: function(config)
    {

        Ext.apply(this, {

            items:[
                {
                    xtype:'ribbonAction',
                    name:'doctemplate',
                    ribbonGroup:this
                },
                {
                    xtype:'ribbonAction',
                    name:'projectdata',
                    ribbonGroup:this
                },
                {
                    xtype:'ribbonAction',
                    name:'display',
                    ribbonGroup:this,
                    handler: this.openFile
                },
                {
                    xtype:'ribbonAction',
                    name:'displayarchived',
                    ribbonGroup:this
                },
                {
                    xtype:'ribbonAction',
                    name:'checkout',
                    ribbonGroup:this
                }
                ,
                {
                    xtype:'ribbonAction',
                    name:'checkoutback',
                    ribbonGroup:this
                }
                ,
                {
                    xtype:'ribbonAction',
                    name:'checkin',
                    ribbonGroup:this
                },
                {
                    xtype:'ribbonAction',
                    name: "reattr",
                    ribbonGroup:this,
                    handler: this.editFileAttributes
                },
                {
                    xtype:'ribbonAction',
                    name: "move",
                    ribbonGroup:this,
                    handler: null
                },
                {
                    xtype:'ribbonAction',
                    name: "delete",
                    ribbonGroup:this,
                    handler: null
                }
            ]
        });
        this.callParent(config);
    },
    loadFileRibbonMenu : function (fileid) {

        Ext.each(this.items.items, function(item,index,items){
            item.setVisible(false);
        });

        var docStore = new Macros.store.documentMenuStore();
        docStore.load({
            params: {id:fileid},
            callback: Ext.bind(function(records,operation,success){
                var menuItem = records[0].data;
                Ext.each(this.items.items, function(item){

                    if (menuItem[item.name+'_url'] != null && menuItem[item.name+'_url'] != ""  ){
                        item.setText(menuItem[item.name]);
                        item.setVisible(true);
                        item.url = menuItem[item.name+'_url'];
                    }

                });
                this.doLayout();

            },this)
        });

    },
    openFileAttributes: function() {
        var ctrl =macrosApp.getController("fileController");
        return ctrl.openFileAttributes();
    },
    editFileAttributes : function() {
        var ctrl =macrosApp.getController("fileController");
        return ctrl.editFileAttributes();
    },
    openFile: function() {
        var ctrl =macrosApp.getController("fileController");
        return ctrl.openFile();

    }




});Ext.define('Macros.view.ribbon.folderRibbon', {
    extend: 'Ext.Container',
    layout:'hbox',
    objectData: null,
    initComponent: function(config)
    {
        Ext.apply(this, {
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
            }]

    });
        this.callParent(config);
    }

});Ext.define('Macros.view.ribbon.ribbonAction', {
    extend: 'Ext.Container',
    alias: 'widget.ribbonAction',
    text : "ClickMe",
    ribbonGroup: null,
    handler: null,

    setText:function(text){
        if (isInSharePoint){
            $("[title='"+this.name+"'] .ms-cui-ctl-largelabel").html(text);
        }
        else{
            var btn = this.items.items[0];
            btn.setText(text);
        }

    },
    setVisible:function(visible){
        if (isInSharePoint){
            if (visible)
                $("[title='"+this.name+"']").show();
            else
                $("[title='"+this.name+"']").hide();
        }
        else{
            var btn = this.items.items[0];
            btn.setVisible(visible);
        }

    },
    handler: function(){
        var btn = this.items.items[0];
        return btn.handler
    },

    initComponent: function () {
        Ext.apply(this, {
                items:[
                        new Ext.Button( {
                        text: this.text,
                        handler: this.handler,
                        ribbonGroup:this.ribbonGroup
                        })
                    ]
            }
        );
        this.callParent(arguments);
    }});Ext.define('Macros.view.ribbon.ribbonGroup', {
    extend: 'Ext.Container',
    alias: 'widget.ribbonGroup',
    layout:'hbox',
    objectData: null,
    initComponent: function () {

        this.callParent(arguments);
    }});Ext.define('Macros.view.user.edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.useredit',

    title : 'Edit User',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'name',
                        fieldLabel: 'Name'
                    },
                    {
                        xtype: 'textfield',
                        name : 'email',
                        fieldLabel: 'Email'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                action: 'save'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});Ext.define('Macros.view.user.list' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.userlist',
    title : 'All Users',
    store: 'users',
    model: 'user',

    initComponent: function() {

        this.columns = [
            {header: 'Name',  dataIndex: 'name',  flex: 1},
            {header: 'Email', dataIndex: 'email', flex: 1}
        ];



        this.callParent(arguments);
    }
});