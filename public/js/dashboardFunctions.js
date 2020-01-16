var watch;


function startSession() {
  var onAirSign = document.getElementById('onAirButton');
  var b = document.getElementById('broadcastStatus');
  var c = document.getElementById('sessionTrigger');
  var d = document.getElementById('sessionTriggerText');
  b.style.borderColor = "#f55454";
  c.style.backgroundColor = "#f55454";
  onAirSign.innerHTML = "ON AIR"
  d.innerHTML = "END SESSION";
  var current = document.getElementById('recordingTime');
  current.style.color = "#69b77f"
  watch.reset();
  watch.start();
}

function endSession() {
  var onAirSign = document.getElementById('onAirButton');
  var b = document.getElementById('broadcastStatus');
  var c = document.getElementById('sessionTrigger');
  var d = document.getElementById('sessionTriggerText');
  b.style.borderColor = "#69b77f";
  c.style.backgroundColor = "#69b77f";
  onAirSign.innerHTML = "OFF AIR"
  d.innerHTML = "START SESSION";
  watch.stop();
}

function addTrack() {
	console.log("Adding track");
	var item = document.querySelectorAll("form > div:first-child");
	var list = document.getElementById("wf-form-Tracklist");
	var node = document.createElement("div");
	var clone;
	for(var value of item.values()) {
		var n = value.cloneNode(true)
    var fields = n.children;
    for(var i=0; i<fields.length; i++) {
      fields[i].value = null;
    }
		list.appendChild(n);
	}
}

function time() {
  var d = new Date();
  document.getElementById('currentTime').innerHTML = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })

}

setInterval(time, 1000);

var Stopwatch = function() {

  var timer       = document.getElementById('recordingTime'),
      offset,
      clock,
      interval;




  // initialize
  reset();


  function start() {
    if (!interval) {
      offset   = Date.now();
      interval = setInterval(update);
      console.log(interval)
    }
  }

  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function reset() {
    clock = 0;
    render();
  }

  function update() {
    clock += delta();
    render();
  }

  function render() {
    var ms = Math.floor(clock%1000)
    if(ms<100) var milliseconds = 0;
    else {
      ms = ms + ""
      var milliseconds = ''+ms.slice(0,2)
    }
    console.log(milliseconds)
    var seconds = Math.floor(clock/1000);
    var minutes = Math.floor(seconds/60)%60;
    if(minutes<10) minutes = '0'+minutes;
    var hours = 0;
    if(hours<10) hours = hours;
    var secondsDisplay = seconds%60
    if (secondsDisplay<10) secondsDisplay = '0'+secondsDisplay
    var timeString = '+'+hours+':'+minutes+':'+secondsDisplay+':'+milliseconds
    timer.innerHTML = timeString;
  }

  function delta() {
    var now = Date.now(),
        d   = now - offset;

    offset = now;
    return d;
  }

  // public API
  this.start  = start;
  this.stop   = stop;
  this.reset  = reset;
};


function sessionStateChange()  {
  var liveText = document.getElementById('onAirButton');
  console.log(liveText.innerHTML)

  if(liveText.innerHTML == "OFF AIR")
    { watch = new Stopwatch()
      startSession();
    }
  else endSession();
}