function HypervisDiagram() {
	this.nodes   = [];
	this.entries = [];
}

HypervisDiagram.prototype.addNode  = function(node) {
	var i;
	for(i in nodes) {
		if(nodes[i] === node) {
			return nodes[i];
		}
	}
	i = nodes.push(node);
	return nodes[i - 1];
};

HypervisDiagram.prototype.addEntry = function(entry) {
	this.entries.push(entry);
};

HypervisDiagram.Node = function(id, name) {
	this._id   = id;
	this._name = name;

	this.getId = function() {
		return this._id;
	}

	this.getName = function() {
		return this._name;
	}
}

HypervisDiagram.Entry = function(nodeA, nameA, nodeB, nameB, weight) {
	this._nodeA  = new Node(nodeA, nameA);
	this._nodeB  = new Node(nodeB, nameB);
	this._weight = weight;

	this.getNodeA = function() {
		return this._nodeA;
	}

	this.getNodeB = function() {
		return this._nodeB;
	}

	this.getWeight = function() {
		return this._weight;
	}
}

// parser to json format expected by JIT library: https://philogb.github.io/jit/
HypervisDiagram.Parser = function() {
	//TODO: não duplicar as entradas que já foram processadas
	//TODO: necessário ter algum controle paralelo para verificar isso
	this.toJson = function(entries) {
		//if(!entries) //TODO throw Exception
		var jitJson = {};
		var i;
		for (i in entries) {
			var entry = entries[i];
			_createSourceData(jitJson, entry);
			_addAdjacencies(jitJson, entry);
		}
	}

	this._createSourceData = function(json, entry) {
		json.id   = entry.getNodeA().getId();
		json.name = entry.getNameA().getName();
	}

	this._addAdjacencies = function(json, entry) {
		var adjacencies = new Array();
		var adjacency = {};
		adjacency.nodeTo = entry.getNodeB().getId();
		adjacencies.push(adjacency);
		json.adjacencies = adjacencies;
	}
}

/*function ParserError(message) {
	this.name    = 'ParserError';
	this.message = (message || '');
}
ParserError.prototype = new Error();*/
