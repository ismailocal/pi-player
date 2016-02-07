Number.prototype.toHHMMSS = function () {
    var sec_num = Math.floor(this); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time = '';
	time += hours > 0 ? hours +':' : '';
	time += minutes +':'+ seconds;
    return time;
};

var piPlayer = function(){
	
	var $this			= this;
	$this.audio 		= null;
	$this.autoplay 		= false;
	$this.volume 		= 0.5;
	
	$this.piPlayer 			= document.querySelector('.pi-player');
	
	$this.piUl 				= document.createElement('ul');
	$this.piPlayer.appendChild($this.piUl);
	
	$this.piPp 				= document.createElement('li');
	$this.piPp.className 	= 'pi-pp fa fa-play';
	$this.piUl.appendChild($this.piPp);
	
	$this.piVolume 				= document.createElement('li');
	$this.piVolume.className 	= 'pi-volume';
	$this.piUl.appendChild($this.piVolume);
	
	$this.piVolumeIcon 				= document.createElement('i');
	$this.piVolume.appendChild($this.piVolumeIcon);
	
	$this.piVolumeLine 				= document.createElement('div');
	$this.piVolumeLine.className 	= 'pi-volume-line';
	$this.piVolume.appendChild($this.piVolumeLine);
	
	$this.piVolumeCurrentLine 				= document.createElement('div');
	$this.piVolumeCurrentLine.className 	= 'pi-volume-current-line';
	$this.piVolumeLine.appendChild($this.piVolumeCurrentLine);
	
	$this.piTime 			= document.createElement('li');
	$this.piTime.className 	= 'pi-time';
	$this.piUl.appendChild($this.piTime);
	
	$this.piCurrentTime 			= document.createElement('span');
	$this.piCurrentTime.className 	= 'pi-current-time';
	$this.piTime.appendChild($this.piCurrentTime);
	
	$this.piSeperatorTime 			= document.createElement('span');
	$this.piSeperatorTime.className 	= 'pi-separator-time';
	$this.piTime.appendChild($this.piSeperatorTime);
	
	$this.piDuration 			= document.createElement('span');
	$this.piDuration.className 	= 'pi-duration-time';
	$this.piTime.appendChild($this.piDuration);
	
	$this.piLine 			= document.createElement('li');
	$this.piLine.className 	= 'pi-line';
	$this.piUl.appendChild($this.piLine);
	
	$this.piCurrentLine 			= document.createElement('div');
	$this.piCurrentLine.className 	= 'pi-current-line';
	$this.piLine.appendChild($this.piCurrentLine);
	
	$this.piPp.onclick = function(){
		$this.pp();
	};
	
	$this.piLine.onclick = function(e){
		$this.audio.currentTime = e.offsetX * $this.audio.duration / this.offsetWidth;
	};
	
	$this.piVolumeIcon.onclick = function(){
		if( $this.volume ) $this.volumeBuffer = $this.volume;
		$this.volume = $this.volume ? 0 : $this.volumeBuffer;
	};
	
	$this.piVolumeLine.onclick = function(e){
		if( e.target != this ) return false;
		$this.volume = (e.offsetX / (this.offsetWidth - 10));
	};
	
	$this.pp = function(){
		if( $this.audio.paused ) $this.audio.play();
		else $this.audio.pause();
	};
	
	$this.update = function(){
		if( $this.audio.readyState != 4 ) return false;
		if( $this.audio.paused ){
			$this.piPp.classList.add('fa-play');
			$this.piPp.classList.remove('fa-pause');
		}else{
			$this.piPp.classList.remove('fa-play');
			$this.piPp.classList.add('fa-pause');
		}
		
		$this.audio.volume = $this.volume;
		
		if( ! $this.volume ) 				$this.piVolumeIcon.className = 'fa fa-volume-off';
		else if( $this.volume < 0.5 ) 		$this.piVolumeIcon.className = 'fa fa-volume-down';
		else 								$this.piVolumeIcon.className = 'fa fa-volume-up';
		
		$this.piDuration.innerHTML 				= $this.audio.duration.toHHMMSS();
		$this.piCurrentTime.innerHTML 			= $this.audio.currentTime.toHHMMSS();
		$this.piCurrentLine.style.width 		= ($this.audio.currentTime / $this.audio.duration * 100) +'%';
		$this.piVolumeCurrentLine.style.left 	= ($this.audio.volume * ($this.piVolumeLine.offsetWidth - 10)) - $this.piVolumeCurrentLine.offsetWidth / 2 +'px';
	};
	
	var interval;
	$this.run = function(audio, autoplay){
		
		clearInterval(interval);
		
		$this.autoplay = autoplay;
		
		if( $this.audio ) $this.audio.pause();
	
		$this.audio 		= new Audio(audio);
	
		if( $this.autoplay ) $this.audio.play();
		interval = setInterval(function(){
			$this.update();
		}, 200);
	}
};