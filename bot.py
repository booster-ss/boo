import sys
import time
import random
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

def start_engine(url, count):
    print(f"--- Launching Booster-SS for: {url} ---")
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    for i in range(int(count)):
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
        try:
            print(f"Play #{i+1} in progress...")
            driver.get(url)
            time.sleep(random.randint(45, 65)) # Simulates human listening
            print(f"Play #{i+1} successful.")
        except Exception as e:
            print(f"Error on Play #{i+1}")
        finally:
            driver.quit()
        time.sleep(random.randint(5, 15)) # Break to avoid detection

if __name__ == "__main__":
    target_url = sys.argv[1]
    play_count = sys.argv[2]
    start_engine(target_url, play_count)

