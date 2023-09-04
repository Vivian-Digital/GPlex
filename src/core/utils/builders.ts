import { ColorResolvable, EmbedBuilder } from 'discord.js'
import { EMBED_DATA } from '../../config/config.js'

export const InteractionEmbedBuilder = (
    color: ColorResolvable,
    description: string
    ) => {
        return new EmbedBuilder()
        .setColor(color)
        .setDescription(description)
        .setTimestamp()
        .setFooter({
            text: 'GPlex',
            iconURL: EMBED_DATA.ICONS.GREEN_SHIELD
        })
}
