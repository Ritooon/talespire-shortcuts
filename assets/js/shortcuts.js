var arrayCaracteristics = [
    {
        'carac': 'strength', 
        'name': 'Force', 
        'translation': 'strength',
        'sub_carac': ['athletism',]
    },
    {
        'carac': 'dexterity', 
        'name': 'Dextérité', 
        'translation': 'dexterity',
        'sub_carac': ['accrobatics', 'stealth', 'thievery']},
    {
        'carac': 'constitution', 
        'name': 'Constitution', 
        'translation': 'constitution',
        'sub_carac': []},
    {
        'carac': 'intelligence', 
        'name': 'Intelligence', 
        'translation': 'intelligence',
        'sub_carac': ['arcana', 'history', 'investigation', 'nature', 'religion']
    },
    {
        'carac': 'wisdom', 
        'name': 'Sagesse', 
        'translation': 'wisdom',
        'sub_carac': ['dressage','heal','perception','insight','survival']
    },
    {
        'carac': 'charisma', 
        'name': 'Charisme',
        'translation': 'charisma',
        'sub_carac': ['intimidate', 'persuasion', 'streetwise', 'bluff']
    }
];

function loadCaracteristics()
{
    displayLanguage();
    bindActions();
    loadModificators();
}

function bindActions()
{
    $('.modificator').off('keyup').on('keyup', function(){
        localStorage.setItem($(this).attr('id'), $(this).val());
    });

    $('.launch-dice').off('click').on('click', function(){
        const modValue = $(this).attr('data-type');
        const skillSelected = $('input[name="'+modValue+'-radio"]:checked').attr('id');
        let modificator = parseInt($('#'+skillSelected.replace('-radio', '')+'-mod').val());

        console.log(modificator);

        if(isNaN(modificator))
        {
            modificator = '';
        }
        else if(modificator > 0)
        {
            modificator = `+${modificator}`;
        }

        const diceValue = $(this).attr('data-dice')
        window.open(`talespire://dice/attack:d${diceValue}${modificator}`);
    });
}

function loadModificators()
{
    arrayCaracteristics.forEach(({carac, sub_carac}) => {
        $(`#${carac}-mod`).val(localStorage.getItem(`${carac}-mod`));

        for (let i = 0; i < sub_carac.length; i++) {
            $('#'+sub_carac[i]+'-mod').val(localStorage.getItem(sub_carac[i]+'-mod'));
        }
    });
}