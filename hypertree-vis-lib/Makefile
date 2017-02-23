.PHONY : all

NODE_MODULES := node_modules/.bin

all: build/grammar.js build/diagram-grammar.js dist/hypervis.js

clean:
	-rm build/*

build/grammar.js: grammar.jison
	@echo "### BUILDING grammar.js..."
	mkdir -p build
	$(NODE_MODULES)/jison $< -o $@

build/diagram-grammar.js: hypervis-diagram.js
	@echo "### BUILDING diagram-grammar.js..."
	$(NODE_MODULES)/preprocess $< . > $@

dist/hypervis.js: hypervis.js
	@echo "### BUILDING AND DISTRIBUTING hypervis.js..."
	mkdir -p dist
	$(NODE_MODULES)/preprocess $< . > $@