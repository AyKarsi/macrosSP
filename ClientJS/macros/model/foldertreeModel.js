Ext.define('Macros.model.foldertreeModel', {
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
});