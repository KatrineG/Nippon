// definerede variabler til tallerken og madret-overlay
// Får fat i elementerne for hovedtallerkenen og overlay-laget/tallerkenlag, hvor maderetten vil blive vist på
const hovedtallerken = document.getElementById("hovedtallerken");
const tallerkenlag = document.getElementById("tallerkenlag");

// Event Listeners til hvert billede
// Tilføjer event-listeners til hvert billede i galleriet. Når et billede klikkes, kaldes den tilsvarende funktion (visRet1, visRet2 osv.)
document
	.querySelector(".galleri img:nth-child(1)")
	.addEventListener("click", visRet1);
document
	.querySelector(".galleri img:nth-child(2)")
	.addEventListener("click", visRet2);
document
	.querySelector(".galleri img:nth-child(3)")
	.addEventListener("click", visRet3);
document
	.querySelector(".galleri img:nth-child(4)")
	.addEventListener("click", visRet4);
document
	.querySelector(".galleri img:nth-child(5)")
	.addEventListener("click", visRet5);
document
	.querySelector(".galleri img:nth-child(6)")
	.addEventListener("click", visRet6);

// funktioner til at opdatere maderetten på tallerkenen
// hver funktion herunder ændrer billedet i overlayet,(tallerkenlag), til det specifikke madbillede og viser det, når et billede fra galleriet bliver klikket på.

function visRet1() {
	tallerkenlag.src = "images/japanret.png"; // Sætter src-attributten til japanret.png
	tallerkenlag.style.display = "block"; // ændrer elementets visningsstatus til "block," hvilket betyder, at det bliver synligt og opfører sig som et blok-element i layoutet.
}
function visRet2() {
	tallerkenlag.src = "images/okonomiyaki.png";
	tallerkenlag.style.display = "block";
}

function visRet3() {
	tallerkenlag.src = "images/risogkarry.png";
	tallerkenlag.style.display = "block";
}

function visRet4() {
	tallerkenlag.src = "images/rejer.png";
	tallerkenlag.style.display = "block";
}

function visRet5() {
	tallerkenlag.src = "images/nudler.png";
	tallerkenlag.style.display = "block";
}

function visRet6() {
	tallerkenlag.src = "images/japanret.png";
	tallerkenlag.style.display = "block";
}
