# Get Me Out
## Description
**Get Me Out** is a 3D web game created using Three.js graphics library. You can check the final product from this link [here](https://bipinmdr07.github.io/Get_Me_Out/)

## Used libraries
* [Three.js](https://threejs.org/)
* THREEx.Keyboard

## How to run
First you need to have the project on your computer.
You can download the project as zip file from: https://github.com/bipinmdr07/Get_Me_Out,  
or clone the project using ssh:
```
git clone git@github.com:bipinmdr07/Get_Me_Out.git
```
or using https,
```
git clone https://github.com/bipinmdr07/Get_Me_Out.git
```
Now you need open index.html file in your browser.
You can do this using either of these methods.
### 1. Loading from external files  
Double click the index.html file or use open with to open the html file.  
**NOTE* this process may not be supported by all browsers**  

### 2. Running files form local server  
#### * Node.js server  
Node.js has a simple HTTP server package. To install:  
```
npm install http-server -g
```
To run (from your local directory):
```
http-server . -p 8000
```
#### * Python server
If you have [python](https://www.python.org/) installed, it should be enough to run this from a command line (from your working directory):  
```
//Python 2.x
python -m SimpleHTTPServer

//Python 3.x
python -m http.server
```
This will serve files from the current directory at localhost under port 8000, i.e in the address bar type:
```
http://localhost:8000/
```
and check out other server  options [here](https://threejs.org/docs/index.html#manual/introduction/How-to-run-thing-locally)
