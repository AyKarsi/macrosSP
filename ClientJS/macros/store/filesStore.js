Ext.define('Macros.store.filesStore', {
    extend: 'Ext.data.Store',
    model: 'Macros.model.fileModel',
/*    data: [
        {name: 'Ed',    email: 'ed@sencha.com'},
        {name: 'Tommy', email: 'tommy@sencha.com'}
    ],
    */

   loadFromMacros: function(){
       //http://flxhr.flensed.com/

       $.flXHRproxy.registerOptions("http://wega.mi-m.de/",{xmlResponseText:true});

       $.ajax({
           method:'get',
           type:'xml',
           url : 'http://wega.mi-m.de/edms/exe/eb.exe?cfgs=../cfgs/dmsfolders.cfg&p=list&MaskName=lhitsxml&folderid=10',
           success:function(data){
               alert("data:"+data);
           }
       });


    }


    /*
    proxy: new Ext.data.proxy.Ajax({
        url : 'http://wega.mi-m.de/edms/exe/eb.exe?cfgs=../cfgs/dmsfolders.cfg&p=list&MaskName=lhitsxml&folderid=10',
        method:'get',
        reader: {
            type: 'xml',
            rootProperty : 'results',
            record: 'record'
        }
    }) */
});