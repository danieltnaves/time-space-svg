/** The following is included by preprocessor */
// #include "jit.js"


(function() {

function Hypervis() {
    this.init = function(inputId, refreshId) {
        var json = JSON.parse(document.getElementById(inputId).value);    

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
                    adj.data.$lineWidth = Math.random() * 7 + 1;
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
            ht.loadJSON(json, 2);
            ht.refresh();
            //ht.controller.onBeforeCompute(ht.graph.getNode(ht.root));
        }

        var button = $jit.id(refreshId);
        button.onclick = function() {
            json = JSON.parse(document.getElementById(inputId).value);
            ht.loadJSON(json, 2);
            ht.refresh();
        };
    }
}

window.Hypervis = Hypervis;

}());