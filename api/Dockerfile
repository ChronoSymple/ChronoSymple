FROM ruby:2.5
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /docApp
WORKDIR /docApp
RUN gem install bundler:2.0.1
COPY Gemfile /docApp/Gemfile
COPY Gemfile.lock /docApp/Gemfile.lock
COPY . /docApp
RUN ./bin/bundle lock --add-platform x86-mingw32 x86-mswin32 x64-mingw32 java
RUN ./bin/bundle install
