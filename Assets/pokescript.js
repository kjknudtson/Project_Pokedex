function clearEverything() {

    $(".name").empty();
    $(".type").empty();
    $(".abilities").empty();
    $(".stats").empty();
    $(".image").empty();
    $(".facts").empty();

}

function showInfo(response) {

    showName(response);

    showImage(response);

    getType(response);

    getAbilities(response);

    getStats(response);

    getHeightWeight(response);

    


}


function showName(response) {

    var pokeName = response.species.name;

    var dexNum = response.id;

    var pName = $("<h1>").text("#" + dexNum + " " + pokeName);

    $(pName).addClass("pokeName");

    $(".name").append(pName);

}


function getType(response) {

    var typeHeader = $("<h1>").text("Type(s)");

    $(typeHeader).addClass("type-head");

    $(".type").append(typeHeader);

    for (var i = 0; i < response.types.length; i++) {

        var pokeType = response.types[i].type.name;

        var pType = $("<p>").text(pokeType);

        $(pType).addClass(pokeType);

        $(pType).addClass("type-style")

        $(".type").append(pType);

    }


}




function getAbilities(response) {

    var abilitiesHeader = $("<h1>").text("Abilities");

    $(".abilities").append(abilitiesHeader);

    for (var i = 0; i < response.abilities.length; i++) {

        var pokeAbility = response.abilities[i].ability.name;

        pokeAbility= pokeAbility.replace('-', ' ');

        var hiddenAbility = response.abilities[i].is_hidden;



        if (hiddenAbility) {
            var pAbility = $("<p>").text(pokeAbility + " (HA)");
            $(pAbility).addClass("hidden");

        } else {
            var pAbility = $("<p>").text(pokeAbility);

        }

        $(".abilities").append(pAbility);

    }


}

function getHeightWeight(response) {
    var height = response.height;

    var heightFt = height / 3.048;

    heightFt = height.toFixed(2);

    var pFeet = $("<p>").text("Height: " + heightFt + " ft");

    $(".facts").append(pFeet);

    var weight = response.weight;    

    var weightLBs = weight / 4.536;

    weightLBs = weightLBs.toFixed(2);

    var pWeight = $("<p>").text("Weight: " + weightLBs + " lbs");

    $(".facts").append(pWeight);

}

function getStats(response) {

    var pStatsHead = $("<h1>").text("Base Stats");

    $(".stats").append(pStatsHead);

    for (var i = 0; i < 6; i++) {

        var statName = response.stats[i].stat.name;

        if (i == 0) {

            statName = statName.toUpperCase();

        }

        

        var baseStat = response.stats[i].base_stat;

        pStat = $("<p>").text(statName + ": " + baseStat);

        

        $(pStat).addClass(statName);

        

        $(".stats").append(pStat);

    }


}




function showImage(response) {

    var imageUrl = response.sprites.front_default;

    
    var pokeImage = $("<img>");

    
    pokeImage.attr("src", imageUrl);
    pokeImage.attr("alt", "pokemon's image");

    $(pokeImage).addClass("pokePic");

    
    $(".image").prepend(pokeImage);

}

function getPokemonGenus(response) {

    var pokeGenus = response.genera[7].genus;

    var genusHead = $("<h1>").text(pokeGenus);

    $(".facts").prepend(genusHead);


}



function pokemonAjaxCall(choice) {

    var pokemonURL = "https://pokeapi.co/api/v2/pokemon/" + choice;

    $.ajax({
        url: pokemonURL,
        method: "GET"
    }).then(function(response) {
        
        console.log(response);
            
        

        showInfo(response);          
            

            

    });

}

function speciesAjaxCall(choice) {

    var speciesURL = "https://pokeapi.co/api/v2/pokemon-species/" + choice;

    $.ajax({
        url: speciesURL,
        method: "GET"
    }).then(function(response) {
        
        console.log(response);

        getPokemonGenus(response);

            

    });

}


function pokemonIDCall(number) {
    var pokemonIDURL = "https://pokeapi.co/api/v2/pokemon/" + number;

    $.ajax({
        url: pokemonIDURL,
        method: "GET"
    }).then(function(response) {

           

        console.log(response);
            
        

        showInfo(response);           

           

    });

}

function speciesIDCall(number) {
    var speciesURL = "https://pokeapi.co/api/v2/pokemon-species/" + number;

    $.ajax({
        url: speciesURL,
        method: "GET"
    }).then(function(response) {

            

        console.log(response);
            
        getPokemonGenus(response);

                     

           

    });


}


$("#search-btn").on("click", function(event) {

    event.preventDefault();

    clearEverything();

    var userChoice = $("#poke-input").val();

   

    if (userChoice === "Keldeo") {
        userChoice = "Keldeo-Ordinary"
    }

    if (userChoice === "Giratina") {
        userChoice = "Giratina-Altered";
    }

    if (userChoice === "Wormadam") {
        userChoice = "Wormadam-Plant";
    }

    if (userChoice === "Shaymin") {
        userChoice = "Shaymin-Land";
    }

    userChoice = userChoice.toLowerCase();

    speciesAjaxCall(userChoice);

    pokemonAjaxCall(userChoice);

    

    

});

$("#random-btn").on("click", function(event) {

    event.preventDefault();

    clearEverything();

    var randomNumber = (Math.floor(Math.random() * 807)) + 1;

    speciesIDCall(randomNumber);

    pokemonIDCall(randomNumber);
    
    


    
    
        

});


