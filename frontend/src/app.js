// Import the CSS file from the src/css directory, so webpack bundles it.
import "./css/app.css";

// Hello world!
document.getElementById("title").innerText = "Hello Simmerplate!";

document.getElementById("hello").addEventListener("click", () => {
  fetch("/api/hello")
    .then((response) => response.json())
    .then((data) => alert(`backend says: ${data.message}`));
});
