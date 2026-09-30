document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    const resources = {
        internet: {
            title: "Internet",
            description: "Ponto de entrada publico para acesso ao ChrisLabs CloudOps."
        },

        staticwebapp: {
            title: "Azure Static Web Apps",
            description: "Hospeda a interface web do ChrisLabs CloudOps utilizando o plano Free."
        },

        website: {
            title: "ChrisLabs CloudOps",
            description: "Interface web utilizada para apresentar a arquitetura e as operacoes do projeto."
        },

        terraform: {
            title: "Terraform",
            description: "Infrastructure as Code utilizada para provisionar e manter os recursos Azure do projeto."
        },

        storage: {
            title: "Azure Storage",
            description: "Utilizado como backend remoto para armazenar o Terraform State."
        },

        resourcegroup: {
            title: "Resource Group",
            description: "Container logico utilizado para organizar os recursos Azure do laboratorio."
        },

        vnet: {
            title: "Azure Virtual Network",
            description: "Fundacao de rede criada para demonstrar segmentacao da infraestrutura Azure."
        },

        appsubnet: {
            title: "Application Subnet",
            description: "Subnet snet-app utilizada na fundacao de rede do laboratorio."
        },

        managementsubnet: {
            title: "Management Subnet",
            description: "Subnet snet-management destinada a camada de gerenciamento do laboratorio."
        },

        code: {
            title: "CODE",
            description: "Infraestrutura definida declarativamente nos arquivos Terraform."
        },

        validate: {
            title: "VALIDATE",
            description: "Validacao da configuracao Terraform antes das alteracoes."
        },

        plan: {
            title: "PLAN",
            description: "Revisao das alteracoes propostas pelo Terraform."
        },

        apply: {
            title: "APPLY",
            description: "Execucao das alteracoes aprovadas na infraestrutura Azure."
        },

        azure: {
            title: "Microsoft Azure",
            description: "Plataforma de nuvem utilizada pelo ChrisLabs CloudOps."
        }
    };

    const tooltip = document.getElementById("tooltip");
    const modal = document.getElementById("resourceModal");
    const closeButton = document.getElementById("modalClose");

    const modalCategory = document.getElementById("modalCategory");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalDetails = document.getElementById("modalDetails");
    const modalStatus = document.getElementById("modalStatus");

    const elements = document.querySelectorAll("[data-resource]");

    function getResource(element) {
        const key = element.dataset.resource;
        return resources[key];
    }

    function showTooltip(event) {
        if (!tooltip) {
            return;
        }

        const element = event.currentTarget;
        const resource = getResource(element);

        if (!resource) {
            return;
        }

        tooltip.innerHTML =
            "<strong>" + resource.title + "</strong>" +
            "<span>" + resource.description + "</span>";

        tooltip.classList.add("visible");

        const rect = element.getBoundingClientRect();

        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;

        let left =
            rect.left +
            (rect.width / 2) -
            (tooltipWidth / 2);

        let top =
            rect.top -
            tooltipHeight -
            14;

        if (left < 10) {
            left = 10;
        }

        if (left + tooltipWidth > window.innerWidth - 10) {
            left = window.innerWidth - tooltipWidth - 10;
        }

        if (top < 10) {
            top = rect.bottom + 14;
        }

        tooltip.style.left = left + "px";
        tooltip.style.top = top + "px";
    }

    function hideTooltip() {
        if (tooltip) {
            tooltip.classList.remove("visible");
        }
    }

    function openModal(element) {
        if (!modal) {
            return;
        }

        const resource = getResource(element);

        if (!resource) {
            return;
        }

        hideTooltip();

        if (modalCategory) {
            modalCategory.textContent = "CHRISLABS CLOUDOPS";
        }

        if (modalTitle) {
            modalTitle.textContent = resource.title;
        }

        if (modalDescription) {
            modalDescription.textContent = resource.description;
        }

        if (modalDetails) {
            modalDetails.innerHTML =
                "<strong>Utilizacao no projeto</strong>" +
                "<p>" + resource.description + "</p>";
        }

        if (modalStatus) {
            modalStatus.textContent = "Implementado";
        }

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        if (!modal) {
            return;
        }

        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";
    }

    elements.forEach(function (element) {
        element.addEventListener("mouseenter", showTooltip);
        element.addEventListener("mouseleave", hideTooltip);

        element.addEventListener("click", function () {
            openModal(element);
        });
    });

    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }

    if (modal) {
        const overlay = modal.querySelector(".modal-overlay");

        if (overlay) {
            overlay.addEventListener("click", closeModal);
        }
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeModal();
        }
    });

    window.addEventListener("scroll", hideTooltip);
    window.addEventListener("resize", hideTooltip);

    console.log("ChrisLabs CloudOps JavaScript carregado.");
    console.log("Componentes interativos: " + elements.length);
});
