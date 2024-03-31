import { Exist, dom, ef } from "../../meh/index.js";
import { navi } from "./index.js";

export type create_page = ( room : navi.Room ) => dom.defs.Node;

export function PageA( index : navi.Room, content : dom.defs.Node ) : dom.defs.Node
{
	return ef.main
	(
		ef.article
		(
			ef.h1( index.title, ),
			ef.p( index.path ),
			content,
			ef.p( "- 課題団地 -" ),
		)
	);

}
