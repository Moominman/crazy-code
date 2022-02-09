import hmac
import hashlib
import requests
from datetime import datetime

#set variables for pre-script
ApiConsumerKey = "[API Key goes here]"
ApiUrl = "https://api.rmintegris.com"
ApiConsumerSecret = "[API Secret goes here]"
secretstr = bytes(ApiConsumerSecret, 'ascii')

#convert date-time to integer then string
now = ((datetime.now()) - datetime(1970, 1, 1)).total_seconds()*1000
nowasint = int(now)
Timestamp = f'{nowasint}'

CanonicalString = "GET\\n" + Timestamp + "\\n\\n\\n/v1/establishments/999/students?page=1"

canonstr = bytes(CanonicalString, 'ascii')
#for byte in canonstr:
    #print(byte, end='')
#print("\n")

ContentType = ""
ContentMD5 = ""

Signature = hmac.new(secretstr, canonstr, hashlib.sha256).hexdigest()
print("\n" + Signature + "\n")
print(Timestamp)

url = "https://api.rmintegris.com/v1/establishments/999/students?page=1"

payload={'ApiConsumerKey': '[API Consumer Key]',
         'Signature': Signature,
         'ApiUrl': 'https://api.rmintegris.com',
         'ApiConsumerSecret': '[API Consumer Secret]',
         'CanonicalString': CanonicalString,
         'ContentMD5': '',
         'Timestamp': Timestamp
         }
headers = {
  'Authorization': 'Integris id=[ID goes here] mac=' + Signature + ' md5="" ts=' + Timestamp
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
