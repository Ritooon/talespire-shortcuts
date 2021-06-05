var arrayLanguages = {
    'en': {
        'shortcut_list': 'Shortcuts list',
        'menu_shortcuts' : 'Shortcuts (Dice)',
        'menu_calculator' : 'Money calculator',
        'calculator_fn': 'Money calculator <span class="blockquote">(beta)</span>',
        'gp': 'GP',
        'cp' : 'CP',
        'sp' : 'SP',
        'ep' : 'EP',
        'pp' : 'PP',
        'money_more_less' : 'Add or remove money',
        'simulate': 'Simulate',
        'validate': 'Validate',
        'reminder': 'Reminder',
        'strength': 'Strength',
        'charisma': 'Charisma',
        'wisdom': 'Wisdom',
        'intelligence': 'Intelligence',
        'dexterity': 'Dexterity',
        'constitution': 'Constitution',
        'accrobatics': 'Accrobatics',
        'stealth': 'Stealth',
        'thievery': 'Thievery',
        'athletism': 'Athletism',
        'arcana': 'Arcana',
        'history': 'History',
        'investigation': 'Investigation',
        'nature': 'Nature',
        'religion': 'Religion',
        'dressage': 'Dressage',
        'heal': 'Heal',
        'perception': 'Perception',
        'insight': 'Insight',
        'survival': 'Survival',
        'intimidate': 'Intimidate',
        'persuasion': 'Persuasion',
        'streetwise': 'Streetwise',
        'bluff': 'Bluff',
    },
    'fr': {
        'shortcut_list': 'Liste des raccourcis',
        'menu_shortcuts' : 'Raccourcis (Dés)',
        'menu_calculator' : 'Calculette (Monnaie)',
        'calculator_fn': 'Calculette (Monnaie) <span class="blockquote">(beta)</span>',
        'gp': 'PO',
        'cp' : 'PC',
        'sp' : 'PA',
        'ep' : 'PE',
        'pp' : 'PP',
        'money_more_less' : 'Ajouter ou retirer de la monnaie',
        'simulate': 'Simuler',
        'validate': 'Valider',
        'reminder': 'Rappel',
        'strength': 'Force',
        'charisma': 'Charisme',
        'wisdom': 'Sagesse',
        'intelligence': 'Intelligence',
        'dexterity': 'Dextérité',
        'constitution': 'Constitution',
        'accrobatics': 'Acrobaties',
        'stealth': 'Discrétion',
        'thievery': 'Escamotage',
        'athletism': 'Athlétisme',
        'arcana': 'Arcanes',
        'history': 'Histoire',
        'investigation': 'Investigation',
        'nature': 'Nature',
        'religion': 'Religion',
        'dressage': 'Dressage',
        'heal': 'Médecine',
        'perception': 'Perception',
        'insight': 'Perspicacité',
        'survival': 'Survie',
        'intimidate': 'Intimidation',
        'persuasion': 'Persuasion',
        'streetwise': 'Représentation',
        'bluff': 'Tromperie',
    }
}

//
var language = (localStorage.getItem('lang') == null || localStorage.getItem('lang') == 'en') ? 'en' : 'fr';

function displayLanguage()
{
    if(typeof localStorage.getItem('lang') == 'undefined' || localStorage.getItem('lang') == null || localStorage.getItem('lang') == 'en')
    {
        $('#english-switch').css('display', 'none');
        $('#french-switch').css('display', 'inline-block');
    }
    else
    {
        $('#english-switch').css('display', 'inline-block');
        $('#french-switch').css('display', 'none');
    }


    loadMenu();

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