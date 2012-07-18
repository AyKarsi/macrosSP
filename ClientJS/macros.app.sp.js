var proxyUrl  = "http://46.137.82.174/sites/macros/_layouts/macros.proxy/Proxy.aspx";
var isInSharePoint = true;
Ext.Loader.setConfig({enabled:false});




Ext.onReady(function(){


});




$(document).ready(function(){

    $("#s4-mainarea").after("<div id='macrosarea'></div>");

});


var macrosApp = {};
Ext.application({
//var Macros = Ext.create('Ext.app.Application',{
    name: 'Macros',
    appFolder: '/macros',
    stores:[
        'users',
        'foldertreeStore'

    ],

    models:[
        'user',
        'foldertreeModel'

    ],
    mainPanel:null,
    launch: function() {
        // alert(Ext.get('s4-ribbonrow').getViewSize().height);
        var ribbonHeight = Ext.get('s4-ribbonrow').getViewSize().height;
        ribbonHeight += Ext.get('ribbon').getViewSize().height;

        this.mainPanel= Ext.create('Ext.panel.Panel', {
            id:"macrosPanel",
            renderTo:'macrosarea',
            height:Ext.getBody().getViewSize().height - ribbonHeight ,
            layout: {
                type: 'border',
                align: 'left'
            },
            adjustHeight: function() {
                var ribbonHeight = Ext.get('s4-ribbonrow').getViewSize().height;
                ribbonHeight += Ext.get('ribbon').getViewSize().height;
                this.height = Ext.getBody().getViewSize().height - ribbonHeight;
            },
            items: [
                {
                    xtype:'box',
                    html:'Macros DMS',
                    region:'north'

                },
                {
                    xtype:'foldertree',
                    title:'',
                    flex:1,
                    region:'west',
                    layout: 'fit',
                    split: true
                    //height:'100%'
                },
                {
                    xtype:'tabs',
                    id:'maintabs',
                    region:'center',
                    width:400,
                    flex:1,
                    height:200
                    //split: true,
                    //height:'100%'

                }
            ]
        });

        this.mainPanel.setVisible(false);
        // this reference is needed for the ribbonbindings
        macrosApp = this;



    },
    controllers: [
        'folderController',
        'userController',
        'ribbonController'


    ]
});

Ext.EventManager.onWindowResize(function () {
    macrosApp.mainPanel.adjustHeight();
    macrosApp.mainPanel.doLayout();
});var SpRibbonBinding =
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


// vim: sw=2:ts=2:nu:nospell:fdc=2:expandtab
/**
 * @class Ext.ux.SimpleIFrame
 * @extends Ext.Panel
 *
 * A simple ExtJS 4 (and v4.1) implementaton of an iframe providing basic functionality.
 * For example:
 *
 * var panel=Ext.create('Ext.ux.SimpleIFrame', {
 *   border: false,
 *   src: 'http://localhost'
 * });
 * panel.setSrc('http://www.sencha.com');
 * panel.reset();
 * panel.reload();
 * panel.getSrc();
 * panel.update('<div><b>Some Content....</b></div>');
 * panel.destroy();
 *
 * @author    Conor Armstrong
 * @copyright (c) 2012 Conor Armstrong
 * @date      08 June 2012
 * @version   0.3
 *
 * @license Ext.ux.SimpleIFrame.js is licensed under the terms of the Open Source
 * LGPL 3.0 license. Commercial use is permitted to the extent that the
 * code/component(s) do NOT become part of another Open Source or Commercially
 * licensed development library or toolkit without explicit permission.
 *
 * <p>License details: <a href="http://www.gnu.org/licenses/lgpl.html"
 * target="_blank">http://www.gnu.org/licenses/lgpl.html</a></p>
 *
 */

Ext.require([
    'Ext.panel.*'
]);

Ext.define('Ext.ux.SimpleIFrame', {
    extend: 'Ext.Panel',
    alias: 'widget.simpleiframe',
    src: 'about:blank',
    loadingText: 'Loading ...',
    initComponent: function(){
        this.updateHTML();
        this.callParent(arguments);

    },
    afterLayout:function() {
        //alert("afterRender");

        //var iframe = this.getDocument();
        ///debugger;
        $("#iframe-"+this.id).load(function() {
          //alert("the iframe is being loaded..");
          this.onFrameContentChange();
        });


    },
    updateHTML: function() {
        this.html='<iframe id="iframe-'+this.id+'"'+
            ' style="overflow:auto;width:100%;height:100%;"'+
            ' frameborder="0" '+
            ' src="'+this.src+'"'+
            '></iframe>';
    },
    onFrameContentChange:function() {

        alert("onFrameContentChange");
    },
    reload: function() {
        this.setSrc(this.src);


    },
    reset: function() {
        var iframe=this.getDOM();
        var iframeParent=iframe.parentNode;
        if (iframe && iframeParent) {
            iframe.src='about:blank';
            iframe.parentNode.removeChild(iframe);
        }

        iframe=document.createElement('iframe');
        iframe.frameBorder=0;
        iframe.src=this.src;
        iframe.id='iframe-'+this.id;
        iframe.style.overflow='auto';
        iframe.style.width='100%';
        iframe.style.height='100%';
        iframeParent.appendChild(iframe);

    },
    setSrc: function(src, loadingText) {
        this.src=src;
        var iframe=this.getDOM();
        if (iframe) {
            iframe.src=src;
        }
    },
    getSrc: function() {
        return this.src;
    },
    getDOM: function() {
        return document.getElementById('iframe-'+this.id);
    },
    getDocument: function() {
        var iframe=this.getDOM();
        iframe = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
        return iframe.document;
    },
    destroy: function() {
        var iframe=this.getDOM();
        if (iframe && iframe.parentNode) {
            iframe.src='about:blank';
            iframe.parentNode.removeChild(iframe);
        }
        this.callParent(arguments);
    },

    //call this to manually change content.
    //don't call until component is rendered!!!
    update: function(content) {
        this.setSrc('about:blank');
        try {
            var doc=this.getDocument();
            doc.open();
            doc.write(content);
            doc.close();
        } catch(err) {
            // reset if any permission issues
            this.reset();
            var doc=this.getDocument();
            doc.open();
            doc.write(content);
            doc.close();
        }
    }
});Ext.define('Macros.view.file.attributes' ,{
    extend: 'Ext.ux.SimpleIFrame',
    alias : 'widget.fileattributes',
    title : 'File Attributes',
    fileid: '',
    closable:true,


    initComponent: function() {

        //var fileId = 'f522f5d02-6f71-11e1-86e6-f0c99bbca093';
        var url = proxyUrl+'?entity=getfileattr&id='+ this.fileid;
        this.src = url;

        this.callParent(arguments);
        this.reload();


    },

    load:function()
    {
        var self = this;


    }
});Ext.define('Macros.view.file.editattributes' ,{
    extend: 'Ext.ux.SimpleIFrame',
    alias : 'widget.fileeditattributes',
    title : 'Edit File Attributes',
    closable:true,
    fileid:'',


    initComponent: function() {

        var fileId = 'f522f5d02-6f71-11e1-86e6-f0c99bbca093';
        var url = proxyUrl+'?entity=editfileattr&id='+ this.fileid;
        //this.src = url;
        this.src = macrosExeServerUrl + "eb.exe?cfgs=../cfgs/docops.cfg&p=form&MaskName=freattr&fileid={0}&adddata=&docclass=1&attrclass=3";
        this.src = this.src.replace("{0}", this.fileid);

        this.callParent(arguments);
        this.reload();


    },

    load:function()
    {
        var self = this;


    }
});Ext.define('Macros.view.file.list' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.filelist',
    title : 'Files',
    store: 'filesStore',
    model: 'fileModel',
    closable:true,

    initComponent: function() {

        this.columns = [
            {header: 'title',  dataIndex: 'title',  flex: 1},
            {header: 'author', dataIndex: 'author', flex: 1},
            {header: 'fileid', dataIndex: 'fileid', flex: 1}
        ];
        this.callParent(arguments);
    }
});Ext.define('Macros.view.folder.tree' ,{
    extend: 'Ext.tree.Panel',
    alias : 'widget.foldertree',
    title : 'All Users',
    store: 'foldertreeStore',
    model: 'foldertreeModel',

    initComponent: function() {

       //this.on("itemclick", this.itemclick);

        this.callParent(arguments);
    },

   itemclick:function(node,opts){
    //debugger;
       var id = opts.data.id;
       this.store.loadChildren(id);
       alert("expand "+node.id);
    }
});Ext.define('Macros.view.folder.tree' ,{
    extend: 'Ext.tree.Panel',
    alias : 'widget.foldertree',
    title : 'All Users',
    store: 'foldertreeStore',
    model: 'foldertreeModel',

    initComponent: function() {

       //this.on("itemclick", this.itemclick);

        this.callParent(arguments);
    },

   itemclick:function(node,opts){
    //debugger;
       var id = opts.data.id;
       this.store.loadChildren(id);
       alert("expand "+node.id);
    }
});Ext.define('Macros.view.main.tabPanel' ,{
    extend: 'Ext.tab.Panel',
    alias : 'widget.tabs'


});Ext.define('Macros.view.ribbon.ribbonAction', {
    extend: 'Ext.Container',
    alias: 'widget.ribbonAction',
    text : "ClickMe",
    ribbonGroup: null,
    handler: null,
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
    }});Ext.define('Macros.view.ribbon.ribbonGroup', {
    extend: 'Ext.Container',
    alias: 'widget.ribbonGroup',
    layout:'hbox',
    objectData: null,
    initComponent: function () {

        this.callParent(arguments);
    }});Ext.define('Macros.view.user.edit', {
    extend: 'Ext.window.Window',
    alias : 'widget.useredit',

    title : 'Edit User',
    layout: 'fit',
    autoShow: true,

    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                items: [
                    {
                        xtype: 'textfield',
                        name : 'name',
                        fieldLabel: 'Name'
                    },
                    {
                        xtype: 'textfield',
                        name : 'email',
                        fieldLabel: 'Email'
                    }
                ]
            }
        ];

        this.buttons = [
            {
                text: 'Save',
                action: 'save'
            },
            {
                text: 'Cancel',
                scope: this,
                handler: this.close
            }
        ];

        this.callParent(arguments);
    }
});Ext.define('Macros.view.user.list' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.userlist',
    title : 'All Users',
    store: 'users',
    model: 'user',

    initComponent: function() {

        this.columns = [
            {header: 'Name',  dataIndex: 'name',  flex: 1},
            {header: 'Email', dataIndex: 'email', flex: 1}
        ];



        this.callParent(arguments);
    }
});Ext.define('Macros.model.fileModel', {
    extend: 'Ext.data.Model',
    fields: ['title', 'author', 'fileid']

});

/*
<results>

  <record>
    <title>Eine Referenz in in Test</title>
    <pcomment></pcomment>
    <lastmodifiedat>28.03.2012 08:12</lastmodifiedat>
    <createdat>28.03.2012 08:12</createdat>
    <author>Ehring, Thomas</author>
    <infotype>Standard</infotype>
    <keywords></keywords>
    <filename></filename>
    <businessarea></businessarea>
    <treecode></treecode>
    <version_maj>0.1</version_maj>
    <fileid>f0fef700c-789d-11e1-86e6-f0c99bbca093</fileid>
    <objectdescription></objectdescription>
    <documentnr></documentnr>
    <remarks></remarks>
    <pstatus>im Probeeinsatz</pstatus>
    <docclass>Versionsdokument</docclass>
    <attrclass>Objektverwaltung</attrclass>
    <createdby>Grombach, Karsten</createdby>
    <createdbyproxy></createdbyproxy>
    <lastmodifiedby>Grombach, Karsten</lastmodifiedby>
    <lastmodifiedbyproxy></lastmodifiedbyproxy>
    <checkedoutby></checkedoutby>
    <checkedoutbyproxy></checkedoutbyproxy>
    <archivedat></archivedat>
    <archivedby></archivedby>
    <validdate>07.04.2012</validdate>
    <validmode></validmode>
    <numberfield1></numberfield1>
    <numberfield2></numberfield2>
    <numberfield3>Objektverwaltung</numberfield3>
    <eurofield1></eurofield1>
    <businesspartner></businesspartner>
    <textfield1></textfield1>
    <textfield2></textfield2>
    <textfield3></textfield3>
    <memofield1></memofield1>
    <multifield1></multifield1>
    <date1></date1>
    <date2></date2>
    <date3></date3>
    <checkbox1></checkbox1>
    <checkbox2></checkbox2>
    <createdat2></createdat2>
    <releasedat></releasedat>
    <releasedby></releasedby>
    <releasedbyproxy></releasedbyproxy>
    <movedat></movedat>
    <movedby></movedby>
    <movedbyproxy></movedbyproxy>
  </record>
</results>
*/Ext.define('Macros.model.foldertreeModel', {
    extend: 'Ext.data.NodeInterface',
    fields: [
        { name: 'id', type: 'int', mapping: 'Id' },
        { name: 'text', type: 'string', mapping: 'Text' },
        { name: 'leaf', type: 'boolean', mapping: 'Leaf' },
        { name: 'loaded', type: 'boolean', mapping: 'Loaded', defaultValue: false },
        { name: 'Properties'},
        { name: 'expanded', defaultValue: true }
    ]
});Ext.define('Macros.model.user', {
    extend: 'Ext.data.Model',
    fields: ['name', 'email']

});Ext.define('Macros.store.filesStore', {
    extend: 'Ext.data.Store',
    model: 'Macros.model.fileModel',
    entityid: "0",

    loadById: function(entitiyid){
        this.entityid=entitiyid;
        this.proxy.url = proxyUrl+'?entity=folder&id='+this.entityid;

        this.load();
    },

    proxy: new Ext.data.proxy.Ajax({
        url:proxyUrl+'?entity=folder&id=0',
        method:'get',
        reader: {
            type: 'xml',
            rootProperty : 'results',
            record: 'record'
        }
    })
});Ext.define('Macros.store.__foldertreeStore', {
    extend: 'Ext.data.TreeStore',
    model: 'Macros.model.foldertreeModel',
    //entityid: "10",
    autoLoad:false,
    defaultRootId: "8",
    root: {
        expanded: true,
        text: "Ordner",
        id: "8",
        leaf: false,
        expanded:false
    },
         listeners: {

                // Each demo.UserModel instance will be automatically
                // decorated with methods/properties of Ext.data.NodeInterface
                // (i.e., a "node"). Whenever a UserModel node is appended
                // to the tree, this TreeStore will fire an "append" event.
                append: function( thisNode, newChildNode, index, eOpts ) {
                    alert("appending");
                    debugger;
                    // If the node that's being appended isn't a root node, then we can
                    // assume it's one of our UserModel instances that's been "dressed
                    // up" as a node
                    if( !newChildNode.isRoot() ) {

                    }
                    else {
                        //this.appendChild(newChildNode);
                    }
                }
          }
        ,
/*
    loadChildren: function(parentId){
        this.proxy.url = proxyUrl+'?entity=foldertree&id='+parentId;
        this.load();
    },*/
    proxy: new Ext.data.proxy.Ajax({
        url:proxyUrl+'?entity=foldertree&id=8',
        method:'get',
        reader: {
            type: 'xml',
            rootProperty : 'results',
            record: 'record',
            idProperty: 'id'
        }
    })
});


Ext.define('Macros.store.foldertreeStore', {
    extend: 'Ext.data.TreeStore',
    //model:'Macros.model.foldertreeModel',
    root: {
        expanded: true,
        children: [
            { text: "Ordner",
                leaf: false,
                expanded: true,
                children:[
                    { text: "Test", leaf: false,
                        expanded: true,
                        id:"8",
                        children:[
                            { text: "Test2",
                                leaf: true,
                                id:"10"
                            },
                            { text: "Test3",
                                leaf: true,
                                id:"11"
                            },
                            { text: "Test4",
                                leaf: true,
                                id:"13"
                            },
                            { text: "Test5",
                                leaf: true,
                                id:"14"
                            }
                        ]},
                    { text: "Kaufprojekt", leaf: false}
                ]},
            { text: "Fonds",
                expanded: true,
                id:"7"
            },
            { text: "News", leaf: true },
            { text: "Vorlagen", leaf: true }
        ]
    }
});Ext.define('Macros.store.users', {
    extend: 'Ext.data.Store',
    model: 'Macros.model.user',
    data: [
        {name: 'Ed',    email: 'ed@sencha.com'},
        {name: 'Tommy', email: 'tommy@sencha.com'}
    ]
});
Ext.define('Macros.controller.fileController', {
    extend: 'Ext.app.Controller',

    views: [
        'file.list'
    ],
    stores: [
        'filesStore'
    ],
    models: [
        'fileModel'
    ],
    currentFile: null,
    init: function() {
        this.control({
            'filelist': {
                itemdblclick: this.editFile,
                itemclick: function(grid, record){
                    this.currentFile = record;
                    var ribbon = this.application.getController('ribbonController');
                    ribbon.toggle('file');
                }
            }
        });
    },
    editFile: function(grid, record) {
        alert("file click");
        //var view = Ext.widget('useredit');

        //view.down('form').loadRecord(record);
    },

    openFile: function(fileId){
        var fileid = this.currentFile.data.fileid;
        var url = macrosExeServerUrl + "miidoccgi.exe?getfile&dokid="+fileId+"&arbeitsmittel=1";
        window.open(url,'Download');
    },
    getFolderFiles:function(folderId, title){

        var idKey= 'dmsfolder'+folderId;
        var tabPanel = Ext.getCmp('maintabs');
        var tabIndex = tabPanel.items.findIndex("key",idKey);
        var view;
        if (tabIndex >-1)
        {
            view = tabPanel.items.items[tabIndex];
        }
        else
        {
            view = Ext.widget('filelist',{key:idKey, title:title});
            tabPanel.add(view);
        }
        tabPanel.setActiveTab(view);
        view.store.loadById(folderId);
        tabPanel.setActiveTab(view);
        tabPanel.doLayout();

        var ribbon = this.application.getController('ribbonController');
        ribbon.toggle('folder');
        this.init();
    },
    openFileAttributes:function() {

        var title = this.currentFile.get('title');
        var id = title;
        var tabPanel = Ext.getCmp('maintabs');
        var tabIndex = tabPanel.items.findIndex("key",id);
        var view;
        if (tabIndex >-1)
        {
            view = tabPanel.items.items[tabIndex];
        }
        else
        {
            view = Ext.widget('fileattributes',{title:title, fileid: this.currentFile.data.fileid});

            tabPanel.add(view);
        }

        tabPanel.setActiveTab(view);
        tabPanel.doLayout();
    },
    editFileAttributes : function() {
        var title = this.currentFile.get('title');
        var id = title;
        var tabPanel = Ext.getCmp('maintabs');
        var tabIndex = tabPanel.items.findIndex("key",id);
        var view;
        if (tabIndex >-1)
        {
            view = tabPanel.items.items[tabIndex];
        }
        else
        {
            view = Ext.widget('fileeditattributes',{title:title, fileid: this.currentFile.data.fileid});

            tabPanel.add(view);
        }

        tabPanel.setActiveTab(view);
        tabPanel.doLayout();

    }


});

Ext.define('Macros.controller.folderController', {
    extend: 'Ext.app.Controller',

    views: [
        'folder.tree'
    ],
    stores: [
        'foldertreeStore'
    ],
    models: [
        'foldertreeModel'
    ],
    init: function() {

        this.control({
            'foldertree':
            {
                itemclick: this.getFolderFiles
            }
        });
    },
    getFolderFiles: function(grid, record) {


        var fc = this.application.getController('fileController');
        fc.getFolderFiles(record.data.id, record.data.text);

    }
});

Ext.define('Macros.controller.ribbonController', {
    extend: 'Ext.app.Controller',

    toggle:function(ribbonGroupName, objectData){


        if (isInSharePoint){

            SpRibbonBinding.toggle(ribbonGroupName);
            return;
        }

        for(var i=0;i<this.ribbons.length;i++){
            var ribbon = this.ribbons[i];
            if (ribbon.id==ribbonGroupName){
                ribbon.show();
                if (objectData != null)
                    ribbon.objectData = objectData;
            }
            else
                ribbon.hide();
        }
    },
    refs :[{
        selector: '#macrosPanel',
        ref: 'MacrosArea'}
    ],

    ribbons:[],

    clickSearch : function(){
        Ext.getCmp("macrosPanel").setVisible(true);
    },

    openFileAttributes: function() {

        var ctrl = macrosApp.getController("fileController");
        return ctrl.openFileAttributes();
    },
    editFileAttributes : function() {
        var ctrl = macrosApp.getController("fileController");
        return ctrl.editFileAttributes();

    },

    openFile: function() {
        var ctrl = macrosApp.getController("fileController");
        return ctrl.openFile();

    },

    init: function() {


        if (isInSharePoint)
        {
            // ribbon binding is done in sharepoint
            return;
        }

        var startRibbon = Ext.widget('ribbonGroup',{renderTo:'ribbon',
            id:'start',
            items:[
                {
                    xtype:'ribbonAction',
                    text: "Suchen",
                    handler: this.clickSearch
                }
            ]

        });
        this.ribbons.push(startRibbon);

        var folderRibbon = Ext.widget('ribbonGroup',{renderTo:'ribbon',
            id:'folder',
            items:[
                {
                    xtype:'ribbonAction',
                    text: "Anzeigen",
                    handler: function() {
                        alert("click");
                    }
                },
                {
                    xtype:'ribbonAction',
                    text: "Suchen",
                    handler: null
                },
                {
                    xtype:'ribbonAction',
                    text: "Unterordner anlegen",
                    handler: null
                }
            ]

        });
        this.ribbons.push(folderRibbon);
        var fileRibbon = Ext.widget('ribbonGroup',{
            //that: this,
            renderTo:'ribbon',
            id:'file',
            items:[
                {
                    xtype:'ribbonAction',
                    text: "Attribute anzeigen",
                    ribbonGroup:fileRibbon,
                    handler: this.openFileAttributes
                },
                {
                    xtype:'ribbonAction',
                    text: "Document öffnen",
                    ribbonGroup:fileRibbon,
                    handler: this.openFile
                },
                {
                    xtype:'ribbonAction',
                    text: "Reattributen",
                    handler: this.editFileAttributes
                },
                {
                    xtype:'ribbonAction',
                    text: "Weitlerleiten",
                    handler: null
                }
            ]

        });
        this.ribbons.push(fileRibbon);

        this.toggle('start');


     /*   this.control({
            'list': {
                itemdblclick: this.editFile
            }
        });
        */
    }
});


Ext.define('Macros.controller.userController', {
    extend: 'Ext.app.Controller',

    views: [
        'user.list',
        'user.edit'
    ],
    stores: [
        'users'

    ],
    models: [
        'user'
    ],
    init: function() {
        this.control({
            'userlist': {
                itemdblclick: this.editUser
            }
        });
    },
    editUser: function(grid, record) {
        var view = Ext.widget('useredit');

        view.down('form').loadRecord(record);
    }
});
