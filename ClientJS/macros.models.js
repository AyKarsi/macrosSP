/**
 * Created by JetBrains WebStorm.
 * User: tropper
 * Date: 08.03.12
 * Time: 09:47
 * To change this template use File | Settings | File Templates.
 */
Ext.define('SearchResultModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'title',  type: 'string'},
        {name: 'version_maj',   type: 'string'},
        {name: 'lastmodifiedat', type: 'string'}
    ]

});


//The Store contains the AjaxProxy as an inline configuration
var searchResult = Ext.create('Ext.data.Store', {
    model: 'SearchResultModel',
    proxy: new Ext.data.proxy.Ajax({
        url : '/_layouts/macros.core/searchResult.xml',
        type: 'ajax',
        reader: {
            type: 'xml',
            rootProperty : 'results',
            record: 'record'
        }
    })
});

searchResult.load();/**
 * Created by JetBrains WebStorm.
 * User: tropper
 * Date: 12.03.12
 * Time: 11:58
 * To change this template use File | Settings | File Templates.
 */
var treeNavigationModel = Ext.create('Ext.data.TreeStore', {
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
});