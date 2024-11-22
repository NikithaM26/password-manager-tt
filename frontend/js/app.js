const API_BASE = "http://localhost:3009/api";

// Show Snackbar
function showSnackbar(message, isError = false) {
  const snackbar = document.getElementById("snackbar");
  snackbar.textContent = message;
  snackbar.className = `fixed bottom-5 left-1/2 transform -translate-x-1/2 py-2 px-4 rounded shadow ${
    isError ? "bg-red-500" : "bg-green-500"
  } text-white`;
  snackbar.classList.remove("hidden");

  setTimeout(() => {
    snackbar.classList.add("hidden");
  }, 3000);
}

// Show Modal
function showModal(password) {
  const modal = document.getElementById("passwordModal");
  const modalPassword = document.getElementById("modalPassword");
  modalPassword.textContent = password;
  modal.classList.remove("hidden");
}

// Close Modal
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("passwordModal").classList.add("hidden");
});

// Add Password
document
  .getElementById("addPasswordForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const label = document.getElementById("label").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!label || !password) {
      showSnackbar("Both fields are required!", true);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/add-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, password }),
      });

      if (response.ok) {
        showSnackbar("Password saved!");
        document.getElementById("label").value = "";
        document.getElementById("password").value = "";
        loadLabels();
      } else {
        const error = await response.json();
        showSnackbar(error.message || "Error saving password.", true);
      }
    } catch (err) {
      console.error("Error:", err);
      showSnackbar("Failed to save password.", true);
    }
  });

async function loadLabels() {
  try {
    const response = await fetch(`${API_BASE}/list-labels`);
    const labels = await response.json();

    const labelsDiv = document.getElementById("labelsList");
    labelsDiv.innerHTML = labels
      .map(
        (label) => `
            <div class="flex items-center justify-between p-3 bg-gray-100 rounded">
                <span>${label}</span>
                <div>
                    <button 
                        class="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2"
                        onclick="getPassword('${label}')">
                        View
                    </button>
                </div>
            </div>
        `
      )
      .join("");
  } catch (err) {
    console.error("Error:", err);
    showSnackbar("Failed to load labels.", true);
  }
}

// Get Password
async function getPassword(label) {
  try {
    const response = await fetch(`${API_BASE}/get-password/${label}`);
    if (response.ok) {
      const data = await response.json();
      showModal(data.password);
    } else {
      const error = await response.json();
      showSnackbar(error.message || "Error fetching password.", true);
    }
  } catch (err) {
    console.error("Error:", err);
    showSnackbar("Failed to fetch password.", true);
  }
}

//on load
loadLabels();
