$(document).ready(function(){
    loadTheme();
    loadCaracteristics();
    loadMoney();

    if(typeof localStorage.getItem('location') != 'undefined' && localStorage.getItem('location') != null)
    {
        show_menu(localStorage.getItem('location'));
    }
    else
    {
        show_menu('shortcuts');
    }
    
    displayLanguage();
});


function loadTheme()
{
    if(localStorage.getItem('theme') == 'dark-theme') {
        $('body').addClass('dark-theme').removeClass('light-theme');
        $('#dark-theme-switch').css('display', 'none');
        $('#light-theme-switch').css('display', 'inline-block');
    } else {
        $('body').addClass('light-theme').removeClass('dark-theme');
        $('#dark-theme-switch').css('display', 'inline-block');
        $('#light-theme-switch').css('display', 'none');
    }
}

function switchTheme(theme)
{
    if(theme == 'dark-theme') { 
        $('#dark-theme-switch').css('display', 'none');
        $('#light-theme-switch').css('display', 'inline-block');
    } else {
        $('#dark-theme-switch').css('display', 'inline-block');
        $('#light-theme-switch').css('display', 'none');
    }

    localStorage.setItem('theme', theme);
    loadTheme();
}

