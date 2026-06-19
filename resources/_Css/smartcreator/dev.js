 window.onload = function() {
     // 화면의 너비와 높이를 가져옵니다.
     const screenWidth = window.screen.availWidth;
     const screenHeight = window.screen.availHeight;

     // 팝업창의 크기를 화면 크기로 조정합니다.
     // window.resizeTo(screenWidth, screenHeight);
 };

 const image = document.getElementById('image'); // 원본이미지
 const inputImage = document.getElementById('inputImage'); // 원본이미지 input
 const cropButton = document.getElementById('cropButton'); // 미리보기 버튼
 const cropSaveButton = document.getElementById('cropSaveButton'); // 저장하기 버튼
 const addTextButton = document.getElementById('addTextButton'); // 텍스트 추가 버튼
 const canvas = document.getElementById('canvas'); // 캔버스
 const textContainer = document.getElementById('textContainer'); // 텍스트 컨테이너
 const fontSizeInput = document.getElementById('fontSize'); // 폰트사이즈 input
 const fontColorInput = document.getElementById('fontColor'); // 폰트칼라 input
 const overlayImageInput = document.getElementById('overlayImage'); // png 이미지
 const canvasContainer = document.getElementById('canvasContainer');

 let cropper;
 let rate = 1;
 var resized = false;
 var files;

 inputImage.addEventListener('change', (event) => {
     files = event.target.files;
     baseImageLoad();
 });

 addTextButton.addEventListener('click', () => {
     const newTextOverlay = document.createElement('div');
     newTextOverlay.className = 'text-overlay';
     newTextOverlay.contentEditable = true; // 텍스트 편집 가능
     newTextOverlay.innerText = '여기에 텍스트 추가';
     newTextOverlay.style.position = 'absolute'; // 절대 위치 지정
     newTextOverlay.style.top = '100px';
     newTextOverlay.style.left = '100px';

     // 폰트 사이즈를 비율에 맞게 조정합니다.
     const originalFontSize = parseInt(fontSizeInput.value, 10);
     newTextOverlay.style.fontSize = `${originalFontSize * rate}px`;
     newTextOverlay.style.color = fontColorInput.value;
     textContainer.appendChild(newTextOverlay);

     // 드래그 기능 추가
     let isDragging = false;
     let offsetX, offsetY;

     newTextOverlay.addEventListener('mousedown', (e) => {
         isDragging = true;
         offsetX = e.clientX - parseFloat(newTextOverlay.style.left.replace("px", ""));
         offsetY = e.clientY - parseFloat(newTextOverlay.style.top.replace("px", ""));
     });

     document.addEventListener('mousemove', (e) => {
         if (isDragging) {
             const newX = e.clientX - offsetX;
             const newY = e.clientY - offsetY;
             newTextOverlay.style.left = `${newX}px`;
             newTextOverlay.style.top = `${newY}px`;
         }
     });

     document.addEventListener('mouseup', () => {
         isDragging = false;
     });

     // 폰트 사이즈와 색상 변경 이벤트
     const updateTextStyle = () => {
         newTextOverlay.style.fontSize = `${fontSizeInput.value * rate}px`;
         newTextOverlay.style.color = fontColorInput.value;
     };

     // 각 텍스트 오버레이에 대한 스타일 변경을 위한 이벤트 리스너 추가
     newTextOverlay.addEventListener('click', () => {
         // 선택된 텍스트 오버레이에 대한 스타일 변경
         fontSizeInput.value = Math.round(parseFloat(newTextOverlay.style.fontSize.replace("px", "") / rate));
         fontColorInput.value = rgbToHex(newTextOverlay.style.color);

         // 폰트 사이즈와 색상 변경 이벤트 리스너
         const updateSelectedTextStyle = () => {
             newTextOverlay.style.fontSize = `${fontSizeInput.value * rate}px`;
             newTextOverlay.style.color = fontColorInput.value;
         };

         fontSizeInput.oninput = updateSelectedTextStyle;
         fontColorInput.oninput = updateSelectedTextStyle;
     });
 });

 // overlay file selected
 overlayImage.addEventListener('change', () => {
     const file = overlayImageInput.files[0];
     if (file) {
         const reader = new FileReader();
         reader.onload = (e) => {
             const overlayElement = document.createElement('div');
             overlayElement.className = 'overlay';
             overlayElement.style.position = 'absolute';
             overlayElement.style.left = '0px'; // 초기 위치 설정
             overlayElement.style.top = '0px'; // 초기 위치 설정

             const img = document.createElement('img');
             img.src = e.target.result;
             img.style.maxWidth = '100%'; // 이미지 크기 조절

             overlayElement.style.width = Math.round(rate * 100) + '%';

             const resizer = document.createElement('div');
             resizer.className = 'resizer';
             const resizeElement = document.createElement('div');
             resizeElement.appendChild(img);
             resizeElement.appendChild(resizer);
             overlayElement.appendChild(resizeElement);
             textContainer.appendChild(overlayElement);

             // 드래그 기능 추가
             let isDragging = false;
             let offsetX, offsetY;

             overlayElement.addEventListener('mousedown', (e) => {
                 isDragging = true;
                 offsetX = e.clientX - parseFloat(overlayElement.style.left.replace("px", ""));
                 offsetY = e.clientY - parseFloat(overlayElement.style.top.replace("px", ""));
             });

             document.addEventListener('mousemove', (e) => {
                 if (isDragging) {
                     overlayElement.style.left = `${e.clientX - offsetX}px`;
                     overlayElement.style.top = `${e.clientY - offsetY}px`;
                 }
             });

             document.addEventListener('mouseup', () => {
                 isDragging = false;
             });

             // 크기 조절 기능 추가
             let isResizing = false;

             resizer.addEventListener('mousedown', (e) => {
                 isResizing = true;
                 e.stopPropagation(); // 드래그 이벤트와 충돌 방지
             });

             document.addEventListener('mousemove', (e) => {
                 if (isResizing) {
                     const newWidth = e.clientX - overlayElement.getBoundingClientRect().left;
                     const newHeight = e.clientY - overlayElement.getBoundingClientRect().top;
                     overlayElement.style.width = `${newWidth}px`;
                     overlayElement.style.height = `${newHeight}px`;
                 }
             });

             document.addEventListener('mouseup', () => {
                 isResizing = false;
             });
         };
         reader.readAsDataURL(file);
     } else {
         alert("Overlay 이미지를 선택해주세요.");
     }
 });

 cropButton.addEventListener('click', () => {
     const croppedCanvas = cropper.getCroppedCanvas();
     canvas.width = croppedCanvas.width;
     canvas.height = croppedCanvas.height;
     const ctx = canvas.getContext('2d');
     ctx.drawImage(croppedCanvas, 0, 0);


     const cropBoxData = cropper.getCropBoxData();
     const imageData = cropper.getImageData();

     // 모든 Overlay 이미지를 Canvas에 그리기
     const overlays = textContainer.getElementsByClassName('overlay');
     const overlayImages = Array.from(overlays).map(overlay => {
         return new Promise((resolve) => {
             const overlayImage = overlay.querySelector('img');
             console.log("img overlay.style.left", parseFloat(overlay.style.left, 10));
             const overlayX = parseFloat(overlay.style.left, 10) - 100;
             const overlayY = parseFloat(overlay.style.top, 10);
             const overlayWidth = overlayImage.clientWidth / rate;
             const overlayHeight = overlayImage.clientHeight / rate;

             let x = (parseInt(overlay.style.left.replace("px", "")) - cropBoxData.left) * (canvas.width / cropBoxData.width);
             let y = (parseInt(overlay.style.top.replace("px", "")) - cropBoxData.top) * (canvas.height / cropBoxData.height);

             const img = new Image();
             img.src = overlayImage.src;
             img.onload = () => {
                 ctx.drawImage(img, x, y, overlayWidth, overlayHeight); // 드래그한
                 // 위치에
                 // 그리기
                 resolve();
             };
         });
     });

     // 텍스트 오버레이 추가
     const textOverlays = document.querySelectorAll('.text-overlay');
     textOverlays.forEach((overlay) => {
         let floatFontSize = parseFloat(overlay.style.fontSize.replace("px", "")) / rate;

         console.log("fontsize:" + floatFontSize);

         ctx.font = `${floatFontSize}px sans-serif`;
         ctx.fillStyle = overlay.style.color;

         let x = (parseInt(overlay.style.left.replace("px", "")) - cropBoxData.left) * (canvas.width / cropBoxData.width);
         let y = (parseInt(overlay.style.top.replace("px", "")) - cropBoxData.top) * (canvas.height / cropBoxData.height);

         console.log("xy:", x, y);

         txtlines = overlay.innerText.split("\n");
         txtlines.forEach(function(txt) {
             ctx.fillText(txt, x, y + 30);
             y = y + floatFontSize + 1;
         });

     });

     // 모든 Overlay 이미지가 로드된 후 결과를 표시
     Promise.all(overlayImages).then(() => {
         const resultImage = canvas.toDataURL('image/png');
         const resultWindow = window.open('', '', `width=${canvas.width},height=${canvas.height}`);
         resultWindow.document.write(`<img src="${resultImage}" alt="Combined Image" style="width: 100%; height: auto;">`);
     });
 });

 cropSaveButton.addEventListener('click', () => {
     const croppedCanvas = cropper.getCroppedCanvas();
     canvas.width = croppedCanvas.width;
     canvas.height = croppedCanvas.height;
     const ctx = canvas.getContext('2d');
     ctx.drawImage(croppedCanvas, 0, 0);


     const cropBoxData = cropper.getCropBoxData();
     const imageData = cropper.getImageData();

     // 모든 Overlay 이미지를 Canvas에 그리기
     const overlays = textContainer.getElementsByClassName('overlay');
     const overlayImages = Array.from(overlays).map(overlay => {
         return new Promise((resolve) => {
             const overlayImage = overlay.querySelector('img');
             console.log("img overlay.style.left", parseFloat(overlay.style.left, 10));
             const overlayX = parseFloat(overlay.style.left, 10) - 100;
             const overlayY = parseFloat(overlay.style.top, 10);
             const overlayWidth = overlayImage.clientWidth / rate;
             const overlayHeight = overlayImage.clientHeight / rate;

             let x = (parseInt(overlay.style.left.replace("px", "")) - cropBoxData.left) * (canvas.width / cropBoxData.width);
             let y = (parseInt(overlay.style.top.replace("px", "")) - cropBoxData.top) * (canvas.height / cropBoxData.height);

             const img = new Image();
             img.src = overlayImage.src;
             img.onload = () => {
                 ctx.drawImage(img, x, y, overlayWidth, overlayHeight); // 드래그한
                 // 위치에
                 // 그리기
                 resolve();
             };
         });
     });

     // 텍스트 오버레이 추가
     const textOverlays = document.querySelectorAll('.text-overlay');
     textOverlays.forEach((overlay) => {
         let floatFontSize = parseFloat(overlay.style.fontSize.replace("px", "")) / rate;

         console.log("fontsize:" + floatFontSize);

         ctx.font = `${floatFontSize}px sans-serif`;
         ctx.fillStyle = overlay.style.color;

         let x = (parseInt(overlay.style.left.replace("px", "")) - cropBoxData.left) * (canvas.width / cropBoxData.width);
         let y = (parseInt(overlay.style.top.replace("px", "")) - cropBoxData.top) * (canvas.height / cropBoxData.height);

         console.log("xy:", x, y);

         txtlines = overlay.innerText.split("\n");
         txtlines.forEach(function(txt) {
             ctx.fillText(txt, x, y + 30);
             y = y + floatFontSize + 1;
         });

     });

     // 결과를 이미지로 표시
     Promise.all(overlayImages).then(() => {
         const resultImage = canvas.toDataURL('image/png');
         // Blob으로 변환
         fetch(resultImage)
             .then(res => res.blob())
             .then(blob => {
                 const file = new File([blob], 'SMARTCREATOR 이미지.png', {
                     type: 'image/png'
                 });
                 const dataTransfer = new DataTransfer();
                 dataTransfer.items.add(file);
                 //window.opener.document.querySelector('input[name="im_img"]').files = dataTransfer.files; // 원본
                 //console.log(window.opener.document.querySelector('#frm_PopupImageUpload input[name="file_item"]'));
                 //window.opener.resetFormStyle();
                 //self.close();
                 
                 // 부모 창의 input[type="file"] 요소 가져오기
                 let fileInput = window.opener.document.querySelector('#frm_' + smartobj + ' input[name="file_item"]');

                 if (fileInput) {
                     // 파일을 부모 창의 input에 설정
                     fileInput.files = dataTransfer.files;

                     // 📌 부모 창에서 change 이벤트 강제 발생
                     let event = new Event("change", { bubbles: true });
                     fileInput.dispatchEvent(event);
                     
                     console.log("파일이 부모 창의 input에 추가되었습니다:", file);
                 } else {
                     console.error("파일 입력 요소를 찾을 수 없습니다.");
                 }
                 
                 self.close();
             });
     });
 });


 function rgbToHex(rgbStr) {
     const parts = rgbStr.match(/\d+/g);

     if (!parts || parts.length !== 3) {
         throw new Error('Invalid RGB string');
     }

     const r = parseInt(parts[0], 10);
     const g = parseInt(parts[1], 10);
     const b = parseInt(parts[2], 10);

     if (isNaN(r) || isNaN(g) || isNaN(b)) {
         throw new Error('Invalid RGB values');
     }

     if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
         throw new Error('RGB values must be between 0 and 255');
     }

     const hex = [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');

     return `#${hex}`;
 }




 function gcd(a, b) {
     // 최대공약수 계산 (유클리드 호제법)
     while (b !== 0) {
         let temp = b;
         b = a % b;
         a = temp;
     }
     return a;
 }

 function simplifyFraction(width, height) {
     // 가로와 세로를 받아 기약분수로 반환하는 함수
     if (width <= 0 || height <= 0) {
         throw new Error("가로와 세로는 양의 정수여야 합니다.");
     }

     const divisor = gcd(width, height);
     const simplifiedWidth = width / divisor;
     const simplifiedHeight = height / divisor;

     return `${simplifiedWidth}/${simplifiedHeight}`;
 }

 function baseImageLoad() {
     // let w = $("#iw").val();
     // let h = $("#ih").val();
     let w_c = $("#iw_c").val();
     let h_c = $("#ih_c").val();

     if (files && files.length > 0) {
         // image.src = "";
         const reader = new FileReader();
         reader.onload = (e) => {
             image.src = e.target.result;

             // 이미지가 로드된 후 사이즈 정보를 얻기 위해 load 이벤트 사용
             image.onload = () => {

                 const originalWidth = image.naturalWidth; // 원본 이미지의
                 // 너비
                 const originalHeight = image.naturalHeight; // 원본 이미지의
                 // 높이
                 const ctx = canvas.getContext('2d');
                 console.log(`Original Image size: ${originalWidth}x${originalHeight}`);

                 const clientWidth = image.clientWidth; // 로드된 이미지의 너비
                 const clientHeight = image.clientHeight; // 로드된 이미지의
                 // 높이

                 rate = clientWidth / originalWidth;
                 console.log(clientWidth, originalWidth);
                 console.log("rate:" + rate);

                 // 비율 계산 (백분율로 변환)
                 const ratioDisplay = document.getElementById('ratioDisplay');
                 ratioDisplay.textContent = `${(rate * 100).toFixed(2)} % (${originalWidth}x${originalHeight})`;

                 const cropDisplay = document.getElementById('cropDisplay');

                 if (w_c * h_c > 0) {

                     if (resized) {
                         resized = false;
                         return;
                     }

                     let crop_rate = simplifyFraction(originalWidth, originalHeight);
                     let reSize = getAdjustedSize(w_c, h_c, crop_rate);
                     console.log("resize:", reSize);

                     canvas.width = reSize.w;
                     canvas.height = reSize.h;
                     ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                     // 리사이징된 이미지를 설정
                     const resizedImageURL = canvas.toDataURL();
                     resized = true;
                     image.src = resizedImageURL;
                 }

                 if (cropper) {
                     cropper.destroy();
                 }
                 cropper = new Cropper(image, {
                     viewMode: 1,
                     zoomable: false, // 확대/축소 기능 비활성화
                     ready: function() {
                         let ww = parseFloat($("#iw_c").val());
                         let hh = parseFloat($("#ih_c").val());

                         if (ww * hh > 0) {
                             console.log("wwhh", ww, hh);
                             cropper.setData({
                                 "x": 0,
                                 "y": 0,
                                 "width": ww,
                                 "height": hh
                             }); // 크롭박스
                             // 세팅
                         }
                     },
                     crop: function(e) {
                         var data = e.detail;
                         console.log(data);
                         let cropInfo = `${Math.round(data.width)}x${Math.round(data.height)}`;
                         cropDisplay.textContent = cropInfo;

                     },
                 });


             };
         };
         reader.readAsDataURL(files[0]);
     }
 }
 
function openNewWin(url,winName,w,h){
	var w = window.open(url,winName,"width="+w+",height="+h+",scrollbars=yes");
}

 // 공유이미지 관련
 var SiteImgCtrls = {
     // 공유 이미지를 가져오는 함수
     searchShareImgData: function() {
         if ($("#iw_c").val() == "") {
             alert("생성 할 이미지 사이즈를 입력하세요.");
             $("#iw_c").focus();
             return;
         }
         if ($("#ih_c").val() == "") {
             alert("생성 할 이미지 사이즈를 입력하세요.");
             $("#ih_c").focus();
             return;
         }

         openNewWin((window.ADMIN_URL_PREFIX||'/_Admin')+"/CMS/sharedImage/listPop.do?mcode=MA179", "selimgData", 1400, 940);
     },

     // 선택한 공유 이미지 데이터를 처리하는 함수
     selectShareImgData: function(json) {
         console.log(json);

         // 이미지 URL을 가져오는 예시 (예: 이미지 URL이 'imageUrl' 변수에 저장되어 있다고 가정)
         const imageUrl = json.src; // 실제 이미지 URL로 변경

         // URL을 Blob으로 변환
         fetch(imageUrl)
             .then(res => res.blob())
             .then(blob => {
                 const file = new File([blob], 'image.jpg', {
                     type: blob.type
                 });
                 const dataTransfer = new DataTransfer();
                 dataTransfer.items.add(file);
                 files = dataTransfer.files;
                 baseImageLoad();
             });
     }
 };

 // 파일 직접 가져오기
 function openFile() {
     if ($("#iw_c").val() == "") {
         alert("생성 할 이미지 사이즈를 입력하세요.");
         $("#iw_c").focus();
         return;
     }
     if ($("#ih_c").val() == "") {
         alert("생성 할 이미지 사이즈를 입력하세요.");
         $("#ih_c").focus();
         return;
     }

     inputImage.click();
 }

 function getAdjustedSize(width, height, ratio) {
     let tmp = ratio.split("/");
     const widthRatio = tmp[0];
     const heightRatio = tmp[1];

     console.log("getAdjustedSize : ", width, height, ratio);

     // 비율을 계산하여 최대 공약수로 나누어 정규화
     const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
     const ratioGCD = gcd(widthRatio, heightRatio);
     const normalizedWidthRatio = widthRatio / ratioGCD;
     const normalizedHeightRatio = heightRatio / ratioGCD;

     // 비율에 맞춰 가로와 세로를 계산
     const targetWidth = Math.max(width, (height * normalizedWidthRatio) / normalizedHeightRatio);
     const targetHeight = (Math.ceil(targetWidth) * normalizedHeightRatio) / normalizedWidthRatio;

     return {
         w: targetWidth,
         h: targetHeight
     };
 }

 $(document).on('keydown', function(e) {
     if (event.key === 'Delete' || event.keyCode === 46) {
         $(".text-overlay.on, .overlay.on").last().remove();
     }
 });

 $(document).on('click', '.text-overlay, .overlay', function() {
     $('.text-overlay, .overlay').removeClass("on");
     $(this).addClass("on");
 });

 $(document).on('load', '.overlay', function() {
     alert('a');
 });