$(function(){
    /* robot button */
    $(".btn_robot button").hover(function(){
        $(this).parent().stop().addClass("active");
    },
    function(){
        $(this).parent().stop().removeClass("active");
    });
    $(".btn_robot button").on("focusin", function() {
        $(this).parent().stop().addClass("active");
    });
    $(".btn_robot button").on("focusout", function() {
        $(this).parent().stop().removeClass("active");
    });
    $(".btn_robot button").on("click", function() {
        $(".bg_dimm").stop().fadeIn(300);
        $(".layer_popup01").show();
    });
    $(".layer_popup_close").on("click", function() {
        $(".bg_dimm").stop().fadeOut();
        $(".layer_popup01").hide();
    });
    $(".layer_popup_close2").on("click", function() {
        $(".bg_dimm").stop().fadeOut();
        $(".layer_popup02").hide();
    });
    
    

    /* input focus */
    $(".chat_input").on("focusin", function() {
        $(this).parents(".chat_input_wrap").addClass("on");
    });
    $(".chat_input").on("focusout", function() {
        $(this).parents(".chat_input_wrap").removeClass("on");
    });
    
});