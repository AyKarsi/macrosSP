var SpRibbonBinding =
{
        initialized: false,
        init:function(){
            if (this.initialized)
                return;
            $('.ms-cui-tts li').click(function(){SpRibbonBinding.hideApp()});
            this.initialized = true;
        },
    
        clickSearch : function() {
            this.init();
            macrosApp.getController("ribbon").clickSearch();
            $("#s4-mainarea").hide();
        },

        hideApp: function() {
            this.init();
            Ext.getCmp("macrosPanel").setVisible(false);
            $("#s4-mainarea").show();
        },
        hideSPMainContent: function() {
            this.init();
            $("#s4-mainarea").hide();
        }


}


