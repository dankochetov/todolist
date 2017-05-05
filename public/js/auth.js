VK.init({
    apiId: '6017738'
});

window.fbAsyncInit = function() {
    FB.init({
        appId: '444096675925208',
        cookie: true,
        version: 'v2.9'
    });
    FB.AppEvents.logPageView();
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function vk_login() {
    VK.Auth.getLoginStatus(function (response) {
        if (!response.session) {
            VK.Auth.login(function (response) {
                if (response.session) {
                    window.location = '/auth/vk';
                }
            });
        }
        else {
            window.location = '/auth/vk';
        }
    });
}

function fb_login() {
    FB.login(function(response) {
        if (response.status === 'connected') {
            window.location = '/auth/fb';
        }
    });
}