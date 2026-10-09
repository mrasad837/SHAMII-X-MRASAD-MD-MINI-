const { cmd, commands } = require('../inconnuboy');
const config = require('../config');

cmd({
    pattern: "repo",
    alias: ["sc", "script", "source"],
    desc: "Get bot source code and repository link",
    category: "main",
    react: "📁",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        let repoText = `*╭────⬡ ${config.BOT_NAME} ⬡────⭓*
*├▢ 📂 Repository:* ⤹𓂃𝗦𝗛𝗔𝗠𝗜𝗜 𝗫 𝗠𝗥𝗔𝗦𝗔𝗗 𝗠𝗗-𝗠𝗜𝗡𝗜 命
*├▢ 👨‍💻 Owner:* ${config.OWNER_NAME}
*├▢ 🏷️ Version:* 1.0
*╰─────────────────⭓*

*╭────⬡ LINK ⬡────*
*├▢ 🌐 Web:* https://minimd-f45ed2154d7b.herokuapp.com/
*╰────────────────*

> *© Powered by ⤹𓂃𝗦𝗛𝗔𝗠𝗜𝗜 𝗫 𝗠𝗥𝗔𝗦𝗔𝗗 𝗠𝗗-𝗠𝗜𝗡𝗜 命*`;

        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL || 'https://up6.cc/2026/10/179152608979041.png' },
            caption: repoText,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363432038354532@newsletter',
                    newsletterName: config.BOT_NAME,
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e.message}`);
    }
});

