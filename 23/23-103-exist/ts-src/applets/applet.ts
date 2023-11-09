import { ef, dom } from "../meh/index.js";
const { div, h2 } = ef;

export const Applet = ( { title, content } : { title : string, content : dom.defs.Parts } ) =>
{
	return div( { class: "applet" },
		h2( title ),
		div( { class: "applet-body" }, ... content ),
	);
};
