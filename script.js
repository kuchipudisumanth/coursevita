document.getElementById("generateButton").addEventListener("click", function() {
    const projectName = document.getElementById("projectName").value;
    const requirements = document.getElementById("requirements").value;

    if (projectName && requirements) {
        const outputDiv = document.getElementById("output");
        outputDiv.style.display = "block";
        outputDiv.innerHTML = `
            <h3>Generated Project Details</h3>
            <p><strong>Project Name:</strong> ${projectName}</p>
            <p><strong>Requirements:</strong> ${requirements}</p>
        `;
    } else {
        alert("Please fill out all fields before generating.");
    }
});

document.getElementById("projectForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Redirect to the assigned list page with data
    window.location.href = "assigned_list.html";
});
