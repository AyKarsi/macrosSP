Ext.define('Macros.store.filesStore', {
    extend: 'Ext.data.Store',
    model: 'Macros.model.fileModel',
/*    data: [
        {name: 'Ed',    email: 'ed@sencha.com'},
        {name: 'Tommy', email: 'tommy@sencha.com'}
    ],
    */

   loadFromMacros: function(){
       //http://flxhr.flensed.com/

       $.flXHRproxy.registerOptions("http://wega.mi-m.de/",{xmlResponseText:true});

       $.ajax({
           method:'get',
           type:'xml',
           url : 'http://wega.mi-m.de/edms/exe/eb.exe?cfgs=../cfgs/dmsfolders.cfg&p=list&MaskName=lhitsxml&folderid=10',
           success:function(data){
               alert("data:"+data);
           }
       });


    }


    /*
    proxy: new Ext.data.proxy.Ajax({
        url : 'http://wega.mi-m.de/edms/exe/eb.exe?cfgs=../cfgs/dmsfolders.cfg&p=list&MaskName=lhitsxml&folderid=10',
        method:'get',
        reader: {
            type: 'xml',
            rootProperty : 'results',
            record: 'record'
        }
    }) */
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