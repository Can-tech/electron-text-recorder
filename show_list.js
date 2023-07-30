const fs = require("fs");

var topics_div = document.getElementById("topics");
var texts_div = document.getElementById("texts");
var words_div = document.getElementById("words");
var paragraph_div = document.getElementById("paragraph");

var paragraph_form_options = document.getElementById("selectTopic");
var word_form_options = document.getElementById("selectParagraph");

var myData = null;

//Called when the page is loaded
// function fetchData() {
//   fetch("./../data.json")
//     .then((response) => response.json())
//     .then((jsonData) => {
//       topics_div.innerHTML = `<ul class="list-none m-3">${Object.keys(jsonData)
//         .map((key) => {
//           console.log(key);
//           return `<li ><button class="bg-slate-100 my-1 p-2 rounded-xl w-full font-semibold" onClick=handleTopicButtonClick('${key}')>${key
//             .split("_")
//             .join(" ")}</button></li>`;
//         })
//         .join("")}</ul>`;
//       data = jsonData;
//       paragraph_form_options.innerHTML = `${Object.keys(jsonData)
//         .map(
//           (topic) =>
//             `<option value="${topic}">${topic.split("_").join(" ")}</option>`
//         )
//         .join(``)}`;
//       selectParagraphHandle();
//     })

//     .catch((error) => {
//       console.error("Error fetching data:", error);
//     });
// }

// fetchData();

function fetchData() {
  fs.readFile("./data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading data from file:", err);
    } else {
      // Parse the JSON data
      const jsonData = JSON.parse(data);
      console.log(jsonData);
      // Now you can use the jsonData as needed

      topics_div.innerHTML = `<ul class="list-none m-3">${Object.keys(jsonData)
        .map((key) => {
          console.log(key);
          return `<li ><button class="bg-slate-100 my-1 p-2 rounded-xl w-full font-semibold" onClick=handleTopicButtonClick('${key}')>${key
            .split("_")
            .join(" ")}</button></li>`;
        })
        .join("")}</ul>`;
      myData = jsonData;
      paragraph_form_options.innerHTML = `${Object.keys(jsonData)
        .map(
          (topic) =>
            `<option value="${topic}">${topic.split("_").join(" ")}</option>`
        )
        .join(``)}`;
      selectParagraphHandle();
    }
  });
}

fetchData();

let selectedTopic = "General";

//Called from onClick attribute of the button elements in the topics section when the user clicks on a topic
function handleTopicButtonClick(topicName) {
  try {
    selectedTopic = topicName;
    console.log(topicName);
    texts_div.innerHTML = `<ul class="m-3 flex flex-col">${Object.keys(
      myData[selectedTopic]
    )
      .map(
        (key, index) =>
          `<li class=" bg-slate-300 m-1 ml-1 p-2 capitalize rounded-xl cursor-pointer" id=${index} onClick=handleParagraphHeadingsClick('${index}')>${key
            .split("_")
            .join(" ")}</li>`
      )
      .join(" ")}</ul>`;
  } catch (error) {}
}

//Called from onClick attribute of the li elements in the texts section when the user clicks on a paragraph heading
function handleParagraphHeadingsClick(textIndex) {
  fetchData();
  words_div.innerHTML = `<ul class="m-3 flex flex-col">${Object.values(
    Object.values(
      Object.values(
        Object.values(Object.values(myData[selectedTopic])[textIndex])[1]
      )
    ).map(
      (value) =>
        `<li class="bg-slate-100 m-1 p-2 capitalize rounded-xl cursor-pointer">${
          Object.keys(value)[0]
        }
        <hr/>
        ${Object.values(value)[0]}
        </li>`
    )
  ).join("")}</ul>`;

  paragraph_div.innerHTML = `<ul class="m-3 flex flex-col">${
    Object.values(Object.values(myData[selectedTopic])[textIndex])[0]
  }</ul>`;
}

//consider adding realtime update to the words section when a new word is added
// function fetchWords() {
//   fetchData();
//   words_div.innerHTML = `<ul class="m-3 flex flex-col">${Object.values(
//     Object.values(
//       Object.values(
//         Object.values(Object.values(data[selectedTopic])[textIndex])[1]
//       )
//     ).map(
//       (value) =>
//         `<li class="bg-slate-100 m-1 p-2 capitalize rounded-xl cursor-pointer">${
//           Object.keys(value)[0]
//         }
//         <hr/>
//         ${Object.values(value)[0]}
//         </li>`
//     )
//   ).join("")}</ul>`;
// }

//Called from onSubmit attribute of the form html element in the adding topic section when the user clicks the submit button
function handleTopicFormSubmit(event) {
  event.preventDefault();
  console.log(event.target[0].value);
  addNewTopic(event.target[0].value);
}
//Called from onSubmit attribute of the form html element in the adding paragraph section when the user clicks the submit button
function handleParagraphFormSubmit(event) {
  event.preventDefault();
  console.log(event.target[1].value);
  addNewParagraph(event.target[1].value, event.target[2].value);
}
//Called from onSubmit attribute of the form html element in the adding word section when the user clicks the submit button
function handleWordFormSubmit(event) {
  event.preventDefault();
  addNewWord(event.target[1].value);
}

//Called from onClick handle function when the user clicks the submit button for a new topic
function addNewTopic(newTopicName) {
  const newData = {
    ...myData,
    [newTopicName.split(" ").join("_")]: {},
  };

  fs.writeFile("./data.json", JSON.stringify(newData), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log('Successfully wrote "hello world" to hello.txt.');
    }
  });
  setTimeout(fetchData, 500);
}
//Called from onClick handle function when the user clicks the submit button for a new paragraph
function addNewParagraph(newParagraphName, newParagraphText) {
  const newData = {
    ...myData,
    [paragraph_form_options.value]: {
      ...myData[paragraph_form_options.value],
      [newParagraphName.split(" ").join("_")]: {
        text: newParagraphText,
        words: [],
      },
    },
  };

  fs.writeFile("./data.json", JSON.stringify(newData), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log('Successfully wrote "hello world" to hello.txt.');
    }
  });
  setTimeout(fetchData, 500);
}

//Called from onClick handle function when the user clicks the submit button for a new word
function addNewWord(newWordName) {
  let bothWords = newWordName.split("!");
  let englishWord = bothWords[0];
  let turkishWord = bothWords[1];
  const newData = {
    ...myData,
    [paragraph_form_options.value]: {
      ...myData[paragraph_form_options.value],
      [word_form_options.value]: {
        text: myData[paragraph_form_options.value][word_form_options.value]
          ?.text,
        words: [
          ...myData[paragraph_form_options.value][word_form_options.value]
            ?.words,
          { [englishWord]: turkishWord },
        ],
      },
    },
  };
  fs.writeFile("./data.json", JSON.stringify(newData), (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log('Successfully wrote "hello world" to hello.txt.');
    }
  });
  // setTimeout(fetchWords, 500);
}

//Called from onchange attribute of the select html element in the adding paragraph section when the user selects a topic from the dropdown menu
function selectParagraphHandle(event) {
  // console.log(paragraph_form_options.value);

  word_form_options.innerHTML = `${Object.keys(
    myData[paragraph_form_options.value]
  )
    .map((key, index) => `<option value=${key}>${key}</li>`)
    .join(" ")}`;
}
