/*jslint browser: true*/
/*global $, jQuery, alert*/
$(document).ready(function () {
    "use strict";

    
    //make your label variables
    var manuCost, manPercent, distroCost, distroPercent, wholeCost, wholePercent, retailCost, retailPercent, customerCost, number, newNumber, manProfit, distroProfit, wholeProfit, retailProfit, profitNumber;
    manuCost = "";
    manPercent = "";
    distroCost = $("#distroCost");
    distroPercent = "";
    wholeCost = $("#wholeCost");
    wholePercent = "";
    retailCost = $("#retailCost");
    retailPercent = $("#retailPercent").val();
    customerCost = $("#customerInput");
    
    manProfit = $("#manProfit");
    distroProfit = $("#distroProfit");
    wholeProfit = $("#wholeProfit");
    retailProfit = $("#retailProfit");
    
    //for use in the maths
    number = "";
    newNumber = "";
    profitNumber = "";

    //we will either have a known price for customers or
    //or we will have a known sale price for manufactures
    //on top of knowing the marin % for each middleman
    //knowing this the formula become x=cost/(1-margin%)
        
    //limit the margin percentages to 2 digits so we dont brake the maths.
    $("#manPercent, #distroPercent, #wholePercent, #retailPercent").on("input", function () {
        if (this.value.length > 2) {
            this.value = this.value.slice(0, 2);
        }
    });
    
    //start with when user enters a known manufacturers cost, cause thats what we are :)
    $("#manCost, #manPercent, #distroPercent, #wholePercent, #retailPercent").on("input", function () {
        //first convert the cost and margin percent into numbers.
        manuCost = parseInt($("#manCost").val(), 10);
        manPercent = parseInt($("#manPercent").val(), 10);
        
        //for the distro cost
        //to get the distro cost you use X = cost/(1-margin%)
        number = manuCost / (1 - (manPercent / 100));
        //round the answer to decimal places
        number = Math.round(number * 100) / 100;
        //save this for later use
        newNumber = number;
        //convert it back to a string and set its text
        distroCost.text("$" + number.toString(10));
        
        //for the manProfit
        number = number - manuCost;
        //round the answer to decimal places
        number = Math.round(number * 100) / 100;
        //convert it back to a string and set its text
        manProfit.text("$" + number.toString(10));
        //save this for later use
        profitNumber = newNumber;
        
        //for the wholesale cost
        //you will need to convert the distro margin percent into a number
        distroPercent = parseInt($("#distroPercent").val(), 10);
        //to get the wholesale cost you use X = distrocost/(1-margin%)
        number = newNumber / (1 - (distroPercent / 100));
        //round the answer to decimal places
        number = Math.round(number * 100) / 100;
        //save this for later use
        newNumber = number;
        //convert it back to a string and set its text
        wholeCost.text("$" + number.toString(10));
        
        //for the distro profit
        number = number - profitNumber;
        //round the answer to decimal places
        number = Math.round(number * 100) / 100;
        //convert it back to a string and set its text
        distroProfit.text("$" + number.toString(10));
        //save this for later use
        profitNumber = newNumber;
        
        //for the retail cost
        //you will need to convert the wholesale margin percent into a number
        wholePercent = parseInt($("#wholePercent").val(), 10);
        //to get the retail cost you use X = wholesalecost/(1-margin%)
        number = newNumber / (1 - (wholePercent / 100));
        //round the answer to decimal places
        number = Math.round(number * 100) / 100;
        //save this for later use
        newNumber = number;
        //convert it back to a string and set its text
        retailCost.text("$" + number.toString(10));
        
        //for the wholesale profit
        number = number - profitNumber;
        //round the answer to decimal places
        number = Math.round(number * 100) / 100;
        //convert it back to a string and set its text
        wholeProfit.text("$" + number.toString(10));
        //save this for later use
        profitNumber = newNumber;
        
        //for the customer cost
        //you will need to convert the retail margin percent into a number
        retailPercent = parseInt($("#retailPercent").val(), 10);
        //to get the customer cost you use X = retailcost/(1-margin%)
        number = newNumber / (1 - (retailPercent / 100));
        //round the answer to decimal places
        number = Math.round(number * 100) / 100;
        //set its value
        $("#customerInput").val(number);
        
        //for the retail profit
        number = number - profitNumber;
        //round the answer to decimal places
        number = Math.round(number * 100) / 100;
        //convert it back to a string and set its text
        retailProfit.text("$" + number.toString(10));
    });
    
    //make changing the cost also do maths
    $("#customerInput").on("input", function () {
        //first convert the cost into a number.
        customerCost = parseInt($("#customerInput").val(), 10);

        //for the retail cost
        //you will need to convert the retail margin percent into a number
        retailPercent = parseInt($("#retailPercent").val(), 10);
        //to get the retail cost you use X = customerCost(1-margin%)
        number = customerCost * (1 - (retailPercent / 100));
        //round the answer to decimal places
        number = Math.round(number * 100) / 100;
        //save this for later use
        newNumber = number;
        //convert it back to a string and set its text
        retailCost.text("$" + number.toString(10));
        
        //for the retail profit
        number = customerCost - number;
        //round the answer to decimal places
        number = Math.round(number * 100) / 100;
        //convert it back to a string and set its text
        retailProfit.text("$" + number.toString(10));
        //save this for later use
        profitNumber = newNumber;
        
        //for the wholesale cost
        //you will need to convert the wholesale margin percent into a number
        wholePercent = parseInt($("#wholePercent").val(), 10);
        //to get the wholesale cost you use X = retailCost(1-margin%)
        number = newNumber * (1 - (wholePercent / 100));
        //round the answer to decimal places
        number = Math.round(number * 100) / 100;
        //save this for later use
        newNumber = number;
        //convert it back to a string and set its text
        wholeCost.text("$" + number.toString(10));
        
        //for the wholesale profit
        number = profitNumber - number;
        //round the answer to decimal places
        number = Math.round(number * 100) / 100;
        //convert it back to a string and set its text
        wholeProfit.text("$" + number.toString(10));
        //save this for later use
        profitNumber = newNumber;
        
        //for the distro cost
        //you will need to convert the distro margin percent into a number
        distroPercent = parseInt($("#distroPercent").val(), 10);
        //to get the wholesale cost you use X = wholesale(1-margin%)
        number = newNumber * (1 - (distroPercent / 100));
        //round the answer to decimal places
        number = Math.round(number * 100) / 100;
        //save this for later use
        newNumber = number;
        //convert it back to a string and set its text
        distroCost.text("$" + number.toString(10));
        
        //for the distro profit
        number = profitNumber - number;
        //round the answer to decimal places
        number = Math.round(number * 100) / 100;
        //convert it back to a string and set its text
        distroProfit.text("$" + number.toString(10));
        //save this for later use
        profitNumber = newNumber;
        
        //for the man % (since this won't change the cost of manufacturing it will just change their margins)
        //you will need to convert the distro margin percent into a number
        distroPercent = parseInt($("#distroPercent").val(), 10);
        //to get the man margin you use X = (1 - (manCost/distroCost)) * 100
        number = (1 - (manuCost / newNumber)) * 100;
        //round the answer to decimal places
        number = Math.round(number * 100) / 100;
        //set its value
        $("#manPercent").val(number);
        
        //for the man profit
        //gotta get the manCost
        newNumber = parseInt($("#manCost").val(), 10);
        number = profitNumber - newNumber;
        //round the answer to decimal places
        number = Math.round(number * 100) / 100;
        //convert it back to a string and set its text
        manProfit.text("$" + number.toString(10));

    });
});