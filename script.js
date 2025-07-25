function getLocation() {
  const pincode = document.getElementById("pincode").value.trim();
  const resultDiv = document.getElementById("result");

  if (pincode === "") {
    resultDiv.innerHTML = "Please enter a pincode.";
    return;
  }

  const url = `https://api.postalpincode.in/pincode/${pincode}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Network error");
      return response.json();
    })
    .then(data => {
      const postOffices = data[0].PostOffice;

      if (data[0].Status === "Success" && postOffices && postOffices.length > 0) {
        const post = postOffices[0];
        const location = `${post.Name}, ${post.District}, ${post.State}, ${post.Country}`;

        // Only display location info (no map)
        resultDiv.innerHTML = `
          <p><strong>Location:</strong> ${location}</p>
        `;
      } else {
        resultDiv.innerHTML = "No location found for this pincode.";
      }
    })
    .catch(error => {
      console.error("Error:", error);
      resultDiv.innerHTML = "Something went wrong. Please try again.";
    });
}

  