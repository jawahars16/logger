const actions = require('./actions');
const { app, BrowserWindow, Menu } = require('electron');
const server = require('./server');
const path = require('path')
const url = require('url')
const { dialog } = require('electron');

let mainWindow;
let dev = false;

if (process.defaultApp || /[\\/]electron-prebuilt[\\/]/.test(process.execPath) || /[\\/]electron[\\/]/.test(process.execPath)) {
    dev = true;
}

const template = [
    {
        label: 'File',
        role: 'file',
        submenu: [
            {
                label: 'Open log file..', role: 'open', click() {
                    dialog.showOpenDialog(mainWindow, (files) => {
                        console.log(files[0]);
                        if (files === undefined) {
                            console.log('No files selected !!!');
                        } else {
                            mainWindow.webContents.send('open-file', files[0]);
                        }
                    });
                }
            }
        ]
    }];


function onAppReady() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 800, height: 600 });
    let indexPath;
    if (dev && process.argv.indexOf('--noDevServer') === -1) {
        indexPath = url.format({
            protocol: 'http:',
            host: 'localhost:3000',
            pathname: 'index.html',
            slashes: true
        });
    } else {
        indexPath = url.format({
            protocol: 'file:',
            pathname: path.join(__dirname, 'dist', 'index.html'),
            slashes: true
        });
    }

    console.log(indexPath);
    mainWindow.loadURL(indexPath);

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    const port = server.start();
}

app.on('ready', onAppReady);