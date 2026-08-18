var context = window.AudioContext || window.webkitAudioContext;
var actx = new context;
var osc1 = actx.createOscillator();
var osc2 = actx.createOscillator();
var lfo = actx.createOscillator();
osc1.type = 'square';
osc2.type = 'square';
lfo.type = 'sine';
//var qosc1 = Math.pow(2, (($("#osc1").val() - 69) / 12)) * 440;
osc1.frequency.setValueAtTime($("#osc1").val(), actx.currentTime);
osc2.frequency.setValueAtTime($("#osc2").val(), actx.currentTime);
lfo.frequency.setValueAtTime($("#lfospeed").val(), actx.currentTime);
var oscamp = actx.createGain();
var lfoamp = actx.createGain();
var amp1 = actx.createGain();
var dgain = actx.createGain();
var filter = actx.createBiquadFilter();
lfoamp.gain.setValueAtTime($("#lfoamount").val(), actx.currentTime);
filter.type = "lowpass";
filter.frequency.setValueAtTime($("#filterfreq").val(), actx.currentTime);
filter.gain.value = 100;
filter.Q.setValueAtTime($("#filterres").val(), actx.currentTime);
dgain.gain.value = 0.2;
var delay = actx.createDelay(0.5);
delay.delayTime.value = 0.25;
amp1.gain.value = 0.5;
osc1.connect(oscamp);
osc2.connect(oscamp);
lfo.connect(lfoamp);
lfoamp.connect(oscamp.gain);
//oscamp.connect(amp1);
oscamp.connect(filter);
oscamp.connect(delay);
filter.connect(delay);
filter.connect(amp1);
delay.connect(dgain);
dgain.connect(delay);
dgain.connect(amp1);
amp1.connect(actx.destination);

function playAudio() {
    osc1.start();
    osc2.start();
    lfo.start();
    $('#audiobutton').html('Stop Audio');
    $('#audiobutton').attr({"onclick":"muteAudio()"});
}

function muteAudio() {
    amp1.gain.value = 0;
    $('#audiobutton').html('Start Audio');
    $('#audiobutton').attr({"onclick":"unmuteAudio()"});
}

function unmuteAudio() {
    amp1.gain.value = 0.5;
    $('#audiobutton').html('Stop Audio');
    $('#audiobutton').attr({"onclick":"muteAudio()"});
}

$(document).ready(function(){
  $("#osc1").on("change mousemove touchmove", function(){
    //var note = Math.pow(2, (($(this).val() - 69) / 12)) * 440;
    osc1.frequency.setValueAtTime($(this).val(), actx.currentTime);
    $("#osc1val").html($(this).val());
  })

  $("#osc2").on("change mousemove touchmove", function(){
    osc2.frequency.setValueAtTime($(this).val(), actx.currentTime);
    $("#osc2val").html($(this).val());
  })

  $("#lfospeed").on("change mousemove touchmove", function(){
    lfo.frequency.setValueAtTime($(this).val(), actx.currentTime);
  })

  $("#lfoamount").on("change mousemove touchmove", function(){
    lfoamp.gain.setValueAtTime($(this).val(), actx.currentTime);
  })

  $("#filterfreq").on("change mousemove touchmove", function(){
    filter.frequency.setValueAtTime($(this).val(), actx.currentTime);
  })

  $("#filterres").on("change mousemove touchmove", function(){
    filter.Q.setValueAtTime($(this).val(), actx.currentTime);
  })

  $("input[name=lfoshape]").on("change", function() {
    lfo.type = $("input[name=lfoshape]:checked").val();
  })

})
