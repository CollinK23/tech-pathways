import re
import json

data = """

"""

pattern = r"^(.+)\n(?:.+)\n\n(?:.+\n)*\$(\d+(?:\.\d{2})?) / hr"

matches = re.findall(pattern, data, re.MULTILINE)

parsed_data = {}

for match in matches:
    company_name, hourly_rate = match
    parsed_data[company_name.strip().lower()] = float(hourly_rate)

with open('output.json', 'w') as json_file:
    json.dump(parsed_data, json_file, indent=2)