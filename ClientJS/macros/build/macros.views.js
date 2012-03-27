Ext.define('Macros.view.user.edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.useredit',

    title : 'Edit User',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'name',
                        fieldLabel: 'Name'
                    },
                    {
                        xtype: 'textfield',
                        name : 'email',
                        fieldLabel: 'Email'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                action: 'save'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});Ext.define('Macros.view.user.list' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.userlist',
    title : 'All Users',
    store: 'users',
    model: 'user',

    initComponent: function() {

        this.columns = [
            {header: 'Name',  dataIndex: 'name',  flex: 1},
            {header: 'Email', dataIndex: 'email', flex: 1}
        ];
        this.callParent(arguments);
    }
});Ext.define('Macros.view.folder.tree' ,{
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
});Ext.define('Macros.view.file.list' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.filelist',
    title : 'Files',
    store: 'filesStore',
    model: 'fileModel',
    closable:true,

    initComponent: function() {

        this.columns = [
            {header: 'title',  dataIndex: 'title',  flex: 1},
            {header: 'author', dataIndex: 'author', flex: 1}
        ];
        this.callParent(arguments);
    }
});