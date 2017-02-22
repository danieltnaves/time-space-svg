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

/*HypervisDiagram.Jit = function() {
	this._id;
	this._name;
	this.adjacencies = new Array();

	this.setId = function(id) {
		this._id = id;
	}

	this.getId = function() {
		return this._id;
	}

	this.setName = function(name) {
		this._name = name;
	}

	this.getName = function() {
		return this._name;
	}
}
*/
HypervisDiagram.Entry = function(nodeA, nameA, nodeB, nameB, weight) {
	this._nodeA  = new HypervisDiagram.Node(nodeA, nameA);
	this._nodeB  = new HypervisDiagram.Node(nodeB, nameB);
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
	this._map = {};

	this._reset = function() {
		this._map = {};
	}

	this.toJson = function(entries) {
		_reset();
		//if(!entries) //TODO throw Exception		
		var i;
		for (i in entries) {
			var entry = entries[i];
			_parseSourceNode(entry);
			_parseDestNode(entry);
		}
		var result = new Array();
		for(var key in _map) {
			if(_map.hasOwnProperty(key)) {
				result.push(_map[key]);
			}
		}
		return JSON.stringify(result);
	}

	this._parseSourceNode = function(entry) {
		var key = entry.getNodeA().getId(); 
		if(!_map[key]) {
			var obj = {};
			obj.id   = entry.getNodeA().getId();
			obj.name = entry.getNodeA().getName();
			_map[key] = obj;
		}
	}

	this._parseDestNode = function(entry) {
		var obj = _map[entry.getNodeA().getId()];		

		var adjacency = {};
		if(!obj.adjacencies) {
			obj.adjacencies = new Array();			
			adjacency.nodeTo = entry.getNodeB().getId();
			adjacency.data.weight = entry.getWeight();
			obj.adjacencies.push(adjacency);
		} else {
			if(_containsObject(entry.getNodeB().getId(), obj.adjacencies)) {
				return;
			} else {
				adjacency.nodeTo = entry.getNodeB().getId();
				adjacency.data.weight = entry.getWeight();
				obj.adjacencies.push(adjacency);
			}
		}
	}

	this._containsObject = function(obj, list) {
		if(!list) return false;		
	    var i;
	    for (i = 0; i < list.length; i++) {
	        if (list[i].nodeTo === obj) {
	            return true;
	        }
	    }
 	   return false;
	}
}

/** The following is included by preprocessor */
// #include "build/grammar.js"

function ParseError(message, hash) {
  this.name = 'ParseError';
  this.message = (message || '');
}
ParseError.prototype = new Error();
HypervisDiagram.ParseError = ParseError;

HypervisDiagram.parse = function(input) {
	grammar.yy = new HypervisDiagram();
	grammar.yy.parseError = function(message, hash) {
		throw new ParseError(message, hash);
	}
	var diagram = grammar.parse(input);
	delete diagram.parseError;
	return diagram;
}