export * from "./Util.js" ;
export * as Model from "./Model/Model.js" ;
export { Life , State , Leaf , leaf , ll , llr , Branch , Renn } from "./Model/Model.js" ;
export * as DOM from "./DOM/DOM.js" ;
export { DD , ef , sf , pl } from "./DOM/DOM.js" ;


import { State } from "./Model/Model.js" ;
export type Number = State < number > ;
