import { Exist, ef, each, log } from "../../meh/index.js";
import * as m from "./index-model.js";

export const RootIndex = ( model : m.Index ) =>
{
	return ef.li
	(
		model.title,

		ef.ul
		(
			each
			(
				model.parts,
				order => ef.li( order.source.title )
			)
		),
	);
};
