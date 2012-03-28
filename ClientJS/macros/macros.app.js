Ext.onReady(function(){
    //Ext.Loader.setConfig({enabled:true});
});
Ext.application({
    name: 'Macros',

    stores:[
        'users',
        'foldertreeStore'

    ],

    models:[
        'user',
        'foldertreeModel'

    ],

    launch: function() {

        Ext.create('Ext.panel.Panel', {

            renderTo:'s4-mainarea',
            height:Ext.getBody().getViewSize().height - Ext.get('topDings').getViewSize().height ,
            layout: {
                type: 'border',
                align: 'left'
            },
            items: [
                {
                    xtype:'box',
                    html:'Macros',
                    region:'north'

                },
                {
                    xtype:'foldertree',
                    title:'folder',
                    flex:1,
                    region:'west',
                    layout: 'fit',
                    split: true
                    //height:'100%'
                },
                {
                    xtype:'tabpanel',
                    id:'maintabs',
                    title:'Tabs',
                    region:'center',
                    width:400,
                    flex:1,
                    height:200,
                    items:[
                        {
                            html:'wreewr',
                            title:'tanone'
                        }]
                    //split: true,
                    //height:'100%'

                }
            ]
        });
    },
    controllers: [
        'folder',
        'user'

    ]
});Ext.define('Macros.view.user.edit', {
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
});Ext.define('Macros.view.folder.tree' ,{
    extend: 'Ext.tree.Panel',
    alias : 'widget.foldertree',
    title : 'All Users',
    store: 'foldertreeStore',
    model: 'foldertreeModel'

 /*   initComponent: function() {

        this.columns = [
            {header: 'Name',  dataIndex: 'name',  flex: 1},
            {header: 'Email', dataIndex: 'email', flex: 1}
        ];
        this.callParent(arguments);
    }
    */
});Ext.define('Macros.view.file.list' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.filelist',
    title : 'Files',
    store: 'filesStore',
    model: 'fileModel',
    closable:true,

    initComponent: function() {

        this.columns = [
            {header: 'title',  dataIndex: 'title',  flex: 1},
            {header: 'author', dataIndex: 'author', flex: 1}
        ];
        this.callParent(arguments);
    }
});Ext.define('Macros.model.fileModel', {
    extend: 'Ext.data.Model',
    fields: ['title', 'author']

});Ext.define('Macros.model.foldertreeModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'id', type: 'int', mapping: 'Id' },
        { name: 'text', type: 'string', mapping: 'Text' },
        { name: 'leaf', type: 'boolean', mapping: 'Leaf' },
        { name: 'loaded', type: 'boolean', mapping: 'Loaded', defaultValue: false },
        { name: 'Properties'},
        { name: 'expanded', defaultValue: true }
    ]
});Ext.define('Macros.model.user', {
    extend: 'Ext.data.Model',
    fields: ['name', 'email']

});Ext.define('Macros.store.filesStore', {
    extend: 'Ext.data.Store',
    model: 'Macros.model.fileModel',
    entityid: "0",

    loadById: function(entitiyid){
        this.entityid=entitiyid;
        this.proxy.url = 'http://localhost:88/Proxy/Default.aspx?entity=folder&id='+this.entityid;
        this.load();
    },

    proxy: new Ext.data.proxy.Ajax({
        url:'http://localhost:88/Proxy/Default.aspx?entity=folder&id=0',
        method:'get',
        reader: {
            type: 'xml',
            rootProperty : 'results',
            record: 'record'
        }
    })
});
Ext.define('Macros.store.foldertreeStore', {
    extend: 'Ext.data.TreeStore',
    //model:'Macros.model.foldertreeModel',
    root: {
        expanded: true,
        children: [
            { text: "Ordner",
                leaf: false,
                id:"8",
                children:[
                    { text: "Test", leaf: false,
                        children:[
                            { text: "Test2",
                                leaf: false,
                                id:"10"
                            },
                            { text: "Test3",
                                leaf: false,
                                id:"11"
                            },
                            { text: "Test4",
                                leaf: false,
                                id:"13"
                            },
                            { text: "Test5",
                                leaf: false,
                                id:"14"
                            }
                        ]},
                    { text: "Kaufprojekt", leaf: false}
                ]},
            { text: "Fonds",
                expanded: true,
                id:"7"
            },
            { text: "News", leaf: true },
            { text: "Vorlagen", leaf: true }
        ]
    }
});Ext.define('Macros.store.users', {
    extend: 'Ext.data.Store',
    model: 'Macros.model.user',
    data: [
        {name: 'Ed',    email: 'ed@sencha.com'},
        {name: 'Tommy', email: 'tommy@sencha.com'}
    ]
});Ext.define('Macros.controller.file', {
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


        var fc = this.application.getController('file');
        fc.list(record.data.id, record.data.text);

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
