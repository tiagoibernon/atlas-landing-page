(function () {
    // Ativa estilos progressivos apenas quando o JavaScript está disponível.
    document.documentElement.classList.add("js");

    document.addEventListener("DOMContentLoaded", function () {
        var toggle = document.querySelector(".nav-toggle");
        var nav = document.querySelector(".site-nav");

        if (!toggle || !nav) {
            return;
        }

        function closeMenu() {
            toggle.setAttribute("aria-expanded", "false");
            nav.removeAttribute("data-open");
        }

        // Alterna o menu mobile preservando o estado para acessibilidade.
        toggle.addEventListener("click", function () {
            var isOpen = toggle.getAttribute("aria-expanded") === "true";
            toggle.setAttribute("aria-expanded", String(!isOpen));

            if (isOpen) {
                nav.removeAttribute("data-open");
            } else {
                nav.setAttribute("data-open", "true");
            }
        });

        nav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", closeMenu);
        });

        // Fecha o menu ao clicar fora dele em telas pequenas.
        document.addEventListener("click", function (event) {
            if (window.innerWidth > 720) {
                return;
            }

            if (!nav.contains(event.target) && !toggle.contains(event.target)) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Garante estado limpo ao voltar para o layout desktop.
        window.addEventListener("resize", function () {
            if (window.innerWidth > 720) {
                closeMenu();
            }
        });
    });
}());
