import { FilterFunctions } from "./filterFunctions";
import { GlobalUtilityFunctions } from "./globalUtilityFunctions";
import { Employee } from "./models/employee";
import { RenderingHTML } from "./renderingHTML";
import { SideBarFunctions } from "./sidebarFunctions";
export class AddEmployeesFunctions {

    globalUtilityFunctions: GlobalUtilityFunctions;
    sidebarFunctions: SideBarFunctions;
    renderingHTML: RenderingHTML;
    filterFunctions: FilterFunctions;
    constructor(globalUtilityFunctions: GlobalUtilityFunctions, sidebarFunctions: SideBarFunctions, renderingHTML: RenderingHTML, filterFunctions: FilterFunctions) {
        this.globalUtilityFunctions = globalUtilityFunctions;
        this.sidebarFunctions = sidebarFunctions
        this.renderingHTML = renderingHTML
        this.filterFunctions = filterFunctions
    }

    populateSelectOptions(selectId: string, options: string[]): void {
        const selectElement: HTMLSelectElement | null = document.getElementById(selectId) as HTMLSelectElement | null;
        if (selectElement) {
            selectElement.innerHTML = "";
            options.forEach((option) => {
                const optionElement: HTMLOptionElement = document.createElement("option");
                optionElement.value = option;
                optionElement.textContent = option;
                selectElement.appendChild(optionElement);
            });
        } else {
            console.error(`Select element with id '${selectId}' not found.`);
        }
    }


    openProfileImageInput(): void {
        const profileImageInput: HTMLElement | null = document.getElementById("profileImageInput");
        if (profileImageInput) {
            profileImageInput.click();
        }
    }

    handleFormSubmit(): void {
        const form: HTMLFormElement | null = document.getElementById("employeeForm") as HTMLFormElement | null;
        if (form) {
            const formData = new FormData(form);
            if (this.validateForm(formData)) {
                this.createEmployeeFromFormData(formData);
                form.reset();
                this.globalUtilityFunctions.resetFormProfileImage();
                alert("Employee data added successfully!");
                this.renderingHTML.includeHTML("./html/employees.html").then(() => {
                    this.sidebarFunctions.populateDepartmentList();
                    this.filterFunctions.generateAlphabetButtons();
                    this.globalUtilityFunctions.loadEmployees();
                    this.filterFunctions.populateFilterOptions(true, true, true);
                });
            }
        } else {
            console.error("Employee form not found.");
        }
        this.sidebarFunctions.populateDepartmentList();
    }

    createEmployeeFromFormData(formData: FormData): void {
        const empNo: string = formData.get("empNo") as string;
        const firstName: string = formData.get("firstName") as string;
        const lastName: string = formData.get("lastName") as string;
        const dob: Date = new Date(formData.get("dob") as string);
        const email: string = formData.get("email") as string;
        const mobileNumber: string = formData.get("mobileNumber") as string;
        const joiningDate: string = formData.get("joiningDate") as string;
        const location: string = formData.get("location") as string;
        const jobTitle: string = formData.get("jobTitle") as string;
        const department: string = formData.get("department") as string;
        const assignManager: string = formData.get("assignManager") as string;
        const assignProject: string = formData.get("assignProject") as string;
        let profileImageBase64: string = "../assets/default-user.png";

        const profileImageInput: File | null = formData.get("profileImage") as File | null;
        const status: boolean = true;
        let newEmployee: Employee;

        if (profileImageInput && profileImageInput.size > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(profileImageInput);
            reader.onload = () => {
                profileImageBase64 = reader.result as string;
                newEmployee = new Employee(
                    empNo,
                    firstName,
                    lastName,
                    dob,
                    email,
                    mobileNumber,
                    joiningDate,
                    status,
                    location,
                    jobTitle,
                    department,
                    assignManager,
                    assignProject,
                    profileImageBase64
                );
                this.saveEmployeeToLocalStorage(newEmployee);
            };
        } else {
            newEmployee = new Employee(
                empNo,
                firstName,
                lastName,
                dob,
                email,
                mobileNumber,
                joiningDate,
                status,
                location,
                jobTitle,
                department,
                assignManager,
                assignProject,
                profileImageBase64
            );
            this.saveEmployeeToLocalStorage(newEmployee);
        }
    }

    saveEmployeeToLocalStorage(employee: Employee): void {
        let existingData: Employee[] = this.globalUtilityFunctions.getDataFromLocalStorage("employees") || [];
        if (employee) {
            existingData.push(employee);
            localStorage.setItem("employees", JSON.stringify(existingData));
        }

        const defaultImageSource: string = "../assets/default-user.png";
        const profileImagePreview: HTMLImageElement | null = document.getElementById("profileImagePreview") as HTMLImageElement | null;
        if (profileImagePreview) {
            profileImagePreview.src = defaultImageSource;
        }
    }


    // validateInput(): void {
    //     if (this.value.trim() === "") {
    //         this.showInputErrorMessage(this);
    //     } else {
    //         this.hideInputErrorMessage(this);
    //     }
    // }

    validateForm(formData: FormData): boolean {
        const requiredFields: string[] = [
            "empNo",
            "firstName",
            "lastName",
            "email",
            "joiningDate",
        ];
        let formIsValid: boolean = true;
        requiredFields.forEach((field: string) => {
            const inputElement: HTMLInputElement | null = document.getElementById(field) as HTMLInputElement | null;
            if (inputElement && !inputElement.value.trim()) {
                this.showInputErrorMessage(inputElement); // Use arrow function to bind 'this'
                formIsValid = false;
            } else {
                if (inputElement) {
                    this.hideInputErrorMessage(inputElement); // Use arrow function to bind 'this'
                }
            }
        });
        return formIsValid;
    }

    previewProfileImage(event: Event): void {
        const inputElement = event.target as HTMLInputElement;
        const selectedFile = inputElement.files?.[0];

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                const profileImagePreview = document.getElementById("profileImagePreview") as HTMLImageElement | null;
                if (profileImagePreview) {
                    profileImagePreview.src = reader.result as string;
                }
            };
            reader.readAsDataURL(selectedFile);
        }
    }

    showInputErrorMessage(input: HTMLElement): void {
        const errorMessage = input.nextElementSibling as HTMLElement | null;
        if (errorMessage) {
            errorMessage.classList.add("active");
        }
    }

    hideInputErrorMessage(input: HTMLElement): void {
        const errorMessage = input.nextElementSibling as HTMLElement | null;
        if (errorMessage) {
            errorMessage.classList.remove("active");
        }
    }
}