FROM ruby:2.7
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
  && apt-get update -qq \
  && apt-get install -y nodejs yarn

# docker-compose.ymlのargsから値を取得し、定数として定義
ARG UID
ARG GID
ARG UNAME
ARG DBPASS

# コンテナの環境変数を設定
ENV UID ${UID}
ENV GID ${GID}
ENV UNAME ${UNAME}
ENV DB_PASSWORD ${DBPASS}

# Dockerホストのユーザー・グループをコンテナに作成
RUN groupadd -g ${GID} ${UNAME}
RUN useradd -u ${UID} -g ${UNAME} -m ${UNAME}

WORKDIR /api
COPY . /api
RUN bundle config --local set path 'vendor/bundle' \
  && bundle install

# Railsアプリの所有者をDockerホストのユーザーに変更する
RUN chown -R $UNAME:$UNAME /api
# コンテナを実行するユーザーを指定
USER $UNAME
