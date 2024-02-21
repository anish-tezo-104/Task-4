export class HeaderFunctions {
    constructor() {

    }

    toggleSideBar(): void {
        const sideBar = document.querySelector<HTMLElement>(".sidebar");
        const gridContainer = document.querySelector<HTMLElement>(".grid-container");
        const sidebarHandleIcon = document.querySelector<HTMLElement>(
            ".sidebar-handle-icon img"
        );

        if (sideBar && gridContainer && sidebarHandleIcon) {
            if (sideBar.classList.contains("active")) {
                sideBar.classList.remove("active");
                gridContainer.style.gridTemplateColumns = "6% 94%";
                document
                    .querySelectorAll<HTMLElement>(".sub-sec-left-left img")
                    .forEach((img) => {
                        img.style.paddingLeft = "0.5rem";
                    });
                const sidebarRolesIcon = document.querySelector<HTMLElement>(
                    ".sidebar-roles-icon"
                );
                const sidebarAssignUserIcon = document.querySelector<HTMLElement>(
                    ".sidebar-assign-user-icon"
                );
                if (sidebarRolesIcon) sidebarRolesIcon.style.paddingLeft = "0.3rem";
                if (sidebarAssignUserIcon)
                    sidebarAssignUserIcon.style.paddingLeft = "0.3rem";
                if (sidebarHandleIcon) sidebarHandleIcon.style.transform = "rotate(-180deg)";
            } else {
                sideBar.classList.add("active");
                gridContainer.style.gridTemplateColumns = "20% 80%";
                document
                    .querySelectorAll<HTMLElement>(".sub-sec-left-left img")
                    .forEach((img) => {
                        img.style.paddingLeft = "1rem";
                    });
                const sidebarRolesIcon = document.querySelector<HTMLElement>(
                    ".sidebar-roles-icon"
                );
                const sidebarAssignUserIcon = document.querySelector<HTMLElement>(
                    ".sidebar-assign-user-icon"
                );
                if (sidebarRolesIcon) sidebarRolesIcon.style.paddingLeft = "1rem";
                if (sidebarAssignUserIcon)
                    sidebarAssignUserIcon.style.paddingLeft = "1rem";
                if (sidebarHandleIcon) sidebarHandleIcon.style.transform = "rotate(360deg)";
            }
        }
    }

    handleBurger(burgerContainer: HTMLElement): void {
        const dropdownContent = document.querySelector<HTMLElement>(".dropdown-content-header");

        if (dropdownContent) {
            if (dropdownContent.classList.contains("active")) {
                dropdownContent.classList.remove("active");
            } else {
                dropdownContent.classList.add("active");
            }
        }
    }

}