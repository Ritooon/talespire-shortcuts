// Navabar menu array - Global
var menu = [
    {'function': 'show_menu(\'shortcuts\')', 'trans': 'menu_shortcuts'},
    {'function': 'show_menu(\'money\')', 'trans': 'menu_calculator'}
];

function loadMenu()
{
    $('.navbar-nav').html('');

    menu.forEach(element => {
        $('.navbar-nav').append('<li class="nav-item"><a class="nav-link translated" data-trans="'+element.trans
            +'" href="#" onclick="'+element.function+'"></a></li>');
    });
}

function show_menu(functionnality)
{
    if(functionnality == 'shortcuts') {
        $('#shortcuts-container').css('display', 'flex');
        $('.containers:not(#shortcuts-container)').css('display', 'none');
        $('h1').attr('data-trans', 'shortcut_list');
    } else if(functionnality == 'money') { 
        $('#money-container').css('display', 'flex');
        $('.containers:not(#money-container)').css('display', 'none');
        $('h1').attr('data-trans', 'calculator_fn');
    }

    saveMenuLocation(functionnality);
    displayLanguage();
}

function saveMenuLocation(location)
{
    localStorage.setItem('location', location);
}