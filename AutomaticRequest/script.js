var skipCoder = false;
var skipCoderCount = 0;
var lastOne = "";
function connectCoders(){

    //Scroll to bottom of page
    window.scrollTo(0,document.body.scrollHeight);

    // Find all coders listed on page as search results.
    // Store them in variable "coders".
    var coders = document.getElementsByClassName('search-result__actions--primary');

    var found = false;

    //Loop on every search result of this page !
    var countSkipFew = 0;
    for (var i =0; i<coders.length; i++){
      // Check coder for which it shows option of "Connect" as button !
      if(coders[i].innerText===("Connect")){
        if( skipCoder && countSkipFew < skipCoderCount){
            countSkipFew++;
            continue;
        }
        //Click "Connect"
        coders[i].click();
        //coder was found
        found = true;

        //Print name of coder, we just connected.
        try{

            // In case script get stuck !
            if(lastOne===coders[i].getAttribute("aria-label").split(". ")[0]){
                window.scrollTo(0,document.body.scrollHeight);
                document.querySelector('[aria-label="Next"]').click();
                skipCoder = false;
                skipCoderCount = 0;
                return;
            }

            lastOne = coders[i].getAttribute("aria-label").split(". ")[0];
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
                skipCoder = true;
                skipCoderCount++;
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
   // If no coder was found on this page lets try next page
    else{
		if(!!document.querySelector('[data-test="no-results-cta"]')){
            //If page is showing error page, refresh the results !
            document.querySelector('[data-test="no-results-cta"]').click();
        }else{
            // Click and load next page as no coders left on this page !
            // scroll bottom
            window.scrollTo(0,document.body.scrollHeight);
            document.querySelector('[aria-label="Next"]').click();
            skipCoder = false;
            skipCoderCount = 0;
        }
    }
}

setInterval(connectCoders,5000);
//Connect one coder per 5 seconds.
