
type macros\controller\*.js > macros\build\macros.controller.js
type macros\view\file\*.js,macros\view\folder\*.js,macros\view\folder\*.js,macros\view\main\*.js,macros\view\ribbon\*.js,macros\view\user\*.js > macros\build\macros.view.js

type macros\model\*.js > macros\build\macros.model.js
type macros\store\*.js > macros\build\macros.store.js
type macros\ux\*.js > macros\build\macros.ux.js
type macros\*.js > macros\build\macros.app.js

type macros\app.js,macros\Sp.RibbonBinding.js, macros\build\macros.ux.js,macros\build\macros.view.js,macros\build\macros.model.js,macros\build\macros.store.js,macros\build\macros.controller.js > macros.app.noConfig.js


type macros\macros.config.js, macros.app.noConfig.js  > macros.app.js
type macros\macros.config.spdev.js,macros.app.noConfig.js  >  macros.app.sp.js
type macros\macros.config.buildTest.js,macros.app.noConfig.js  >  macros.app.buildTest.js


