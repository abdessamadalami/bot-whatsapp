const puppeteer = require("puppeteer");
var figlet = require("figlet");
// Login Function Logic
(async function main() {
  try {
    // Configures puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    //Navigates to Whatsapp
    await page.goto("https://web.whatsapp.com/");

    // //Searches person by title
    await page.waitForSelector("._2aBzC");
    await delay(6000);

    await figlet(" ", function (err, data) {
      if (err) {
        console.dir(err);
        return;
      }
      //console.log(data)

      whasappmessages(data);
    });
    async function whasappmessages(dataword) {
      //Change to contacts you want to send messages to
      var contact = ["contactname1","contactname2","contactname3"];
      var element;
      for (let index = 0; index < contact.length; index++) {
       

        element = contact[index];

        await page.click(`span[title='${element}']`);
        await page.waitForSelector("._3uxr9");

        const amountOfMessages = 4050;

        for (var i = 0; i < amountOfMessages; i++) {
          console.log(i);
          
         
          await page.evaluate(() => {
            const message = "hello word" 
           
            document.execCommand("insertText", false, message)
          });
          await page.click("span[data-testid='send']");
          
        }
      }
    }
 
  } catch (e) {
    console.error("error mine", e);
  }
})();

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}
