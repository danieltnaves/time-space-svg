/** The following is included by preprocessor */
// #include "jit.js"

function Hypervis(inputId, refreshId, root) {
    this.inputId   = inputId;
    this.refreshId = refreshId;
    this.root      = (root != null ? root : 0);

    this.displayDiagram = function(diagram, parser) {

        //var json = this._parseInput(document.getElementById(this.inputId).value);

        var json = new Hypervis.Parser().toJson(diagram.entries);

        var ht = new $jit.Hypertree({
            injectInto: 'infovis',
            //By setting overridable=true,
            //Node and Edge global properties can be
            //overriden for each node/edge.
            Node: {
                overridable: true,
                'transform': false,
                color: "#f00"
            },
            
            Edge: {
                overridable: true,
                color: "#088"
            },
            //calculate nodes offset
            offset: 0.2,
            //Change the animation transition type
            transition: $jit.Trans.Back.easeOut,
            //animation duration (in milliseconds)
            duration:1000,
            
            //This method is called right before plotting an
            //edge. This method is useful for adding individual
            //styles to edges.
            onBeforePlotLine: function(adj){
                //Set random lineWidth for edges.
                if (!adj.data.$lineWidth)
                    adj.data.$lineWidth = adj.data.weight;
            },
            
            /*onBeforeCompute: function(node){
                Log.write("centering");
            },*/
            //Attach event handlers on label creation.
            onCreateLabel: function(domElement, node){
                domElement.innerHTML = node.name;
                domElement.style.cursor = "pointer";
                domElement.onclick = function () {
                    ht.onClick(node.id, { 
                        hideLabels: false,
                        onComplete: function() {
                          ht.controller.onComplete();
                      }
                  });
                };
            },
            //This method is called when moving/placing a label.
            //You can add some positioning offsets to the labels here.
            onPlaceLabel: function(domElement, node){
                var width = domElement.offsetWidth;
                var intX = parseInt(domElement.style.left);
                intX -= width / 2;
                domElement.style.left = intX + 'px';
            },
        });

        if(json) {
            ht.loadJSON(json, root);
            ht.refresh();
        }

        var button = $jit.id(refreshId);
        button.onclick = function() {
            //json = new Hypervis()._parseInput(document.getElementById(inputId).value);
            var d = parser(document.getElementById(inputId).value);
            json = new Hypervis.Parser().toJson(d.entries);
            ht.loadJSON(json, root);
            ht.refresh();
        };
    }

    this._parseInput = function(input, diagramParser) {
        var diagramModel = diagramParser.parse(input);
        var hdParser = new Hypervis.Parser();
        return hdParser.toJson(diagram.entries);
    }
}

// parser to json format expected by JIT library: https://philogb.github.io/jit/
Hypervis.Parser = function () {
    this._map = {};

    this._reset = function() {
        this._map = {};
    }

    this.toJson = function(entries) {
        if(!entries) {
            throw new ParseError("entries cannot be null.");
        }       
        this._reset();      
        var i;
        for (i in entries) {
            var entry = entries[i];
            this._parseSourceNode(entry);
            this._parseDestNode(entry);
        }
        var result = new Array();
        for(var key in this._map) {
            if(this._map.hasOwnProperty(key)) {
                result.push(this._map[key]);
            }
        }
        return result;
    }

    this._parseSourceNode = function(entry) {
        var sourceKey = entry.getSenderName();
        var destKey = entry.getReceiverName();
        var obj = {};
        if(!this._map[sourceKey]) {         
            obj.id   = entry.getSenderName();;
            obj.name = entry.getSenderName();
            this._map[sourceKey] = obj;
        }
        if(!this._map[destKey]) {
            obj = {};
            obj.id   = entry.getReceiverName();
            obj.name = entry.getReceiverName();
            this._map[destKey] = obj;
        }
    }

    this._parseDestNode = function(entry) {
        var obj = this._map[entry.getSenderName()];      

        var adjacency = {};
        if(!obj.adjacencies) {
            obj.adjacencies = new Array();          
            adjacency.nodeTo = entry.getReceiverName();
            adjacency.data = {weight: entry.getWeight()};
            obj.adjacencies.push(adjacency);
        } else {
            if(this._containsObject(entry.getReceiverName(), obj.adjacencies)) {
                return;
            } else {
                adjacency.nodeTo = entry.getReceiverName();
                adjacency.data = {weight: entry.getWeight()};
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
};