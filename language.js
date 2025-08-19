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
    console.log("Running getJobDesc");
    const jobDesc = document.getElementById("job-details");
    if(jobDesc) {
        console.log("jobDesc found");
        var text = [];
        jobDesc.childNodes.forEach((node) => {
            text.push(node.textContent);
        });
        return text;
    };
}

function flattenText(acquired_text) {
    console.log("Running flattenText");
    var arrayLength = acquired_text.length;
    for (var i = 0; i < arrayLength; i++) {
        acquired_text[i] = acquired_text[i].trim();
        acquired_text[i] = acquired_text[i].replace(/\s+/g, " ");
        acquired_text[i] = acquired_text[i].replace(/\n/g, " ");
        acquired_text[i] = acquired_text[i].concat(acquired_text[i]," ");
    }
    var all_text = acquired_text.join(",");
    all_text = all_text.replace(" , , , ,", " ");
    all_text = all_text.replace(" ,", "");
    all_text = all_text.toLowerCase();
    return all_text;
}



// Searches the jobDesc for language keywords and returns a string of found languages
function getLanguageKeywords(fullText){
    console.log("Running getLanguageKeywords");
    const isGerman = fullText.includes(/\bgerman\b/i) || fullText.includes("deutsch") || fullText.includes("deutschkenntnisse") ;
    const isEnglish = fullText.includes("english") || fullText.includes("englischkenntnisse");
    const isFrench = fullText.includes("français") || fullText.includes("french");
    const isSpanish = fullText.includes("spanish");
    const isItalian = fullText.includes("italian") || fullText.includes("italiano");
    const isPortuguese = fullText.includes("portuguese");

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
    if (isPortuguese) {
        output.push("Portuguese");
    }
    output.sort();
    const outputString = output.join(", ");
    console.log("Language Keywords found: ", outputString);
    return outputString;
}

function addLanguageBubble(fullText){
    console.log("Running addLanguageBubble");
    var parent = document.getElementsByClassName("job-details-fit-level-preferences");
    var ref = parent[0];
    var kids = ref.children;
    var child = kids[0];

    var languageLabel = child.cloneNode(true);
    var outputLabel = "";
    if (fullText === "") {
        outputLabel = "No Language Specified";
    } else {
        const outputStr = "Languages: ";
        outputLabel = outputStr.concat(fullText);
    }
    
    languageLabel.innerText = outputLabel;

    ref.insertBefore(languageLabel,null);
    return "bubble";
}

function addLanguageHighlight(fullText){
    console.log("Running addLanguageHighlight");
    var parent = document.getElementsByClassName("job-details-jobs-unified-top-card__job-insight job-details-jobs-unified-top-card__job-insight--highlight");
    var ref = parent[0];

    var example_detail = document.getElementsByClassName("job-details-jobs-unified-top-card__job-insight-view-model-secondary");

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
    console.log("attempted to remove highlight.");
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

async function jobObserver(currentLabel, retryDelay = 500){
    setTimeout(() => {
        var selectedJob = document.querySelector('div[aria-current="page"]');
        if (!selectedJob) {
            console.log("job var not found yet, retrying...");
            jobObserver(retryDelay + 100);
            return;
        }
        console.log('currentLabel', currentLabel);
        var selectedJobBigElement = selectedJob.parentElement.parentElement;
        var jobList = selectedJobBigElement.parentElement;
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "childList") {
                    console.log("Child list mutation detected");
                    try{
                        removeLanguageBubble();
                        currentLabel = generalRunner();
                    }
                    catch(err){
                        // removeLanguageHighlight();
                        currentLabel = generalRunner();
                    }
                };
            });
        });
        observer.observe(jobList, { childList: true, subtree: true });
    }, retryDelay)
}

async function generalRunner(){
    console.log("Running generalRunner");
    jobText = getJobDesc();
    flattened = flattenText(jobText);
    keywordsStr = getLanguageKeywords(flattened);
    labelType = langLabelTry(keywordsStr);
    return labelType;
}

async function main() {
    waiting()
    .then(() => {
        generalRunner();
        jobObserver(labelType);
        return labelType;
    })
}

main();