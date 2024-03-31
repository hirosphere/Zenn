import { ef } from "../meh/index.js";
import * as models from "./models/navi.js";

export const Building = ( model : models.Building ) =>
{
	return ef.section
	(
		ef.h2( model.path ),
	);
};

