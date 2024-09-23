const a = 1;

import { navi, dom, ef, root, log } from "../../meh/index.js";
import * as im from "./index-model.js";
import * as iv from "./index-view.js";

dom.create( root, iv.App( new im.App( root ) ), "html" );
