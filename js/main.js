const urlGermany = "https://api.corona-zahlen.org/germany";
const urlVaccinations = "https://api.corona-zahlen.org/vaccinations";
const urlTesting = "https://api.corona-zahlen.org/testing/history";

async function getData(url) {

    const response = await fetch(url);

    var data = await response.json();

    if(response) {
        //hide loading
    }

    if(url === urlGermany) {
        showGermany(data);
        showMeta(data);
    }
    
    if(url === urlVaccinations) {
        showVaccinations(data);
    }

    if(url === urlTesting) {
        showTesting(data);
    }
}

getData(urlGermany);
getData(urlVaccinations);
getData(urlTesting);

function showGermany(data) {
    document.getElementById("cases").innerHTML += data.cases;
    document.getElementById("casesToday").innerHTML += data.delta.cases;
    document.getElementById("recovered").innerHTML += data.recovered;
    document.getElementById("recoveredToday").innerHTML += data.delta.recovered;
    document.getElementById("deaths").innerHTML += data.deaths;
    document.getElementById("deathsToday").innerHTML += data.delta.deaths;
}

function showVaccinations(data) {
    document.getElementById("vaccinationOne").innerHTML += data.data.vaccinated;
    document.getElementById("vaccinationOneToday").innerHTML += data.data.delta;
    document.getElementById("vaccinationOneQuoteTotal").innerHTML += data.data.quote;
    document.getElementById("vaccinationOneQuoteUnder").innerHTML += data.data.quotes["A05-A17"].total;
    document.getElementById("vaccinationOneQuoteOver").innerHTML += data.data.quotes["A18+"].total;

    document.getElementById("vaccinationTwo").innerHTML += data.data.secondVaccination.vaccinated; 
    document.getElementById("vaccinationTwoToday").innerHTML += data.data.secondVaccination.delta;
    document.getElementById("vaccinationTwoQuoteTotal").innerHTML += data.data.quote;
    document.getElementById("vaccinationTwoQuoteUnder").innerHTML += data.data.quotes["A05-A17"].total;
    document.getElementById("vaccinationTwoQuoteOver").innerHTML += data.data.quotes["A18+"].total;

    document.getElementById("vaccinationThree").innerHTML += data.data.boosterVaccination.vaccinated;
    document.getElementById("vaccinationThreeToday").innerHTML += data.data.boosterVaccination.delta;
    document.getElementById("vaccinationThreeQuoteTotal").innerHTML += data.data.quote;
    document.getElementById("vaccinationThreeQuoteUnder").innerHTML += data.data.quotes["A05-A17"].total;
    document.getElementById("vaccinationThreeQuoteOver").innerHTML += data.data.quotes["A18+"].total;
}

function showTesting(data) {
    document.getElementById("testingCalendarWeek").innerHTML += data.data.history[data.data.history.length-1].calendarWeek;
    document.getElementById("testingperformedTests").innerHTML += data.data.history[data.data.history.length-1].performedTests;
    document.getElementById("testingPositiveTests").innerHTML += data.data.history[data.data.history.length-1].positiveTests;
    document.getElementById("testingPositivityRate").innerHTML += data.data.history[data.data.history.length-1].positivityRate;
    document.getElementById("testingLaboratoryCount").innerHTML += data.data.history[data.data.history.length-1].laboratoryCount;
}

function showMeta(data) {

    var update = JSON.stringify(data.meta.lastUpdate);

    update = update.replaceAll("-",".");

    document.getElementById("metaSource").innerHTML += data.meta.source;
    document.getElementById("metaUpdate").innerHTML += update.substring(1,11);
    document.getElementById("metaInfo").innerHTML += data.meta.info;
}