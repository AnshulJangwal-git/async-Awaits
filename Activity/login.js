const puppeteer = require("puppeteer") ;

const id = "jangwal006@gmail.com" ;
const pw = "PRANJAl@006" ;

let challenges = require("./challenges") ;



(async function login(){

    let browser = await puppeteer.launch({
        headless : false ,
        defaultViewport : null ,
        args : ["--start maximised"] ,
        slowMo : 100

    }) ;
    let pages = await browser.pages() ;
    let tab = pages[0] ;

    await tab.goto("https://www.hackerrank.com/auth/login") ;
    await tab.type("#input-1", id) ;
    await tab.type("#input-2", pw) ;
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled") ;

    await tab.waitForSelector('div[data-analytics = "NavBarProfileDropDown"]', {visible : true}) ;
    await tab.waitForTimeout(2000) ;

    let element = await tab.$('div[data-analytics = "NavBarProfileDropDown"]') ;
    await element.click() ;

    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]', {visible : true}) ;
    await tab.waitForTimeout(2000) ;
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]') ;

    await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li", {visible : true}) ;
    await tab.waitForTimeout(2000) ;
    let bothLis = await tab.$$(".nav-tabs.nav.admin-tabbed-nav li") ;

    let manageChallenges = bothLis[1] ;
    await manageChallenges.click() ;

    await tab.waitForSelector(".btn.btn-green.backbone.pull-right", {visible : true}) ;

    let createChallengeElement = await tab.$(".btn.btn-green.backbone.pull-right") ;
    let createChallengeLink = await tab.evaluate( function(elem) { return elem.getAttribute("href") ; }, createChallengeElement) ;

    createChallengeLink = "https://www.hackerrank.com" + createChallengeLink ;

    // console.log(createChallengeLink) ;
    for(let i = 0; i < challenges.length; i++){
        await addChallenges(browser, createChallengeLink, challenges[i]) ;
    }
 
})() ;

async function addChallenges(browser, createChallengeLink, challenge){
    try{
        let newTab = await browser.newPage() ;
        //add one challenge 
        //tab, challenge
    
        await newTab.goto(createChallengeLink) ;
        
    
        let challengesName = challenge["Challenge Name"] ;
        let description = challenge["Description"] ;
        let problemStatement = challenge["Problem Statement"] ;
        let inputFormat = challenge["Input Format"] ;
        let constraints = challenge["Constraints"] ;
        let outputFormat = challenge["Output Format"] ;
        let tags = challenge["Tags"] ;
    
        await newTab.waitForTimeout(2000) ;
        await newTab.type("#name", challengesName) ;
        await newTab.type("#preview", description) ;
        await newTab.type("#problem_statement-container .CodeMirror textarea", problemStatement) ;
        await newTab.type("#input_format-container .CodeMirror textarea", inputFormat) ;
        await newTab.type("#constraints-container .CodeMirror textarea", constraints) ;
        await newTab.type("#output_format-container .CodeMirror textarea", outputFormat) ;
        await newTab.type("#tags_tag", tags) ;
    
        await newTab.keyboard.press("Enter") ;
        await newTab.click(".save-challenge.btn.btn-green") ;
    
        await newTab.waitForTimeout(3000) ;
        await newTab.close() ;

    }catch(error){
        console.log(error) ;
    }
   

}