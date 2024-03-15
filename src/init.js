(() => {
  const paths = {
    register: "./templates/register-template/register-template.html",
    login: "./templates/login-template/login-template.html",
  };
  function listenEvents() {
    window.addEventListener("register-event", ({ detail }) => {
      console.log(detail);
      loadView(paths.login);
    });
    window.addEventListener("login-event", ({ detail }) => {
      console.log(detail);
    });
  }
  async function loadView(path) {
    const html = await (await fetch(path)).text();
    const main = document.getElementById("container");

    const [newHtml, script] = html.split("<script>");
    main.innerHTML = newHtml;
    const newScript = document.createElement("script");
    newScript.text = script.split("</script>")[0];
    newScript.type = "module";
    document.body.appendChild(newScript);
  }

  loadView(paths.register);
  listenEvents();
})();
