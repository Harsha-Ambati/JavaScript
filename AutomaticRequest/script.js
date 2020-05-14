var skipLink = false;
var skipLinkCount = 0;
var lastOne = "";
function connectPeople(){

    //Scroll to bottom of page
    window.scrollTo(0,document.body.scrollHeight);

    // Find all people listed on page as search results.
    // Store them in variable "cybersec".
    var cybersec = document.getElementsByClassName('search-result__actions--primary');

    var found = false;

    //Loop on every search result of this page !
    var countSkipFew = 0;
    for (var i =0; i<cybersec.length; i++){
      // Check people for which it shows option of "Connect" as button !
      if(cybersec[i].innerText===("Connect")){
        if( skipLink && countSkipFew < skipLinkCount){
            countSkipFew++;
            continue;
        }
        //Click "Connect"
        cybersec[i].click();
        //coder was found
        found = true;

        //Print name of people, we just connected.
        try{

            // In case script get stuck !
            if(lastOne===cybersec[i].getAttribute("aria-label").split(". ")[0]){
                window.scrollTo(0,document.body.scrollHeight);
                document.querySelector('[aria-label="Next"]').click();
                skipLink = false;
                skipLinkCount = 0;
                return;
            }

            lastOne = cybersec[i].getAttribute("aria-label").split(". ")[0];
            console.log(lastOne);

        }catch(err){}
        // and break loop !
        // so that we dont send
        // so many request in one go
        // we will wait for 3 seconds
        break;
      }
    }

    // Either we have connected with everyone on this page or some are left.

    // If coder we found connected !
    if(found){
        try{
            if(!!document.querySelector('label[for="email"]')){
                skipLink = true;
                skipLinkCount++;
            }

            // Check if any pop up comes then send a request by clicking "Send Now"
            var buttons = document.getElementsByClassName('artdeco-button__text');
            for (var i=0 ; i<buttons.length; i++){
                //Find button "Send now"
                if(buttons[i].innerText===("Send now")||buttons[i].innerText===("Done")){
                    //Click button Send now
                    buttons[i].click();
                    //Print "Request sent"
                    console.log("Request sent");
                }
            }
        }catch(err){
        }
    }
   // If no people was found on this page lets try next page
    else{
		if(!!document.querySelector('[data-test="no-results-cta"]')){
            //If page is showing error page, refresh the results !
            document.querySelector('[data-test="no-results-cta"]').click();
        }else{
            // Click and load next page as no cybersec left on this page !
            // scroll bottom
            window.scrollTo(0,document.body.scrollHeight);
            document.querySelector('[aria-label="Next"]').click();
            skipLink = false;
            skipLinkCount = 0;
        }
    }
}

setInterval(connectPeople,5000);
//Connect one people per 5 seconds.
