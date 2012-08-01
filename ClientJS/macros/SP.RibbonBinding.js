var SpRibbonBinding =
{
    callRibbonAction : function(ribbonName, actionName)
    {
        var ribController = macrosApp.getController("ribbonController");
        var ribbonGroup = ribController.getRibbonGroup(ribbonName);
        Ext.each(ribbonGroup.items.items, function(item){
            if (item.name == actionName){
                // exectue the handle
                if (item.handler == null){
                    console.log(ribbonName + "ribbon has no handle defined on action "+ actionName);
                }
                else {
                    item.handler();
                }
            }
        });
    },

    // needs to be called very late, to make sure that all ribbons are present..
    // might possibly fail with other ribbons..
    // moved to ribbon controller- can probaly be deleted
    ensureRibbonBinding:function() {

        if (!isInSharePoint)
            return;

        //$('.ms-cui-tts li').unbind("click.macrosRibbon");
        // only bind the click event to non macros ribbon groups
        //$('.ms-cui-tts li:not([id^="Ribbon.Ma"])').bind("click.macrosRibbon",function(a,b,c){
        $('.ms-cui-tts li').bind("click.macrosRibbon",function(event){

            debugger;
            var ribbonId = event.currentTarget.id.replace("-title","");
            var ribController = macrosApp.getController("ribbonController");
            ribController.toggle(ribbonId);
        });



    },
    // moved to ribbon controller- can probaly be deleted
    hideApp: function() {
        //this.ensureRibbonBinding();
        var macrosPanel = Ext.getCmp("macrosPanel");
        if (macrosPanel == null)
        {
            console.log("macrosPanel is undefined");
            return;
        }
        Ext.getCmp("macrosPanel").setVisible(false);
        $("#s4-mainarea").show();
    }

};


