Ext.define('Macros.view.ribbon.ribbonAction', {
    extend: 'Ext.Container',
    alias: 'widget.ribbonAction',
    text : "ClickMe",
    handler: null,
    initComponent: function () {
        Ext.apply(this, {
                items:[
                        new Ext.Button( {
                        text: this.text,
                        handler: this.handler
                        })/*,
                        {
                            xtype: 'box',
                            autoEl: {
                                tag:'a',
                                href:'#',
                                html:'link'
                            }
                        }*/
                    ]
            }
        );
        this.callParent(arguments);
    }});