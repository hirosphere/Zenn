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
    [setRoValue](readonlykey, value, sender) {
        if (readonlykey == this.args?.readonlykey)
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