$(document).ready(function(){
  $('#draw').click(function(){
    var text                  = $('#input-data').val();
    var spaceTimeRaw          = new SpaceTimeRaw(text);
    var spaceTimeRawLines     = spaceTimeRaw.returnLinesAsArray();
    var spaceTimeObjectsArray = spaceTimeRaw.returnRawInputAsArray(spaceTimeRawLines);
    console.log(spaceTimeObjectsArray);
    return false
  });
});