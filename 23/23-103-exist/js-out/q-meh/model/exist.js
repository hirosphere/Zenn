const parts = Symbol();
class Owner {
    [parts] = new Set;
    terminate() {
        this[parts].forEach(part => part.terminate());
        this[parts].clear();
    }
}
const rootex = new Owner;
export class Exist extends Owner {
    constructor(owner) {
        super();
    }
    refs = new Set;
    releaseRef(ref) {
        this.refs.delete(ref);
    }
    terminate() {
        this.refs.forEach(ref => ref.terminate());
    }
}
(function (Exist) {
    class Ref {
        _source;
        constructor(_source) {
            this._source = _source;
        }
        get source() { return this._source; }
        release() {
            this._source?.releaseRef(this);
            delete this._source;
        }
        terminate() {
            this.release();
        }
    }
    Exist.Ref = Ref;
})(Exist || (Exist = {}));
const set = Symbol();
const get = Symbol();
export class Leaf extends Exist {
    _value;
    /**  */
    constructor(owner, _value) {
        super(owner);
        this._value = _value;
    }
    [get]() { return this._value; }
    [set](value, ref) {
        this.refs.forEach(ref => { if (ref instanceof Leaf.Ref)
            ref.change(); });
    }
}
(function (Leaf) {
    class Ref extends Exist.Ref {
        constructor(source) {
            super(source);
        }
        get value() {
            return this.source instanceof Leaf && this.source[get]() || undefined;
        }
        set value(value) {
            this.source instanceof Leaf && this.source[set](value, this);
        }
        change() { }
    }
    Leaf.Ref = Ref;
    class RO extends Leaf {
        get value() { return this._value; }
    }
    Leaf.RO = RO;
})(Leaf || (Leaf = {}));
const r = new Leaf.Ref(new Leaf(rootex, "A aa"));
r.value = "";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhpc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90cy1zcmMvcS1tZWgvbW9kZWwvZXhpc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsTUFBTSxLQUFLLEdBQUcsTUFBTSxFQUFFLENBQUM7QUFFdkIsTUFBTSxLQUFLO0lBRVYsQ0FBRSxLQUFLLENBQUUsR0FBRyxJQUFJLEdBQWEsQ0FBRTtJQUV4QixTQUFTO1FBRWYsSUFBSSxDQUFFLEtBQUssQ0FBRSxDQUFDLE9BQU8sQ0FBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBRSxDQUFDO1FBQ2xELElBQUksQ0FBRSxLQUFLLENBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUN2QixDQUFDO0NBQ0Q7QUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFJLEtBQUssQ0FBQztBQUV6QixNQUFNLE9BQU8sS0FBTSxTQUFRLEtBQUs7SUFFL0IsWUFBYSxLQUFhO1FBRXpCLEtBQUssRUFBRSxDQUFDO0lBQ1QsQ0FBQztJQUVTLElBQUksR0FBRyxJQUFJLEdBQWlCLENBQUU7SUFFakMsVUFBVSxDQUFFLEdBQWU7UUFFakMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUUsR0FBRyxDQUFFLENBQUM7SUFDekIsQ0FBQztJQUVNLFNBQVM7UUFFZixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBRSxDQUFDO0lBQzdDLENBQUM7Q0FDRDtBQUVELFdBQWlCLEtBQUs7SUFFckIsTUFBYSxHQUFHO1FBSUo7UUFGWCxZQUVXLE9BQTJCO1lBQTNCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQ3BDLENBQUM7UUFFSCxJQUFXLE1BQU0sS0FBeUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUV6RCxPQUFPO1lBRWIsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUUsSUFBSSxDQUFFLENBQUM7WUFDakMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3JCLENBQUM7UUFFTSxTQUFTO1lBRWYsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hCLENBQUM7S0FDRDtJQW5CWSxTQUFHLE1BbUJmLENBQUE7QUFDRixDQUFDLEVBdEJnQixLQUFLLEtBQUwsS0FBSyxRQXNCckI7QUFHRCxNQUFNLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQztBQUNyQixNQUFNLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQztBQUVyQixNQUFNLE9BQU8sSUFBVyxTQUFRLEtBQUs7SUFJRztJQUZ2QyxPQUFPO0lBRVAsWUFBYyxLQUFhLEVBQVksTUFBVTtRQUVoRCxLQUFLLENBQUUsS0FBSyxDQUFFLENBQUM7UUFGdUIsV0FBTSxHQUFOLE1BQU0sQ0FBSTtJQUdqRCxDQUFDO0lBRU0sQ0FBRSxHQUFHLENBQUUsS0FBUyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUUsR0FBRyxDQUFFLENBQUUsS0FBUyxFQUFFLEdBQXNCO1FBRW5ELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQ3RCLElBQUksR0FBRyxZQUFZLElBQUksQ0FBQyxHQUFHO1lBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUMvQyxDQUFDO0lBQ0gsQ0FBQztDQUNEO0FBRUQsV0FBaUIsSUFBSTtJQUVwQixNQUFhLEdBQVUsU0FBUSxLQUFLLENBQUMsR0FBRztRQUV2QyxZQUFhLE1BQW1CO1lBRS9CLEtBQUssQ0FBRSxNQUFNLENBQUUsQ0FBQztRQUNqQixDQUFDO1FBRUQsSUFBVyxLQUFLO1lBRWYsT0FBTyxJQUFJLENBQUMsTUFBTSxZQUFZLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFFLEdBQUcsQ0FBRSxFQUFFLElBQUksU0FBUyxDQUFDO1FBQ3pFLENBQUM7UUFFRCxJQUFXLEtBQUssQ0FBRSxLQUFxQjtZQUV0QyxJQUFJLENBQUMsTUFBTSxZQUFZLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFFLEdBQUcsQ0FBRSxDQUFFLEtBQUssRUFBRSxJQUFJLENBQUUsQ0FBQztRQUNsRSxDQUFDO1FBRU0sTUFBTSxLQUFXLENBQUM7S0FDekI7SUFsQlksUUFBRyxNQWtCZixDQUFBO0lBRUQsTUFBYSxFQUFTLFNBQVEsSUFBVTtRQUV2QyxJQUFJLEtBQUssS0FBUyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0tBQ3ZDO0lBSFksT0FBRSxLQUdkLENBQUE7QUFDRixDQUFDLEVBMUJnQixJQUFJLEtBQUosSUFBSSxRQTBCcEI7QUFFRCxNQUFNLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUUsSUFBSSxJQUFJLENBQWMsTUFBTSxFQUFFLE1BQU0sQ0FBRSxDQUFFLENBQUM7QUFFakUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMifQ==