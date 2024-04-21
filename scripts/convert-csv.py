import csv
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
import json

# Define the path to the CSV file
file_path = 'route-finder.csv'

# Create an empty list to store the dictionaries
data_list = []

# Open the CSV file
with open(file_path, mode='r', newline='', encoding='utf-8') as file:
    # Create a DictReader object
    csv_reader = csv.DictReader(file)
    
    # Iterate over each row in the CSV file
    for row in csv_reader:
        # Each row is already a dictionary; append it to the list
        data_list.append(row)

def get_climb_img(URL):
    try:
        page = requests.get(URL)
        soup = BeautifulSoup(page.content, "html.parser")
        element = soup.find(lambda tag: tag.has_attr('id') and tag['id'] == "carousel-item-0")
        image_url = element.find(lambda a: a.name == 'a')['href']
        page = requests.get(image_url)
        soup = BeautifulSoup(page.content, "html.parser")
        image = soup.find(lambda img: img.has_attr('class') and "main-photo" in img['class'])
        return image["src"]
    except:
         with open('errors.log', 'a') as log:
            log.write("no image found for: ")
            log.write(URL + "\n")

def get_votes(URL):
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")
    element = int(soup.find(lambda tag: tag.has_attr('id') and 'starsWithAvgText-' in tag['id']).get_text(strip=True).split(" ")[3].replace("\n", " "))
    return element

def get_area(location):
    try:
        area = location.split(">")[-5].strip() if location.split(">")[-4].strip() == "(01) Calico Basin Boulders" else location.split(">")[-4].strip()[5:]
        return area
    except:
        with open('errors.log', 'a') as log:
            log.write("no location found for: ")
            log.write(location + "\n")

all_climbs = []

for data in data_list:
    print("...Starting " + data["Route"])
    all_climbs.append({
        "route": data["Route"],
        "grade": data["Rating"],
        "stars": float(data["Avg Stars"]),
        "votes": get_votes(data["URL"]),
        "area": get_area(data["Location"]),
        "length": "" if data["Length"]=="" else int(data["Length"]),
        "latitude": data["Area Latitude"],
        "longitude": data["Area Longitude"],
        "image": get_climb_img(data["URL"]),
        "link": data["URL"]
    })

result = {"climbs": all_climbs}

with open('data.json', 'w') as json_file:
    json.dump(result, json_file, indent=4)
