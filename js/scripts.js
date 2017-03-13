VIZ_TYPE = {
	TIMESPACE: "timespace",
	HYPERTREE: "hypertree"
};

function getOptionsSelectedValues()
{
	var arr = $("input[name=opts]:checked").map(function () {return this.value;}).get().join(",");
	return arr;
}

function resetElements() {
	$("#paper").empty();
	$("#paper").hide();
	$("#infovis").empty();
	$("#infovis").hide();
}

function drawElements() {

	var selectedViz = $("input[name=viz]:checked").val();

	try {
		var diagram = model.Diagram.parse(document.getElementById('input-data').value);
		var vw;
		if(selectedViz === VIZ_TYPE.TIMESPACE) {		
			$("#paper").show();
			document.getElementById("err").style.display = "none";
			vw = new view.SpaceTimeDraw('#paper', 2, 'black', diagram.entries, getOptionsSelectedValues());		
		} else if (selectedViz === VIZ_TYPE.HYPERTREE) {
			$("#infovis").show();
			vw = new view.Hypervis('input-data', 'draw');
		} else {
			var errElement = document.getElementById("err");
			errElement.innerText = "Visualization not supported";
			errElement.style.display = "block";
			return;
		}

		var ctl = new controller.DiagramController(diagram, vw, model.Diagram.parse);
		ctl.updateView();
	} catch (err) {
		var errMessage = err.message.slice(err.message.indexOf("Expecting"));
		var errElement = document.getElementById("err"); 
		if(errMessage) errElement.innerText = "Error: " + errMessage;
		else errElement.innerText = "Error: Unexpected error ocurred.";
		errElement.style.display = "block";
	}	
}

$(document).ready(function(){

	$('#input-data').linedtextarea();
	
	$('#save-png').click(function(){
		saveSvgAsPng(document.getElementById("paper"), "time-space-diagram.png");
		return false;	
	});
	
	$('#save-svg').click(function(){
		//get svg element.
		var svg = document.getElementById("paper");
		//get svg source.
		var serializer = new XMLSerializer();
		var source = serializer.serializeToString(svg);
		//add name spaces.
		if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
			source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
		}
		if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
			source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
		}
		//add xml declaration
		source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
		//convert svg source to URI data scheme.
		var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
		var a      = document.createElement('a');
		a.href     = url;
		a.download = 'time-space-diagram.svg';
		a.target   = '_blank';
		document.body.appendChild(a); a.click(); document.body.removeChild(a);
		return false;
	});
	
	$("input[name=viz]").click(function() {
		if($("input[name=viz]:checked").val() === VIZ_TYPE.TIMESPACE) {
			$("#save-svg").show();
			$("#save-png").show();
		} else {
			$("#save-svg").hide();
			$("#save-png").hide();
		}
	});

	$('#draw').click(function(){
		resetElements();
		drawElements();
		return false;	
	});
	drawElements();	
	
	var fileInput = document.getElementById('fileInput');
	var fileDisplayArea = document.getElementById('input-data');

	fileInput.addEventListener('change', function(e) {
		var file = fileInput.files[0];
		var textType = /text.*/;

		if (file.type.match(textType)) {
			var reader = new FileReader();

			reader.onload = function(e) {
				fileDisplayArea.innerText = reader.result;
			}

			reader.readAsText(file);	
		} else {
			fileDisplayArea.innerText = "File not supported!"
		}
	});

});