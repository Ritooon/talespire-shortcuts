const moneyTypes = {
    pp: 1000,
    ep: 200,
    gp: 100,
    sp: 10,
    cp: 1
}

function getInput(money)
{
    const nbPieces = !isNaN(parseInt(localStorage.getItem(money))) ? parseInt(localStorage.getItem(money)) : 0;
    return (`
        <div class="m-2">
            <h4>
                <span>${getCoin(money, '54px')}</span>
                <span data-trans="${money}" class="translated valign-middle"></span>
                <span id="new_${money}" class="title_indicator valign-middle ml-1"></span>
            </h4>
            <input type="number" step="1" name="${money}" class="money_input" data-money="${money}" value="${nbPieces}" />
        </div>
    `);
}

function getOption(money)
{
    return `<option class="translated" value="${money}" data-trans="${money}" ${money === "gp" && 'selected="selected"'}>${money}</option>`
}

function loadMoney()
{
    let calculator = `
    <div class="p-0 m-0 card text-white bg-secondary">
        <div class="card-header text-center">
            <h2><img src="assets/img/money-bag.png"> <span class="translated" data-trans="calculator_fn"></span></h2>
        </div>

        <div class="card-body text-center">
            <div class="row text-center mb-4">
                <div class="col-12">
                    <span class="translated p-2 bg-coral text-white big-bold" data-trans="reminder"></span> :
                    <span>${getCoin("gp")} = ${getCoin("sp")}x10</span> |
                    <span>${getCoin("gp")} = ${getCoin("cp")}x100</span> |
                    <span>${getCoin("gp")} = ${getCoin("ep")}x2</span> |
                    <span>${getCoin("pp")} = ${getCoin("gp")}x10</span> |
                    <span>${getCoin("pp")} = ${getCoin("ep")}x20</span>
                </div>
            </div>
        <div class="d-flex flex-wrap justify-content-center">
            ${Object.keys(moneyTypes).map(getInput).join('')}
        </div>

        <div class="row text-center mt-4">
            <h3 data-trans="money_more_less" class="translated"></h3>
            <div class="col">
                <select id="money_type">
                    ${Object.keys(moneyTypes).map(getOption).join('')}
                </select>
                <input type="number" step="1" id="money_to_add_remove" />
                <button class="btn btn-danger translated ml-4" onclick="doCalculate(\'validate\')" data-trans="validate"></button>
            </div>
        </div>
    </div>
    `;

    $('#money-container').html(calculator);
    bindMoney();
}

function bindMoney()
{
    // save money
    $('.money_input').off('change, keyup').on('change, keyup', function(){
        localStorage.setItem($(this).attr('data-money'), $(this).val());
    });

    // Select money type trigger
    $('#money_type').off('change').on('change', function(){
        doCalculate('simulate');
    });

    // Value to add/remove trigger
    $('#money_to_add_remove').off('change, keyup').on('change, keyup', function(){
        doCalculate('simulate');
    });
}

function doCalculate(simVal)
{
    $('#new_pp').html('').css('display', 'none');
    $('#new_pp, #new_ep, #new_gp, #new_sp, #new_cp').html('').css('display', 'none');

    if(isNaN($('#money_to_add_remove').val()) || parseInt($('#money_to_add_remove').val()) == 0) { return; }

    // Convert money bag into PC
    let totalPC = 0;
    Object.keys(moneyTypes).forEach(money => {
        let tmpMoney = !isNaN(parseInt(localStorage.getItem(money))) ? parseInt(localStorage.getItem(money)) : 0;

        totalPC += tmpMoney * parseInt(moneyTypes[money]);
    });

    // Convert val to add or remove into PC
    let moneyToAddRemove = $('#money_type').val();
    let valToAddRemove = $('#money_to_add_remove').val();
    let conversionToCP = parseInt(valToAddRemove) * parseInt(moneyTypes[moneyToAddRemove]);

    // Add Or Remove
    let newTotalCP = totalPC + conversionToCP;

    // Convert money in this sens : from PP to PC and update bag
    let newPP = 0, newEP = 0, newCP = 0, newSP = 0, newGP = 0;
    let emergcyStop = 0
    while (newTotalCP > 0)
    {
        if(parseInt(newTotalCP/1000) > 0)
        {
            newPP = parseInt(newTotalCP/1000);
            newTotalCP -= (newPP*1000);
        }
        else if(parseInt(newTotalCP/200) > 0)
        {
            newEP = parseInt(newTotalCP/200);
            newTotalCP -= (newEP*200);
        }
        else if(parseInt(newTotalCP/100) > 0)
        {
            newGP = parseInt(newTotalCP/100);
            newTotalCP -= (newGP*100);
        }
        else if(parseInt(newTotalCP/10) > 0)
        {
            newSP = parseInt(newTotalCP/10);
            newTotalCP -= (newSP*10);
        }
        else
        {
            newCP = newTotalCP;
            newTotalCP = 0;
        }

        emergcyStop++;
        if (emergcyStop > 20) { break; }
    }

    // If simulation : Display potential results
    if(simVal == 'simulate')
    {
        $('#new_pp').html(`<i class="fas fa-arrow-right"></i> ${newPP}`).css('display', 'inline-block');
        $('#new_ep').html(`<i class="fas fa-arrow-right"></i> ${newEP}`).css('display', 'inline-block');
        $('#new_gp').html(`<i class="fas fa-arrow-right"></i> ${newGP}`).css('display', 'inline-block');
        $('#new_sp').html(`<i class="fas fa-arrow-right"></i> ${newSP}`).css('display', 'inline-block');
        $('#new_cp').html(`<i class="fas fa-arrow-right"></i> ${newCP}`).css('display', 'inline-block');
    }
    // If validation update bag immediatly
    else if(simVal == 'validate')
    {
        $('input[data-money="pp"]').val(newPP).trigger('keyup');
        $('input[data-money="ep"]').val(newEP).trigger('keyup');
        $('input[data-money="gp"]').val(newGP).trigger('keyup');
        $('input[data-money="sp"]').val(newSP).trigger('keyup');
        $('input[data-money="cp"]').val(newCP).trigger('keyup');

        $('#money_to_add_remove').val('');
    }
}