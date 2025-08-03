// find DOM object that corresponds to job desc

async function waiting() {
    console.log("Before sleep");
    await sleep(7000); // Sleep for 5 seconds
    console.log("After sleep [After 7 Seconds]");
    return true;
}
  
async function sleep(ms) {
    await new Promise((resolve) => setTimeout(resolve, ms));
}
  
  
async function getJobDesc() {
    const waited = await waiting()
    console.log("Waiting finished: ", waited);
    const jobDesc = document.getElementById("job-details");
    if(jobDesc) {
        console.log("jobDesc found");
        var text = [];
        jobDesc.childNodes.forEach((node) => {
            text.push(node.textContent);
        });
        // console.log(text);
        return text;
    };
}

async function flattenText() {
    const acquired_text = await getJobDesc()
    var arrayLength = acquired_text.length;
    for (var i = 0; i < arrayLength; i++) {
        acquired_text[i] = acquired_text[i].trim();
        acquired_text[i] = acquired_text[i].replace(/\s+/g, " ");
        acquired_text[i] = acquired_text[i].replace(/\n/g, " ");
        acquired_text[i] = acquired_text[i].concat(acquired_text[i]," ");
        console.log(acquired_text[i]);
    }
    var all_text = acquired_text.join(",");
    all_text = all_text.replace(" , , , ,", " ");
    all_text = all_text.replace(" ,", "");
    all_text = all_text.toLowerCase();
    return all_text;
}

flattenText();

// const jobDesc = document.getElementById("job-details");
// if(jobDesc) {
//     console.log("jobDesc found");
//     var text = [];
//     jobDesc.childNodes.forEach((node) => {
//         text.push(node.textContent);
//     });
//     console.log(text);

// };

// compare to list of language names ie german, deutsch, english, etc

// parse w/ regex and find language keywords

// create html/css for label to add

// create instance of label, add to DOM