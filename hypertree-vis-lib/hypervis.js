/** The following is included by preprocessor */
// #include "jit.js"


(function() {

// #include "build/diagram-grammar.js"


function Hypervis() {
    this.init = function(inputId, refreshId, root) {
        if(!root) {
            root = 0; //index root
        }

        var json = this._parseInput(document.getElementById(inputId).value);

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
            json = new Hypervis()._parseInput(document.getElementById(inputId).value);
            ht.loadJSON(json, root);
            ht.refresh();
        };
    }

    this._parseInput = function(input) {
        var diagram = HypervisDiagram.parse(input);
        var hdParser = new HypervisDiagram.Parser();
        return hdParser.toJson(diagram.entries);
    }
}

window.Hypervis = Hypervis;

}());