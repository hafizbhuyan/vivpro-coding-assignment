import json
import csv
import pandas as pd

columns = []

def main():
    with open('playlist.json', 'r') as json_file:
        data = json.load(json_file)
        for item in data:
            columns.append(item)
        result = pd.DataFrame(data, columns=columns)
        result.to_excel('output.xlsx')

main()