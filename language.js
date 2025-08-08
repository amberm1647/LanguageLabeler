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
  
// Fetches the job description from the DOM after waiting for the page to load  
async function getJobDesc() {
    const waited = await waiting()
    // console.log("Waiting finished: ", waited);
    console.log("Running getJobDesc");
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
    console.log("Running flattenText");
    var arrayLength = acquired_text.length;
    for (var i = 0; i < arrayLength; i++) {
        acquired_text[i] = acquired_text[i].trim();
        acquired_text[i] = acquired_text[i].replace(/\s+/g, " ");
        acquired_text[i] = acquired_text[i].replace(/\n/g, " ");
        acquired_text[i] = acquired_text[i].concat(acquired_text[i]," ");
        // console.log(acquired_text[i]);
    }
    var all_text = acquired_text.join(",");
    all_text = all_text.replace(" , , , ,", " ");
    all_text = all_text.replace(" ,", "");
    all_text = all_text.toLowerCase();
    return all_text;
}

// Searches the jobDesc for language keywords and returns a string of found languages
async function getLanguageKeywords(){
    const fullText = await flattenText()
    console.log("Running getLanguageKeywords");
    const isGerman = fullText.includes("german") || fullText.includes("deutsch") || fullText.includes("deutschkenntnisse") ;
    const isEnglish = fullText.includes("english") || fullText.includes("englischkenntnisse");
    const isFrench = fullText.includes("français") || fullText.includes("french");
    const isSpanish = fullText.includes("spanish");
    const isItalian = fullText.includes("italian") || fullText.includes("italiano");

    const output = []
    if (isGerman) {
        output.push("German");
    } 
    if (isEnglish) {
        output.push("English");
    } 
    if (isFrench) {
        output.push("French");
    } 
    if (isSpanish) {
        output.push("Spanish");
    } 
    if (isItalian) {
        output.push("Italian");
    }
    output.sort();
    const outputString = output.join(", ");
    console.log("Language Keywords found: ", outputString);
    return outputString;
}

// getLanguageKeywords();


// Add Observer to Observe the DOM
// const observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//         if (mutation.type === "childList") {
//             console.log("Child list mutation detected");
//         };
//     });
// });

// // Start observing the DOM
// observer.observe(document, { childList: true, subtree: true });

// pulls html from site, makes copy to add button, creates button with languages, adds to DOM

async function addLanguageBubble(){
    const fullText = await getLanguageKeywords()
    console.log("Running addLanguageBubble");
    var parent = document.getElementsByClassName("job-details-fit-level-preferences");
    var ref = parent[0]
    var kids = ref.children;
    var child = kids[0];

    var languageLabel = child.cloneNode(true);
    const outputStr = "Languages: "
    const outputLabel = outputStr.concat(fullText);
    languageLabel.innerText = outputLabel;

    ref.insertBefore(languageLabel,null);
}

async function addLanguageHighlight(){
    const fullText = await getLanguageKeywords();
    console.log("Running addLanguageHighlight");
    var parent = document.getElementsByClassName("job-details-jobs-unified-top-card__job-insight job-details-jobs-unified-top-card__job-insight--highlight");
    var ref = parent[0];
    console.log("parent", parent);


    var example_detail = document.getElementsByClassName("job-details-jobs-unified-top-card__job-insight-view-model-secondary");

    console.log("example_detail", example_detail[0]);
    // var kids = ref.children;
    // console.log("kids", kids);
    // var child = kids[0];

    // var test = document.getElementsByClassName("job-details-jobs-unified-top-card__job-insight-view-model-secondary");
    // console.log("test", test);
    // console.log("parent of test", test.parentNode)

    var languageLabel = example_detail[0].cloneNode(true);
    const outputStr = "Languages: ";
    const outputLabel = outputStr.concat(fullText);
    languageLabel.innerText = outputLabel;

    ref.insertBefore(languageLabel,null);  
}

try{
    addLanguageBubble();

}
catch(err){
    console.log('error: ', err);
    addLanguageHighlight();
}