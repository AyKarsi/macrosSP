Ext.define('Macros.view.file.list' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.filelist',
    title : 'Files',
    store: 'filesStore',
    model: 'fileModel',

    initComponent: function() {



        this.columns = [
            {header: 'title',  dataIndex: 'title',  flex: 1},
            {header: 'author', dataIndex: 'author', flex: 1}
        ];
        this.callParent(arguments);
    }
});