Ext.define('Macros.app.ribbonGroup', {
    extend: 'Ext.Container',
    alias: 'widget.ribbonGroup',
    layout:'hbox',
    initComponent: function () {
        Ext.apply(this, {
                items:[
                    {
                        xtype:'ribbonAction',
                        text: "Suchen",
                        handler: macros.openSearch
                    },
                    {
                        xtype:'ribbonAction',
                        text: "Hilfe",
                        handler: macros.openSearch
                    }
                ]
            }
        );
        this.callParent(arguments);
    }});