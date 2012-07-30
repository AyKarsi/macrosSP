var proxyUrl  = "http://localhost:88/Proxy/Default.aspx";
var macrosExeServerUrl = "http://wega.mi-m.de/edms/exe/";
var isInSharePoint = false;

Ext.Loader.setConfig({enabled:true});
Ext.Loader.setPath('Macros', '/macros');
Ext.require('Macros.view.ribbon.ribbonGroup');
Ext.require('Macros.view.ribbon.ribbonAction');
Ext.require('Macros.view.main.tabPanel');

Ext.require('Macros.controller.fileController');
Ext.require('Macros.store.documentMenuStore');
Ext.require('Macros.store.foldertreeStore');



Ext.require('Macros.model.documentMenuModel');
Ext.require('Macros.model.foldertreeModel');


Ext.require('Macros.store.users');




Ext.require('Macros.view.file.attributes');
Ext.require('Macros.view.file.editattributes');
Ext.require('Macros.view.ribbon.documentRibbon');




