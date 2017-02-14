.PHONY : all

NODE_MODULES := node_modules/.bin

all: dist/hypervis.js

dist/hypervis.js: hypertree.js
	@echo "### BUILDING AND DISTRIBUTING hypervis.js..."
	mkdir -p dist
	$(NODE_MODULES)/preprocess $< . > $@