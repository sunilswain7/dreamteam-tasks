#! python3
# readCensusExcel.py - Tabulates population and number of census tracts for each county.

import openpyxl, pprint

# Step 1: Open and read the spreadsheet
print('Opening workbook...')
wb = openpyxl.load_workbook('censuspopdata.xlsx')
sheet = wb['Population by Census Tract']
countyData = {}

# Step 2: Populate the data structure
print('Reading rows...')
for row in range(2, sheet.max_row + 1):
    # Extract data from each row
    state = sheet['B' + str(row)].value
    county = sheet['C' + str(row)].value
    pop = sheet['D' + str(row)].value

    # Ensure the state key exists
    countyData.setdefault(state, {})
    # Ensure the county key exists
    countyData[state].setdefault(county, {'tracts': 0, 'pop': 0})

    # Increment the number of tracts and population count
    countyData[state][county]['tracts'] += 1
    countyData[state][county]['pop'] += int(pop)

# Step 3: Write the results to a file
print('Writing results...')
resultFile = open('census2010.py', 'w')
resultFile.write('allData = ' + pprint.pformat(countyData))
resultFile.close()
print('Done.')
