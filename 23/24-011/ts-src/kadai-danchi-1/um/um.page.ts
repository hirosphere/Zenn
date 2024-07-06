import { Exist, dom, ef } from "../../meh/index.js";
import { navi } from "./index.js";

export type create_page = ( room : navi.Room ) => dom.defs.Node;

export type page_args =
{
	index : navi.Room;
	content : dom.defs.Node ;
};

export function PageA( args : page_args ) : dom.defs.Node
{
	return ef.main
	(
		ef.article
		(
			ef.h1( args.index.title, ),
			ef.p( args.index.path ),
			args.content,
			ef.p( "- 課題団地 -" ),
		)
	);

}
