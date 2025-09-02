# [Hatena SUMMER INTERNSHIP 2025](https://hatenacorp.jp/recruit/intern/2025)

「Hatena SUMMER INTERNSHIP 2025」では、Kubernetes上に構築されたブログシステムを題材としました。ブログシステムはマイクロサービスを意識しており、メインであるブログサービスに加えて、アカウントサービスや、Markdownなどの記法を変換するサービスが用意されています。それぞれのサービス間はgRPCを使ってやりとりしています。

<!--
インターンシップのカリキュラムについては、[講義動画](https://hatenacorp.jp/intern2020/public_broadcast)や[課題](/docs/exercise.md)を公開しているので、参照してください。
-->

## Codespacesでセットアップ（インターン期間中はこちらを選択してください）
GitHub Codespacesを使って開発することが可能です．以下の手順でアプリケーションを起動してください．なお、MinikubeはCodespaces起動時に自動で起動するようになっているため、Minikubeの手順は参考情報です。

### Minikube起動（Codespaces起動時に自動で起動されます）

<details>

``` shell
# Minikube を起動

minikube start --kubernetes-version=v1.33.1 --driver=docker --memory='8g' --cpus=4
```

</details>

### contextの設定（Codespaces接続時に自動で設定されます）

<details>

```
kubectl config set-context hatena-intern-2025 --cluster=minikube --user=minikube --namespace=hatena-intern-2025
kubectl config use-context hatena-intern-2025
```
</details>

### アプリケーションの起動
```
make up
```
しばらく待つとアプリケーションが起動したログが出力されます
```
[blog] 2022-08-18T05:31:25.130Z INFO    blog/main.go:81 starting web server (port = 8080)
[renderer-go] 2022-08-18T05:29:04.420Z  INFO    renderer-go/main.go:50  starting gRPC server (port = 50051)
[account] 2022-08-18T05:30:42.721Z      INFO    account/main.go:64      starting gRPC server (port = 50051)
```
podが全て立ち上がっているかは以下のコマンドでも確認できます

```
kubectl get pods
```

```
NAME                            READY   STATUS    RESTARTS      AGE
account-59d777f778-5dgsj        1/1     Running   0             16m
account-db-86d4996fbf-nrf7m     1/1     Running   1 (14m ago)   16m
account-test-7b4b5b8c76-xsnww   1/1     Running   0             16m
blog-847564dc7-gkphp            1/1     Running   0             16m
blog-db-7dcfb8b56f-wpmmm        1/1     Running   0             16m
blog-test-7bdd4786c7-6bxj4      1/1     Running   0             16m
renderer-go-78d9f5cd8d-qx25p    1/1     Running   0             16m
```

### アプリケーションの確認
`make up`したターミナルと別のターミナルで、以下のコマンドを実行します。

```
kubectl port-forward service/blog 8080:8080
```

これにより8080番がフォワードされます．開いているターミナルの`port`タブの8080番ポートのローカルアドレスに表示されているアドレスにブラウザからアクセスします．

![](docs/images/port.png)

## ローカル環境でセットアップ
アプリケーションの起動には以下が必要です.

- [Docker](https://docs.docker.com/engine/install/)
  - Windows または macOS の場合は Docker Desktop
  - Linux の場合は各ディストリビューションごとのインストール方法に従ってください
- Kubernetes
  - [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/)
- [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
- [Kustomize](https://kubernetes-sigs.github.io/kustomize/installation/)
- [Skaffold](https://skaffold.dev/docs/install/)

個々のサービスの開発には, 以下がローカル環境にインストールされていることを想定しています.

- Make
- [Go](https://golang.org/)
- (TypeScript を使う場合) [Node.js](https://nodejs.org/en/), [Yarn](https://classic.yarnpkg.com/lang/en/)

動作確認は以下の環境で行っています.

- macOS 14.6.1 (23G93)
- Docker Desktop 4.33.0 (160616)
- minikube v1.36.0

``` console
$ docker version
Client:
 Version:           27.1.1
 API version:       1.46
 Go version:        go1.21.12
 Git commit:        6312585
 Built:             Tue Jul 23 19:54:12 2024
 OS/Arch:           darwin/arm64
 Context:           desktop-linux

Server: Docker Desktop 4.33.0 (160616)
 Engine:
  Version:          27.1.1
  API version:      1.46 (minimum version 1.24)
  Go version:       go1.21.12
  Git commit:       cc13f95
  Built:            Tue Jul 23 19:57:14 2024
  OS/Arch:          linux/arm64
  Experimental:     false
 containerd:
  Version:          1.7.19
  GitCommit:        2bf793ef6dc9a18e00cb12efb64355c2c9d5eb41
 runc:
  Version:          1.7.19
  GitCommit:        v1.1.13-0-g58aa920
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0

$ minikube version
minikube version: v1.36.0
commit: f8f52f5de11fc6ad8244afac475e1d0f96841df1

$ kubectl version --client
Client Version: v1.33.3
Kustomize Version: v5.6.0

$ kubectl version --client --output=json
{
  "clientVersion": {
    "major": "1",
    "minor": "33",
    "gitVersion": "v1.33.3",
    "gitCommit": "80779bd6ff08b451e1c165a338a7b69351e9b0b8",
    "gitTreeState": "clean",
    "buildDate": "2025-07-15T17:59:41Z",
    "goVersion": "go1.24.5",
    "compiler": "gc",
    "platform": "darwin/arm64"
  },
  "kustomizeVersion": "v5.6.0"
}

$ skaffold version
v2.16.1

$ go version
go version go1.22.6 darwin/arm64

$ node -v
v22.18.0
```

## 起動
### Minikube
以下の手順でアプリケーションを起動します.

``` shell
# Minikube を起動
minikube start --kubernetes-version v1.33.1 --driver docker
eval $(minikube docker-env)

# context を設定
kubectl config set-context hatena-intern-2025 --cluster=minikube --user=minikube --namespace=hatena-intern-2025
kubectl config use-context hatena-intern-2025

# 起動
make up
```

以下のコマンドを実行するとブラウザが自動的に開き, アプリケーションにアクセスします.

``` shell
minikube -n hatena-intern-2025 service blog
```

## サービス
アプリケーションには以下の 3 つのサービスが存在します.

- 認証基盤 (Account) サービス
  - ユーザーアカウントの登録や認証を管轄します
- ブログ (Blog) サービス
  - ユーザーに対して, ブログを作成したり記事を書いたりする機能を提供します
- 記法変換 (Renderer) サービス
  - ブログの記事を記述するための「記法」から HTML への変換を担います

このうちブログサービスが Web サーバーとして動作し, ユーザーに対してアプリケーションを操作するためのインターフェースを提供します.
認証基盤サービスと記法変換サービスは gRPC サービスとして動作し, ブログサービスから使用されます.

## ディレクトリ構成

- `pb/`: gRPC サービスの定義
- `services/`: 各サービスの実装
  - `account/`: 認証基盤サービス
  - `blog/`: ブログサービス
  - `renderer-go/`: 記法変換サービスの Go による実装
  - `renderer-ts/`: 記法変換サービスの TypeScript による実装
- `k8s/`: アプリケーションを Kubernetes 上で動作させるためのマニフェスト

## クレジット
- 株式会社はてな
  - [@akiym](https://github.com/akiym)
  - [@cockscomb](https://github.com/cockscomb)
  - [@itchyny](https://github.com/itchyny)
  - [@susisu](https://github.com/susisu)
  - [@astj](https://github.com/astj)
  - [@tkzwtks](https://github.com/tkzwtks)
  - [@SlashNephy](https://github.com/SlashNephy)
  - [@r4wxii](https://github.com/r4wxii)
  - [@Amakuchisan](https://github.com/Amakuchisan)

(順不同)

このリポジトリの内容は MIT ライセンスで提供されます. 詳しくは `LICENSE` をご確認ください.
