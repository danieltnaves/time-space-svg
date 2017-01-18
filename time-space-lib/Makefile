.PHONY : all clean

NODE_MODULES := node_modules/.bin

all: build/grammar.js build/diagram-grammar.js dist/sequence-diagram.js

clean:
	-rm build/*	

build/grammar.js: grammar.jison
	@echo "### BUILDING grammar.js..."
	mkdir -p build
	$(NODE_MODULES)/jison $< -o $@

build/diagram-grammar.js: diagram.js build/grammar.js
	@echo "### BUILDING diagram-grammar.js..."
	$(NODE_MODULES)/preprocess $< . > $@

dist/sequence-diagram.js: main.js build/diagram-grammar.js
	@echo "### BUILDING sequence-diagram.js..."
	$(NODE_MODULES)/preprocess $< . > $@