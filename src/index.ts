import { Employee } from "./models/employee";
import { SideBarFunctions } from "./sidebar";
import { HeaderFunctions } from "./header";
import { AddEmployeesFunctions } from "./addEmployees";
import { GlobalUtilityFunctions } from "./globalUtility";

export class EMS {

  filterOptions = {
    status: ["Active", "Inactive", "All"],
    location: [
      "Hyderabad",
      "Delhi",
      "Mumbai",
      "Bangalore",
      "Seattle",
      "New York",
    ],
    department: [
      "IT",
      "HR",
      "Finance",
      "Product Engineering",
      "UI/UX",
      "Management",
    ],
  };

  sideBarFunctions: SideBarFunctions;
  headerFunctions: HeaderFunctions;
  addEmployeeFunctions: AddEmployeesFunctions
  globalUtilityFunctions: GlobalUtilityFunctions;
  constructor() {
    this.main();
    this.globalUtilityFunctions = new GlobalUtilityFunctions();
    this.headerFunctions = new HeaderFunctions();
    this.addEmployeeFunctions = new AddEmployeesFunctions(this.globalUtilityFunctions);
    this.sideBarFunctions = new SideBarFunctions(this.headerFunctions, this.addEmployeeFunctions, this.globalUtilityFunctions, this.filterOptions);
  }

  main(): void {
    document.addEventListener("DOMContentLoaded", () => {
      this.includeHTML("./html/sidebar.html", "sidebarContainer");
      this.includeHTML("./html/header.html", "headerContainer");
      this.includeHTML("./html/employees.html", "employeesContainer");
      this.includeHTML("./html/addEmployee.html", "addEmployeesContainer");
      this.includeHTML("./html/role.html", "roleContainer");
      this.includeHTML("./html/addRoles.html", "newRoleContainer");
      this.includeHTML("./html/roleDesc.html", "roleDescContainer");
    });
  }

  includeHTML(url: string, containerId: string): void {
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        this.globalUtilityFunctions.updateGridTemplateColumns();
        const container = document.getElementById(containerId);
        if (container) {
          container.innerHTML += data;
        }
        this.handlePostProcessing(url);
      })
      .catch((error) => console.error(`Error fetching ${url}:`, error));
  }

  handleEmployeesPage(url: string): void {
    if (url == "./html/employees.html") {
      this.globalUtilityFunctions.loadEmployees();
      // this.generateAlphabetButtons();
    }
  }

  handleAddEmployeePage(url: string): void {
    if (url == "./html/addEmployee.html") {
      //   this.populateSelectOptions("location", locationOptions);
      //   this.populateSelectOptions("jobTitle", jobTitleOptions);
      //   this.populateSelectOptions("department", departmentOptions);
      //   this.populateSelectOptions("assignManager", managerOptions);
      //   this.populateSelectOptions("assignProject", projectOptions);
      const profileImageInput = document.getElementById("profileImageInput");
      const addProfilePhotoButton = document.getElementById(
        "addProfilePhotoButton"
      );
      //   if (profileImageInput && addProfilePhotoButton) {
      //     addProfilePhotoButton.addEventListener(
      //       "click",
      //       this.openProfileImageInput
      //     );
      //     profileImageInput.addEventListener(
      //       "change",
      //       this.previewProfileImage
      //     );
      //   }
    }
  }

  handleAddRolesPage(url: string): void {
    if (url == "./html/addRoles.html") {
      const selected = document.querySelector(".select-selected");
      const options = document.querySelector(".select-items");
      // if (selected) {
      //   selected.addEventListener(
      //     "click",
      //     this.toggleSelectOptions
      //   );
      // }
      const checkboxes = document.querySelectorAll(
        ".select-items input[type='checkbox']"
      );
      //   checkboxes.forEach(this.handleCheckbox);
    }
  }

  handlePostProcessing(url: string): void {
    this.globalUtilityFunctions.handleSidebarResponsive();
    this.sideBarFunctions.populateDepartmentList();

    this.handleEmployeesPage(url);
    this.handleAddEmployeePage(url);
    this.handleAddRolesPage(url);
  }


}


export const ems = new EMS();

declare global {
  interface Window {
    ems: EMS;
  }
}

window.ems = ems;
