FROM wordpress:php8.0-apache

# install git, zip
RUN apt-get update && apt-get install -y git zip

# composer
COPY --from=composer/composer /usr/bin/composer /usr/bin/composer

# node
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get install -y nodejs

# to be able to use pnpm
RUN corepack enable
