function convertHtml2JsonAndSet() {
  const htmlTextAreaValue = document.getElementById('html').value;

  if (!htmlTextAreaValue.trim()) {
    alert('Please enter HTML before converting to JSON.');
    return;
  }

  // Optional check for valid HTML code

  //   if (!htmlTextAreaValue.startsWith('<')) {
  //     alert('Please enter valid HTML code that starts with "<".');
  //     return;
  //   }

  const jsonObj = html2json(htmlTextAreaValue);
  const jsonArea = document.getElementById('json');
  jsonArea.textContent = JSON.stringify(jsonObj, null, 2);
}

function html2json(htmlText) {
  const container = document.createElement('div');
  container.innerHTML = htmlText;

  return elementToJson(container);
}

function elementToJson(element) {
  const obj = {
    tag: element.tagName ? element.tagName.toLowerCase() : null,
  };

  if (element.attributes && element.attributes.length > 0) {
    obj.attributes = {};
    for (let attr of element.attributes) {
      obj.attributes[attr.name] = attr.value;
    }
  }

  if (element.children.length === 0 && element.textContent.trim()) {
    obj.text = element.textContent.trim();
  }

  if (element.children.length > 0) {
    obj.children = Array.from(element.children).map((child) =>
      elementToJson(child)
    );
  }

  return obj;
}

function showExample1() {
  const htmlExample = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport">
    <title>Sample HTML</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
    </header>
    <nav>
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>
    <main>
        <section id="home">
            <h2>Home Section</h2>
            <p>This is the home section of the webpage.</p>
        </section>
        <section id="about">
            <h2>About Section</h2>
            <p>This is the about section of the webpage.</p>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 My Website</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>
`;

  document.getElementById('html').value = htmlExample;
  convertHtml2JsonAndSet();
}

function showExample2() {
  const htmlExample = `<div>
<p>Hello world!</p>
  <button>Click me!</button>
  <textarea>Some very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very very long string.</textarea>
</div>
`;

  document.getElementById('html').value = htmlExample;
  convertHtml2JsonAndSet();
}
