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

searchResult.load();