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
  document.getElementById("resultat-mensualite").textContent =
    "Mensualité : " + mensualite.toFixed(2) + " euros";
}

document
  .getElementById("formulaire-credit")
  .addEventListener("submit", calculer);
