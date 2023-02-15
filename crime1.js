
//make an AJAX request for data and output the result in HTML to the page
function getDataFromAPI() {

    //get the user-entered values
    var geography = $("#geography").val();
    var year = $("#year").val();

    //validate the input
    if (geography == "" || geography.length > 100) {
        alert("You need to enter a town name.");
    } else if (year == "" || year.length != 4 || isNaN(year)) {
        alert("You need to enter a valid year.");
    } else {
        //reset the results, show the spinner
        $("#results_container").html("");
        $("#pleasewait").show();
        $("#geography").val("");
        $("#year").val("");
        $("#geography").focus();
    
        //AJAX request
        var url = "https://data.novascotia.ca/resource/m862-kmjy.json?$where=geography%20like%20%27%25" + geography + "%25%27%20and%20year%20=%20%27" + year + "%27";
        $.get(url, function(data, status){
            //JSON response
            //console.log(data, status);
            var count = 0;
    
            var result = "<h1>Crime for " + geography + " in " + year +"</h1>";
            result += "<ul>";
            for(var i = 0; i < data.length; i++) {
                //console.log(data[i].violations,data[i].incidents);
                result += "<li>" + data[i].violations + " " + (data[i].incidents? data[i].incidents : "") + "</li>"
                count +=  parseInt(data[i].incidents? data[i].incidents : 0);
            }
            result += "</ul><P>" + count + " incidents.</p>";

            //set the results (HTML) on the page
            $("#results_container").html(result);

            //hide the spinner
            $("#pleasewait").hide();

        });    
    }
}

function setup() {
    $("#pleasewait").hide();
    $("#geography").focus();

    const el = document.getElementById("getdata_btn");
    el.addEventListener("click", getDataFromAPI, false);
}

window.addEventListener("load", (event) => {
    setup();
});









