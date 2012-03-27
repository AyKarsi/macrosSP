Ext.define('Macros.view.folder.tree' ,{
    extend: 'Ext.tree.Panel',
    alias : 'widget.foldertree',
    title : 'All Users',
    store: 'foldertreeStore',
    model: 'foldertreeModel'

 /*   initComponent: function() {

        this.columns = [
            {header: 'Name',  dataIndex: 'name',  flex: 1},
            {header: 'Email', dataIndex: 'email', flex: 1}
        ];
        this.callParent(arguments);
    }
    */
});