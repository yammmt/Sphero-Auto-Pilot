# Simple Branch
簡潔な (最低限の) Sphero の自動操縦プログラム

## About
Sphero が加速しながら前へと進んでいきます。  
何かにぶつかると減速し、 90 度進行方向を変更します。  

___

## 準備

- モジュールをインストール

```bash
npm install
```

- main.jsを編集

```js
var port = "COM7"; // 自分の Sphero の ID に置き換える
```
Spheroのシリアルポートにしておく。
シリアルポートの取得は[こちら](https://github.com/comozilla/Sphero-wakuwaku/wiki/%E7%92%B0%E5%A2%83%E8%A8%AD%E5%AE%9A)を参照。

## main.js 内関数について

### connect

Spheroに接続された時に呼び出されます

### loop

loopIntervalで指定した間隔（ミリ秒）で呼び出されます。

### collision

衝突時に呼び出されます。

## License
[MIT License](http://wisdommingle.com/mit-license/)
