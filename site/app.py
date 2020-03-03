from flask import Flask, Response, jsonify
from flask_cors import CORS
import json

# Variables
MAX_MIN_DAY = 1440
# waterDuration = 10 # in seconds
# timeBetweenWatering = 60 # in minutes
# waterStartTime = 0 # in minutes
# waterEndTime = 1440 # in minutes
waterDuration = 5 # in seconds
timeBetweenWatering = 30 # in minutes
waterStartTime = 3 # in minutes
waterEndTime = 123 # in minutes
lastWater = 0 # python time

app = Flask(__name__)
CORS(app)

def readAndInitVars():
    global waterDuration
    global timeBetweenWatering
    global waterStartTime
    global waterEndTime
    global lastWater

    file = open("variables.txt", "r")
    vars = file.readlines()
    waterDuration = int(vars[0])
    timeBetweenWatering = int(vars[1])
    waterStartTime = int(vars[2])
    waterEndTime = int(vars[3])
    lastWater = int(vars[4])

    #print(waterDuration, timeBetweenWatering, waterStartTime, waterEndTime)
    file.close()

def writeVars():
    global waterDuration
    global timeBetweenWatering
    global waterStartTime
    global waterEndTime
    global lastWater

    file = open("variables.txt", "w")
    file.write(str(waterDuration) + "\n")
    file.write(str(timeBetweenWatering) + "\n")
    file.write(str(waterStartTime) + "\n")
    file.write(str(waterEndTime) + "\n")
    file.write(str(lastWater) + "\n")
    file.close()

@app.route('/wateringDuration', methods=['GET'])
def wateringDuration():
    global waterDuration

    response = json.dumps({"timeSeconds": waterDuration})
    return Response(response = response, status = 200, mimetype = "application/json")

@app.route('/wateringDelay', methods=['GET'])
def wateringDelay():
    global timeBetweenWatering

    response = json.dumps({"timeMin": timeBetweenWatering})
    return Response(response = response, status = 200, mimetype = "application/json")

@app.route('/getWaterTimes', methods=['GET'])
def getWaterTimes():
    global waterStartTime
    global waterEndTime

    response = json.dumps({"start": waterStartTime, "end": waterEndTime})
    return Response(response=response, status=200, mimetype="application/json")

@app.route('/waterStartTime', methods=['GET'])
def waterStart():
    global waterStartTime

    response = json.dumps({"timeMin": waterStartTime})
    return Response(response = response, status = 200, mimetype = "application/json")

@app.route('/waterEndTime', methods=['GET'])
def waterEnd():
    global waterEndTime

    response = json.dumps({"timeMin": waterEndTime})
    return Response(response = response, status = 200, mimetype = "application/json")

# returns the last water time, in seconds, and the next water time, in seconds
@app.route('/nextWater', methods=['GET'])
def nextWater():
    global lastWater

    waterNext = lastWater + (timeBetweenWatering * 60)

    response = json.dumps({"lastWater": lastWater, "nextWater": waterNext})
    return Response(response = response, status = 200, mimetype = "application/json")

@app.route('/test', methods=['PUT'])
def test():
    return jsonify(sucess = True)

if __name__ == '__main__':
    readAndInitVars()
    #writeVars()
    app.run(debug = True, host='0.0.0.0', threaded = True)