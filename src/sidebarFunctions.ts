import { SelectedFilters } from "./models/selectedFilter";
import { HeaderFunctions } from "./headerFunctions";
import { GlobalUtilityFunctions } from "./globalUtilityFunctions";
import { FilterFunctions } from "./filterFunctions";

interface FilterOptions {
  status: string[];
  location: string[];
  department: string[];
}

export class SideBarFunctions {
  headerFunctions: HeaderFunctions;
  globalUtilityFunctions: GlobalUtilityFunctions;
  filterOptions: FilterOptions;
  filterFunctions: FilterFunctions;
  constructor(headerFunctions: HeaderFunctions, globalUtilityFunctions: GlobalUtilityFunctions, filterOptions: FilterOptions, filterFunctions: FilterFunctions) {
    this.headerFunctions = headerFunctions;
    this.globalUtilityFunctions = globalUtilityFunctions;
    this.filterOptions = filterOptions;
    this.filterFunctions = filterFunctions;
  }

  toggleSubSecClass(
    element: HTMLElement,
  ): void {

    const form = document.getElementById("employeeForm") as HTMLFormElement;
    if (element.classList.contains("unlocked")) {
      if (element.classList.contains("active")) {
        element.classList.remove("active");
        this.globalUtilityFunctions.resetFormProfileImage();
        this.globalUtilityFunctions.hideShowDepartmentListSidebar(false)
      } else {
        if (window.innerWidth <= 900) {
          var sideBar = document.querySelector(".sidebar") as HTMLElement;
          if (sideBar.classList.contains("active")) {
            this.headerFunctions.toggleSideBar();
          }
        }
        document.querySelectorAll(".sub-sec").forEach((subSec) => {
          subSec.classList.remove("active");
        });
        element.classList.add("active");
      }
    }
    this.filterFunctions.resetFilter();
    this.globalUtilityFunctions.resetSelectedFiltersState();
  }

  handleUpdateDismiss(): void {
    var updateContainer = document.querySelector(
      ".update-message"
    ) as HTMLElement;
    updateContainer.classList.remove("active");
  }

  sidebarFilter(selectedFilter: SelectedFilters): void {
    let selectedFilters = this.filterFunctions.getSelectedFilters();
    const departmentName = selectedFilter.department[0];
    selectedFilters.department = [departmentName];
    const allDepartmentDivs = document.querySelectorAll(".dropdown-options");
    allDepartmentDivs.forEach((departmentDiv) => {
      const departmentValue = departmentDiv
        .getAttribute("value")
        ?.trim()
        .toLowerCase();
      const isActiveDepartment = selectedFilter.department.includes(
        departmentValue || ""
      );
      if (isActiveDepartment) {
        departmentDiv.classList.add("active");
        departmentDiv.classList.add("selected");
      } else {
        departmentDiv.classList.remove("active");
        departmentDiv.classList.remove("selected");
      }
    });
    this.filterFunctions.handleFilterBar();
    const applyButton = document.querySelector(".btn-apply") as HTMLButtonElement;
    const resetButton = document.querySelector(".btn-reset") as HTMLButtonElement;
    applyButton.disabled = false;
    resetButton.disabled = false;
    if (selectedFilter.department.length === 0) {
      applyButton.disabled = true;
      resetButton.disabled = true;
    }
    if (selectedFilter.department.length > 0) {
        this.globalUtilityFunctions.renderEmployees(
      this.filterFunctions.getFilteredData(selectedFilters)
        );
        
    } else {
        this.globalUtilityFunctions.renderEmployees(this.globalUtilityFunctions.getDataFromLocalStorage("employees"));
    }
    this.populateDepartmentList();
  }

  populateDepartmentList(): void {
    console.log("Populate Department List");
    const employees = this.globalUtilityFunctions.getDataFromLocalStorage("employees");
    const departmentCounts: { [key: string]: number } = {};
    if (employees) {
      employees.forEach((employee) => {
        const department = employee.department || "Others";
        departmentCounts[department] = (departmentCounts[department] || 0) + 1;
      });
    }
    const departmentList = document.getElementById(
      "departmentList"
    ) as HTMLUListElement;
    departmentList.innerHTML = "";
    const staticDepartments = this.filterOptions.department;
    if (!staticDepartments.includes("Others")) {
      staticDepartments.push("Others");
    }
    staticDepartments.forEach((departmentName) => {
      const employeeCount = departmentCounts[departmentName] || 0;
      const departmentListItemHTML = this.generateDepartmentListItem(
        departmentName,
        employeeCount
      );
      departmentList.insertAdjacentHTML("beforeend", departmentListItemHTML);
      delete departmentCounts[departmentName];
    });
    for (const departmentName in departmentCounts) {
      const employeeCount = departmentCounts[departmentName];
      const departmentListItemHTML = this.generateDepartmentListItem(
        departmentName,
        employeeCount
      );
      departmentList.insertAdjacentHTML("beforeend", departmentListItemHTML);
    }
  }

  generateDepartmentListItem(
    departmentName: string,
    employeeCount: number
  ): string {
    console.log("Generate List Item", departmentName, employeeCount);
    return `
      <li onclick="window.ems.sideBarFunctions.sidebarFilter({ 'department': ['${departmentName
        .trim()
        .toLowerCase()}'] })">
        <a href="#">
          <div class="dept-details">
            <div class="dept-names">${departmentName}</div>
            <div class="employee-dept-count">${employeeCount}</div>
          </div>
        </a>
      </li>
    `;
  }
}
