// Navabar menu array - Global
var menu = [
    {'function': 'shortcuts', 'trans': 'menu_shortcuts'},
    {'function': 'money', 'trans': 'menu_calculator'}
];

function loadMenu()
{
    $('.navbar-nav').html('');

    menu.forEach(element => {
        $('.navbar-nav').append(`
            <li class="nav-item">
                <a class="nav-link translated" data-trans="${element.trans}" href="${element.function}"></a>
            </li>
        `);
    });
}

function show_menu()
{
    let url = window.location.href.toString().split('/');
    let functionnality = url[url.length - 1];

    if(functionnality == 'shortcuts' || functionnality == '') {
        $('#shortcuts-container').css('display', 'flex');
        $('.containers:not(#shortcuts-container)').css('display', 'none');
        $('h1').attr('data-trans', 'shortcut_list');
    } else if(functionnality == 'money') {
        $('#money-container').css('display', 'flex');
        $('.containers:not(#money-container)').css('display', 'none');
        $('h1').attr('data-trans', 'calculator_fn');
    }

    displayLanguage();
}
