import sys
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

recipient = sys.argv[1]
message = sys.argv[2]

# Username Login
browser = webdriver.Firefox()
browser.get('https://accounts.google.com/signin/v2/identifier?service=mail')
id_elem = browser.find_element_by_name('identifier')
id_elem.send_keys('sunilcopy1@gmail.com')
id_elem.send_keys(Keys.ENTER)
time.sleep(3)

# Password Login
pass_elem = browser.find_element_by_name('password')
pass_elem.send_keys('changeD@4321')
pass_elem.send_keys(Keys.ENTER)
time.sleep(5)

# Compose
compose_elem = browser.find_element_by_class_name('z0')
compose_elem.click()
time.sleep(5)

# Recipient
to_elem = browser.find_element_by_name('to')
to_elem.send_keys(recipient)

# Message
to_elem.send_keys(Keys.TAB + Keys.TAB + message + Keys.TAB + Keys.ENTER)
time.sleep(5)

browser.quit()