import { EmployeesFunctions } from "./employeeFunctions";
import { Employee } from "./models/employee";
import { SelectedFilters } from "./models/selectedFilter";

export class GlobalUtilityFunctions {
    selectedFilters: SelectedFilters;
    constructor(selectedFilters: SelectedFilters) { 
        this.selectedFilters = selectedFilters;
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

    renderEmployees(filteredData: Employee[]): void {
        const tableBody = document.querySelector<HTMLTableSectionElement>(".employees-table tbody");
        if (!tableBody) return;

        tableBody.innerHTML = "";

        filteredData.forEach((employee) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td class="check-box-col"><input type="checkbox"/></td>
            <td class="col col-user">
                <div class="profile-card emp-card">
                    <img src="${employee.profileImageBase64}" alt="Employee Image" class="employee-img" />
                    <div class="profile-details">
                        <p class="profile-name">${employee.firstName} ${employee.lastName}</p>
                        <p class="profile-email">${employee.email}</p>
                    </div>
                </div>
            </td>
            <td class="col col-location">${employee.location}</td>
            <td class="col col-department">${employee.department}</td>
            <td class="col col-role">${employee.jobTitle}</td>
            <td class="col col-emp-no">${employee.empNo}</td>
            <td class="col col-status">
                <div class="btn-active">${employee.status ? "Active" : "Inactive"}</div>
            </td>
            <td class="col col-join-dt">${employee.joiningDate}</td>
            <td>
                <span class="material-icons-outlined ellipsis-icon" onclick="EMS.employeesPageFunctions.ellipsisFunction(this)">more_horiz</span>
                <div class="ellipsis-menu">
                    <ul>
                        <li><a href="#" onclick="EMS.employeesPageFunctions.viewDetails()">View Details</a></li>
                        <li><a href="#" onclick="EMS.employeesPageFunctions.editRow()">Edit</a></li>
                        <li onclick="EMS.employeesPageFunctions.deleteRow(this)"><a href="#">Delete</a></li>
                    </ul>
                </div>
            </td>
        `;
            tableBody.appendChild(row);
        });
    }
    getDataFromLocalStorage(key:string): Employee[] {
        const employeesData = localStorage.getItem(key);
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

    exportCSV(filename: string, excludedColumns: string[], tableData: any[]) {
    const csvContent = this.convertToCSV(tableData, excludedColumns);
    this.downloadCSVFile(csvContent, filename);
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
    resetSelectedFiltersState(): void {
        this.selectedFilters.alphabet = [];
        this.selectedFilters.status = [];
        this.selectedFilters.location = [];
        this.selectedFilters.department = [];
    }

    resetFormProfileImage(): void {
        const defaultImageSource = "../assets/default-user.png";
        const profileImagePreview = document.getElementById(
            "profileImagePreview"
        ) as HTMLImageElement | null;
        if (profileImagePreview) {
            profileImagePreview.src = defaultImageSource;
        }
    }
}