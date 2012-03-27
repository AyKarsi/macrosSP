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