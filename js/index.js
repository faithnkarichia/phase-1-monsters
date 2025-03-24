document.addEventListener("DOMContentLoaded", function (e) {
    e.preventDefault()
  //on page load show 50 monsters
  let createMonster = document.getElementById("create-monster");

  let monsterContainer = document.getElementById("monster-container");
  let back = document.getElementById("back");
  let foward = document.getElementById("forward");
  let page = 1;
  let monstersPerPage = 50;

  //display the first 50
  function displayMonsters(page) {
    fetch("http://localhost:3000/monsters")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        return res.json();
      })
      .then((monsters) => {
        monsterContainer.innerHTML = "";

        let start = (page - 1) * monstersPerPage;
        let end = start + monstersPerPage;
        let paginatedMOnsters = monsters.slice(start, end);

        paginatedMOnsters.forEach((monster) => {
          monsterCard(monster);
        });

        back.disabled = page == 1;
      });
  }


  // Function to create and append the form
function createMonsterForm() {
    const form = document.createElement('form');
    form.id = 'monster-form';

    // Name input
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name:';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'name';
    nameInput.placeholder = 'Enter the name';
    nameLabel.appendChild(nameInput);

    // Age input
    const ageLabel = document.createElement('label');
    ageLabel.textContent = 'Age:';
    const ageInput = document.createElement('input');
    ageInput.type = 'number';
    ageInput.id = 'age';
    ageInput.placeholder = 'Enter the age';
    ageLabel.appendChild(ageInput);

    // Description input
    const descLabel = document.createElement('label');
    descLabel.textContent = 'Description:';
    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.id = 'description';
    descriptionInput.placeholder = 'Enter the description';
    descLabel.appendChild(descriptionInput);

    // Submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'POST';

    // Append inputs and button to the form
    form.appendChild(nameLabel);
    form.appendChild(ageLabel);
    form.appendChild(descLabel);
    form.appendChild(submitButton);

    // Append the form to the createMonster div
    const createMonster = document.getElementById('create-monster');
    createMonster.appendChild(form);

    // Add event listener for form submission
    form.addEventListener('submit', handleFormSubmit);
}
createMonsterForm()

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Retrieve input values
    const nameInputValue = document.getElementById('name').value.trim();
    const ageInputValue = parseFloat(document.getElementById('age').value.trim());
    const descriptionInputValue = document.getElementById('description').value.trim();

    // Validate inputs
    if (!nameInputValue || isNaN(ageInputValue) || !descriptionInputValue) {
        alert('Please fill out all fields correctly.');
        return;
    }

    // Create new monster object
    const newMonster = {
        name: nameInputValue,
        age: ageInputValue,
        description: descriptionInputValue
    };

    // Send POST request
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(newMonster)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        console.log('Monster posted successfully:', data);
        // Optionally, refresh the monster list or provide user feedback here
    })
    .catch(error => console.error('Error posting monster:', error));
}




  function monsterCard(monster) {
    const card = document.createElement("div");
    card.classList.add("monster-card");

    const name = document.createElement("h2");
    name.textContent = monster.name;

    const age = document.createElement("h4");
    age.textContent = `Age: ${monster.age}`;

    const description = document.createElement("p");
    description.textContent = monster.description;

    card.appendChild(name);
    card.appendChild(age);
    card.appendChild(description);

    monsterContainer.appendChild(card);
  }

  foward.addEventListener("click", () => {
    page++;
    displayMonsters(page);
  });

  back.addEventListener("click", () => {
    if (page > 1) {
      page--;
      displayMonsters(page);
    }
  });

  displayMonsters(page);
});
