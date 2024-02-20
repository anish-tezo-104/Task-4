import { Employee } from "./models/employee";

export class GlobalUtilityFunctions {
    constructor() { }
    loadEmployees(): void {
        let employees = this.getAllEmployeesFromLocalStorage();
        if (employees) {
            // employeesPageFunctions.renderEmployees(employees);
        }
    }
    handleSidebarResponsive(): void {
        const sideBar = document.querySelector(".sidebar");

        if (sideBar) {
            if (window.innerWidth <= 900) {
                sideBar.classList.remove("active");
            } else {
                sideBar.classList.add("active");
            }
        }
    }


    getAllEmployeesFromLocalStorage(): Employee[] {
        const employeesData = localStorage.getItem("employees");
        return employeesData ? JSON.parse(employeesData) : [];
    }

    handlePostFormSubmissions(
        form: HTMLFormElement,
        activeContainers: string[],
        removeContainers: string[]
    ): void {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach((errorMessage) => {
            errorMessage.classList.remove("active");
        });

        activeContainers.forEach((container) => {
            const activeContainer = document.querySelector(container);
            if (activeContainer) {
                activeContainer.classList.add("active");
            }
        });

        removeContainers.forEach((container) => {
            const removeContainer = document.querySelector(container);
            if (removeContainer) {
                removeContainer.classList.remove("active");
            }
        });

        form.reset();
    }

    // Responsiveness for SideBar
    extractTableData(): { headers: string[], data: string[][] } {
        let table = document.querySelector(".employees-table") as HTMLTableElement;
        let columnsToRemove = ["", "STATUS", "more_horiz"];
        let headers = Array.from(table.querySelectorAll("th")).map((header) => {
            let firstSpan = header.querySelector("span:first-child");
            return firstSpan ? firstSpan.textContent?.trim() : "";
        });
        let filteredHeaders = headers.filter((header) => !columnsToRemove.includes(header ?? ""));
        let rows = Array.from(table.querySelectorAll("tbody tr"));
        let tableData: string[][] = [];
        rows.forEach((row) => {
            let rowData = Array.from(row.querySelectorAll("td")).map((cell, index) => {
                if (!columnsToRemove.includes(headers[index] ?? "")) {
                    let cellData = cell.textContent?.trim();
                    return '"' + (cellData?.replace(/"/g, '""') ?? "") + '"';
                }
                return "";
            });
            rowData = rowData.filter((cell) => cell !== "");
            if (rowData.length > 0) {
                tableData.push(rowData);
            }
        });
        return { headers: filteredHeaders as string[], data: tableData };
    }


    toggleSelectOptions(): void {
        const options = document.querySelector(".select-items");
        if (options) {
            options.classList.toggle("select-hide");
        }
    }

    updateGridTemplateColumns(): void {
        var screenWidth = window.innerWidth;
        var sideBar = document.querySelector(".sidebar");
        var gridContainer = document.querySelector(".grid-container") as HTMLElement;
        if (screenWidth > 900 && sideBar && sideBar.classList.contains("active")) {
            if (gridContainer) {
                gridContainer.style.gridTemplateColumns = "20% 80%";
            }
        } else {
            if (gridContainer) {
                gridContainer.style.gridTemplateColumns = "100%";
            }
        }
    }

    convertToCSV(employeesData: any[], excludedColumns: string[] = []): string {
        let csvContent = "";
        if (employeesData.length === 0) {
            return csvContent;
        }
        const headers = Object.keys(employeesData[0]);
        const filteredHeaders = headers.filter(
            (header) => !excludedColumns.includes(header)
        );
        csvContent += '"' + filteredHeaders.join('","') + '"\n';
        employeesData.forEach((rowData) => {
            let rowContent = filteredHeaders
                .map((header) => {
                    let cell = rowData[header];
                    if (typeof cell === "string" && cell.includes('"')) {
                        cell = cell.replace(/"/g, '""');
                    }
                    if (typeof cell === "string" && cell.includes(",")) {
                        cell = '"' + cell + '"';
                    }
                    return cell;
                })
                .join(",");
            csvContent += rowContent + "\n";
        });

        return csvContent;
    }

    downloadCSVFile(csvContent: string, filename: string): void {
        let blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        let url = URL.createObjectURL(blob);
        let link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.click();
        URL.revokeObjectURL(url);
    }
    // resetSelectedFiltersState(): void {
    //     selectedFilters.alphabet = [];
    //     selectedFilters.status = [];
    //     selectedFilters.location = [];
    //     selectedFilters.department = [];
    // }
}