const urlGermany = "https://api.corona-zahlen.org/germany";
const urlVaccinations = "https://api.corona-zahlen.org/vaccinations";
const urlTesting = "https://api.corona-zahlen.org/testing/history";
const urlState = "https://api.corona-zahlen.org/states";
const urlDistrict = "https://api.corona-zahlen.org/districts";
const urlAge = "https://api.corona-zahlen.org/germany/age-groups";

var dataState = [];
var dataDistrict = "";

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

        dataDistrict = data;
    }

    if(url === urlDistrict) {
        showDistrict(data);

        dataDistrict = data;
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

fillSelectStates();

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



function fillSelectStates() {
    var selection = document.getElementById("selectState");

    var states = [  
        ["Baden-W??rttemberg"],
        ["Bayern"],
        ["Berlin"],
        ["Brandenburg"],
        ["Bremen"],
        ["Hamburg"],
        ["Hessen"],
        ["Mecklenburg-Vorpommern"],
        ["Niedersachsen"],
        ["Nordrhein-Westfalen"],
        ["Rheinland-Pfalz"],
        ["Saarland"],
        ["Sachsen"],
        ["Sachsen-Anhalt"],
        ["Schleswig-Holstein"],
        ["Th??ringen"]
    ];

    for (let x = 0; x < states.length; x++) {
        
        var option = document.createElement("option");

        option.text = states[x];

        option.value = states[x];

        selection.add(option);
    }
}

function sortedDistrict () {

    var district = [
        ["Regionalverband Saarbr??cken", "Saarland"],
        ["Merzig-Wadern", "Saarland"],
        ["Neunkirchen", "Saarland"],
        ["Saarlouis", "Saarland"],
        ["Saarpfalz-Kreis", "Saarland"],
        ["St. Wendel", "Saarland"],
        ["Berlin Mitte", "Berlin"],
        ["Berlin Friedrichshain-Kreuzberg", "Berlin"],
        ["Berlin Pankow", "Berlin"],
        ["Berlin Charlottenburg-Wilmersdorf", "Berlin"],
        ["Berlin Spandau", "Berlin"],
        ["Berlin Steglitz-Zehlendorf", "Berlin"],
        ["Berlin Tempelhof-Sch??neberg", "Berlin"],
        ["Berlin Neuk??lln", "Berlin"],
        ["Berlin Treptow-K??penick", "Berlin"],
        ["Berlin Marzahn-Hellersdorf", "Berlin"],
        ["Berlin Lichtenberg", "Berlin"],
        ["Berlin Reinickendorf", "Berlin"],
        ["Brandenburg an der Havel", "Brandenburg"],
        ["Cottbus", "Brandenburg"],
        ["Frankfurt (Oder)", "Brandenburg"],
        ["Potsdam", "Brandenburg"],
        ["Barnim", "Brandenburg"],
        ["Dahme-Spreewald", "Brandenburg"],
        ["Elbe-Elster", "Brandenburg"],
        ["Havelland", "Brandenburg"],
        ["M??rkisch-Oderland", "Brandenburg"],
        ["Oberhavel", "Brandenburg"],
        ["Oberspreewald-Lausitz", "Brandenburg"],
        ["Oder-Spree", "Brandenburg"],
        ["Ostprignitz-Ruppin", "Brandenburg"],
        ["Potsdam-Mittelmark", "Brandenburg"],
        ["Prignitz", "Brandenburg"],
        ["Spree-Nei??e", "Brandenburg"],
        ["Teltow-Fl??ming", "Brandenburg"],
        ["Uckermark", "Brandenburg"],
        ["Rostock", "Mecklenburg-Vorpommern"],
        ["Schwerin", "Mecklenburg-Vorpommern"],
        ["Mecklenburgische Seenplatte", "Mecklenburg-Vorpommern"],
        ["Rostock", "Mecklenburg-Vorpommern"],
        ["Vorpommern-R??gen", "Mecklenburg-Vorpommern"],
        ["Nordwestmecklenburg", "Mecklenburg-Vorpommern"],
        ["Vorpommern-Greifswald", "Mecklenburg-Vorpommern"],
        ["Ludwigslust-Parchim", "Mecklenburg-Vorpommern"],
        ["Chemnitz", "Sachsen"],
        ["Erzgebirgskreis", "Sachsen"],
        ["Mittelsachsen", "Sachsen"],
        ["Vogtlandkreis", "Sachsen"],
        ["Zwickau", "Sachsen"],
        ["Dresden", "Sachsen"],
        ["Bautzen", "Sachsen"],
        ["G??rlitz", "Sachsen"],
        ["Mei??en", "Sachsen"],
        ["S??chsische Schweiz-Osterzgebirge", "Sachsen"],
        ["Leipzig", "Sachsen"],
        ["Leipzig", "Sachsen"],
        ["Nordsachsen", "Sachsen"],
        ["Dessau-Ro??lau", "Sachsen-Anhalt"],
        ["Halle (Saale)", "Sachsen-Anhalt"],
        ["Magdeburg", "Sachsen-Anhalt"],
        ["Altmarkkreis Salzwedel", "Sachsen-Anhalt"],
        ["Anhalt-Bitterfeld", "Sachsen-Anhalt"],
        ["B??rde", "Sachsen-Anhalt"],
        ["Burgenlandkreis", "Sachsen-Anhalt"],
        ["Harz", "Sachsen-Anhalt"],
        ["Jerichower Land", "Sachsen-Anhalt"],
        ["Mansfeld-S??dharz", "Sachsen-Anhalt"],
        ["Saalekreis", "Sachsen-Anhalt"],
        ["Salzlandkreis", "Sachsen-Anhalt"],
        ["Stendal", "Sachsen-Anhalt"],
        ["Wittenberg", "Sachsen-Anhalt"],
        ["Erfurt", "Th??ringen"],
        ["Gera", "Th??ringen"],
        ["Jena", "Th??ringen"],
        ["Suhl", "Th??ringen"],
        ["Weimar", "Th??ringen"],
        ["Eichsfeld", "Th??ringen"],
        ["Nordhausen", "Th??ringen"],
        ["Wartburgkreis", "Th??ringen"],
        ["Unstrut-Hainich-Kreis", "Th??ringen"],
        ["Kyffh??userkreis", "Th??ringen"],
        ["Schmalkalden-Meiningen", "Th??ringen"],
        ["Gotha", "Th??ringen"],
        ["S??mmerda", "Th??ringen"],
        ["Hildburghausen", "Th??ringen"],
        ["Ilm-Kreis", "Th??ringen"],
        ["Weimarer Land", "Th??ringen"],
        ["Sonneberg", "Th??ringen"],
        ["Saalfeld-Rudolstadt", "Th??ringen"],
        ["Saale-Holzland-Kreis", "Th??ringen"],
        ["Saale-Orla-Kreis", "Th??ringen"],
        ["Greiz", "Th??ringen"],
        ["Altenburger Land", "Th??ringen"],
        ["Flensburg", "Schleswig-Holstein"],
        ["Kiel", "Schleswig-Holstein"],
        ["L??beck", "Schleswig-Holstein"],
        ["Neum??nster", "Schleswig-Holstein"],
        ["Dithmarschen", "Schleswig-Holstein"],
        ["Herzogtum Lauenburg", "Schleswig-Holstein"],
        ["Nordfriesland", "Schleswig-Holstein"],
        ["Ostholstein", "Schleswig-Holstein"],
        ["Pinneberg", "Schleswig-Holstein"],
        ["Pl??n", "Schleswig-Holstein"],
        ["Rendsburg-Eckernf??rde", "Schleswig-Holstein"],
        ["Schleswig-Flensburg", "Schleswig-Holstein"],
        ["Segeberg", "Schleswig-Holstein"],
        ["Steinburg", "Schleswig-Holstein"],
        ["Stormarn", "Schleswig-Holstein"],
        ["Hamburg", "Hamburg"],
        ["Braunschweig", "Niedersachsen"],
        ["Salzgitter", "Niedersachsen"],
        ["Wolfsburg", "Niedersachsen"],
        ["Gifhorn", "Niedersachsen"],
        ["Goslar", "Niedersachsen"],
        ["Helmstedt", "Niedersachsen"],
        ["Northeim", "Niedersachsen"],
        ["Peine", "Niedersachsen"],
        ["Wolfenb??ttel", "Niedersachsen"],
        ["G??ttingen", "Niedersachsen"],
        ["Region Hannover", "Niedersachsen"],
        ["Diepholz", "Niedersachsen"],
        ["Hameln-Pyrmont", "Niedersachsen"],
        ["Hildesheim", "Niedersachsen"],
        ["Holzminden", "Niedersachsen"],
        ["Nienburg (Weser)", "Niedersachsen"],
        ["Schaumburg", "Niedersachsen"],
        ["Celle", "Niedersachsen"],
        ["Cuxhaven", "Niedersachsen"],
        ["Harburg", "Niedersachsen"],
        ["L??chow-Dannenberg", "Niedersachsen"],
        ["L??neburg", "Niedersachsen"],
        ["Osterholz", "Niedersachsen"],
        ["Rotenburg (W??mme)", "Niedersachsen"],
        ["Heidekreis", "Niedersachsen"],
        ["Stade", "Niedersachsen"],
        ["Uelzen", "Niedersachsen"],
        ["Verden", "Niedersachsen"],
        ["Delmenhorst", "Niedersachsen"],
        ["Emden", "Niedersachsen"],
        ["Oldenburg (Oldb)", "Niedersachsen"],
        ["Osnabr??ck", "Niedersachsen"],
        ["Wilhelmshaven", "Niedersachsen"],
        ["Ammerland", "Niedersachsen"],
        ["Aurich", "Niedersachsen"],
        ["Cloppenburg", "Niedersachsen"],
        ["Emsland", "Niedersachsen"],
        ["Friesland", "Niedersachsen"],
        ["Grafschaft Bentheim", "Niedersachsen"],
        ["Leer", "Niedersachsen"],
        ["Oldenburg", "Niedersachsen"],
        ["Osnabr??ck", "Niedersachsen"],
        ["Vechta", "Niedersachsen"],
        ["Wesermarsch", "Niedersachsen"],
        ["Wittmund", "Niedersachsen"],
        ["Bremen", "Bremen"],
        ["Bremerhaven", "Bremen"],
        ["D??sseldorf", "Nordrhein-Westfalen"],
        ["Duisburg", "Nordrhein-Westfalen"],
        ["Essen", "Nordrhein-Westfalen"],
        ["Krefeld", "Nordrhein-Westfalen"],
        ["M??nchengladbach", "Nordrhein-Westfalen"],
        ["M??lheim an der Ruhr", "Nordrhein-Westfalen"],
        ["Oberhausen", "Nordrhein-Westfalen"],
        ["Remscheid", "Nordrhein-Westfalen"],
        ["Solingen", "Nordrhein-Westfalen"],
        ["Wuppertal", "Nordrhein-Westfalen"],
        ["Kleve", "Nordrhein-Westfalen"],
        ["Mettmann", "Nordrhein-Westfalen"],
        ["Rhein-Kreis Neuss", "Nordrhein-Westfalen"],
        ["Viersen", "Nordrhein-Westfalen"],
        ["Wesel", "Nordrhein-Westfalen"],
        ["Bonn", "Nordrhein-Westfalen"],
        ["K??ln", "Nordrhein-Westfalen"],
        ["Leverkusen", "Nordrhein-Westfalen"],
        ["St??dteregion Aachen", "Nordrhein-Westfalen"],
        ["D??ren", "Nordrhein-Westfalen"],
        ["Rhein-Erft-Kreis", "Nordrhein-Westfalen"],
        ["Euskirchen", "Nordrhein-Westfalen"],
        ["Heinsberg", "Nordrhein-Westfalen"],
        ["Oberbergischer Kreis", "Nordrhein-Westfalen"],
        ["Rheinisch-Bergischer Kreis", "Nordrhein-Westfalen"],
        ["Rhein-Sieg-Kreis", "Nordrhein-Westfalen"],
        ["Bottrop", "Nordrhein-Westfalen"],
        ["Gelsenkirchen", "Nordrhein-Westfalen"],
        ["M??nster", "Nordrhein-Westfalen"],
        ["Borken", "Nordrhein-Westfalen"],
        ["Coesfeld", "Nordrhein-Westfalen"],
        ["Recklinghausen", "Nordrhein-Westfalen"],
        ["Steinfurt", "Nordrhein-Westfalen"],
        ["Warendorf", "Nordrhein-Westfalen"],
        ["Bielefeld", "Nordrhein-Westfalen"],
        ["G??tersloh", "Nordrhein-Westfalen"],
        ["Herford", "Nordrhein-Westfalen"],
        ["H??xter", "Nordrhein-Westfalen"],
        ["Lippe", "Nordrhein-Westfalen"],
        ["Minden-L??bbecke", "Nordrhein-Westfalen"],
        ["Paderborn", "Nordrhein-Westfalen"],
        ["Bochum", "Nordrhein-Westfalen"],
        ["Dortmund", "Nordrhein-Westfalen"],
        ["Hagen", "Nordrhein-Westfalen"],
        ["Hamm", "Nordrhein-Westfalen"],
        ["Herne", "Nordrhein-Westfalen"],
        ["Ennepe-Ruhr-Kreis", "Nordrhein-Westfalen"],
        ["Hochsauerlandkreis", "Nordrhein-Westfalen"],
        ["M??rkischer Kreis", "Nordrhein-Westfalen"],
        ["Olpe", "Nordrhein-Westfalen"],
        ["Siegen-Wittgenstein", "Nordrhein-Westfalen"],
        ["Soest", "Nordrhein-Westfalen"],
        ["Unna", "Nordrhein-Westfalen"],
        ["Darmstadt", "Hessen"],
        ["Frankfurt am Main", "Hessen"],
        ["Offenbach am Main", "Hessen"],
        ["Wiesbaden", "Hessen"],
        ["Bergstra??e", "Hessen"],
        ["Darmstadt-Dieburg", "Hessen"],
        ["Gro??-Gerau", "Hessen"],
        ["Hochtaunuskreis", "Hessen"],
        ["Main-Kinzig-Kreis", "Hessen"],
        ["Main-Taunus-Kreis", "Hessen"],
        ["Odenwaldkreis", "Hessen"],
        ["Offenbach", "Hessen"],
        ["Rheingau-Taunus-Kreis", "Hessen"],
        ["Wetteraukreis", "Hessen"],
        ["Gie??en", "Hessen"],
        ["Lahn-Dill-Kreis", "Hessen"],
        ["Limburg-Weilburg", "Hessen"],
        ["Marburg-Biedenkopf", "Hessen"],
        ["Vogelsbergkreis", "Hessen"],
        ["Kassel", "Hessen"],
        ["Fulda", "Hessen"],
        ["Hersfeld-Rotenburg", "Hessen"],
        ["Kassel", "Hessen"],
        ["Schwalm-Eder-Kreis", "Hessen"],
        ["Waldeck-Frankenberg", "Hessen"],
        ["Werra-Mei??ner-Kreis", "Hessen"],
        ["Koblenz", "Rheinland-Pfalz"],
        ["Ahrweiler", "Rheinland-Pfalz"],
        ["Altenkirchen (Westerwald)", "Rheinland-Pfalz"],
        ["Bad Kreuznach", "Rheinland-Pfalz"],
        ["Birkenfeld", "Rheinland-Pfalz"],
        ["Cochem-Zell", "Rheinland-Pfalz"],
        ["Mayen-Koblenz", "Rheinland-Pfalz"],
        ["Neuwied", "Rheinland-Pfalz"],
        ["Rhein-Hunsr??ck-Kreis", "Rheinland-Pfalz"],
        ["Rhein-Lahn-Kreis", "Rheinland-Pfalz"],
        ["Westerwaldkreis", "Rheinland-Pfalz"],
        ["Trier", "Rheinland-Pfalz"],
        ["Bernkastel-Wittlich", "Rheinland-Pfalz"],
        ["Eifelkreis Bitburg-Pr??m", "Rheinland-Pfalz"],
        ["Vulkaneifel", "Rheinland-Pfalz"],
        ["Trier-Saarburg", "Rheinland-Pfalz"],
        ["Frankenthal (Pfalz)", "Rheinland-Pfalz"],
        ["Kaiserslautern", "Rheinland-Pfalz"],
        ["Landau in der Pfalz", "Rheinland-Pfalz"],
        ["Ludwigshafen am Rhein", "Rheinland-Pfalz"],
        ["Mainz", "Rheinland-Pfalz"],
        ["Neustadt an der Weinstra??e", "Rheinland-Pfalz"],
        ["Pirmasens", "Rheinland-Pfalz"],
        ["Speyer", "Rheinland-Pfalz"],
        ["Worms", "Rheinland-Pfalz"],
        ["Zweibr??cken", "Rheinland-Pfalz"],
        ["Alzey-Worms", "Rheinland-Pfalz"],
        ["Bad D??rkheim", "Rheinland-Pfalz"],
        ["Donnersbergkreis", "Rheinland-Pfalz"],
        ["Germersheim", "Rheinland-Pfalz"],
        ["Kaiserslautern", "Rheinland-Pfalz"],
        ["Kusel", "Rheinland-Pfalz"],
        ["S??dliche Weinstra??e", "Rheinland-Pfalz"],
        ["Rhein-Pfalz-Kreis", "Rheinland-Pfalz"],
        ["Mainz-Bingen", "Rheinland-Pfalz"],
        ["S??dwestpfalz", "Rheinland-Pfalz"],
        ["Stuttgart", "Baden-W??rttemberg"],
        ["B??blingen", "Baden-W??rttemberg"],
        ["Esslingen", "Baden-W??rttemberg"],
        ["G??ppingen", "Baden-W??rttemberg"],
        ["Ludwigsburg", "Baden-W??rttemberg"],
        ["Rems-Murr-Kreis", "Baden-W??rttemberg"],
        ["Heilbronn", "Baden-W??rttemberg"],
        ["Heilbronn", "Baden-W??rttemberg"],
        ["Hohenlohekreis", "Baden-W??rttemberg"],
        ["Schw??bisch Hall", "Baden-W??rttemberg"],
        ["Main-Tauber-Kreis", "Baden-W??rttemberg"],
        ["Heidenheim", "Baden-W??rttemberg"],
        ["Ostalbkreis", "Baden-W??rttemberg"],
        ["Baden-Baden", "Baden-W??rttemberg"],
        ["Karlsruhe", "Baden-W??rttemberg"],
        ["Karlsruhe", "Baden-W??rttemberg"],
        ["Rastatt", "Baden-W??rttemberg"],
        ["Heidelberg", "Baden-W??rttemberg"],
        ["Mannheim", "Baden-W??rttemberg"],
        ["Neckar-Odenwald-Kreis", "Baden-W??rttemberg"],
        ["Rhein-Neckar-Kreis", "Baden-W??rttemberg"],
        ["Pforzheim", "Baden-W??rttemberg"],
        ["Calw", "Baden-W??rttemberg"],
        ["Enzkreis", "Baden-W??rttemberg"],
        ["Freudenstadt", "Baden-W??rttemberg"],
        ["Freiburg im Breisgau", "Baden-W??rttemberg"],
        ["Breisgau-Hochschwarzwald", "Baden-W??rttemberg"],
        ["Emmendingen", "Baden-W??rttemberg"],
        ["Ortenaukreis", "Baden-W??rttemberg"],
        ["Rottweil", "Baden-W??rttemberg"],
        ["Schwarzwald-Baar-Kreis", "Baden-W??rttemberg"],
        ["Tuttlingen", "Baden-W??rttemberg"],
        ["Konstanz", "Baden-W??rttemberg"],
        ["L??rrach", "Baden-W??rttemberg"],
        ["Waldshut", "Baden-W??rttemberg"],
        ["Reutlingen", "Baden-W??rttemberg"],
        ["T??bingen", "Baden-W??rttemberg"],
        ["Zollernalbkreis", "Baden-W??rttemberg"],
        ["Ulm", "Baden-W??rttemberg"],
        ["Alb-Donau-Kreis", "Baden-W??rttemberg"],
        ["Biberach", "Baden-W??rttemberg"],
        ["Bodenseekreis", "Baden-W??rttemberg"],
        ["Ravensburg", "Baden-W??rttemberg"],
        ["Sigmaringen", "Baden-W??rttemberg"],
        ["Ingolstadt", "Bayern"],
        ["M??nchen", "Bayern"],
        ["Rosenheim", "Bayern"],
        ["Alt??tting", "Bayern"],
        ["Berchtesgadener Land", "Bayern"],
        ["Bad T??lz-Wolfratshausen", "Bayern"],
        ["Dachau", "Bayern"],
        ["Ebersberg", "Bayern"],
        ["Eichst??tt", "Bayern"],
        ["Erding", "Bayern"],
        ["Freising", "Bayern"],
        ["F??rstenfeldbruck", "Bayern"],
        ["Garmisch-Partenkirchen", "Bayern"],
        ["Landsberg am Lech", "Bayern"],
        ["Miesbach", "Bayern"],
        ["M??hldorf a. Inn", "Bayern"],
        ["M??nchen", "Bayern"],
        ["Neuburg-Schrobenhausen", "Bayern"],
        ["Pfaffenhofen a.d. Ilm", "Bayern"],
        ["Rosenheim", "Bayern"],
        ["Starnberg", "Bayern"],
        ["Traunstein", "Bayern"],
        ["Weilheim-Schongau", "Bayern"],
        ["Landshut", "Bayern"],
        ["Passau", "Bayern"],
        ["Straubing", "Bayern"],
        ["Deggendorf", "Bayern"],
        ["Freyung-Grafenau", "Bayern"],
        ["Kelheim", "Bayern"],
        ["Landshut", "Bayern"],
        ["Passau", "Bayern"],
        ["Regen", "Bayern"],
        ["Rottal-Inn", "Bayern"],
        ["Straubing-Bogen", "Bayern"],
        ["Dingolfing-Landau", "Bayern"],
        ["Amberg", "Bayern"],
        ["Regensburg", "Bayern"],
        ["Weiden i.d. OPf.", "Bayern"],
        ["Amberg-Sulzbach", "Bayern"],
        ["Cham", "Bayern"],
        ["Neumarkt i.d. OPf.", "Bayern"],
        ["Neustadt a.d. Waldnaab", "Bayern"],
        ["Regensburg", "Bayern"],
        ["Schwandorf", "Bayern"],
        ["Tirschenreuth", "Bayern"],
        ["Bamberg", "Bayern"],
        ["Bayreuth", "Bayern"],
        ["Coburg", "Bayern"],
        ["Hof", "Bayern"],
        ["Bamberg", "Bayern"],
        ["Bayreuth", "Bayern"],
        ["Coburg", "Bayern"],
        ["Forchheim", "Bayern"],
        ["Hof", "Bayern"],
        ["Kronach", "Bayern"],
        ["Kulmbach", "Bayern"],
        ["Lichtenfels", "Bayern"],
        ["Wunsiedel i. Fichtelgebirge", "Bayern"],
        ["Ansbach", "Bayern"],
        ["Erlangen", "Bayern"],
        ["F??rth", "Bayern"],
        ["N??rnberg", "Bayern"],
        ["Schwabach", "Bayern"],
        ["Ansbach", "Bayern"],
        ["Erlangen-H??chstadt", "Bayern"],
        ["F??rth", "Bayern"],
        ["N??rnberger Land", "Bayern"],
        ["Neustadt a.d. Aisch-Bad Windsheim", "Bayern"],
        ["Roth", "Bayern"],
        ["Wei??enburg-Gunzenhausen", "Bayern"],
        ["Aschaffenburg", "Bayern"],
        ["Schweinfurt", "Bayern"],
        ["W??rzburg", "Bayern"],
        ["Aschaffenburg", "Bayern"],
        ["Bad Kissingen", "Bayern"],
        ["Rh??n-Grabfeld", "Bayern"],
        ["Ha??berge", "Bayern"],
        ["Kitzingen", "Bayern"],
        ["Miltenberg", "Bayern"],
        ["Main-Spessart", "Bayern"],
        ["Schweinfurt", "Bayern"],
        ["W??rzburg", "Bayern"],
        ["Augsburg", "Bayern"],
        ["Kaufbeuren", "Bayern"],
        ["Kempten (Allg??u)", "Bayern"],
        ["Memmingen", "Bayern"],
        ["Aichach-Friedberg", "Bayern"],
        ["Augsburg", "Bayern"],
        ["Dillingen a.d. Donau", "Bayern"],
        ["G??nzburg", "Bayern"],
        ["Neu-Ulm", "Bayern"],
        ["Lindau (Bodensee)", "Bayern"],
        ["Ostallg??u", "Bayern"],
        ["Unterallg??u", "Bayern"],
        ["Donau-Ries", "Bayern"],
        ["Oberallg??u", "Bayern"]
    ];

    district.sort(function(a,b) {
        return a[0]+b[0];
    });

    return district.sort();
}

function selectDistrictToState(state) {
    var sorted = sortedDistrict();
    var resultLength = 0;
    
    var countTwo = 0;

    for (let z = 0; z < sorted.length; z++) {
        
        if (state == sorted[z][1]) {
            resultLength++;
        }
    }

    var districtToState = [...Array(resultLength)].map(x => []);

    for (let y = 0; y < sorted.length; y++) {
        
        if (state == sorted[y][1]) {

            districtToState[countTwo].push(sorted[y][0], sorted[y][1]);
            countTwo++;
        }
    }
    
    return districtToState;
}

function fillSelectDistricts(state) {
    var selection = document.getElementById("selectDistrict");

    selection.innerHTML = "";

    districts = selectDistrictToState(state);

    for (let x = 0; x < districts.length; x++) {
        
        var option = document.createElement("option");

        option.text = districts[x][0];

        option.value = districts[x][0];

        selection.add(option);
    }
}









let stateSelection = document.getElementById('selectState');
let districtSelection= document.getElementById('selectDistrict');

stateSelection.addEventListener ("change", function () {

    fillSelectDistricts(stateSelection.value);

    updateState(dataState, convertState(stateSelection.value))
});

districtSelection.addEventListener ("change", function () {

    
});


function convertState(state) {
    
    var result;

    switch (state) {
        case "Baden-W??rttemberg":
            result = "BW";
            break;
        case "Bayern":
            result = "BY";
            break;
        case "Berlin":
            result = "BE";
            break;
        case "Brandenburg":
            result = "BB";
            break;
        case "Bremen":
            result = "HB";
            break;
        case "Hamburg":
            result = "HH";
            break;
        case "Hessen":
            result = "HE";
            break;
        case "Mecklenburg-Vorpommern":
            result = "MV";
            break;
        case "Niedersachsen":
            result = "NI";
            break;
        case "Nordrhein-Westfalen":
            result = "NW";
            break;
        case "Rheinland-Pfalz":
            result = "RP";
            break;
        case "Saarland":
            result = "SL";
            break;
        case "Sachsen":
            result = "SN";
            break;
        case "Sachsen-Anhalt":
            result = "ST";
            break;
        case "Schleswig-Holstein":
            result = "SH";
            break;
        case "Th??ringen":
            result = "TH";
            break;
    }

    return result;
}

function updateState(data, state) {
    //var path = data.data.state;

    console.log(dataState);
/*
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
    document.getElementById("stateHospitalizationCases7Days").innerHTML += formatNumber(path.hospitalization.cases7Days);*/
}