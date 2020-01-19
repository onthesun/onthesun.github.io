# Web mic
 
 ブラウザでアクセスするだけでスマートフォンがマイク代わりになるシステム。
 
## 概要
 
WebRTC (SkyWay) を使って特別なアプリをインストールすることなく通話を実現する。
下記サイトにアクセスするとスマートフォンで喋った音声がラズパイから出力される!
 
 https://onthesun.github.io/host/
<div align="center">
<img src="https://onthesun.github.io/images/WebMicQR.gif" width=50%>
</div>
 
## 動作説明
 
 1. Web Server から Web アプリをロード
 2. SkyWay のシグナリングサーバと接続
 3. SkyWay サーバを経由して（SFU モード）スマートフォンからラズベリーパイへオーディオストリームを流す
<div align="center">
<img src="https://onthesun.github.io/images/WebMic.png" width=100%>
</div>

## Requirement

 * Raspberry Pi にインストールしたソフト（全部必要か不明）
   * npm 6.13.4
   * node v12.14.0

 * 確認環境
   * Raspberry Pi 3 Model B
     * Linux ontheyopi 4.19.66-v7+ #1253 SMP Thu Aug 15 11:49:46 BST 2019 armv7l GNU/Linux
     * Chromium 72.0.3626.121（Official Build）Built on Raspbian , running on Raspbian 9.11 （32 ビット）
   * iPhone X
     * iOS 13.3
     * Safari

## Installation

* Raspberry Pi
  * 下記のようにインストール
    ```bash
    sudo apt-get update
    sudo apt-get install -y nodejs npm
    sudo npm cache clean
    sudo npm install npm n -g
    sudo n stable
    ```
  * 起動時にブラウザを起動するよう設定
    1. /etc/systemd/system/open-browser.service を作成、編集
       ```
       TBD
       ```
    2. 下記を実行
       ```
       TBD
       ```
  * プロキシ設定
    * TBD

* SkyWay
  * アカウント作成
    * https://console-webrtc-free.ecl.ntt.com/users/registration
  * アプリケーション作成
    * https://console-webrtc-free.ecl.ntt.com/add
    * 作成したら API キーを Host 側、Mixer 側 両方の script.js に反映する

* WebServer
  * Web アプリをホスティングする (このリポジトリでよければ何もする必要はない)
    * https じゃないとダメかも (未確認)
    * スマホで host 側にアクセス
    * ラズパイで mixer 側にアクセス

# Usage
 
DEMOの実行方法など、"hoge"の基本的な使い方を説明する
 
```bash
git clone https://github.com/hoge/~
cd examples
python demo.py
```
 
# Note
 
注意点などがあれば書く
 
# Author
 
作成情報を列挙する
 
* 作成者
* 所属
* E-mail
 
# License
ライセンスを明示する
 
"hoge" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).
 
社内向けなら社外秘であることを明示してる
 
"hoge" is Confidential.

