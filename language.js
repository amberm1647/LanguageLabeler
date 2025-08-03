// find DOM object that corresponds to job desc

async function waiting() {
    console.log("Before sleep");
    await sleep(10000); // Sleep for 5 seconds
    console.log("After sleep [After 10 Seconds]");
    return true;
}
  
async function sleep(ms) {
    await new Promise((resolve) => setTimeout(resolve, ms));
}
  
// Fetches the job description from the DOM after waiting for the page to load  
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
        console.log(text);

    };
}

// Searches the jobDesc for language keywords and returns a string of found languages
async function getLanguageKeywords(jobDesc){
    // const Language_Keywords = [
    //     "german", "deutsch", "english", "français", "spanish", "italian",
    // ]
    const waited = await getJobDesc()
    console.log("Waiting finished for keyword search: ", waited);
    jobDesc = jobDesc.toLowerCase();
    const isGerman = jobDesc.includes("german") || jobDesc.includes("deutsch") || jobDesc.includes("deutschkenntnisse") ;
    const isEnglish = jobDesc.includes("english") || jobDesc.includes("englischkenntnisse");
    const isFrench = jobDesc.includes("français") || jobDesc.includes("french");
    const isSpanish = jobDesc.includes("spanish");
    const isItalian = jobDesc.includes("italian") || jobDesc.includes("italiano");

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
    // return outputString;
}

getJobDesc();

getLanguageKeywords("We are looking for a German speaking candidate with experience in software development. The role requires fluency in English and knowledge of French is a plus.");

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