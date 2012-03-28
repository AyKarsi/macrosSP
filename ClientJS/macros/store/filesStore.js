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