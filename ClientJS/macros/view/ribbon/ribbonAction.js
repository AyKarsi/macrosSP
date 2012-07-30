Ext.define('Macros.view.ribbon.ribbonAction', {
    extend: 'Ext.Container',
    alias: 'widget.ribbonAction',
    text : "ClickMe",
    ribbonGroup: null,
    handler: null,
    btn : function(){
        return this.items.items[0];
    },
    initComponent: function () {
        Ext.apply(this, {
                items:[
                        new Ext.Button( {
                        text: this.text,
                        handler: this.handler,
                        ribbonGroup:this.ribbonGroup
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