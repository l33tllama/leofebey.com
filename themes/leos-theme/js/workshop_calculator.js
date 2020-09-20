let parts_form = $("#parts-form");
let items = parts_form.children();
let total_price = 0;
let workshop_fee = parseFloat($("#workshop-fee").attr("fee"));

for(let i = 0; i < items.length; i++){
    items[i].click(click_handler);
    let checked = items[i].attr("checked");
    if(checked){
        let item_price = parseFloat(items[i].attr("price"));
        total_price += item_price;
    }
}
total_price += workshop_fee;
$("#total-price").html("$" + total_price);

function click_handler(){
    let parts_form = $("#parts-form");
    let items = parts_form.children();
    total_price = 0;
    for(let i = 0; i < items.length; i++){
        if(items[i].classList.contains("required")){
            items[i].attr("checked", "true");
        }
        let checked = items[i].attr("checked");
        if(checked){
            let item_price = parseFloat(items[i].attr("price"));
            total_price += item_price;
        }
    }
    total_price += workshop_fee;
    $("#total-price").html("$" + total_price);
}