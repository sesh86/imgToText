
function progressUpdate(packet){
	var log = document.getElementById('log');

	if(log.firstChild && log.firstChild.status === packet.status){
		if('progress' in packet){
			var progress = log.firstChild.querySelector('progress')
			progress.value = packet.progress
		}
	}else{
		var line = document.createElement('div');
		line.status = packet.status;
		var status = document.createElement('div')
		status.class = 'status'
		status.appendChild(document.createTextNode(packet.status))
		line.appendChild(status)

		if('progress' in packet){
			var progress = document.createElement('progress')
			progress.value = packet.progress
			progress.max = 1
			line.appendChild(progress)
		}


		if(packet.status == 'done'){
			var pre = document.createElement('pre')
			pre.appendChild(document.createTextNode(packet.data.data.text))
			line.innerHTML = ''
			line.appendChild(pre)

		}

		log.insertBefore(line, log.firstChild)
	}
}

async function recognizeFile(file) {
	document.querySelector("#log").innerHTML = ''
  const corePath = window.navigator.userAgent.indexOf("Edge") > -1? '../../node_modules/tesseract.js-core/tesseract-core.asm.js': '../../node_modules/tesseract.js-core/tesseract-core.wasm.js';

  const lang = document.querySelector('#langsel').value
  const data = await Tesseract.recognize(file, lang, {
    corePath,
    logger: progressUpdate,
  });
  progressUpdate({ status: 'done', data });
}


