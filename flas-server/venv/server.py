import json, os
from flask import Flask,jsonify,Response, request



app = Flask(__name__)
print("start")





@app.route('/api/flight/search')                        #returning clean data
def search():
    args = request.args
    result = [{}]
    
    print(args['oneWay'])
    print('above')
    if args['oneWay']=='true':
     result=one_way_flights(args)                                  # ONE WAY FLIGHT   
    else:
     result=round_trip_flights(args)
        
    
    return jsonify(result)










def round_trip_flights(args):
    print('entered')
    result = [{}]
    with open('D:\\snproject\\flightsAPI\\flas-server\\venv\\raw_data_RT.json', encoding="utf8") as f:
        raw_data_RT = json.load(f)
    for flight in raw_data_RT:
        ID=flight['ID']
        AveragePrice=flight["AveragePrice"]
        CurrencySymbol=flight["CurrencySymbol"]

        


        Key=flight['Segments'][0]['Key']                                 # key for data of forward flight

        keySplit = Key.split('-')
        keySplit2 = keySplit[1].split(':')
        keySplitForDate = keySplit[2].split(' ')
        keySplitForDate2=keySplitForDate[0].split('/')
        dayF = keySplitForDate2[0]   
        monthF = keySplitForDate2[1] 
        yearF = keySplitForDate2[2]

        returnKey = flight['Segments'][len(flight['Segments'])-1]['Key']       # key for data of return flight

        returnKeySplit = returnKey.split('-')
        returnKeySplit2 = returnKeySplit[1].split(':')
        returnKeySplitForDate = returnKeySplit[2].split(' ')
        returnKeySplitForDate2=returnKeySplitForDate[0].split('/')
        dayB = returnKeySplitForDate2[0]   
        monthB = returnKeySplitForDate2[1] 
        yearB = returnKeySplitForDate2[2]


        argsSlpit = (args['dateDep'].split('-'))        #Split for requested dates (from client passed data)
        reqYearF = argsSlpit[0]
        reqMonthF = argsSlpit[1]
        reqDayF = argsSlpit[2]

        argsSlpit = (args['dateReturn'].split('-'))        #Split for requested dates (from client passed data)
        reqYearB = argsSlpit[0]
        reqMonthB = argsSlpit[1]
        reqDayB = argsSlpit[2]

        # ss=flight['Segments']['Legs']
        # print(ss)
        legSize = len(flight['Segments'][0]['Legs'])
        arr = flight['Segments'][0]['Legs'][legSize-1]['ArrivalPoint']['AirportCode']


        if keySplit2[0] == args['dep'] and arr==args['arr'] and yearF==reqYearF and monthF==reqMonthF and dayF==reqDayF and yearB==reqYearB and monthB==reqMonthB and dayB==reqDayB:  # just add dates comparison
            # print("ENTERED IFF")
            string1 = {'ID': ID,'Segments': flight['Segments'], 'AveragePrice': AveragePrice, 'CurrencySymbol': CurrencySymbol}
            result.append(string1)
    print('this is result2')
    return (result)









def one_way_flights(args):
    print('ONE WAY')
    result = [{}]
    with open('D:\\snproject\\flightsAPI\\flas-server\\venv\\raw_data.json', encoding="utf8") as f:
        data = json.load(f)
    for flight in data:
        ID=flight['ID']                                 #access raw data, relevant info for client
        Key=flight['Segments'][0]['Key']
        AveragePrice=flight["AveragePrice"]
        CurrencySymbol=flight["CurrencySymbol"]

        keySplit = Key.split('-')
        keySplit2 = keySplit[1].split(':')             #split for Departure and Arrival locations (from key)

        keySplitForDate = keySplit[2].split(' ')        #split for dates of flights (from key)
        keySplitForDate2=keySplitForDate[0].split('/')
        day = keySplitForDate2[0]   #
        month = keySplitForDate2[1] 
        year = keySplitForDate2[2]
        # print(args['dateDep'])
        argsSlpit = (args['dateDep'].split('-'))        #Split for requested dates (from client passed data)
        reqYear = argsSlpit[0]
        reqMonth = argsSlpit[1]
        reqDay = argsSlpit[2]



        if keySplit2[0] == args['dep'] and keySplit2[len(keySplit2)-1]==args['arr'] and year==reqYear and month==reqMonth and day==reqDay:  # just add dates comparison
            #print("ENTERED IFF")
            string1 = {'ID': ID,'Segments': flight['Segments'], 'AveragePrice': AveragePrice, 'CurrencySymbol': CurrencySymbol}
            result.append(string1)
    print('this is result3')
    return (result)






if __name__ == "__main__":
    # app.run(debug=True)
    app.run(port=8888)



















# with open('D:\\snproject\\flightsAPI\\flas-server\\venv\\raw_data.json', encoding="utf8") as f:
#     data = json.load(f)


# @app.route('/api/flight/search')                        #returning clean data
# def search():
#     args = request.args
#     # print(data)
#     result = [{}]
#     # print(args['arr'])
#     # print(args['dep'])
#     if args['oneWay']:                                  # ONE WAY FLIGHT
#      for flight in data:
#         ID=flight['ID']                                 #access raw data, relevant info for client
#         Key=flight['Segments'][0]['Key']
#         AveragePrice=flight["AveragePrice"]
#         CurrencySymbol=flight["CurrencySymbol"]

#         keySplit = Key.split('-')
#         keySplit2 = keySplit[1].split(':')             #split for Departure and Arrival locations (from key)

#         keySplitForDate = keySplit[2].split(' ')        #split for dates of flights (from key)
#         keySplitForDate2=keySplitForDate[0].split('/')
#         day = keySplitForDate2[0]   #switched 18:57 thues
#         month = keySplitForDate2[1] #switched 18:57 thues
#         year = keySplitForDate2[2]
#         # print(args['dateDep'])
#         argsSlpit = (args['dateDep'].split('-'))        #Split for requested dates (from client passed data)
#         reqYear = argsSlpit[0]
#         reqMonth = argsSlpit[1]
#         reqDay = argsSlpit[2]



#         if keySplit2[0] == args['dep'] and keySplit2[len(keySplit2)-1]==args['arr'] and year==reqYear and month==reqMonth and day==reqDay:  # just add dates comparison
#             print("ENTERED IFF")
#             string1 = {'ID': ID,'Segments': flight['Segments'], 'AveragePrice': AveragePrice, 'CurrencySymbol': CurrencySymbol}
#             result.append(string1)
#     print('this is result')
#     return jsonify(result)





        # print(keySplit2[0])
        # print(args['dep'])
        # print(arr)
        # print(args['arr'])
        # print(yearB)
        # print(reqYearB)
        # print(monthB)
        # print(reqMonthB)
        # print(dayB)
        # print(reqDayB)
        # print(yearB)
        # print(reqYearB)
        # print(monthB)
        # print(reqMonthB)
        # print(dayB)
        # print(reqDayB)

