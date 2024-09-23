import { dom, root, log } from "../../meh/index.js";
import { App } from "./view.js";
import * as m from "./modes.js";

log( "POKE-SEARCH V-1.1" );

dom.create( root, App( new m.PokeList( root ) ), "#root" );
