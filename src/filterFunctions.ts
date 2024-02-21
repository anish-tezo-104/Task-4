import { EmployeesFunctions } from "./employeeFunctions";
import { GlobalUtilityFunctions } from "./globalUtilityFunctions";
import { Employee } from "./models/employee";
import { SelectedFilters } from "./models/selectedFilter";

export class FilterFunctions {
    // employeesFunctions: EmployeesFunctions;
    globalUtilityFunctions: GlobalUtilityFunctions;
    selectedFilters: SelectedFilters;
    constructor(globalUtilityFunctions: GlobalUtilityFunctions, selectedFilters: SelectedFilters) {
        // this.employeesFunctions = employeesFunctions;
        this.globalUtilityFunctions = globalUtilityFunctions;
        this.selectedFilters = selectedFilters;
    }

    generateFilterOptions(options: string[], className: string): string {
        return options.map((option) => `
        <div class="dropdown-options ${className}" onclick="window.ems.filterFunctions.selectOption(this)" value="${option}">
            ${option}
        </div>
    `).join("");
    }
    populateFilterOptions(): void {
        const filterContainerLeft = document.getElementById("filterContainerLeft");
        if (!filterContainerLeft) return;

        filterContainerLeft.innerHTML = `
        <div class="dropdown dropdown-status" onclick="window.ems.filterFunctions.handleFilterDropdown(this)">
            <button class="filter-btn btn-status dropbtn" data-default-text="Status">
                <div>Status</div>
                <div class="expand-more-icon">
                    <span class="material-icons-outlined expand-more-icon">
                        expand_more
                    </span>
                </div>
            </button>
            <div class="dropdown-content">
                ${window.ems.filterFunctions.generateFilterOptions(window.ems.filterOptions.status, "status")}
            </div>
        </div>
        <div class="dropdown dropdown-location" onclick="window.ems.filterFunctions.handleFilterDropdown(this)">
            <button class="filter-btn btn-location dropbtn" data-default-text="Location">
                <div>Location</div>
                <div class="expand-more-icon">
                    <span class="material-icons-outlined expand-more-icon">
                        expand_more
                    </span>
                </div>
            </button>
            <div class="dropdown-content">
                ${window.ems.filterFunctions.generateFilterOptions(window.ems.filterOptions.location, "location")}
            </div>
        </div>
        <div class="dropdown dropdown-department" onclick="window.ems.filterFunctions.handleFilterDropdown(this)">
            <button class="filter-btn btn-department dropbtn" data-default-text="Department">
                <div>Department</div>
                <div class="expand-more-icon">
                    <span class="material-icons-outlined expand-more-icon">
                        expand_more
                    </span>
                </div>
            </button>
            <div class="dropdown-content">
                ${window.ems.filterFunctions.generateFilterOptions(window.ems.filterOptions.department, "department")}
            </div>
        </div>
    `;
    }

    handleFilterDropdown(element: HTMLElement): void {
        if (element.classList.contains("active")) {
            element.classList.remove("active");
        } else {
            element.classList.add("active");
        }
    }

    selectOption(option: HTMLElement): void {
        option.classList.toggle("selected");
        option.classList.toggle("active");

        const value = option.getAttribute("value")?.trim().toLowerCase() || "";
        const dropdownOptions = document.querySelectorAll<HTMLElement>(".dropdown-options");
        dropdownOptions.forEach((dropdownOption) => {
            if (dropdownOption.getAttribute("value")?.trim().toLowerCase() === value) {
                dropdownOption.classList.toggle("selected", option.classList.contains("selected"));
                dropdownOption.classList.toggle("active", option.classList.contains("active"));
            }
        });

        this.handleFilterBar();
    }

    handleFilterBar(): void {
        const dropdownButtons = document.querySelectorAll<HTMLButtonElement>(".filter-btn");
        let totalSelectedCount = 0;
        dropdownButtons.forEach((button) => {
            const dropdownContent = button.nextElementSibling as HTMLElement;
            const selectedOptions = dropdownContent.querySelectorAll<HTMLElement>(".dropdown-options.selected.active");
            const selectedCount = selectedOptions.length;
            button.querySelector("div")!.textContent =
                selectedCount > 0 ? `${selectedCount} Selected` : button.getAttribute("data-default-text") || "";
            totalSelectedCount += selectedCount;
        });
        const resetButton = document.querySelector<HTMLButtonElement>(".btn-reset");
        const applyButton = document.querySelector<HTMLButtonElement>(".btn-apply");
        if (resetButton && applyButton) {
            if (totalSelectedCount > 0) {
                resetButton.disabled = false;
                applyButton.disabled = false;

            } else {
                this.updateFilteredResults();
                resetButton.disabled = true;
                applyButton.disabled = true;

            }
        }

    }

    resetFilter(): void {
        const dropdownButtons = document.querySelectorAll<HTMLButtonElement>(".filter-btn");
        const dropdownOptions = document.querySelectorAll<HTMLDivElement>(".dropdown-options");
        const dropdown = document.querySelector<HTMLDivElement>(".dropdown");
        const alphBtns = document.querySelectorAll<HTMLDivElement>(".alph-btn");

        alphBtns.forEach((btn) => {
            btn.classList.remove("active");
        });

        dropdownButtons.forEach((button) => {
            const divElement = button.querySelector("div");
            if (divElement) {
                divElement.textContent = button.getAttribute("data-default-text") || "";
            }
            const dropdownContent = button.closest(".dropdown")?.querySelector<HTMLDivElement>(".dropdown-content");
            if (dropdownContent) {
                dropdownContent.classList.remove("active");
            }
        });

        if (dropdown) {
            dropdown.classList.remove("active");
        }

        dropdownOptions.forEach((dropdownOption) => {
            dropdownOption.classList.remove("active", "selected");
        });

        const resetButton = document.querySelector<HTMLButtonElement>(".btn-reset");
        const applyButton = document.querySelector<HTMLButtonElement>(".btn-apply");
        if (resetButton) {
            resetButton.disabled = true;
        }
        if (applyButton) {
            applyButton.disabled = true;
        }

        this.globalUtilityFunctions.resetSelectedFiltersState();
        this.updateFilteredResults();
    }

    updateFilteredResults(): void {
        const selectedFilters = this.getSelectedFilters();
        this.globalUtilityFunctions.renderEmployees(this.getFilteredData(selectedFilters));
    }

    generateAlphabetButtons(): void {
        const alphabetsContainer = document.getElementById("alphabetsContainer");
        if (!alphabetsContainer) return;

        for (let i = 65; i <= 90; i++) {
            const alphabetChar = String.fromCharCode(i);
            const alphabetButton = document.createElement("div");
            alphabetButton.classList.add(
                "alph-btn",
                `btn-${alphabetChar.toLowerCase()}`
            );
            alphabetButton.textContent = alphabetChar;
            alphabetButton.addEventListener("click", () => {
                this.filterEmployeesByAlphabet(alphabetButton);
            });
            alphabetsContainer.appendChild(alphabetButton);
        }
    }

    filterEmployeesByAlphabet(element: HTMLElement): void {
        const alphBtns: NodeListOf<HTMLElement> = document.querySelectorAll(".alph-btn");
        const filterBtn: HTMLElement | null = document.querySelector(".icon-filter");

        if (filterBtn) {
            filterBtn.classList.add("active");
        }

        element.classList.toggle("active");

        this.selectedFilters.alphabet = [];

        alphBtns.forEach((btn: HTMLElement) => {
            if (btn.classList.contains("active")) {
                this.selectedFilters.alphabet.push(btn.textContent?.trim().toLowerCase() || "");
            }
        });

        const noActiveAlphabets: boolean = this.selectedFilters.alphabet.length === 0;
        const applyButton: HTMLButtonElement | null = document.querySelector(".btn-apply");
        const resetButton: HTMLButtonElement | null = document.querySelector(".btn-reset");

        if (applyButton && resetButton) {
            if (noActiveAlphabets) {
                if (filterBtn) {
                    filterBtn.classList.remove("active");
                }
                applyButton.disabled = true;
                resetButton.disabled = true;
            } else {
                applyButton.disabled = false;
                resetButton.disabled = false;
            }
        }
    }

    getSelectedFilterOptions(selector: string): string[] {
        const selectedOptions: string[] = [];
        const selectedElements = document.querySelectorAll<HTMLElement>(`${selector} .dropdown-options.selected`);

        selectedElements.forEach(option => {
            const value = (option.getAttribute("value") || "").trim().toLowerCase();

            if (value === "all") {
                selectedOptions.push("active", "inactive");
            } else if (!selectedOptions.includes(value)) {
                selectedOptions.push(value);
            }
        });

        return selectedOptions;
    }

    getSelectedAlphabets(): string[] {
        const selectedAlphabets: string[] = [];
        const alphBtns = document.querySelectorAll<HTMLDivElement>(".alph-btn");

        alphBtns.forEach(btn => {
            if (btn.classList.contains("active")) {
                const alphabet = btn.textContent?.trim().toLowerCase() || '';
                if (!selectedAlphabets.includes(alphabet)) {
                    selectedAlphabets.push(alphabet);
                }
            }
        });

        return selectedAlphabets;
    }

    getSelectedFilters(): SelectedFilters {
        const selectedFilters: SelectedFilters = {
            alphabet: this.getSelectedAlphabets(),
            status: this.getSelectedFilterOptions(".dropdown-status"),
            location: this.getSelectedFilterOptions(".dropdown-location"),
            department: this.getSelectedFilterOptions(".dropdown-department"),
        };
        return selectedFilters;
    }

    

    getFilteredData(selectedFilters: {
        alphabet: string[],
        status: string[],
        department: string[],
        location: string[]
    } = {
            alphabet: [],
            status: [],
            department: [],
            location: []
        }): Employee[] {
        const employees: Employee[] = this.globalUtilityFunctions.getDataFromLocalStorage("employees");
        return employees.filter((employee: Employee) => {
            const firstName: string = employee.firstName ? employee.firstName.toLowerCase() : "n/a";
            const location: string = employee.location ? employee.location.toLowerCase() : "n/a";
            const department: string = employee.department ? employee.department.toLowerCase() : "n/a";
            const status: string = employee.status ? "active" : "inactive";
            const matchesFilters: boolean =
                (selectedFilters.alphabet.length === 0 ||
                    selectedFilters.alphabet.some((alphabet: string) =>
                        firstName.startsWith(alphabet.toLowerCase())
                    )) &&
                (selectedFilters.status.length === 0 ||
                    selectedFilters.status.includes(status)) &&
                (selectedFilters.department.length === 0 ||
                    selectedFilters.department.includes(department)) &&
                (selectedFilters.location.length === 0 ||
                    selectedFilters.location.includes(location));
            return matchesFilters;
        });
    }


}