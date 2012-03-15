Ext.define('Macros.app.ribbonAction', {
    extend: 'Ext.Container',
    //extend: 'Ext.panel.Panel',
    alias: 'widget.ribbonAction',
    text : "ClickMe",
    action: null,
    initComponent: function () {
        Ext.apply(this, {
                items:[

                        new Ext.Button( {
                        text: this.text,

                        handler: this.action
                        }),
                        {
                            xtype: 'box',
                            autoEl: {
                                tag:'a',
                                href:'#',
                                html:'link'
                            }
                        }
                    ]
            }
        );
        this.callParent(arguments);
    }});