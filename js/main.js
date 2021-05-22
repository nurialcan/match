$(document).ready(function () {
    var a = 0, card1 = "", card2 = "", card1ID = 0, card2ID = 0,
    xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            let xml = this.responseXML,
            item = xml.getElementsByTagName("item"),
            itemArray = [], numberArray = [];
            for(let i = 0; i < item.length; i++) {
                itemArray[i] = item[i].innerHTML;
                numberArray[i] = i + 1;
            }
            itemArray.sort(function(a, b){return 0.5 - Math.random()});
            numberArray.sort(function(a, b){return 0.5 - Math.random()});
            for(let i = 0; i < item.length; i++) {
                $(".flip-box:nth-child(" + numberArray[i] + ") .flip-back i").addClass(itemArray[i]);
            }
        }
    };
    xhr.open("GET", "deneme.xml");
    xhr.send();
    
    for(let i = 1; i <= $(".flip-box").length; i++) {
        $(".flip-box:nth-child(" + i +")").attr("id", i);
    }
    $(".flip-box-inner").click(function () { 
        if(a == 0) {
            card1 = $(this).children(".flip-back").children().attr("class");
            card1ID = $(this).parent().attr("id");
        }
        else if(a == 1) {
            card2 = $(this).children(".flip-back").children().attr("class");
            card2ID = $(this).parent().attr("id");
            if(card1 == card2 && card1ID != card2ID) {
                let className = card1.split(" ");
                setTimeout(() => {
                    $("." + className[1]).parent().parent().fadeOut(600);
                }, 500);
            }
        }
        else if(a == 2) {
            $(".flip-box-inner").removeClass("flip");
            a = 0;
            card1 = $(this).children(".flip-back").children().attr("class");
            card1ID = $(this).parent().attr("id");
        }
        $(this).toggleClass("flip");
        a++;
    });
});