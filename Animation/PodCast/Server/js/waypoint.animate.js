//Waypoint scripting



$(".doing,#left").waypoint(function(){

    $('.doing').addClass('animated zoomIn');
    $('#left').addClass('animated slideInLeft');

  },
  { offset: '100%'});


//Animation for the Controls

$("#music-left").waypoint(function(){
    $('#music-left').addClass('animated slideInLeft');
    //$('.fa-play-circle').addClass('animated zoomIn');
  },
{ offset: '100%'});


$("#music-zoom").waypoint(function(){
    $('#music-zoom').addClass('animated zoomIn');
    //$('.fa-cloud').addClass('animated slideInDown');
  },
{ offset: '100%'});


$("#music-right").waypoint(function(){
    $('#music-right').addClass('animated slideInRight');
    //$('.fa-user-circle-o').addClass('animated zoomIn');
  },
{ offset: '100%'});
