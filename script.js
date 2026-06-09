function calculer(event) {
  event.preventDefault();
  const montantDuCredit = parseInt(
    document.getElementById("montantDuCredit").value,
  );
  const taux = parseFloat(document.getElementById("taux").value);
  const duree = parseInt(document.getElementById("duree").value);
  const nbreMois = duree * 12;
  const tauxMensuel = taux / 100 / 12;

  const mensualite = parseFloat(
    (montantDuCredit * tauxMensuel) / (1 - (1 + tauxMensuel) ** -nbreMois),
  );

  let capitalARembourser = montantDuCredit;

  let basculeMensuelTrouvee = false;
  let basculeCumulTrouvee = false;
  let moisBasculeMensuel = 0;
  let moisBasculeCumul = 0;
  let totalInteretsPaies = 0;
  let totalCapitalRembourse = 0;
  const nomsMois = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  for (let i = 1; i <= nbreMois; i++) {
    const numeroMoisDansAnnee = i % 12 === 0 ? 12 : i % 12;
    const nomDuMois = nomsMois[numeroMoisDansAnnee - 1];
    const annee = Math.ceil(i / 12);
    const interetsDuMois = capitalARembourser * tauxMensuel;
    const patrimoineDuMois = mensualite - interetsDuMois;
    totalInteretsPaies += interetsDuMois;
    totalCapitalRembourse += patrimoineDuMois;

    document.getElementById("corps-tableau").innerHTML += `
      <tr>
        <td>${annee}</td>
        <td>${nomDuMois}</td>
        <td>${interetsDuMois.toFixed(2)} €</td>
        <td>${totalInteretsPaies.toFixed(2)}</td>
        <td>${patrimoineDuMois.toFixed(2)} €</td>
        <td>${totalCapitalRembourse.toFixed(2)}</td>
        <td>${capitalARembourser.toFixed(2)} €</td>
      </tr>
    `;

    capitalARembourser = capitalARembourser - patrimoineDuMois;

    if (patrimoineDuMois > interetsDuMois && !basculeMensuelTrouvee) {
      moisBasculeMensuel = i;
      basculeMensuelTrouvee = true;
    }

    if (totalCapitalRembourse > totalInteretsPaies && !basculeCumulTrouvee) {
      moisBasculeCumul = i;
      basculeCumulTrouvee = true;
    }
  }

  const coutTotal = mensualite * nbreMois;
  const coutInterets = coutTotal - montantDuCredit;

  document.getElementById("resultat-mensualite").textContent =
    "Mensualité : " + mensualite.toFixed(2) + " euros";

  document.getElementById("cout-interets").textContent =
    "Coût des intérêts : " + coutInterets.toFixed(2) + " euros";

  document.getElementById("cout-total").textContent =
    "Coût total : " + coutTotal.toFixed(2) + " euros";

  document.getElementById("bascule-mensuelle").textContent =
    "On rembourse plus son patrimoine que le crédit au mois " +
    moisBasculeMensuel;

  document.getElementById("bascule-cumul").textContent =
    "On a donné plus d'argent à soi-même qu'à la banque au mois " +
    moisBasculeCumul;
}

document
  .getElementById("formulaire-credit")
  .addEventListener("submit", calculer);
