Ext.define('Macros.controller.ribbonController', {
    extend: 'Ext.app.Controller',
    getRibbonGroup:function(ribbonGroupName){
        for(var i=0;i<this.ribbons.length;i++){
            var ribbon = this.ribbons[i];
            if (ribbon.id==ribbonGroupName){
               return ribbon;
            }
        }
        return null;
    },
    toggle:function(ribbonGroupName, objectData){



        console.log("toggle ribbon " + ribbonGroupName);

        $("[id='Ribbon.MacrosFolder-title']").hide();
        $("[id='Ribbon.MacrosFile-title']").hide();


        if (ribbonGroupName.indexOf("Ribbon.Macros")< 0){
            console.log("toggling sharepoint ootb ribbon");
            SelectRibbonTab(ribbonGroupName, false);

            this.ensureRibbonBinding();

            //SpRibbonBinding.hideApp();
            Ext.getCmp("macrosPanel").setVisible(false);
            $("#s4-mainarea").show();
            return;
        }


        Ext.getCmp("macrosPanel").setVisible(true);
        //$("#macrosarea").show();
        $("#s4-mainarea").hide();




        if (isInSharePoint){

            //SpRibbonBinding.toggle(ribbonGroupName);
            //return;
        }

        for(var i=0;i<this.ribbons.length;i++){
            var ribbon = this.ribbons[i];
            if (ribbon.spRibbonName==ribbonGroupName){

                if (isInSharePoint){
                    SelectRibbonTab(ribbon.spRibbonName, true);
                }
                else {
                    ribbon.show();
                }

                if (objectData != null)
                    ribbon.objectData = objectData;

                if(ribbonGroupName == "Ribbon.MacrosFile"){
                    var fc = this.application.getController('fileController');
                    if (fc.currentFile != null)
                        ribbon.loadFileRibbonMenu(fc.currentFile.data.fileid);
                }

            }
            else
                ribbon.hide();
            console.log("searching: "+ribbon.spRibbonName+"->bound events "+  $('.ms-cui-tts li').data('events'));
        }
        setTimeout(this.ensureRibbonBinding,1000);

        $("[id='Ribbon.MacrosFolder-title']").hide();
        $("[id='Ribbon.MacrosFile-title']").hide();
        $("[id='"+ribbonGroupName+"-title']").show();

    },
    refs :[{
        selector: '#macrosPanel',
        ref: 'MacrosArea'}
    ],

    ribbons:[],

    ensureRibbonBinding:function() {
        console.log("ensuring ribbon bindings. Ribbons: "+ $('.ms-cui-tts li').length);
        //SpRibbonBinding.ensureRibbonBinding();
        //$('.ms-cui-tts li').unbind("click.macrosRibbon");
        // only bind the click event to non macros ribbon groups
        //$('.ms-cui-tts li:not([id^="Ribbon.Ma"])').bind("click.macrosRibbon",function(a,b,c){
        $('.ms-cui-tts li').unbind("click.macrosRibbon");
        $('.ms-cui-tts li').bind("click.macrosRibbon",Ext.bind(function(event){
            var ribbonId = event.currentTarget.id.replace("-title","");
            var ribController = macrosApp.getController("ribbonController");
            ribController.toggle(ribbonId);
        },this));

        console.log("->bound events "+  $('.ms-cui-tts li').data('events'));

    },


    clickSearch : function(){
        //debugger;
        //this.init();
        Ext.getCmp("macrosPanel").setVisible(true);
        $("#s4-mainarea").hide();
        Ext.getCmp("macrosPanel").doLayout();
    },

    init: function() {
        var renderToDiv = 'ribbon'
        if (isInSharePoint)
        {
            // dont render it in sharepoint
            renderToDiv = null;
        }

        var startRibbon = Ext.widget('ribbonGroup',{renderTo:renderToDiv,
            id:'start',
            spRibbonName : "Ribbon.MacrosMain",
            items:[
                {
                    xtype:'ribbonAction',
                    text: "Suchen",
                    name: 'search',
                    handler: this.clickSearch,
                    spRibbonName : "Ribbon.MacrosMain"

                }
            ]
        });

        this.ribbons.push(startRibbon);
        var folderRibbon = Ext.create('Macros.view.ribbon.folderRibbon',
                {   id:'folder',
                    renderTo:renderToDiv,
                    spRibbonName : "Ribbon.MacrosFolder"
                }
        );
        this.ribbons.push(folderRibbon);

        var docRibbon = Ext.create('Macros.view.ribbon.fileRibbon',
            {   id:'file',
                renderTo:renderToDiv,
                spRibbonName : "Ribbon.MacrosFile"
            }
        );
        this.ribbons.push(docRibbon);

        this.ensureRibbonBinding();


        //this.toggle('Ribbon.MacrosMain');


    }
});


