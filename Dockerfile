FROM alpine:3.5

RUN apk --update add python libc6-compat make nodejs
RUN npm install -g @google-cloud/functions-emulator

ENV GCLOUD_ARCHIVE  https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-147.0.0-linux-x86_64.tar.gz

WORKDIR opt
RUN apk --update add -t build-dependencies wget \
	&& wget -O - "$GCLOUD_ARCHIVE" | tar -xzf - \
    && ./google-cloud-sdk/install.sh --usage-reporting true --command-completion false --path-update true --rc-path /etc/profile \
    && apk del build-dependencies \
    && rm -rf /var/cache/apk/*

ENTRYPOINT ["/bin/sh"]
