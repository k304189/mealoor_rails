# mealoor

### Railsセットアップ

1. railsアプリ作成

```
$ docker-compose run api rails new . --force --no-deps --database=mysql --api --skip-test --skip-bundle
```
　■オプション
　　・--force・・・強制して上書きする(Gemfileを上書き)
　　・--no-deps・・・関連する他サービスは起動しない
　　・--database・・・使用するデータベースを指定
　　・--api・・・railsアプリをapiモードとして作成する
　　・--skip-test・・・標準のtestディレクトリを作成しない
　　・--skip-bundle・・・Gemのインストールを行わない
