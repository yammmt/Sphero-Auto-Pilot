# Simple Branch
簡潔な (最低限の) Sphero の自動操縦プログラム

## About
Sphero が加速しながら前へと進んでいきます。  
何かにぶつかると減速し、 90 度進行方向を変更します。  

___

## Quick start

- モジュールをインストール

```bash
npm install
```

- main.jsを編集

```js
var orb = sphero("/dev/tty.Sphero-YRW-AMP-SPP"); // 自分の Sphero の ID に置き換える
```
Spheroのシリアルポートにしておく。
シリアルポートの取得は[こちら](https://github.com/comozilla/Sphero-wakuwaku/wiki/%E7%92%B0%E5%A2%83%E8%A8%AD%E5%AE%9A)を参照。

## License
[MIT License](http://wisdommingle.com/mit-license/)
