var moneyType = [
    {'money': 'po', 'trans' : 'po', 'multiplicator_to_pc' : 100},
    {'money': 'pa', 'trans' : 'pa', 'multiplicator_to_pc' : 10},
    {'money': 'pc', 'trans' : 'pc', 'multiplicator_to_pc' : 1},
    {'money': 'pp', 'trans' : 'pp', 'multiplicator_to_pc' : 1000},
    {'money': 'pe', 'trans' : 'pe', 'multiplicator_to_pc' : 200},
];

var multiplicators = { 'po' : 100, 'pa' : 10, 'pc' : 1, 'pp' : 1000, 'pe' : 200 };

function getInput({money, trans})
{
    const nbPieces = !isNaN(parseInt(localStorage.getItem(money))) ? parseInt(localStorage.getItem(money)) : 0;
    return (`
        <div class="col">
            <h4>
                <span>${getCoin(money, '54px')}</span>
                <span data-trans="${trans}" class="translated valign-middle"></span>
                <span id="new_${money}" class="title_indicator valign-middle ml-1"></span>
            </h4>
            <input type="number" step="1" name="${money}" class="money_input" data-money="${money}" value="${nbPieces}" />
        </div>
    `);
}

function getOption({money, trans})
{
    return `<option class="translated" value="${money}">${trans}</option>`
}

function loadMoney()
{
    let calculator = `
    <div class="p-0 m-0 card text-white bg-secondary m-3">
        <div class="card-header text-center">
            <h2><img src="assets/img/money-bag.png"> <span class="translated" data-trans="calculator_fn"></span></h2>
        </div>

        <div class="card-body text-center">
            <div class="row text-center mb-4">
                <div class="col-12">
                    <span class="translated p-2 bg-coral text-white big-bold" data-trans="reminder"></span> :
                    <span>${getCoin("po")} = ${getCoin("pa")}x10</span> |
                    <span>${getCoin("po")} = ${getCoin("pc")}x100</span> |
                    <span>${getCoin("po")} = ${getCoin("pe")}x2</span> |
                    <span>${getCoin("pp")} = ${getCoin("po")}x10</span> |
                    <span>${getCoin("pp")} = ${getCoin("pe")}x20</span>
                </div>
            </div>
        <div class="row text-center">
            ${moneyType.map(getInput).join('')}
        </div>

        <div class="row text-center mt-4">
            <h3 data-trans="money_more_less" class="translated"></h3>
            <div class="col">
                <select id="money_type">
                    ${moneyType.map(getOption).join('')}
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
    $('#new_pp, #new_pe, #new_po, #new_pa, #new_pc').html('').css('display', 'none');

    if(isNaN($('#money_to_add_remove').val()) || parseInt($('#money_to_add_remove').val()) == 0) { return; }

    // Convert money bag into PC
    let totalPC = 0;
    moneyType.forEach(element => {
        let tmpMoney = !isNaN(parseInt(localStorage.getItem(element.money))) ? parseInt(localStorage.getItem(element.money)) : 0;

        totalPC += tmpMoney*parseInt(element.multiplicator_to_pc);
    });

    // Convert val to add or remove into PC
    let moneyToAddRemove = $('#money_type').val();
    let valToAddRemove = $('#money_to_add_remove').val();
    let conversionToPC = parseInt(valToAddRemove)*parseInt(multiplicators[moneyToAddRemove]);

    // Add Or Remove
    let newTotalPC = totalPC + conversionToPC;

    // Convert money in this sens : from PP to PC and update bag
    let newPP = 0, newPE = 0, newPC = 0, newPA = 0, newPO = 0;
    let emergcyStop = 0
    while (newTotalPC > 0)
    {
        if(parseInt(newTotalPC/1000) > 0)
        {
            newPP = parseInt(newTotalPC/1000);
            newTotalPC -= (newPP*1000);
        }
        else if(parseInt(newTotalPC/200) > 0)
        {
            newPE = parseInt(newTotalPC/200);
            newTotalPC -= (newPE*200);
        }
        else if(parseInt(newTotalPC/100) > 0)
        {
            newPO = parseInt(newTotalPC/100);
            newTotalPC -= (newPO*100);
        }
        else if(parseInt(newTotalPC/10) > 0)
        {
            newPA = parseInt(newTotalPC/10);
            newTotalPC -= (newPA*10);
        }
        else
        {
            newPC = newTotalPC;
            newTotalPC = 0;
        }

        emergcyStop++;
        if (emergcyStop > 20) { break; }
    }

    // If simulation : Display potential results
    if(simVal == 'simulate')
    {
        $('#new_pp').html(`<i class="fas fa-arrow-right"></i> ${newPP}`).css('display', 'inline-block');
        $('#new_pe').html(`<i class="fas fa-arrow-right"></i> ${newPE}`).css('display', 'inline-block');
        $('#new_po').html(`<i class="fas fa-arrow-right"></i> ${newPO}`).css('display', 'inline-block');
        $('#new_pa').html(`<i class="fas fa-arrow-right"></i> ${newPA}`).css('display', 'inline-block');
        $('#new_pc').html(`<i class="fas fa-arrow-right"></i> ${newPC}`).css('display', 'inline-block');
    }
    // If validation update bag immediatly
    else if(simVal == 'validate')
    {
        $('input[data-money="pp"]').val(newPP).trigger('keyup');
        $('input[data-money="pe"]').val(newPE).trigger('keyup');
        $('input[data-money="po"]').val(newPO).trigger('keyup');
        $('input[data-money="pa"]').val(newPA).trigger('keyup');
        $('input[data-money="pc"]').val(newPC).trigger('keyup');

        $('#money_to_add_remove').val('');
    }
}