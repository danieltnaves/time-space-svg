.PHONY : all clean

NODE_MODULES := node_modules/.bin

all: build/grammar.js build/diagram-grammar.js build/hypervis.js build/diagram-controller.js dist/bundle.js

clean:
	-rm build/*	

build/grammar.js: grammar.jison
	@echo "### BUILDING grammar.js..."
	mkdir -p build
	$(NODE_MODULES)/jison $< -o $@

build/diagram-grammar.js: diagram.js
	@echo "### BUILDING diagram-grammar.js..."
	$(NODE_MODULES)/preprocess $< . > $@

build/hypervis.js: hypervis.js
	@echo "### BUILDING hypervis.js..."
	$(NODE_MODULES)/preprocess $< . > $@	

build/diagram-controller.js: diagram-controller.js
	@echo "### BUILDING space-time.js"
	$(NODE_MODULES)/preprocess $< . > $@

dist/bundle.js: build/diagram-controller.js
	@echo "### BUILDING AND DISTRIBUTING bundle.js..."
	mkdir -p dist
	$(NODE_MODULES)/browserify $<  -o $@