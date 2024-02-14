document.addEventListener("DOMContentLoaded", function() {
    const sentences = ["Budi izvrstan u onome što voliš...", "ZAISKRI"];
    let currentSentence = 0;
    let currentChar = 0;
    const typingSpeed = 150;
    const nextLineDelay = 2000; // delay prije zaiskri
    const typedText = document.getElementById("typed-text");
    const typedTextLine2 = document.getElementById("typed-text-line2");
    const allText = document.getElementById("all-text");
    const image = document.getElementById("fading-image");
    

    function type() {
        if (currentSentence < sentences.length) {
            if (currentChar < sentences[currentSentence].length) {
                if (currentSentence === 0) {
                    typedText.textContent += sentences[currentSentence].charAt(currentChar);
                } else {
                    typedTextLine2.textContent += sentences[currentSentence].charAt(currentChar);
                }
                currentChar++;
                setTimeout(type, typingSpeed);
            } else {
                currentSentence++;
                currentChar = 0;
                if (currentSentence < sentences.length) {
                    setTimeout(type, nextLineDelay);
                }
            }
        }
        if (currentSentence >= sentences.length) {
            fadeOutText();
            fadeInImage();
        }
    }

   function fadeOutText() {
        allText.classList.add("fade-out");
    }

    function fadeInImage() {
        image.classList.add("display-block");
        image.classList.add("fade-in");
    }
   
    type(); 
   
});
