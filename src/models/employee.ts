export class Employee {
    empNo: string;
    firstName: string;
    lastName: string;
    dob: Date;
    email: string;
    mobileNumber: string;
    joiningDate: string;
    status: boolean;
    location: string;
    jobTitle: string;
    department: string;
    assignManager: string;
    assignProject: string;
    profileImageBase64: string;
    constructor(empNo: string,
        firstName: string,
        lastName: string,
        dob: Date,
        email: string,
        mobileNumber: string,
        joiningDate: string,
        status: boolean,
        location: string,
        jobTitle: string,
        department: string,
        assignManager: string,
        assignProject: string,
        profileImageBase64: string) {
        this.empNo = empNo;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.email = email;
        this.mobileNumber = mobileNumber;
        this.joiningDate = joiningDate;
        this.status = status;
        this.location = location;
        this.jobTitle = jobTitle;
        this.department = department;
        this.assignManager = assignManager;
        this.assignProject = assignProject;
        this.profileImageBase64 = profileImageBase64;
    }

}