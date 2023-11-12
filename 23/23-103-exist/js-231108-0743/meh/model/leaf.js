const log = console.log;
//  Leafから変更通知を受け取るRefの作成と、Leaf値のstringへの変換を受け持ち、  //
//  NodetのAttr, Style, Part など、あらゆる値をリアクティブ化。  //
export class StringSource {
}
//  LeafRo : 書き込み防止機能付き　プリミティブ値オブジェクト  //
export const setRoValue = Symbol();
class LeafRo extends StringSource {
    args;
    _value;
    refs = new Set;
    constructor(value, args) {
        super();
        this.args = args;
        this._value = value;
    }
    // ref //
    cv(toref) {
        return new ConvStrSrc(this, toref);
    }
    toString() { return String(this._value); }
    createRef(update) {
        const ref = new RefImpl(this, update);
        this.refs.add(ref);
        return ref;
    }
    removeRef(ref) {
        this.refs.delete(ref);
    }
    // value //
    get v() { return this._value; }
    get val() { return this._value; }
    get value() { return this._value; }
    get() { return this._value; }
    [setRoValue](owner, value, sender) {
        if (owner == this.args?.owner)
            this._set(value, sender);
    }
    _set(value, sender) {
        if (value === this._value)
            return;
        const old = this._value;
        this._value = value;
        this.args?.rel?.(value, old);
        this.refs.forEach(ref => ref.update(value, old));
    }
    // life //
    delete() {
        this.refs.forEach(ref => ref.release());
        delete this.args;
    }
}
export class Leaf extends LeafRo {
    get v() { return this._value; }
    get val() { return this._value; }
    get value() { return this._value; }
    set v(value) { this._set(value); }
    set val(value) { this._set(value); }
    set value(value) { this.set(value); }
    set(value, sender) { this._set(value, sender); }
}
// Readonly //
(function (Leaf) {
    class String extends Leaf {
    }
    Leaf.String = String;
    ;
    class Number extends Leaf {
    }
    Leaf.Number = Number;
    ;
    class Boolean extends Leaf {
    }
    Leaf.Boolean = Boolean;
    ;
    class Ro extends LeafRo {
    }
    Leaf.Ro = Ro;
    (function (Ro) {
        class String extends LeafRo {
        }
        Ro.String = String;
        ;
        class Number extends LeafRo {
        }
        Ro.Number = Number;
        ;
        class Boolean extends LeafRo {
        }
        Ro.Boolean = Boolean;
        ;
    })(Ro = Leaf.Ro || (Leaf.Ro = {}));
})(Leaf || (Leaf = {}));
class RefImpl {
    source;
    _update;
    constructor(source, _update) {
        this.source = source;
        this._update = _update;
        this.source && this._update?.(this.source.value);
    }
    update(value, old) {
        this._update?.(value, old);
    }
    release() {
        if (this.source == null)
            return;
        this.source.removeRef(this);
        this.source = null;
        this._update = null;
    }
}
//  //
class ConvStrSrc extends StringSource {
    source;
    toref;
    constructor(source, toref) {
        super();
        this.source = source;
        this.toref = toref;
    }
    createRef(update) { return this.source.createRef(update); }
    toString() { return this.toref(this.source.value); }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9tZWgvbW9kZWwvbGVhZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBVXhCLHFEQUFxRDtBQUNyRCxpREFBaUQ7QUFFakQsTUFBTSxPQUFnQixZQUFZO0NBSWpDO0FBRUQseUNBQXlDO0FBRXpDLE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxNQUFNLEVBQUUsQ0FBQztBQUVuQyxNQUFNLE1BQWEsU0FBUSxZQUFZO0lBS0o7SUFIeEIsTUFBTSxDQUFLO0lBQ1gsSUFBSSxHQUFHLElBQUksR0FBcUIsQ0FBRTtJQUU1QyxZQUFhLEtBQVMsRUFBWSxJQUF1QjtRQUV4RCxLQUFLLEVBQUUsQ0FBQztRQUZ5QixTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUd4RCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQsU0FBUztJQUVGLEVBQUUsQ0FBRSxLQUErQjtRQUV6QyxPQUFPLElBQUksVUFBVSxDQUFTLElBQUksRUFBRSxLQUFLLENBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRU0sUUFBUSxLQUFLLE9BQU8sTUFBTSxDQUFFLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFDLENBQUM7SUFFNUMsU0FBUyxDQUFFLE1BQTBCO1FBRTNDLE1BQU0sR0FBRyxHQUFHLElBQUksT0FBTyxDQUFTLElBQUksRUFBRSxNQUFNLENBQUUsQ0FBQztRQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBRSxHQUFHLENBQUUsQ0FBQztRQUNyQixPQUFPLEdBQUcsQ0FBQztJQUNaLENBQUM7SUFFTSxTQUFTLENBQUUsR0FBbUI7UUFFcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUUsR0FBRyxDQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELFdBQVc7SUFFWCxJQUFXLENBQUMs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