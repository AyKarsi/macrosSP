Ext.define('Macros.model.fileModel', {
    extend: 'Ext.data.Model',
    fields: ['title', 'author']

});Ext.define('Macros.model.foldertreeModel', {
    extend: 'Ext.data.Model',
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

});