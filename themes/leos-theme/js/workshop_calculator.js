let $ = jQuery;
$(document).ready(function(){
    let parts_form = $("#parts-form");
    let items = parts_form.children("*");
    let total_price = 0;
    let workshop_fee = parseFloat($("#workshop-fee").attr("fee"));

    items.each(function(i){
        let item = $(this);
        item.click(click_handler);
        let checked = item.is(":checked");
        if(checked){
            let item_price = parseFloat(item.attr("price"));
            total_price += item_price;
            console.log(item_price);
        }
        console.log(total_price);
    })

    total_price += workshop_fee;
    $("#total-price").html("$" + total_price);

    function click_handler(){
        let parts_form = $("#parts-form");
        let items = parts_form.children();
        total_price = 0;
        items.each(function(i){
            let item = $(this);
            if(item.hasClass("required")){
                item.attr("checked", "true");
            }
            let checked = item.is(":checked");
            if(checked){
                let item_price = parseFloat(item.attr("price"));
                total_price += item_price;
            }
        });
        total_price += workshop_fee;
        $("#total-price").html("$" + total_price);
    }
})

