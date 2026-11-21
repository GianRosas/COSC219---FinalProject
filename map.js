
const button = document.querySelector("#searchBtn");
const city = document.querySelector("#city");
const table = document.querySelector("#parks");
const message = document.querySelector("#message");

async function getParks() {
    let search = city.value;

    if (search === "") {
        message.textContent = "Enter a city";
        return;
    }

    table.innerHTML = "";
    message.textContent = "Loading...";

    let url = "https://nominatim.openstreetmap.org/search?format=json&q="
        + encodeURIComponent("parks in " + search) + "&limit=10";

    try {
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error("Error");
        }

        let data = await response.json();

        if (data.length === 0) {
            message.textContent = "No results found";
            return;
        }

        message.textContent = data.length + " results found";

        for (let park of data) {
            let row = document.createElement("tr");

            row.innerHTML = "<td>" + (park.name || "Unknown") + "</td>"
                + "<td>" + park.display_name + "</td>"
                + "<td>" + park.lat + "</td>"
                + "<td>" + park.lon + "</td>";

            table.appendChild(row);
        }

    } catch (error) {
        message.textContent = "Could not load parks";
        console.log(error);
    }
}

button.addEventListener("click", getParks);
