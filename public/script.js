function copyToClipboard() {
    const copyText = document.getElementById("shortened-url");
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    navigator.clipboard.writeText(copyText.value)
        .then(() => {
            alert("Shortened URL copied to clipboard!");
        })
        .catch(err => {
            console.error("Failed to copy: ", err);
        });
}