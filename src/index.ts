import { Employee } from "./models/employee";
import { SelectedFilters, selectedFilters } from "./models/selectedFilter";
import { SideBarFunctions } from "./sidebarFunctions";
import { HeaderFunctions } from "./headerFunctions";
import { AddEmployeesFunctions } from "./addEmployeesFunctions";
import { GlobalUtilityFunctions } from "./globalUtilityFunctions";
import { EmployeesFunctions } from "./employeeFunctions";
import { FilterFunctions } from "./filterFunctions";

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

  locationOptions = [
    "Select location",
    "Hyderabad",
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Seattle",
    "New York",
  ];

  jobTitleOptions = [
    "Select job title",
    "UX Designer",
    "Front End Developer",
    "Back End Developer",
    "Full Stack Developer",
    "Android Developer",
    "iOS Developer",
    "Java Developer",
    "Python Developer",
    "PHP Developer",
  ];

  departmentOptions = [
    "Select department",
    "UI/UX",
    "HR",
    "IT",
    "Product Engineering",
    "Management",
    "Finance",
  ];

  managerOptions = [
    "Select manager",
    "None",
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
  ];

  projectOptions = [
    "Select project",
    "None",
    "Project 1",
    "Project 2",
    "Project 3",
  ];
  sideBarFunctions: SideBarFunctions;
  headerFunctions: HeaderFunctions;
  addEmployeesFunctions: AddEmployeesFunctions
  globalUtilityFunctions: GlobalUtilityFunctions;
  employeesFunctions: EmployeesFunctions;
  selectedFilters: SelectedFilters | undefined;
  filterFunctions: FilterFunctions;
  constructor() {
    this.main();
    this.selectedFilters = {
      alphabet: [],
      status: [],
      department: [],
      location: []
    };
    this.globalUtilityFunctions = new GlobalUtilityFunctions(this.selectedFilters);
    this.headerFunctions = new HeaderFunctions();
    this.filterFunctions = new FilterFunctions(this.globalUtilityFunctions, this.selectedFilters);
    this.sideBarFunctions = new SideBarFunctions(this.headerFunctions, this.globalUtilityFunctions, this.filterOptions, this.filterFunctions);
        this.addEmployeesFunctions = new AddEmployeesFunctions(this.globalUtilityFunctions, this.sideBarFunctions );
    this.employeesFunctions = new EmployeesFunctions(this.globalUtilityFunctions, this.addEmployeesFunctions, this.sideBarFunctions, this.filterFunctions);
    
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
      this.employeesFunctions.loadEmployees();
      this.filterFunctions.generateAlphabetButtons();
    }
  }

  handleAddEmployeePage(url: string): void {
    if (url == "./html/addEmployee.html") {
      this.addEmployeesFunctions.populateSelectOptions("location", this.locationOptions);
      this.addEmployeesFunctions.populateSelectOptions("jobTitle", this.jobTitleOptions);
      this.addEmployeesFunctions.populateSelectOptions("department", this.departmentOptions);
      this.addEmployeesFunctions.populateSelectOptions("assignManager", this.managerOptions);
      this.addEmployeesFunctions.populateSelectOptions("assignProject", this.projectOptions);
      const profileImageInput = document.getElementById("profileImageInput");
      const addProfilePhotoButton = document.getElementById(
        "addProfilePhotoButton"
      );
      if (profileImageInput && addProfilePhotoButton) {
        addProfilePhotoButton.addEventListener(
          "click",
          this.addEmployeesFunctions.openProfileImageInput
        );
        profileImageInput.addEventListener(
          "change",
          this.addEmployeesFunctions.previewProfileImage
        );
      }
    }
  }

  handleAddRolesPage(url: string): void {
    if (url == "./html/addRoles.html") {
      const selected = document.querySelector(".select-selected");
      const options = document.querySelector(".select-items");
      if (selected) {
        selected.addEventListener(
          "click",
          this.globalUtilityFunctions.toggleSelectOptions
        );
      }
      const checkboxes = document.querySelectorAll<HTMLInputElement>(
        ".select-items input[type='checkbox']"
      );
      checkboxes.forEach((checkbox: HTMLInputElement) => this.employeesFunctions.handleCheckbox(checkbox));
    }
  }

  handlePostProcessing(url: string): void {
    this.globalUtilityFunctions.handleSidebarResponsive();
    this.filterFunctions.populateFilterOptions();
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
