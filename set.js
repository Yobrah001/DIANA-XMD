const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUxWR2hJTDFreVZiTnRGVDlhMU44RlhaZTNDMTlGQXBJK3p2ckZsSHZtVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicTRYelpaREd5MXRoa3p3QTF0WDVwQ3FKZkltSWdLdzcrVStCSmdIbWN6ST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3TEk5UW1Gazhsc3dRRHd2c3ZEaHVSNWdDWUwxNWtzSXRtRzBvVU5SbVZnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5Y0taMmtBT0FDV0IycldRZ3dDSDVBKzlmcDlSTHREZmNrK1JwaW0vajNvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJKbnJmSHZ5WCt3ekUvZmxleEdEMFJocjFmb3ZCOCttdG9UbHk0UWNXVXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJOajNzWURsL1dhVGw3V09BZldSWXJmb1JRcVA5UG9QTW1tUWJrVnRIUUU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0lTWGE3QW92T1ErVjhkYVF5YXFJUm82Uk82OTdzUUQ5aW1qU1ZzNitIRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTWgvS1hxc2N1eFVBd2d4VGRBdDBCRUNZZVdWVkJyTEtqWDhvTURJSy9BST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkowN2hmRDRZc2V5OG9zb0xvWEFzSkFRdng0aHhQQm85QmdyMHVPdUdnS2F2WXhOaFduTWdGWVBHZXA0eEFEWVlhMUR3R1pWZVc4a1FPWHh4aHNXOUNRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzksImFkdlNlY3JldEtleSI6ImhrOWczQlBmcTBHcUtOT21jcERueGdsTVlPUGprVklGNWpkR25VaG9KUTQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMTgyOTIyODA1MjdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRTg1QTU4NEM2QjI4NEQ2MjdCNkVCRDZGRkU1NjE1NDkifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NDgzODQ0MX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMTgyOTIyODA1MjdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMjBDMzJBNkZBQkFGMERGMzQyNUE1MUE4RDRBNDk4MzkifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NDgzODQ2OX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiRUNSU0ZCWjEiLCJtZSI6eyJpZCI6IjE4MjkyMjgwNTI3OjE0QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdmYjwnZmNIPCdkInwnZCA8J2QjPCdkITwnZCSIPCdkIHwnZCR8J2QmPCdkIDwnZCNIPCdmYvwnZi/8J2ZgiDwnZmU8J2ZiSIsImxpZCI6IjcyOTcyMDQ4MDQwMTU5OjE0QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSUtBMko0RUVJL3I0c1FHR0E0Z0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiL0NCYlJpS2hGcTUzUW5sV0VieHp5cmxkMUFaYy9DRElrbEphalkvWDYzUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZWEwVWNSSWoxTTZCK2tiRUxDRmxGc25CMUV4bTBuUEN3Zk1Qa1F5cnVwRmtocDJtSVppOUdaVWR0dU5EWlBnV3EyMVNOYXVDRzY4SFBhdXhtU3NkRGc9PSIsImRldmljZVNpZ25hdHVyZSI6IjBmbS9CU084UzBQS0kyay81YzN0Mk9PbGZ3ZXZ3OXo2VDhqS0pEME9rZTliSHRvN0MxcjNyMStLTG1Kczdld1NCOW44b0RqdExYSmtDVmM5SUxTWkNRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMTgyOTIyODA1Mjc6MTRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZndnVzBZaW9SYXVkMEo1VmhHOGM4cTVYZFFHWFB3Z3lKSlNXbzJQMSt0MCJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FVSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzU0ODM4NDI3LCJsYXN0UHJvcEhhc2giOiIyVjc3cVUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUw3MiJ9 ',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/QUEEN-DIANA/DIANA-XMD',
    OWNER_NAME : process.env.OWNER_NAME || "𝙈𝙍 𝐉𝐀𝐌𝐄𝐒 𝐁𝐑𝐘𝐀𝐍 𝙋𝘿𝙂 𝙔𝙉",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "18292280527",
    DEV : process.env.DEV || "𝗗𝗜𝗔𝗡𝗔 𝗢𝗙𝗙𝗜𝗖𝗜𝗔𝗟",
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT : process.env.AUTO_REACTION || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "yes",
    AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/v1or1h.jpg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/wh3gx1.jpg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'no',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    GREET : process.env.GREET_MESSAGE || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By DIANA-XMD',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    ANTI_BUG : process.env.ANTI_BUG || "no",
    ANTI_MENTION_GROUP : process.env.ANTI_MENTION_GROUP || "on",
    ANTI_TAG : process.env.ANTI_TAG || "on",
    ANTI_BAD : process.env.ANTI_BAD || "on",
    ANTI_SHARE_GROUP : process.env.ANTI_SHARE_GROUP || "on",
    ANTI_LINK_GROUP : process.env.ANTI_LINK_GROUP || "on",
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VbA8bWXKmCPZ2EFhAA0Y",
    WEBSITE :process.env.GURL || "https://queen-diana-pair.onrender.com",
    CAPTION : process.env.CAPTION || "𝙈𝙍 𝐉𝐀𝐌𝐄𝐒 𝐁𝐑𝐘𝐀𝐍 𝙋𝘿𝙂 𝙔𝙉",
    BOT : process.env.BOT_NAME || '𝙈𝙍 𝐉𝐀𝐌𝐄𝐒 𝐁𝐑𝐘𝐀𝐍 𝙋𝘿𝙂 𝙔𝙉',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGES || 'no',
    ANTI_DELETE_GROUP : process.env.ANTI_DELETE_GROUP || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes', 
    VOICE_CHATBOT_INBOX : process.env.VOICE_CHATBOT_INBOX || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
