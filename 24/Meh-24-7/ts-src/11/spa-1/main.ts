import { dom, ef, root } from "../../meh/index.js";
import * as um from "./um/um.js";
import { 号機ビュー } from "./ui/号機ビュー.js";

new um.Application( root );

dom.create( root, 号機ビュー(), "body" )
