# Filename:  email_ip.py
# Path:  /home/username/IoT/EmailStartup/email_ip.py
# Command Line Run:  sudo python3 /home/username/IoT/EmailStartup/email_ip.py

import subprocess
import smtplib
from email.mime.text import MIMEText
import datetime
import time

# Email Account Information
to = 'kaym@seattleu.edu' # Email to send to.
gmail_user = 'kaym.raspi@gmail.com' # Email to send from. (MUST BE GMAIL)
gmail_password = 'harryistheworstdog' # Gmail password.

# Connect to SMTP server
smtpserver = smtplib.SMTP('smtp.gmail.com', 587) # Server to use.
smtpserver.ehlo() # Says 'hello' to the server
smtpserver.starttls() # Start TLS encryption
smtpserver.login(gmail_user, gmail_password) # Log in to server

today = datetime.date.today() # Get current time/date

# Get SSID address
arg='iwgetid' # Linux command to retrieve ip addresses.
# Runs 'arg' in a 'hidden terminal'.
p=subprocess.Popen(arg,shell=True,stdout=subprocess.PIPE)
returndata = p.communicate() # Get data from 'p terminal'.
ssid_name = str(returndata[0])
ssid_name = ssid_name[19:-4]
#print(ssid_name)

# Get IP address
arg='hostname -I' # Linux command to retrieve ip addresses.
# Runs 'arg' in a 'hidden terminal'.
p=subprocess.Popen(arg,shell=True,stdout=subprocess.PIPE)
returndata = p.communicate() # Get data from 'p terminal'.
ip_address = str(returndata[0])
ip_address = ip_address[2:-3]
# print(ip_address)

# Creates the text, subject, 'from', and 'to' of the message.
text = 'Network Name: ' + ssid_name + '\n' + 'IP Address: '+ ip_address
#print(text)
msg = MIMEText(text)
msg['Subject'] = 'IP For RaspberryPi on %s' % today.strftime('%b %d %Y')
msg['From'] = gmail_user
msg['To'] = to

# Sends the message
smtpserver.sendmail(gmail_user, [to], msg.as_string())
to = 'ludwigg@seattleu.edu' # second email to send to
msg['To'] = to
smtpserver.sendmail(gmail_user, [to], msg.as_string())
# Closes the smtp server.
smtpserver.quit()
