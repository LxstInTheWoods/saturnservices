
function sendMessage() {
    const request = new XMLHttpRequest();
    request.open("POST", "https://discord.com/api/webhooks/1081092095072276480/FRtMHNuw__kwu2dSpWXOlT5mi4Tm0W75NvFOOua-hwwAxlsUIP37veOcgtcBSrST0WfO");

    request.setRequestHeader('Content-type', 'application/json');

    const params = {
      username: "Test",
      avatar_url: "",
      content: "The message to send"
    }

    request.send(JSON.stringify(params));
  }
