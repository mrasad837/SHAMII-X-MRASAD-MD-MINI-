const { cmd, commands } = require('../inconnuboy');
const { getUserConfigFromMongoDB } = require('../lib/database');
const config = require('../config');

cmd({
    pattern: 'menu2',
    alias: ['help', 'cmds', 'commands'],
    desc: 'Show all commands by category',
    category: 'general',
    react: '📋'
}, async (conn, mek, m, { from, sender, isOwner, reply }) => {
    try {
        const number = sender.split('@')[0];
        const userConfig = await getUserConfigFromMongoDB(number);

        // Group commands by category
        const categories = {};

        for (const command of commands) {
            if (command.dontAddCommandList) continue;

            const cat = (command.category || 'misc').toLowerCase();

            if (!categories[cat]) categories[cat] = [];
            categories[cat].push(command);
        }

        const categoryEmojis = {
            general: '🌐',
            group: '👥',
            settings: '⚙️',
            owner: '👑',
            tools: '🔧',
            fun: '🎭',
            media: '🎬',
            misc: '📦'
        };

        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        // Main menu
        let menuText = `*╭──────────────────────◇*
*│ 🤖 ⤹𓂃𝗦𝗛𝗔𝗠𝗜𝗜 𝗫 𝗠𝗥𝗔𝗦𝗔𝗗 𝗠𝗗-𝗠𝗜𝗡𝗜 命*
*│ ──────── MENU ────────*
*│ 👤 User: ${m.pushName || 'User'}*
*│ ⚡ Prefix: [ ${config.PREFIX} ]*
*│ 🕐 Uptime: ${hours}h ${minutes}m ${seconds}s*
*│ 🔌 Mode: ${config.WORK_TYPE || 'public'}*
*│──────────────────────*
*│ ⚙️ SETTINGS STATUS*
*│ 👁️ Auto View: ${userConfig.AUTO_VIEW_STATUS === 'true' ? 'ON ✅' : 'OFF ❌'}*
*│ 📵 Anti Call: ${userConfig.ANTI_CALL === 'true' ? 'ON ✅' : 'OFF ❌'}*
*│ 🎙️ Auto Record: ${userConfig.AUTO_RECORDING === 'true' ? 'ON ✅' : 'OFF ❌'}*
*│ ⌨️ Auto Typing: ${userConfig.AUTO_TYPING === 'true' ? 'ON ✅' : 'OFF ❌'}*
*│ ✅ Auto Read: ${userConfig.READ_MESSAGE === 'true' ? 'ON ✅' : 'OFF ❌'}*
*╰──────────────────────◇*

`;

        // Command categories
        const catOrder = [
            'general',
            'group',
            'settings',
            'owner',
            'tools',
            'fun',
            'media',
            'misc'
        ];

        const sortedCats = [
            ...catOrder.filter(cat => categories[cat]),
            ...Object.keys(categories).filter(
                cat => !catOrder.includes(cat)
            )
        ];

        // Display each category
        for (const cat of sortedCats) {
            if (!categories[cat] || !categories[cat].length) continue;

            const emoji = categoryEmojis[cat] || '📦';

            menuText += `*╭────${emoji} ${cat.toUpperCase()} MENU ────*\\n`;

            for (const command of categories[cat]) {
                menuText += `*├▢ ${config.PREFIX}${command.pattern}${command.desc ? ' — ' + command.desc : ''}*\\n`;
            }

            menuText += `*╰────────────────────*\\n\\n`;
        }

        // Footer
        menuText += `*╭──────────────────────◇*
*│ © POWERED BY*
*│ SHAMII X MRASAD MD-MINI 命*
*╰──────────────────────◇*`;

        // Send menu with image
        await conn.sendMessage(from, {
            image: { url: config.IMAGE_PATH },
            caption: menuText
        }, { quoted: mek });

    } catch (e) {
        reply('*❌ Menu error: ' + e.message + '*');
    }
});