import { ButtonInteraction, Client, spoiler } from 'discord.js';
import { InteractionButtons } from '../../events/ready/[03]-Interactions.js';
import { ENV, GEN_CHANNEL } from '../../../config/config.js';
import { InteractionEmbedBuilder } from '../../utils/builders.js';
import { CARD_Select_Menu, ISP_Select_Menu } from '../selectMenuHandler/select-menu.js';

type TCustomID = typeof InteractionButtons[number]['id']

export default async (Instance: Client<true>, interaction: ButtonInteraction) => {
    /* Get Guild(server) and ticket category */
    const Guild = await Instance.guilds.fetch(ENV.GUILD_ID)
    const InteractionCategory = await Guild.channels.fetch(GEN_CHANNEL.CATEGORY_ID)

    /* Channel Category Does not Exists */
    if (!InteractionCategory) {
        return await interaction.reply({
            embeds: [
                InteractionEmbedBuilder(
                    'Red',
                    `\`Category\` Does not Exists \`ID\`:\`${ spoiler(GEN_CHANNEL.CATEGORY_ID) }\``
                )
            ],
            ephemeral: true
        })
    }

    /* Switch Between User Choice */
    switch (interaction.customId as TCustomID) {
        /* Automatic Ticket Handler */
        case 'gen_phone': {
            await interaction.reply({
                components: [
                    ISP_Select_Menu()
                ],
                ephemeral: true
            })
            return
        }
        /* Manual Option */
        case 'gen_card': {
            await interaction.reply({
                components: [
                    CARD_Select_Menu()
                ],
                ephemeral: true
            })
            return
        }
    }
}
