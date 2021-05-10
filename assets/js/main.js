$(document).ready(function(){
    loadTheme();
    loadCaracteristics();
});

var arrayCaracteristics = [
    {'carac': 'strength', 'name': 'Force'},
    {'carac': 'dexterity', 'name': 'Dextérité'},
    {'carac': 'constitution', 'name': 'Constitution'},
    {'carac': 'intelligence', 'name': 'Intelligence'},
    {'carac': 'wisdom', 'name': 'Sagesse'},
    {'carac': 'charisma', 'name': 'Charisme'}
];

function loadCaracteristics()
{
    arrayCaracteristics.forEach(element => {
        let caraBlock = '<div class="p-0 m-0 col-4 card text-white bg-secondary m-3">';
        caraBlock += '<div class="card-header text-center"><img src="assets/img/'+element.carac+'.png" /> '+element.name;
        caraBlock += '<input type="text" id="'+element.carac+'-mod" placeholder="Mod." class="modificator" />';
        caraBlock += '</div>';
        caraBlock += '<div class="card-body text-center">';
        caraBlock += '<a class="launch-dice" data-type="'+element.carac+'" data-dice="4"><img src="assets/img/d4.svg" class="d4-color" /></a>';
        caraBlock += '<a class="launch-dice" data-type="'+element.carac+'" data-dice="6"><img src="assets/img/d6.svg" class="d6-color" /></a>';
        caraBlock += '<a class="launch-dice" data-type="'+element.carac+'" data-dice="8"><img src="assets/img/d8.svg" class="d8-color" /></a>';
        caraBlock += '<a class="launch-dice" data-type="'+element.carac+'" data-dice="10"><img src="assets/img/d10.svg" class="d10-color" /></a>';
        caraBlock += '<a class="launch-dice" data-type="'+element.carac+'" data-dice="12"><img src="assets/img/d12.svg" class="d12-color" /></a>';
        caraBlock += '<a class="launch-dice" data-type="'+element.carac+'" data-dice="20"><img src="assets/img/d20.svg" class="d20-color" /></a>';
        caraBlock += '</div></div>';

        $('#shortcuts-container').append(caraBlock);
    });

    bindActions();
    loadModificators();
}

function bindActions()
{
    $('.modificator').off('keyup').on('keyup', function(){
        localStorage.setItem($(this).attr('id'), $(this).val());
    });

    $('.launch-dice').off('click').on('click', function(){
        let modificator = parseInt($('#'+$(this).attr('data-type')+'-mod').val());
        
        if(isNaN(modificator)) 
        { 
            modificator = ''; 
        } 
        else if(modificator > 0)
        {
            modificator = '+'+modificator;
        }

        window.open('talespire://dice/attack:d'+$(this).attr('data-dice')+modificator);
    });
}

function loadModificators()
{
    arrayCaracteristics.forEach(element => {
        $('#'+element.carac+'-mod').val(localStorage.getItem(element.carac+'-mod'));
    });
}

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