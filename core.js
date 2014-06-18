/*  Dependencies: jQuery, jQueryUI.
    Copyright 2013 Ryan Patrick
    Version 1.1 (2014-June-12)
    
    Have to force the script to wait until the page has fully loaded before executing any of the below code, this wraps the entire script.
*/
$(document).ready(function(){ 
    var rootArray = {"-500": "A","-450": "A#","-400": "B","-350": "C","-300": "C#","-250": "D", "-200": "D#", "-150": "E", "-100": "F", "-50": "F#", "0": "G", "-600": "G", "-550": "G#"};
    var diatonicArray = {"-600": "Ionian", "0": "Ionian", "-100": "Dorian", "-200": "Phrygian", "-250": "Lydian", "-350": "Mixolydian", "-450": "Aeolian", "-550": "Locrian"}
/*
    The core functionality of this app
    is the ability to drag the scale pattern
    and the root notes across the fretboard.
*/

// about window toggle
    $('#openAbout, #closeAbout').click(function(){
        $('#about').toggle();
    });

    $(function() {
        $('.pattern').draggable({ axis: "x", grid: [10] });
        $('.pattern-container').draggable({axis: "x", grid: [25] });
     });

/*  The data for the variables is coded in the HTML form elements.
    This app doesn't require a database because of the "data-" attributes in HTML5.
    
    The logo at the top and the scale pattern are changed to match the
    selection from the form. This is done to prevent confusion when the pattern changes.
*/
    $('.scale-selector').change(function(event){
        var logo = $('select option:selected').attr("data-logo");
        var pattern = $('select option:selected').attr("data-pattern");
        $('.header').css("background","url(" +logo +")");
        $('.pattern').css("background","url(" +pattern +") repeat-x");       

        $('.pattern').css("left",0);
        
        if ($('select option:selected').attr("value") == "diatonic")
        {
            $('#diatonicModeBtns').show();
            $('#location-bar').css("visibility","visible");
            $('#ergMode').show();
        }
        else
        {
            $('#diatonicModeBtns').hide();
            $('#location-bar').css("visibility","hidden");
            $('#ergMode').hide();
        }
    });

//This function toggles the notes on the fretboard on/off    
    $('#showNotes').click(function(event){
        if ($('.notes').css("display") === "none")
            {
            $('#showNotes').text("Note Names On");
            $('.notes').toggle();
            }
        else
            {
            $('#showNotes').text("Note Names Off");
            $('.notes').toggle();
            }
    });
 
//This function powers the Extra Options button
    $("#toggleExtraOptions").click(function(event){
        $('.extra-options-container').toggle();
    });
 
//8 string guitar button
    $('#ergMode').click(function(){
        var toggle = $('#ergMode').attr("data-toggle");
        if(toggle == "off")
        {
            $('.tool-container').css("height","390px");
            $('.dragger').css("margin-top","351px");
            $('.fretboard').css("height","351px");
            $('.nut').css("height","351px");
            $('.pattern').css("background","url(images/diatonic-pattern-8.png) repeat-x");
            $('#ergMode').attr("data-toggle","on");
            $('#ergMode').text("8 Strings On");
            $('.scale-selector').toggle();
        }
        else
        {
            $('.tool-container').css("height","312px");
            $('.dragger').css("margin-top","273px");
            $('.fretboard').css("height","273px");
            $('.nut').css("height","273px");
            $('.pattern').css("background","url(images/diatonic-pattern.png) repeat-x");
            $('#ergMode').attr("data-toggle","off");
            $('#ergMode').text("8 Strings Off");
            $('.scale-selector').toggle();            
        }
        
    });
 
 
/*
    The following two functions get position data from the HTML to tell where to slide for each root note, and each mode.
    When the root note changes, the scale pattern shifts with it to keep it in the set mode; JS treats this <div> as 
    still having a left position of '0'. I don't know if this is intended or something that will vary between browsers, 
    but it seems to work as I need it to everywhere I have tested it.
*/    
//root note function
    $('.root-button').click(function(event){
       var chosenPos = parseInt($(this).attr("data-pos"));       
       $(".pattern-container").css("left",0);
       $(".pattern-container").animate({'left':$(".pattern-container").position().left-chosenPos},500);
        
    });

//mode pattern function 
    $('.mode-button').click(function(event){
        var modePos = parseInt($(this).attr("data-pos"));      
        $('.pattern').css("left",0); //resets the position to zero to negate the need to calculate where to slide, faster and lighter this way, but ugly
        $('.pattern').animate({'left':$('.pattern').position().left-modePos},500);
    });
      
//this function updates the location bar, and prints what key/mode is currently displayed
    $('.pattern-container, .pattern, #rootNoteBtns, #diatonicModeBtns').bind("mouseup", function(event) {
        var root = $('.pattern-container').position().left;
        var mode = $('.pattern').position().left;
        
        if (parseInt(root) < -600)
        {
            $('.pattern-container').css("left",root + 600);            
        }
        if (parseInt(root) > 0)
        {
            $('.pattern-container').css("left",-600+root);  
        }
        if (parseInt(mode) < -600)
        {
            $('.pattern').css("left",mode + 600);
        }
        if (parseInt(mode) > 0)
        {
            $('.pattern').css("left",-600+mode);
        }
        
        window.setTimeout(function(){
            var root = $('.pattern-container').position().left;
            var mode = $('.pattern').position().left;
            $('#whereAmI').html(rootArray[root] +" " +diatonicArray[mode]);
        },550
        );
    });
//close document ready wrapper    
});