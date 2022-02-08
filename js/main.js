const urlGermany = "https://api.corona-zahlen.org/germany";
const urlVaccinations = "https://api.corona-zahlen.org/vaccinations";
const urlTesting = "https://api.corona-zahlen.org/testing/history";
const urlState = "https://api.corona-zahlen.org/states";
const urlDistrict = "https://api.corona-zahlen.org/districts";

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

    if(url === urlState) {
        showState(data);
    }

    if(url === urlDistrict) {
        showDistrict(data);
    }
}

getData(urlGermany);
getData(urlVaccinations);
getData(urlTesting);
getData(urlState);
getData(urlDistrict);

function showGermany(data) {
    document.getElementById("cases").innerHTML += data.cases;
    document.getElementById("casesToday").innerHTML += data.delta.cases;
    document.getElementById("recovered").innerHTML += data.recovered;
    document.getElementById("recoveredToday").innerHTML += data.delta.recovered;
    document.getElementById("deaths").innerHTML += data.deaths;
    document.getElementById("deathsToday").innerHTML += data.delta.deaths;
}

function showVaccinations(data) {
    const path = data.data;

    document.getElementById("vaccinationOne").innerHTML += path.vaccinated;
    document.getElementById("vaccinationOneToday").innerHTML += path.delta;
    document.getElementById("vaccinationOneQuoteTotal").innerHTML += path.quote;
    document.getElementById("vaccinationOneQuoteUnder").innerHTML += path.quotes["A05-A17"].total;
    document.getElementById("vaccinationOneQuoteOver").innerHTML += path.quotes["A18+"].total;

    document.getElementById("vaccinationTwo").innerHTML += path.secondVaccination.vaccinated; 
    document.getElementById("vaccinationTwoToday").innerHTML += path.secondVaccination.delta;
    document.getElementById("vaccinationTwoQuoteTotal").innerHTML += path.quote;
    document.getElementById("vaccinationTwoQuoteUnder").innerHTML += path.quotes["A05-A17"].total;
    document.getElementById("vaccinationTwoQuoteOver").innerHTML += path.quotes["A18+"].total;

    document.getElementById("vaccinationThree").innerHTML += path.boosterVaccination.vaccinated;
    document.getElementById("vaccinationThreeToday").innerHTML += path.boosterVaccination.delta;
    document.getElementById("vaccinationThreeQuoteTotal").innerHTML += path.quote;
    document.getElementById("vaccinationThreeQuoteUnder").innerHTML += path.quotes["A05-A17"].total;
    document.getElementById("vaccinationThreeQuoteOver").innerHTML += path.quotes["A18+"].total;
}

function showTesting(data) {
    const path = data.data.history[data.data.history.length-1];

    document.getElementById("testingCalendarWeek").innerHTML += path.calendarWeek;
    document.getElementById("testingperformedTests").innerHTML += path.performedTests;
    document.getElementById("testingPositiveTests").innerHTML += path.positiveTests;
    document.getElementById("testingPositivityRate").innerHTML += path.positivityRate;
    document.getElementById("testingLaboratoryCount").innerHTML += path.laboratoryCount;
}

function showMeta(data) {

    var update = JSON.stringify(data.meta.lastUpdate);

    update = update.replaceAll("-",".");

    document.getElementById("metaSource").innerHTML += data.meta.source;
    document.getElementById("metaUpdate").innerHTML += update.substring(1,11);
    document.getElementById("metaInfo").innerHTML += data.meta.info;
}

function showState(data) {
    const path = data.data.NW;

    document.getElementById("stateName").innerHTML += path.name;
    document.getElementById("statePopulation").innerHTML += path.population;
    document.getElementById("stateCases").innerHTML += path.cases;
    document.getElementById("stateCasesToday").innerHTML += path.delta.cases;
    document.getElementById("stateDeaths").innerHTML += path.deaths;
    document.getElementById("stateDeathsToday").innerHTML += path.delta.deaths; 
    document.getElementById("stateRecovered").innerHTML += path.recovered;
    document.getElementById("stateRecoveredToday").innerHTML += path.delta.recovered;
    document.getElementById("stateWeekIncidence").innerHTML += path.weekIncidence;
    document.getElementById("stateCasesPer100k").innerHTML += path.casesPer100k;
    document.getElementById("stateHospitalizationCases7Days").innerHTML += path.hospitalization.cases7Days;
}

function showDistrict(data) {
    const path = data.data["05566"];

    document.getElementById("districtName").innerHTML += path.name;
    document.getElementById("districtPopulation").innerHTML += path.population;
    document.getElementById("districtCases").innerHTML += path.cases;
    document.getElementById("districtCasesToday").innerHTML += path.delta.cases;
    document.getElementById("districtDeaths").innerHTML += path.deaths;
    document.getElementById("districtDeathsToday").innerHTML += path.delta.deaths;
    document.getElementById("districtRecovered").innerHTML += path.recovered;
    document.getElementById("districtRecoveredToday").innerHTML += path.delta.recovered;
    document.getElementById("districtWeekIncidence").innerHTML += path.weekIncidence;
    document.getElementById("districtCasesPer100k").innerHTML += path.casesPer100k;
}