function loadCaracteristics()
{
    $('#shortcuts-container').html('');

    const caraBlocks = arrayCaracteristics.map(({name, carac}) => {
        return (`
            <div class="p-0 m-0 col-4 card text-white bg-secondary">
                <div class="card-header text-center"><img src="assets/img/${carac}.png" /> ${name}
                    <input type="text" id="${carac}-mod" placeholder="Mod." class="modificator" />
                </div>
                <div class="d-flex justify-content-center flex-wrap card-body text-center">
                    <a class="launch-dice" data-type="${carac}" data-dice="4"><img src="assets/img/d4.svg" class="d4-color" /></a>
                    <a class="launch-dice" data-type="${carac}" data-dice="6"><img src="assets/img/d6.svg" class="d6-color" /></a>
                    <a class="launch-dice" data-type="${carac}" data-dice="8"><img src="assets/img/d8.svg" class="d8-color" /></a>
                    <a class="launch-dice" data-type="${carac}" data-dice="10"><img src="assets/img/d10.svg" class="d10-color" /></a>
                    <a class="launch-dice" data-type="${carac}" data-dice="12"><img src="assets/img/d12.svg" class="d12-color" /></a>
                    <a class="launch-dice" data-type="${carac}" data-dice="20"><img src="assets/img/d20.svg" class="d20-color" /></a>
                </div>
            </div>
        `)
    });
    $('#shortcuts-container').append(caraBlocks);

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
        let modificator = parseInt($(`#${modValue}-mod`).val());

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
    arrayCaracteristics.forEach(({carac}) => {
        $(`#${carac}-mod`).val(localStorage.getItem(`${carac}-mod`));
    });
}