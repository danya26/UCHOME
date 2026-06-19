function chartInit(){
	// Set some global Chart.js defaults.
	Chart.defaults.global.animationSteps = 60;
	Chart.defaults.global.animationEasing = 'easeInOutQuart';
	Chart.defaults.global.responsive = true;
	Chart.defaults.global.maintainAspectRatio = false;
}

function getWeek(sDate, eDate){
	var id = 'myChart';
	var type = 'line';
	var dimentions = 'ga:date,ga:nthDay';
	var metrics = 'ga:sessions';
	
	var q1 = getDuration(dimentions, metrics, sDate, eDate);
	
	var dimentions = 'ga:date,ga:nthDay';
	var metrics = 'ga:pageviews';
	
	var q2 = getDuration(dimentions, metrics, sDate, eDate);

    Promise.all([q1, q2]).then(function(results) {
    	if(results){
    		if(!results[0].DataList){
    			return;
    		}
    		
    		if(!results[0].DataList[0].data||!results[1].DataList[0].data
    				||!results[0].DataList[0].data.rows||!results[1].DataList[0].data.rows){
    			var container = document.getElementById(id);
    			container.innerHTML = '데이타가 없습니다.';
    			return;
    		}
    		
			var data1 = results[0].DataList[0].data.rows.map(function(row) { return +row.metrics[0].values; });
		  	var data2 = results[1].DataList[0].data.rows.map(function(row) { return +row.metrics[0].values; });
		    var labels = results[1].DataList[0].data.rows.map(function(row) { return row.dimensions[0]; });

			var chartData = {
				type: type,
				data:{
					labels: labels,
			        datasets: [{
			            label: '사용자',
			            borderColor: '#4D5360',
						backgroundColor: Chart.helpers.color('#4D5360').alpha(0.5).rgbString(),
			            data: data1
			        },
			        {
			            label: '페이지뷰',
			            borderColor: '#949FB1',
						backgroundColor: Chart.helpers.color('#949FB1').alpha(0.5).rgbString(),
			            pointStrokeColor : '#fff',
			            data: data2
			        }]
				},
				options: {
					
				}
			}
			new Chart(makeCanvas(id), chartData);
		}
    }).catch(function(error){
    	alert("작업진행 시간이 초과되었습니다.\n다시 시도해 주세요.");
    });
}
 
function getDuration(dimentions, metrics, sDate, eDate){
	var url = (window.ADMIN_URL_PREFIX||'/_Admin')+"/ajx_json/AnalyticsMgr/Chart.json?sDate="+sDate+"&eDate="+eDate;
	url  = url + "&dimensions=" + dimentions;
	url  = url + "&metrics=" + metrics;
	
	return new Promise(function(resolve, reject){
		$.ajax({
			type:"post",
			url: url,
			dataType:"json", // TEXT 형의 JSON으로 받음 
			success : function(data) {
				resolve(data);
			},
			error : function(xhr, status, error) {
				//alert("에러발생:" + error + status + xhr);
				//alert("작업진행 시간이 초과되었습니다.\n다시 시도해 주세요.");
				reject(error);
			}
		});
	});
}


function getBrowser(){
	var now = moment(); // .subtract(3, 'day');
	
	var id = 'myChartBrowser';
	var type = 'doughnut';
	var dimentions = 'ga:browser';
	var metrics = 'ga:pageviews';
	var sort = '-ga:pageviews';
	var sDate = moment(now).date(1).month(0).format('YYYY-MM-DD');
	var eDate = moment(now).format('YYYY-MM-DD');
	
	var url = (window.ADMIN_URL_PREFIX||'/_Admin')+"/ajx_json/AnalyticsMgr/Chart.json?sDate="+sDate+"&eDate="+eDate;
	url  = url + "&dimensions=" + dimentions;
	url  = url + "&metrics=" + metrics;
	
	var key = new Array();
	var value = new Array();
	
	$.ajax({
		type:"post",
		url: url,
		dataType:"json", // TEXT 형의 JSON으로 받음 
		success : function(data) {
			if(data){
				var dataList = data.DataList;
				console.log(dataList);
				
				var result = dataList[0].data.rows;
				var data = [];
				var colors = ['#4D5360','#949FB1','#D4CCC5','#E2EAE9','#F7464A'];
				
				for(var i=0; i<result.length; i++){
			    	key[i] = result[i].dimensions;
			    	value[i]=result[i].metrics[0].values[0];
				}
				
				var chartData = {
					type: type,
					data:{
						labels: key,
				        datasets: [{
				        	data: value,
				        	backgroundColor: colors
				        }],
				        label: 'Dataset 1'
					},
					options: {
						
					}
				}
				new Chart(makeCanvas(id), chartData);
			}
		},
		error : function(xhr, status, error) {
			//alert("에러발생:" + error + status + xhr);
			alert("작업진행 시간이 초과되었습니다.\n다시 시도해 주세요.");
		}
	});
}


function getYear(){
	var now = moment(); // .subtract(3, 'day');
	
	var id = 'myChartYear';
	var type = 'bar';
	var dimentions = 'ga:month,ga:nthMonth';
	var metrics = 'ga:pageviews';
	var sDate = moment(now).date(1).month(0).format('YYYY-MM-DD');
	var eDate = moment(now).format('YYYY-MM-DD');
	
	var url = (window.ADMIN_URL_PREFIX||'/_Admin')+"/ajx_json/AnalyticsMgr/Chart.json?sDate="+sDate+"&eDate="+eDate;
	url  = url + "&dimensions=" + dimentions;
	url  = url + "&metrics=" + metrics;
	
	var key = new Array();
	var value = new Array();
	
	$.ajax({
		type:"post",
		url: url,
		dataType:"json", // TEXT 형의 JSON으로 받음 
		success : function(data) {
			if(data){
				var dataList = data.DataList;
				console.log(dataList);
				
				var result = dataList[0].data.rows;
				for(var i=0; i<result.length; i++){
			    	key[i] = moment(result[i].dimensions, 'YYYYMMDD').format('LL');
			    	value[i]=result[i].metrics[0].values[0];
				}

				var labels = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
				for (var i = 0, len = labels.length; i < len; i++) {
			    	if(value[i] === undefined) value[i] = null;
		     	}
				 
				var chartData = {
					type: type,
					data:{
						labels: labels,
				        datasets: [{
				            label: moment(now).date(1).month(0).format('YYYY'),
				            fillColor : 'rgba(77,83,96,0.5)',
				            strokeColor : 'rgba(77,83,96,1)',
				            backgroundColor: '#4D5360',
				            data: value
				        }]
					},
					options: {
						
					}
				}
				window.myLine = new Chart(makeCanvas(id), chartData);
			}
		},
		error : function(xhr, status, error) {
			//alert("에러발생:" + error + status + xhr);
			alert("작업진행 시간이 초과되었습니다.\n다시 시도해 주세요.");
		}
	});
}

/**
 * Create a new canvas inside the specified element. Set it to be the width
 * and height of its container.
 * @param {string} id The id attribute of the element to host the canvas.
 * @return {RenderingContext} The 2D canvas context.
 */
function makeCanvas(id) {
  var container = document.getElementById(id);
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');

  container.innerHTML = '';
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  container.appendChild(canvas);

  return ctx;
}
 

 /**
  * Create a visual legend inside the specified element based off of a
  * Chart.js dataset.
  * @param {string} id The id attribute of the element to host the legend.
  * @param {Array.<Object>} items A list of labels and colors for the legend.
  */
function generateLegend(id, items) {
   var legend = document.getElementById(id);
   var color = items.fillColor || items.color;
   var label = items.label;
   legend.innerHTML = '<li><i style="background:' + color + '"></i>' + escapeHtml(label) + '</li>' 
   /* legend.innerHTML = items.map(function(item) {
     var color = item.color || item.fillColor;
     var label = item.label;
     return '<li><i style="background:' + color + '"></i>' +
         escapeHtml(label) + '</li>';
   }).join(''); */
 }

/**
 * Escapes a potentially unsafe HTML string.
 * @param {string} str An string that may contain HTML entities.
 * @return {string} The HTML-escaped string.
 */
function escapeHtml(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}