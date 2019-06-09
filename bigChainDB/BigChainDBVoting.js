

//listening to a vote button
$("#btn_btc").click(function(){
    voterId = $("#voter_id").val()
    currency = "BTC"

    $.ajax({
       url: "/vote/" + currency +"/"+ voterId,
        data: {
        },
        success: function( result ) {
            console.log("Done !")
     }
   });
})
//listening to a vote button
$("#btn_ltc").click(function(){
    voterId = $("#voter_id").val()
    currency = "LTC"

    $.ajax({
       url: "/vote/" + currency +"/"+ voterId,
        data: {
        },
        success: function( result ) {
            console.log("Done !")
     }
   });
})
//listening to a vote button
$("#btn_sek").click(function(){
    voterId = $("#voter_id").val()
    currency = "SEK"

    $.ajax({
       url: "/vote/" + currency +"/"+ voterId,
        data: {
        },
        success: function( result ) {
            console.log("Done !")
     }
   });
})
//listening to a vote button
$("#btn_euro").click(function(){
    voterId = $("#voter_id").val()
    currency = "EURO"

    $.ajax({
       url: "/vote/" + currency +"/"+ voterId,
        data: {
        },
        success: function( result ) {
            console.log("Done !")
     }
   });
})


//listening to search button
$("#show_result").click(function(){
    cntSek = 0
    cntBtc = 0
    cntLtc = 0
    cntEuro = 0
    //this is async
    $.ajax({
       url: "/search_votes/" +"SEK",
        data: {
        },
        success: function( result ) {
            console.log(result)
            cntSek = result.length
     }
   });

    //this is async
    $.ajax({
       url: "/search_votes/" +"BTC",
        data: {
        },
        success: function( result ) {
            console.log(result)
            cntBtc = result.length
     }
   });

    //this is async
    $.ajax({
       url: "/search_votes/" +"LTC",
        data: {
        },
        success: function( result ) {
            console.log(result)
            cntLtc = result.length
     }
   });

    //this is async
    $.ajax({
       url: "/search_votes/" +"EURO",
        data: {
        },
        success: function( result ) {
            console.log(result)
            cntEuro = result.length
     }
   });

    //wait for async calls above to finnish
   sleep(500).then(() => {
        console.log(cntSek +", "+ cntBtc+", "+ cntLtc+", "+ cntEuro )

        canvas=document.getElementById("votes_diagram")
        ctx=canvas.getContext("2d")
        ctx.fillRect(10,10, 600,200)

        tot = cntSek +cntBtc + cntLtc + cntEuro
        sekPercent = cntSek / tot
        btcPercent = cntBtc / tot
        ltcPercent = cntLtc / tot
        euroPercent = cntEuro / tot

        ctx.font = "bold 10pt Arial";

        ctx.fillStyle = "yellow"
        ctx.fillRect(60,40, btcPercent * 700, 30)
        ctx.fillStyle = "white"
        ctx.fillText("BTC:",20,58)
        ctx.fillStyle = "black"
        ctx.fillText((btcPercent * 100).toFixed(0) + "%",65,60)

        ctx.fillStyle = "green"
        ctx.fillRect(60,72, ltcPercent * 700, 30)
        ctx.fillStyle = "white"
        ctx.fillText("LTC:",20,88)
        ctx.fillStyle = "black"
        ctx.fillText((ltcPercent * 100).toFixed(0) + "%",65,92)


        ctx.fillStyle = "red"
        ctx.fillRect(60,104, sekPercent * 700, 30)
        ctx.fillStyle = "white"
        ctx.fillText("SEK:",20,120)
        ctx.fillStyle = "black"
        ctx.fillText((sekPercent * 100).toFixed(0) + "%",65,124)


        ctx.fillStyle = "blue"
        ctx.fillRect(60,136, euroPercent * 700, 30)
        ctx.fillStyle = "white"
        ctx.fillText("EUR:",20,152)
        ctx.fillStyle = "black"
        ctx.fillText((euroPercent * 100).toFixed(0) + "%",65,156)


        ctx.font = "bold 12pt Arial";
        ctx.fillStyle = "white"
        ctx.fillText("------------------------------------------------ % ------------------------------------------------>",50,195)

        ctx.fillStyle = "black"
    })



})


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
