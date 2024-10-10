//Animation stagger link effect (Bruger gsap og splittext js libs)

const staggerLinks = document.querySelectorAll(".stagger-link"); //Jeg vælger alle class med stagger link i mit document og gør dem til en variable, så jeg kan target dem i JS

staggerLinks.forEach((link) => {
	//forEach funktionen går gennem hvert link element i mit staggerLinks array.
	const textElement = link.querySelector(".stagger-link-text"); //Den siger at inde i hver link, så skal den target classen .stagger-link-text som er teksten der skal animeres

	// Jeg bruger js lib splittext til at opdelle teksten i bogstaver
	const splitText = new SplitType(textElement, { types: "chars" });

	// Jeg opretter en gsap timeline til animationen, sat til pause hvilket betyuder den ikke starter før noget trigger den
	const tl = gsap.timeline({ paused: true });

	// Gsap animation, flytter teksten op og har en stagger effekt, dvs forsinkelse ved hver bogstav på 0.4ms
	tl.to(splitText.chars, {
		//gør brug af gsap's to metode for at animere hver enkel bogstav af link/text elementet
		y: "-100%", // flytter bogstaver op
		duration: 0.4,
		stagger: 0.01,
		ease: "power4.inOut",
		overwrite: true, //Fortæller animation skal stoppes hvis den bliver cancled og genoptages samme sted hvis musen enter igen
	});

	// Hover/musen rører elementet/containeren vil trigge animationen
	link.addEventListener("mouseenter", () => {
		tl.play();
	});

	// Når musen forlader elemntet vil animationen reverse
	link.addEventListener("mouseleave", () => {
		tl.reverse();
	});
});

//Binder mit madbillede fast til en gsap scrolltrigger animation

//Jeg ved på forhånd at gsap har en utrolig nem scrolltrigger funktion, som ved hjælp af scrub funktionen kan bindes til din scrollbar. Jeg vælger derfor at bruge gsap til animationen hvor madskålen bliver animere ud af viewporten når du scroller ned.

gsap.registerPlugin(ScrollTrigger); //Jeg sørger for at gsaps scroll trigger plugin er registeret, da du altid skal registrere 3rd party plugins i din JS før at dets kode kan anvendes
gsap.to(".scrolldish", {
	//Bruger gsaps to. funktion for nemt at animere mit .scrolldish element. Det er lidt ligesom gsaps måde at bruge DOM-manipulation, og vælge et target element
	opacity: 0, //Synligheden vil i løbet af scrolltrigger animation ændres til 0 fra 1
	y: -250, //Bevæger billedet -250px op af y aksen
	x: 50, //Bevæger billedet horizentalt 50px væk
	rotation: -45, //Rotere 45 grader
	ease: "power4.in", //Jeg bruger en pre defined easing curve, som er nogle cubic breziers gsap har lavet på forhånd
	scrollTrigger: {
		//Binder animationen til scrolltrigger
		trigger: ".mockupherosec", //Min trigger elemnt
		start: "top top", //Hvilken del af viewport skal animationen starte
		end: "bottom 75%", //Bestemmer hvornår jeg skal afslutte den
		scrub: 2, //Scrub binder animationen fast til scroll baren, dvs at hvis jeg kører op reveser animation og hvis jeg kører ned afspiller den. Jeg putter den til 2 for at fortælle at animationen skal afspilles over 2 sekunder, så ligemeget hvor hurtigt mine triggers rammer vil animationen altid tage 2 sekunder.
		markers: false, //Kan bruges til en visuel repræsentation af trigger markers
	},
});

//Madkort car slider js der skifter 4 containers ud (Relevant fra undervisning)

//Her vælger jeg variablerne som jeg skal target inde i mit dom
const leftArrow = document.querySelector(".arrow-left");
const rightArrow = document.querySelector(".arrow-right");
const madkortWrapper = document.querySelector(".madkort-wrapper");

let currentSlide = 0; //Denne variabled holder styr på hvilket slide af cards der vises. Starter på det første sæt 0 (index). Det er en let variabel, da det er meningen den skal ændre sig afhænging af hvilket slide den er på
const cardsPerView = 4; //Bestemmer hvor mange cards der skal vises ad gangen. den er konstant da jeg altid vil have vist 4 kort
const totalSlides = Math.ceil(
	document.querySelectorAll(".madkort").length / cardsPerView
); //Her beregner jeg hvor mange sæt af cards der er. Jeg henter først alle elementerne/kortene med queryselectorAll, og dividere antallety med 4 kort per slide. Math.ceil() bruges for at runde resultatet op, så der ikke vises delvise kort.

// Bevæg hen til de næste 4 kort. Jeg vælger at bruge en javascript condition, for at tjekke hvilket slide af kort der bliver vist, og på den måde afgøre hvilken vej mit kort wrapper skal flyttes og håndterer looping tilbage til første slide eller frem til sidste.
rightArrow.addEventListener("click", () => {
	//Jeg bruger en on click event listener, for at lave en trigger på min funktion, som vil gør pilene brugbare til at skifte slides
	if (currentSlide < totalSlides - 1) {
		currentSlide++; //Dette tjekker, om vi ikke allerede er på den sidste slide. Hvis vi ikke er på sidste slide, forøges currentSlide med 1 (skifter til næste sæt af kort).
	} else {
		currentSlide = 0; // Jeg fortæller den at den skal nulstilles til første slide(index 0), hvis vi er på sidste slide
	}
	madkortWrapper.style.transform = `translateX(-${currentSlide * 100}%)`; //Ved at bruge style-egenskaben kan du dynamisk ændre CSS-egenskaber på et element. transform bruges til at forskyde mine elementer. transform: translateX() til at forskyde hele containeren af kort, så den viser nye kort uden at ødelægge layoutet. Her anvender du 100%, så hvert slide fylder hele bredden af madkort-wrapperen, hvilket skaber en smooth overgang.
});

// Bevæg tilbage til de sidste 4
leftArrow.addEventListener("click", () => {
	if (currentSlide > 0) {
		currentSlide--; //Dette tjekker, om vi ikke allerede er på den første slide. Hvis vi ikke er på den første slide, skifter vi tilbage til det forrige sæt af kort ved at reducere currentSlide med 1.
	} else {
		currentSlide = totalSlides - 1; // Hvis vi er på den første slide, springer vi til den sidste slide
	}
	madkortWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
});
