// Daum(다음) 우편번호 검색
if ( location.href.indexOf("https://") == 0 ) {
	document.write("<script src='https://spi.maps.daum.net/imap/map_js_init/postcode.v2.js'></script>");
} else {
	document.write("<script src='http://dmaps.daum.net/map_js_init/postcode.v2.js'></script>");
}
document.write("<script src='http://dapi.kakao.com/v2/maps/sdk.js?appkey=ad36809bc4ee6c75390b47e6950aa126&libraries=services'></script>");
var map;
var geocoder;
var marker;
var mapContainer;
function setKakaoMap(option) {
	mapContainer = document.getElementById('map'),				// 지도를 표시할 div
	mapOption = {
	    center : new daum.maps.LatLng(35.190946, 129.075124),	// 지도의 중심좌표
	    level : 2												// 지도의 확대 레벨
	};

	$.extend(mapOption, option);
	map = new daum.maps.Map(mapContainer, mapOption);			// 지도를 미리 생성
	geocoder = new daum.maps.services.Geocoder();				// 주소-좌표 변환 객체를 생성
	marker = new daum.maps.Marker({		//마커를 미리 생성
	    position: map.getCenter()		// 지도 중심좌표에 마커를 생성합니다
	});
	marker.setMap(map);		//지도에 마커를 표시합니다

	//지도에 클릭 이벤트를 등록합니다
	//지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
	kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
		var latlng = mouseEvent.latLng;	// 클릭한 위도, 경도 정보를 가져옵니다
		marker.setPosition(latlng);		// 마커 위치를 클릭한 위치로 옮깁니다

		//var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
		//message += '경도는 ' + latlng.getLng() + ' 입니다';
		//var resultDiv = document.getElementById('clickLatlng');
		//resultDiv.innerHTML = message;
		document.getElementById('location_x').value = latlng.getLat();
		document.getElementById('location_y').value = latlng.getLng();
	});
}

function OpenZipSearch( zip_id, addr1_id, addr2_id, lat, lng ) {
    daum.postcode.load(function(){
		// window.open("/Share/zipsearch.php?zip_id="+ zip_id +"&addr1_id=" + addr1_id + "&addr2_id=" + addr2_id,"winZip", "left=50,top=50,width=400,height=350,scrollbars=1");
		new daum.Postcode({
			oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 우편번호와 주소 정보를 해당 필드에 넣고, 커서를 상세주소 필드로 이동한다.
				try{
					// document.getElementById(zip_id).value = data.postcode1+"-" + data.postcode2;
					document.getElementById(zip_id).value = data.zonecode;
					// document.getElementById(addr1_id).value = data.address;

					// 전체 주소에서 연결 번지 및 ()로 묶여 있는 부가정보를 제거하고자 할 경우,
					// 아래와 같은 정규식을 사용해도 된다. 정규식은 개발자의 목적에 맞게 수정해서 사용 가능하다.
					var addr = data.address.replace(/(\s|^)\(.+\)$|\S+~\S+/g, '');
					document.getElementById(addr1_id).value = addr;
					if ( addr2_id!=undefined && addr2_id != "" ) {
						document.getElementById(addr2_id).focus();
					} else {
						document.getElementById(addr1_id).focus();
					}

					geocoder.addressSearch(data.address, function(results, status) {	// 주소로 상세 정보를 검색
						if (status === daum.maps.services.Status.OK) {					// 정상적으로 검색이 완료됐으면
							var result = results[0];									// 첫번째 결과의 값을 활용
							var coords = new daum.maps.LatLng(result.y, result.x);		// 해당 주소에 대한 좌표를 받아서
							document.getElementById(lat).value = result.y;
							document.getElementById(lng).value = result.x;
							mapContainer.style.display = "block";	// 지도를 보여준다.
							map.relayout();
							map.setCenter(coords);					// 지도 중심을 변경한다.
							marker.setPosition(coords);				// 마커를 결과값으로 받은 위치로 옮긴다.
						}
					});
				} catch(e) {
				}
			}
		}).open();
    });
}
