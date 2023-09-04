import 'dotenv/config'

export const ENV = {
    /* Node Environment */
    NODE_ENV: process.env.NODE_ENV,
    /* Discord Bot Token */
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    /* Discord Server */
    GUILD_ID: process.env.GUILD_ID,
} as const

/* Interaction Configurations */
export const GEN_CHANNEL = {
    /* Channel ID */
    CHANNEL_ID: "1147839415473934348",
    /* Category */
    CATEGORY_ID: "1141671074589855844"
} as const

export const EMBED_DATA = {
    ICONS: {
        GREEN_SHIELD: 'https://i.ibb.co/M55Fj3D/icons8-verified-account.gif',
    }
} as const
