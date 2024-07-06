import { dom, root, log } from "../meh/index.js";
import * as models from "./um/index.js";
import * as ui from "./ui/ui.app.js";

const vals = Object.values;

dom.create( root, await ui.App( new models.App( root ) ), "body" );
	