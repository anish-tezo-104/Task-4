import { AddEmployeesFunctions } from "./addEmployeesFunctions";
import { FilterFunctions } from "./filterFunctions";
import { GlobalUtilityFunctions } from "./globalUtilityFunctions";
import { Employee } from "./models/employee";
import { SideBarFunctions } from "./sidebarFunctions";

export class EmployeesFunctions {
    globalUtilityFunctions: GlobalUtilityFunctions
    addEmployeeFunction: AddEmployeesFunctions
    sideBarFunctions: SideBarFunctions
    filterFunctions: FilterFunctions
    constructor(globalUtilityFunctions: GlobalUtilityFunctions, addEmployeesFunction: AddEmployeesFunctions, sideBarFunctions: SideBarFunctions, filterFunctions: FilterFunctions) {
        this.globalUtilityFunctions = globalUtilityFunctions;
        this.addEmployeeFunction = addEmployeesFunction;
        this.sideBarFunctions = sideBarFunctions;
        this.filterFunctions = filterFunctions;
    }

    exportEmployeesToCSV(filename: string, excludedColumns: string[]) {
        const currentSelectedFilters = this.filterFunctions.getSelectedFilters();
        const filteredEmployees = this.filterFunctions.getFilteredData(currentSelectedFilters);
        this.globalUtilityFunctions.exportCSV(filename, excludedColumns, filteredEmployees);
    }

    handleAddEmployeeBtn(element: HTMLElement, removeContainers: string[]) {
        const addEmployeePage = document.querySelector(".add-employee-container");
        if (addEmployeePage && addEmployeePage.classList.contains("active")) {
            element.classList.remove("active");
        } else {
            removeContainers.forEach((removeContainer) => {
                const container = document.querySelector(removeContainer);
                if (container) {
                    container.classList.remove("active");
                }
            });
            if (addEmployeePage) {
                addEmployeePage.classList.add("active");
            }
        }
    }

    toggleFilterClass(element: HTMLElement, containerSelectors: string[]) {
        const btnStatus = document.querySelector(".btn-status");
        if (element.classList.contains("active")) {
            element.classList.remove("active");
            containerSelectors.forEach((containerSelector) => {
                const container = document.querySelector(containerSelector);
                if (container) {
                    container.classList.remove("active");
                }
            });
            if (btnStatus) {
                btnStatus.classList.remove("active");
            }
        } else {
            element.classList.add("active");
            containerSelectors.forEach((containerSelector) => {
                const container = document.querySelector(containerSelector);
                if (container) {
                    container.classList.add("active");
                }
            });
            if (btnStatus) {
                btnStatus.classList.add("active");
            }
        }
    }

    loadEmployees(): void {
        let employees = this.globalUtilityFunctions.getDataFromLocalStorage("employees");
        if (employees) {
            this.globalUtilityFunctions.renderEmployees(employees);
            this.sideBarFunctions.populateDepartmentList();
        }
    }

    deleteSelectedRows(): void {
        const allCheckboxes = document.querySelectorAll<HTMLInputElement>(".check-box-col input");
        const selectedRows: HTMLTableRowElement[] = [];

        allCheckboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                const row = checkbox.closest("tr");
                if (row instanceof HTMLTableRowElement) {
                    selectedRows.push(row);
                }
            }
        });

        let existingData: Employee[] = this.globalUtilityFunctions.getDataFromLocalStorage("employees");

        for (let i = 1; i < selectedRows.length; i++) {
            const row = selectedRows[i];
            const empNoCell = row.querySelector(".col-emp-no");
            if (empNoCell) {
                const empNo = empNoCell.textContent || "";
                const index = existingData.findIndex((emp) => emp.empNo === empNo);
                if (index !== -1) {
                    existingData.splice(index, 1);
                }
            }
            row.remove();
        }

        const deletedRowCount = Math.max(selectedRows.length - 1, 0);

        localStorage.setItem("employees", JSON.stringify(existingData));
        // this.toggleDeleteButtonVisibility();
        alert("Successfully deleted " + deletedRowCount + " employees data");
        this.loadEmployees();
        this.sideBarFunctions.populateDepartmentList();
    }



    toggleDeleteButtonVisibility(): void {
        const deleteButton = document.querySelector<HTMLButtonElement>(".btn-delete");
        const allCheckboxes = document.querySelectorAll<HTMLInputElement>(".check-box-col input");
        let anyChecked = false;

        allCheckboxes.forEach((checkbox) => {
            if (checkbox.checked) {
                anyChecked = true;
                return;
            }
        });

        if (deleteButton) {
            deleteButton.disabled = !anyChecked;
        }
    }
    sortTable(column_number: number): void {
        let table = document.getElementById("employeesTable") as HTMLTableElement;
        let switching = true;
        let direction: "ascending" | "descending" = "ascending";
        let count = 0;
        let rows, i, x, y;

        while (switching) {
            switching = false;
            rows = table.rows;

            let shouldSwitch = false;

            for (i = 1; i < rows.length - 1; i++) {
                x = rows[i].getElementsByTagName("TD")[column_number].textContent?.toLowerCase() || "";
                y = rows[i + 1].getElementsByTagName("TD")[column_number].textContent?.toLowerCase() || "";

                if ((direction === "ascending" && x > y) || (direction === "descending" && x < y)) {
                    shouldSwitch = true;
                    break;
                }
            }

            if (shouldSwitch) {
                rows[i].parentNode?.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                count++;
            } else {
                if (count === 0 && direction === "ascending") {
                    direction = "descending";
                    switching = true;
                }
            }
        }
    }


    deleteRow(row: HTMLElement): void {
        const tableRow = row.closest("tr");
        if (!tableRow) return;

        const tableBody = tableRow.parentNode as HTMLElement;
        if (!tableBody) return;

        const rowIndex = Array.from(tableBody.children).indexOf(tableRow);
        if (rowIndex === -1) return;

        const existingData = this.globalUtilityFunctions.getDataFromLocalStorage("employees");
        existingData.splice(rowIndex, 1);
        localStorage.setItem("employees", JSON.stringify(existingData));

        tableRow.remove();
        this.loadEmployees();
        this.sideBarFunctions.populateDepartmentList();
        alert("Employee data deleted successfully!");
    }

    ellipsisFunction(icon: HTMLElement): void {
        const menu = icon.nextElementSibling as HTMLElement;
        if (menu) {
            menu.style.display = menu.style.display === "block" ? "none" : "block";
        }
    }

    updateSelectedOptions(): void {
        const checkboxes = document.querySelectorAll<HTMLInputElement>(".select-items input[type='checkbox']");
        const selectedOptions: string[] = [];
        checkboxes.forEach(function (cb) {
            if (cb.checked) {
                selectedOptions.push(cb.value);
            }
        });
        const selected = document.querySelector(".select-selected") as HTMLElement;
        if (selected) {
            selected.textContent = selectedOptions.length ? selectedOptions.join(", ") : "Select an option";
        }
    }

    handleCheckbox(checkbox: HTMLInputElement): void {
        checkbox.addEventListener("click", this.updateSelectedOptions);
    }

}