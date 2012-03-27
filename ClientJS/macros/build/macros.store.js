Ext.define('Macros.store.filesStore', {
    extend: 'Ext.data.Store',
    model: 'Macros.model.fileModel',
/*    data: [
        {name: 'Ed',    email: 'ed@sencha.com'},
        {name: 'Tommy', email: 'tommy@sencha.com'}
    ],
    */

    proxy: new Ext.data.proxy.Ajax({
        url : 'http://localhost:88/Proxy/Default.aspx?url=http%3A%2F%2Fwega.mi-m.de%2Fedms%2Fexe%2Feb.exe%3Fcfgs%3D..%2Fcfgs%2Fdmsfolders.cfg%26p%3Dlist%26MaskName%3Dlhitsxml%26folderid%3D10',
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
            { text: "Ordner", leaf: false,
                children:[
                    { text: "Test", leaf: false,
                        children:[
                            { text: "Test2",
                                leaf: true,
                                id:"1000006"
                            },
                            { text: "Test3",
                                leaf: true,
                                id:"1000007"
                            },
                            { text: "Test4",
                                leaf: true,
                                id:"1000008"
                            },
                            { text: "Test5",
                                leaf: true,
                                id:"1000009"
                            }
                        ]},
                    { text: "Kaufprojekt", leaf: false}
                ]},
            { text: "Fonds", expanded: true, children: [
                { text: "book report", leaf: true },
                { text: "alegrbra", leaf: true}
            ] },
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