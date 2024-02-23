export class RolesFunctions {
    constructor() { }

    openRoleDescription(element: HTMLElement): void {
        let roleDescPage = document.querySelector(".roles-desc-page");
        let rolePage = document.querySelector(".role-page");
        if (roleDescPage && !roleDescPage.classList.contains("active")) {
            if (rolePage) {
                rolePage.classList.remove("active");
            }
            roleDescPage.classList.add("active");
        }
    }

    handleAddRoleBtn(element: HTMLElement, removeContainers: string[]): void {
        const addRolesPage = document.querySelector<HTMLElement>(".add-roles-container");
        if (addRolesPage && addRolesPage.classList.contains("active")) {
            element.classList.remove("active");
        } else {
            if (addRolesPage) {
                addRolesPage.classList.add("active");
            }
        }
        removeContainers.forEach((removeContainer: string) => {
            const container = document.querySelector<HTMLElement>(removeContainer);
            if (container) {
                container.classList.remove("active");
            }
        });
    }

}