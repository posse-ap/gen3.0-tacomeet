## flexbox

[日本語対応！CSS Flexboxのチートシートを作ったので配布します | Webクリエイターボックス](https://www.webcreatorbox.com/tech/css-flexbox-cheat-sheet)


## todo
- [] logo in a tag
- [] sass
- [] BEM記法

## try

- ロゴhoverを色付き画像にする
- scroll downした時にアニメーションをつける
- marginだけじゃなくてpadding使う
- レスポンシブ
- sass


## feedback

### Naoki-san
- imgタグのwidthとかもcssで設定した方が良い
- imgタグはdivタグで囲んであげる

### Kazuki-san
- flex boxは幅だけ見るから、space-aroundとかは要素のサイズだけ調節してあげれば均等に並ぶ（divで画像を囲んでいる時とかは、marginで調節してあげる）
- 'container' はクラス名におすすめ
- [classの命名方法参考記事](https://html-coding.co.jp/knowhow/tips/naming-rule/)
- z-indexってどうやって管理するのがいいの？ -> 0から増やしていく感じ
```
/* todo: これってあり？divで包んでwidthとか設定した方が良いって言われた */
img {
  width: 100%;
}
```
- 毎回divでimgを囲むならいいんちゃう？
- そうじゃないなら逆に面倒臭いかも

### tomoaki-san
- position使いがち (topのテキスト部分はabsolute使わなくてもいけるかも)
- %とか使ってあげた方が良い（rem, em）
- header分 main をずらす方法はposition: absolute使った方が良いかも
- reset.css使ってもいいかも
- brタグじゃなくて、pタグを行数分作る方法もある

どこまでデザイン（Figma）に合わせるべき？
- デザイナーと話す
- 意図を汲み取る
- シンハの時はガッチリしたデザインは貰えないかも（「センターに持ってきてください」とか）

### miyuki-san

- divとpで余分に囲っているかも
```html
 <div class="text">
  <p>
    学生プログラミングコミュニティ「POSSE(ポッセ)」は、人格とプログラミング、二つの面での成長をスローガンに活動しており、大学生だけが集まって学びを深めるコミュニティです。
    プログラミングだけではありません。オフラインでのイベントや、旅行など様々な企画を行っています！
    それらを通じて、夏休みの大半をPOSSEで出来た仲間と過ごす人もたくさんいるほどメンバーとの仲が深まります。
  </p>
</div>
```
- imgをdivで囲むメリットは調整がしやすいから？（marginとかを使わずに真ん中に持って行けたりする）

## シンハ対策

- チームここまでできたら何点
- 応用は個人で何点

- 難しいcssとか？
- animation
- レスポンシブ 
- position relative, absolute
- 擬似要素 (hover, before, after)


もしかしたら...
- grid, 要素の横並び
- 3Dアニメーション（ルービックキューブ）

### 採点
- 見た目からだけどコード見られることもある
- 
