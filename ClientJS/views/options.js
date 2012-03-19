Ext.define('Macros.app.Panel', {
    extend: 'Ext.container.Container',
    alias:'widget.macrosOptions',
    title: 'Options',
    layout: 'accordion',
    initComponent: function () {
        Ext.apply(this, {
            items: [{
                html: '1234',
                title:'Search',
                xtype:'searchform',
                autoScroll: true,
                border: false,
                iconCls: 'nav'
            },{
                title:'Navigation',
                //xtype:'searchform',
                xtype:'treenavigation',
                border: false,
                autoScroll: true,
                iconCls: 'settings'
            },{
                title:'Settings',
                html: '1234',
                border: false,
                autoScroll: true,
                iconCls: 'settings'
            }
            ]
        });
        this.callParent(arguments);
    }
});