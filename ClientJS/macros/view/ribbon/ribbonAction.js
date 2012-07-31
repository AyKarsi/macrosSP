Ext.define('Macros.view.ribbon.ribbonAction', {
    extend: 'Ext.Container',
    alias: 'widget.ribbonAction',
    text : "ClickMe",
    ribbonGroup: null,
    handler: null,

    setText:function(text){
        if (isInSharePoint){
            $("[title='"+this.name+"'] .ms-cui-ctl-largelabel").html(text);
        }
        else{
            var btn = this.items.items[0];
            btn.setText(text);
        }

    },
    setVisible:function(visible){
        if (isInSharePoint){
            if (visible)
                $("[title='"+this.name+"']").show();
            else
                $("[title='"+this.name+"']").hide();
        }
        else{
            var btn = this.items.items[0];
            btn.setVisible(visible);
        }

    },
    handler: function(){
        var btn = this.items.items[0];
        return btn.handler
    },

    initComponent: function () {
        Ext.apply(this, {
                items:[
                        new Ext.Button( {
                        text: this.text,
                        handler: this.handler,
                        ribbonGroup:this.ribbonGroup
                        })
                    ]
            }
        );
        this.callParent(arguments);
    }});