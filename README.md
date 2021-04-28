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

```
$ docker-compose run api rails generate rspec:install

$ docker-compose run api rails generate devise:install

$ docker-compose run api rails generate devise_token_auth:install User auth

$ docker-compose run api rails db:migrate

```

### Reactセットアップ

1. Reactアプリ作成

```
$ docker-compose run --rm front sh -c "npm install -g create-react-app && create-react-app react-sample --template typescript"
```

　ここではfrontのイメージに「create-react-app」というReactアプリのひな形を作成する  
　ライブラリをインストールし、直後にfrontというReactアプリを作成  

```
$ docker-compose run --rm front sh -c "NODE_OPTIONS=--max_old_space_size=2048 npm i @emotion/react@^11"

$ docker-compose run --rm front sh -c "npm i @emotion/styled@^11"

$ docker-compose run --rm front sh -c "npm i framer-motion@^4"

$ docker-compose run --rm front sh -c "npm i @chakra-ui/react"

$ docker-compose run --rm front sh -c "npm i react-router-dom"

$ docker-compose run --rm front sh -c "npm i axios"

docker-compose rum --rm front sh -c "npm i @types/react-router-dom" # typescriptの開発では必要

docker-compose run --rm front sh -c "npm i @chakra-ui/icons"

docker-compose run --rm front sh -c "npm i eslint" # パスが通っていなかっただけの可能性があり、不要かも

docker-compose run --rm front sh -c "npm i prettier eslint-config-prettier" # prettier 整形ツール

docker-compose run --rm front sh -c "npm i @typescript-eslint/eslint-plugin @typescript-eslint/parser"

```