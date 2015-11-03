
/*jslint browser: true*/
/*global $, jQuery, alert*/
$(document).ready(function () {
    "use strict";

   
    //make your label variables
    var manuCost, manPercent, distroCost, distroPercent, wholeCost, wholePercent, retailCost, retailPercent, customerCost, manProfit, distroProfit, wholeProfit, retailProfit;
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

    //we will either have a known price for customers or
    //or we will have a known sale price for manufactures
    //on top of knowing the marin % for each middleman
    //knowing this the formula become x=cost/(1-margin%)
        
    //limit the margin percentages to 2 digits so we dont brake the maths.
    $(".percent").on("input", function () {
        // Note: this is a bit tortured, because we cannot assign this.value every time
        // E.g. in the case where a user types a . to indicate fractions of a %, the .
        // will only show up in value after a number is typed.  If we reassign
        // value in this case, we blow away the . before the number can be typed.
        if (this.value >= 99.99) {
            this.value = 99.99
        }
        if (this.value <= 0) {
            this.value = 0
        }
        if (this.value.indexOf(".") >= 0) {
            // Limit to 2 decimal points, and round if needed
            this.value = parseFloat(this.value).toFixed(2)
        }
    });
 
    var calcProfit = function(profitText) {
        return function(cost, price) {
            //for the manProfit
            var profit = price - cost;
            //round the answer to decimal places
            profit = Math.round(profit * 100) / 100;
            //convert it back to a string and set its text
            profitText.text("$" + profit.toString(10));
            return profit
        }
    } 
    // Function to use to calculate the price (i.e. the next cost in a stack)
    var calcPrice = function(priceText, profitText) {
        return function(cost, pct) {
            //to get the next cost you use X = cost/(1-margin%)
            var price = cost / (1 - (pct / 100));
            //round the answer to decimal places
            price = price.toFixed(2) //Math.round(number * 100) / 100;
            //convert it back to a string and set its text
            //NOTE: set both text and val, as costText may be either a text field or input
            priceText.text("$" + price.toString(10));
            priceText.val(price)
            return price
        }
    }

    // Function to use to calculate the cost (i.e. the previous cost in a stack)
    var calcCost = function(costText) {
        return function(price, pct) {
            //to get the retail cost you use X = customerCost(1-margin%)
            var cost = price * (1 - (pct / 100));
            //round the answer to decimal places
            cost = cost.toFixed(2)
            //convert it back to a string and set its text
            costText.text("$" + cost.toString(10));
            costText.val(cost)
            return cost
        }
    }

    var calcCostPct = function(pctVal) {
        return function(cost, price) {
            var percent = (1 - (cost / price)) * 100;
            //round the answer to decimal places
            percent = percent.toFixed(2)
            //set its value
            pctVal.val(percent);
            return percent
        }
    }
    //start with when user enters a known manufacturers cost, cause thats what we are :)
    $("#manCost, #manPercent, #distroPercent, #wholePercent, #retailPercent").on("input", function () {
        //first convert the cost and margin percent into numbers.
        manuCost = parseInt($("#manCost").val(), 10);
        manPercent = parseFloat($("#manPercent").val());
        distroPercent = parseFloat($("#distroPercent").val());
        wholePercent = parseFloat($("#wholePercent").val());
        retailPercent = parseFloat($("#retailPercent").val());
       
        var manProfitCalc    = calcProfit(manProfit)
        var distroProfitCalc = calcProfit(distroProfit)
        var wholeProfitCalc  = calcProfit(wholeProfit)
        var retailProfitCalc = calcProfit(retailProfit)
        var distroCalc    = calcPrice(distroCost)
        var wholeCalc     = calcPrice(wholeCost)
        var retailCalc    = calcPrice(retailCost)
        var customerCalc  = calcPrice($("#customerInput"))

        var nextCost = manuCost
        var price = 0
        price = distroCalc(nextCost, manPercent) 
        manProfitCalc(nextCost, price)
        nextCost = price
        price = wholeCalc(nextCost, distroPercent) 
        distroProfitCalc(nextCost, price)
        nextCost = price
        price = retailCalc(nextCost, wholePercent)
        wholeProfitCalc(nextCost, price)
        nextCost = price
        price = customerCalc(nextCost, retailPercent)
        retailProfitCalc(nextCost, price)
    });
    
    //make changing the cost also do maths
    $("#customerInput").on("input", function () {
        //first convert the cost into a number.
        customerCost  = parseInt($("#customerInput").val(), 10);
        distroPercent = parseFloat($("#distroPercent").val());
        wholePercent  = parseFloat($("#wholePercent").val());
        retailPercent = parseFloat($("#retailPercent").val());
        manuCost      = parseInt($("#manCost").val(), 10);

        var manProfitCalc    = calcProfit(manProfit)
        var distroProfitCalc = calcProfit(distroProfit)
        var wholeProfitCalc  = calcProfit(wholeProfit)
        var retailProfitCalc = calcProfit(retailProfit)
        var distroCalc = calcCost(distroCost)
        var wholeCalc  = calcCost(wholeCost)
        var retailCalc = calcCost(retailCost)
        var manuCalc   = calcCostPct($("#manPercent"))
       
        var price = customerCost 
        var cost = 0
        cost = retailCalc(price, retailPercent)
        retailProfitCalc(cost, price)
        price = cost
        cost = wholeCalc (price, wholePercent) 
        wholeProfitCalc(cost, price)
        price = cost
        cost = distroCalc(price, distroPercent) 
        distroProfitCalc(cost, price)
        price = cost

        manuCalc(manuCost, price)
        manProfitCalc(manuCost, price)
    });
});
