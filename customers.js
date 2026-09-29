const POWER_AUTOMATE_URL =
    "YOUR_CUSTOMER_POWER_AUTOMATE_URL";

const CUSTOMER_STORAGE_KEY =
    "vertexCustomers";


/* ================================
   GET CUSTOMERS
================================ */

function getCustomers() {

    return JSON.parse(
        localStorage.getItem(CUSTOMER_STORAGE_KEY) || "[]"
    );

}


/* ================================
   SAVE CUSTOMERS
================================ */

function saveCustomers(customers) {

    localStorage.setItem(
        CUSTOMER_STORAGE_KEY,
        JSON.stringify(customers)
    );

}


/* ================================
   CREATE CUSTOMER
================================ */

async function createCustomer(event) {

    event.preventDefault();

    const button =
        document.getElementById("createCustomerButton");


    const customerNo =
        document
            .getElementById("customerNo")
            .value
            .trim();


    const customerName =
        document
            .getElementById("customerName")
            .value
            .trim();


    const email =
        document
            .getElementById("customerEmail")
            .value
            .trim();


    const phone =
        document
            .getElementById("customerPhone")
            .value
            .trim();

    const city =
        document
            .getElementById("customerCity")
            .value
            .trim();

    const status =
        document
            .getElementById("customerStatus")
            .value;
    /* ================================
       VALIDATION
    ================================= */

    if (!customerNo || !customerName) {

        alert(
            "Customer No. and Customer Name are required."
        );

        return;
    }


    /* ================================
       GET EXISTING CUSTOMERS
    ================================= */

    const customers =
        getCustomers();


    /* ================================
       DUPLICATE CHECK
    ================================= */

    const duplicate =
        customers.some(
            customer =>
                customer.CustomerNo.toLowerCase() ===
                customerNo.toLowerCase()
        );


    if (duplicate) {

        alert(
            "This Customer No. already exists."
        );

        return;
    }


    /* ================================
       DATA FOR POWER AUTOMATE
    ================================= */

    if (POWER_AUTOMATE_URL === "https://e98edb130074e5d08d1e59167e58e9.dd.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/24/workflows/9fbcfc43da1d480982aff5294f432543/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=wxiBIKw_L3E3mO9TOjE1Ot0AJDwEN9J-MwoZbjvmOT4") {

        alert(
            "Configure the customer Power Automate URL before saving."
        );

        return;

    }


    const payload = {

        CustomerNo:
            customerNo,

        CustomerName:
            customerName,

        Email:
            email,

        Phone:
            phone,

        Address:
            "",

        City:
            city,

        Country:
            "India",

        Status:
            status

    };


    button.disabled = true;

    button.textContent =
        "Creating...";


    try {


        /* ================================
           SEND TO POWER AUTOMATE
        ================================= */

        const response =
            await fetch(
                POWER_AUTOMATE_URL,
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(payload)

                }
            );


        if (!response.ok) {

            throw new Error(
                "Power Automate returned HTTP " +
                response.status
            );

        }


        /* ================================
           SAVE CUSTOMER LOCALLY
        ================================= */

        const newCustomer = {

            CustomerNo:
                customerNo,

            CustomerName:
                customerName,

            Email:
                email,

            Phone:
                phone,

            Address:
                "",

            City:
                city,

            Country:
                "India",

            Status:
                status,

            SyncStatus:
                "Pending"

        };


        customers.unshift(
            newCustomer
        );


        saveCustomers(
            customers
        );


        /* ================================
           REFRESH CUSTOMER LIST
        ================================= */

        renderCustomers();


        closeCreateCustomerModal();


        alert(
            "Customer created successfully."
        );


    }
    catch (error) {

        console.error(
            error
        );


        alert(
            "Customer could not be created.\n\n" +
            error.message
        );

    }
    finally {

        button.disabled = false;

        button.textContent =
            "Create Customer";

    }

}


/* ================================
   DISPLAY CUSTOMERS
================================ */

function renderCustomers() {

    const tbody =
        document.getElementById(
            "customerTableBody"
        );


    const customers =
        getCustomers();


    tbody.innerHTML = "";


    /* ================================
       NO CUSTOMERS
    ================================= */

    if (customers.length === 0) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    class="empty-state"
                >

                    <div class="empty-title">
                        No customers yet
                    </div>

                    <div class="empty-text">
                        Create a customer to see it here.
                    </div>

                </td>

            </tr>

        `;

        updateCustomerCount();

        return;
    }


    /* ================================
       DISPLAY CUSTOMERS
    ================================= */

    customers.forEach(
        customer => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    <strong>
                        ${escapeHtml(
                            customer.CustomerNo
                        )}
                    </strong>
                </td>


                <td>
                    ${escapeHtml(
                        customer.CustomerName
                    )}
                </td>


                <td>
                    ${escapeHtml(
                        customer.Email || "-"
                    )}
                </td>


                <td>
                    ${escapeHtml(
                        customer.Phone || "-"
                    )}
                </td>


                <td>
                    ${escapeHtml(
                        customer.Address || "-"
                    )}
                </td>


                <td>

                    <span class="status-badge active">
                        Active
                    </span>

                </td>


                <td>

                    <button
                        class="btn btn-small"
                        onclick='viewCustomer(
                            ${JSON.stringify(customer)}
                        )'
                    >
                        View
                    </button>

                </td>

            `;


            tbody.appendChild(
                row
            );

        }
    );


    updateCustomerCount();

}


/* ================================
   CUSTOMER COUNT
================================ */

function updateCustomerCount() {

    const customers =
        getCustomers();


    const countElement =
        document.getElementById(
            "customerCount"
        );


    if (countElement) {

        countElement.textContent =
            customers.length +
            (
                customers.length === 1
                    ? " Customer"
                    : " Customers"
            );

    }

}


/* ================================
   VIEW CUSTOMER
================================ */

function viewCustomer(customer) {

    document.getElementById(
        "viewCustomerNo"
    ).textContent =
        customer.CustomerNo || "-";


    document.getElementById(
        "viewCustomerName"
    ).textContent =
        customer.CustomerName || "-";


    document.getElementById(
        "viewEmail"
    ).textContent =
        customer.Email || "-";


    document.getElementById(
        "viewPhone"
    ).textContent =
        customer.Phone || "-";


    document.getElementById(
        "viewAddress"
    ).textContent =
        customer.Address || "-";


    document.getElementById(
        "viewCustomerModal"
    ).style.display =
        "flex";

}


/* ================================
   SEARCH
================================ */

function searchCustomers() {

    const search =
        document
            .getElementById("customerSearch")
            .value
            .toLowerCase()
            .trim();


    const rows =
        document.querySelectorAll(
            "#customerTableBody tr"
        );


    rows.forEach(row => {

        const text =
            row.textContent.toLowerCase();


        row.style.display =
            text.includes(search)
                ? ""
                : "none";

    });

}


/* ================================
   ESCAPE HTML
================================ */

function escapeHtml(value) {

    return String(value)

        .replaceAll("&", "&amp;")

        .replaceAll("<", "&lt;")

        .replaceAll(">", "&gt;")

        .replaceAll('"', "&quot;")

        .replaceAll("'", "&#039;");

}


/* ================================
   INITIAL LOAD
================================ */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        renderCustomers();

    }
);