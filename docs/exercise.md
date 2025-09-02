# 課題

Hatena SUMMER INTERNSHIP 2025では、用意されたブログシステムに追加の機能を実装してもらいます。ブログシステムは複数のサービスから成りますが、特に「記法変換サービス」を実装するのが、皆さんの課題です。

## 準備

### ブランチの用意

- [hatena/Hatena-Intern-2025](https://github.com/hatena/Hatena-Intern-2025)に、課題に取り組むために必要なコードがあります。このリポジトリで自分のはてなIDの名前のブランチを作成してください
- 課題に取り組む際は、最初に作った自分のはてなIDの名前のブランチをベースとして、そこからブランチを切る / そこにブランチをマージするという運用をお願いします
    - codespacesの支払いの関係でこうなっています。少しやりにくい部分もあるかもしれませんが、ご協力ください 
    - 参加者のみなさんのベースブランチでprebuildの設定をしておきます。新しいブランチを作りたい場合は、まず自分のベースブランチでcodespacesを作り、その中で新規ブランチを作成するのがよいでしょう

### Codespacesでのセットアップ
Hatena SUMMER INTERNSHIP 2025の前半課程では、Codespacesを利用して環境を作り課題を進めていただきます。以下の手順でセットアップしてください。

1. `<> Code`ボタンを押し、codespacesタブを選択
2. `Configure and create codespace`を選択し、ボタンを押す
3. ブランチやスペックなどを選択し、`Create codespace`ボタンを押す
    - 項目は以下のように設定してください
      - `Region`: `Sourtheast Asia`
      - `Dev container configuration`: `.devcontainer/devcontainer.json`
      - `Machine-Type`: `8-core`
    - 以下のnotificationが表示されていることを確認してください（表示されていない場合、ご自身に課金されます）
![](images/codespace-notify.png)

4. しばらく待つと開発用のcodespacesが立ち上がる


## 課題

ブログシステムのコードはGo言語で書かれています。課題はGo言語もしくはTypeScriptで取り組むことを想定しています。しかしgRPCでやりとりできるなら、他の任意の言語で実装しても構いません。

### 必須課題: 記法変換サービス

ブログの記事をMarkdownで書けたら嬉しいと思います。そこで記事本文をなんらかの「記法」で装飾できるようにしてください。このとき、少なくとも以下の3つの記法を実装してください。

- 見出し記法
- リスト記法
- リンク記法

記法は[Markdown](https://commonmark.org/help/)をそのまま採用して構いません。それ以外の記法や独自に記法を作成しても構いません。Markdownを採用する場合、ライブラリを利用してもよいです。

参考までに、Go言語でライブラリを利用する場合は[goldmark](https://github.com/yuin/goldmark)を、TypeScriptでは[unified](https://github.com/unifiedjs/unified)（[remark](https://github.com/remarkjs/remark)、[rehype](https://github.com/rehypejs/rehype)）を推奨します。

テンプレートの中の[renderer-go](https://github.com/hatena/Hatena-Intern-2025/tree/main/services/renderer-go)サービス、もしくは[renderer-ts](https://github.com/hatena/Hatena-Intern-2025/tree/main/services/renderer-ts)サービスが出発点になるでしょう。

#### 発展

独自の記法を考えて追加してみましょう。自分がほしいと思えるような記法であると、なおよいです。

Markdownのライブラリを利用している場合も、上で推奨したライブラリであれば、拡張可能になっています。ドキュメントをよく読んで、うまく拡張してください。

## 補足

### テストについて

なるべくテストコードを書いてみましょう。

テストの目的の一つは、ソフトウェアの品質を保証することです。テストコードは、実装が正しいことを保証します。また、バグを修正した後に、修正されていることを確認するテストを書いておくことで、同じバグが再び起きていないことを将来にわたって保証することも可能です。

単に品質を保証するだけでなく、テストコードによって、テストの対象となるソフトウェアがどのように使われることを想定しているのか、示すこともできます。このようなテストコードはドキュメンテーションテストとして、ドキュメントの一部として扱われることもあります。

テストコードが果たすもう一つの役割は、生産性の向上です。ソフトウェアの動作を確認するのを、毎回人力でやっていると、手間がかかります。テストコードで自動化できると、とても便利です。ライブラリのアップデートのように、影響が広範にわたることが想定される場合、特に顕著です。

課題では、システムが複数のサービスに分けられています。全てのサービスを組み合わせないと動作が確認できない、となると大変です。個々のサービスを個別にテストできるように工夫してみましょう。

### コミットの大きさについて

コミットの粒度を意識して取り組んでみましょう。

全て実装してからまとめてコミットするようなやり方だと、gitのうまみが失われてしまいます。ひとつのコミットにどのような意味を持たせるのか考えて、適切なまとまりでコミットしてください。

ただしコミットログを気にして何度もrebaseするようなことは求めません。

### 開発の進め方について

チーム開発においては、自分が担当した部分をどのようにチームメンバーに共有するかという点も考える必要があります。はてなではGitHubを利用しており、ほとんどのチームで、機能ごとのブランチを作り、そこで作業を進め、Pull Requestを作り、レビュー後マージする、というやり方を採用しています。

Pull Requestの作り方も、コミットの粒度同様、機能のすべてを実装しきってからPull Requestにするのではなく、適度なまとまりでPull Requestにするのが良いでしょう。レビュアーの視点からみてもレビューしやすく、実装時にも「どういうコードが必要で、どのように実装を進めるか」の見通しを立てることに繋がります。

さらに、DraftのPull Requestを作り、現在の状況を共有し、他のメンバーと議論しながら開発を進めるという方法もあります。早いうちからDraftのPull Requestを作って進めていくことで、他のメンバーから進捗が見えやすくなります。また、未完成の段階から議論しながら進めることで、最終的に作りたい物と、実際に作られたものが乖離することを未然に防ぐこともできます。

Pull Requestを小さく、早い段階から作ることで、精度高く開発を進めることができます。前半課程は一人で進めることになるかと思いますが、是非これらのことを意識してほしいと思います。

## Tips

### gRPCサーバーにgRPCクライアントから接続する
- 50051/50052番ポートについて、あらかじめ`minikube - codespace`間と`codespaceからのport-forward設定を入れています
- ローカルマシンのターミナルを開き、以下のコマンドでgRPCクライアントからgRPCサーバーに接続できます
  - 以下の例では[hatena/docker-grpc_cli](https://github.com/hatena/docker-grpc_cli)を利用していますが、他のクライアントも利用できます
```
 docker run --rm hatena/grpc_cli:latest ls host.docker.internal:50051
 ```
### MySQLサーバーに接続する
- codespaceにMySQLクライアントをインストール済みです。
- 新しいターミナルを開き、以下でblog-dbに接続できます
```
mysql -uroot -h 127.0.0.1
```
- account-dbは3307番でport-forwardしています。新しいターミナルを開き、以下でaccount-dbに接続できます

```
mysql -uroot -h 127.0.0.1 -P 3307
```
### 新たに別のportをport-forwardしたい
#### minikube(kubernetes cluster) - codespace 間

skaffold.ymlに追記するか、`kubectl port-forward`します
- kubectl を使う
  - `kubectl port-forward service/blog 8080:8080`
- skaffold.yml に追記する
```yml
# portForwardセクションに以下のように追記する
# https://skaffold.dev/docs/pipeline-stages/port-forwarding/#UDPF
  - resourceType: service
    resourceName: blog
    port: 8080
    localPort: 8080
```
#### codespaceからのport-forward

以下の画像の「ポート追加」からport-forwardしたいポートを追加します

![](images/add-port.png)

## トラブルシューティング

### make upに失敗する
- 再実行してください
- 何度やっても失敗する場合、codespace自体をもう一度作り直して試してください
