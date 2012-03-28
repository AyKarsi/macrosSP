Ext.define('Macros.store.filesStore', {
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
});