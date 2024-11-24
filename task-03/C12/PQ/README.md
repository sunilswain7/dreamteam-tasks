1. Briefly describe the differences between the webbrowser, requests, bs4, and selenium modules.
   -> webbrowser has an open method which is used to open a browser with a specific url, requests module can be used to download files and data, bs4 module parses html selenium module is used to launch and control a browser.

2. What type of object is returned by requests.get()? How can you access the downloaded content as a string value?
   -> it returns a response object which has a text attribute that includes the downloaded content as a string.

3. What requests method checks that the download worked?
   -> raise_for_status() method checks that the download worked.

4. How can you get the HTTP status code of a requests response?
   -> you can use the status_code attribute of the response object.

5. How do you save a requests response to a file?
   -> first, open a file in wb mode, then use a for loop to iterate over the response's iter_content method and write chunks to the file.

6. What is the keyboard shortcut for opening a browser's developer tools?
   -> f12 or ctrl+shift+c.

7. How can you view (in the developer tools) the HTML of a specific element on a web page?
   -> Right-click the element on the page and select Inspect Element from the dropdown menu.

8. What is the CSS selector string that would find the element with an id attribute of main?
   -> #main

9. What is the CSS selector string that would find the elements with a CSS class of highlight?
   -> .highlight

10. What is the CSS selector string that would find all the <div> elements inside another <div> element?
    -> div div

11. What is the CSS selector string that would find the <button> element with a value attribute set to favorite?
    -> button[value="favorite"]

12. Say you have a Beautiful Soup Tag object stored in the variable spam for the element <div>Hello, world!</div>. How could you get a string 'Hello, world!' from the Tag object?
    -> spam.get_text()

13. How would you store all the attributes of a Beautiful Soup Tag object in a variable named linkElem?
    -> linkElem.attrs

14. Running import selenium doesn’t work. How do you properly import the selenium module?
    -> from selenium import webdriver

15. What’s the difference between the find*element*_ and find*elements*_ methods?
    -> find*element*_ returns the first matching element as a WebElement object.
    -> find*elements*_ returns a list of all matching elements.

16. What methods do Selenium’s WebElement objects have for simulating mouse clicks and keyboard keys?
    -> use click() for mouse clicks and send_keys() for keyboard keys.

17. You could call send_keys(Keys.ENTER) on the Submit button’s WebElement object, but what is an easier way to submit a form with selenium?
    -> call the submit() method on any element within the form.

18. How can you simulate clicking a browser’s Forward, Back, and Refresh buttons with selenium?
    -> use forward(), back(), and refresh() methods.
