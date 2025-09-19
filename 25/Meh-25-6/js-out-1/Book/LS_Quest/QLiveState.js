/*
    Live
        Number
        String
        Boolean
        BigInt


        easyNew
*/
/*
    Ease < V >
        Ease < V > ( value : V )
*/
/*
    LiveState 用途別難易度

    「きっちり」
        「メンバーコンストラクタとデフォルト値」しっかり定義

    「簡単」
        リテラルタイプとリテラルデータを与えるだけ

*/
const ud = undefined;
/* 実装 */
export class LiveBase {
    set $(lv) { this.set(lv); }
    get $() { return this.get(); }
    addRef(ref) {
        this.#_refs.add(ref);
        ref.vChan(ud);
    }
    removeRef(ref) {
        this.#_refs.delete(ref);
    }
    #_refs = new Set;
}
export var Live;
(function (Live) {
    /* Leaf */
    Live.NewLeaf = (defv) => {
        return class Leaf extends LiveBase {
            constructor(value) {
                super();
                this.#_value = value;
            }
            get() { return this.#_value; }
            set(lv) {
                this.#_value = lv;
            }
            get defv() {
                return defv;
            }
            #_value;
        };
    };
    class Number extends Live.NewLeaf(0) {
    }
    Live.Number = Number;
    class String extends Live.NewLeaf("") {
    }
    Live.String = String;
    class Boolean extends Live.NewLeaf(false) {
    }
    Live.Boolean = Boolean;
    class BigInt extends Live.NewLeaf(0n) {
    }
    Live.BigInt = BigInt;
    /* Branch */
    Live.NewBranch = (def) => {
        const rt = class extends LiveBase {
            set(lv) {
                ;
            }
            get() {
                return {};
            }
            get defv() {
                return {};
            }
        };
        return rt;
    };
})(Live || (Live = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUxpdmVTdGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3RzLXNyYy9Cb29rL0xTX1F1ZXN0L1FMaXZlU3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUE7Ozs7Ozs7OztFQVNFO0FBRUY7OztFQUdFO0FBRUY7Ozs7Ozs7OztFQVNFO0FBRUYsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFFO0FBZ0Z0QixRQUFRO0FBRVIsTUFBTSxPQUFnQixRQUFRO0lBRTdCLElBQVcsQ0FBQyxDQUFHLEVBQVEsSUFBSyxJQUFJLENBQUMsR0FBRyxDQUFHLEVBQUUsQ0FBRSxDQUFFLENBQUMsQ0FBQztJQUMvQyxJQUFXLENBQUMsS0FBWSxPQUFPLElBQUksQ0FBQyxHQUFHLEVBQUcsQ0FBRSxDQUFDLENBQUM7SUFLdkMsTUFBTSxDQUFHLEdBQWM7UUFFN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUcsR0FBRyxDQUFFLENBQUU7UUFDekIsR0FBRyxDQUFDLEtBQUssQ0FBRyxFQUFFLENBQUUsQ0FBRTtJQUNuQixDQUFDO0lBRU0sU0FBUyxDQUFHLEdBQWM7UUFFaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUcsR0FBRyxDQUFFLENBQUU7SUFDN0IsQ0FBQztJQUVELE1BQU0sR0FBRyxJQUFJLEdBQWdCLENBQUU7Q0FHL0I7QUFJRCxNQUFNLEtBQVcsSUFBSSxDQWtFcEI7QUFsRUQsV0FBaUIsSUFBSTtJQUVwQixVQUFVO0lBRUcsWUFBTyxHQUFHLENBQVUsSUFBVSxFQUF1QixFQUFFO1FBRW5FLE9BQU8sTUFBTSxJQUFLLFNBQVEsUUFBZ0I7WUFFekMsWUFBYyxLQUFXO2dCQUV4QixLQUFLLEVBQUcsQ0FBRTtnQkFDVixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBRTtZQUN2QixDQUFDO1lBRWUsR0FBRyxLQUFZLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBRSxDQUFDLENBQUM7WUFDdEMsR0FBRyxDQUFHLEVBQVE7Z0JBRTdCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFFO1lBQ3BCLENBQUM7WUFFRCxJQUF1QixJQUFJO2dCQUUxQixPQUFPLElBQUksQ0FBRTtZQUNkLENBQUM7WUFFRCxPQUFPLENBQVE7U0FDZixDQUFBO0lBQ0YsQ0FBQyxDQUFBO0lBR0QsTUFBYSxNQUFPLFNBQVEsS0FBQSxPQUFPLENBQUcsQ0FBQyxDQUFFO0tBQUc7SUFBL0IsV0FBTSxTQUF5QixDQUFBO0lBQzVDLE1BQWEsTUFBTyxTQUFRLEtBQUEsT0FBTyxDQUFHLEVBQUUsQ0FBRTtLQUFHO0lBQWhDLFdBQU0sU0FBMEIsQ0FBQTtJQUM3QyxNQUFhLE9BQVEsU0FBUSxLQUFBLE9BQU8sQ0FBRyxLQUFLLENBQUU7S0FBRztJQUFwQyxZQUFPLFVBQTZCLENBQUE7SUFDakQsTUFBYSxNQUFPLFNBQVEsS0FBQSxPQUFPLENBQUcsRUFBRSxDQUFFO0tBQUc7SUFBaEMsV0FBTSxTQUEwQixDQUFBO0lBSTdDLFlBQVk7SUFFQyxjQUFTLEdBQUcsQ0FFeEIsR0FBUSxFQUVhLEVBQUU7UUFFdkIsTUFBTSxFQUFFLEdBQUcsS0FBTSxTQUFRLFFBQWdCO1lBR3hCLEdBQUcsQ0FBRyxFQUFRO2dCQUU3QixDQUFDO1lBQ0YsQ0FBQztZQUVlLEdBQUc7Z0JBRWxCLE9BQU8sRUFBUyxDQUFFO1lBQ25CLENBQUM7WUFFRCxJQUF1QixJQUFJO2dCQUUxQixPQUFPLEVBQVMsQ0FBRTtZQUNuQixDQUFDO1NBQ0QsQ0FBQTtRQUVELE9BQU8sRUFBUyxDQUFFO0lBQ25CLENBQUMsQ0FBQTtBQUNGLENBQUMsRUFsRWdCLElBQUksS0FBSixJQUFJLFFBa0VwQiJ9