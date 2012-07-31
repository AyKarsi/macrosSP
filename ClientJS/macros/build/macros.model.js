Ext.define('Macros.model.documentMenuModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'doctemplate', type: 'string' , mapping:'doctemplate@text'},
        { name: 'doctemplate_url', type: 'string' , mapping:'doctemplate'},
        { name: 'projectdata', type: 'string' , mapping:'projectdata@text'},
        { name: 'projectdata_url', type: 'string' , mapping:'projectdata'},
        { name: 'display', type: 'string' , mapping:'display@text'},
        { name: 'display_url', type: 'string' , mapping:'display'},
        { name: 'displayarchived', type: 'string' , mapping:'displayarchived@text'},
        { name: 'displayarchived_url', type: 'string' , mapping:'displayarchived'},
        { name: 'checkout', type: 'string' , mapping:'checkout@text'},
        { name: 'checkout_url', type: 'string' , mapping:'checkout'},
        { name: 'checkoutback', type: 'string' , mapping:'checkoutback@text'},
        { name: 'checkoutback_url', type: 'string' , mapping:'checkoutback'},
        { name: 'docedit', type: 'string' , mapping:'docedit@text'},
        { name: 'docedit_url', type: 'string' , mapping:'docedit'},
        { name: 'checkin', type: 'string' , mapping:'checkin@text'},
        { name: 'checkin_url', type: 'string' , mapping:'checkin'},
        { name: 'reattr', type: 'string' , mapping:'reattr@text'},
        { name: 'reattr_url', type: 'string' , mapping:'reattr'},
        { name: 'move', type: 'string' , mapping:'move@text'},
        { name: 'move_url', type: 'string' , mapping:'move'},
        { name: 'delete', type: 'string' , mapping:'delete@text'},
        { name: 'delete_url', type: 'string' , mapping:'delete'}

    ]
});
Ext.define('Macros.model.fileModel', {
    extend: 'Ext.data.Model',
    fields: ['title', 'author', 'fileid', 'createdat','lastmodifiedat' ]

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
   // alias : 'widget.foldertreeModel',
    //extend: 'Ext.data.NodeInterface',
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int'},
        { name: 'text', type: 'string', mapping:'path'},
        { name: 'leaf', type: 'boolean', mapping: 'Leaf' },
        { name: 'loaded', type: 'boolean', mapping: 'Loaded', defaultValue: false },
        { name: 'Properties'},
        { name: 'expanded', defaultValue: false }
    ]
});Ext.define('Macros.model.user', {
    extend: 'Ext.data.Model',
    fields: ['name', 'email']

});