var SpRibbonBinding =
{





    initialized: false,
    init:function(){
        if (this.initialized)
            return;
        $('.ms-cui-tts li').click(function(){SpRibbonBinding.hideApp()});
        this.initialized = true;
    },

    toggle: function(ribbonGroup){

        var spRibbonName;
        switch(ribbonGroup)       {
            case "file":
                spRibbonName = "Ribbon.MacrosFile";
                break;
            case "folder":
                spRibbonName = "Ribbon.MacrosFolder";
                break;
            case "main":
                spRibbonName = "Ribbon.MacrosMain";
                break;
        }
        if (spRibbonName)
            SelectRibbonTab(spRibbonName, true);
        else
            console.log("unkown ribbonGroup " + ribbonGroup);

    },

    clickSearch : function() {
        this.init();
        macrosApp.getController("ribbonController").clickSearch();
        $("#s4-mainarea").hide();
    },

    fileViewAttributes : function() {
        this.init();
        macrosApp.getController("fileController").openFileAttributes();
        $("#s4-mainarea").hide();
    },
    fileEditAttributes : function() {
        this.init();
        macrosApp.getController("fileController").editFileAttributes();
        $("#s4-mainarea").hide();
    },
    fileOpen: function() {
        this.init();
        macrosApp.getController("fileController").openFile();
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


};


