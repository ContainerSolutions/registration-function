
CONFIG = $(HOME)/.config/configstore/@google-cloud/functions-emulator/config.json
LOG ?= /tmp/logs
PROJECT ?= container-solutions

define config
{
	"grpcHost": "localhost",
	"grpcPort": 8009,
	"inspect": false,
	"inspectPort": 9229,
	"logFile": "$(LOG)",
	"region": "us-central1",
	"restHost": "localhost",
	"restPort": 8008,
	"service": "rest",
	"storage": "configstore",
	"supervisorHost": "0.0.0.0",
	"supervisorPort": 8010,
	"timeout": 60000,
	"useMocks": false,
	"verbose": true,
	"projectId": "$(PROJECT)"
}
endef

all: build

build: $(CONFIG)
	@functions start 2> /dev/null
	@functions deploy registration -H 2> /dev/null
	tail -f /tmp/logs

export config
$(CONFIG):
	@functions logs &>/dev/null &
	@sleep 1
	@echo "$$config" > "$@"
