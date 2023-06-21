function PageGreens() {
    var paths = document.querySelectorAll("path"),
    i;

    for (i = 0; i < paths.length; ++i) {
        paths[i].setAttribute('style', 'fill:#75fd46');
        paths[i].setAttribute('fill', '#75fd46');
    }

    var items = document.getElementsByClassName("item-name");
    for(var i = 0; i < items.length; i++) {
        items[i].className = "item-name";
    }
    
    //var old_document = document;
    //var new_document = old_document.cloneNode(true);
    //old_document.parentNode.replaceChild(new_document, old_document);

    document.addEventListener("click", function() {
        var paths = document.querySelectorAll("path"), i;

        for (i = 0; i < paths.length; ++i) {
            paths[i].setAttribute('style', 'fill:#75fd46');
            paths[i].setAttribute('fill', '#75fd46');
        }

        var items = document.getElementsByClassName("item-name");
        for(var i = 0; i < items.length; i++) {
            items[i].className = "item-name";
        }
        
    });
}

function PageNoGreens() {
    var paths = document.querySelectorAll("path"),
    i;

    for (i = 0; i < paths.length; ++i) {
        paths[i].setAttribute('style', 'fill:currentColor');
        paths[i].setAttribute('fill', 'currentColor');
    }

    var items = document.getElementsByClassName("item-name");
    for(var i = 0; i < items.length; i++)
    {
        items[i].className = "item-name !text-gray-500";
    }
    
    //var old_document = document;
    //var new_document = old_document.cloneNode(true);
    //old_document.parentNode.replaceChild(new_document, old_document);

    document.addEventListener("click", function() {
        var paths = document.querySelectorAll("path"), i;

        for (i = 0; i < paths.length; ++i) {
            paths[i].setAttribute('style', 'fill:currentColor');
            paths[i].setAttribute('fill', 'currentColor');
        }

        var items = document.getElementsByClassName("item-name");
        for(var i = 0; i < items.length; i++)
        {
            items[i].className = "item-name !text-gray-500";
        }
    });
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

const extensions = 'https://kick.com';

console.log(extensions);


chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(extensions)) {
        console.log(tab.url);
        // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
        // Next state will always be the opposite
        const nextState = prevState === 'ON' ? 'OFF' : 'ON'

        // Set the action badge to the next state
        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
        });

        if (nextState === "ON") {
            // Insert the CSS file when the user turns the extension on
            await chrome.scripting.insertCSS({
                files: ["conduit-greens.css"],
                target: { tabId: tab.id },
            });

            if(!tab.url.includes('chrome://')){
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    function: PageGreens
                });
            }
        } else if (nextState === "OFF") {
            // Remove the CSS file when the user turns the extension off
            await chrome.scripting.removeCSS({
                files: ["conduit-greens.css"],
                target: { tabId: tab.id },
            });

            if(!tab.url.includes('chrome://')){
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    function: PageNoGreens
                });
            }
        }
    }
});