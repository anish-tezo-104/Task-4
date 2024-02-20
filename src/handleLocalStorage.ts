import { Employee } from "./models/employee";
import { SelectedFilters } from "./models/selectedFilter";

export class HandleLocalStorage {
    constructor() {}

    getAllEmployeesFromLocalStorage(): Employee[]{
        return JSON.parse(localStorage.getItem("employees") || "[]") || [];
    }

    saveEmployeesToLocalStorage(employees: Employee[]):void {
        localStorage.setItem("employees", JSON.stringify(employees));
    }

    deleteEmployeesFromLocalStorage() :void{
        localStorage.removeItem("employees");
    }

    getAllFiltersFromLocalStorage():SelectedFilters {
        return JSON.parse(localStorage.getItem("selectedFilters") || "[]") || [];
    }

    saveFiltersToLocalStorage(filters: SelectedFilters):void { 
        localStorage.setItem("selectedFilters", JSON.stringify(filters));
    }

    deleteFiltersFromLocalStorage():void {
        localStorage.removeItem("selectedFilters");
    }
}