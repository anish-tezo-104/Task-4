(() => {
  "use strict";
  class e {
    constructor(e, t, s, o) {
      (this.headerFunctions = e),
        (this.globalUtilityFunctions = t),
        (this.filterOptions = s),
        (this.filterFunctions = o);
    }
    toggleSubSecClass(e, t, s, o) {
      const n = document.getElementById("employeeForm");
      e.classList.contains("unlocked") &&
        (e.classList.contains("active")
          ? (e.classList.remove("active"),
            n.reset(),
            this.globalUtilityFunctions.resetFormProfileImage(),
            t.forEach((e) => {
              document.querySelector(e).classList.remove("active");
            }))
          : (window.innerWidth <= 900 &&
              document.querySelector(".sidebar").classList.contains("active") &&
              this.headerFunctions.toggleSideBar(),
            document.querySelectorAll(".sub-sec").forEach((e) => {
              e.classList.remove("active");
            }),
            e.classList.add("active"),
            t.forEach((e) => {
              document.querySelector(e).classList.add("active");
            })),
        s.forEach((e) => {
          var t;
          null === (t = document.querySelector(e)) ||
            void 0 === t ||
            t.classList.remove("active");
        })),
        this.filterFunctions.resetFilter(),
        this.globalUtilityFunctions.resetSelectedFiltersState();
    }
    handleUpdateDismiss() {
      document.querySelector(".update-message").classList.remove("active");
    }
    sidebarFilter(e) {
      let t = this.filterFunctions.getSelectedFilters();
      const s = e.department[0];
      (t.department = [s]),
        document.querySelectorAll(".dropdown-options").forEach((t) => {
          var s;
          const o =
            null === (s = t.getAttribute("value")) || void 0 === s
              ? void 0
              : s.trim().toLowerCase();
          e.department.includes(o || "")
            ? (t.classList.add("active"), t.classList.add("selected"))
            : (t.classList.remove("active"), t.classList.remove("selected"));
        }),
        this.filterFunctions.handleFilterBar();
      const o = document.querySelector(".btn-apply"),
        n = document.querySelector(".btn-reset");
      (o.disabled = !1),
        (n.disabled = !1),
        0 === e.department.length && ((o.disabled = !0), (n.disabled = !0)),
        e.department.length > 0
          ? this.globalUtilityFunctions.renderEmployees(
              this.filterFunctions.getFilteredData(t)
            )
          : this.globalUtilityFunctions.renderEmployees(
              this.globalUtilityFunctions.getDataFromLocalStorage("employees")
            ),
        this.populateDepartmentList();
    }
    populateDepartmentList() {
      const e =
          this.globalUtilityFunctions.getDataFromLocalStorage("employees"),
        t = {};
      e &&
        e.forEach((e) => {
          const s = e.department || "Others";
          t[s] = (t[s] || 0) + 1;
        });
      const s = document.getElementById("departmentList");
      s.innerHTML = "";
      const o = this.filterOptions.department;
      o.includes("Others") || o.push("Others"),
        o.forEach((e) => {
          const o = t[e] || 0,
            n = this.generateDepartmentListItem(e, o);
          s.insertAdjacentHTML("beforeend", n), delete t[e];
        });
      for (const e in t) {
        const o = t[e],
          n = this.generateDepartmentListItem(e, o);
        s.insertAdjacentHTML("beforeend", n);
      }
    }
    generateDepartmentListItem(e, t) {
      return `\n      <li onclick="ems.sideBarFunctions.sidebarFilter({ 'department': ['${e
        .trim()
        .toLowerCase()}'] })">\n        <a href="#">\n          <div class="dept-details">\n            <div class="dept-names">${e}</div>\n            <div class="employee-dept-count">${t}</div>\n          </div>\n        </a>\n      </li>\n    `;
    }
  }
  class t {
    constructor() {}
    toggleSideBar() {
      const e = document.querySelector(".sidebar"),
        t = document.querySelector(".grid-container"),
        s = document.querySelector(".sidebar-handle-icon img");
      if (e && t && s)
        if (e.classList.contains("active")) {
          e.classList.remove("active"),
            (t.style.gridTemplateColumns = "6% 94%"),
            document.querySelectorAll(".sub-sec-left-left img").forEach((e) => {
              e.style.paddingLeft = "0.5rem";
            });
          const o = document.querySelector(".sidebar-roles-icon"),
            n = document.querySelector(".sidebar-assign-user-icon");
          o && (o.style.paddingLeft = "0.3rem"),
            n && (n.style.paddingLeft = "0.3rem"),
            s && (s.style.transform = "rotate(-180deg)");
        } else {
          e.classList.add("active"),
            (t.style.gridTemplateColumns = "20% 80%"),
            document.querySelectorAll(".sub-sec-left-left img").forEach((e) => {
              e.style.paddingLeft = "1rem";
            });
          const o = document.querySelector(".sidebar-roles-icon"),
            n = document.querySelector(".sidebar-assign-user-icon");
          o && (o.style.paddingLeft = "1rem"),
            n && (n.style.paddingLeft = "1rem"),
            s && (s.style.transform = "rotate(360deg)");
        }
    }
    handleBurger(e) {
      const t = document.querySelector(".dropdown-content-header");
      t &&
        (t.classList.contains("active")
          ? t.classList.remove("active")
          : t.classList.add("active"));
    }
  }
  class s {
    constructor(e, t, s, o, n, i, l, a, c, r, d, u, m, p) {
      (this.empNo = e),
        (this.firstName = t),
        (this.lastName = s),
        (this.dob = o),
        (this.email = n),
        (this.mobileNumber = i),
        (this.joiningDate = l),
        (this.status = a),
        (this.location = c),
        (this.jobTitle = r),
        (this.department = d),
        (this.assignManager = u),
        (this.assignProject = m),
        (this.profileImageBase64 = p);
    }
  }
  class o {
    constructor(e, t) {
      (this.globalUtilityFunctions = e), (this.sidebarFunctions = t);
    }
    populateSelectOptions(e, t) {
      const s = document.getElementById(e);
      s
        ? ((s.innerHTML = ""),
          t.forEach((e) => {
            const t = document.createElement("option");
            (t.value = e), (t.textContent = e), s.appendChild(t);
          }))
        : console.error(`Select element with id '${e}' not found.`);
    }
    handleAddEmployeesFormCancel(e, t) {
      let s = document.getElementById("employeeForm");
      const o = document.getElementById("profileImagePreview");
      o && (o.src = "../assets/default-user.png"),
        s || console.error("Employee form not found.");
    }
    openProfileImageInput() {
      const e = document.getElementById("profileImageInput");
      e && e.click();
    }
    handleFormSubmit() {
      const e = document.getElementById("employeeForm");
      if (e) {
        const t = new FormData(e);
        this.validateForm(t) &&
          (this.createEmployeeFromFormData(t),
          e.reset(),
          this.globalUtilityFunctions.resetFormProfileImage(),
          alert("Employee data added successfully!"));
      } else console.error("Employee form not found.");
      this.sidebarFunctions.populateDepartmentList();
    }
    createEmployeeFromFormData(e) {
      const t = e.get("empNo"),
        o = e.get("firstName"),
        n = e.get("lastName"),
        i = new Date(e.get("dob")),
        l = e.get("email"),
        a = e.get("mobileNumber"),
        c = e.get("joiningDate"),
        r = e.get("location"),
        d = e.get("jobTitle"),
        u = e.get("department"),
        m = e.get("assignManager"),
        p = e.get("assignProject");
      let h = "../assets/default-user.png";
      const g = e.get("profileImage");
      let y;
      if (g && g.size > 0) {
        const e = new FileReader();
        e.readAsDataURL(g),
          (e.onload = () => {
            (h = e.result),
              (y = new s(t, o, n, i, l, a, c, !0, r, d, u, m, p, h)),
              this.saveEmployeeToLocalStorage(y);
          });
      } else
        (y = new s(t, o, n, i, l, a, c, !0, r, d, u, m, p, h)),
          this.saveEmployeeToLocalStorage(y);
    }
    saveEmployeeToLocalStorage(e) {
      let t =
        this.globalUtilityFunctions.getDataFromLocalStorage("employees") || [];
      e && (t.push(e), localStorage.setItem("employees", JSON.stringify(t)));
      const s = document.getElementById("profileImagePreview");
      s && (s.src = "../assets/default-user.png");
    }
    validateForm(e) {
      let t = !0;
      return (
        ["empNo", "firstName", "lastName", "email", "joiningDate"].forEach(
          (e) => {
            const s = document.getElementById(e);
            s && !s.value.trim()
              ? (this.showInputErrorMessage(s), (t = !1))
              : s && this.hideInputErrorMessage(s);
          }
        ),
        t
      );
    }
    previewProfileImage(e) {
      var t;
      const s = null === (t = e.target.files) || void 0 === t ? void 0 : t[0];
      if (s) {
        const e = new FileReader();
        (e.onload = () => {
          const t = document.getElementById("profileImagePreview");
          t && (t.src = e.result);
        }),
          e.readAsDataURL(s);
      }
    }
    showInputErrorMessage(e) {
      const t = e.nextElementSibling;
      t && t.classList.add("active");
    }
    hideInputErrorMessage(e) {
      const t = e.nextElementSibling;
      t && t.classList.remove("active");
    }
  }
  class n {
    constructor(e) {
      this.selectedFilters = e;
    }
    handleSidebarResponsive() {
      const e = document.querySelector(".sidebar");
      e &&
        (window.innerWidth <= 900
          ? e.classList.remove("active")
          : e.classList.add("active"));
    }
    renderEmployees(e) {
      const t = document.querySelector(".employees-table tbody");
      t &&
        ((t.innerHTML = ""),
        e.forEach((e) => {
          const s = document.createElement("tr");
          (s.innerHTML = `\n            <td class="check-box-col"><input type="checkbox"/></td>\n            <td class="col col-user">\n                <div class="profile-card emp-card">\n                    <img src="${
            e.profileImageBase64
          }" alt="Employee Image" class="employee-img" />\n                    <div class="profile-details">\n                        <p class="profile-name">${
            e.firstName
          } ${
            e.lastName
          }</p>\n                        <p class="profile-email">${
            e.email
          }</p>\n                    </div>\n                </div>\n            </td>\n            <td class="col col-location">${
            e.location
          }</td>\n            <td class="col col-department">${
            e.department
          }</td>\n            <td class="col col-role">${
            e.jobTitle
          }</td>\n            <td class="col col-emp-no">${
            e.empNo
          }</td>\n            <td class="col col-status">\n                <div class="btn-active">${
            e.status ? "Active" : "Inactive"
          }</div>\n            </td>\n            <td class="col col-join-dt">${
            e.joiningDate
          }</td>\n            <td>\n                <span class="material-icons-outlined ellipsis-icon" onclick="EMS.employeesPageFunctions.ellipsisFunction(this)">more_horiz</span>\n                <div class="ellipsis-menu">\n                    <ul>\n                        <li><a href="#" onclick="EMS.employeesPageFunctions.viewDetails()">View Details</a></li>\n                        <li><a href="#" onclick="EMS.employeesPageFunctions.editRow()">Edit</a></li>\n                        <li onclick="EMS.employeesPageFunctions.deleteRow(this)"><a href="#">Delete</a></li>\n                    </ul>\n                </div>\n            </td>\n        `),
            t.appendChild(s);
        }));
    }
    getDataFromLocalStorage(e) {
      const t = localStorage.getItem(e);
      return t ? JSON.parse(t) : [];
    }
    handlePostFormSubmissions(e, t, s) {
      document.querySelectorAll(".error-message").forEach((e) => {
        e.classList.remove("active");
      }),
        t.forEach((e) => {
          const t = document.querySelector(e);
          t && t.classList.add("active");
        }),
        s.forEach((e) => {
          const t = document.querySelector(e);
          t && t.classList.remove("active");
        }),
        e.reset();
    }
    extractTableData() {
      let e = document.querySelector(".employees-table"),
        t = ["", "STATUS", "more_horiz"],
        s = Array.from(e.querySelectorAll("th")).map((e) => {
          var t;
          let s = e.querySelector("span:first-child");
          return s
            ? null === (t = s.textContent) || void 0 === t
              ? void 0
              : t.trim()
            : "";
        }),
        o = s.filter((e) => !t.includes(null != e ? e : "")),
        n = Array.from(e.querySelectorAll("tbody tr")),
        i = [];
      return (
        n.forEach((e) => {
          let o = Array.from(e.querySelectorAll("td")).map((e, o) => {
            var n, i, l;
            if (!t.includes(null !== (n = s[o]) && void 0 !== n ? n : "")) {
              let t =
                null === (i = e.textContent) || void 0 === i
                  ? void 0
                  : i.trim();
              return (
                '"' +
                (null !== (l = null == t ? void 0 : t.replace(/"/g, '""')) &&
                void 0 !== l
                  ? l
                  : "") +
                '"'
              );
            }
            return "";
          });
          (o = o.filter((e) => "" !== e)), o.length > 0 && i.push(o);
        }),
        { headers: o, data: i }
      );
    }
    toggleSelectOptions() {
      const e = document.querySelector(".select-items");
      e && e.classList.toggle("select-hide");
    }
    exportCSV(e, t, s) {
      const o = this.convertToCSV(s, t);
      this.downloadCSVFile(o, e);
    }
    updateGridTemplateColumns() {
      var e = window.innerWidth,
        t = document.querySelector(".sidebar"),
        s = document.querySelector(".grid-container");
      e > 900 && t && t.classList.contains("active")
        ? s && (s.style.gridTemplateColumns = "20% 80%")
        : s && (s.style.gridTemplateColumns = "100%");
    }
    convertToCSV(e, t = []) {
      let s = "";
      if (0 === e.length) return s;
      const o = Object.keys(e[0]).filter((e) => !t.includes(e));
      return (
        (s += '"' + o.join('","') + '"\n'),
        e.forEach((e) => {
          let t = o
            .map((t) => {
              let s = e[t];
              return (
                "string" == typeof s &&
                  s.includes('"') &&
                  (s = s.replace(/"/g, '""')),
                "string" == typeof s && s.includes(",") && (s = '"' + s + '"'),
                s
              );
            })
            .join(",");
          s += t + "\n";
        }),
        s
      );
    }
    downloadCSVFile(e, t) {
      let s = new Blob([e], { type: "text/csv;charset=utf-8;" }),
        o = URL.createObjectURL(s),
        n = document.createElement("a");
      n.setAttribute("href", o),
        n.setAttribute("download", t),
        n.click(),
        URL.revokeObjectURL(o);
    }
    resetSelectedFiltersState() {
      (this.selectedFilters.alphabet = []),
        (this.selectedFilters.status = []),
        (this.selectedFilters.location = []),
        (this.selectedFilters.department = []);
    }
    resetFormProfileImage() {
      const e = document.getElementById("profileImagePreview");
      e && (e.src = "../assets/default-user.png");
    }
  }
  class i {
    constructor(e, t, s, o) {
      (this.globalUtilityFunctions = e),
        (this.addEmployeeFunction = t),
        (this.sideBarFunctions = s),
        (this.filterFunctions = o);
    }
    exportEmployeesToCSV(e, t) {
      const s = this.filterFunctions.getSelectedFilters(),
        o = this.filterFunctions.getFilteredData(s);
      this.globalUtilityFunctions.exportCSV(e, t, o);
    }
    handleAddEmployeeBtn(e, t) {
      const s = document.querySelector(".add-employee-container");
      s && s.classList.contains("active")
        ? e.classList.remove("active")
        : (t.forEach((e) => {
            const t = document.querySelector(e);
            t && t.classList.remove("active");
          }),
          s && s.classList.add("active"));
    }
    toggleFilterClass(e, t) {
      const s = document.querySelector(".btn-status");
      e.classList.contains("active")
        ? (e.classList.remove("active"),
          t.forEach((e) => {
            const t = document.querySelector(e);
            t && t.classList.remove("active");
          }),
          s && s.classList.remove("active"))
        : (e.classList.add("active"),
          t.forEach((e) => {
            const t = document.querySelector(e);
            t && t.classList.add("active");
          }),
          s && s.classList.add("active"));
    }
    loadEmployees() {
      let e = this.globalUtilityFunctions.getDataFromLocalStorage("employees");
      e &&
        (this.globalUtilityFunctions.renderEmployees(e),
        this.sideBarFunctions.populateDepartmentList());
    }
    deleteSelectedRows() {
      const e = document.querySelectorAll(".check-box-col input"),
        t = [];
      e.forEach((e) => {
        if (e.checked) {
          const s = e.closest("tr");
          s instanceof HTMLTableRowElement && t.push(s);
        }
      });
      let s = this.globalUtilityFunctions.getDataFromLocalStorage("employees");
      for (let e = 1; e < t.length; e++) {
        const o = t[e],
          n = o.querySelector(".col-emp-no");
        if (n) {
          const e = n.textContent || "",
            t = s.findIndex((t) => t.empNo === e);
          -1 !== t && s.splice(t, 1);
        }
        o.remove();
      }
      const o = Math.max(t.length - 1, 0);
      localStorage.setItem("employees", JSON.stringify(s)),
        alert("Successfully deleted " + o + " employees data"),
        this.loadEmployees(),
        this.sideBarFunctions.populateDepartmentList();
    }
    toggleDeleteButtonVisibility() {
      const e = document.querySelector(".btn-delete"),
        t = document.querySelectorAll(".check-box-col input");
      let s = !1;
      t.forEach((e) => {
        e.checked && (s = !0);
      }),
        e && (e.disabled = !s);
    }
    sortTable(e) {
      var t, s, o;
      let n,
        i,
        l,
        a,
        c = document.getElementById("employeesTable"),
        r = !0,
        d = "ascending",
        u = 0;
      for (; r; ) {
        (r = !1), (n = c.rows);
        let m = !1;
        for (i = 1; i < n.length - 1; i++)
          if (
            ((l =
              (null === (t = n[i].getElementsByTagName("TD")[e].textContent) ||
              void 0 === t
                ? void 0
                : t.toLowerCase()) || ""),
            (a =
              (null ===
                (s = n[i + 1].getElementsByTagName("TD")[e].textContent) ||
              void 0 === s
                ? void 0
                : s.toLowerCase()) || ""),
            ("ascending" === d && l > a) || ("descending" === d && l < a))
          ) {
            m = !0;
            break;
          }
        m
          ? (null === (o = n[i].parentNode) ||
              void 0 === o ||
              o.insertBefore(n[i + 1], n[i]),
            (r = !0),
            u++)
          : 0 === u && "ascending" === d && ((d = "descending"), (r = !0));
      }
    }
    deleteRow(e) {
      const t = e.closest("tr");
      if (!t) return;
      const s = t.parentNode;
      if (!s) return;
      const o = Array.from(s.children).indexOf(t);
      if (-1 === o) return;
      const n =
        this.globalUtilityFunctions.getDataFromLocalStorage("employees");
      n.splice(o, 1),
        localStorage.setItem("employees", JSON.stringify(n)),
        t.remove(),
        this.loadEmployees(),
        this.sideBarFunctions.populateDepartmentList(),
        alert("Employee data deleted successfully!");
    }
    ellipsisFunction(e) {
      const t = e.nextElementSibling;
      t && (t.style.display = "block" === t.style.display ? "none" : "block");
    }
    updateSelectedOptions() {
      const e = document.querySelectorAll(
          ".select-items input[type='checkbox']"
        ),
        t = [];
      e.forEach(function (e) {
        e.checked && t.push(e.value);
      });
      const s = document.querySelector(".select-selected");
      s && (s.textContent = t.length ? t.join(", ") : "Select an option");
    }
    handleCheckbox(e) {
      e.addEventListener("click", this.updateSelectedOptions);
    }
  }
  class l {
    constructor(e, t) {
      (this.globalUtilityFunctions = e), (this.selectedFilters = t);
    }
    generateFilterOptions(e, t) {
      return e
        .map(
          (e) =>
            `\n        <div class="dropdown-options ${t}" onclick="window.ems.filterFunctions.selectOption(this)" value="${e}">\n            ${e}\n        </div>\n    `
        )
        .join("");
    }
    populateFilterOptions() {
      const e = document.getElementById("filterContainerLeft");
      e &&
        (e.innerHTML = `\n        <div class="dropdown dropdown-status" onclick="window.ems.filterFunctions.handleFilterDropdown(this)">\n            <button class="filter-btn btn-status dropbtn" data-default-text="Status">\n                <div>Status</div>\n                <div class="expand-more-icon">\n                    <span class="material-icons-outlined expand-more-icon">\n                        expand_more\n                    </span>\n                </div>\n            </button>\n            <div class="dropdown-content">\n                ${window.ems.filterFunctions.generateFilterOptions(
          window.ems.filterOptions.status,
          "status"
        )}\n            </div>\n        </div>\n        <div class="dropdown dropdown-location" onclick="window.ems.filterFunctions.handleFilterDropdown(this)">\n            <button class="filter-btn btn-location dropbtn" data-default-text="Location">\n                <div>Location</div>\n                <div class="expand-more-icon">\n                    <span class="material-icons-outlined expand-more-icon">\n                        expand_more\n                    </span>\n                </div>\n            </button>\n            <div class="dropdown-content">\n                ${window.ems.filterFunctions.generateFilterOptions(
          window.ems.filterOptions.location,
          "location"
        )}\n            </div>\n        </div>\n        <div class="dropdown dropdown-department" onclick="window.ems.filterFunctions.handleFilterDropdown(this)">\n            <button class="filter-btn btn-department dropbtn" data-default-text="Department">\n                <div>Department</div>\n                <div class="expand-more-icon">\n                    <span class="material-icons-outlined expand-more-icon">\n                        expand_more\n                    </span>\n                </div>\n            </button>\n            <div class="dropdown-content">\n                ${window.ems.filterFunctions.generateFilterOptions(
          window.ems.filterOptions.department,
          "department"
        )}\n            </div>\n        </div>\n    `);
    }
    handleFilterDropdown(e) {
      e.classList.contains("active")
        ? e.classList.remove("active")
        : e.classList.add("active");
    }
    selectOption(e) {
      var t;
      e.classList.toggle("selected"), e.classList.toggle("active");
      const s =
        (null === (t = e.getAttribute("value")) || void 0 === t
          ? void 0
          : t.trim().toLowerCase()) || "";
      document.querySelectorAll(".dropdown-options").forEach((t) => {
        var o;
        (null === (o = t.getAttribute("value")) || void 0 === o
          ? void 0
          : o.trim().toLowerCase()) === s &&
          (t.classList.toggle("selected", e.classList.contains("selected")),
          t.classList.toggle("active", e.classList.contains("active")));
      }),
        this.handleFilterBar();
    }
    handleFilterBar() {
      const e = document.querySelectorAll(".filter-btn");
      let t = 0;
      e.forEach((e) => {
        const s = e.nextElementSibling.querySelectorAll(
          ".dropdown-options.selected.active"
        ).length;
        (e.querySelector("div").textContent =
          s > 0 ? `${s} Selected` : e.getAttribute("data-default-text") || ""),
          (t += s);
      });
      const s = document.querySelector(".btn-reset"),
        o = document.querySelector(".btn-apply");
      s &&
        o &&
        (t > 0
          ? ((s.disabled = !1), (o.disabled = !1))
          : (this.updateFilteredResults(),
            (s.disabled = !0),
            (o.disabled = !0)));
    }
    resetFilter() {
      const e = document.querySelectorAll(".filter-btn"),
        t = document.querySelectorAll(".dropdown-options"),
        s = document.querySelector(".dropdown");
      document.querySelectorAll(".alph-btn").forEach((e) => {
        e.classList.remove("active");
      }),
        e.forEach((e) => {
          var t;
          const s = e.querySelector("div");
          s && (s.textContent = e.getAttribute("data-default-text") || "");
          const o =
            null === (t = e.closest(".dropdown")) || void 0 === t
              ? void 0
              : t.querySelector(".dropdown-content");
          o && o.classList.remove("active");
        }),
        s && s.classList.remove("active"),
        t.forEach((e) => {
          e.classList.remove("active", "selected");
        });
      const o = document.querySelector(".btn-reset"),
        n = document.querySelector(".btn-apply");
      o && (o.disabled = !0),
        n && (n.disabled = !0),
        this.globalUtilityFunctions.resetSelectedFiltersState(),
        this.updateFilteredResults();
    }
    updateFilteredResults() {
      const e = this.getSelectedFilters();
      this.globalUtilityFunctions.renderEmployees(this.getFilteredData(e));
    }
    generateAlphabetButtons() {
      const e = document.getElementById("alphabetsContainer");
      if (e)
        for (let t = 65; t <= 90; t++) {
          const s = String.fromCharCode(t),
            o = document.createElement("div");
          o.classList.add("alph-btn", `btn-${s.toLowerCase()}`),
            (o.textContent = s),
            o.addEventListener("click", () => {
              this.filterEmployeesByAlphabet(o);
            }),
            e.appendChild(o);
        }
    }
    filterEmployeesByAlphabet(e) {
      const t = document.querySelectorAll(".alph-btn"),
        s = document.querySelector(".icon-filter");
      s && s.classList.add("active"),
        e.classList.toggle("active"),
        (this.selectedFilters.alphabet = []),
        t.forEach((e) => {
          var t;
          e.classList.contains("active") &&
            this.selectedFilters.alphabet.push(
              (null === (t = e.textContent) || void 0 === t
                ? void 0
                : t.trim().toLowerCase()) || ""
            );
        });
      const o = 0 === this.selectedFilters.alphabet.length,
        n = document.querySelector(".btn-apply"),
        i = document.querySelector(".btn-reset");
      n &&
        i &&
        (o
          ? (s && s.classList.remove("active"),
            (n.disabled = !0),
            (i.disabled = !0))
          : ((n.disabled = !1), (i.disabled = !1)));
    }
    getSelectedFilterOptions(e) {
      const t = [];
      return (
        document
          .querySelectorAll(`${e} .dropdown-options.selected`)
          .forEach((e) => {
            const s = (e.getAttribute("value") || "").trim().toLowerCase();
            "all" === s
              ? t.push("active", "inactive")
              : t.includes(s) || t.push(s);
          }),
        t
      );
    }
    getSelectedAlphabets() {
      const e = [];
      return (
        document.querySelectorAll(".alph-btn").forEach((t) => {
          var s;
          if (t.classList.contains("active")) {
            const o =
              (null === (s = t.textContent) || void 0 === s
                ? void 0
                : s.trim().toLowerCase()) || "";
            e.includes(o) || e.push(o);
          }
        }),
        e
      );
    }
    getSelectedFilters() {
      return {
        alphabet: this.getSelectedAlphabets(),
        status: this.getSelectedFilterOptions(".dropdown-status"),
        location: this.getSelectedFilterOptions(".dropdown-location"),
        department: this.getSelectedFilterOptions(".dropdown-department"),
      };
    }
    getFilteredData(
      e = { alphabet: [], status: [], department: [], location: [] }
    ) {
      return this.globalUtilityFunctions
        .getDataFromLocalStorage("employees")
        .filter((t) => {
          const s = t.firstName ? t.firstName.toLowerCase() : "n/a",
            o = t.location ? t.location.toLowerCase() : "n/a",
            n = t.department ? t.department.toLowerCase() : "n/a",
            i = t.status ? "active" : "inactive";
          return (
            (0 === e.alphabet.length ||
              e.alphabet.some((e) => s.startsWith(e.toLowerCase()))) &&
            (0 === e.status.length || e.status.includes(i)) &&
            (0 === e.department.length || e.department.includes(n)) &&
            (0 === e.location.length || e.location.includes(o))
          );
        });
    }
  }
  const a = new (class {
    constructor() {
      (this.filterOptions = {
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
      }),
        (this.locationOptions = [
          "Select location",
          "Hyderabad",
          "Delhi",
          "Mumbai",
          "Bangalore",
          "Seattle",
          "New York",
        ]),
        (this.jobTitleOptions = [
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
        ]),
        (this.departmentOptions = [
          "Select department",
          "UI/UX",
          "HR",
          "IT",
          "Product Engineering",
          "Management",
          "Finance",
        ]),
        (this.managerOptions = [
          "Select manager",
          "None",
          "John Doe",
          "Jane Smith",
          "Michael Johnson",
        ]),
        (this.projectOptions = [
          "Select project",
          "None",
          "Project 1",
          "Project 2",
          "Project 3",
        ]),
        this.main(),
        (this.selectedFilters = {
          alphabet: [],
          status: [],
          department: [],
          location: [],
        }),
        (this.globalUtilityFunctions = new n(this.selectedFilters)),
        (this.headerFunctions = new t()),
        (this.filterFunctions = new l(
          this.globalUtilityFunctions,
          this.selectedFilters
        )),
        (this.sideBarFunctions = new e(
          this.headerFunctions,
          this.globalUtilityFunctions,
          this.filterOptions,
          this.filterFunctions
        )),
        (this.addEmployeesFunctions = new o(
          this.globalUtilityFunctions,
          this.sideBarFunctions
        )),
        (this.employeesFunctions = new i(
          this.globalUtilityFunctions,
          this.addEmployeesFunctions,
          this.sideBarFunctions,
          this.filterFunctions
        ));
    }
    main() {
      document.addEventListener("DOMContentLoaded", () => {
        this.includeHTML("./html/sidebar.html", "sidebarContainer"),
          this.includeHTML("./html/header.html", "headerContainer"),
          this.includeHTML("./html/employees.html", "employeesContainer"),
          this.includeHTML("./html/addEmployee.html", "addEmployeesContainer"),
          this.includeHTML("./html/role.html", "roleContainer"),
          this.includeHTML("./html/addRoles.html", "newRoleContainer"),
          this.includeHTML("./html/roleDesc.html", "roleDescContainer");
      });
    }
    includeHTML(e, t) {
      fetch(e)
        .then((e) => e.text())
        .then((s) => {
          this.globalUtilityFunctions.updateGridTemplateColumns();
          const o = document.getElementById(t);
          o && (o.innerHTML += s), this.handlePostProcessing(e);
        })
        .catch((t) => console.error(`Error fetching ${e}:`, t));
    }
    handleEmployeesPage(e) {
      "./html/employees.html" == e &&
        (this.employeesFunctions.loadEmployees(),
        this.filterFunctions.generateAlphabetButtons());
    }
    handleAddEmployeePage(e) {
      if ("./html/addEmployee.html" == e) {
        this.addEmployeesFunctions.populateSelectOptions(
          "location",
          this.locationOptions
        ),
          this.addEmployeesFunctions.populateSelectOptions(
            "jobTitle",
            this.jobTitleOptions
          ),
          this.addEmployeesFunctions.populateSelectOptions(
            "department",
            this.departmentOptions
          ),
          this.addEmployeesFunctions.populateSelectOptions(
            "assignManager",
            this.managerOptions
          ),
          this.addEmployeesFunctions.populateSelectOptions(
            "assignProject",
            this.projectOptions
          );
        const e = document.getElementById("profileImageInput"),
          t = document.getElementById("addProfilePhotoButton");
        e &&
          t &&
          (t.addEventListener(
            "click",
            this.addEmployeesFunctions.openProfileImageInput
          ),
          e.addEventListener(
            "change",
            this.addEmployeesFunctions.previewProfileImage
          ));
      }
    }
    handleAddRolesPage(e) {
      if ("./html/addRoles.html" == e) {
        const e = document.querySelector(".select-selected");
        document.querySelector(".select-items"),
          e &&
            e.addEventListener(
              "click",
              this.globalUtilityFunctions.toggleSelectOptions
            ),
          document
            .querySelectorAll(".select-items input[type='checkbox']")
            .forEach((e) => this.employeesFunctions.handleCheckbox(e));
      }
    }
    handlePostProcessing(e) {
      this.globalUtilityFunctions.handleSidebarResponsive(),
        this.filterFunctions.populateFilterOptions(),
        this.sideBarFunctions.populateDepartmentList(),
        this.handleEmployeesPage(e),
        this.handleAddEmployeePage(e),
        this.handleAddRolesPage(e);
    }
  })();
  window.ems = a;
})();
