//Global Items
const mainSection = document.querySelector('main');
let employees = [];
const popUp = document.querySelector('.pop-up');
let popUpContent = document.querySelector('.window-content');
const popUpClose = document.querySelector('.close');

function displayEmployees(employeeData) {
    employees = employeeData;

    let employeeHTML = '';

    // Create HTML Markup from HTML
    employees.forEach((employee,index)=>{
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture.large;

        employeeHTML += `
            <div class="employee-card">
                
                <img class ="employee-image" src="${picture}" alt="Profile Picture">
                <div class="employee-info">
                    <h2 class="employee-name">
                        <u>${name.first} ${name.last}</u>
                    </h2>
                    <h3 class="employee-email">
                        ${email}
                    </h3>
                    <h3 class="employee-location">
                        ${city}
                    </h3>
                </div>
                <div class = 'employee-overlay'></div>
            </div>
        `
    mainSection.innerHTML = employeeHTML;
    })
}
// Fetch data from API and map to page
let apiReturn = () => {
    return fetch('https://randomuser.me/api/?results=12&inc=picture, name, location, email, phone, dob &noinfo &nat=US?')
        .then(res => res.json())
        .then(res => res.results)
        .then(displayEmployees)
}
apiReturn()

function displayPopUp(index){
    let {name, dob, phone, email, location: {city, street, state, postcode}, picture} = employees[index];

    let date = new Date(dob.date);

    const popUpHTML = `
    <img class="window-image" src="${picture.large}" alt="">
    <div class="window-info">
        <h2><u>${name.first} ${name.last}</u></h2>
        <p class='email'>${email}</p>
        <p class='address'>${city}</p>
        <p>${phone}</p>
        <p>${street.number},${street.name}, ${state} ${postcode}</p>
        <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p></p>
    </div>
    `
    popUp.classList.remove('hidden');
    popUpContent.innerHTML = popUpHTML;
}

//Open PopUp Window
mainSection.addEventListener('click', e => {
    if (e.target !== mainSection){
        const card = e.target.closest('.employee-card');
        const index = card.getAttribute('data-index');

        displayPopUp(1);
    }
})

// Close Pop-Up Window
popUpClose.addEventListener('click', () => popUp.classList.add('hidden'))

