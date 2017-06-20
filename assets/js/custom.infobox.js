function drawInfobox(infoboxContent, json, i){
    if(json.facilities[i].facility_name){
        var facility_name = json.facilities[i].facility_name;
    }
    else facility_name = "";

    if(json.facilities[i].facility_common_name){
        var facility_common_name = json.facilities[i].facility_common_name;
        if(facility_common_name == facility_name){
            facility_common_name = "";
        }
        else{
            facility_common_name = facility_common_name+" - ";
        }
    }
    else facility_common_name = "";

    if(json.facilities[i].zone){
        var zone = json.facilities[i].zone;
    }
    else zone = "";

    if(json.facilities[i].facility_type){
        var facility_type = json.facilities[i].facility_type;
    }
    else facility_type = "";

    if(json.facilities[i].status){
        var status = json.facilities[i].status;
    }
    else status = "";

    if(json.facilities[i].ownership){
        var ownership = json.facilities[i].ownership;
    }
    else ownership = "";

    var ibContent = '';
    ibContent =
    '<div class="infobox">' +
        '<div class="right">' +
            '<article class="animate move_from_top_short">' +
                '<h3>'+ facility_name +'</h3>' +
                '<p>'+ facility_common_name +' '+ zone +'</p>' +
            '</article>' +
            '<article class="animate move_from_top_short">' +
                '<h3>Description</h3>' +
                '<dl>' +
                    '<dt>Type</dt>' +
                    '<dd>'+ facility_type +'</dd>' +
                    '<dt>Status</dt>' +
                    '<dd>'+ status +'</dd>' +
                    '<dt>Ownership</dt>' +
                    '<dd>'+ ownership +'</dd>' +
                '</dl>' +
            '</article>' +
        '</div>' +
    '</div>';

    return ibContent;
}