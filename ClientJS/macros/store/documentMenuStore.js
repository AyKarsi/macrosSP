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
});