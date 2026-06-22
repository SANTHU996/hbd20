window.addEventListener("DOMContentLoaded", () => {

    let audioUnlocked = false;
    const text = "Hi Lucky... ❤️";
    let i = 0;

    const typing = document.getElementById("typing");
    const btn = document.getElementById("startBtn");
    const music = document.getElementById("bgMusic");

    console.log("music element:", music);

    function typeText() {
        if (i < text.length) {
            typing.textContent += text.charAt(i);
            i++;
            setTimeout(typeText, 120);
        } else {
            btn.classList.add("show");
        }
    }

    typeText();

    btn.addEventListener("click", async () => {
        console.log("CLICKED ✔️");

        try {
            if (!music) {
                throw new Error("Audio element not found");
            }

            music.currentTime = 0;
            music.volume = 0.5;

            await music.play();

            console.log("MUSIC PLAYING ✔️");

        } catch (err) {
            console.log("ERROR ❌", err);
            alert(err.message);
        }

        document.getElementById("birthday").scrollIntoView({
            behavior: "smooth"
        });
    });

});
const ending = document.getElementById("ending");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let fade = setInterval(() => {
                if (music.volume > 0.05) {
                    music.volume -= 0.05;
                } else {
                    music.pause();
                    clearInterval(fade);
                }
            }, 200);
        }
    });
});

observer.observe(ending);
