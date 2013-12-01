BIN = ./node_modules/.bin

.PHONY: eslint
eslint:
	@$(BIN)/eslint index.js lib/

.PHONY: jscs
jscs:
	@$(BIN)/jscs index.js lib/

.PHONY: test
test: eslint jscs
