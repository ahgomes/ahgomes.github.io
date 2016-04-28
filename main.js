$(document).ready(function() {
    alert("ADRIAN GOMES");
    $(this).scrollTop(0);
    setTimeout(function(){
        $( "body" ).addClass( "filled" )

        $("body").css({
            'overflow' : ''
        });

        $(this).scrollTop(0);

        $(window).scroll(function(){
            var windowScroll = $(this).scrollTop();
            var stop = 250;

            if (windowScroll < stop){
                $("#t").css({
                    "transform" : "translate( 0% , " + windowScroll * -1.5  + "%)"
                });
                $("#h").css({
                    "transform" : "translate( 0% , " + windowScroll * -1.4  + "%)"
                });
                $("#i").css({
                    "transform" : "translate( 0% , " + windowScroll * -1.3  + "%)"
                });
                $("#iDot").css({
                    "transform" : "translate( 0% , " + windowScroll * -6.4  + "%)"
                });
                $("#n").css({
                    "transform" : "translate( 0% , " + windowScroll * -1.5  + "%)"
                });
                $("#g").css({
                    "transform" : "translate( 0% , " + windowScroll * -1.4  + "%)"
                });
                $("#ellipsis-1").css({
                    "transform" : "translate( 0% , " + windowScroll * -13.3  + "%)"
                });
                $("#ellipsis-2").css({
                    "transform" : "translate( 0% , " + windowScroll * -14.4  + "%)"
                });
                $("#ellipsis-3").css({
                    "transform" : "translate( 0% , " + windowScroll * -15.5  + "%)"
                });

            }else {
                $("#t").css({
                    "transform" : "translate( 0% , " + stop * -1.5  + "%)"
                });
                $("#h").css({
                    "transform" : "translate( 0% , " + stop * -1.4  + "%)"
                });
                $("#i").css({
                    "transform" : "translate( 0% , " + stop * -1.3  + "%)"
                });
                $("#iDot").css({
                    "transform" : "translate( 0% , " + stop * -6.4  + "%)"
                });
                $("#n").css({
                    "transform" : "translate( 0% , " + stop * -1.5  + "%)"
                });
                $("#g").css({
                    "transform" : "translate( 0% , " + stop * -1.4  + "%)"
                });
                $("#ellipsis-1").css({
                    "transform" : "translate( 0% , " + stop * -13.3  + "%)"
                });
                $("#ellipsis-2").css({
                    "transform" : "translate( 0% , " + stop * -14.4  + "%)"
                });
                $("#ellipsis-3").css({
                    "transform" : "translate( 0% , " + stop * -15.5  + "%)"
                });
                $(this).scrollTop(stop);
                $("body").css({
                    "overflow" : "hidden"
                });
            }

            if (windowScroll === stop){
                $(".sub-head").css({
                    "transform" : "translateY( -30%)"
                });
                $("body").addClass("check");
            }

        });
    }, 3000);

});
