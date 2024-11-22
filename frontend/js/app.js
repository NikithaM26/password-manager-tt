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

let currentDeleteLabel = null;

// Show Delete Modal
function showDeleteModal(label) {
  currentDeleteLabel = label;
  document.getElementById(
    "deleteLabelText"
  ).textContent = `Are you sure you want to delete "${label}"?`;
  document.getElementById("deleteModal").classList.remove("hidden");
}

// Close Delete Modal
function closeDeleteModal() {
  document.getElementById("deleteModal").classList.add("hidden");
  currentDeleteLabel = null;
}

// Confirm Delete Password
async function confirmDeletePassword() {
  try {
    const response = await fetch(
      `${API_BASE}/delete-password/${currentDeleteLabel}`,
      { method: "DELETE" }
    );
    if (response.ok) {
      showSnackbar("Password deleted successfully.");
      loadLabels();
    } else {
      const error = await response.json();
      showSnackbar(error.message || "Error deleting password.", true);
    }
  } catch (err) {
    console.error("Error:", err);
    showSnackbar("Failed to delete password.", true);
  } finally {
    closeDeleteModal();
  }
}

// Attach Event Listeners for Delete Modal
document
  .getElementById("cancelDelete")
  .addEventListener("click", closeDeleteModal);
document
  .getElementById("confirmDelete")
  .addEventListener("click", confirmDeletePassword);

// Global Variable to Store Current Label
let currentEditLabel = null;

function showEditModal(label) {
  currentEditLabel = label;
  document.getElementById("editLabel").value = label;
  document.getElementById("editPassword").value = "";
  document.getElementById("editModal").classList.remove("hidden");
}

function closeEditModal() {
  document.getElementById("editModal").classList.add("hidden");
  currentEditLabel = null;
}

// Handle Edit Password Form Submission
document
  .getElementById("editPasswordForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const newPassword = document.getElementById("editPassword").value.trim();
    if (!newPassword) {
      showSnackbar("New password is required!", true);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE}/update-password/${currentEditLabel}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword }),
        }
      );

      if (response.ok) {
        showSnackbar("Password updated successfully.");
        loadLabels();
        closeEditModal();
      } else {
        const error = await response.json();
        showSnackbar(error.message || "Error updating password.", true);
      }
    } catch (err) {
      console.error("Error:", err);
      showSnackbar("Failed to update password.", true);
    }
  });

document
  .getElementById("closeEditModal")
  .addEventListener("click", closeEditModal);

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
                    <button 
                        class="bg-yellow-500 text-white py-1 px-2 rounded hover:bg-yellow-600 mr-2"
                        onclick="showEditModal('${label}')">
                        Edit
                    </button>
                    <button 
                        class="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                        onclick="showDeleteModal('${label}')">
                        Delete
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
