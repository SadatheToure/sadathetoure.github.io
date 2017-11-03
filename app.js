$(document).ready(function() {



  var authChart = dc.rowChart(".auth"),
    powerChart = dc.rowChart(".power"),
    channelChart = dc.rowChart(".channel"),
    visCount = dc.dataCount(".dc-data-count"),
    visTable = dc.dataTable(".dc-data-table");

  d3.json("http://wifi-api.ngrok.io/api/wifidata", function(err, data) {

    if (err) throw err;

    data.forEach(function(d) {
      d.date = new Date(d.date);
    });

    let ndx = crossfilter(data);
    let all = ndx.groupAll();

    let authenticationDim = ndx.dimension(function(d) {
      return d.authentication;
    });
    let powerDim = ndx.dimension(function(d) {
      return d.power;
    });
    let dateDim = ndx.dimension(function(d) {
      return d.date;
    });
    let channelDim = ndx.dimension(function(d) {
      return d.channel;
    });

    let authGroup = authenticationDim.group();
    let powerGroup = powerDim.group();
    let dateGroup = dateDim.group();
    let channelGroup = channelDim.group();

    authChart
      .dimension(authenticationDim)
      .group(authGroup)
      .elasticX(true);

    powerChart
      .dimension(powerDim)
      .group(powerGroup)
      .elasticX(true);

    channelChart
      .dimension(channelDim)
      .group(channelGroup)
      .elasticX(true);

    visCount
      .dimension(ndx)
      .group(all)

    visTable
      .dimension(dateDim)
      .group(function(d) {
        let format = d3.format('02d');
        return (d.date.getMonth() + 1) + '/' + d.date.getDate() + '/' + d.date.getFullYear() + ' -- ' + d.date.getHours() + ':' + d.date.getMinutes();
      })
      .columns([
        "essid", "power", "channel", "privacy", "authentication", "beacons", "bssid"
      ]);
    dc.renderAll();
    console.log(data);
    $('#myModal').modal('show');
  })
});
