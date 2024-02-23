import { SelectedFilters } from "./models/selectedFilter";
import { SideBarFunctions } from "./sidebarFunctions";
import { HeaderFunctions } from "./headerFunctions";
import { AddEmployeesFunctions } from "./addEmployeesFunctions";
import { GlobalUtilityFunctions } from "./globalUtilityFunctions";
import { EmployeesFunctions } from "./employeeFunctions";
import { FilterFunctions } from "./filterFunctions";
import { RenderingHTML } from "./renderingHTML";

export class EMS {
  filterOptions = {
    status: ["Active", "Inactive", "All"],
    location: ["Hyderabad", "Delhi", "Mumbai", "Bangalore", "Seattle", "New York"],
    department: ["IT", "HR", "Finance", "Product Engineering", "UI/UX", "Management"],
  };
  sideBarFunctions!: SideBarFunctions;
  headerFunctions!: HeaderFunctions;
  addEmployeesFunctions!: AddEmployeesFunctions;
  globalUtilityFunctions!: GlobalUtilityFunctions;
  employeesFunctions!: EmployeesFunctions;
  selectedFilters: SelectedFilters | undefined;
  filterFunctions!: FilterFunctions;
  renderingHTML!: RenderingHTML;

  constructor() {
    this.main();
    this.selectedFilters = {
      alphabet: [],
      status: [],
      department: [],
      location: [],
    };
    this.globalUtilityFunctions = new GlobalUtilityFunctions(this.selectedFilters);
    this.renderingHTML = new RenderingHTML();
    this.headerFunctions = new HeaderFunctions();
    this.filterFunctions = new FilterFunctions(this.globalUtilityFunctions, this.selectedFilters);
    this.sideBarFunctions = new SideBarFunctions(this.headerFunctions, this.globalUtilityFunctions, this.filterOptions, this.filterFunctions);
    this.addEmployeesFunctions = new AddEmployeesFunctions(this.globalUtilityFunctions, this.sideBarFunctions, this.renderingHTML, this.filterFunctions);
    this.employeesFunctions = new EmployeesFunctions(this.globalUtilityFunctions, this.addEmployeesFunctions, this.sideBarFunctions, this.filterFunctions);
  }

  async main(): Promise<void> {
    document.addEventListener("DOMContentLoaded", async () => {
      await this.renderingHTML.includeHTML("./html/sidebar.html", "sidebarContainer");
      await this.renderingHTML.includeHTML("./html/header.html", "headerContainer");
      this.globalUtilityFunctions.handleSidebarResponsive();
      this.sideBarFunctions.populateDepartmentList();
      this.attachClickEventListeners();
    });
  }

  attachClickEventListeners(): void {
    const subSecElements = document.querySelectorAll(".sub-sec");
    subSecElements.forEach((subSec) => {
      subSec.addEventListener("click", () => this.handlePageRendering(subSec as HTMLElement));
    });
  }

  handlePageRendering(subSec: HTMLElement): void {
    const components = document.querySelectorAll(".sub-sec");
    components.forEach((component) => {
      if (component.classList.contains("active")) {
        if (component === subSec) {
          if (subSec.classList.contains("employees") && !this.globalUtilityFunctions.addEmployeesForm) {
            this.globalUtilityFunctions.addEmployeesForm = false;
            this.renderingHTML.includeHTML("./html/employees.html");
            this.globalUtilityFunctions.hideShowDepartmentListSidebar(true);
            this.handleEmployeesPage();
          } else if (subSec.classList.contains("dashboard")) {
            this.globalUtilityFunctions.addEmployeesForm = false;
            this.renderingHTML.includeHTML("./html/dashboard.html");
            this.globalUtilityFunctions.hideShowDepartmentListSidebar(false);
          } else if (subSec.classList.contains("roles")) {
            this.globalUtilityFunctions.addEmployeesForm = false;
            this.renderingHTML.includeHTML("./html/role.html");
            this.globalUtilityFunctions.hideShowDepartmentListSidebar(false);
            this.handleRolesPage();
          } else if (subSec.classList.contains("access-rights")) {
            this.globalUtilityFunctions.addEmployeesForm = false;
            this.renderingHTML.includeHTML("./html/accessRights.html");
            this.globalUtilityFunctions.hideShowDepartmentListSidebar(false);
          }
        }
      } else {
        const container = document.getElementById("displayWindow");
        if (container) {
          container.innerHTML = "";
        }
      }
    });
  }

  async handleRolesPage(): Promise<void> {
    await this.renderingHTML.includeHTML("./html/role.html");
    this.filterFunctions.populateFilterOptions(true, false, true);
    const addRoleButton = document.querySelector(".function-add-role-button");
    if (addRoleButton) {
      addRoleButton.addEventListener("click", () => {
        this.renderingHTML.includeHTML("./html/addRoles.html").then(() => {
          this.handleAddRolesPage();
        });
      });
    }
  }
  handleAddRolesPage(): void {
    const selected = document.querySelector(".select-selected");
    const options = document.querySelector(".select-items");
    if (selected) {
      selected.addEventListener("click", this.globalUtilityFunctions.toggleSelectOptions);
    }
    const checkboxes = document.querySelectorAll<HTMLInputElement>(".select-items input[type='checkbox']");
    checkboxes.forEach((checkbox: HTMLInputElement) => this.employeesFunctions.handleCheckbox(checkbox));
  }

  async handleEmployeesPage(): Promise<void> {
    await this.renderingHTML.includeHTML("./html/employees.html");
    this.sideBarFunctions.populateDepartmentList();
    const addEmployeeButton = document.querySelector(".function-add-button");
    if (addEmployeeButton) {
      addEmployeeButton.addEventListener("click", () => {
        this.renderingHTML.includeHTML("./html/addEmployee.html").then(() => {
          this.handleAddEmployeePage();
        });
      });
    }

    this.filterFunctions.generateAlphabetButtons();
    this.globalUtilityFunctions.loadEmployees();
    this.filterFunctions.populateFilterOptions(true , true, true);
  }



  handleAddEmployeePage(): void {
    this.addEmployeesFunctions.populateSelectOptions("location", this.globalUtilityFunctions.locationOptions);
    this.addEmployeesFunctions.populateSelectOptions("jobTitle", this.globalUtilityFunctions.jobTitleOptions);
    this.addEmployeesFunctions.populateSelectOptions("department", this.globalUtilityFunctions.departmentOptions);
    this.addEmployeesFunctions.populateSelectOptions("assignManager", this.globalUtilityFunctions.managerOptions);
    this.addEmployeesFunctions.populateSelectOptions("assignProject", this.globalUtilityFunctions.projectOptions);
    const profileImageInput = document.getElementById("profileImageInput");
    const addProfilePhotoButton = document.getElementById("addProfilePhotoButton");
    if (profileImageInput && addProfilePhotoButton) {
      addProfilePhotoButton.addEventListener("click", this.addEmployeesFunctions.openProfileImageInput);
      profileImageInput.addEventListener("change", this.addEmployeesFunctions.previewProfileImage);
    }

    const addEmployeeCancelButton = document.getElementById("addEmployeesCancelButton");
    let form: HTMLFormElement | null = document.getElementById("employeeForm") as HTMLFormElement | null;
    if (addEmployeeCancelButton) {
      addEmployeeCancelButton.addEventListener("click", () => {
        if (form) {
          form.reset();
        }
        this.renderingHTML.includeHTML("./html/employees.html").then(() => {
          this.handleEmployeesPage();
        });
      });
    }
  }
}

export const ems = new EMS();

declare global {
  interface Window {
    ems: EMS;
  }
}

window.ems = ems;
