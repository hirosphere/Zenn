import { model, root, Exist, Leafr } from "../meh/index.js";
import { dom, Nodet, ef, sf } from "../meh/index.js";
const log = console.log;

const existquest = () =>
{
	const ex1 = new Exist( root );
	const ex2 = new Exist( ex1 );
	const refs = new Exist.Refs();
	const ref = new Exist.Ref( refs );
	ref.source = ex1;
	ref.source = ex2;
	ref.terminate();
	ex1.terminate();
};

const domquest = () =>
{
	const { div } = ef;
	const nodet : Nodet = dom.create( root, div( "新橋", " ", "有楽町" ), "body" );
	log( nodet );
};

// existquest();
domquest();

export const name = "app";


