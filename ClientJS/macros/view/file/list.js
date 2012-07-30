Ext.define('Macros.view.file.list' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.filelist',
    title : 'Files',
    store: 'filesStore',
    model: 'fileModel',
    closable:true,

    initComponent: function() {

        this.columns = [
            {header: 'Titel',  dataIndex: 'title',  flex: 1},
            {header: 'Geändert am', dataIndex: 'lastmodifiedat', flex: 1},
            {header: 'Erstellt am am', dataIndex: 'createdat', flex: 1},
            {header: 'Autor', dataIndex: 'author', flex: 1},
            {header: 'fileid', dataIndex: 'fileid', flex: 1}
        ];
        this.callParent(arguments);
    }
});