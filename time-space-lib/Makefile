.PHONY : all clean

NODE_MODULES := node_modules/.bin

all: build/grammar.js build/diagram-grammar.js build/space-time.js dist/bundle.js

clean:
	-rm build/*	

build/grammar.js: grammar.jison
	@echo "### BUILDING grammar.js..."
	mkdir -p build
	$(NODE_MODULES)/jison $< -o $@

build/diagram-grammar.js: diagram.js
	@echo "### BUILDING diagram-grammar.js..."
	$(NODE_MODULES)/preprocess $< . > $@

build/space-time.js: space-time.js
	@echo "### BUILDING space-time.js"
	$(NODE_MODULES)/preprocess $< . > $@

dist/bundle.js: build/space-time.js
	@echo "### BUILDING AND DISTRIBUTING bundle.js..."
	$(NODE_MODULES)/browserify $<  -o $@