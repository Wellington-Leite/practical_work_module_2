const fs = require("fs");

/* lendo arquivos com File System e convertendo para JSON */
const jsonCity = JSON.parse(fs.readFileSync("cidades.json", "utf8"));
const jsonState = JSON.parse(fs.readFileSync("estados.json", "utf8"));

//Lista de todos os estados e quantidade de cidades
let qttCityState = [];

/* ------------------ FUNÇÕES  --------------------- */
/* R1 */
function setStateCity() {
  jsonState.forEach((estado) => {
    const stateCity = jsonCity
      .filter((city) => {
        return city.Estado === estado.ID;
      })
      .map(({ ID, Nome }) => {
        return {
          id: ID,
          nameCity: Nome,
          quatityLetters: Nome.length,
          state: estado.Sigla,
          nameState: estado.Nome,
          stateID: estado.ID,
        };
      });
    let json = JSON.stringify(stateCity);
    fs.writeFileSync(`data\\${estado.Sigla}.json`, json);
  });
}

/* R2 */
function getQttCityState(uf) {
  const jsonUf = JSON.parse(fs.readFileSync(`./data/${uf}.json`, "utf8"));
  return jsonUf.length;
}

/* R3 */
function printMaxCitiesForState() {
  jsonState.forEach((element) => {
    let qtt = getQttCityState(element.Sigla);
    let arrayQtt = [{ state: element.Sigla, qttCity: qtt }];
    qttCityState = [...qttCityState, ...arrayQtt];
  });
  //colocando em ordem decrescente
  qttCityState.sort((a, b) => {
    return b.qttCity - a.qttCity;
  });
  console.log("--------------------------------------------- ");
  console.log("                 Resposta 3: ");
  for (let i = 0; i < 5; i++) {
    console.log(qttCityState[i].state + " - " + qttCityState[i].qttCity);
  }
}

/* R4 */
function printMinCities() {
  let qttMinCities = qttCityState;
  //pegando os 5 menores
  qttMinCities
    .sort((a, b) => {
      return a.qttCity - b.qttCity;
    })
    .splice(5);
  //colocando em ordem decrescente
  qttMinCities.sort((a, b) => {
    return b.qttCity - a.qttCity;
  });

  return qttMinCities;
}

/* R5 */
function printCityMaxLettersPerUf() {
  let citiesMaxName = [];
  jsonState.forEach((element) => {
    citiesMaxName.push(getCityMaxLetters(element.Sigla));
  });

  return citiesMaxName;
}

/* R5.2 */
function getCityMaxLetters(uf) {
  let cityFile = JSON.parse(fs.readFileSync(`./data/${uf}.json`, "utf8"));

  cityFile
    .sort((a, b) => {
      return a.nameCity.localeCompare(b.nameCity);
    })
    .sort((a, b) => {
      return b.quatityLetters - a.quatityLetters;
    });
  /* .splice(1); */
  /* return cityFile[0].nameCity + " - " + cityFile[0].state; */
  return { city: cityFile[0].nameCity, state: cityFile[0].state };
}

/* R6 */
function printCityMinLettersPerUf() {
  let citiesMinName = [];
  jsonState.forEach((element) => {
    citiesMinName.push(getCityMinLetters(element.Sigla));
  });

  return citiesMinName;
}

/* R6.2 */
function getCityMinLetters(uf) {
  let cityFile = JSON.parse(fs.readFileSync(`./data/${uf}.json`, "utf8"));

  cityFile
    .sort((a, b) => {
      return a.nameCity.localeCompare(b.nameCity);
    })
    .sort((a, b) => {
      return a.quatityLetters - b.quatityLetters;
    });
  /* .splice(1); */
  /* return cityFile[0].nameCity + " - " + cityFile[0].state; */
  return { city: cityFile[0].nameCity, state: cityFile[0].state };
}

/* R7 */
function printCityMaxLettersAllState() {
  let citiesMaxLetters = printCityMaxLettersPerUf();
  citiesMaxLetters
    .sort((a, b) => {
      return a.city.localeCompare(b.city);
    })
    .sort((a, b) => {
      return b.city.length - a.city.length;
    })
    .splice(1);

  return citiesMaxLetters;
}

/* R8 */
function printCityMinLettersAllState() {
  let citiesMinLetters = printCityMinLettersPerUf();
  citiesMinLetters
    .sort((a, b) => {
      return a.city.localeCompare(b.city);
    })
    .sort((a, b) => {
      return a.city.length - b.city.length;
    })
    .splice(1);

  return citiesMinLetters;
}

/* Q1 */
console.log("                 Resposta 1: ");
console.log("setStateCity()");
setStateCity();

/* Q2 */
console.log("                 Resposta 2: ");
console.log("getQttCityState(uf)");
getQttCityState("MG");

/* Q3 */
printMaxCitiesForState();

/* Q4 */
console.log("--------------------------------------------- ");
console.log("                 Resposta 4: ");
printMinCities().forEach((element) => {
  console.log(element.state + " - " + element.qttCity);
});

/* Q5 */
console.log("--------------------------------------------- ");
console.log("                 Resposta 5: ");
printCityMaxLettersPerUf().forEach((element) => {
  console.log(element.city + " - " + element.state);
});

/* Q6 */
console.log("--------------------------------------------- ");
console.log("                 Resposta 6: ");
printCityMinLettersPerUf().forEach((element) => {
  console.log(element.city + " - " + element.state);
});

/* Q7 */
console.log("--------------------------------------------- ");
console.log("                 Resposta 7: ");
printCityMaxLettersAllState().forEach((element) => {
  console.log(element.city + " - " + element.state);
});

/* Q8 */
console.log("--------------------------------------------- ");
console.log("                 Resposta 8: ");
printCityMinLettersAllState().forEach((element) => {
  console.log(element.city + " - " + element.state);
});
