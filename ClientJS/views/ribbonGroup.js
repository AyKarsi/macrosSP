Ext.define('Macros.app.ribbonGroup', {
    extend: 'Ext.Container',
    //extend: 'Ext.panel.Panel',
    alias: 'widget.ribbonGroup',
    text : "ClickMe",
    action: null,
    initComponent: function () {
        Ext.apply(this, {
                items:[
                    {
                        xtype:'ribbonAction',
                        text: "Suchen",
                        handler: macros.openSearch()
                    },
                    {
                        xtype:'ribbonAction',
                        text: "Hilfe",
                        handler: macros.openSearch()
                    }
                ]
            }
        );
        this.callParent(arguments);
    }});