import { dom } from "../meh/index.js";
import * as ql  from "./q-leaf.js";
import * as qn from "./q-nodet.js";
import { ListApp } from "./q-list.js";

ql.main();
qn.main();

dom.add( ListApp(), "body" );
