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
    store: 'foldertreeStore',
    model: 'foldertreeModel',
    style: {
                fontSize: "25px"
    },
    cls:'macrosTree',
    initComponent: function() {

       //this.on("itemclick", this.itemclick);

        this.callParent(arguments);
    },

   itemclick:function(node,opts){
    //debugger;
       var id = opts.data.id;
       this.store.loadChildren(id);
       alert("expand "+node.id);
    }
});Ext.define('Macros.view.folder.tree' ,{
    extend: 'Ext.tree.Panel',
    alias : 'widget.foldertree',
    title : 'All Users',
    store: 'foldertreeStore',
    model: 'foldertreeModel',
    style: {
                fontSize: "25px"
    },
    cls:'macrosTree',
    initComponent: function() {

       //this.on("itemclick", this.itemclick);

        this.callParent(arguments);
    },

   itemclick:function(node,opts){
    //debugger;
       var id = opts.data.id;
       this.store.loadChildren(id);
       alert("expand "+node.id);
    }
});Ext.define('Macros.view.main.tabPanel' ,{
    extend: 'Ext.tab.Panel',
    alias : 'widget.tabs'


});Ext.define('Macros.view.ribbon.ribbonAction', {
    extend: 'Ext.Container',
    alias: 'widget.ribbonAction',
    text : "ClickMe",
    ribbonGroup: null,
    handler: null,
    initComponent: function () {
        Ext.apply(this, {
                items:[
                        new Ext.Button( {
                        text: this.text,
                        handler: this.handler,
                        ribbonGroup:this.ribbonGroup
                        })/*,
                        {
                            xtype: 'box',
                            autoEl: {
                                tag:'a',
                                href:'#',
                                html:'link'
                            }
                        }*/
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