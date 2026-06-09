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

  for (let i = 1; i <= nbreMois; i++) {
    interetsDuMois = capitalARembourser * tauxMensuel; // remboursement à la banque
    patrimoineDuMois = mensualite - interetsDuMois; // constitution de son capital

    document.getElementById("corps-tableau").innerHTML += `
      <tr>
        <td>${i}</td>
        <td>${interetsDuMois.toFixed(2)} €</td>
        <td>${patrimoineDuMois.toFixed(2)} €</td>
        <td>${capitalARembourser.toFixed(2)} €</td>
      </tr>
    `;

    capitalARembourser = capitalARembourser - patrimoineDuMois;
  }

  const coutTotal = mensualite * nbreMois;
  const coutInterets = coutTotal - montantDuCredit;

  document.getElementById("resultat-mensualite").textContent =
    "Mensualité : " + mensualite.toFixed(2) + " euros";

  document.getElementById("cout-interets").textContent =
    "Coût des intérêts : " + coutInterets.toFixed(2) + " euros";

  document.getElementById("cout-total").textContent =
    "Coût total : " + coutTotal.toFixed(2) + " euros";
}

document
  .getElementById("formulaire-credit")
  .addEventListener("submit", calculer);
