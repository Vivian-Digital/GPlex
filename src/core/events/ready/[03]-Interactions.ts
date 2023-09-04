import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client } from 'discord.js';
import { GEN_CHANNEL } from '../../../config/config.js';
import { DevelopmentLog } from '../../utils/dev.js';

export const InteractionButtons = [
    {
        id: 'gen_phone',
        label: 'Phone Numbers',
        style: ButtonStyle.Success
    },
    {
        id: 'gen_card',
        label: 'Card Numbers',
        style: ButtonStyle.Success
    }
] as const

/* Handler */
export default async (Instance: Client<true>) => {
    const InteractionChannel = await Instance.channels.fetch(GEN_CHANNEL.CHANNEL_ID)
    if (!InteractionChannel) {
        DevelopmentLog(`Channel Does not exists!`, true)
        return
    }

    const row = new ActionRowBuilder<ButtonBuilder>()
    /* Create Tiket Buttons */
    InteractionButtons.forEach(({ id, label, style }) => {
        row.components.push(
            new ButtonBuilder()
            .setCustomId(id)
            .setLabel(label)
            .setStyle(style)
        )
    })

    if (InteractionChannel.isTextBased()) {
        await InteractionChannel.send({
            components: [row],
        })
    }
}
