# Renn とは

内容として Order のアレイを持ち、
Rennに対する生成・消去・移動などの操作で
Order に順序を与え、Order が参照する source を順序で修飾するための「順序モデルオブジェクト」。

操作はそのつど Ref に伝えられ、View がモデルをリアクティブに反映するための情報を提供する。

## Renn 使い勝手スケッチ

### 生成

```
const renn = Renn < string > .from( [ "秋葉原", "浅草橋" ] );

renn.insert( [ "両国", "錦糸町" ] );
renn.insert( [ "御茶ノ水" ], 0 );

```

### 操作

```
renn.move( [ 3, 2 ], 0 );

const renn2 = Renn < string > .from( [ "高円寺", "阿佐ヶ谷" ] );
renn2.add( renn.range( 1, 2 ), 0 )

```

### 伝達
### 消去

```
const order = renn.at( 3 );

order.delete();

renn.terminate();
```

## Order 使い勝手スケッチ

### 移動

```
```

## Rennのプロパティー

### orders : Array < Order < Source > >

## Rennのメソッド

### create( sources, start )

### delete( orders )

### move( start, count, dest )

# Order とは

Leaf.Number を基底クラスとし、 Renn オブジェクトから与えられる位置情報を value にもち、
source を位置情報で修飾するもの。


## Order が持つ値

### renn

自身が所属する Renn 順序系を参照。
自身の削除操作や、関連 Order を得るのに必要。
移動操作で所属は変更されることがある。

### source

位置で修飾したい対象への参照。


# Renn.Ref 参照の役割

モデルとしての Renn オブジェクトが持つ順序情報の変更を、View に伝達し、反映させるための介在子。

## 伝達

### new_orders( start, orders )

新たな Order が作られたときに呼ばれる。

### move_orders( inserted, removed )

Orderが移動したときに呼ばれる。

### old_orders( orders )

Order が削除されるときに呼ばれる。



