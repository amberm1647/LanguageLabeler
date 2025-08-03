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

getJobDesc();

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