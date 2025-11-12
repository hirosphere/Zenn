const log = console.log;
export class IDB {
    schema;
    stores = new Map;
    get core() { return this.#_core; }
    constructor(schema) {
        this.schema = schema;
    }
    init() {
        try {
            const oreq = indexedDB.open(this.schema.name, this.schema.version);
            oreq.onsuccess = ev => {
                this.#_core = oreq.result;
                this.#_available = true;
                log("IDB init onsuccess", this.schema);
                this.on_init();
                this.#_inits.forEach(oper => oper());
            };
            oreq.onupgradeneeded = ev => {
                log("upgrade", ev);
                make_store(oreq.result, this.stores);
            };
            oreq.onerror = ev => {
                log("IDB init onerror", ev);
            };
        }
        catch (err) {
            log(err);
        }
    }
    set inits(oper) {
        if (this.#_available)
            oper();
        else
            this.#_inits.push(oper);
    }
    #_core;
    #_available = false;
    #_inits = [];
    on_init() { }
}
const make_store = (db, stores) => {
    stores.forEach(store => {
        if (db.objectStoreNames.contains(store.name) == false) {
            db.createObjectStore(store.name, store.param);
            log("ストア作成", store.name);
        }
    });
};
(function (IDB) {
    class Store {
        db;
        name;
        param;
        constructor(db, name, param) {
            this.db = db;
            this.name = name;
            this.param = param;
            db.stores.set(name, this);
        }
        add(value, tr) {
            const db = this.db.core;
            if (!db)
                return;
            tr ??= db.transaction([this.name], "readwrite");
            const req = tr.objectStore(this.name).add(value);
            req.onsuccess = () => log(this.name, "add", value);
        }
        set(value, tr) {
            const db = this.db.core;
            if (!db)
                return false;
            tr ??= db.transaction([this.name], "readwrite");
            const req = tr.objectStore(this.name).put(value);
            req.onsuccess = () => log(this.name, "set", value);
            return true;
        }
        async get(key, tr) {
            const f = (resolve, reject) => {
                try {
                    if (!this.db.core) {
                        log("IDB.Store get", "コアがないよ。");
                        resolve(undefined);
                        return;
                    }
                    tr ??= this.db.core.transaction([this.name], "readonly");
                    if (!tr) {
                        log("IDB.Store get", "transaction がないよ。");
                        resolve(undefined);
                        return;
                    }
                    const st = tr.objectStore(this.name);
                    const g_req = st.get(key);
                    g_req.onsuccess = ev => {
                        log("IDB.Store get onsuccess", g_req.result);
                        resolve(g_req.result);
                    };
                    g_req.onerror = ev => {
                        log("IDB.Store get", "get req エラーだよ。");
                        resolve(undefined);
                    };
                }
                catch (err) {
                    log("IDB.Store get : 未作成ストア", this.db.schema.name, this.name);
                    resolve(undefined);
                }
            };
            return new Promise(f);
        }
    }
    IDB.Store = Store;
})(IDB || (IDB = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViLWRiLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHMtc3JjL01laC9BcHAvd2ViLWRiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUU7QUFjekIsTUFBTSxPQUFPLEdBQUc7SUFLZTtJQUhkLE1BQU0sR0FBRyxJQUFJLEdBQThDLENBQUU7SUFDN0UsSUFBVyxJQUFJLEtBQWdDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFDLENBQUM7SUFFckUsWUFBOEIsTUFBaUI7UUFBakIsV0FBTSxHQUFOLE1BQU0sQ0FBVztJQUM5QyxDQUFDO0lBRUssSUFBSTtRQUVWLElBQ0EsQ0FBQztZQUNBLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUUsQ0FBRTtZQUV4RSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxFQUFFO2dCQUVyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUU7Z0JBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFFO2dCQUV6QixHQUFHLENBQUcsb0JBQW9CLEVBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBRSxDQUFFO2dCQUU1QyxJQUFJLENBQUMsT0FBTyxFQUFHLENBQUU7Z0JBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFHLENBQUUsQ0FBRTtZQUMzQyxDQUFDLENBQUE7WUFFRCxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxFQUFFO2dCQUUzQixHQUFHLENBQUcsU0FBUyxFQUFHLEVBQUUsQ0FBRSxDQUFFO2dCQUN4QixVQUFVLENBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRyxJQUFJLENBQUMsTUFBTSxDQUFF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