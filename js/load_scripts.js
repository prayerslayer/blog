var host = "http://localhost:4000";
//var host = "http://nikolaus-piccolotto.info";
var folder = "/js";

(function() {
    function async_load(){
        //me dont like comments, almost
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = host+folder+"/javascripts.min.js";
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
    }
    if (window.attachEvent)
        window.attachEvent('onload', async_load);
    else
        window.addEventListener('load', async_load, false);
})();