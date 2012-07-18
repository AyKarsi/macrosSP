Ext.define('Macros.store.filesStore', {
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
});Ext.define('Macros.store.__foldertreeStore', {
    extend: 'Ext.data.TreeStore',
    model: 'Macros.model.foldertreeModel',
    //entityid: "10",
    autoLoad:false,
    defaultRootId: "8",
    root: {
        expanded: true,
        text: "Ordner",
        id: "8",
        leaf: false,
        expanded:false
    },
         listeners: {

                // Each demo.UserModel instance will be automatically
                // decorated with methods/properties of Ext.data.NodeInterface
                // (i.e., a "node"). Whenever a UserModel node is appended
                // to the tree, this TreeStore will fire an "append" event.
                append: function( thisNode, newChildNode, index, eOpts ) {
                    alert("appending");
                    debugger;
                    // If the node that's being appended isn't a root node, then we can
                    // assume it's one of our UserModel instances that's been "dressed
                    // up" as a node
                    if( !newChildNode.isRoot() ) {

                    }
                    else {
                        //this.appendChild(newChildNode);
                    }
                }
          }
        ,
/*
    loadChildren: function(parentId){
        this.proxy.url = proxyUrl+'?entity=foldertree&id='+parentId;
        this.load();
    },*/
    proxy: new Ext.data.proxy.Ajax({
        url:proxyUrl+'?entity=foldertree&id=8',
        method:'get',
        reader: {
            type: 'xml',
            rootProperty : 'results',
            record: 'record',
            idProperty: 'id'
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
