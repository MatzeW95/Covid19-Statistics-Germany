const urlGermany = "https://api.corona-zahlen.org/germany";
const urlVaccinations = "https://api.corona-zahlen.org/vaccinations";
const urlTesting = "https://api.corona-zahlen.org/testing/history";
const urlState = "https://api.corona-zahlen.org/states";
const urlDistrict = "https://api.corona-zahlen.org/districts";
const urlAge = "https://api.corona-zahlen.org/germany/age-groups";

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

    if(url === urlAge) {
        showFemale(data);
        showMale(data);
    }
}

getData(urlGermany);
getData(urlVaccinations);
getData(urlTesting);
getData(urlState);
getData(urlDistrict);
getData(urlAge);

function showGermany(data) {
    document.getElementById("cases").innerHTML += formatNumber(data.cases);
    document.getElementById("casesToday").innerHTML += formatNumber(data.delta.cases);
    document.getElementById("recovered").innerHTML += formatNumber(data.recovered);
    document.getElementById("recoveredToday").innerHTML += formatNumber(data.delta.recovered);
    document.getElementById("deaths").innerHTML += formatNumber(data.deaths);
    document.getElementById("deathsToday").innerHTML += formatNumber(data.delta.deaths);
    document.getElementById("weekIncidence").innerHTML += roundNumber(data.weekIncidence);
    document.getElementById("casesPer100k").innerHTML += roundNumber(data.casesPer100k);
    document.getElementById("rValue").innerHTML += roundNumber(data.r.value);
    document.getElementById("hospitalizationCases7Days").innerHTML += formatNumber(data.hospitalization.cases7Days);
}

function showVaccinations(data) {
    const path = data.data;

    document.getElementById("vaccinationOne").innerHTML += formatNumber(path.vaccinated);
    document.getElementById("vaccinationOneToday").innerHTML += formatNumber(path.delta);
    document.getElementById("vaccinationOneQuoteTotal").innerHTML += formatPercentage(path.quote);
    document.getElementById("vaccinationOneQuoteUnder").innerHTML += formatPercentage(path.quotes["A05-A17"].total);
    document.getElementById("vaccinationOneQuoteOver").innerHTML += formatPercentage(path.quotes["A18+"].total);

    document.getElementById("vaccinationTwo").innerHTML += formatNumber(path.secondVaccination.vaccinated); 
    document.getElementById("vaccinationTwoToday").innerHTML += formatNumber(path.secondVaccination.delta);
    document.getElementById("vaccinationTwoQuoteTotal").innerHTML += formatPercentage(path.secondVaccination.quote);
    document.getElementById("vaccinationTwoQuoteUnder").innerHTML += formatPercentage(path.secondVaccination.quotes["A05-A17"].total);
    document.getElementById("vaccinationTwoQuoteOver").innerHTML += formatPercentage(path.secondVaccination.quotes["A18+"].total);

    document.getElementById("vaccinationThree").innerHTML += formatNumber(path.boosterVaccination.vaccinated);
    document.getElementById("vaccinationThreeToday").innerHTML += formatNumber(path.boosterVaccination.delta);
    document.getElementById("vaccinationThreeQuoteTotal").innerHTML += formatPercentage(path.boosterVaccination.quote);
    document.getElementById("vaccinationThreeQuoteUnder").innerHTML += formatPercentage(path.boosterVaccination.quotes["A05-A17"].total);
    document.getElementById("vaccinationThreeQuoteOver").innerHTML += formatPercentage(path.boosterVaccination.quotes["A18+"].total);
}

function showTesting(data) {
    const path = data.data.history[data.data.history.length-1];

    document.getElementById("testingCalendarWeek").innerHTML += path.calendarWeek;
    document.getElementById("testingperformedTests").innerHTML += formatNumber(path.performedTests);
    document.getElementById("testingPositiveTests").innerHTML += formatNumber(path.positiveTests);
    document.getElementById("testingPositivityRate").innerHTML += formatPercentage(path.positivityRate);
    document.getElementById("testingLaboratoryCount").innerHTML += formatNumber(path.laboratoryCount);
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
    document.getElementById("statePopulation").innerHTML += formatNumber(path.population);
    document.getElementById("stateCases").innerHTML += formatNumber(path.cases);
    document.getElementById("stateCasesToday").innerHTML += formatNumber(path.delta.cases);
    document.getElementById("stateRecovered").innerHTML += formatNumber(path.recovered);
    document.getElementById("stateRecoveredToday").innerHTML += formatNumber(path.delta.recovered);
    document.getElementById("stateDeaths").innerHTML += formatNumber(path.deaths);
    document.getElementById("stateDeathsToday").innerHTML += formatNumber(path.delta.deaths);
    document.getElementById("stateWeekIncidence").innerHTML += roundNumber(path.weekIncidence);
    document.getElementById("stateCasesPer100k").innerHTML += roundNumber(path.casesPer100k);
    document.getElementById("stateHospitalizationCases7Days").innerHTML += formatNumber(path.hospitalization.cases7Days);
}

function showDistrict(data) {
    const path = data.data["05566"];

    document.getElementById("districtName").innerHTML += path.name;
    document.getElementById("districtPopulation").innerHTML += formatNumber(path.population);
    document.getElementById("districtCases").innerHTML += formatNumber(path.cases);
    document.getElementById("districtCasesToday").innerHTML += formatNumber(path.delta.cases);
    document.getElementById("districtRecovered").innerHTML += formatNumber(path.recovered);
    document.getElementById("districtRecoveredToday").innerHTML += formatNumber(path.delta.recovered);
    document.getElementById("districtDeaths").innerHTML += formatNumber(path.deaths);
    document.getElementById("districtDeathsToday").innerHTML += formatNumber(path.delta.deaths);
    document.getElementById("districtWeekIncidence").innerHTML += roundNumber(path.weekIncidence);
    document.getElementById("districtCasesPer100k").innerHTML += roundNumber(path.casesPer100k);
}

function showFemale(data) {
    const path = data.data;

    document.getElementById("FemaleOneCases").innerHTML += formatNumber(path["A00-A04"].casesFemale);
    document.getElementById("FemaleTwoCases").innerHTML += formatNumber(path["A05-A14"].casesFemale);
    document.getElementById("FemaleThreeCases").innerHTML += formatNumber(path["A15-A34"].casesFemale);
    document.getElementById("FemaleFourCases").innerHTML += formatNumber(path["A35-A59"].casesFemale);
    document.getElementById("FemaleFiveCases").innerHTML += formatNumber(path["A60-A79"].casesFemale);
    document.getElementById("FemaleSixCases").innerHTML += formatNumber(path["A80+"].casesFemale);
}

function showMale(data) {
    const path = data.data;

    document.getElementById("MaleOneCases").innerHTML += formatNumber(path["A00-A04"].casesMale);
    document.getElementById("MaleTwoCases").innerHTML += formatNumber(path["A05-A14"].casesMale);
    document.getElementById("MaleThreeCases").innerHTML += formatNumber(path["A15-A34"].casesMale);
    document.getElementById("MaleFourCases").innerHTML += formatNumber(path["A35-A59"].casesMale);
    document.getElementById("MaleFiveCases").innerHTML += formatNumber(path["A60-A79"].casesMale);
    document.getElementById("MaleSixCases").innerHTML += formatNumber(path["A80+"].casesMale);
}

function formatPercentage(number) {
    var percentage;

    percentage = roundNumber(number * 100) + " %";

    return percentage;
}

function roundNumber(number) {
    var rounded;

    rounded = formatNumber(Math.round(number * 100) / 100);

    return rounded;
}

function formatNumber(number) {
    var format;
    
    format = Number(number).toLocaleString("de-DE");

    return format;
}