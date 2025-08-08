async function waiting() {
    console.log("Before sleep");
    await sleep(7000); // Sleep for 7 seconds
    console.log("After sleep [After 7 Seconds]");
    return true;
}
  
async function sleep(ms) {
    await new Promise((resolve) => setTimeout(resolve, ms));
}

// Fetches the job description from the DOM after waiting for the page to load  
function getJobDesc() {
    // const waited = await waiting()
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

function flattenText(acquired_text) {
    // const acquired_text = await getJobDesc()
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
function getLanguageKeywords(fullText){
    // const fullText = await flattenText()
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


function addLanguageBubble(fullText){
    // const fullText = await getLanguageKeywords()
    console.log("Running addLanguageBubble");
    var parent = document.getElementsByClassName("job-details-fit-level-preferences");
    var ref = parent[0];
    var kids = ref.children;
    var child = kids[0];
    // console.log("parent", parent);
    // console.log("child", child);

    var languageLabel = child.cloneNode(true);
    const outputStr = "Languages: ";
    const outputLabel = outputStr.concat(fullText);
    languageLabel.innerText = outputLabel;

    ref.insertBefore(languageLabel,null);
    return "bubble";
}

function addLanguageHighlight(fullText){
    // const fullText = await getLanguageKeywords();
    console.log("Running addLanguageHighlight");
    var parent = document.getElementsByClassName("job-details-jobs-unified-top-card__job-insight job-details-jobs-unified-top-card__job-insight--highlight");
    var ref = parent[0];
    // console.log("parent", parent);


    var example_detail = document.getElementsByClassName("job-details-jobs-unified-top-card__job-insight-view-model-secondary");

    // console.log("example_detail", example_detail[0]);
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
    return "highlight";
}

function removeLanguageBubble(){
    var parent = document.getElementsByClassName("job-details-fit-level-preferences");
    var ref = parent[0];
    var kids = ref.children;
    var child = kids[kids.length-1];
    child.remove();
    console.log("attempted to remove bubble.");
    return true;
}

function removeLanguageHighlight(){
    var example_detail = document.getElementsByClassName("job-details-jobs-unified-top-card__job-insight-view-model-secondary");
    var child = example_detail[example_detail.length-1];
    child.remove();
    console.log("attempted to remove bubble.");
    return true;
}

function langLabelTry(fullText) {
    try{
        var labelType = addLanguageBubble(fullText);
        console.log("lanLabelTry", labelType);
        return labelType;
    }
    catch(err){
        console.log('error: ', err);
        var labelType = addLanguageHighlight(fullText);
        return labelType;
    }
}

async function onPageLoad() {
    waiting()
    .then(() => {
        jobText = getJobDesc();
        flattened = flattenText(jobText);
        keywordsStr = getLanguageKeywords(flattened);
        labelType = langLabelTry(keywordsStr);
        return labelType;
    })
    // const labelType = await langLabelTry();
    // console.log("onPageLoad", labelType);
}

// var selectedJob = document.querySelector('div[aria-current="page"]');
// var selectedJobBigElement = selectedJob.parentElement.parentElement;
// var jobList = selectedJobBigElement.parentElement
// console.log("test", selectedJob);
// console.log("parents", selectedJobBigElement);

// Add Observer to Observe the DOM
// const observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//         if (mutation.type === "childList") {
//             console.log("Child list mutation detected");
//         };
//     });
// });

// // Start observing the DOM
// observer.observe(jobList, { childList: true, subtree: true });



function jobObserver(currentLabel, retryDelay = 500){
    setTimeout(() => {
        var selectedJob = document.querySelector('div[aria-current="page"]');
        if (!selectedJob) {
            console.log("job var not found yet, retrying...");
            jobObserver(retryDelay + 100);
            return;
        }
        // if (currentLabel != 'bubble' || currentLabel != 'highlight') {
        //     console.log("original label not set yet...");
        //     jobObserver(retryDelay + 100);
        //     return;
        // }
        console.log('currentLabel', currentLabel);
        var selectedJobBigElement = selectedJob.parentElement.parentElement;
        var jobList = selectedJobBigElement.parentElement;
        // console.log("test", selectedJob);
        // console.log("parents", selectedJobBigElement);
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "childList") {
                    console.log("Child list mutation detected");
                    if (currentLabel == 'bubble') {
                        removeLanguageBubble();
                        currentLabel = langLabelTry();
                    }
                    if (currentLabel == 'highlight') {
                        removeLanguageHighlight();
                        currentLabel = langLabelTry();
                    }
                };
            });
        });
        observer.observe(jobList, { childList: true, subtree: true });
    }, retryDelay)
}

onPageLoad()
.then((currentLabel) => {
    jobObserver(currentLabel);
})

// jobObserver(currentLabel);