
abstract class R
{
	abstract get value() : number;
}

abstract class RW extends R
{
	abstract override get value() : number;
	abstract override set value( v );
}

export class AR extends R
{
	override get value() : number { return 1 ; }
	// set value( v : number ) {}
}

export class ARW extends RW
{
	override get value() : number { return 1 ; }
	override set value( v : number ) {}
}

const r = new AR();
const rw = new ARW();

const x : R = rw ;
const y : RW = r;

x.value;
y.value = 5;
