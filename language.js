// find DOM object that corresponds to job desc
const jobDesc = document.getElementById("job-details");
if(jobDesc) {
    console.log("jobDesc found");
    var text = [];
    jobDesc.childNodes.forEach((node) => {
        text.push(node.textContent);
    });
    console.log(text);

};

// compare to list of language names ie german, deutsch, english, etc

// parse w/ regex and find language keywords

// create html/css for label to add

// create instance of label, add to DOM