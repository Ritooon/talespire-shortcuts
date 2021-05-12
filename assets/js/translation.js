var arrayLanguages = {
    'en': {
        'shortcut_list': 'Shortcuts list',
        'menu_shortcuts' : 'Shortcuts (Dice)',
        'menu_calculator' : 'Money calculator',
        'calculator_fn': 'Money calculator <span class="blockquote">(beta)</span>',
        'po': 'PO',
        'pc' : 'PC',
        'pa' : 'PA',
        'pe' : 'PE',
        'pp' : 'PP',
        'money_more_less' : 'Add or remove money',
        'simulate': 'Simulate',
        'validate': 'Validate',
        'reminder': 'Reminder'
    },
    'fr': {
        'shortcut_list': 'Liste des raccourcis',
        'menu_shortcuts' : 'Raccourcis (Dés)',
        'menu_calculator' : 'Calculette (Monnaie)',
        'calculator_fn': 'Calculette (Monnaie) <span class="blockquote">(beta)</span>',
        'po': 'PO',
        'pc' : 'PC',
        'pa' : 'PA',
        'pe' : 'PE',
        'pp' : 'PP',
        'money_more_less' : 'Ajouter ou retirer de la monnaie',
        'simulate': 'Simuler',
        'validate': 'Valider',
        'reminder': 'Rappel'
    }
}

// Carteristics array - Global
var arrayCaracteristics = [];

//
var language = (localStorage.getItem('lang') == null || localStorage.getItem('lang') == 'en') ? 'en' : 'fr';

function displayLanguage()
{
    if(typeof localStorage.getItem('lang') == 'undefined' || localStorage.getItem('lang') == null || localStorage.getItem('lang') == 'en')
    {
        $('#english-switch').css('display', 'none');
        $('#french-switch').css('display', 'inline-block');

        arrayCaracteristics = [
            {'carac': 'strength', 'name': 'Strength'},
            {'carac': 'dexterity', 'name': 'Dexterity'},
            {'carac': 'constitution', 'name': 'Constitution'},
            {'carac': 'intelligence', 'name': 'Intelligence'},
            {'carac': 'wisdom', 'name': 'Wisdom'},
            {'carac': 'charisma', 'name': 'Charisma'}
        ];
    }
    else
    {
        $('#english-switch').css('display', 'inline-block');
        $('#french-switch').css('display', 'none');

        arrayCaracteristics = [
            {'carac': 'strength', 'name': 'Force'},
            {'carac': 'dexterity', 'name': 'Dextérité'},
            {'carac': 'constitution', 'name': 'Constitution'},
            {'carac': 'intelligence', 'name': 'Intelligence'},
            {'carac': 'wisdom', 'name': 'Sagesse'},
            {'carac': 'charisma', 'name': 'Charisme'}
        ];
    }

    loadMenu();
    loadCaracteristics();

    $('.translated').each(function(){
        let transKey = $(this).attr('data-trans');
        $($(this)).html(arrayLanguages[language][transKey]);
    });
}


function switchLanguage(lang)
{
    if(lang == 'en') {
        $('#english-switch').css('display', 'none');
        $('#french-switch').css('display', 'inline-block');
    } else {
        $('#english-switch').css('display', 'inline-block');
        $('#french-switch').css('display', 'none');
    }

    localStorage.setItem('lang', lang);
    language = lang;

    displayLanguage();
}