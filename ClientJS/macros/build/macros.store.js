Ext.define('Macros.store.documentMenuStore', {
    extend: 'Ext.data.Store',
    model: 'Macros.model.documentMenuModel',
    autoLoad:true,
    proxy: new Ext.data.proxy.Ajax({
        url:proxyUrl+'?entity=documentmenu',
        method:'get',
        reader: {
            type: 'xml',
            rootProperty : 'results',
            record: 'record'
        }
    })
});Ext.define('Macros.store.filesStore', {
    extend: 'Ext.data.Store',
    model: 'Macros.model.fileModel',
    entityid: "0",

    loadById: function(entitiyid){
        this.entityid=entitiyid;
        this.proxy.url = proxyUrl+'?entity=folder&id='+this.entityid;

        this.load();
    },

    proxy: new Ext.data.proxy.Ajax({
        url:proxyUrl+'?entity=folder&id=0',
        method:'get',
        reader: {
            type: 'xml',
            rootProperty : 'results',
            record: 'record'
        }
    })
});Ext.define('Macros.store.foldertreeStore', {
    extend: 'Ext.data.TreeStore',
    model: 'Macros.model.foldertreeModel',
    autoLoad:true,
    defaultRootId: 0,
    expaned:true,
    root: {
        expanded: true,
        text: "Ordner",
        id: 0,
        leaf: false
    },
    proxy: new Ext.data.proxy.Ajax({
        url:proxyUrl+'?entity=foldertree',
        method:'get',
        reader: {
            type: 'xml',
            rootProperty : 'results',
            root: 'results',
            record: 'record',
            idProperty: 'id'
        }
    })
});


Ext.define('Macros.store.__foldertreeStore', {
    extend: 'Ext.data.TreeStore',
    //model:'Macros.model.foldertreeModel',
    root: {
        expanded: true,
        children: [
            { text: "Ordner",
                leaf: false,
                expanded: true,
                children:[
                    { text: "Test", leaf: false,
                        expanded: true,
                        id:"8",
                        children:[
                            { text: "Test2",
                                leaf: true,
                                id:"10"
                            },
                            { text: "Test3",
                                leaf: true,
                                id:"11"
                            },
                            { text: "Test4",
                                leaf: true,
                                id:"13"
                            },
                            { text: "Test5",
                                leaf: true,
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
});
