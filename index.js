require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.DirectMessages,
    ],
    partials: [Partials.Channel , Partials.Message, Partials.GuildMember]
});

client.setMaxListeners(50);

client.once('ready', () => {
    console.log(`bot is ready ${client.user.tag}`);
});

const startingFolder = path.join(__dirname, 'starting');
fs.readdirSync(startingFolder).forEach(file => {
    if (file.endsWith('.js')) {
        const startingModule = require(path.join(startingFolder, file));
        if (typeof startingModule === 'function') {
            startingModule(client);
            console.log(`Loaded starting: ${file}`);
        }
    }
});

const logFolder = path.join(__dirname, 'logs');
    fs.readdirSync(logFolder).forEach(file => {
     if (file.endsWith('.js')) {
         const logsModule = require(path.join(logFolder, file));
            if (typeof logsModule === 'function') {
             logsModule(client);
             console.log(`Loaded logs: ${file}`);
         }
     }
});

 //const VCtempFolder = path.join(__dirname, 'vctemp');
 //fs.readdirSync(VCtempFolder).forEach(file => {
 //    if (file.endsWith('.js')) {
 //        const vctempModule = require(path.join(VCtempFolder, file));
 //        if (typeof vctempModule === 'function') {
 //            vctempModule(client);
 //            console.log(`Loaded vctemp: ${file}`);
 //        }
 //    }
 //});

 const cmdAdminFolders = path.join(__dirname, 'cmdAdmin');
 fs.readdirSync(cmdAdminFolders).forEach(file => {
     if (file.endsWith('.js')) {
         const cmdAdminModule = require(path.join(cmdAdminFolders, file));
         if (typeof cmdAdminModule === 'function') {
             cmdAdminModule(client);
             console.log(`Loaded cmdAdmin: ${file}`);
         }
     }
 });

// const clsysFolders = path.join(__dirname, 'clsys');
// fs.readdirSync(clsysFolders).forEach(file => {
//     if (file.endsWith('.js')) {
//         const clsysModule = require(path.join(clsysFolders, file));
//         if (typeof clsysModule === 'function') {
//             clsysModule(client);
//             console.log(`Loaded clsys: ${file}`);
//         }
//     }
// });

const serverFolders = path.join(__dirname, 'server');
fs.readdirSync(serverFolders).forEach(file => {
    if (file.endsWith('.js')) {
        const serverModule = require(path.join(serverFolders, file));
        if (typeof serverModule === 'function') {
            serverModule(client);
            console.log(`Loaded serversys: ${file}`);
        }
    }
});

client.login(process.env.TOKEN);