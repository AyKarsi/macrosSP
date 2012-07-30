var SpRibbonBinding =
{





    initialized: false,
    init:function(){
        if (this.initialized)
            return;
        $('.ms-cui-tts li').click(function(){SpRibbonBinding.hideApp()});
        this.initialized = true;

        //$("[id^='Ribbon.Macros']").append("<li class='macrosLogo' style='float:right'><img src='https://macros-sp-dev.s3.amazonaws.com/MacrosSP/macrosLogo.gif' /></li>");

    },

    toggle: function(ribbonGroup){

        var spRibbonName;
        var ribbonSelector;
        switch(ribbonGroup)       {
            case "file":
                spRibbonName = "Ribbon.MacrosFile";
                ribbonSelector = "Ribbon\\\\.MacrosFile";
                break;
            case "folder":
                spRibbonName = "Ribbon.MacrosFolder";
                ribbonSelector = "Ribbon\\\\.MacrosFolder";
                break;
            case "main":
                spRibbonName = "Ribbon.MacrosMain";
                ribbonSelector = "Ribbon\\\\.MacrosMain";
                break;
        }
        if (spRibbonName)
            SelectRibbonTab(spRibbonName, true);
        else
            console.log("unkown ribbonGroup " + ribbonGroup);
/*
        if ($("[id='"+spRibbonName+"'] li.macrosLogo").length == 0) {
            $("[id='"+spRibbonName+"']").append("<li class='macrosLogo' style='float:right'><li>lll</li>");
        }
*/


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


