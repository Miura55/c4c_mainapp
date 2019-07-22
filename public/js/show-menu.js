function show_i18n(){
var nowpath=location.href.split("?")[0];
var MenuIcon = '\
<div class="uk-position-top-right uk-position-fixed">\
    <div class="menu-icon-box-outer">\
        <div class=" menu-icon-box">\
            <button class="uk-button uk-padding-remove" uk-toggle="target: #my-id" type="button"><span uk-icon="icon: menu; ratio:1.6"></span></button>\
            <a href="#my-id" uk-toggle></a>\
            <div id="my-id" uk-offcanvas>\
                <div class="uk-offcanvas-bar">\
                    <button class="uk-offcanvas-close" type="button" uk-close></button>'
                             +'<a href="' + nowpath +'{{{payload.selectLangUrl}}}en">English</a><br>';
                    MenuIcon+='<a href="' + nowpath +'{{{payload.selectLangUrl}}}ja">日本語</a><br>'+
                '</div>\
            </div>\
        </div>\
    </div>\
</div>\
'
document.write(MenuIcon);
}
