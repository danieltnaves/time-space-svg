.PHONY : all clean

NODE_MODULES := node_modules/.bin

all: build/grammar.js build/diagram-grammar.js build/hypervis.js build/diagram-controller.js dist/vsdis-min.js

debug: build/grammar.js build/diagram-grammar.js build/hypervis.js build/diagram-controller.js dist/vsdis.js

clean:
	-rm build/*	

build/grammar.js: grammar.jison
	@echo "### Building grammar.js..."
	mkdir -p build
	$(NODE_MODULES)/jison $< -o $@

build/diagram-grammar.js: diagram.js
	@echo "### Building diagram-grammar.js..."
	$(NODE_MODULES)/preprocess $< . > $@

build/hypervis.js: hypervis.js
	@echo "### Building hypervis.js..."
	$(NODE_MODULES)/preprocess $< . > $@	

build/diagram-controller.js: diagram-controller.js
	@echo "### Building diagram-controller.js..."
	$(NODE_MODULES)/preprocess $< . > $@

dist/vsdis.js: build/diagram-controller.js
	@echo "### Building and distributing vsdis.js..."
	mkdir -p dist
	$(NODE_MODULES)/browserify $< -o $@

dist/vsdis-min.js: build/diagram-controller.js
	@echo "### Building, distributing and minifying vsdis-min.js..."
	mkdir -p dist
	$(NODE_MODULES)/browserify $< | $(NODE_MODULES)/uglifyjs -c > $@ 